/**
 * Verified proof figures and role copy for the marketing homepage. The proof
 * block is rendered as a public claim about a real customer: re-run the
 * aggregates before changing any number (see the note on `proof`).
 */

/* -------------------------------------------------------------------------- */
/* Proof                                                                       */
/* -------------------------------------------------------------------------- */

export interface ProofOrganization {
  name: string;
  /** Optional path to a cleared logo file in /public. */
  logo?: string;
}

export interface ProofMetric {
  value: string;
  label: string;
  note: string;
}

/**
 * VERIFIED against the production database on 14 October 2026 (read-only
 * aggregate counts, Dev Weekends workspace, 7 June to 13 October 2026).
 *
 * Deliberately NOT used: `enrollments.status` reports 1,088 of 1,093 as
 * "program_completed", which looks like a 99.5% completion rate. The matching
 * `overall_progress_percentage` column puts 578 of those at 0-24% and only 16
 * at 100%, so that status was set in bulk at the end of term. Publishing a
 * completion-rate claim from it would contradict our own data.
 *
 * Re-run the aggregates before changing any figure here, and move the
 * `asOf` date with them.
 */
export const proof: {
  /** "featured" tells one customer's story; "wall" shows a logo row. */
  mode: "featured" | "wall";
  showMetrics: boolean;
  heading: string;
  featured: { name: string; descriptor: string; logo?: string };
  organizations: ProofOrganization[];
  metrics: ProofMetric[];
  detail: string[];
  asOf: string;
} = {
  mode: "featured",
  showMetrics: true,

  heading: "Proof from a program that runs on it",

  featured: {
    name: "Dev Weekends",
    descriptor:
      "runs its engineering fellowship on Pathment: one workspace, 47 mentor-led clans, and every submission reviewed on the record.",
  },

  /**
   * Switch `mode` to "wall" once there are at least three customers you can
   * name. Add `logo: "/path.svg"` per entry only for marks cleared for use.
   */
  organizations: [{ name: "Dev Weekends" }],

  metrics: [
    {
      value: "1,091",
      label: "members in one workspace",
      note: "1,059 mentees, 35 mentors, 2 program leads",
    },
    {
      value: "5,244",
      label: "submissions reviewed",
      note: "88% of everything submitted, with 4,559 written reviews",
    },
    {
      value: "22h",
      label: "median time to review",
      note: "53% reviewed inside a day, 69% inside two",
    },
  ],

  detail: [
    "47 mentor-led clans",
    "306 applications processed",
    "519 certificates issued",
    "1,327 badges awarded",
    "126,467 points recorded",
  ],

  asOf: "Dev Weekends workspace, 7 June to 13 October 2026",
};

/* -------------------------------------------------------------------------- */
/* Role workspaces: the core product section                                  */
/* -------------------------------------------------------------------------- */

export const roleWorkspaces = [
  {
    id: "admin",
    label: "Admin",
    role: "Program lead",
    audience: "For program admins",
    highlights: [
      "Run admissions and cohorts",
      "Manage mentors and mentees",
      "Track progress and roadblocks",
      "Get program analytics and reports",
    ],
    headline: "See the program before a problem grows.",
    body: "Admissions, placement, program health and recognition in one overview. You stop chasing status and start spending attention where the numbers say it is needed.",
    image: "/product/admin-dashboard-framed.webp",
    width: 1408,
    height: 989,
    alt: "Pathment admin overview showing active mentees, clans needing support, pending approvals and open roadblocks.",
    signals: [
      { value: "26", label: "active mentees" },
      { value: "7", label: "approvals ready" },
      { value: "3", label: "open roadblocks" },
    ],
    capabilities: [
      "Shareable cohort apply links with admin-built assessments",
      "Place applicants into programs, cohorts and mentor-led clans",
      "Completion distribution and a ranked “where support is needed” list",
      "Recognition, certificates and reporting from the same history",
    ],
  },
  {
    id: "mentor",
    label: "Mentor",
    role: "Clan lead",
    audience: "For mentors",
    highlights: [
      "Review queue ranked by who is slipping",
      "Approve or request changes inline",
      "Run clan reviews and 1:1s",
      "Flag roadblocks before they grow",
    ],
    headline: "Open to the person who needs you first.",
    body: "The review queue is ordered by who is slipping, not by who shouted loudest. Feedback, approvals and next steps stay attached to the work they refer to.",
    image: "/product/mentor-dashboard-framed.webp",
    width: 1272,
    height: 900,
    alt: "Pathment mentor cockpit showing awaiting review, mentees needing attention, open roadblocks and next check-ins.",
    signals: [
      { value: "4", label: "awaiting review" },
      { value: "14", label: "need attention" },
      { value: "95%", label: "cohort on time" },
    ],
    capabilities: [
      "A review queue ranked by momentum, not by submission time",
      "Approve, request changes, or leave feedback inline on the evidence",
      "Run clan reviews and publish availability for 1:1s",
      "Flag roadblocks so the program lead can act before the retro",
    ],
  },
  {
    id: "mentee",
    label: "Mentee",
    role: "Participant",
    audience: "For mentees",
    highlights: [
      "A personal roadmap with one next step",
      "Submit work and see it reviewed",
      "Book 1:1s and raise roadblocks",
      "Earn points, badges and certificates",
    ],
    headline: "One roadmap. One obvious next step.",
    body: "No wondering what to work on. The roadmap breaks the goal into tasks, submissions carry files and links, and every piece of feedback stays with the thing it is about.",
    image: "/product/mentee-dashboard-framed.webp",
    width: 1272,
    height: 900,
    alt: "Pathment mentee workspace showing the next task, learning progress and feedback in context.",
    signals: [
      { value: "1", label: "clear next task" },
      { value: "41%", label: "roadmap complete" },
      { value: "+120", label: "points this week" },
    ],
    capabilities: [
      "A personalised roadmap broken into milestones and tasks",
      "Submit versioned work with files and links, then see it reviewed",
      "Book 1:1s, raise roadblocks and ask in a scoped community feed",
      "Points, badges and certificates that come from real completed work",
    ],
  },
] as const;

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

/** Rendered on the homepage and emitted as FAQPage structured data. */
export const homeFaq = [
  {
    question: "Is the Community plan really free?",
    answer:
      "Yes. Community is free for up to 100 participants: run a cohort end to end before you commit. Mentors and admins never count toward any limit, and no card is needed.",
  },
  {
    question: "What does Pathment replace?",
    answer:
      "Usually a spreadsheet for the roster, a form for intake, a chat group for support, a folder for submissions, and somebody's memory for who approved what. Pathment puts all five on one record.",
  },
  {
    question: "Will volunteer mentors actually use it?",
    answer:
      "Mentors open to a review queue ordered by who has waited longest, and they can approve or request changes right on the work, on the web or from the Android app. There is nothing to set up on their side.",
  },
  {
    question: "How do people join our workspace?",
    answer:
      "Applicants come in through a shareable apply link and your own assessment. Accepted members are invited or join through a clan link, so nobody creates an organization by accident.",
  },
  {
    question: "What is a clan?",
    answer:
      "A mentor-led group inside your program. Mentees get a smaller circle for check-ins and peer support, and you get a unit you can review clan by clan instead of staring at 200 individuals.",
  },
  {
    question: "Which AI does Pathment use?",
    answer:
      "Yours. Pathment is bring-your-own-key and works with any OpenAI-compatible provider, including OpenAI, Anthropic, Groq and OpenRouter. AI helps draft roadmaps and evaluations; it never makes the approval decision for a mentor.",
  },
  {
    question: "Who owns our data?",
    answer:
      "You do. We do not sell personal information, connections are encrypted, and members can ask for a copy of their data or have their account deleted at any time.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "Yes, a native Android app on Google Play for admins, mentors and mentees, on the same record as the web workspace. You can try every mobile screen in the browser demo first.",
  },
] as const;

