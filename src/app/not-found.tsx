import Link from "next/link";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return (
    <Section className="pt-24 pb-24">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-serif text-7xl text-[color:var(--color-accent)] tracking-tight">
            404
          </p>
          <h1 className="mt-4 font-serif text-4xl tracking-tight text-[color:var(--color-ink)]">
            Page not found.
          </h1>
          <p className="mt-4 text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
            This page doesn&rsquo;t exist — or doesn&rsquo;t yet. We&rsquo;re
            shipping new pages weekly while the site rolls out.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <ButtonLink href="/" variant="primary" size="md" withArrow>
              Back home
            </ButtonLink>
            <ButtonLink href="/subscription" variant="outline" size="md">
              See the subscription
            </ButtonLink>
          </div>
          <p className="mt-12 text-sm text-[color:var(--color-muted)]">
            Looking for something specific?{" "}
            <Link
              className="text-[color:var(--color-accent)] underline underline-offset-4"
              href="/contact"
            >
              Tell me what you needed.
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}
