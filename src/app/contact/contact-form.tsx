"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type SubmissionState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const siteKey = TURNSTILE_SITE_KEY;
    if (!siteKey) return;
    function render(key: string) {
      const ts = (
        window as unknown as {
          turnstile?: {
            render: (el: HTMLElement, opts: { sitekey: string; theme?: string }) => string;
          };
        }
      ).turnstile;
      if (!ts || !turnstileRef.current || widgetIdRef.current) return;
      widgetIdRef.current = ts.render(turnstileRef.current, {
        sitekey: key,
        theme: "light",
      });
    }
    if (typeof window !== "undefined" && (window as unknown as { turnstile?: object }).turnstile) {
      render(siteKey);
      return;
    }
    const id = setInterval(() => {
      if ((window as unknown as { turnstile?: object }).turnstile) {
        clearInterval(id);
        render(siteKey);
      }
    }, 250);
    return () => clearInterval(id);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "submitting") return;
    setState({ kind: "submitting" });

    const form = e.currentTarget;
    const data = new FormData(form);

    if ((data.get("website_url") as string)?.length) {
      // Honeypot tripped. Pretend success so the bot moves on.
      setState({ kind: "success" });
      form.reset();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          role: data.get("role"),
          church: data.get("church"),
          location: data.get("location"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          turnstileToken: data.get("cf-turnstile-response"),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(j.error || `Request failed (${res.status})`);
      }
      setState({ kind: "success" });
      form.reset();
      const ts = (window as unknown as { turnstile?: { reset: (id?: string) => void } }).turnstile;
      if (ts && widgetIdRef.current) ts.reset(widgetIdRef.current);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setState({ kind: "error", message });
    }
  }

  return (
    <>
      {TURNSTILE_SITE_KEY ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          async
          defer
        />
      ) : null}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-5 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 lg:p-10"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <Field
            label="Your name"
            name="name"
            placeholder="Pastor Sam Reynolds"
            required
          />
          <Field
            label="Your role"
            name="role"
            placeholder="Lead Pastor, Comms Director, etc."
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field
            label="Church name"
            name="church"
            placeholder="Faith Christian Fellowship"
            required
          />
          <Field
            label="City and state"
            name="location"
            placeholder="Trussville, AL"
          />
        </div>
        <Field label="Email" name="email" type="email" placeholder="you@yourchurch.org" required />
        <Field label="Phone (optional)" name="phone" type="tel" placeholder="555 123 4567" />
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[color:var(--color-ink)]">
            What design help do you need?
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder="Tell me about your church, your team, and what's on your design plate."
            className="mt-1.5 w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-3 text-[color:var(--color-ink)] placeholder:text-[color:var(--color-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/30"
          />
        </div>

        {/* Honeypot. Hidden from humans, irresistible to bots. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-10000px",
            width: 1,
            height: 1,
            overflow: "hidden",
          }}
        >
          <label>
            Website
            <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {TURNSTILE_SITE_KEY ? <div ref={turnstileRef} className="pt-1" /> : null}

        <div>
          <button
            type="submit"
            disabled={state.kind === "submitting"}
            className="inline-flex items-center justify-center rounded-lg bg-[color:var(--color-accent)] px-7 h-14 text-base font-medium text-[color:var(--color-accent-foreground)] hover:bg-[color:var(--color-accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {state.kind === "submitting" ? "Sending..." : "Send the note"}
          </button>
          {state.kind === "success" ? (
            <p className="mt-4 text-sm text-[color:var(--color-ink)]">
              Thank you. Emily will reply within one business day. If it&rsquo;s urgent, text{" "}
              {siteConfig.contact.phone}.
            </p>
          ) : null}
          {state.kind === "error" ? (
            <p className="mt-4 text-sm text-red-700">
              {state.message} You can also email{" "}
              <a className="underline underline-offset-2" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>{" "}
              directly.
            </p>
          ) : null}
        </div>
      </form>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-[color:var(--color-ink)]">
        {label} {required && <span className="text-[color:var(--color-accent)]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-3 text-[color:var(--color-ink)] placeholder:text-[color:var(--color-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/30"
      />
    </div>
  );
}
