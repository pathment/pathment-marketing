import Link from "next/link";
import { DocsPage } from "../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../components/docs/CodeBlock";
import { MethodBadge, type HttpMethod } from "../../../components/docs/Endpoint";
import { ParamTable } from "../../../components/docs/ParamTable";
import { H2, RefSplit, Table } from "../../../components/docs/Prose";
import { docsMetadata } from "../../../lib/docs/metadata";
import { errorBody } from "../../../lib/docs/examples";
import { API_BASE_URL } from "../../../lib/docs/nav";

const HREF = "/docs/api";
export const metadata = docsMetadata(HREF);

const endpoints: { method: HttpMethod; path: string; href: string; scope: string; does: string }[] = [
  { method: "GET", path: "/me", href: "/docs/api/me#retrieve-me", scope: "any", does: "Check a key and see its workspace and scopes." },
  { method: "GET", path: "/intakes", href: "/docs/api/intakes#list-intakes", scope: "intakes:read", does: "List intakes." },
  { method: "GET", path: "/intakes/{intakeId}", href: "/docs/api/intakes#retrieve-an-intake", scope: "intakes:read", does: "Retrieve one intake." },
  { method: "POST", path: "/intakes/{intakeId}/applicants", href: "/docs/api/applicants#create-applicants", scope: "applicants:write", does: "Push up to 1,000 applicants." },
  { method: "GET", path: "/intakes/{intakeId}/applicants", href: "/docs/api/applicants#list-applicants", scope: "intakes:read", does: "List applicants in an intake." },
  { method: "GET", path: "/jobs/{jobId}", href: "/docs/api/jobs#retrieve-a-job", scope: "intakes:read or applicants:write", does: "Retrieve a push job." },
];

const objects = [
  { name: "Intake", href: "/docs/api/intakes#the-intake-object", does: "An admissions round for a programme." },
  { name: "Applicant", href: "/docs/api/applicants#the-applicant-object", does: "A person in an intake, with their stage and status." },
  { name: "Job", href: "/docs/api/jobs#the-job-object", does: "The progress and result of one push." },
  { name: "Error", href: "#the-error-object", does: "What every failed request returns." },
];

export default function ApiIndexPage() {
  return (
    <DocsPage
      href={HREF}
      layout="reference"
      lead="Everything the Pathment API can do, endpoint by endpoint. Start with the conventions below: they apply to every request."
    >
      <div className="docs-prose max-w-[46rem]">
        <H2 id="conventions">Conventions</H2>
        <Table
          rows={[
            ["Base URL", <code key="v">{API_BASE_URL}</code>],
            ["Format", <>JSON in and out. Send <code>Content-Type: application/json</code> with a body.</>],
            ["Auth", <><code>Authorization: Bearer pk_live_...</code> on every request. See <Link key="l" href="/docs/authentication">Authentication</Link>.</>],
            ["Request IDs", <>Every response has an <code>X-Request-Id</code> header. Errors repeat it as <code>requestId</code>.</>],
            ["Times", "ISO 8601 strings in UTC, such as 2026-11-19T10:02:11Z."],
            ["IDs", "Opaque strings. Store them as they are, don't parse them."],
            ["Lists", <>Cursor paginated. See <Link key="l" href="/docs/pagination">Pagination</Link>.</>],
            ["Limits", <>120 requests per minute per key. See <Link key="l" href="/docs/rate-limits">Rate limits</Link>.</>],
            ["Versioning", <>In the path. New fields can appear at any time, so ignore ones you don&apos;t know. See <Link key="l" href="/docs/versioning">Versioning</Link>.</>],
          ]}
        />

        <H2 id="endpoints">Endpoints</H2>
        <ul className="!mt-4 list-none divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface !pl-0">
          {endpoints.map((endpoint) => (
            <li key={`${endpoint.method} ${endpoint.path}`} className="!mt-0 max-w-none">
              <Link
                href={endpoint.href}
                className="docs-plain flex flex-col gap-1.5 px-4 py-3.5 no-underline transition-colors hover:bg-soft sm:flex-row sm:items-center sm:gap-4"
              >
                <span className="flex min-w-0 items-center gap-2.5 sm:w-[22rem] sm:shrink-0">
                  <MethodBadge method={endpoint.method} />
                  <code className="!border-0 !bg-transparent !p-0 font-mono text-[0.84rem] text-[var(--docs-heading)]">
                    {endpoint.path}
                  </code>
                </span>
                <span className="min-w-0 text-[0.9rem] leading-6 text-muted">{endpoint.does}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p>
          The scope each endpoint needs is listed on its page. Paths are relative to the base URL.
        </p>

        <H2 id="objects">Objects</H2>
        <div className="grid gap-3 sm:grid-cols-2">
          {objects.map((object) => (
            <Link
              key={object.name}
              href={object.href}
              className="docs-plain rounded-xl border border-line bg-surface p-4 no-underline transition-colors hover:border-brand-400/60 hover:bg-soft"
            >
              <span className="font-mono text-[0.9rem] font-semibold text-[var(--docs-heading)]">{object.name}</span>
              <span className="mt-1 block text-[0.875rem] leading-6 text-muted">{object.does}</span>
            </Link>
          ))}
        </div>
      </div>

      <RefSplit
        aside={
          <>
            <ResponseBlock
              status={400}
              title="Error object"
              body={errorBody("invalid_request", "validation_failed", "records[3].email must be a string.", "records[3].email")}
            />
            <CodeBlock
              language="http"
              title="Response headers"
              code={`HTTP/1.1 400 Bad Request
Content-Type: application/json
X-Request-Id: 2d7f4c1a-9b3e-4a68-8c52-e6a0b9d1f374`}
            />
          </>
        }
      >
        <H2 id="the-error-object">The Error object</H2>
        <p>
          Every failed request returns this shape, with an HTTP status that matches <code>error.type</code>.
          The full list of codes is on the <Link href="/docs/errors">Errors</Link> page.
        </p>
        <ParamTable
          title="Attributes"
          kind="attributes"
          params={[
            {
              name: "error.type",
              type: "string",
              required: true,
              description: (
                <p>
                  One of <code>invalid_request</code>, <code>authentication_error</code>,{" "}
                  <code>permission_error</code>, <code>not_found</code>, <code>conflict</code>,{" "}
                  <code>rate_limited</code>, <code>api_error</code>.
                </p>
              ),
            },
            { name: "error.code", type: "string", required: true, description: "The specific reason. Branch on this." },
            { name: "error.message", type: "string", required: true, description: "A human-readable explanation. Don't parse it." },
            {
              name: "error.field",
              type: "string",
              description: (
                <p>
                  Path to the field at fault, such as <code>records[3].email</code>, when there is one.
                </p>
              ),
            },
            { name: "requestId", type: "string", required: true, description: "Matches the X-Request-Id header." },
          ]}
        />
      </RefSplit>
    </DocsPage>
  );
}
