import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section, Eyebrow } from "@/components/section";
import { ButtonLink } from "@/components/button";
import { siteConfig } from "@/lib/site-config";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Emily Farmer at Create Media Group. Email ${siteConfig.contact.email} or call ${siteConfig.contact.phone}. Replies within one business day.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Section className="pt-16 pb-10">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-serif font-normal text-[44px] md:text-[64px] leading-[1.06] tracking-[-0.02em] text-[color:var(--color-ink)] text-balance max-w-[18ch]">
              Tell me about your church.
            </h1>
            {/* Voice corpus Translation 5 — contact-page reassurance note. */}
            <p className="mt-7 text-lg sm:text-xl text-[color:var(--color-ink-soft)] leading-relaxed max-w-2xl">
              I would love to talk with you about this further. Send me a note
              here, or text me, and I will get back to you the same day.
              I&rsquo;m happy to answer any questions you may have.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-4 pb-20">
        <Container>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
            {/* Form */}
            <div>
              <form
                action={`mailto:${siteConfig.contact.email}`}
                method="post"
                encType="text/plain"
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
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@yourchurch.org"
                  required
                />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  placeholder="555 123 4567"
                />
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[color:var(--color-ink)]"
                  >
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
                <div>
                  <ButtonLink
                    href={`mailto:${siteConfig.contact.email}?subject=New church inquiry`}
                    variant="primary"
                    size="lg"
                  >
                    Send the note
                  </ButtonLink>
                  <p className="mt-3 text-xs text-[color:var(--color-muted)]">
                    Submitting opens your email client with the form contents.
                    Prefer to just send a plain email?{" "}
                    <a
                      className="underline underline-offset-2"
                      href={`mailto:${siteConfig.contact.email}`}
                    >
                      {siteConfig.contact.email}
                    </a>
                  </p>
                </div>
              </form>
            </div>

            {/* Direct contact column */}
            <aside className="space-y-6">
              <ContactCard
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                primary={siteConfig.contact.email}
                href={`mailto:${siteConfig.contact.email}`}
              />
              <ContactCard
                icon={<Phone className="h-4 w-4" />}
                label="Phone or text"
                primary={siteConfig.contact.phone}
                href={`tel:${siteConfig.contact.phoneE164}`}
              />
              <ContactCard
                icon={<MapPin className="h-4 w-4" />}
                label="Based in"
                primary={`${siteConfig.location.city}, ${siteConfig.location.regionName}`}
                detail="Working with churches nationwide"
              />

              <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-7">
                <h3 className="font-serif text-xl tracking-tight text-[color:var(--color-ink)]">
                  Response time
                </h3>
                <p className="mt-2 text-[color:var(--color-ink-soft)] leading-relaxed">
                  Inquiries get a reply within one business day. Most churches
                  have a kickoff call scheduled within the same week and begin
                  onboarding the week after.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
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
      <label
        htmlFor={name}
        className="block text-sm font-medium text-[color:var(--color-ink)]"
      >
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

function ContactCard({
  icon,
  label,
  primary,
  detail,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  primary: string;
  detail?: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]">
          {icon}
        </span>
        {label}
      </div>
      <p className="mt-3 font-serif text-2xl tracking-tight text-[color:var(--color-ink)]">
        {primary}
      </p>
      {detail && (
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">{detail}</p>
      )}
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        className="block rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 transition-colors hover:border-[color:var(--color-accent)]"
      >
        {inner}
      </a>
    );
  }
  return (
    <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7">
      {inner}
    </div>
  );
}
