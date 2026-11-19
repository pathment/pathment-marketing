import Link from "next/link";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../../components/docs/CodeBlock";
import { Endpoint } from "../../../../components/docs/Endpoint";
import { ParamTable } from "../../../../components/docs/ParamTable";
import { H2, H3, RefSplit, Table } from "../../../../components/docs/Prose";
import { docsMetadata } from "../../../../lib/docs/metadata";
import { errorBody, jobPartialObject, pollJobSamples, retrieveJobSamples } from "../../../../lib/docs/examples";

const HREF = "/docs/api/jobs";
export const metadata = docsMetadata(HREF);

const c = (text: string) => <code key={text}>{text}</code>;

export default function JobsPage() {
  return (
    <DocsPage href={HREF} layout="reference">
      <RefSplit aside={<CodeBlock code={jobPartialObject} language="json" title="The Job object" />}>
        <H2 id="the-job-object">The Job object</H2>
        <p>
          Every push creates a job. It starts <code>queued</code>, runs in the background and finishes with a
          count of what happened to every record, plus the reason for each one that didn&apos;t go through.
        </p>
        <ParamTable
          title="Attributes"
          kind="attributes"
          params={[
            { name: "id", type: "string", description: "The job's ID." },
            { name: "status", type: "string", description: <p>See <a href="#job-statuses">job statuses</a>.</p> },
            { name: "dryRun", type: "boolean", description: "true if this was a rehearsal that wrote nothing." },
            { name: "intakeId", type: "string", description: "The intake the records were pushed to." },
            { name: "connection", type: "string or null", description: "The connection whose mapping was used, or null." },
            { name: "total", type: "integer", description: "How many records the push contained." },
            {
              name: "counts",
              type: "object",
              description: (
                <p>
                  How many records were <code>created</code>, <code>updated</code>, <code>unchanged</code>,{" "}
                  <code>skipped</code>{" "}and <code>failed</code>. Zero until the job finishes.
                </p>
              ),
            },
            {
              name: "assessmentsSent",
              type: "integer",
              description: (
                <p>
                  How many new applicants were emailed their assessment. Always <code>0</code>{" "}for a dry run.
                </p>
              ),
            },
            {
              name: "errors",
              type: "array of objects",
              description: (
                <p>
                  One entry per record that failed or was skipped, up to 500. Each has the record&apos;s{" "}
                  <code>index</code>{" "}in your batch (from 0), its <code>externalId</code>{" "}and <code>email</code>,
                  the <code>field</code>{" "}at fault if there is one, a <code>code</code>{" "}and a{" "}
                  <code>message</code>.
                </p>
              ),
            },
            { name: "createdAt", type: "string", description: "When the push was received." },
            { name: "startedAt", type: "string or null", description: "When processing started." },
            { name: "finishedAt", type: "string or null", description: "When processing finished." },
          ]}
        />

        <H3 id="job-statuses">Job statuses</H3>
        <Table
          head={["Status", "Means"]}
          rows={[
            [c("queued"), "Received, waiting to start."],
            [c("running"), "Being processed."],
            [c("succeeded"), "Finished, and every record went through."],
            [c("partial"), "Finished, but some records failed. See errors."],
            [c("failed"), "The job couldn't be completed."],
          ]}
        />
        <p>
          Poll until the status is <code>succeeded</code>, <code>partial</code>{" "}or <code>failed</code>. Those
          three are final.
        </p>

        <H3 id="record-error-codes">Record error codes</H3>
        <p>These appear in a job&apos;s <code>errors</code>, one per record.</p>
        <Table
          head={["Code", "Means"]}
          rows={[
            [c("missing_email"), "The record has no email, after mapping if a connection was used."],
            [c("invalid_email"), "The email isn't a valid address."],
            [c("invalid_level"), "The intake has levels and this value matches none of them by key or label (ignoring case). Counted as failed."],
            [c("duplicate_in_batch"), "An earlier record in this batch had the same email or externalId."],
            [
              c("applicant_closed"),
              "Skipped: this applicant was rejected, withdrew or was removed. Pathment never reopens them.",
            ],
            [
              c("intake_full"),
              "The intake has reached its application cap, so this new person wasn't added. Counted as failed. Updates to existing applicants still go through. An admin can raise the cap in the app.",
            ],
            [c("mapping_failed"), "The connection's mapping couldn't be applied to this record."],
          ]}
        />
        <p>
          The <Link href="/docs/guides/syncing-users#wait-for-the-job">syncing guide</Link>{" "}says what to do
          about each.
        </p>
      </RefSplit>

      <RefSplit
        aside={
          <>
            <CodeBlock samples={retrieveJobSamples} title="Request" />
            <ResponseBlock status={200} body={jobPartialObject} />
            <ResponseBlock
              status={404}
              title="Unknown job"
              body={errorBody("not_found", "job_not_found", "No job with ID 6e2b9d4f-7a13-4c85-b0e6-2f9a1d8c4b70 in this workspace.")}
            />
          </>
        }
      >
        <H2 id="retrieve-a-job">Retrieve a job</H2>
        <Endpoint method="GET" path="/jobs/{jobId}" />
        <p>
          Returns a job and its results so far. Requires the <code>intakes:read</code>{" "}or the{" "}
          <code>applicants:write</code>{" "}scope, so a push-only key can always check its own jobs.
        </p>
        <ParamTable
          title="Path parameters"
          params={[{ name: "jobId", type: "string", required: true, description: "The job's ID, from the push response." }]}
        />
        <p>
          <strong>Returns</strong>{" "}a Job object, or <code>404</code>{" "}with <code>job_not_found</code>.
        </p>
        <p>To wait for a job, poll every 2 seconds until it reaches a final status:</p>
        <CodeBlock samples={pollJobSamples} title="Poll until finished" />
        <p>
          Or skip polling: a <Link href="/docs/guides/webhooks">webhook</Link>{" "}endpoint subscribed to{" "}
          <Link href="/docs/api/webhook-events#sync-job-completed">
            <code>sync.job.completed</code>
          </Link>{" "}
          receives this same Job object as soon as the job finishes, whatever its status.
        </p>
      </RefSplit>
    </DocsPage>
  );
}
