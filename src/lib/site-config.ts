/**
 * Per-deployment site configuration for Create Media Group.
 *
 * Single source of truth for metadata, sitemap, robots, JSON-LD.
 * Production URL set via NEXT_PUBLIC_SITE_URL in Vercel env vars.
 */

export const siteConfig = {
  name: "Create Media Group",
  legalName: "Create Media Group",
  tagline: "Your church's designer. Not a design queue.",

  description:
    "Unlimited graphic design for pastors and churches — sermon series, social, signage, kids and youth, announcements. Flat $800/month, no per-project pricing, no design queues. Built around your church, by your designer, Emily Farmer.",

  shortDescription:
    "Your church's designer, on a flat monthly subscription. $800/month for unlimited graphic design.",

  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://createmediagroup.org"
  ).replace(/\/$/, ""),

  ogImage: "/og-default.png",

  owner: {
    name: "Emily Farmer",
    title: "Founder + Lead Designer",
  },

  contact: {
    email: "emilyfarmer808@gmail.com",
    phone: "317-502-7443",
    phoneE164: "+13175027443",
  },

  // Geographic frame for LocalBusiness schema + local SEO copy.
  location: {
    city: "Noblesville",
    region: "IN",
    regionName: "Indiana",
    country: "US",
    metro: "Indianapolis",
  },

  // Service areas the LocalBusiness schema declares we serve.
  serviceArea: [
    "Noblesville, IN",
    "Indianapolis, IN",
    "Carmel, IN",
    "Fishers, IN",
    "Westfield, IN",
    "Indiana",
    "United States",
  ],

  pricing: {
    monthly: {
      label: "Monthly",
      amount: 800,
      currency: "USD",
      cadence: "/month",
      blurb:
        "Pay month to month. Pause or cancel anytime — your library of files is yours either way.",
    },
    annual: {
      label: "Annual prepay",
      amount: 8800,
      currency: "USD",
      cadence: "/year",
      perMonth: 733,
      blurb:
        "Twelve months for the price of eleven. The same designer, the same access, $800 off.",
      savings: 800,
    },
  },

  // The six service categories from her current site footer.
  services: [
    {
      slug: "sermon-series",
      name: "Sermon series",
      blurb:
        "Series titles, slide graphics, social cutdowns, bulletin headers — built around your message, not a template.",
    },
    {
      slug: "social-media",
      name: "Social media",
      blurb:
        "Weekly post graphics, story templates, reel covers. Brand-consistent across every channel without you opening Canva.",
    },
    {
      slug: "announcements",
      name: "Announcements",
      blurb:
        "Weekly slide and bulletin graphics for everything happening at church — events, baptisms, volunteer asks, mission updates.",
    },
    {
      slug: "youth-and-kids",
      name: "Youth + kids",
      blurb:
        "Bright, on-brand graphics for your kids and youth ministries. Camp shirts, summer series, parent handouts, hallway signage.",
    },
    {
      slug: "logos",
      name: "Logos + branding",
      blurb:
        "Church logos, ministry sub-brands, refreshes. Full brand identity systems built to outlast the next pastor.",
    },
    {
      slug: "signage",
      name: "Signage + print",
      blurb:
        "Lobby signs, exterior banners, large-format prints, business cards — print-ready files sent straight to your printer.",
    },
  ],

  // The story Emily tells about how she works — her cold-email phrasing.
  workflow: [
    {
      step: "01",
      name: "Onboard",
      blurb:
        "We start with a kickoff call. I learn your church, your voice, your colors, your style — and your team's pace. By the end I have what I need to work like I've been on staff for years.",
    },
    {
      step: "02",
      name: "Request",
      blurb:
        "You send requests through one simple form (or just text me — really). One thing at a time, or a stack for the month. There's no points system, no tickets, no queue.",
    },
    {
      step: "03",
      name: "Design",
      blurb:
        "I design the request — usually same week, often same day for small things. Quick turnarounds for slides; longer windows for full series or branding.",
    },
    {
      step: "04",
      name: "Review",
      blurb:
        "I send proofs. You reply with thoughts. We revise until it's right. Unlimited revisions — no upcharge, no scope-creep argument, no waiting on a project manager.",
    },
    {
      step: "05",
      name: "Deliver",
      blurb:
        "Final files land in your shared folder — sized for Pro Presenter, Instagram, Facebook, print, whatever you need. Source files included. Organized so anyone on your team can find them.",
    },
  ],

  // Stats for the hero ribbon. Real numbers go here once Emily confirms.
  stats: [
    { value: "4+", label: "church clients on subscription" },
    { value: "~5 yrs", label: "designing for churches" },
    { value: "1", label: "designer — not a queue" },
    { value: "Unlimited", label: "requests + revisions" },
  ],

  links: {
    instagram: "https://www.instagram.com/createmediagroup",
    facebook: "",
    linkedin: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
