import { imagesFor, type CaseStudy } from "./types";

const syn = imagesFor("synkedup");

export const SYNKEDUP: CaseStudy = {
  impact: "3× Faster Time Tracking",
  meta: [
    { label: "Category", value: "Field Service Management" },
    { label: "Role", value: "Lead Designer" },
    { label: "Year", value: "2025" },
    { label: "Client", value: "SynkedUP" },
  ],
  cover: syn("cover.png", 4000, 2667, "SynkedUP timesheet screens on two phones"),
  sections: [
    {
      id: "background",
      title: "Project Background",
      blocks: [
        {
          type: "text",
          text: "The company’s field and office teams were tracking work hours using Google Sheets. Each employee maintained their own sheet — manually recording hours, jobs, and breaks. This method created major inconsistencies in reporting and inefficiencies in payroll processing.",
        },
      ],
    },
    {
      id: "survey",
      title: "Survey",
      blocks: [{ type: "image", image: syn("survey.png", 6324, 6600, "Survey results") }],
    },
    {
      id: "pain-points",
      title: "Pain Points",
      blocks: [
        {
          type: "listWithImage",
          items: [
            "Employees forgot to log hours or mixed up jobs",
            "Managers couldn’t see who was working or on break",
            "Billable/unbillable time not clearly separated",
            "Daily reporting took up to 10 minutes",
            "Job list, notes, and timesheets lived in different tabs",
          ],
          image: syn("pain-points.png", 1284, 1105, "Illustration of a confused user"),
        },
      ],
    },
    {
      id: "insights",
      title: "Research Insights",
      blocks: [
        {
          type: "text",
          text: "Users didn’t just want a way to “log hours”. They wanted a simple, guided workflow that adapts to their daily job flow and ensures every minute is accounted for accurately.",
        },
        {
          type: "list",
          items: [
            "78% of employees reported at least one missed or incorrect time entry per week",
            "Average of 10 minutes per day spent logging hours",
            "6/10 managers said they couldn’t tell who was clocked in or which job was active",
            "22% of invoices required manual correction",
            "New hires took 2–3 days to learn the manual system",
            "70% of users switched between at least 3 tabs/tools to log time, track jobs, and report",
            "Only 45% of respondents felt “confident” their time was logged correctly",
            "60% of field workers said they didn’t know who else was assigned to the same job",
          ],
        },
      ],
    },
    {
      id: "competitors",
      title: "Competitor Analysis",
      blocks: [
        {
          type: "text",
          text: "Most competitors either focused on individual time tracking or manager-level reporting — none offered an integrated experience combining crew management, job context, and time tracking in a single screen.",
        },
        {
          type: "table",
          columns: ["Platforms", "Strengths", "Weaknesses", "Opportunity"],
          rows: [
            ["Jobber", "Robust job management + invoicing integration", "Overly complex for small teams", "Users wanted Jobber’s automation but with less setup overhead"],
            ["Clockify", "Simple time tracking UI", "No job or crew-level visibility", "Our design needed to connect jobs + teams, not just track time"],
            ["Hubstaff", "Real-time monitoring, GPS tracking", "Feels intrusive; poor UX on mobile", "Our app should feel transparent and empowering, not controlling"],
            ["Google Sheets (Current System)", "Flexible and familiar", "Fully manual, no real-time updates", "Major opportunity to reduce errors and delays through automation"],
          ],
        },
      ],
    },
    {
      id: "hmw",
      title: "How Might We",
      blocks: [
        { type: "image", image: syn("hmw.png", 1520, 595, "How might we") },
        {
          type: "sub",
          items: [
            "HMW make time tracking seamless for on-field crews?",
            "HMW prevent missed or duplicate entries?",
            "HMW show clear job-level visibility for managers in real time?",
          ],
        },
      ],
    },
    {
      id: "user-goals",
      title: "User Goals",
      blocks: [
        {
          type: "cards",
          items: [
            { title: "Effortless Clock-In", text: "Start/stop tracking with minimal input" },
            { title: "Accurate Time Categorization", text: "Distinguish billable vs. unbillable time automatically" },
            { title: "Real-Time Visibility", text: "See who’s clocked in and what job they’re on" },
            { title: "Quick Summaries", text: "Instantly view totals for the day/week" },
            { title: "Simplified Review", text: "Managers can approve time entries without cross-checking sheets" },
          ],
        },
      ],
    },
    {
      id: "business-goals",
      title: "Business Goals",
      blocks: [
        {
          type: "cards",
          items: [
            { title: "Increase Data Accuracy", text: "Reduce human error caused by manual time entries in spreadsheets." },
            { title: "Reduce Payroll Processing Time", text: "Automate report generation to decrease admin time spent on verifying timesheets." },
            { title: "Improve Billing Precision", text: "Ensure billable and unbillable hours are clearly categorized for transparent client invoicing." },
            { title: "Boost Productivity", text: "Minimize time spent filling and managing sheets to allow more focus on actual work." },
            { title: "Streamline Approvals", text: "Simplify timesheet review and approval for supervisors." },
          ],
        },
      ],
    },
    {
      id: "success-metrics",
      title: "Success Metrics",
      blocks: [
        {
          type: "table",
          columns: ["Metric", "Baseline", "Target"],
          rows: [
            ["Missed clock-ins per week", "12", "↓ to < 2"],
            ["Payroll discrepancies", "22%", "↓ to < 5%"],
            ["Average time to submit daily report", "10 mins", "↓ to 2 mins"],
            ["Manager review time", "15 mins/day", "↓ to 5 mins/day"],
            ["User satisfaction (CSAT)", "2.5 / 5", "↑ to 4.8 / 5"],
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
          text: "Crew members and managers struggle with time tracking due to manual entry, lack of visibility, and disconnected data sources — leading to lost hours, payroll delays, and billing disputes.",
        },
      ],
    },
    {
      id: "key-screens",
      title: "Visualizing the Solution: Key Screens",
      blocks: [
        {
          type: "sub",
          title: "Homepage Popup",
          text: ["When user lands on Timesheet Homepage, there is a popup for education purpose for Billable and Unbillable Time Difference."],
          images: [syn("homepage-popup.png", 2129, 1334, "Homepage popup explaining billable and unbillable time")],
        },
        {
          type: "sub",
          title: "Timesheet Landing Page",
          text: [
            "This screen provides an immediate overview of the user's workweek, displaying a calendar view of time logged so far. It prominently features the CTA to begin tracking time now, followed by a list of the user's planned jobs and assignments for quick reference and selection.",
          ],
          images: [syn("timesheet-landing.png", 4258, 2668, "Timesheet landing page")],
        },
        {
          type: "sub",
          title: "Select Job",
          text: [
            "This interface utilizes a tab-based navigation system to contextualize the workflow: Unscheduled, Scheduled, and Map View. Critical time-savers, including an intelligent Search/Filter component for rapid job retrieval and a Bulk Add function for high-volume entry, ensure the UI supports peak user productivity and accurate operational planning.",
          ],
          images: [syn("select-job.png", 4258, 5415, "Select job screens")],
        },
        {
          type: "sub",
          title: "Job Detail",
          text: [
            "This screen provides real-time labor budget control by featuring a high-impact progress graph that visualizes estimated hours against consumed time and percentage. Beneath this financial overview, the interface offers a granular, map-linked time sheet detailing exactly which work area.Each crew member spent their time on, ensuring absolute accountability and precision in job costing.",
          ],
          images: [syn("job-detail.png", 4258, 2668, "Job detail")],
        },
        {
          type: "sub",
          title: "Newsfeed",
          text: [
            "This interface is a single list of all important job activities, organized by when they happened. It brings together everything from when staff submitted their hours and added notes, to when money was spent, and if a client looked at or approved a proposal. This design makes it quick and easy for managers to track progress, watch project money, and see client communication in one place.",
          ],
          images: [syn("newsfeed.png", 4258, 2668, "Newsfeed")],
        },
        {
          type: "sub",
          title: "Clocking-In for Unbillable",
          text: ["This interface is when user is clocking-in for unbillable. User can also add category for the unbillable."],
          images: [syn("unbillable.png", 4258, 5415, "Clocking in for unbillable time")],
        },
        {
          type: "sub",
          title: "Streamlined Task and Resource Management",
          text: [
            "This module professionalizes task documentation by enabling users to select and split time across multiple work areas. It requires users to precisely track resources by logging the item, quantity, and unit price used on the job. Finally, it ensures transparent project management by allowing users to instantly update the status of each task (Done, In Progress, or Blocked), providing clear, actionable insights into project progress and costs.",
          ],
          images: [syn("task-resource.png", 4258, 5415, "Task and resource management")],
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
            {
              value: "70%",
              label: "Time-on-Task",
              text: "By designing for \"minimal input\" (moving from manual typing to a \"single-tap\" start/stop), the time users spend managing their timesheet drops from ~5 minutes a day to under 90 seconds.",
            },
            {
              value: "40%",
              label: "Increase in Daily Submission Rates",
              text: "The \"Quick Summaries\" provide instant gratification and the interface is frictionless, users are more likely to log time daily rather than waiting until Friday.",
            },
            {
              value: "15%",
              label: "Increase in Recovered Billable Hours",
              text: "Automatic categorization identifies \"leaked\" billable time that was previously forgotten or mislabeled in manual spreadsheets.",
            },
            {
              value: "50%",
              label: "Faster Payroll Processing Time",
              text: "Since managers no longer need to \"cross-check\" sheets (due to the simplified review UI), the payroll department can generate and approve company-wide reports in half the time.",
            },
            {
              value: "90%",
              label: "Reduction in Timesheet Errors",
              text: "Replacing manual spreadsheet entries with \"one-tap\" tracking removes human error at the source, ensuring the business makes decisions based on 100% accurate labor data.",
            },
          ],
        },
      ],
    },
  ],
};
