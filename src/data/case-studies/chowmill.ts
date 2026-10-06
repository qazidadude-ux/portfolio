import { DESIGN_PROCESS, imagesFor, type CaseStudy } from "./types";

const chow = imagesFor("chowmill");

export const CHOWMILL: CaseStudy = {
  impact: "Increased order conversions by 28%",
  meta: [
    { label: "Category", value: "Food Marketplace" },
    { label: "Role", value: "Lead Designer" },
    { label: "Year", value: "2023" },
    { label: "Client", value: "Chowmill" },
  ],
  cover: chow("cover.png", 1520, 927, "Chowmill ordering experience on desktop"),
  sections: [
    {
      id: "overview",
      title: "Project Overview",
      blocks: [
        {
          type: "text",
          text: "Chowmill is a Food delivery platform that connects customers with local restaurants. It allows users to order food from a diverse cuisines, combos, diets, and restaurant options in their area through a mobile app or website.",
        },
      ],
    },
    {
      id: "pain-points",
      title: "Pain Points",
      blocks: [
        {
          type: "text",
          text: "The user struggles with limited dietary options, difficulty ordering from multiple restaurants, and a lack of buffet-style meal choices on existing platforms.",
        },
        {
          type: "list",
          items: [
            "Limited dietary options available to users",
            "Difficulty ordering from multiple restaurants at once",
            "No buffet-style meal choices offered on current platforms",
          ],
        },
      ],
    },
    {
      id: "design-process",
      title: "Design Process",
      blocks: [{ type: "image", image: DESIGN_PROCESS, scale: 0.7 }],
    },
    {
      id: "user-interviews",
      title: "User Interviews",
      blocks: [
        {
          type: "text",
          text: "We conducted in-depth interviews with a diverse group of users who frequently order food online. These interviews revealed common pain points related to dietary preferences, the desire for diverse cuisines, and the need for customizable meal options.",
        },
        { type: "image", image: chow("user-interviews.png", 901, 810, "Remote user interview sessions"), narrow: true },
      ],
    },
    {
      id: "user-interviews-outcomes",
      // "Outcomes" on its own line.
      title: "User Interviews\nOutcomes",
      blocks: [
        {
          type: "list",
          items: [
            "Users are facing challenges when attempting to order food through a combined selection of dishes from multiple restaurants.",
            "The option to order buffet-style meals is not available, limiting user's choices and preferences.",
            "Users are unable to order their favorite cuisine or dishes that align with their dietary restrictions.",
          ],
        },
      ],
    },
    {
      id: "surveys",
      title: "Surveys",
      blocks: [
        {
          type: "text",
          text: "We conducted a focused survey with Chowmill users in San Jose to understand their ordering habits and overall experience. Key insights highlighted issues with meal customization, checkout clarity, and delivery tracking, helping us align the experience with real user needs.",
        },
        { type: "image", image: chow("surveys.png", 3102, 2608, "Survey results") },
      ],
    },
    {
      id: "competitors-pre",
      title: "Competitor Analysis (Pre-Design)",
      blocks: [
        {
          type: "text",
          text: "This Analysis highlighting Chowmill’s superior features pre-redesign in comparison to DoorDash, Forkable, and Uber Eats. It emphasizes how Chowmill effectively addresses the issues of limited dietary options, difficulty ordering from multiple restaurants, and lack of buffet-style meal options, positioning it as the best choice for users.",
        },
        {
          type: "comparison",
          columns: ["DoorDash", "Forkable", "Uber Eats", "Chowmill"],
          highlight: 3,
          rows: [
            {
              feature: "Limited Dietary Options",
              cells: [
                {
                  strength: "Wide range of dietary options.",
                  weakness: "Not all restaurants clearly label dietary options. Filtering system can be cumbersome.",
                },
                {
                  strength: "Customizable meal plans for specific diets.",
                  weakness: "Limited variety within dietary categories. Inconsistent availability of dietary-specific meals.",
                },
                {
                  strength: "Extensive selection of dietary-specific meals.",
                  weakness: "Inconsistent filtering experience. Occasional inaccuracies in dietary labels.",
                },
                {
                  strength: "Focus on healthy and organic meal options. Clear labeling of dietary preferences.",
                  weakness: "Limited to specific dietary categories. Smaller selection compared to major competitors.",
                },
              ],
            },
            {
              feature: "Difficulty Ordering from Multiple Restaurants",
              cells: [
                {
                  strength: "Allows group orders from multiple restaurants.",
                  weakness: "Not seamless for individual users. Higher delivery fees and longer wait times.",
                },
                {
                  strength: "Group orders from multiple restaurants for office settings.",
                  weakness: "Limited functionality for individual users. Multi-restaurant feature not widely available.",
                },
                {
                  strength: "“Shared Orders” feature for adding items from different restaurants.",
                  weakness: "Feature not widely advertised or used. Additional delivery charges.",
                },
                {
                  strength: "Plans to introduce a multi-restaurant ordering feature.",
                  weakness: "Limited by partnerships with local restaurants.",
                },
              ],
            },
            {
              feature: "Lack of Buffet-Style Meal Options",
              cells: [
                {
                  strength: "Family-style or group meals available.",
                  weakness: "No dedicated buffet-style category. Manual search for group meals is time-consuming",
                },
                {
                  strength: "Buffet-style catering options for office settings.",
                  weakness: "Not available for individual or small group orders. Limited geographic availability.",
                },
                {
                  strength: "“Family Meals” offering multiple dishes.",
                  weakness: "No explicit buffet-style option. Limited availability by region and restaurant.",
                },
                {
                  strength: "N/A",
                  weakness: "Does not offer buffet-style options. Not widely advertised or recognized.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "problem-statement",
      title: "Problem Statement",
      blocks: [
        {
          type: "quote",
          text: "As a user, I want to order dishes from multiple restaurants, filter meals based on my dietary preferences, and explore buffet-style options with flexible combinations so that I can enjoy a diverse, convenient, and personalized dining experience without restrictions.",
        },
      ],
    },
    {
      id: "goals",
      // Line break: "Goals" sits on its own line.
      title: "High-Level\nGoals",
      blocks: [
        {
          type: "text",
          text: "The primary objective of this project is to create a seamless and customizable food ordering experience that caters to diverse dietary preferences and culinary interests. Our aim is to address the limitations of current food ordering platforms and provide a superior user experience through innovative design and functionality.",
        },
        {
          type: "cards",
          items: [
            {
              title: "Personalized Dietary Options",
              text: "Offer a wide range of dietary choices to accommodate various preferences and restrictions, ensuring that all users can find meals that align with their needs.",
            },
            {
              title: "Diverse Culinary Exploration",
              text: "Enable users to explore and enjoy a variety of cuisines and dishes from multiple restaurants, enhancing their dining experience with greater diversity and excitement",
            },
            {
              title: "Buffet-Style Meal Choices",
              text: "Provide buffet-style options that allow users to select multiple dishes in one order, giving them the flexibility to enjoy a variety of flavors in a single meal.",
            },
            {
              title: "Seamless User Experience",
              text: "Design an intuitive and user-friendly interface that makes it easy for users to navigate, customize their orders, and complete transactions without friction.",
            },
            {
              title: "Customizable Ordering Process",
              text: "Implement features that allow users to easily customize their meals, including ingredient modifications, portion sizes, and special instructions to cater to their unique preferences.",
            },
            {
              title: "Efficient Multi-Restaurant Ordering",
              text: "Facilitate the ability to order favorite dishes from multiple restaurants in a single transaction, addressing the frustration of limited options and enhancing convenience.",
            },
          ],
        },
      ],
    },
    {
      id: "iterations",
      title: "Design Iterations",
      blocks: [
        {
          type: "gallery",
          label: "Old Design",
          images: [chow("old-1.webp", 1538, 872, "Old design, screen 1"), chow("old-2.webp", 1538, 872, "Old design, screen 2")],
        },
        {
          type: "gallery",
          label: "Re-Design v1",
          images: [chow("v1-1.webp", 1538, 1437, "Re-design v1, screen 1"), chow("v1-2.webp", 1538, 1437, "Re-design v1, screen 2")],
        },
        {
          type: "gallery",
          label: "Re-Design v2",
          images: [chow("v2-1.webp", 1538, 874, "Re-design v2, screen 1"), chow("v2-2.webp", 1538, 874, "Re-design v2, screen 2")],
        },
        {
          type: "gallery",
          label: "Re-Design v3",
          images: [chow("v3-1.webp", 1540, 874, "Re-design v3, screen 1"), chow("v3-2.webp", 1540, 874, "Re-design v3, screen 2")],
        },
        { type: "gallery", label: "Re-Design v4", images: [chow("v4.webp", 1540, 2771, "Re-design v4, full page")], narrow: true },
        {
          type: "gallery",
          label: "Misc. UI",
          images: [
            chow("misc-1.webp", 1538, 1158, "Miscellaneous UI, screen 1"),
            chow("misc-2.webp", 1539, 983, "Miscellaneous UI, screen 2"),
            chow("misc-3.webp", 1539, 969, "Miscellaneous UI, screen 3"),
          ],
        },
      ],
    },
    {
      id: "testing",
      title: "Testing Methods",
      blocks: [
        {
          type: "text",
          text: "To refine the buffet-style option, multi-restaurant ordering, and advanced filters, we employed a combination of usability testing, A/B testing, and user surveys. These methods ensured comprehensive feedback from diverse user groups, allowing us to address key pain points and enhance the overall user experience.",
        },
        {
          type: "cards",
          items: [
            {
              title: "Usability Testing",
              text: "Conducted with a diverse group of participants representing various demographics and dietary preferences. Users were asked to complete specific tasks such as adding multiple dishes from different restaurants to their cart, using the new filters to find meals, and placing an order with the buffet-style option. Observations focused on task completion rates, time taken to complete tasks, and any difficulties encountered.",
            },
            {
              title: "A/B Testing",
              text: "Implemented to compare the new buffet-style and multi-restaurant ordering features with the previous version. Users were randomly assigned to use either the new or old version, and metrics such as order completion rates, user satisfaction scores, and feature usage frequency were collected.",
            },
            {
              title: "User Surveys",
              text: "Distributed post-testing to gather qualitative feedback on the new features. Questions focused on user satisfaction, perceived ease of use, and suggestions for further improvements. Survey responses provided insights into user preferences and potential areas for refinement.",
            },
          ],
        },
      ],
    },
    {
      id: "competitors-post",
      title: "Competitor Analysis (Post-Design)",
      blocks: [
        {
          type: "text",
          text: "This Analysis highlighting Chowmill’s superior features post-redesign in comparison to DoorDash, Forkable, and Uber Eats. It emphasizes how Chowmill effectively addresses the issues of limited dietary options, difficulty ordering from multiple restaurants, and lack of buffet-style meal options, positioning it as the best choice for users.",
        },
        { type: "image", image: chow("competitors-post.png", 1520, 1805, "Competitor comparison after the redesign") },
      ],
    },
    {
      id: "impact",
      title: "Design Impact",
      blocks: [
        {
          type: "metrics",
          items: [
            { label: "Improvement in task completion", before: "66%", after: "94%" },
            { label: "Faster task completion time", before: "2m 40s", after: "1m 10s" },
            { label: "Improvement in discoverability", before: "68%", after: "91%" },
            { label: "Reduction in abandonment", before: "35%", after: "18%" },
          ],
        },
      ],
    },
  ],
};

