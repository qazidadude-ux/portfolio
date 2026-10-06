// Central place for editable site content. Swap these values for your own —
// nothing else in the codebase needs to change.

export const SITE = {
  name: "Shakeel Ur Rehman",
  role: "Full-stack Designer",
  tagline: "Strategic design that drives growth, not just looks good.",
  url: "https://qazidadude.vercel.app",
  email: "shakeelurehman67@gmail.com",
  // Shown under "Call Me" in the footer; `phoneHref` is what the tap-to-call link dials.
  phone: "+92 318 0061395",
  phoneHref: "tel:+923180061395",
  // Shown as a live clock in the footer.
  timeZone: "Asia/Karachi",
  basedIn: "Pakistan",
  happyClients: "15+",
  bookingUrl: "https://cal.com/",
  social: [
    { label: "X / Twitter", href: "https://twitter.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/qazishakeel/" },
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
    { label: "Behance", href: "https://www.behance.net/qazidadude" },
  ],
  // Which of the `social` links each spot shows.
  footerSocial: ["LinkedIn", "Behance"],
  aboutSocial: ["X / Twitter", "LinkedIn", "Instagram", "Dribbble"],
} as const;

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  // The intro section with the portrait (see Intro.tsx).
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

// First-person intro shown beside the work history, right below the projects grid.
export const INTRO = [
  "I’ve spent the past 06 years working in product design, from the fast pace of design agencies to focused in-house roles.",
  "Currently, I am UX Designer remotely at Brandcave, ensuring we deliver the best experiences for clients.",
] as const;

// Full-height intro above the hero: a rotating 3D wall of project thumbnails behind the avatar.
export const SPOTLIGHT = {
  greeting: "Hi, I’m Shakeel",
  // One entry per line.
  title: ["Full-stack", "Designer"],
  ctaLabel: "Start a project",
  ctaHref: "#contact",
  // `highlight` is set in white; the rest of the quote stays gray.
  quote: {
    before: "“I help founders who care about their users ship ",
    highlight: "thoughtful, impactful products",
    after: ", not just another template.”",
  },
} as const;

export const HERO = {
  // Small greeting above the title, followed by a waving hand.
  eyebrow: "Hello",
  // One entry per line; the first is set in gray.
  headline: ["I’m Shakeel", "Product & UX Designer", "@ Brandcave"],
  // Label / value pairs shown under the title. `live` adds the availability dot.
  facts: [
    { label: "Currently", value: "Available for new gig", live: true },
    { label: "Previously at", value: "Mavric, Codility & Bitsclan" },
    { label: "Working globally", value: "Pakistan based" },
  ],
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
  "UX / UI Consultation",
] as const;

// Newest first; the first entry sits on top of the stacked deck.
export const WORK_HISTORY = [
  { company: "Brandcave", role: "UI/UX Designer", period: "Feb 2026 – Present" },
  { company: "MAVRIC", role: "UI/UX Designer", period: "Oct 2023 – Jan 2026" },
  { company: "Codility", role: "UI/UX Designer", period: "Mar 2021 – Oct 2023" },
  { company: "Bitsclan", role: "Intern UI/UX Designer", period: "Dec 2020 – Mar 2021" },
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
  ],
} as const;

// Client names shown in the logo ticker.
// Logo files live in public/clients/<file>.
export const CLIENTS = [
  { name: "SynkedUP", file: "synkedup.svg" },
  { name: "Gym Owners", file: "gymowners.svg" },
  { name: "Parachute", file: "parachute.svg" },
  { name: "TruAsset", file: "truasset.svg" },
  { name: "RealWired", file: "realwired.svg" },
  { name: "Ledgerwise", file: "ledgerwise.svg" },
  { name: "RHK Properties", file: "rhk.svg" },
  { name: "Stay", file: "stay.svg" },
  { name: "JT Bates", file: "jtbates.svg" },
  { name: "RDC", file: "rdc.svg" },
  { name: "Ashore", file: "ashore.svg" },
  { name: "TouchTight", file: "touchtight.svg" },
  { name: "SophyLove", file: "sophylove.svg" },
] as const;
