/**
 * The single source of truth for the docs: every page, its group, its
 * description and the headings it renders. The sidebar, breadcrumbs,
 * previous/next links, the "On this page" list, the search index and the
 * sitemap are all built from this file, so a page only has to be added here
 * once.
 *
 * When you add an H2/H3 to a page, add it to that page's `toc` too, with the
 * same id. The search index and the table of contents read from here.
 */

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface DocPage {
  href: string;
  title: string;
  /** Shorter label for the sidebar, when the title is long. */
  navTitle?: string;
  description: string;
  /** ISO date (YYYY-MM-DD). */
  updated: string;
  toc: TocItem[];
  /** Extra words people might search for that aren't in the title or headings. */
  keywords?: string[];
  /** Method badge shown beside reference pages in the sidebar. */
  method?: "GET" | "POST" | "DELETE";
}

export interface DocGroup {
  title: string;
  pages: DocPage[];
}

const LAUNCH = "2026-11-19";
const READ_API = "2026-11-20";
const WEBHOOKS = "2026-11-20";
const PULL = "2026-11-20";

function h2(id: string, title: string): TocItem {
  return { id, title, level: 2 };
}
function h3(id: string, title: string): TocItem {
  return { id, title, level: 3 };
}

export const docsNav: DocGroup[] = [
  {
    title: "Getting started",
    pages: [
      {
        href: "/docs",
        title: "Overview",
        description:
          "What the Pathment API does today, where it lives, and the three steps from an API key to applicants in your intake.",
        updated: WEBHOOKS,
        toc: [
          h2("what-you-can-do", "What you can do today"),
          h2("base-url", "Base URL"),
          h2("three-steps", "Your first sync in three steps"),
          h2("start-here", "Start here"),
        ],
        keywords: ["introduction", "api", "developer"],
      },
      {
        href: "/docs/quickstart",
        title: "Quickstart",
        description:
          "Create a key, check it works, list your intakes, push two applicants and watch the job finish. About ten minutes.",
        updated: LAUNCH,
        toc: [
          h2("before-you-start", "Before you start"),
          h2("steps", "Steps"),
          h3("create-a-key", "1. Create an API key"),
          h3("check-the-key", "2. Check the key works"),
          h3("find-your-intake", "3. Find your intake"),
          h3("push-applicants", "4. Push two applicants"),
          h3("check-the-job", "5. Check the job"),
          h2("full-script", "The whole thing as one script"),
          h2("next-steps", "Next steps"),
        ],
        keywords: ["getting started", "tutorial", "first request", "example"],
      },
      {
        href: "/docs/authentication",
        title: "Authentication",
        description:
          "API keys, how to send them, what scopes they carry, and how to rotate one without downtime.",
        updated: READ_API,
        toc: [
          h2("api-keys", "API keys"),
          h2("creating-a-key", "Creating a key"),
          h2("sending-the-key", "Sending the key"),
          h2("scopes", "Scopes"),
          h2("workspaces", "One key, one workspace"),
          h2("expiry-and-revoking", "Expiry and revoking"),
          h2("rotating", "Rotating a key"),
          h2("good-habits", "Good habits"),
          h2("auth-errors", "Authentication errors"),
        ],
        keywords: ["api key", "bearer", "token", "pk_live", "scope", "revoke", "rotate"],
      },
      {
        href: "/docs/errors",
        title: "Errors",
        description:
          "The shape of every error, each type and code with its HTTP status, and what to do about each one.",
        updated: READ_API,
        toc: [
          h2("error-shape", "The error shape"),
          h2("status-codes", "Status codes and types"),
          h2("error-codes", "Error codes"),
          h2("request-ids", "Request IDs"),
          h2("record-errors", "Errors inside a job"),
          h2("handling-errors", "Handling errors well"),
        ],
        keywords: ["400", "401", "403", "404", "409", "429", "500", "requestId", "error codes"],
      },
      {
        href: "/docs/rate-limits",
        title: "Rate limits",
        description:
          "120 requests a minute per key, up to 1,000 records per push, and the headers that tell you where you stand.",
        updated: LAUNCH,
        toc: [
          h2("limits", "The limits"),
          h2("headers", "Rate limit headers"),
          h2("when-limited", "When you hit the limit"),
          h2("staying-under", "Staying under the limit"),
        ],
        keywords: ["429", "throttle", "retry-after", "batch size", "quota"],
      },
      {
        href: "/docs/idempotency",
        title: "Idempotency",
        description:
          "Send an Idempotency-Key with every push so a retry never creates a second job.",
        updated: LAUNCH,
        toc: [
          h2("why", "Why it matters"),
          h2("how-it-works", "How it works"),
          h2("choosing-a-key", "Choosing a key"),
          h2("retrying-safely", "Retrying safely"),
        ],
        keywords: ["retry", "duplicate", "Idempotency-Key", "409", "replay"],
      },
      {
        href: "/docs/pagination",
        title: "Pagination",
        description:
          "List endpoints return pages. Follow nextCursor until hasMore is false, or use updatedSince to fetch only what changed.",
        updated: LAUNCH,
        toc: [
          h2("how-pages-work", "How pages work"),
          h2("walking-every-page", "Walking every page"),
          h2("incremental-reads", "Incremental reads with updatedSince"),
        ],
        keywords: ["cursor", "limit", "hasMore", "nextCursor", "list"],
      },
      {
        href: "/docs/versioning",
        title: "Versioning",
        description:
          "The version is in the path. What can change within v1, and how breaking changes are handled.",
        updated: LAUNCH,
        toc: [
          h2("current-version", "The current version"),
          h2("additive-changes", "Changes we make without a new version"),
          h2("breaking-changes", "Breaking changes"),
          h2("staying-compatible", "Staying compatible"),
        ],
        keywords: ["v1", "v2", "breaking", "deprecation", "compatibility"],
      },
    ],
  },
  {
    title: "Guides",
    pages: [
      {
        href: "/docs/guides/syncing-users",
        title: "Syncing users into an intake",
        navTitle: "Syncing users",
        description:
          "How to push records from your system into a Pathment intake, and keep them up to date over time.",
        updated: WEBHOOKS,
        toc: [
          h2("the-push-model", "The push model"),
          h2("pick-the-intake", "1. Pick the intake"),
          h2("shape-the-records", "2. Shape the records"),
          h2("send-in-batches", "3. Send in batches"),
          h2("wait-for-the-job", "4. Wait for the job"),
          h2("keep-in-sync", "5. Keep them in sync"),
          h2("example-sync", "A complete sync script"),
          h2("checklist", "Before you go live"),
        ],
        keywords: ["import", "push", "integration", "batch", "cron", "nightly"],
      },
      {
        href: "/docs/guides/pulling",
        title: "Pulling from a URL",
        description:
          "Point a connection at a JSON or CSV URL, or a published Google Sheet, and Pathment pulls everyone into your intake on a schedule.",
        updated: PULL,
        toc: [
          h2("pull-or-push", "Pull or push?"),
          h2("setting-up", "Setting up a pull"),
          h2("the-url", "The URL"),
          h2("formats", "Formats"),
          h3("json", "JSON"),
          h3("pagination", "Pagination"),
          h3("csv", "CSV"),
          h3("google-sheets", "Google Sheets"),
          h2("sign-in", "Sign-in"),
          h2("testing", "Testing"),
          h2("schedule", "Schedule"),
          h2("what-a-pull-does", "What a pull does"),
          h3("nothing-new", "When nothing has changed"),
          h2("limits", "Limits"),
          h2("when-it-fails", "When a pull fails"),
          h2("build-your-endpoint", "What to build on your side"),
          h2("security-checklist", "Security checklist"),
        ],
        keywords: ["pull", "connector", "fetch", "csv", "google sheets", "json feed", "schedule", "Pathment-Sync", "user agent", "import"],
      },
      {
        href: "/docs/guides/field-mapping",
        title: "Connections and field mapping",
        navTitle: "Field mapping",
        description:
          "Send records in your own shape. A connection maps your fields to Pathment's, with transforms and value maps.",
        updated: LAUNCH,
        toc: [
          h2("what-a-connection-is", "What a connection is"),
          h2("pathment-fields", "Pathment's applicant fields"),
          h2("mapping-rules", "Mapping rules"),
          h3("paths", "Reading nested values"),
          h3("transforms", "Transforms"),
          h3("value-maps", "Value maps and defaults"),
          h3("keep-unmapped", "Keeping everything else"),
          h2("setting-up", "Setting one up in the app"),
          h2("worked-examples", "Worked examples"),
          h3("example-flat", "A flat CRM export"),
          h3("example-nested", "A nested form response"),
          h2("using-it", "Using a connection from the API"),
        ],
        keywords: ["mapping", "transform", "connection", "lowercase", "first_name", "digits", "map", "default", "keepUnmapped"],
      },
      {
        href: "/docs/guides/matching-and-updates",
        title: "Matching and updates",
        description:
          "How Pathment recognises someone it has seen before, what an update can change, and what it never touches.",
        updated: LAUNCH,
        toc: [
          h2("how-matching-works", "How a record finds its applicant"),
          h2("what-happens", "What happens to each record"),
          h2("what-updates-change", "What an update can change"),
          h2("closed-applicants", "Closed applicants stay closed"),
          h2("nothing-is-deleted", "Nothing is ever deleted"),
          h2("duplicates-in-a-batch", "Duplicates in one batch"),
        ],
        keywords: ["duplicate", "externalId", "dedupe", "update", "skipped", "unchanged", "applicant_closed"],
      },
      {
        href: "/docs/guides/sending-assessments",
        title: "Sending assessments after a sync",
        navTitle: "Sending assessments",
        description:
          "Have every new applicant receive the assessment for their level as soon as the sync finishes.",
        updated: LAUNCH,
        toc: [
          h2("how-it-works", "How it works"),
          h2("turning-it-on", "Turning it on"),
          h2("what-they-receive", "What the applicant receives"),
          h2("who-is-not-emailed", "Who is not emailed"),
          h2("checking-it-worked", "Checking it worked"),
        ],
        keywords: ["assessment", "email", "invite", "sendAssessment", "level"],
      },
      {
        href: "/docs/guides/dry-runs-and-reports",
        title: "Dry runs and sync reports",
        navTitle: "Dry runs and reports",
        description:
          "Rehearse a sync without writing anything, then read the report to see exactly what would happen.",
        updated: LAUNCH,
        toc: [
          h2("what-a-dry-run-does", "What a dry run does"),
          h2("running-one", "Running one"),
          h2("reading-the-report", "Reading the report"),
          h2("sync-history", "Sync history in the app"),
          h2("a-safe-rollout", "A safe rollout"),
        ],
        keywords: ["dryRun", "test", "preview", "csv", "report", "history"],
      },
      {
        href: "/docs/guides/reading-progress",
        title: "Reading progress",
        description:
          "Copy mentee progress into your own system every night: the scopes to use, paging, incremental changes and matching people back.",
        updated: READ_API,
        toc: [
          h2("what-you-need", "What you need"),
          h2("the-shape-of-the-job", "The shape of the job"),
          h2("paging-through-progress", "Paging through progress"),
          h2("incremental-changes", "Incremental changes with updatedSince"),
          h2("matching-mentees", "Matching mentees to your records"),
          h2("nightly-script", "A complete nightly script"),
          h2("privacy", "Privacy"),
        ],
        keywords: ["progress", "dashboard", "export", "nightly", "report", "mentees", "attendance", "read api"],
      },
      {
        href: "/docs/guides/webhooks",
        title: "Webhooks",
        description:
          "Pathment sends events to your server when things happen. How to set up an endpoint, verify signatures, and handle retries, duplicates and ordering.",
        updated: WEBHOOKS,
        toc: [
          h2("setting-up", "Setting up an endpoint"),
          h2("the-request", "The request"),
          h2("verifying-signatures", "Verifying signatures"),
          h2("a-complete-receiver", "A complete receiver"),
          h2("responding-and-retries", "Responding and retries"),
          h2("duplicates-and-order", "Duplicates and order"),
          h2("testing", "Testing with Send test and the delivery log"),
          h2("turning-off", "Turning endpoints off"),
          h2("security-checklist", "Security checklist"),
        ],
        keywords: ["webhook", "events", "signature", "hmac", "whsec", "retry", "endpoint", "notifications", "ping"],
      },
    ],
  },
  {
    title: "API reference",
    pages: [
      {
        href: "/docs/api",
        title: "API reference",
        navTitle: "Introduction",
        description:
          "Conventions shared by every endpoint, the objects the API returns, and the full list of endpoints.",
        updated: WEBHOOKS,
        toc: [
          h2("conventions", "Conventions"),
          h2("endpoints", "Endpoints"),
          h2("objects", "Objects"),
          h2("the-error-object", "The Error object"),
        ],
        keywords: ["reference", "endpoints", "json", "headers", "objects"],
      },
      {
        href: "/docs/api/me",
        title: "Me",
        description: "Check a key and see which workspace and scopes it has.",
        updated: LAUNCH,
        method: "GET",
        toc: [h2("retrieve-me", "Retrieve the current key")],
        keywords: ["whoami", "organization", "workspace", "test key"],
      },
      {
        href: "/docs/api/intakes",
        title: "Intakes",
        description:
          "An intake is an admissions round. List them and fetch one to find its ID and levels.",
        updated: LAUNCH,
        method: "GET",
        toc: [
          h2("the-intake-object", "The Intake object"),
          h2("list-intakes", "List intakes"),
          h2("retrieve-an-intake", "Retrieve an intake"),
        ],
        keywords: ["intake", "levels", "programme", "admissions"],
      },
      {
        href: "/docs/api/applicants",
        title: "Applicants",
        description:
          "Push applicants into an intake in batches, and list them with their stage and status.",
        updated: LAUNCH,
        toc: [
          h2("the-applicant-object", "The Applicant object"),
          h3("stage-and-status", "Stage and status"),
          h2("create-applicants", "Push applicants"),
          h2("list-applicants", "List applicants"),
        ],
        keywords: ["applicant", "push", "records", "stage", "status", "batch", "create"],
      },
      {
        href: "/docs/api/jobs",
        title: "Jobs",
        description:
          "Every push becomes a job. Poll it to see counts, errors and how many assessments were sent.",
        updated: WEBHOOKS,
        method: "GET",
        toc: [
          h2("the-job-object", "The Job object"),
          h3("job-statuses", "Job statuses"),
          h3("record-error-codes", "Record error codes"),
          h2("retrieve-a-job", "Retrieve a job"),
        ],
        keywords: ["job", "poll", "status", "counts", "partial", "errors"],
      },
      {
        href: "/docs/api/programmes",
        title: "Programmes",
        description: "Programmes are what people take part in. List them and fetch one by ID.",
        updated: READ_API,
        method: "GET",
        toc: [
          h2("the-programme-object", "The Programme object"),
          h2("list-programmes", "List programmes"),
          h2("retrieve-a-programme", "Retrieve a programme"),
        ],
        keywords: ["programme", "program", "fellowship", "internship", "read api"],
      },
      {
        href: "/docs/api/clans",
        title: "Clans",
        description: "Clans are the groups mentees are placed in within a programme. List them and fetch one by ID.",
        updated: READ_API,
        method: "GET",
        toc: [
          h2("the-clan-object", "The Clan object"),
          h2("list-clans", "List clans"),
          h2("retrieve-a-clan", "Retrieve a clan"),
        ],
        keywords: ["clan", "cohort", "group", "lead mentor", "read api"],
      },
      {
        href: "/docs/api/mentees",
        title: "Mentees",
        description:
          "Mentees are the people placed in your clans. List them with their clans and enrollments, or fetch one.",
        updated: READ_API,
        method: "GET",
        toc: [
          h2("the-mentee-object", "The Mentee object"),
          h3("enrollment-statuses", "Enrollment statuses"),
          h2("list-mentees", "List mentees"),
          h2("retrieve-a-mentee", "Retrieve a mentee"),
        ],
        keywords: ["mentee", "student", "enrollment", "externalId", "personal data", "read api"],
      },
      {
        href: "/docs/api/progress",
        title: "Progress",
        description:
          "How each mentee is doing in a programme: completion, tasks, roadmaps, attendance and certificates.",
        updated: READ_API,
        method: "GET",
        toc: [
          h2("the-progress-object", "The Progress object"),
          h3("task-counts", "Task counts"),
          h2("mentee-progress", "Retrieve a mentee's progress"),
          h2("programme-progress", "List progress for a programme"),
        ],
        keywords: ["progress", "completion", "tasks", "overdue", "attendance", "certificates", "roadmap", "points"],
      },
      {
        href: "/docs/api/webhook-events",
        title: "Webhook events",
        description: "The envelope, headers and data of every event Pathment sends to your webhook endpoints.",
        updated: WEBHOOKS,
        toc: [
          h2("the-event-envelope", "The event envelope"),
          h2("event-types", "Event types"),
          h2("applicant-created", "applicant.created"),
          h2("applicant-assessment-sent", "applicant.assessment_sent"),
          h2("applicant-assessment-submitted", "applicant.assessment_submitted"),
          h2("applicant-accepted", "applicant.accepted"),
          h2("applicant-rejected", "applicant.rejected"),
          h2("mentee-joined", "mentee.joined"),
          h2("task-approved", "task.approved"),
          h2("roadmap-completed", "roadmap.completed"),
          h2("certificate-issued", "certificate.issued"),
          h2("sync-job-completed", "sync.job.completed"),
          h2("ping", "ping"),
        ],
        keywords: ["webhook", "event", "payload", "applicant.accepted", "sync.job.completed", "mentee.joined", "certificate.issued"],
      },
    ],
  },
  {
    title: "Resources",
    pages: [
      {
        href: "/docs/changelog",
        title: "Changelog",
        description: "Changes to the API, newest first.",
        updated: WEBHOOKS,
        toc: [
          h2("pull-connectors", "20 November 2026: Pull connectors"),
          h2("webhooks", "20 November 2026: Webhooks"),
          h2("read-api", "20 November 2026: Read API"),
          h2("v1-launch", "19 November 2026: v1"),
          h2("roadmap", "What's next"),
        ],
        keywords: ["release notes", "roadmap", "webhooks", "new"],
      },
    ],
  },
];

export const allDocPages: DocPage[] = docsNav.flatMap((group) => group.pages);

export function getDocPage(href: string): DocPage {
  const page = allDocPages.find((p) => p.href === href);
  if (!page) throw new Error(`Unknown docs page: ${href}`);
  return page;
}

export function getDocGroup(href: string): DocGroup | undefined {
  return docsNav.find((group) => group.pages.some((p) => p.href === href));
}

export function getPrevNext(href: string): { prev?: DocPage; next?: DocPage } {
  const index = allDocPages.findIndex((p) => p.href === href);
  return {
    prev: index > 0 ? allDocPages[index - 1] : undefined,
    next: index >= 0 && index < allDocPages.length - 1 ? allDocPages[index + 1] : undefined,
  };
}

/** Top-bar sections. A page belongs to the first section whose prefix matches. */
export const docsSections = [
  { label: "Guides", href: "/docs/guides/syncing-users", match: "/docs/guides" },
  { label: "API reference", href: "/docs/api", match: "/docs/api" },
  { label: "Changelog", href: "/docs/changelog", match: "/docs/changelog" },
] as const;

export const API_BASE_URL = "https://api.pathment.me/api/v1";
export const APP_URL = "https://app.pathment.me";
