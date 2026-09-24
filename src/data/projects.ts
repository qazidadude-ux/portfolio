export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  year: string;
  role: string;
  client: string;
  tools: string[];
  color: string; // fallback background if no image is supplied
  overview: string;
  gallery?: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "kora",
    name: "Kora",
    category: "Consulting Site",
    summary: "A calm, confidence-building marketing site for a boutique consulting firm.",
    year: "2025",
    role: "Brand & Web Design",
    client: "Kora Consulting",
    tools: ["Figma", "Framer"],
    color: "#efe9e1",
    overview:
      "Kora needed a site that felt as considered as the advice they give. We rebuilt their information architecture around outcomes, not services, and paired it with a restrained, editorial visual system.",
  },
  {
    slug: "kyma",
    name: "KYMA",
    category: "AI Agency",
    summary: "Positioning and product site for an AI agency scaling past its first clients.",
    year: "2024",
    role: "Full-Stack Design",
    client: "KYMA",
    tools: ["Figma", "Webflow", "Rive"],
    color: "#101010",
    overview:
      "KYMA came to us pre-revenue with a strong point of view but no visual language to match. We built a dark, technical brand system and a site built to convert enterprise buyers.",
  },
  {
    slug: "mugen",
    name: "Mugen",
    category: "Design Studio",
    summary: "A portfolio and case-study system for a multidisciplinary design studio.",
    year: "2023",
    role: "Staff Product Designer",
    client: "Mugen Studio",
    tools: ["Figma", "Framer", "Blender"],
    color: "#e4dff5",
    overview:
      "Mugen's work speaks for itself — the challenge was building a case-study template flexible enough to showcase branding, motion, and product work without ever feeling generic.",
  },
  {
    slug: "axiom",
    name: "Axiom",
    category: "Ecommerce Site",
    summary: "A conversion-focused storefront redesign for a DTC hardware brand.",
    year: "2022",
    role: "Designer",
    client: "Axiom",
    tools: ["Figma", "Webflow"],
    color: "#dfeee3",
    overview:
      "Axiom's storefront looked good but converted poorly. We rebuilt the PDP and checkout flow around clarity and trust signals, lifting conversion without touching the brand identity.",
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
