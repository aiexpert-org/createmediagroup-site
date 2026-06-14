export const siteConfig = {
  brand: 'Create Church Media',
  shortBrand: 'CCM',
  domain: 'createchurchmedia.com',
  url: 'https://createchurchmedia.com',
  email: 'emily@createchurchmedia.com',
  city: 'Indianapolis',
  state: 'IN',
  designer: 'Emily Farmer',
  description:
    'Unlimited graphic design for churches on a monthly subscription. Designer Emily Farmer based in Indianapolis, IN.',
  pricing: {
    monthly: 997,
    annual: 9997,
  },
  // The wait list is the only call to action. People join the list, Emily gets
  // an email alert, and she reaches out personally when a spot opens.
  waitlistUrl: '/contact',
  ctaLabel: 'Join the wait list',
  // Plain mailto fallback used if the wait list API is ever unavailable.
  waitlistMailto:
    'mailto:emily@createchurchmedia.com?subject=Joining%20the%20wait%20list',
  // Google Business Profile URL. Empty until Brett fills it in.
  googleBusinessUrl: '',
} as const

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/subscription', label: 'Subscription' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/resources', label: 'Resources' },
] as const
