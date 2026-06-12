/**
 * Per-deployment site configuration for Create Media Group.
 *
 * Single source of truth for metadata, sitemap, robots, JSON-LD.
 * Production URL set via NEXT_PUBLIC_SITE_URL in Vercel env vars.
 */

export const siteConfig = {
  name: "Create Media Group",
  legalName: "Create Media Group",
  tagline: "Unlimited graphic design for pastors and churches.",
  subhead:
    "Your church's design team, on a monthly subscription. Same-day rush available.",

  description:
    "Unlimited graphic design for pastors and churches. Sermon series, social, signage, kids and youth, announcements, brand. Flat $997 a month. Same-day rush available.",

  shortDescription:
    "Unlimited graphic design for pastors and churches. $997 a month, flat.",

  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://createmediagroup.org"
  ).replace(/\/$/, ""),

  ogImage: "/og-default.png",

  owner: {
    name: "Emily Farmer",
    title: "Founder and Lead Designer",
  },

  contact: {
    email: "emily@createmediagroup.org",
    phone: "317-537-1179",
    phoneE164: "+13175371179",
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
      amount: 997,
      currency: "USD",
      cadence: "/month",
      blurb:
        "Pay month to month. Pause or cancel anytime. The files we make are yours to keep.",
    },
    annual: {
      label: "Annual prepay",
      amount: 9997,
      currency: "USD",
      cadence: "/year",
      perMonth: 833,
      blurb:
        "Pay for the year and save almost $2,000. Same designer, same access, same turnaround.",
      savings: 1967,
    },
  },

  // The six service categories from her current site footer.
  services: [
    {
      slug: "sermon-series",
      name: "Sermon series",
      blurb:
        "Series titles, slide graphics, social cutdowns, bulletin headers. Built around your message.",
    },
    {
      slug: "social-media",
      name: "Social media",
      blurb:
        "Weekly post graphics, story templates, reel covers. On-brand across every channel.",
    },
    {
      slug: "announcements",
      name: "Announcements",
      blurb:
        "Weekly slide and bulletin graphics for everything happening at church. Events, baptisms, volunteer asks, mission updates.",
    },
    {
      slug: "youth-and-kids",
      name: "Youth and kids",
      blurb:
        "Bright, on-brand graphics for your kids and youth ministries. Camp shirts, summer series, parent handouts, hallway signage.",
    },
    {
      slug: "logos",
      name: "Logos and branding",
      blurb:
        "Church logos, ministry sub-brands, refreshes. Full brand identity systems built to outlast the next pastor.",
    },
    {
      slug: "signage",
      name: "Signage and print",
      blurb:
        "Lobby signs, exterior banners, large-format prints, business cards. Print-ready files sent straight to your printer.",
    },
  ],

  // The story Emily tells about how she works.
  workflow: [
    {
      step: "01",
      name: "Onboard",
      blurb:
        "We start with a kickoff call. I learn your church, your voice, your colors, your style, your team's pace. By the end I have what I need to work like I've been on staff for years.",
    },
    {
      step: "02",
      name: "Request",
      blurb:
        "You send requests through one simple form, or just text me. One thing at a time, or a stack for the month. There's no points system, no tickets, no queue.",
    },
    {
      step: "03",
      name: "Design",
      blurb:
        "I design the request. Usually same week, often same day for small things. Same-day rush is available when something has to ship fast. Sermon series and brand work get a longer window.",
    },
    {
      step: "04",
      name: "Review",
      blurb:
        "I send proofs. You reply with thoughts. We revise until it's right. Unlimited revisions. No upcharge, no scope-creep argument, no waiting on a project manager.",
    },
    {
      step: "05",
      name: "Deliver",
      blurb:
        "Final files land in your shared folder. Sized for Pro Presenter, Instagram, Facebook, print, whatever you need. Source files included. Organized so anyone on your team can find them.",
    },
  ],

  // Stats for the hero ribbon. Real numbers go here once Emily confirms.
  stats: [
    { value: "4+", label: "church clients on subscription" },
    { value: "~5 yrs", label: "designing for churches" },
    { value: "Same-day", label: "rush turnaround available" },
    { value: "Unlimited", label: "requests and revisions" },
  ],

  links: {
    instagram: "https://www.instagram.com/createmediagroup",
    facebook: "",
    linkedin: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
