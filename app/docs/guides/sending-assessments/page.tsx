import Link from "next/link";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../../components/docs/CodeBlock";
import { Callout } from "../../../../components/docs/Callout";
import { H2, Table } from "../../../../components/docs/Prose";
import { docsMetadata } from "../../../../lib/docs/metadata";
import { pushWithConnectionSamples } from "../../../../lib/docs/examples";

const HREF = "/docs/guides/sending-assessments";
export const metadata = docsMetadata(HREF);

export default function SendingAssessmentsPage() {
  return (
    <DocsPage href={HREF}>
      <p>
        Many intakes start with an assessment: a short test or task matched to the applicant&apos;s level.
        When people arrive through a sync, Pathment can send it to them for you, the moment the job
        finishes.
      </p>

      <H2 id="how-it-works">How it works</H2>
      <p>
        When sending is on and the intake has an assessment set up, each <strong>new</strong>{" "}applicant
        created by the job is emailed the assessment for their level. Their stage moves from
        &ldquo;Added&rdquo; to &ldquo;Assessment sent&rdquo;.
      </p>
      <p>
        You don&apos;t make a separate call. The job report tells you how many emails went out.
      </p>
      <Callout type="note">
        <p>
          The intake needs an assessment set up in Pathment first. If it has levels, set up an assessment
          for each level you send people to.
        </p>
      </Callout>

      <H2 id="turning-it-on">Turning it on</H2>
      <p>There are two switches. The request wins when both are set.</p>
      <Table
        head={["Where", "How", "Applies to"]}
        rows={[
          [
            "On the connection",
            <>Set &ldquo;After each sync&rdquo; to <strong>Send assessment</strong>{" "}in Settings → Integrations → Connections.</>,
            "Every push that uses this connection.",
          ],
          [
            "On the request",
            <>Send <code>&quot;sendAssessment&quot;: true</code>{" "}(or <code>false</code>) in the push body.</>,
            "This push only. Overrides the connection.",
          ],
        ]}
      />
      <p>
        Without a connection, only the request switch exists, and sending is off unless you set it to{" "}
        <code>true</code>.
      </p>
      <CodeBlock samples={pushWithConnectionSamples} title="Push and send assessments" />
      <Callout type="tip" title="Importing an old list?">
        <p>
          Pass <code>&quot;sendAssessment&quot;: false</code>{" "}when you import historical data through a
          connection that normally sends. People who applied months ago probably shouldn&apos;t get a
          surprise test today.
        </p>
      </Callout>

      <H2 id="what-they-receive">What the applicant receives</H2>
      <p>
        Each new applicant gets one email from Pathment with a <strong>private link</strong>{" "}to the
        assessment for their <code>level</code>. The link is theirs alone, so treat the email address you
        send as the place the assessment will go.
      </p>
      <p>
        As they work through it, their stage moves on in Pathment: opened, in progress, submitted. You can
        follow along by <Link href="/docs/api/applicants#list-applicants">listing applicants</Link>.
      </p>

      <H2 id="who-is-not-emailed">Who is not emailed</H2>
      <p>Pathment never sends someone the same assessment twice by accident. These people are left out:</p>
      <ul>
        <li>
          Existing applicants that the job updated or left unchanged. Only people the job created
          are emailed.
        </li>
        <li>
          Anyone who was already sent the assessment, or has already submitted it.
        </li>
        <li>
          Records that failed or were skipped, including closed applicants.
        </li>
        <li>
          Everyone in a dry run. A dry run never sends anything.
        </li>
      </ul>

      <H2 id="checking-it-worked">Checking it worked</H2>
      <p>
        The finished job has an <code>assessmentsSent</code>{" "}count. For a first sync of new people it
        normally matches <code>counts.created</code>.
      </p>
      <ResponseBlock
        status={200}
        title="Job (trimmed)"
        body={`{
  "id": "3f1d8a52-0c6e-4b9a-a7d4-5e2b91c07f38",
  "status": "succeeded",
  "counts": { "created": 40, "updated": 12, "unchanged": 88, "skipped": 0, "failed": 0 },
  "assessmentsSent": 40
}`}
      />
      <p>
        If <code>assessmentsSent</code>{" "}is <code>0</code>{" "}when you expected more, check that sending was on
        (on the connection or in the request) and that the intake has an assessment for each level.
      </p>
    </DocsPage>
  );
}
