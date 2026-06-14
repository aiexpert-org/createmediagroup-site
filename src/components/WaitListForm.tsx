'use client'

import { useId, useState } from 'react'
import { Button } from '@/components/Button'
import { siteConfig } from '@/lib/site-config'

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  const id = useId()
  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-neutral-950 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function TextArea({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'textarea'> & { label: string }) {
  const id = useId()
  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <textarea
        id={id}
        rows={4}
        {...props}
        placeholder=" "
        className="peer block w-full resize-none border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-12 left-6 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-neutral-950 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

type Status = 'idle' | 'submitting' | 'done' | 'error'

export function WaitListForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('done')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-3xl bg-neutral-950 px-8 py-12 text-white">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          You&rsquo;re on the list.
        </h2>
        <p className="mt-4 text-lg text-neutral-300">
          Emily will reach out by email when a spot opens. Keep an eye on your inbox.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Save your spot
      </h2>
      <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
        <TextInput label="Name" name="name" autoComplete="name" required />
        <TextInput
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          required
        />
        <TextInput label="Church name" name="church" autoComplete="organization" />
        <TextInput label="City or location" name="location" autoComplete="address-level2" />
        <TextArea label="What you’re looking for (optional)" name="message" />
      </div>

      {/* Honeypot: hidden from real users, catches bots. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'error' ? (
        <p className="mt-6 text-base text-neutral-700">
          Something went wrong on our end. Email Emily directly at{' '}
          <a
            href={siteConfig.waitlistMailto}
            className="font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)]"
          >
            {siteConfig.email}
          </a>{' '}
          and she will add you to the list.
        </p>
      ) : null}

      <div className="mt-10">
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Joining…' : 'Join the wait list'}
        </Button>
      </div>
    </form>
  )
}
