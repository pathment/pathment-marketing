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
        updated: LAUNCH,
        toc: [
          h2("what-you-can-do", "What you can do today"),
          h2("base-url", "Base URL"),
          h2("three-steps", "The path in three steps"),
          h2("start-here", "Start here"),
          h2("whats-coming", "What's coming"),
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
        updated: LAUNCH,
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
          "Every error has the same shape. Here are the types, the codes, the HTTP statuses, and what to do about each one.",
        updated: LAUNCH,
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
          h2("staying-under", "Staying comfortably under"),
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
          "The version lives in the path. What we change without warning, and what we never do.",
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
          "The push model end to end: from records in your system to applicants in a Pathment intake, and how to keep them in step.",
        updated: LAUNCH,
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
        updated: LAUNCH,
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
        updated: LAUNCH,
        method: "GET",
        toc: [
          h2("the-job-object", "The Job object"),
          h3("job-statuses", "Job statuses"),
          h3("record-error-codes", "Record error codes"),
          h2("retrieve-a-job", "Retrieve a job"),
        ],
        keywords: ["job", "poll", "status", "counts", "partial", "errors"],
      },
    ],
  },
  {
    title: "Resources",
    pages: [
      {
        href: "/docs/changelog",
        title: "Changelog",
        description: "What changed in the API, newest first, and what we're building next.",
        updated: LAUNCH,
        toc: [
          h2("v1-launch", "19 November 2026: v1"),
          h2("roadmap", "On the roadmap"),
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
