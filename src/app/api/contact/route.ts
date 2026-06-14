import { NextResponse } from 'next/server'

import { siteConfig } from '@/lib/site-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Payload = {
  name?: string
  email?: string
  church?: string
  location?: string
  message?: string
  // Honeypot. Real users never fill this.
  company?: string
}

function clean(value: unknown, max = 2000): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

/**
 * Wait list intake.
 *
 * Emails the signup to Emily via Resend and best-effort creates a tagged GHL
 * contact so it lands in her pipeline. Both integrations read their secrets
 * from env (RESEND_API_KEY, WAITLIST_TO/FROM, GHL_API_KEY, GHL_LOCATION_ID).
 * If Resend is not configured or the send fails, we return a non-OK status so
 * the client can fall back to a plain mailto rather than silently losing a lead.
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

  const name = clean(body.name, 120)
  const email = clean(body.email, 200)
  const church = clean(body.church, 200)
  const location = clean(body.location, 200)
  const message = clean(body.message, 4000)

  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 })
  }

  // Best-effort CRM sync. Never blocks the email or fails the request.
  await createGhlContact({ name, email, church, location, message }).catch(() => {})

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  const to = process.env.WAITLIST_TO || siteConfig.email
  const from =
    process.env.WAITLIST_FROM || `Create Church Media <noreply@${siteConfig.domain}>`
  const subject = `[CCM wait list] New signup: ${name}${church ? ` from ${church}` : ''}`
  const text = [
    'New wait list signup',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Church: ${church || '(not provided)'}`,
    `Location: ${location || '(not provided)'}`,
    '',
    'What they are looking for:',
    message || '(none provided)',
  ].join('\n')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text }),
    })
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

async function createGhlContact(p: {
  name: string
  email: string
  church: string
  location: string
  message: string
}): Promise<void> {
  const apiKey = process.env.GHL_API_KEY
  const locationId = process.env.GHL_LOCATION_ID
  if (!apiKey || !locationId) return

  const [firstName, ...rest] = p.name.split(/\s+/)
  await fetch('https://services.leadconnectorhq.com/contacts/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      locationId,
      firstName: firstName || p.name,
      lastName: rest.join(' ') || undefined,
      email: p.email,
      companyName: p.church || undefined,
      city: p.location || undefined,
      source: 'Website wait list',
      tags: ['wait-list-2026'],
    }),
  })
}
