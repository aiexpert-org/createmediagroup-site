import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/container";
import { Section, Eyebrow } from "@/components/section";
import { ButtonLink } from "@/components/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Emily",
  description:
    "Emily Farmer designs for churches. One designer, one subscription, one steady creative partner. Built for churches that can't afford a full-time in-house designer but need one.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16 pb-12">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="font-serif font-normal text-[44px] md:text-[64px] leading-[1.06] tracking-[-0.02em] text-[color:var(--color-ink)] text-balance max-w-[18ch]">
                I&rsquo;m Emily. I design for churches.
              </h1>
              <p className="mt-7 text-lg sm:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
                Create Media Group is a quiet idea. A church should get the design
                quality of a ten-person agency without the agency price, the
                agency posturing, or the agency project manager who never picks
                up the phone.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] max-w-md mx-auto rounded-lg overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                <Image
                  src="/about/emily-headshot.webp"
                  alt="Emily Farmer, founder and lead designer of Create Media Group."
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-4 pb-16">
        <Container>
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-start">
            <div className="space-y-6 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
              <p>
                I started Create Media Group because most of the churches I
                wanted to help couldn&rsquo;t afford to hire me full-time. A
                full-time church designer in the U.S. runs $55,000 to $75,000 a
                year plus benefits. That&rsquo;s out of reach for a 400-person
                congregation that&rsquo;s already stretched the comms director
                across three other ministries.
              </p>
              <p>
                Those same churches were spending more than that, in aggregate,
                on a rotating cast of freelancers. None of whom stayed long
                enough to learn the brand. The result was the look I kept
                seeing. A sermon series graphic that didn&rsquo;t match the
                kids ministry palette that didn&rsquo;t match the bulletin font
                that didn&rsquo;t match the lobby sign.
              </p>
              <p>
                One designer, one subscription, one steady creative partner.
                Priced so a mid-sized church can actually afford it.
                That&rsquo;s the whole idea. After a month I know your church
                the way an in-house hire would. The brand starts to feel like
                one brand, because one person is making it.
              </p>
              <p>
                I work with a small number of churches at a time on purpose. The
                model only works if I&rsquo;m actually present in your work, not
                queuing your requests behind fifty other clients&rsquo; tickets.
              </p>
            </div>

            <aside className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 lg:sticky lg:top-24">
              <h2 className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                The basics
              </h2>
              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="text-sm text-[color:var(--color-muted)]">Designer</dt>
                  <dd className="mt-1 font-serif text-2xl tracking-tight text-[color:var(--color-ink)]">
                    Emily Farmer
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[color:var(--color-muted)]">Studio</dt>
                  <dd className="mt-1 text-[color:var(--color-ink)]">
                    {siteConfig.location.city}, {siteConfig.location.regionName}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[color:var(--color-muted)]">Working with</dt>
                  <dd className="mt-1 text-[color:var(--color-ink)]">
                    Pastors and church staff nationwide
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[color:var(--color-muted)]">Focus</dt>
                  <dd className="mt-1 text-[color:var(--color-ink)]">
                    Sermon series, brand identity, social, signage, ministry
                    sub-brands
                  </dd>
                </div>
              </dl>
              <div className="mt-8">
                <ButtonLink href="/contact" variant="primary" size="md">
                  Say hello
                </ButtonLink>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section className="bg-[color:var(--color-surface)]">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>The bias</Eyebrow>
            <h2 className="mt-4 font-serif text-[length:var(--text-h1)] leading-[1.05] tracking-tight">
              What I believe about church design.
            </h2>
            <div className="mt-8 space-y-6 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
              <p>
                <span className="font-serif-italic text-[color:var(--color-ink)]">Consistency outperforms cleverness.</span>{" "}
                A sermon series graphic that matches the kids ministry that
                matches the lobby sign is more powerful than three brilliant
                one-offs that don&rsquo;t share a visual language.
              </p>
              <p>
                <span className="font-serif-italic text-[color:var(--color-ink)]">Designers should be inside the room.</span>{" "}
                Not behind a ticketing form. The best work comes from knowing
                the pastor&rsquo;s rhythm, the worship lead&rsquo;s preferences,
                and what the production team needs to load into ProPresenter on
                Saturday night.
              </p>
              <p>
                <span className="font-serif-italic text-[color:var(--color-ink)]">Design serves the message.</span>{" "}
                If the graphic is louder than the sermon, the graphic lost. The
                goal isn&rsquo;t to win design awards. It&rsquo;s to make sure
                nothing in the visual layer gets in the way of people hearing
                what your pastor is preaching.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-lg bg-[color:var(--color-ink)] text-[color:var(--color-background)] p-10 lg:p-14">
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
              <div>
                <h2 className="font-serif text-[length:var(--text-h2)] leading-[1.1] tracking-tight">
                  Want to work together?
                </h2>
                <p className="mt-4 text-[color:var(--color-background)]/75 leading-relaxed max-w-xl">
                  I&rsquo;m taking on a small number of new churches this
                  quarter. Send me a note about your church and what
                  you&rsquo;re trying to build.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <ButtonLink href="/contact" variant="primary" size="lg">
                  Get in touch
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
