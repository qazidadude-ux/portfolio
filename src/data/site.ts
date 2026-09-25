// Central place for editable site content. Swap these values for your own —
// nothing else in the codebase needs to change.

export const SITE = {
  name: "Shakeel Ur Rehman",
  role: "Full-stack Designer",
  tagline: "Strategic design that drives growth, not just looks good.",
  url: "https://example.com",
  email: "joseph@launchnow.design",
  availability: "Available for August'25",
  happyClients: "99+",
  bookingUrl: "https://cal.com/",
  social: [
    { label: "X / Twitter", href: "https://twitter.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
  ],
} as const;

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  headline: ["Design", "that", "delivers", "results."],
  subhead:
    "Design should earn its keep, not just look good. I build the brand and product work you need to turn visitors into paying customers.",
  ctaLabel: "Book a call with me",
} as const;

export const TECH_STACK = [
  "Figma",
  "Framer",
  "Claude",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe After Effects",
  "Zeplin",
  "Balsamiq",
] as const;

export const SERVICES = [
  "Framer Development",
  "Brand Design",
  "Web Apps",
  "Landing Pages",
  "Motion Graphics",
  "3D Design",
  "UX / UI Consultation",
] as const;

export const WORK_HISTORY = [
  { company: "KYMA", role: "Full-Stack Designer", period: "2012–2024" },
  { company: "Mugen", role: "Staff Product Designer", period: "2020–2022" },
  { company: "Axiom", role: "Designer", period: "2016–2020" },
] as const;

// Each paragraph renders its `lead` in bold black, followed by `rest` in gray.
export const ABOUT = {
  paragraphs: [
    {
      lead: "I got into design chasing a simple hunch.",
      rest: "The right interface can make a hard problem feel obvious, and that hunch turned into a career spent learning where visual polish ends and real usability begins.",
    },
    {
      lead: "Every project starts with the same question:",
      rest: "what is this supposed to do for the person using it? An interface that looks sharp but fights the user isn't finished, so I keep iterating until it gets out of its own way.",
    },
    {
      lead: "I sweat the details most people skip,",
      rest: "spacing, copy, the exact easing on a hover state, because that's usually where trust with a client is won or lost.",
    },
  ],
} as const;

// Client names shown in the "Trusted by many" logo strip.
export const CLIENTS = ["Kora", "KYMA", "Mugen", "Axiom"] as const;
