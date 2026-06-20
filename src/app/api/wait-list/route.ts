import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Payload = {
  firstName?: string
  lastName?: string
  email?: string
  churchDomain?: string
  referralCode?: string
  // Which CTA the signup came from (header, footer, case-study:<slug>, etc).
  source?: string
  // Honeypot. Real users never fill this.
  company?: string
}

function clean(value: unknown, max = 2000): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

/**
 * Wait-list intake for the shared modal.
 *
 * Single dependency: an Apps Script web app under Emily's
 * emily@createchurchmedia.com Workspace (WAITLIST_SHEET_WEBHOOK_URL).
 * The Apps Script does two things in one call:
 *   1. Appends a row to the `CCM Wait List Signups` Google Sheet.
 *   2. Sends Emily a notification email via MailApp.sendEmail.
 *
 * Both run inside Emily's Workspace with her permissions. No external
 * email service, no API keys to rotate, no FROM-domain verification.
 *
 * See _handoff/google-sheets-waitlist-setup-2026-06-15.md and the
 * 2026-06-19 amendment doc for the current Apps Script source.
 */
export async function POST(req: Request): Promise<NextResponse> {
  let body: Payload
  try {
    body = (await req.json()) as Payload
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  // Drop bots that trip the honeypot, but look successful to them.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true })
  }

  const firstName = clean(body.firstName, 80)
  const lastName = clean(body.lastName, 80)
  const email = clean(body.email, 200)
  const churchDomain = clean(body.churchDomain, 200)
  const referralCode = clean(body.referralCode, 80)
  const source = clean(body.source, 120) || 'unknown'
  const timestamp = new Date().toISOString()

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 })
  }

  if (!churchDomain) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 })
  }

  const webhookUrl = process.env.WAITLIST_SHEET_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  const record = {
    firstName,
    lastName,
    email,
    churchDomain,
    referralCode,
    source,
    timestamp,
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    })
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
