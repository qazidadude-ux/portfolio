// Placeholder testimonials: replace with real quotes from your clients before relying on them.
// `highlight` (optional) must be an exact substring of `quote`; it renders in bold.
export const TESTIMONIALS: ReadonlyArray<{
  quote: string;
  highlight?: string;
  name: string;
  role: string;
}> = [
  {
    quote:
      "After the redesign our users stopped getting lost, and support requests dropped noticeably within the first month.",
    highlight: "support requests dropped noticeably",
    name: "Martina Martinez",
    role: "Customer Manager at SupportEase",
  },
  {
    quote:
      "Shakeel picked up our vision faster than we could explain it and turned it into something sharper than we'd pictured.",
    highlight: "turned it into something sharper than we'd pictured",
    name: "Thomas Weber",
    role: "Co-founder of KYMA",
  },
  {
    quote: "Clear process, quick turnaround, and a site that finally converts the traffic we were already getting.",
    highlight: "a site that finally converts",
    name: "Ben Harper",
    role: "CTO of Nexus",
  },
  {
    quote:
      "Our dashboards were dense and hard to read. Shakeel made the complex parts feel simple without dumbing them down.",
    name: "Michael Wong",
    role: "Data Scientist at DataSphere",
  },
  {
    quote: "The new identity feels like us, only more confident. It set us apart in a crowded market.",
    highlight: "It set us apart in a crowded market.",
    name: "Natalie Rivera",
    role: "Brand Manager at UnityBrands",
  },
  {
    quote: "From first call to launch the project felt easy, and our audience noticed the difference right away.",
    highlight: "our audience noticed the difference right away",
    name: "Emma Kraft",
    role: "CMO of TechVista",
  },
];

// Featured pull-quote shown right below the hero projects grid.
export const FEATURED_TESTIMONIAL = {
  quote:
    "Working with Shakeel was like adding a senior designer to the team overnight. He understood what KYMA needed and delivered more than we asked for.",
  name: "Thomas Weber",
  role: "Co-founder of KYMA",
} as const;
