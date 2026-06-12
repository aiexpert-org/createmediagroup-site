/**
 * /api/contact
 *
 * Server route that receives the contact-page form, verifies Cloudflare
 * Turnstile, creates a Contact in the CMG GHL sub-account (Location ID
 * rVcBE7USipXSciuApIkm), and sends a notification email to Emily via Resend.
 *
 * Env vars expected:
 *   GHL_LOCATION_ID           Server-only. The CMG sub-account location id.
 *   GHL_PRIVATE_INTEGRATION_TOKEN  Server-only. Created in CMG sub-account
 *                              under Settings -> Private Integrations.
 *                              Scopes: contacts.write, contacts.readonly.
 *   TURNSTILE_SECRET_KEY      Server-only. Cloudflare Turnstile secret.
 *   RESEND_API_KEY            Server-only.
 *   CONTACT_NOTIFICATION_TO   Email address that receives lead notifications.
 *
 * If any required server var is missing the route returns 500 with a
 * generic message; details are logged.
 */

import { NextResponse } from "next/server";

export const runtime = "nodejs";
// We don't cache POSTs, but this is explicit so Vercel doesn't try.
export const dynamic = "force-dynamic";

type Payload = {
  name?: string;
  role?: string;
  church?: string;
  location?: string;
  email?: string;
  phone?: string;
  message?: string;
  turnstileToken?: string;
};

const REQUIRED_FIELDS: Array<keyof Payload> = ["name", "church", "email", "message"];

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

async function verifyTurnstile(token: string | undefined, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // If Turnstile isn't configured yet we accept submissions (with the
    // honeypot as the only spam layer). Logged so we notice.
    console.warn("[contact] TURNSTILE_SECRET_KEY not set; skipping verification");
    return true;
  }
  if (!token) return false;
  const form = new URLSearchParams();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });
  if (!res.ok) return false;
  const j = (await res.json()) as { success?: boolean };
  return Boolean(j.success);
}

async function createGhlContact(p: Payload) {
  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    throw new Error("GHL_PRIVATE_INTEGRATION_TOKEN or GHL_LOCATION_ID not set");
  }
  const [firstName, ...rest] = (p.name || "").trim().split(/\s+/);
  const lastName = rest.join(" ");
  const res = await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      locationId,
      firstName: firstName || p.name,
      lastName: lastName || undefined,
      email: p.email,
      phone: p.phone || undefined,
      companyName: p.church,
      source: "createmediagroup.org contact form",
      tags: ["website-lead", "contact-form"],
      customFields: [
        { key: "role", field_value: p.role || "" },
        { key: "city_state", field_value: p.location || "" },
        { key: "message", field_value: p.message || "" },
      ],
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL contact create failed: ${res.status} ${text.slice(0, 300)}`);
  }
}

async function sendNotificationEmail(p: Payload) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_TO;
  if (!key || !to) {
    console.warn("[contact] RESEND_API_KEY or CONTACT_NOTIFICATION_TO not set; skipping email");
    return;
  }
  const subject = `New church inquiry: ${p.church || "(no church)"} (${p.name || "no name"})`;
  const text = [
    `New inquiry from createmediagroup.org`,
    ``,
    `Name: ${p.name || ""}`,
    `Role: ${p.role || ""}`,
    `Church: ${p.church || ""}`,
    `Location: ${p.location || ""}`,
    `Email: ${p.email || ""}`,
    `Phone: ${p.phone || ""}`,
    ``,
    `Message:`,
    p.message || "",
  ].join("\n");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Create Media Group <leads@createmediagroup.org>",
      to: [to],
      reply_to: p.email,
      subject,
      text,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`[contact] Resend send failed: ${res.status} ${body.slice(0, 300)}`);
  }
}

export async function POST(req: Request) {
  let payload: Payload;
  try {
    payload = (await req.json()) as Payload;
  } catch {
    return badRequest("Invalid JSON");
  }

  for (const f of REQUIRED_FIELDS) {
    const v = payload[f];
    if (typeof v !== "string" || v.trim().length === 0) {
      return badRequest(`Missing field: ${f}`);
    }
  }

  // Reasonable upper bounds. Throw out anything obviously abusive.
  if ((payload.message || "").length > 5000) return badRequest("Message too long");
  if ((payload.name || "").length > 200) return badRequest("Name too long");

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;

  const turnstileOk = await verifyTurnstile(payload.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json({ error: "Spam check failed. Please try again." }, { status: 400 });
  }

  try {
    await createGhlContact(payload);
  } catch (err) {
    console.error("[contact] GHL contact create failed", err);
    return NextResponse.json(
      { error: "Could not record your inquiry. Please email or text Emily directly." },
      { status: 500 },
    );
  }

  // Notification email is fire-and-forget so a Resend outage doesn't fail the
  // submission. The GHL contact is the source of truth.
  void sendNotificationEmail(payload);

  return NextResponse.json({ ok: true });
}
