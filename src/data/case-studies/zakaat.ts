import { DESIGN_PROCESS, imagesFor, type CaseStudy } from "./types";

const zak = imagesFor("zakaat");
// Phone screenshots are all exported at the same size.
const phone = (file: string, alt: string) => zak(file, 873, 1782, alt);

export const ZAKAAT: CaseStudy = {
  impact: "85% reduction in calculation time",
  meta: [
    { label: "Category", value: "Zakat Calculator" },
    { label: "Role", value: "Lead Designer" },
    { label: "Year", value: "2026" },
  ],
  cover: zak("cover.png", 2048, 1434, "Zakaat app home screen on a phone"),
  subCardsGap: 48,
  sections: [
    {
      id: "problem",
      title: "Problem",
      blocks: [
        {
          type: "text",
          text: "Many Muslims struggle to accurately calculate how much Zakat they owe based on their assets, including cash, gold, property, and investments. Additionally, they face challenges in maintaining a record of their assets over time, such as tracking gold purchases made several years ago and managing multiple gold assets. Without a proper history, it becomes difficult to determine the exact Zakat amount due each year. Furthermore, finding and distributing Zakat to legitimate recipients remains a challenge, ensuring it reaches those in need.",
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
            "Users struggle to total diverse assets correctly.",
            "Users forget when they bought gold or assets. No history makes it hard to track wealth or the one-year holding rule.",
            "Users can't find verified people in need. Without a direct way to pay, they worry if their Zakat reaches the right place.",
          ],
          image: zak("pain-points.png", 1284, 1105, "Illustration of a confused user"),
        },
      ],
    },
    {
      id: "design-process",
      title: "Design process",
      blocks: [
        {
          type: "list",
          items: [
            "It Prevents a solution too early, becuase we need to validate if this is a calculation problem or the history and tracking problem.",
            "This project isnt one problem there are 3 Calculation, Record-keeping, and Distribution. Double diamond allows to diverge in first phase whioch is Discovery.",
            "By Diverging before converging I ensured that solution addressed the Gap.",
          ],
        },
        { type: "image", image: DESIGN_PROCESS, scale: 0.7 },
      ],
    },
    {
      id: "discover",
      title: "Discover\nResearch & Empathy",
      blocks: [
        {
          type: "sub",
          title: "Knowledge++",
          text: ["I approached local masjid Imam and cleared some of my ambiguities."],
          items: [
            "How to calculate Nisab?",
            "Is Nisab equals in all Fikah?",
            "How to calculate hawl?",
            "In how many ways I can give zakat?",
            "Am I liable to pay previous years zakat if not done on time?",
            "What are beneficiary according to Sunnah and Ahadees?",
          ],
        },
        {
          type: "sub",
          title: "User Research",
          text: ["Conducted a survey (58) responses and 3 In-Depth Interviews to understand the emotional burden."],
          items: [
            "75% of users have gold or stocks, but only feel confident calculating cash.",
            "50% of users don't know the current Nisab and leave the app to Google it.",
            "60% of users struggle to track old assets. They just guess\" the dates, which makes them feel like their final Zakat calculation is wrong.",
            "65% of respondents indicated that \"finding and distributing Zakat to legitimate recipients\" is a major challenge.",
          ],
        },
        {
          type: "sub",
          title: "Competitive Analysis",
          images: [
            zak("competitive-1.png", 1680, 403, "Competitive analysis, part 1"),
            zak("competitive-2.png", 1680, 528, "Competitive analysis, part 2"),
          ],
        },
      ],
    },
    {
      // The Define phase is split into one section each; the phase name rides on the first as an eyebrow.
      id: "define",
      eyebrow: "Define: Synthesis & Strategy",
      title: "User Persona",
      blocks: [
        {
          type: "persona",
          name: "Omar",
          photo: zak("omar.png", 240, 240, "Omar, the user persona"),
          fields: [
            { label: "Age", value: "32" },
            { label: "Occupation", value: "Professional" },
            { label: "Location", value: "Pakistan" },
            { label: "Tech literate", value: "Moderate" },
          ],
        },
        {
          type: "groups",
          items: [
            {
              title: "Goals & Motivations",
              items: [
                "He wants 100% accuracy to fulfill his duty and \"purify\" his wealth.",
                "As a busy professional, he hates the tedious manual work of checking live gold and silver rates.",
                "He needs to know his money reaches real, legitimate people in need.",
                "He wants a clear, historical record of his wealth (especially gold) to eliminate the stress of \"guessing\" values and to ensure his family's financial legacy is organized and Zakat-ready.",
              ],
            },
            {
              title: "Pain Points & Frustrations",
              items: [
                "He struggles to remember old jewelry details (like wedding gold), leading to stress and guesswork every year.",
                "He is frustrated by jumping between banks, gold-price sites, and calculators; he wants one \"single source of truth.\"",
                "Fearing his money won't reach those in need directly.",
              ],
            },
            {
              title: "Behavioral Traits",
              items: [
                "He often leaves his calculation until the last ten days of Ramadan, which increases his stress when he can't find old receipts.",
                "He currently uses a manual Excel sheet but finds it \"cold\" and prone to formula errors.",
                "He prefers to manage his finances on the go and would likely use a mobile app if it felt secure and professional.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "user-journey",
      title: "User Journey",
      blocks: [{ type: "image", image: zak("user-journey.png", 1680, 685, "User journey") }],
    },
    {
      id: "empathy-map",
      title: "Empathy Mapping",
      blocks: [
        {
          type: "groups",
          items: [
            {
              title: "SAYS",
              items: [
                "\"I want to be 100% sure my Zakat is calculated correctly.\"",
                "\"Checking gold prices manually every year is so tedious.\"",
                "\"I’m not sure if this charity is actually using my money for the poor.\"",
              ],
            },
            {
              title: "THINKS",
              items: [
                "Did I miss the Nisab threshold this year?",
                "I wish there was one place where I could see all my wealth history.",
                "I’m not sure if this charity is actually using my money for the poor.",
              ],
            },
            {
              title: "FEELS",
              items: [
                "Happy In the beginning to start a virtue.",
                "Worried about making a mistake in a religious obligation.",
                "Annoyed by the fragmented process and app fatigue.",
                "Uncertain about the \"last-mile\" delivery of his donation.",
              ],
            },
            {
              title: "DOES",
              items: [
                "Switches between bank apps, gold price websites, and calculators",
                "Searches for old receipts or wedding photos to guess gold weight.",
                "Uses a manual Excel sheet or a notepad to track his assets.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "hmw",
      title: "How Might We",
      blocks: [
        {
          type: "groups",
          items: [
            {
              title: "Solving for Calculation Anxiety",
              items: [
                "HMW help Omar digitize and store physical gold details (weight, karat, and purchase date) so he never has to perform manual \"guesswork\" again?",
                "HMW create a \"set-and-forget\" asset ledger that automatically adjusts the value of previously entered jewelry based on today’s market rates?",
              ],
            },
            {
              title: "Solving for Assets",
              items: [
                "HMW use image recognition (OCR) to extract asset data from gold receipts or bank statements to minimize manual typing for a busy professional?",
                "HMW quantify the impact of a donation (e.g., meals provided) in real-time to replace \"skepticism\" with a sense of spiritual fulfillment?",
              ],
            },
            {
              title: "Solving for Trust",
              items: [
                "HMW provide \"last-mile\" verification to Omar so he feels 100% confident that his funds reached a legitimate beneficiary?",
                "HMW quantify the impact of a donation (e.g., meals provided) in real-time to replace \"skepticism\" with a sense of spiritual fulfillment?",
              ],
            },
            {
              title: "Solving for Memory Burden",
              items: [
                "HMW proactively alert Omar when his Hawl (lunar year) is nearing completion, preventing the \"Ramadan rush\" and associated stress?",
                "HMW design a visual \"Nisab Tracker\" that clearly shows Omar how close his total liquid assets are to the threshold throughout the year?",
              ],
            },
          ],
        },
      ],
    },
    {
      // Its own section, so it sits between the full-width divider lines.
      id: "user-story",
      title: "User Story\nTemplate",
      blocks: [
        {
          type: "quote",
          text: "As a User, I want to easily track and calculate my diverse assets over time, so that I can accurately fulfill my Zakat obligation with total peace of mind and ensure my contribution reaches those truly in need.",
        },
      ],
    },
    {
      // The Develop phase is split into one section each; the phase name rides on the first as an eyebrow.
      id: "develop",
      eyebrow: "Develop: Ideation & Prototyping",
      title: "Word Bank",
      blocks: [{ type: "image", image: zak("word-bank.png", 1920, 1080, "Word bank") }],
    },
    {
      id: "information-architecture",
      title: "Information Architecture",
      blocks: [{ type: "image", image: zak("information-architecture-v2.png", 1671, 802, "Information architecture") }],
    },
    {
      id: "crazy-8s",
      title: "Crazy 8’s",
      blocks: [{ type: "image", image: zak("crazy-8s.png", 829, 587, "Crazy 8's sketches for the homepage") }],
    },
    {
      id: "user-flows",
      title: "User Flows",
      blocks: [{ type: "image", image: zak("user-flows.png", 4625, 3379, "User flows for adding an asset and paying Zakat") }],
    },
    {
      id: "deliver",
      title: "Deliver",
      blocks: [
        { type: "text", text: "Done with High Fidelity screen, Prototypes, And Design system hand-off" },
        { type: "image", image: zak("deliver.png", 1920, 1080, "High fidelity screens") },
      ],
    },
    {
      id: "key-screens",
      title: "Visualizing the Solution: Key Screens",
      blocks: [
        {
          type: "sub",
          title: "Homepage - Not eligible condition 1",
          text: [
            "Eligibility for zakat depends upon 2 factors the net worth should be equal or more than the nisab and that amount should be idle for straight 1 year.In this scenario User is not eligible because none of the condition is fulfilled.",
            "When user lands on homepage they have a card at top which firstly tells either you are eligible for zakat or not.user can easily check their net worth and select type of nisab.",
            "The user dont need to calculate the nisab at all the app will automatically do it for the user when they update the assets.",
          ],
          images: [phone("home-not-eligible-1.png", "Homepage, not eligible: condition 1")],
          phone: true,
        },
        {
          type: "sub",
          title: "Homepage - Not eligible condition 2",
          text: [
            "In this case 1 condition i.e net worth threshold met to the nisab but the second condition still needs to met top become eligible for zakat.",
          ],
          images: [phone("home-not-eligible-2.png", "Homepage, not eligible: condition 2")],
          phone: true,
        },
        {
          type: "sub",
          title: "Homepage - Eligible condition",
          text: ["In this case both conditions met and user is eligible to pay zakat"],
          images: [phone("home-eligible.png", "Homepage, eligible")],
          phone: true,
        },
        {
          type: "sub",
          title: "Assets",
          text: [
            "Here goes the empty and filled state of Asset management.User can perform 2 main actions from this UI Add asset and Add liability, once Assets are added user can filter the added items as well.",
          ],
          images: [phone("assets-empty.png", "Assets, empty state"), phone("assets-filled.png", "Assets, filled state")],
          phone: true,
        },
        {
          type: "sub",
          title: "Assets Activity",
          text: ["User can have a look at complete assets activity , also with provided filters."],
          images: [phone("assets-activity.png", "Assets activity")],
          phone: true,
        },
        {
          type: "sub",
          title: "Add Asset",
          text: ["User can add multiple type of assets, enter date of purchase and upload receipts as well."],
          images: [phone("add-asset-1.png", "Add asset, step 1"), phone("add-asset-2.png", "Add asset, step 2")],
          phone: true,
        },
        {
          type: "sub",
          title: "Pay Zakat",
          text: [
            "Users can in 2 ways.",
            "1st is pay to anyone by themselves and 2nd is pay via NGO's.User can pay zakat to anyone in their circle and later on they can update the balance on the application.Also they can pay via trusted NGO's.",
          ],
          images: [phone("pay-zakat-1.png", "Pay Zakat, option 1"), phone("pay-zakat-2.png", "Pay Zakat, option 2")],
          phone: true,
        },
        {
          type: "sub",
          title: "Zakat Payment via NGO",
          text: [
            "Users can pay NGO's in 2 ways.",
            "1st is pay via Bank transfer where user can copy their bank details and go to their banking apps and transfer amount directly to their account and then update the amount in the app.Second way to pay is via card, where user can see some amount suggestions for auto-fill.",
          ],
          images: [phone("ngo-bank.png", "Pay an NGO by bank transfer"), phone("ngo-card.png", "Pay an NGO by card")],
          phone: true,
        },
      ],
    },
    {
      id: "ux-impacts",
      title: "UX Impacts",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "95%", label: "Task Success Rate" },
            { value: "5Min", label: "Time to Completion" },
          ],
        },
        {
          type: "sub",
          tight: true,
          items: [
            "Designed a centralized financial ecosystem that streamlines Zakat calculation into a 7-minute process, projected to reduce user calculation errors by 98% through real-time asset tracking and verified beneficiary integration.",
            "Automated the $2.5%calculation across 6+ asset classes, removing manual math risks.",
            "Integrated a historical ledger to solve the 'memory gap' of asset acquisition dates.",
            "Reduced donation friction by bridging the gap between calculation and verified distribution in one flow.",
          ],
        },
      ],
    },
  ],
};
