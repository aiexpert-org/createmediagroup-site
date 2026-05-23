import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section, Eyebrow } from "@/components/section";
import { ButtonLink } from "@/components/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Five steps from inquiry to a finished file in your shared folder. Onboard, request, design, review, deliver. One designer the whole way.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <Section className="pt-16 pb-12">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-serif font-normal text-[44px] md:text-[64px] leading-[1.06] tracking-[-0.02em] text-[color:var(--color-ink)] text-balance max-w-[18ch]">
              From inquiry to a finished file, start to finish.
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              Five steps. One designer. No ticketing system, no account manager,
              no &ldquo;we&rsquo;ll route this to the right team.&rdquo; You
              send me what you need. I design it. You review. We ship.
            </p>
          </div>
        </Container>
      </Section>

      {/* TODO: rewrite workflow step blurbs in Emily voice. Source is siteConfig.workflow in */}
      {/* src/lib/site-config.ts. Current copy reads agency-third-person; her register */}
      {/* would lead with first-person and "Here is how I work." */}
      <Section className="pt-0 pb-16">
        <Container>
          <ol className="space-y-12 lg:space-y-16">
            {siteConfig.workflow.map((step, idx) => (
              <li
                key={step.step}
                className="grid lg:grid-cols-[200px_1fr] gap-6 lg:gap-12 items-start"
              >
                <div className="flex lg:flex-col items-baseline lg:items-start gap-3">
                  <span className="font-serif text-6xl lg:text-7xl text-[color:var(--color-accent)] leading-none tracking-tight">
                    {step.step}
                  </span>
                  <span className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-muted)] lg:mt-3">
                    Step {idx + 1} of {siteConfig.workflow.length}
                  </span>
                </div>
                <div>
                  <h2 className="font-serif text-[length:var(--text-h2)] tracking-tight text-[color:var(--color-ink)]">
                    {step.name}
                  </h2>
                  <p className="mt-3 text-lg text-[color:var(--color-ink-soft)] leading-relaxed max-w-2xl">
                    {step.blurb}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-[color:var(--color-surface)]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Eyebrow>The relationship</Eyebrow>
              <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
                Your remote
                <br />
                <span className="font-serif-italic">staff designer.</span>
              </h2>
            </div>
            <div className="space-y-5 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
              <p>
                A queue-based design service treats every request as anonymous.
                A new designer picks it up each time. They don&rsquo;t know your
                pastor&rsquo;s voice or that your kids ministry uses a different
                blue than your main brand.
              </p>
              <p>
                I work the other way. After onboarding I&rsquo;m part of your
                team, the same way a remote graphic designer on staff would be.
                Instead of a salary you pay a flat subscription. I sit in your
                Slack if you use one. I get added to your shared drive. I know
                your sermon series cadence and what your senior pastor hates in
                fonts.
              </p>
              <p>
                That&rsquo;s why this works for churches when queue services
                don&rsquo;t.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-lg bg-[color:var(--color-ink)] text-[color:var(--color-background)] p-10 lg:p-14 flex flex-col lg:flex-row gap-10 lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-serif text-[length:var(--text-h2)] leading-[1.1] tracking-tight">
                See if we&rsquo;re a fit.
              </h2>
              <p className="mt-4 text-[color:var(--color-background)]/75 leading-relaxed">
                Tell me about your church. I&rsquo;ll reply within a day with
                whether the subscription is right for you, and what onboarding
                looks like if it is.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Start
              </ButtonLink>
              <ButtonLink
                href="/subscription"
                variant="ghost"
                size="lg"
                className="text-[color:var(--color-background)] hover:bg-[color:var(--color-background)]/10"
              >
                See pricing
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
