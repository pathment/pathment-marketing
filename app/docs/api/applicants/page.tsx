import Link from "next/link";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../../components/docs/CodeBlock";
import { Callout } from "../../../../components/docs/Callout";
import { Endpoint } from "../../../../components/docs/Endpoint";
import { ParamTable } from "../../../../components/docs/ParamTable";
import { H2, H3, RefSplit, Table } from "../../../../components/docs/Prose";
import { docsMetadata } from "../../../../lib/docs/metadata";
import {
  applicantListResponse,
  applicantObject,
  errorBody,
  jobQueuedResponse,
  listApplicantsSamples,
  pushSamples,
} from "../../../../lib/docs/examples";

const HREF = "/docs/api/applicants";
export const metadata = docsMetadata(HREF);

const c = (text: string) => <code key={text}>{text}</code>;

export default function ApplicantsPage() {
  return (
    <DocsPage href={HREF} layout="reference">
      <RefSplit aside={<CodeBlock code={applicantObject} language="json" title="The Applicant object" />}>
        <H2 id="the-applicant-object">The Applicant object</H2>
        <p>An applicant is one person in one intake, with what you know about them and where they&apos;ve got to.</p>
        <ParamTable
          title="Attributes"
          kind="attributes"
          params={[
            { name: "id", type: "string", description: "Pathment's ID for this applicant." },
            { name: "intakeId", type: "string", description: "The intake they belong to." },
            {
              name: "externalId",
              type: "string or null",
              description: "Your ID for this person, if you sent one. It's how later syncs find them again.",
            },
            { name: "email", type: "string", description: "Their email address." },
            { name: "firstName", type: "string or null", description: "Given name." },
            { name: "lastName", type: "string or null", description: "Family name." },
            { name: "phone", type: "string or null", description: "Phone number." },
            {
              name: "level",
              type: "string or null",
              description: "The key of the intake level they're placed at, such as senior, even if you sent its label (\"Senior\"). Decides which assessment they get. Null if the intake has no levels.",
            },
            { name: "country", type: "string or null", description: "Where they're based." },
            {
              name: "status",
              type: "string",
              description: (
                <p>
                  The admissions decision. See <a href="#stage-and-status">stage and status</a>.
                </p>
              ),
            },
            {
              name: "stage",
              type: "string",
              description: (
                <p>
                  Where they are in the pipeline. See <a href="#stage-and-status">stage and status</a>.
                </p>
              ),
            },
            {
              name: "responses",
              type: "object",
              description:
                "Extra answers and details, including any fields you sent that aren't Pathment fields. Reviewers see these.",
            },
            {
              name: "source",
              type: "string",
              description: (
                <p>
                  How they arrived, for example <code>api</code> for a push or <code>import</code> for a file
                  upload in the app. More values may appear.
                </p>
              ),
            },
            { name: "createdAt", type: "string", description: "When they were added (ISO 8601)." },
            { name: "updatedAt", type: "string", description: "When anything about them last changed (ISO 8601)." },
          ]}
        />

        <H3 id="stage-and-status">Stage and status</H3>
        <p>An applicant has two separate fields that are easy to mix up:</p>
        <ul>
          <li>
            <strong>
              <code>stage</code>
            </strong>{" "}
            is <em>where they are</em> in the pipeline. It&apos;s the step list admins see in Pathment, and
            it moves forward as things happen.
          </li>
          <li>
            <strong>
              <code>status</code>
            </strong>{" "}
            is <em>the decision</em> an admin has made about them.
          </li>
        </ul>
        <p>
          For example, someone who has submitted their assessment but hasn&apos;t been reviewed yet has the
          stage <code>submitted</code> and the status <code>under_review</code>.
        </p>
        <Table
          head={["Stage", "Means"]}
          rows={[
            [c("added"), "In the intake, nothing sent yet."],
            [c("assessment_sent"), "Emailed their assessment link."],
            [c("opened"), "Opened the assessment."],
            [c("in_progress"), "Started answering."],
            [c("submitted"), "Handed it in."],
            [c("reviewed"), "A reviewer has assessed it."],
            [c("accepted"), "Offered a place."],
            [c("programme_invited"), "Invited to join the programme."],
            [c("joined"), "Joined the programme."],
            [c("rejected"), "Not offered a place."],
            [c("withdrawn"), "Withdrew."],
            [c("removed"), "Removed by an admin."],
          ]}
        />
        <Table
          head={["Status", "Means"]}
          rows={[
            [c("pending"), "No decision yet, nothing sent."],
            [c("assessment_sent"), "Waiting on their assessment."],
            [c("under_review"), "Waiting on a reviewer or admin."],
            [c("accepted"), "Accepted."],
            [c("rejected"), "Rejected."],
            [c("waitlisted"), "On the waiting list."],
            [c("withdrawn"), "Withdrew."],
            [c("removed"), "Removed by an admin."],
          ]}
        />
        <Callout type="note">
          <p>
            New stages or statuses may be added. Show values you don&apos;t recognise as they are rather than
            failing.
          </p>
        </Callout>
      </RefSplit>

      <RefSplit
        aside={
          <>
            <CodeBlock samples={pushSamples} title="Request" />
            <ResponseBlock status={202} body={jobQueuedResponse} />
            <ResponseBlock
              status={400}
              title="Too many records"
              body={errorBody("invalid_request", "too_many_records", "Send at most 1,000 records per request. This request had 1,250.", "records")}
            />
            <ResponseBlock
              status={409}
              title="Idempotency key reused"
              body={errorBody("conflict", "idempotency_key_reused", "This Idempotency-Key was already used with a different request body.")}
            />
          </>
        }
      >
        <H2 id="create-applicants">Push applicants</H2>
        <Endpoint method="POST" path="/intakes/{intakeId}/applicants" />
        <p>
          Sends a batch of up to 1,000 people to an intake. Pathment creates new applicants, updates ones it
          already has and reports each record&apos;s outcome on a <Link href="/docs/api/jobs">job</Link>.
          Requires the <code>applicants:write</code> scope.
        </p>
        <p>
          The work happens in the background. You get <code>202 Accepted</code> with a queued job right
          away; poll <Link href="/docs/api/jobs#retrieve-a-job">GET /jobs/&#123;jobId&#125;</Link> for the
          result. See <Link href="/docs/guides/syncing-users">Syncing users</Link> for the whole flow.
        </p>
        <ParamTable
          title="Path parameters"
          params={[{ name: "intakeId", type: "string", required: true, description: "The intake to add people to." }]}
        />
        <ParamTable
          title="Headers"
          params={[
            {
              name: "Idempotency-Key",
              type: "string",
              meta: "up to 255 characters",
              description: (
                <p>
                  Strongly recommended. Same key and same body within 24 hours returns the original job with{" "}
                  <code>200</code>; same key with a different body returns <code>409</code>. See{" "}
                  <Link href="/docs/idempotency">Idempotency</Link>.
                </p>
              ),
            },
          ]}
        />
        <ParamTable
          title="Body"
          params={[
            {
              name: "records",
              type: "array of objects",
              required: true,
              meta: "1 to 1,000 items",
              description: (
                <p>
                  The people to push. Without a <code>connection</code>, each record uses the Pathment fields
                  below. With one, send records in your own shape.
                </p>
              ),
            },
            {
              name: "connection",
              type: "string",
              description: (
                <p>
                  The ID of a connection whose <Link href="/docs/guides/field-mapping">field mapping</Link> to
                  apply to every record.
                </p>
              ),
            },
            {
              name: "dryRun",
              type: "boolean",
              meta: "default false",
              description: (
                <p>
                  Map, validate and match without writing or sending anything. The job reports what would
                  happen. See <Link href="/docs/guides/dry-runs-and-reports">Dry runs</Link>.
                </p>
              ),
            },
            {
              name: "sendAssessment",
              type: "boolean",
              description: (
                <p>
                  When <code>true</code>, every newly created applicant is sent the assessment for their level
                  once the job finishes. Overrides the connection&apos;s setting. See{" "}
                  <Link href="/docs/guides/sending-assessments">Sending assessments</Link>.
                </p>
              ),
            },
          ]}
        />
        <ParamTable
          title="Record fields (Pathment names)"
          params={[
            { name: "email", type: "string", required: true, description: "The person's email address." },
            { name: "firstName", type: "string", description: "Given name." },
            { name: "lastName", type: "string", description: "Family name." },
            { name: "phone", type: "string", description: "Phone number, ideally with the country code." },
            {
              name: "level",
              type: "string",
              description: (
                <p>
                  If the intake has levels, this must match one of them by key or label, ignoring case:{" "}
                  <code>senior</code>, <code>Senior</code> and <code>SENIOR</code> all match a level keyed{" "}
                  <code>senior</code>. If it matches none, the record fails with <code>invalid_level</code>. If
                  the intake has no levels, the value is stored as <code>responses.level</code> instead. With a
                  connection, the mapping&apos;s <code>map</code> and <code>default</code> are applied first; see{" "}
                  <Link href="/docs/guides/field-mapping#value-maps">value maps</Link>.
                </p>
              ),
            },
            { name: "country", type: "string", description: "Where the person is based." },
            {
              name: "externalId",
              type: "string",
              description: (
                <p>
                  Your ID for this person. Strongly recommended: it&apos;s how updates find the same person. See{" "}
                  <Link href="/docs/guides/matching-and-updates">Matching</Link>.
                </p>
              ),
            },
            { name: "responses", type: "object", description: "Extra answers, shown to reviewers." },
          ]}
        />
        <p>
          Any other top-level field on a record is kept under <code>responses</code>. Nothing you send is
          dropped.
        </p>
        <p>
          <strong>Returns</strong> <code>202</code> with <code>&#123; &quot;job&quot;: Job &#125;</code> (status{" "}
          <code>queued</code>), or <code>200</code> with the existing job on an idempotent replay.
        </p>
      </RefSplit>

      <RefSplit
        aside={
          <>
            <CodeBlock samples={listApplicantsSamples} title="Request" />
            <ResponseBlock status={200} body={applicantListResponse} />
          </>
        }
      >
        <H2 id="list-applicants">List applicants</H2>
        <Endpoint method="GET" path="/intakes/{intakeId}/applicants" />
        <p>
          Returns the applicants in an intake, with their current stage and status. Requires the{" "}
          <code>intakes:read</code> scope.
        </p>
        <ParamTable
          title="Path parameters"
          params={[{ name: "intakeId", type: "string", required: true, description: "The intake to list." }]}
        />
        <ParamTable
          title="Query parameters"
          params={[
            { name: "limit", type: "integer", meta: "1 to 100, default 50", description: "How many applicants per page." },
            {
              name: "cursor",
              type: "string",
              description: (
                <p>
                  The <code>nextCursor</code> from the previous page.
                </p>
              ),
            },
            {
              name: "stage",
              type: "string",
              description: (
                <p>
                  Only applicants at this stage, such as <code>submitted</code>.
                </p>
              ),
            },
            {
              name: "updatedSince",
              type: "string (ISO 8601)",
              description: (
                <p>
                  Only applicants changed after this time. Ideal for regular syncs. See{" "}
                  <Link href="/docs/pagination#incremental-reads">incremental reads</Link>.
                </p>
              ),
            },
            { name: "externalId", type: "string", description: "Find the applicant with your ID." },
            { name: "email", type: "string", description: "Find the applicant with this email address." },
          ]}
        />
        <p>
          <strong>Returns</strong> a list object: <code>data</code> (an array of Applicant objects),{" "}
          <code>hasMore</code> and <code>nextCursor</code>.
        </p>
      </RefSplit>
    </DocsPage>
  );
}
