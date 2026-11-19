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
  listMenteesSamples,
  menteeListResponse,
  menteeObject,
  retrieveMenteeSamples,
} from "../../../../lib/docs/examples-read";

const HREF = "/docs/api/mentees";
export const metadata = docsMetadata(HREF);

const c = (text: string) => <code key={text}>{text}</code>;

export default function MenteesPage() {
  return (
    <DocsPage href={HREF} layout="reference">
      <RefSplit aside={<CodeBlock code={menteeObject} language="json" title="The Mentee object" />}>
        <H2 id="the-mentee-object">The Mentee object</H2>
        <p>
          A mentee is anyone placed as a mentee in at least one of your workspace&apos;s clans. The object
          says who they are, which clans they&apos;re in and which programmes they&apos;re enrolled in.
        </p>
        <Callout type="warning" title="This is personal data">
          <p>
            Mentee objects carry names and email addresses. Grant the <code>mentees:read</code>{" "}scope only to
            systems that should hold that information, and keep it as carefully as you would in Pathment.
          </p>
        </Callout>
        <ParamTable
          title="Attributes"
          kind="attributes"
          params={[
            { name: "id", type: "string", description: "Pathment's ID for this mentee." },
            { name: "email", type: "string", description: "Their email address." },
            { name: "firstName", type: "string", description: "Given name." },
            { name: "lastName", type: "string", description: "Family name." },
            {
              name: "externalId",
              type: "string or null",
              description: (
                <p>
                  Your ID for them, when they came in through a{" "}
                  <Link href="/docs/guides/syncing-users">sync</Link>. Use it to match them back to your own
                  system. <code>null</code>{" "}for people added another way.
                </p>
              ),
            },
            {
              name: "status",
              type: "string",
              description: (
                <p>
                  Their account in the workspace: <code>active</code>, <code>inactive</code>,{" "}
                  <code>pending</code>{" "}or <code>suspended</code>.
                </p>
              ),
            },
            {
              name: "clans",
              type: "array of objects",
              description: (
                <p>
                  Each clan they&apos;re in, with its <code>id</code>, <code>name</code>,{" "}
                  <code>programmeId</code>{" "}and their <code>membership</code>: <code>active</code>{" "}or{" "}
                  <code>paused</code>.
                </p>
              ),
            },
            {
              name: "enrollments",
              type: "array of objects",
              description: (
                <p>
                  Each programme they&apos;re enrolled in, with its <code>programmeId</code>, a{" "}
                  <code>status</code>{" "}(see <a href="#enrollment-statuses">enrollment statuses</a>),{" "}
                  <code>enrolledAt</code>{" "}and <code>completedAt</code>{" "}(<code>null</code>{" "}until they finish).
                </p>
              ),
            },
            { name: "createdAt", type: "string", description: "When they were added (ISO 8601)." },
            {
              name: "updatedAt",
              type: "string",
              description: "When their details, clans or enrollments last changed (ISO 8601).",
            },
          ]}
        />

        <H3 id="enrollment-statuses">Enrollment statuses</H3>
        <p>
          An enrollment moves through these as someone joins, works through and finishes a programme. The
          three you&apos;ll use most: <code>active</code>{" "}means they&apos;re working through it,{" "}
          <code>program_completed</code>{" "}means they finished, and <code>dropped</code>{" "}means they left.
        </p>
        <Table
          head={["Status", "Means"]}
          rows={[
            [c("pending_approval"), "Asked to join, waiting for an admin."],
            [c("approved"), "Approved, not yet placed."],
            [c("rejected"), "Not approved."],
            [c("pending_match"), "Waiting to be placed in a clan or with a mentor."],
            [c("matched"), "Placed, not started yet."],
            [c("active"), "Working through the programme."],
            [c("pending_completion"), "Done with the work, waiting for sign-off."],
            [c("level_completed"), "Finished a level, with more to go."],
            [c("program_completed"), "Finished the programme."],
            [c("dropped"), "Left the programme."],
          ]}
        />
      </RefSplit>

      <RefSplit
        aside={
          <>
            <CodeBlock samples={listMenteesSamples} title="Request" />
            <ResponseBlock status={200} body={menteeListResponse} />
          </>
        }
      >
        <H2 id="list-mentees">List mentees</H2>
        <Endpoint method="GET" path="/mentees" />
        <p>
          Returns the mentees in the key&apos;s workspace. Requires the <code>mentees:read</code>{" "}scope.
        </p>
        <ParamTable
          title="Query parameters"
          params={[
            { name: "limit", type: "integer", meta: "1 to 100, default 50", description: "How many mentees per page." },
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
            { name: "programmeId", type: "string", description: "Only mentees in a clan of this programme." },
            { name: "clanId", type: "string", description: "Only mentees in this clan." },
            { name: "email", type: "string", description: "Find the mentee with this email address." },
            { name: "externalId", type: "string", description: "Find the mentee with your ID." },
            {
              name: "updatedSince",
              type: "string (ISO 8601)",
              description: (
                <p>
                  Only mentees changed after this time. See{" "}
                  <Link href="/docs/guides/reading-progress#incremental-changes">incremental changes</Link>.
                </p>
              ),
            },
          ]}
        />
        <p>
          <strong>Returns</strong>{" "}a list object: <code>data</code>{" "}(an array of Mentee objects),{" "}
          <code>hasMore</code>{" "}and <code>nextCursor</code>.
        </p>
      </RefSplit>

      <RefSplit
        aside={
          <>
            <CodeBlock samples={retrieveMenteeSamples} title="Request" />
            <ResponseBlock status={200} body={menteeObject} />
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
        <H2 id="retrieve-a-mentee">Retrieve a mentee</H2>
        <Endpoint method="GET" path="/mentees/{menteeId}" />
        <p>
          Returns one mentee. Requires the <code>mentees:read</code>{" "}scope.
        </p>
        <ParamTable
          title="Path parameters"
          params={[{ name: "menteeId", type: "string", required: true, description: "The mentee's ID." }]}
        />
        <p>
          <strong>Returns</strong>{" "}a Mentee object, or <code>404</code>{" "}with <code>mentee_not_found</code>.
        </p>
        <p>
          For their progress, see <Link href="/docs/api/progress#mentee-progress">mentee progress</Link>.
        </p>
      </RefSplit>
    </DocsPage>
  );
}
