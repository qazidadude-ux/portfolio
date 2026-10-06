// Slides for the "Selected Visuals" carousel, in order. Images live in public/visuals/ as lossless
// WebP at full resolution (~4000px wide) and should be about 1.45:1 so they fill the slide without
// cropping. The order keeps shots of the same product apart. `title` is the image's alt text;
// `color` shows behind it while loading.
export type Visual = {
  title: string;
  /** Fallback background while there is no image (or while it loads). */
  color: string;
  image?: string;
};

export const VISUALS: Visual[] = [
  { title: "RHK Properties: real estate marketplace homepage", color: "#1f4fd8", image: "/visuals/01-rhk-home.webp" },
  { title: "Kinkle: dental supplies dashboard on web and mobile", color: "#ff5a1f", image: "/visuals/02-kinkle-dashboard.webp" },
  { title: "SynkedUp: timesheet and job newsfeed screens", color: "#e7847a", image: "/visuals/03-synkedup-timesheets.webp" },
  { title: "Red Stars: football club dashboard", color: "#3c7fd9", image: "/visuals/04-red-stars-dashboard.webp" },
  { title: "Hoxro: cloud legal management software website", color: "#2f6fd6", image: "/visuals/05-hoxro-legal-software.webp" },
  { title: "Finance dashboard: sales and spend insights", color: "#15191d", image: "/visuals/06-finance-insights.webp" },
  { title: "Gym Owners: member attendance dashboard", color: "#1b1b1b", image: "/visuals/07-gym-owners.webp" },
  { title: "Kinkle: product detail and order approval on mobile", color: "#ff5a1f", image: "/visuals/08-kinkle-product-order.webp" },
  { title: "FFSA: time and attendance check-in report", color: "#6a8fd8", image: "/visuals/09-ffsa-checkin-report.webp" },
  { title: "SynkedUp: crew timesheets and job overview", color: "#56626d", image: "/visuals/10-synkedup-crew.webp" },
  { title: "MyObituaryApp: feature overview", color: "#1f8a92", image: "/visuals/11-myobituaryapp-features.webp" },
  { title: "Electronics store: category landing page", color: "#f5f5f5", image: "/visuals/12-electronics-store.webp" },
  { title: "RHK Properties: leads CRM", color: "#5fb6f2", image: "/visuals/13-rhk-leads.webp" },
  { title: "Red Stars: club calendar", color: "#3c7fd9", image: "/visuals/14-red-stars-calendar.webp" },
  { title: "Kinkle: product catalogue on web and mobile", color: "#ff5a1f", image: "/visuals/15-kinkle-catalogue.webp" },
  { title: "Parallel Loop: developer hiring website", color: "#0d1f17", image: "/visuals/16-parallel-loop.webp" },
  { title: "SynkedUp: guided onboarding tour", color: "#5b6a78", image: "/visuals/17-synkedup-tour.webp" },
  { title: "Hoxro: legal practice management website", color: "#2f6fd6", image: "/visuals/18-hoxro-legal-practice.webp" },
  { title: "AVD: IT products catalogue", color: "#eef1f6", image: "/visuals/19-avd-product-list.webp" },
  { title: "Red Stars: teams list", color: "#2b2f4a", image: "/visuals/20-red-stars-teams.webp" },
  { title: "Red Stars: dashboard detail", color: "#2b2f4a", image: "/visuals/21-red-stars-dashboard-detail.webp" },
];
