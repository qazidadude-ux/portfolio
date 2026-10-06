export type Project = {
  slug: string;
  name: string;
  /** Project type, shown above the name on cards, e.g. "Food Marketplace". */
  category: string;
  /** One-line result shown under the name on cards; left out until there is a real number. */
  impact?: string;
  summary: string;
  year: string;
  role: string;
  client: string;
  tools: string[];
  color: string; // fallback background if no image is supplied
  /**
   * Thumbnail used on every project card, the hero fan and the project page banner. Usually not
   * needed: an image named after the slug in public/projects/ (e.g. chowmill.jpg) is picked up
   * automatically. Set this only to use a different file, e.g. "/projects/chowmill-cover.png". A 4:3
   * image about 1600×1200 works best; with neither, the color + category label shows instead.
   */
  thumbnail?: string;
  overview: string;
  gallery?: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "synkedup",
    name: "SynkedUp",
    category: "Field Service Management",
    impact: "3x faster time tracking",
    summary: "Replacing per-employee Google Sheets with a guided time-tracking flow for field and office crews.",
    year: "2025",
    role: "Lead Designer",
    client: "SynkedUP",
    tools: ["Figma"],
    color: "#222222",
    overview:
      "The company’s field and office teams were tracking work hours using Google Sheets. Each employee maintained their own sheet — manually recording hours, jobs, and breaks. This method created major inconsistencies in reporting and inefficiencies in payroll processing.",
  },
  {
    slug: "chowmill",
    name: "Chowmill",
    category: "Food Marketplace",
    impact: "28% increase in order conversion",
    summary: "A food delivery platform connecting customers with local restaurants, redesigned for multi-restaurant, buffet-style and diet-aware ordering.",
    year: "2023",
    role: "Lead Designer",
    client: "Chowmill",
    tools: ["Figma", "Framer"],
    color: "#f4f5f9",
    overview:
      "Chowmill is a Food delivery platform that connects customers with local restaurants. It allows users to order food from a diverse cuisines, combos, diets, and restaurant options in their area through a mobile app or website.",
  },
  {
    slug: "gymowners",
    name: "Gym Owners",
    category: "Gym Management System",
    impact: "75% less admin time for gym staff",
    summary: "An all-in-one gym management platform built by gym owners for gym owners: real-time KPIs, predictive analytics and coaching tips.",
    year: "2026",
    role: "Lead Designer",
    client: "GymOwners",
    tools: ["Figma"],
    color: "#202020",
    overview:
      "Gym owners face daily challenges juggling operations, sales, retention, and reporting, often relying on clunky and fragmented tech solutions. GYMOWNERS was born from these frustrations—a powerful, easy-to-use platform built by gym owners for gym owners. It provides real-time KPIs, predictive analytics, and actionable coaching tips, enabling owners to grow their business without drowning in complexity.",
  },
  {
    slug: "zakaat",
    name: "Zakaat",
    category: "Zakat Calculator App",
    impact: "85% reduction in calculation time",
    summary: "A Zakat app that calculates what you owe, keeps a history of your assets and helps you pay verified recipients.",
    year: "2026",
    role: "Lead Designer",
    client: "Zakaat",
    tools: ["Figma"],
    color: "#f4f5f9",
    overview:
      "Many Muslims struggle to accurately calculate how much Zakat they owe based on their assets, including cash, gold, property, and investments.",
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
