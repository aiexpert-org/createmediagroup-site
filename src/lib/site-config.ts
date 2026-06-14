export const siteConfig = {
  brand: 'Create Church Media',
  shortBrand: 'CCM',
  domain: 'createchurchmedia.com',
  url: 'https://createchurchmedia.com',
  email: 'emily@createchurchmedia.com',
  city: 'Noblesville',
  state: 'IN',
  zip: '46062',
  designer: 'Emily Farmer',
  description:
    'Unlimited graphic design for churches on a monthly subscription. Designer Emily Farmer based in Noblesville, IN, serving the Indianapolis area.',
  pricing: {
    monthly: 997,
    annual: 9997,
  },
  bookingUrl: 'mailto:emily@createchurchmedia.com?subject=Booking%20a%20call%20with%20Emily',
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
