# Create Media Group — Website

Next.js 16 marketing site for Create Media Group (Emily Farmer) — an unlimited graphic-design subscription for pastors and churches.

**Positioning:** Your church's designer. Not a design queue.

**Pricing:** $800/mo standard, or $8,800/year annual prepay (12 months for the price of 11).

## Stack

- Next.js 16 (App Router) · TypeScript · React 19
- Tailwind v4 (`@theme` tokens in `src/app/globals.css`)
- `next/font/google` — Fraunces (display serif), Inter (body / UI)
- Server Components by default
- Markdown blog rendered with `gray-matter` + `remark`
- JSON-LD structured data on every page (Organization, LocalBusiness, Service, FAQPage, BlogPosting+Speakable)

## Local dev

```sh
npm install
npm run dev
# → http://localhost:3000
```

## Deploy

Connected to Vercel via GitHub. Pushes to `main` auto-deploy.

- Temporary preview URL: `*.vercel.app` (assigned on first deploy)
- Production domain (when DNS swaps from GoDaddy): `createmediagroup.org`

Set `NEXT_PUBLIC_SITE_URL` in Vercel env vars to the production URL once known.

## Content

- Pages in `src/app/*/page.tsx`
- Blog posts in `content/blog/*.md` (frontmatter: `title`, `date`, `description`, `tags`)
- Case studies in `content/case-studies/*.md`

## Contact

- Emily Farmer · emilyfarmer808@gmail.com · 317-502-7443
- Repo owner: Brett Moore (brett@brettkmoore.com)
