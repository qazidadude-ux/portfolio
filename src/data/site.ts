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
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  headline: ["Design", "that", "delivers", "results."],
  subhead:
    "I create everything your brand needs to attract customers and turn them into sales.",
  ctaLabel: "Book a call with me",
} as const;

export const TECH_STACK = [
  "Figma",
  "Framer",
  "Webflow",
  "Rive",
  "Blender",
  "Trello",
  "ChatGPT",
  "Claude",
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

export const ABOUT = {
  stat: "1,214",
  statLabel: "hours of focused design work this year",
  paragraphs: [
    "I love turning ideas into something real through design. What started as a hobby turned into a career when I discovered how design can make things both look great and work better.",
    "I focus on creating user interfaces that serve a real purpose – making sure they're not just pretty, but actually solve problems. Whether I'm working on a mobile app or a website, my goal is to make something that feels natural and easy to use.",
    "I'm a bit of a perfectionist when it comes to the small stuff, but I think that's what makes good design great. This attention to detail helps me build strong relationships with clients, as they know I'll put the same care into their project.",
  ],
} as const;

export const PRICING = {
  intro: {
    title: "Subscription design services for brands who move fast.",
    slotsAvailable: "Slots available",
    ctaLabel: "Hire me today",
    subtext: "Skip the agency markup and work directly with an experienced designer.",
  },
  steps: [
    {
      title: "Subscribe",
      description: "Subscribe via Stripe & start requesting through my Trello board.",
    },
    {
      title: "Request",
      description: "Request whatever service I offer, from branding to web design.",
    },
    {
      title: "Receive",
      description: "Receive your design within 48 hours on average.",
    },
  ],
  plans: [
    {
      name: "Unlimited Design",
      price: "$8,000",
      period: "/ month",
      description: "One flat monthly rate for unlimited design requests. Ideal for ongoing design requirements.",
      features: [
        "No contracts or commitments",
        "Pause or cancel anytime",
        "Multiple brands",
        "Unlimited requests",
        "Avg 48 hour turnaround",
        "Framer development",
      ],
      ctaLabel: "Get Started",
      highlighted: true,
    },
    {
      name: "Single Project",
      price: "Custom",
      period: "quote",
      description: "Comprehensive design services for any project scope. Ideal for one-time design needs or individual tasks.",
      features: [
        "Clearly defined scope",
        "Fixed timeline",
        "3 revision rounds",
        "Milestone updates",
      ],
      ctaLabel: "Get Quote",
      highlighted: false,
    },
  ],
} as const;

export const FAQS = [
  {
    question: "How long does a typical project take to complete?",
    answer:
      "Project timelines vary based on complexity. A simple project might take 2-3 weeks, while more comprehensive designs can take 1-2 months. I will provide a specific estimate after our initial consultation.",
  },
  {
    question: "Can you work with my existing brand and designs?",
    answer:
      "Absolutely! I'm experienced in working with established brands. I will ensure all new designs align perfectly with your existing brand identity and style.",
  },
  {
    question: "What makes your design process unique?",
    answer:
      "My process stands out due to my collaborative approach. I involve you at every stage, ensuring the final product truly reflects your vision while benefiting from my expertise.",
  },
  {
    question: "Do you offer ongoing support after the project is completed?",
    answer:
      "Yes, I provide post-project support. This includes minor adjustments and answering questions about your new designs for up to 30 days after delivery. If there's a need for longer support, we can discuss a retainer.",
  },
  {
    question: "How do you handle confidentiality and intellectual property rights?",
    answer:
      "I take confidentiality seriously. All client information and project details are kept strictly confidential. Upon project completion, you'll own full intellectual property rights to the final designs.",
  },
] as const;
