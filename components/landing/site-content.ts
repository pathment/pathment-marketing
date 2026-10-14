/**
 * Single source of truth for the marketing homepage.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️  BEFORE LAUNCH: replace every value marked `PLACEHOLDER`.
 *
 * `proof.organizations`, `proof.metrics` and `testimonials` are rendered as
 * public claims about real customers. They are seeded here with stand-in copy
 * so the layout can be reviewed, NOT because these numbers were verified.
 * Swap in the real names, figures and quotes, or set `proof.showLogos` /
 * `proof.showMetrics` to false and delete the testimonial entries, and the
 * sections degrade gracefully to the honest pre-launch variants.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

/** Rotates in the hero headline. Keep each to one or two words. */
export const heroRotation = [
  "fellowships",
  "bootcamps",
  "grad programs",
  "communities",
  "internal L&D",
] as const;

export const heroStats = [
  { value: "3", label: "roles, one source of truth" },
  { value: "68", label: "product screens in the live demo" },
  { value: "0", label: "spreadsheets required" },
] as const;

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
      label: "median submission to review",
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
/* The problem                                                                 */
/* -------------------------------------------------------------------------- */

export const problem = {
  label: "Why programs stall",
  title: "Mentorship rarely fails in the session.",
  titleAccent: "It fails between them.",
  lede: "The hour with a mentor is almost always good. What breaks is the twenty-three hours around it: the follow-up nobody owns, the task nobody can find, the progress nobody can prove.",
  failures: [
    {
      stat: "Week 3",
      title: "Matching is accidental",
      body: "Pairs form from whoever volunteered first. The mentees who most need a mentor are the ones least likely to ask for one.",
    },
    {
      stat: "Week 6",
      title: "The path goes vague",
      body: "“Keep building” is not a curriculum. Without a next task in writing, momentum leaks away one skipped week at a time.",
    },
    {
      stat: "Week 10",
      title: "Nobody can see inside",
      body: "The program lead finds out someone has been stuck for a month at the retro, when it is already too late to help.",
    },
  ],
  resolution: {
    kicker: "Pathment closes the gap.",
    body: "One workspace where the roadmap, the submission, the review, the roadblock and the decision all live on the same record, visible to the person who needs it, at the moment they need it.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Role workspaces: the core product section                                  */
/* -------------------------------------------------------------------------- */

export const roleWorkspaces = [
  {
    id: "admin",
    label: "Admin",
    role: "Program lead",
    headline: "See the program before a problem grows.",
    body: "Admissions, placement, program health and recognition in one overview. You stop chasing status and start spending attention where the numbers say it is needed.",
    image: "/product/admin-dashboard.webp",
    width: 1425,
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
    headline: "Open to the person who needs you first.",
    body: "The review queue is ordered by who is slipping, not by who shouted loudest. Feedback, approvals and next steps stay attached to the work they refer to.",
    image: "/product/mentor-dashboard.webp",
    width: 1424,
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
    headline: "One roadmap. One obvious next step.",
    body: "No wondering what to work on. The roadmap breaks the goal into tasks, submissions carry files and links, and every piece of feedback stays with the thing it is about.",
    image: "/product/mentee-dashboard.webp",
    width: 1424,
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
/* Capabilities                                                                */
/* -------------------------------------------------------------------------- */

export const capabilities = [
  {
    icon: "clipboard-list",
    title: "Admissions & intake",
    body: "Shareable apply links, custom assessments and a magic-link status page. Accept, invite, register and place an applicant in one flow.",
    span: "wide",
  },
  {
    icon: "route",
    title: "Learning roadmaps",
    body: "Goals become milestones become tasks. Roadmaps adjust as work is approved, so the next step is never a guess.",
    span: "tall",
  },
  {
    icon: "clipboard-check",
    title: "Submit & review",
    body: "Versioned submissions with files and links. Approve, request changes, or comment inline, and the roadmap advances on approval.",
  },
  {
    icon: "flag",
    title: "Roadblocks",
    body: "When someone is stuck, they say so on the record. It reaches the mentor, then the program lead, before it becomes a dropout.",
  },
  {
    icon: "trophy",
    title: "Recognition & rewards",
    body: "Points, badges, challenges and leaderboards for long programs, plus certificates generated from the work that earned them.",
  },
  {
    icon: "calendar",
    title: "Scheduling & 1:1s",
    body: "Mentors publish availability, mentees book, and both sides capture notes, sentiment and next steps in the same place.",
  },
  {
    icon: "message-square",
    title: "Messaging & community",
    body: "Direct messages with receipts and reactions, plus feeds scoped to a clan, cohort or program. Mentorship stays social without Slack sprawl.",
  },
  {
    icon: "bar-chart-3",
    title: "Insights",
    body: "Completion distribution, at-risk detection and clan priorities: the view a program lead needs to allocate their week.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Lifecycle                                                                   */
/* -------------------------------------------------------------------------- */

export const lifecycle = [
  {
    number: "01",
    phase: "Set up",
    title: "Shape the program once",
    body: "Define cohorts, roles, mentor-led clans, permissions and the learning roadmap. Open an apply link when you are ready.",
    outcome: "Program ready",
  },
  {
    number: "02",
    phase: "Admit",
    title: "Take people in without a spreadsheet",
    body: "Applicants complete your assessment, you review them side by side, and accepted members land in the right clan already onboarded.",
    outcome: "Cohort placed",
  },
  {
    number: "03",
    phase: "Run",
    title: "Make the next step obvious",
    body: "Every mentor and mentee opens to the work that needs attention now. Submissions, reviews and roadblocks move on the same record.",
    outcome: "Work in motion",
  },
  {
    number: "04",
    phase: "Prove",
    title: "Show the outcome with evidence",
    body: "Recognition, certificates and reporting are generated from the decision history, not reconstructed from memory at the end of term.",
    outcome: "Outcome recorded",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Audiences                                                                   */
/* -------------------------------------------------------------------------- */

export const audiences = [
  {
    id: "fellowships",
    title: "Fellowships & bootcamps",
    question: "How do we keep 200 people on a 6-month path with 12 mentors?",
    body: "Cohort intake, mentor-led clans, a shared curriculum and the review queue that keeps it all moving.",
    tone: "primary",
  },
  {
    id: "internal",
    title: "Internal L&D",
    question: "How do we show leadership that the mentoring budget worked?",
    body: "Program health, completion distribution and promotion-ready summaries that come from the actual work.",
    tone: "dark",
  },
  {
    id: "universities",
    title: "Universities & career services",
    question: "How do we run alumni mentoring without it dying in week four?",
    body: "Structured check-ins, scheduling, and visibility for the coordinator who is running six programs at once.",
    tone: "sand",
  },
  {
    id: "communities",
    title: "Communities & nonprofits",
    question: "How do we grow past what volunteers can hold in their heads?",
    body: "A free-to-start workspace, scoped community feeds and recognition that keeps volunteer mentors engaged.",
    tone: "mint",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Testimonials                                                                */
/* -------------------------------------------------------------------------- */

export interface Testimonial {
  quote: string;
  /** Role shown on the card. Always safe to publish. */
  role: string;
  /** Clan or program the person belongs to. Always safe to publish. */
  context: string;
  /**
   * Real, attributable person. Leave undefined while `placeholder` is true.
   * The card falls back to role + context, so nothing is ever attributed to
   * someone who did not say it.
   */
  name?: string;
  avatar?: string;
  /**
   * True means the wording is written copy standing in for feedback that has
   * not been collected yet. The card renders it as an unattributed
   * illustration rather than as a quotation from a named person.
   */
  placeholder?: boolean;
}

/**
 * ⚠️  EVERY ENTRY BELOW IS `placeholder: true`.
 *
 * The wording is written copy, not a statement anyone made. While the flag is
 * set, `Testimonials.tsx` renders the card without a name and labels the block
 * as illustrative, so the site never attributes an invented sentence to an
 * invented person.
 *
 * To publish a real one: replace `quote` with what the person actually wrote,
 * set `name`, add their `avatar`, and delete the `placeholder` line. Mixed
 * states are fine, so these can be swapped in one at a time as feedback from
 * the 1,091 Dev Weekends members comes back.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "We were running the fellowship out of four spreadsheets and a WhatsApp group. The first week on Pathment was the first week I actually knew where everyone was.",
    role: "Program lead",
    context: "Engineering fellowship, 47 clans",
    placeholder: true,
  },
  {
    quote:
      "The review queue is the thing. I used to open my laptop and guess who needed me. Now the order is already right and I work down the list.",
    role: "Mentor",
    context: "MERN Fellows clan",
    placeholder: true,
  },
  {
    quote:
      "Every piece of feedback I have been given is still attached to the thing it was about. When I applied for my first role I had the whole trail.",
    role: "Mentee",
    context: "MERN Fellows clan",
    placeholder: true,
  },
  {
    quote:
      "I mentor twenty-four people. Before this I could hold maybe eight in my head. The difference is not effort, it is that nothing falls off the list any more.",
    role: "Mentor",
    context: "Node Guild clan",
    placeholder: true,
  },
  {
    quote:
      "Intake used to be a Google Form, a spreadsheet and three people arguing in a thread. Now applicants take the assessment and land in a clan already placed.",
    role: "Program lead",
    context: "Autumn cohort intake",
    placeholder: true,
  },
  {
    quote:
      "Raising a roadblock felt like admitting I was behind. Here it is just a button, and someone actually comes back on it.",
    role: "Mentee",
    context: "Backend track",
    placeholder: true,
  },
  {
    quote:
      "The points and badges sound like a gimmick until week nine, when they are the reason half the cohort is still turning up.",
    role: "Mentor",
    context: "Frontend track",
    placeholder: true,
  },
  {
    quote:
      "My mentor reviewed my submission the same evening and told me exactly which part of the validation was wrong. I fixed it before I lost the thread.",
    role: "Mentee",
    context: "MERN Fellows clan",
    placeholder: true,
  },
  {
    quote:
      "At the end of term I did not have to reconstruct anything. The certificates came out of the work that earned them.",
    role: "Program lead",
    context: "Engineering fellowship",
    placeholder: true,
  },
];

/* -------------------------------------------------------------------------- */
/* Mobile                                                                      */
/* -------------------------------------------------------------------------- */

export const mobileScreens = [
  {
    src: "/mobile/admin-home.webp",
    alt: "Pathment Android admin home screen.",
    caption: "Admin home",
  },
  {
    src: "/mobile/mentor-review.webp",
    alt: "Pathment Android mentor review screen.",
    caption: "Mentor review",
  },
  {
    src: "/mobile/mentee-home.webp",
    alt: "Pathment Android mentee home screen.",
    caption: "Mentee home",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

export const homeFaq = [
  {
    question: "Who is Pathment built for?",
    answer:
      "Communities, fellowships, bootcamps and teams running structured mentorship. Program leads shape the experience, mentors guide the work, and mentees follow a clear learning path. If your program has a cohort, a curriculum and people reviewing work, it fits.",
  },
  {
    question: "What does it replace?",
    answer:
      "Usually a spreadsheet for the roster, a form for intake, a chat group for support, a docs folder for submissions, and somebody's memory for who approved what. Pathment puts all five on one record.",
  },
  {
    question: "How do we get our first workspace?",
    answer:
      "Create an organization directly, or talk to us first and we will help you set up the workspace and plan your first cohort. Members join by invitation or through a clan joining link, and they never create their own organization by accident.",
  },
  {
    question: "Can we start small?",
    answer:
      "Yes. The Starter plan is sized for a single small community so you can run one cohort end to end before committing. Member, program and clan limits are published on the pricing page.",
  },
  {
    question: "What is a clan?",
    answer:
      "A mentor-led group inside your program. It gives mentees a smaller circle for regular check-ins and peer support, and it gives you a unit you can actually review, clan by clan, instead of staring at 200 individuals.",
  },
  {
    question: "Which AI provider does Pathment use?",
    answer:
      "Yours. Pathment is bring-your-own-key and works with any OpenAI-compatible provider, including OpenAI, Anthropic, Groq and OpenRouter. AI assists with roadmap generation and evaluation; it never makes the approval decision for a mentor.",
  },
  {
    question: "How do paid plans work?",
    answer:
      "Owners and admins request a plan change from inside their workspace. Our team arranges the invoice and confirms activation. Requesting a plan never charges you automatically or silently changes your limits.",
  },
  {
    question: "Is there an Android app?",
    answer:
      "Yes, a native five-tab app covering the Admin, Mentor and Mentee experiences. You can walk through every screen in the browser demo first, no account needed.",
  },
] as const;
