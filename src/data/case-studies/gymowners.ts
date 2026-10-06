import { DESIGN_PROCESS, imagesFor, type CaseStudy } from "./types";

const gym = imagesFor("gymowners");

export const GYMOWNERS: CaseStudy = {
  impact: "Reduced admin time by 75% and 42% Reduction in Member Churn Rate",
  meta: [
    { label: "Category", value: "Fitness Tech" },
    { label: "Role", value: "Lead Designer" },
    { label: "Year", value: "2026" },
    { label: "Client", value: "GymOwners" },
  ],
  cover: gym("cover.png", 1920, 1080, "GymOwners member attendance dashboard on a laptop"),
  subImageGap: 24,
  sections: [
    {
      id: "overview",
      title: "Project Overview",
      blocks: [
        {
          type: "text",
          text: "Gym owners face daily challenges juggling operations, sales, retention, and reporting, often relying on clunky and fragmented tech solutions. GYMOWNERS was born from these frustrations—a powerful, easy-to-use platform built by gym owners for gym owners. It provides real-time KPIs, predictive analytics, and actionable coaching tips, enabling owners to grow their business without drowning in complexity.",
        },
      ],
    },
    {
      id: "scope",
      title: "Scope of Service",
      blocks: [
        {
          type: "text",
          text: "As the Product Designer, I was responsible for the full design lifecycle — from discovery and strategy to UI design, and delivery of high-fidelity mockups ready for development.",
        },
        { type: "image", image: gym("scope.png", 1800, 800, "Scope of service across the design lifecycle") },
      ],
    },
    {
      id: "research-goal",
      title: "Research Goal",
      blocks: [
        {
          type: "text",
          text: "Understand how gym owners and managers interact with current systems, and identify friction points affecting retention and efficiency.",
        },
      ],
    },
    {
      id: "design-process",
      title: "Design Process",
      blocks: [{ type: "image", image: DESIGN_PROCESS, scale: 0.7 }],
    },
    {
      id: "research-methods",
      title: "Research Methods",
      blocks: [
        {
          type: "list",
          items: [
            "8 in-depth user interviews with gym owners, front-desk staff, and trainers.",
            "Survey distributed to 50+ fitness centers of varying sizes (boutique gyms to large franchises).",
            "Competitive analysis of 5 leading gym management tools (Mindbody, Glofox, Zen Planner, ClubReady, PushPress)",
          ],
        },
      ],
    },
    {
      id: "stakeholder-questionnaire",
      title: "Stakeholder Questionnaire",
      blocks: [
        { type: "text", text: "Goal: Understand business vision, success metrics, constraints, and priorities." },
        {
          type: "list",
          items: [
            "What business objectives does GymOwner aim to achieve in the next 12 months?",
            "What KPIs define success for this system (e.g., number of active gyms, reduced churn, improved billing efficiency)?",
            "What makes GymOwner different from existing gym software?",
            "Which features are must-have vs. nice-to-have?",
            "Who is the primary user (e.g., gym owners, trainers, staff, members)?",
            "What are their main challenges today in managing their gym operations?",
            "What tasks do you want users to accomplish most efficiently?",
            "How will we know if GymOwner is successful?",
            "What business outcomes are you hoping this product impacts (e.g., fewer billing errors, higher member retention, faster staff scheduling)?",
          ],
        },
      ],
    },
    {
      id: "user-research",
      title: "User Research",
      blocks: [
        {
          type: "text",
          text: "Goal: Capture needs, behaviors, and frustrations of key user types — Gym Owners, Trainers, Admin Staff, and Members.",
        },
        {
          type: "groups",
          items: [
            {
              title: "Gym Owners / Managers",
              items: [
                "How do you currently manage member attendance, billing, and scheduling?",
                "What are your biggest pain points in managing day-to-day operations?",
                "How often do you or your staff face data inconsistencies between membership and payments?",
                "How do you currently handle class scheduling and cancellations?",
                "How do you track member engagement or attendance trends?",
              ],
            },
            {
              title: "Staff / Trainers",
              items: [
                "How do you record attendance today?",
                "How do you manage class rosters and changes?",
                "How do you communicate updates or cancellations to members?",
                "What slows you down when using your current system?",
                "How do you track session capacity or waitlists?",
              ],
            },
            {
              title: "Members",
              items: [
                "How do you check your session schedule or attendance history?",
                "What frustrates you most when booking sessions or managing payments?",
                "What’s your preferred method of communication with the gym?",
                "Do you prefer auto-renewing memberships or flexible plans?",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "competitors",
      title: "Market & Competitor Analysis",
      blocks: [
        { type: "text", text: "Goal: Benchmark GymOwner against leading gym management systems to identify opportunities." },
        {
          type: "table",
          columns: ["Platforms", "Strengths", "Weaknesses", "Opportunity"],
          rows: [
            ["Mindbody", "Powerful scheduling, mobile app, integrated marketing.", "Complex UI, expensive for small gyms.", "Simplify UX and offer affordable tier for small businesses."],
            ["Glofox", "Strong member app, performance tracking.", "Limited customization.", "Provide more flexible plan setup & reporting customization."],
            ["Zen Planner", "Comprehensive CRM and billing.", "Dated UI, steep learning curve.", "Modernize interface and improve ease of use."],
            ["ClubReady", "Enterprise-level analytics.", "Hard for smaller gyms.", "Serve mid-size gyms with enterprise-grade analytics at better UX."],
            ["PushPress", "Simple interface, transparent pricing.", "Fewer automation tools.", "Add automation for billing and attendance tracking."],
          ],
        },
      ],
    },
    {
      id: "pain-points",
      title: "Pain Points",
      blocks: [
        {
          type: "listWithImage",
          items: [
            "Manual attendance tracking — prone to errors.",
            "Disconnected systems for payments, membership, and scheduling.",
            "Lack of visibility into member engagement and retention data.",
            "Complex pricing and billing setup (e.g., session packs, renewals).",
            "Difficulty managing multiple trainers and locations.",
            "Poor member experience when booking or cancelling sessions.",
          ],
          image: gym("pain-points.png", 1284, 1105, "Illustration of a confused user"),
        },
      ],
    },
    {
      id: "motivations",
      title: "Motivations",
      blocks: [
        {
          type: "list",
          items: [
            "Save administrative time.",
            "Improve financial accuracy.",
            "Increase member retention through better engagement tracking.",
            "Reduce friction in scheduling and payments",
            "Gain operational visibility in one dashboard",
          ],
        },
      ],
    },
    {
      id: "empathy-map",
      title: "Empathy Map",
      blocks: [
        {
          type: "empathy",
          rows: [
            {
              title: "What Users Say 💬",
              tone: "green",
              items: [
                "“I spend too much time analyzing data instead of training clients.”",
                "“I wish there was one tool that does everything in one place.”",
                "“These reports are confusing and don’t help me make quick decisions.”",
              ],
            },
            {
              title: "What Users Do 💪",
              tone: "yellow",
              items: [
                "Manually exports data from multiple tools to spreadsheets.",
                "Spends hours reviewing member attendance and payment trends.",
                "Checks different dashboards and reports to track marketing ROI.",
              ],
            },
            {
              title: "What Users Think 💭",
              tone: "blue",
              items: [
                "I’m wasting time doing admin work that could be automated.",
                "I might be missing important signs of member churn.",
                "I want to focus on growing my business, not managing spreadsheets.",
              ],
            },
            {
              title: "What Users Feel 💔",
              tone: "purple",
              items: [
                "Frustrated with manual processes, anxious about losing members.",
                "Overwhelmed by multiple disconnected systems.",
                "Anxious about losing members without early warning.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "user-journey",
      title: "Current User Journey",
      blocks: [
        {
          type: "table",
          columns: ["Stage", "Action", "Experience", "Friction Points"],
          rows: [
            ["Member Onboarding", "Collects member info manually or via Google Forms", "Time-consuming, errors in data entry", "Data scattered across tools"],
            ["Membership Setup", "Manually tracks plan type, renewal, payments", "Inconsistent updates", "No auto-renewal reminders"],
            ["Scheduling", "Uses spreadsheets or WhatsApp to assign trainers and sessions", "Unstructured, easily lost", "No visibility for staff"],
            ["Attendance Tracking", "Paper-based or manual entry", "Prone to mistakes", "No historical trend insights"],
            ["Billing & Payments", "Manual invoices or third-party apps", "Disconnected from attendance", "Revenue leak risk"],
            ["Reporting", "Manually aggregates data for insights", "Takes hours", "No clear overview of performance"],
          ],
        },
      ],
    },
    {
      id: "key-findings",
      title: "Research Keyfindings",
      blocks: [
        {
          type: "text",
          text: "Most users expressed interest in a simpler, visually clear dashboard with real-time reporting and retention insights.",
        },
        {
          type: "stats",
          items: [
            { value: "65%", label: "of Users Use 3 or more different tools to manage their gym operations" },
            { value: "58%", label: "of Users have no visibility on churn causes until it’s too late" },
            { value: "72%", label: "of Users struggle to extract actionable insights from their current software" },
          ],
        },
        {
          type: "sub",
          items: [
            "87% of gym owners report admin overload as a major challenge.",
            "72% want automation for billing and attendance tracking",
            "Users 3+ different tools to manage operations",
            "80% find reporting difficult or time-consuming.",
            "64% reported reporting tools are slow or hard to interpret, leading to delayed decision-making.",
            "52% of gym managers struggle to forecast performance or spot “at-risk” members in time.",
            "70% rely on manual Excel sheets for performance tracking due to lack of actionable insights.",
          ],
        },
      ],
    },
    {
      id: "hmw",
      title: "How Might We",
      blocks: [
        { type: "image", image: gym("hmw.png", 1520, 595, "How might we") },
        {
          type: "sub",
          items: [
            "HMW simplify attendance tracking for staff across group and 1:1 sessions?",
            "HMW reduce manual effort in payment collection and reconciliation?",
            "HMW make session scheduling more transparent and predictable for members?",
            "HMW help owners reduce churn?",
            "HMW empower owners to make quick, informed decisions?",
            "HMW save owners time on repetitive admin tasks?",
            "HMW ensure owners always know their cash flow?",
            "HMW improve scheduling for classes and trainers?",
          ],
        },
      ],
    },
    {
      id: "user-goals",
      title: "User Goals",
      blocks: [
        {
          type: "list",
          items: [
            "Increase member retention and reduce churn",
            "Spend less time analyzing spreadsheets and more time engaging with clients",
            "Improve attendance visibility",
            "Cut admin time per member",
            "Build a single-platform solution combining all gym management needs.",
          ],
        },
      ],
    },
    {
      id: "business-goals",
      title: "Business Goals",
      blocks: [
        {
          type: "list",
          items: ["Improve operational efficiency", "Reduce support overhead", "Increase staff productivity", "Retain more members"],
        },
      ],
    },
    {
      id: "problem-statement",
      title: "Problem Statement",
      blocks: [
        {
          type: "quote",
          text: "As a gym owner, I need to manage members, staff, sessions, and payments in one unified system, so that I can save time on manual tasks, reduce billing errors, and provide a smoother experience for my members.",
        },
      ],
    },
    {
      id: "ideation",
      title: "Ideation & Prototyping",
      blocks: [
        {
          type: "text",
          text: "Goal : Explore multiple solutions and validate the best one through iterative design and testing to simplify workflows, improve visibility, and increase overall efficiency for gym owners, staff, and members.",
        },
        {
          type: "cards",
          items: [
            {
              title: "Ideation sessions",
              text: "Conducted collaborative sketching, flow mapping, and concept scoring workshops with gym owners, front desk staff, and trainers to align on operational bottlenecks and improvement priorities.",
            },
            {
              title: "Low-fidelity wireframes",
              text: "Created early structural layouts for Contacts, Attendance, Membership Details, Payments, and Session Scheduling pages to test data hierarchy, navigation, and visibility.",
            },
            {
              title: "Mid-to-high fidelity prototypes",
              text: "Developed interactive prototypes in Figma using atomic design principles for scalable and flexible updates. These prototypes were tested in real workflows by gym staff.",
            },
            {
              title: "Usability tests",
              text: "Conducted sessions with 12 participants (4 owners, 4 staff, 4 members) to validate flow efficiency, task discoverability, and data comprehension. Iterations were driven by both quantitative metrics and qualitative feedback.",
            },
          ],
        },
      ],
    },
    {
      id: "iterations",
      title: "Iterations & Insights",
      blocks: [
        { type: "sub", title: "Dashboard", images: [gym("dashboard.png", 1440, 1024, "Dashboard")] },
        {
          type: "sub",
          title: "Attendance UI Before Testing",
          text: [
            "Three separate metric cards showed “Last Visit,” “Next Scheduled,” and “Total Sessions Attended.” Users couldn’t identify attendance patterns or trends over time.",
          ],
          images: [gym("attendance-before.png", 5784, 4104, "Attendance UI before testing")],
        },
        { type: "sub", title: "Feedback", quotes: ["I can’t tell if attendance is improving or dropping."] },
        {
          type: "sub",
          title: "UX Improved",
          items: [
            "Added a line graph showing attendance over time and highlighted upcoming sessions",
            "Added ability to select effective time period using dropdown",
            "We also added information icon which shows info about metric on hover.",
            "Added filter to Attendance Bar graph.",
          ],
          images: [gym("attendance-after.png", 2880, 2048, "Attendance UI after testing")],
        },
        {
          type: "sub",
          title: "Membership UI Before Testing",
          images: [gym("membership-before.png", 5784, 8180, "Membership UI before testing")],
        },
        {
          type: "sub",
          title: "Feedback",
          quotes: [
            "When I open the Membership Detail page, it feels like everything is crammed together — plans, invoices, payments, orders, all in one long scroll. I have to keep scrolling up and down to find what I need. It’s hard to tell where one section ends and the next begins. Honestly, it feels too dense and administrative — I just want to quickly adjust a balance or update a payment method without getting lost.",
          ],
        },
        {
          type: "sub",
          title: "UX Improved",
          items: [
            "Introduced tabbed navigation with clear segmentation for Payments, Invoices and reconciliation",
            "Task completion time dropped by 42%, and user satisfaction rose by 65% during follow-up testing.",
          ],
        },
        {
          type: "sub",
          title: "Membership modals UI",
          images: [gym("membership-modals.png", 5696, 10868, "Membership modals UI")],
        },
        {
          type: "sub",
          title: "Membership Detail UI",
          images: [gym("membership-detail.png", 5784, 5432, "Membership detail UI")],
        },
        { type: "sub", title: "Payment Detail UI", images: [gym("payment-detail.png", 5784, 4104, "Payment detail UI")] },
        {
          type: "sub",
          title: "Invoice Detail UI",
          images: [gym("invoice-detail.png", 5784, 6960, "Invoice detail UI")],
        },
        { type: "sub", title: "Order Detail UI", images: [gym("order-detail.png", 5784, 4552, "Order detail UI")] },
        { type: "sub", title: "Order List", images: [gym("order-list-before.png", 5784, 4104, "Order list before testing")] },
        {
          type: "sub",
          title: "Feedback",
          quotes: [
            "I have to scroll endlessly to find a specific Salesperson’s order — there’s no quick search.",
            "Refunding an order takes too many steps — I wish actions were visible upfront.",
          ],
        },
        {
          type: "sub",
          title: "UX Improved",
          items: ["Added drop down for Salesperson to filter data & took the actions out from 3 dots menu."],
          images: [gym("order-list-after.png", 5784, 4104, "Order list after testing")],
        },
        {
          type: "sub",
          items: ["Reduced average refund completion time by 58%", "Reduced average order lookup time by 64%."],
        },
      ],
    },
    {
      id: "schedule",
      title: "Schedule",
      blocks: [
        { type: "sub", title: "Weekly View", images: [gym("schedule-weekly.png", 5784, 4104, "Schedule, weekly view")] },
        { type: "sub", title: "Daily View", images: [gym("schedule-daily.png", 5784, 4104, "Schedule, daily view")] },
        { type: "sub", title: "Monthly View", images: [gym("schedule-monthly.png", 5784, 4104, "Schedule, monthly view")] },
      ],
    },
    {
      id: "products",
      title: "Products",
      blocks: [
        {
          type: "text",
          text: "We also added the product selling feature in GymOwners, Gym related products are listed in Gymowners.Where user can add a single or variable product.",
        },
        { type: "sub", title: "Products Listing", images: [gym("products-listing.png", 5784, 4104, "Products listing")] },
        { type: "sub", title: "Product Detail", images: [gym("product-detail.png", 5784, 4104, "Product detail")] },
        { type: "sub", title: "Product Performance", images: [gym("product-performance.png", 5784, 4724, "Product performance")] },
        { type: "sub", title: "Product Activity", images: [gym("product-activity.png", 5784, 4104, "Product activity")] },
      ],
    },
    {
      id: "ux-wins",
      title: "Overall UX Wins",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "75%", label: "Reduction in Admin Workload" },
            { value: "40%", label: "Increase in Session Utilization Rate" },
            { value: "65%", label: "Less Payment Follow-Up Time" },
            { value: "42%", label: "Reduction in Member Churn Rate" },
          ],
        },
      ],
    },
  ],
};
