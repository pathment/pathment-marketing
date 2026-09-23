export const heroFloatingCards = [
  {
    icon: "users",
    title: "Smart mentor matching",
    description:
      "Pair mentees with the right mentors based on skills, goals, and availability.",
    position: "top-[4%] left-0 xl:-left-16",
    delay: 0,
  },
  {
    icon: "chart",
    title: "Progress analytics",
    description:
      "Track milestone completion and program health in one unified view.",
    position: "top-[2%] right-0 xl:-right-12",
    delay: 0.5,
  },
  {
    icon: "roadmap",
    title: "AI-generated roadmaps",
    description:
      "Personalized progression paths broken into milestones and actionable tasks.",
    position: "bottom-[22%] left-0 xl:-left-20",
    delay: 1,
  },
  {
    icon: "trophy",
    title: "Gamified progress",
    description:
      "Points, badges, and leaderboards keep mentees motivated and visible.",
    position: "bottom-[14%] right-0 xl:-right-16",
    delay: 1.5,
  },
] as const;

export const platformHighlights = [
  {
    id: "matching",
    label: "Smart matching",
    title: "Pair every mentee with the right mentor",
    description:
      "Pathment analyzes skills, goals, and availability to recommend optimal mentor-mentee pairs, with admin approval on every match before programs go live.",
    visual: "matching",
  },
  {
    id: "roadmaps",
    label: "AI roadmaps",
    title: "Personalized progression paths at scale",
    description:
      "AI-generated roadmaps break career goals into milestones and tasks, so mentors and mentees can work toward clear, shared goals.",
    visual: "roadmaps",
  },
  {
    id: "insights",
    label: "Program insights",
    title: "Real-time visibility for program leads",
    description:
      "Track program wellness, detect at-risk pairs, and generate promotion-ready summaries, so leaders always know who is progressing and who needs support.",
    visual: "insights",
  },
] as const;

export const navItems = [
  { href: "#solutions", label: "Solutions" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { label: "Pricing", href: "/pricing" },
] as const;

export const heroHighlights = [
  "AI-generated roadmaps",
  "Mentor matching & approvals",
  "Task review & feedback",
  "Gamified progress",
] as const;

export const solutionTabs = [
  {
    id: "matching",
    tabLabel: "Smart Mentor Matching",
    icon: "users",
    headline: "Pair every mentee with the right mentor",
    description:
      "Pathment analyzes skills, goals, and availability to recommend optimal mentor-mentee pairs, with admin approval on every match before programs go live.",
    visual: "matching",
  },
  {
    id: "roadmaps",
    tabLabel: "AI-Generated Roadmaps",
    icon: "git-branch",
    headline: "Personalized progression paths at scale",
    description:
      "AI-generated roadmaps break career goals into milestones and tasks, so mentors and mentees can work toward clear, shared goals.",
    visual: "roadmap",
  },
  {
    id: "insights",
    tabLabel: "Program Analytics",
    icon: "line-chart",
    headline: "Real-time visibility for engineering leaders",
    description:
      "Track program wellness, detect at-risk pairs, and generate promotion-ready summaries, so leaders always know who is progressing and who needs support.",
    visual: "insights",
  },
  {
    id: "operations",
    tabLabel: "Mentor Operations",
    icon: "messages",
    headline: "Structured check-ins that keep pairs on track",
    description:
      "Run mentorship programs with structured check-in templates, async feedback loops, and milestone reviews, without chasing updates manually.",
    visual: "operations",
  },
] as const;

export const featureCards = [
  {
    icon: "clipboard-check",
    title: "Task Submit & Review",
    description:
      "Mentees submit versioned work with files and links. Mentors approve, request changes, or leave inline feedback, and the roadmap advances automatically on approval.",
    layout: "featured",
    visual: "task-review",
  },
  {
    icon: "file-text",
    title: "Intake & Assessments",
    description:
      "Shareable cohort apply links, admin-built assessments, and a magic-link status page, accept, invite, register, and place applicants in one structured flow.",
    layout: "compact",
    visual: "intake",
  },
  {
    icon: "heart",
    title: "Community Feed",
    description:
      "Scoped feeds for clans, cohorts, and programs. Post wins, ask questions, give kudos, and keep mentorship social without the Slack sprawl.",
    layout: "compact",
    visual: "community",
  },
  {
    icon: "calendar",
    title: "Scheduling & 1:1s",
    description:
      "Mentors publish availability, mentees book 1:1s, and both sides capture meeting notes with sentiment and next steps, all in one place.",
    layout: "compact",
    visual: "scheduling",
  },
  {
    icon: "trophy",
    title: "Gamification & Rewards",
    description:
      "Points, badges, challenges, and leaderboards keep long programs engaging. Mentees redeem XP for gifts from a curated catalog.",
    layout: "featured",
    visual: "gamification",
  },
] as const;

export const deepFeatures = [
  {
    label: "Org Structure",
    title: "Programs, cohorts, and mentor-led clans",
    description:
      "Run structured programs with intake seasons and mentor-led clans. Place mentees into groups, manage co-mentors, and scale mentorship without losing the personal touch.",
    cta: "Explore capabilities",
    href: "#features",
    visual: "org-structure",
  },
  {
    label: "Real-time Messaging",
    title: "Keep every conversation in context",
    description:
      "1:1 chat with delivery and read receipts, emoji reactions, and notifications, so mentor-mentee communication stays tied to the work, not scattered across tools.",
    cta: "See how it works",
    href: "#how-it-works",
    visual: "messaging",
  },
] as const;

export const workflowSteps = [
  {
    step: "01",
    icon: "plug",
    title: "Connect your org",
    description:
      "Set up your isolated workspace, import your engineering structure, and configure role-based programs for admins, mentors, and mentees.",
  },
  {
    step: "02",
    icon: "rocket",
    title: "Deploy programs",
    description:
      "Launch cohorts with AI-generated roadmaps, smart mentor matching, and structured check-in templates, no manual setup required.",
  },
  {
    step: "03",
    icon: "trending",
    title: "Track & improve",
    description:
      "Monitor results in real time, surface at-risk pairs, and optimize program performance with AI-powered progression insights.",
  },
] as const;

export const currentStatePoints = [
  {
    label: "Ad-hoc matching:",
    body: "Programs depend heavily on accidental personal connections and individual efforts, leading to unequal opportunity.",
  },
  {
    label: "No clear path:",
    body: "Milestones are generic and untracked, so mentees never quite know what to work on next.",
  },
  {
    label: "No visibility:",
    body: "Program leads can’t see who’s progressing, who’s stuck, or where to step in, until it’s too late.",
  },
] as const;

export const pathmentSystemPoints = [
  {
    label: "Smart matching:",
    body: "Mentees are paired with the right mentors based on skills, goals, and availability, with admin approval.",
  },
  {
    label: "AI-generated pathways:",
    body: "Personalized roadmaps break goals into milestones and actionable tasks, adjusting as progress is made.",
  },
  {
    label: "Gamified progress:",
    body: "Points, badges, and leaderboards keep mentees motivated while leaders see capability growth in real time.",
  },
] as const;

// Honest, attractive integration story. Bring-your-own-key AI (any OpenAI-compatible
// provider) is the real differentiator; email + media handling are built in.
export const integrations = [
  { name: "Groq", category: "AI" },
  { name: "OpenAI", category: "AI" },
  { name: "Anthropic", category: "AI" },
  { name: "OpenRouter", category: "AI" },
  { name: "Resend", category: "Email" },
  { name: "Cloudinary", category: "Files & media" },
] as const;

export const faqItems = [
  {
    question: "Who is Pathment built for?",
    answer:
      "Pathment is for communities, fellowships, and teams running structured mentorship. Program leads organize the experience, mentors guide the work, and mentees follow a clear learning path.",
  },
  {
    question: "How do we get our first workspace?",
    answer:
      "Talk to the Pathment team about your program. We will help you set up your workspace and plan your first cohort. Members join through an invitation or a clan joining link.",
  },
  {
    question: "Can we start with a small group?",
    answer:
      "Yes. The Starter plan gives you room to try Pathment with a small community. See the current member, program, and clan limits in the pricing section above, then grow when your program is ready.",
  },
  {
    question: "What is a clan?",
    answer:
      "A clan is a mentor-led group within your program. It gives mentees a smaller community for regular check-ins, shared learning, and support.",
  },
  {
    question: "How do paid plans work?",
    answer:
      "Owners and admins request a plan change from their workspace. Our team arranges the invoice and confirms activation. Requesting a plan does not charge you or change your current limits.",
  },
  {
    question: "Can we discuss our organization’s requirements?",
    answer:
      "Absolutely. Tell us about your program structure, roles, security requirements, and expected number of members. We will confirm workspace availability and the right setup before you onboard.",
  },
] as const;

export const footerColumns = [
  {
    title: "Product",
    links: [
      { href: "#solutions", label: "Solutions" },
      { href: "#features", label: "Features" },
      { href: "#how-it-works", label: "How it works" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#", label: "Documentation" },
      { href: "#request-access", label: "Request Access" },
      { href: "mailto:hello@pathment.me", label: "Contact Support" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Privacy Policy" },
    ],
  },
] as const;
