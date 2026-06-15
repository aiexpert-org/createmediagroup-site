// Curated "Selected work" pieces shown on a case-study page. These point at the
// optimized portfolio assets already in public/portfolio (the same body of work
// the /portfolio gallery draws from). Only churches with hand-picked pieces have
// an entry here; every other slug falls back to the logo + portfolio CTA empty
// state in src/components/SelectedWork.tsx.
//
// FCC Santa Maria is the flagship five-year, full-service partnership, so its
// grid pulls six representative pieces, one per work type, across sermon series,
// announcements, social, signage and print, branding, and youth.

export type WorkPiece = {
  /** Path under public/, e.g. /portfolio/sermon-malachi.webp */
  src: string
  /** Short category caption shown under the tile. */
  label: string
  /** Descriptive alt text. */
  alt: string
}

const CURATED: Record<string, WorkPiece[]> = {
  'fcc-santa-maria': [
    {
      src: '/portfolio/sermon-malachi.webp',
      label: 'Sermon series',
      alt: 'Sermon series art: Malachi',
    },
    {
      src: '/portfolio/announcements-easter-services.webp',
      label: 'Announcements',
      alt: 'Easter services announcement graphic',
    },
    {
      src: '/portfolio/social-summer-sundays.webp',
      label: 'Social media',
      alt: 'Social media graphic: Summer Sundays',
    },
    {
      src: '/portfolio/signage-guest-reception.webp',
      label: 'Signage and print',
      alt: 'Guest reception signage',
    },
    {
      src: '/portfolio/logos-logo-1.webp',
      label: 'Logos and branding',
      alt: 'Logo and branding design',
    },
    {
      src: '/portfolio/youth-timothy.webp',
      label: 'Youth and kids',
      alt: 'Youth ministry graphic: Timothy',
    },
  ],
}

export function getSelectedWork(slug: string): WorkPiece[] {
  return CURATED[slug] ?? []
}
