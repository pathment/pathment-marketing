import Link from "next/link";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../../components/docs/CodeBlock";
import { Callout } from "../../../../components/docs/Callout";
import { Endpoint } from "../../../../components/docs/Endpoint";
import { ParamTable } from "../../../../components/docs/ParamTable";
import { H2, H3, RefSplit, Table } from "../../../../components/docs/Prose";
import { docsMetadata } from "../../../../lib/docs/metadata";
import { errorBody } from "../../../../lib/docs/examples";
import {
  menteeProgressResponse,
  menteeProgressSamples,
  programmeProgressResponse,
  programmeProgressSamples,
  progressObject,
} from "../../../../lib/docs/examples-read";

const HREF = "/docs/api/progress";
export const metadata = docsMetadata(HREF);

const c = (text: string) => <code key={text}>{text}</code>;

export default function ProgressPage() {
  return (
    <DocsPage href={HREF} layout="reference">
      <RefSplit aside={<CodeBlock code={progressObject} language="json" title="The Progress object" />}>
        <H2 id="the-progress-object">The Progress object</H2>
        <p>
          A Progress object is one mentee&apos;s standing in one programme: how much of their work is done,
          where they are on each roadmap, how often they turn up, and what certificates they&apos;ve earned.
        </p>
        <Callout type="note" title="No names in here">
          <p>
            Progress carries the mentee&apos;s <code>menteeId</code>, not their name or email. To put a name
            to it, look the ID up with <Link href="/docs/api/mentees">mentees</Link>, which needs the{" "}
            <code>mentees:read</code>{" "}scope.
          </p>
        </Callout>
        <ParamTable
          title="Attributes"
          kind="attributes"
          params={[
            { name: "menteeId", type: "string", description: "The mentee this progress belongs to." },
            {
              name: "programme",
              type: "object",
              description: (
                <p>
                  The programme&apos;s <code>id</code>{" "}and <code>name</code>.
                </p>
              ),
            },
            {
              name: "clan",
              type: "object or null",
              description: (
                <p>
                  The clan they&apos;re in for this programme, as <code>id</code>{" "}and <code>name</code>, or{" "}
                  <code>null</code>{" "}if they haven&apos;t been placed.
                </p>
              ),
            },
            {
              name: "enrollment",
              type: "object",
              description: (
                <p>
                  Their enrollment <code>status</code>, <code>enrolledAt</code>{" "}and <code>completedAt</code>.
                  Statuses are listed on the{" "}
                  <Link href="/docs/api/mentees#enrollment-statuses">Mentee object</Link>.
                </p>
              ),
            },
            {
              name: "completionPercent",
              type: "integer",
              description: "The share of their assigned work in this programme that's completed, from 0 to 100.",
            },
            { name: "points", type: "integer", description: "Points they've earned in this programme." },
            {
              name: "tasks",
              type: "object",
              description: (
                <p>
                  Their tasks, counted by state. See <a href="#task-counts">task counts</a>.
                </p>
              ),
            },
            {
              name: "roadmaps",
              type: "array of objects",
              description: (
                <p>
                  Each roadmap they&apos;re on, with the step they&apos;re at. <code>currentStep</code>{" "}counts the
                  steps they&apos;ve completed, so 7 with <code>totalSteps</code> 18 means 7 of 18 done.{" "}
                  <code>completed</code>{" "}is <code>true</code>{" "}once they&apos;ve finished it.
                </p>
              ),
            },
            {
              name: "attendance",
              type: "object",
              description: (
                <p>
                  From their clan&apos;s review sessions: how many <code>sessions</code>{" "}there were, and how
                  many they were <code>present</code>, <code>absent</code>{" "}and <code>excused</code>{" "}for.{" "}
                  <code>rate</code>{" "}is <code>present / sessions</code>, or <code>null</code>{" "}when there have
                  been no sessions.
                </p>
              ),
            },
            {
              name: "certificates",
              type: "array of objects",
              description: (
                <p>
                  Certificates issued to them for this programme, each with its <code>number</code>,{" "}
                  <code>tier</code>, <code>issuedAt</code>{" "}and a public <code>verifyUrl</code>{" "}anyone can
                  open to check it&apos;s genuine.
                </p>
              ),
            },
            { name: "updatedAt", type: "string", description: "When any of this last changed (ISO 8601)." },
          ]}
        />

        <H3 id="task-counts">Task counts</H3>
        <Table
          head={["Count", "Means"]}
          rows={[
            [c("total"), "Every task assigned to them in this programme."],
            [c("open"), "Assigned or in progress."],
            [c("submitted"), "Handed in, waiting for review."],
            [c("completed"), "Approved."],
            [c("revisionNeeded"), "Sent back for changes."],
            [
              c("overdue"),
              "Not completed and past its due date. These are also counted in open or revisionNeeded, so don't add overdue to the others.",
            ],
          ]}
        />
      </RefSplit>

      <RefSplit
        aside={
          <>
            <CodeBlock samples={menteeProgressSamples} title="Request" />
            <ResponseBlock status={200} body={menteeProgressResponse} />
            <ResponseBlock
              status={404}
              title="Unknown mentee"
              body={errorBody(
                "not_found",
                "mentee_not_found",
                "No mentee with ID 4f9d2a6c-8e13-4b70-95c2-e7a0b3d6f1c8 in this workspace.",
              )}
            />
          </>
        }
      >
        <H2 id="mentee-progress">Retrieve a mentee&apos;s progress</H2>
        <Endpoint method="GET" path="/mentees/{menteeId}/progress" />
        <p>
          Returns one Progress object for each programme the mentee is enrolled in. Requires the{" "}
          <code>progress:read</code>{" "}scope.
        </p>
        <p>
          This list isn&apos;t paginated. Someone is only ever in a handful of programmes, so you get them all
          at once.
        </p>
        <ParamTable
          title="Path parameters"
          params={[{ name: "menteeId", type: "string", required: true, description: "The mentee's ID." }]}
        />
        <ParamTable
          title="Query parameters"
          params={[{ name: "programmeId", type: "string", description: "Only progress in this programme." }]}
        />
        <p>
          <strong>Returns</strong> <code>&#123; &quot;data&quot;: [Progress, ...] &#125;</code>, or{" "}
          <code>404</code>{" "}with <code>mentee_not_found</code>.
        </p>
      </RefSplit>

      <RefSplit
        aside={
          <>
            <CodeBlock samples={programmeProgressSamples} title="Request" />
            <ResponseBlock status={200} body={programmeProgressResponse} />
          </>
        }
      >
        <H2 id="programme-progress">List progress for a programme</H2>
        <Endpoint method="GET" path="/programmes/{programmeId}/progress" />
        <p>
          Returns progress for everyone enrolled in a programme, a page at a time. This is the one to use
          for a dashboard or a nightly export. Requires the <code>progress:read</code>{" "}scope.
        </p>
        <ParamTable
          title="Path parameters"
          params={[{ name: "programmeId", type: "string", required: true, description: "The programme's ID." }]}
        />
        <ParamTable
          title="Query parameters"
          params={[
            { name: "limit", type: "integer", meta: "1 to 100, default 50", description: "How many per page." },
            {
              name: "cursor",
              type: "string",
              description: (
                <p>
                  The <code>nextCursor</code>{" "}from the previous page. See{" "}
                  <Link href="/docs/pagination">Pagination</Link>.
                </p>
              ),
            },
            { name: "clanId", type: "string", description: "Only mentees in this clan." },
          ]}
        />
        <p>
          <strong>Returns</strong>{" "}a list object: <code>data</code>{" "}(an array of Progress objects),{" "}
          <code>hasMore</code>{" "}and <code>nextCursor</code>, or <code>404</code>{" "}with{" "}
          <code>programme_not_found</code>.
        </p>
        <p>
          For a complete nightly job, see{" "}
          <Link href="/docs/guides/reading-progress">Reading progress</Link>.
        </p>
      </RefSplit>
    </DocsPage>
  );
}
