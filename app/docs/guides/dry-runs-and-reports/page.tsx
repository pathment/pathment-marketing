import Link from "next/link";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../../components/docs/CodeBlock";
import { Callout } from "../../../../components/docs/Callout";
import { H2, Step, Steps, Table } from "../../../../components/docs/Prose";
import { docsMetadata } from "../../../../lib/docs/metadata";
import { dryRunJobObject, dryRunSamples } from "../../../../lib/docs/examples";

const HREF = "/docs/guides/dry-runs-and-reports";
export const metadata = docsMetadata(HREF);

export default function DryRunsPage() {
  return (
    <DocsPage href={HREF}>
      <H2 id="what-a-dry-run-does">What a dry run does</H2>
      <p>
        A dry run is a rehearsal. Add <code>&quot;dryRun&quot;: true</code>{" "}to a push and Pathment does every
        step of a real sync except the last one:
      </p>
      <Table
        head={["Step", "Real sync", "Dry run"]}
        rows={[
          ["Apply the connection's mapping", "Yes", "Yes"],
          ["Validate every record", "Yes", "Yes"],
          ["Match records to existing applicants", "Yes", "Yes"],
          ["Report counts and errors", "Yes", "Yes"],
          ["Create or update applicants", "Yes", "No"],
          ["Send assessment emails", "If turned on", "Never"],
        ]}
      />
      <p>
        So the report says exactly what <em>would</em>{" "}happen: how many people would be created, updated,
        unchanged, skipped or failed, and why each failure would fail.
      </p>

      <H2 id="running-one">Running one</H2>
      <p>It&apos;s the same request as a real push, with one extra field:</p>
      <CodeBlock samples={dryRunSamples} title="Dry run" />
      <p>
        You get a job back as with a real push, and poll it the same way. The job has{" "}
        <code>&quot;dryRun&quot;: true</code>{" "}so it can&apos;t be mistaken for a real one later.
      </p>
      <Callout type="note">
        <p>
          A dry run doesn&apos;t need an <code>Idempotency-Key</code>, since it changes nothing. Sending one is
          harmless, but don&apos;t reuse the dry run&apos;s key for the real push: the body differs, so you&apos;d
          get a <code>409</code>.
        </p>
      </Callout>

      <H2 id="reading-the-report">Reading the report</H2>
      <ResponseBlock status={200} title="A dry run that found a problem" body={dryRunJobObject} />
      <p>Read it top down:</p>
      <ul>
        <li>
          <code>counts</code>{" "}gives the totals. Here, 461 people would be created and 39 would fail.
        </li>
        <li>
          <code>errors</code>{" "}says why. Each entry has the record&apos;s <code>index</code>{" "}
          in your batch, its IDs, the <code>field</code>{" "}and a <code>code</code>. Up to 500 errors are
          listed per job.
        </li>
        <li>
          Look for patterns. 39 <code>missing_email</code>{" "}errors usually mean those records keep their
          email somewhere your mapping doesn&apos;t read. One or two are more likely bad data in the source.
        </li>
      </ul>
      <p>
        Fix the mapping or the data, run the dry run again, and repeat until the report looks right. Then
        send the same records without <code>dryRun</code>.
      </p>
      <Callout type="warning" title="Counts are a forecast">
        <p>
          A dry run reflects Pathment at that moment. If applicants change between the dry run and the
          real push, for example an admin withdraws someone, the real job&apos;s counts can differ slightly.
        </p>
      </Callout>

      <H2 id="sync-history">Sync history in the app</H2>
      <p>
        Every job, dry or real, from the API or the app, appears in Pathment under{" "}
        <strong>Settings → Integrations → Sync history</strong>. For each one you&apos;ll see when it ran,
        which connection and intake it used, and its counts.
      </p>
      <p>
        Each job also has a <strong>downloadable CSV of its errors</strong>. Use it to hand a list of bad
        rows to whoever owns the source data, without anyone reading API responses.
      </p>

      <H2 id="a-safe-rollout">A safe rollout</H2>
      <p>For a new integration, or a big change to a mapping:</p>
      <Steps>
        <Step title="Dry-run a small sample">
          <p>Send 20 or so representative records. Check every error.</p>
        </Step>
        <Step title="Dry-run everything">
          <p>
            Send the full set as dry runs. Check the counts make sense: on a first import, almost everyone
            should be <code>created</code>.
          </p>
        </Step>
        <Step title="Push for real, without assessments">
          <p>
            Run the real sync with <code>&quot;sendAssessment&quot;: false</code>. Look at a few applicants in
            Pathment.
          </p>
        </Step>
        <Step title="Turn on sending">
          <p>
            Once you&apos;re happy, turn on{" "}
            <Link href="/docs/guides/sending-assessments">sending assessments</Link>{" "}for future syncs.
          </p>
        </Step>
      </Steps>
    </DocsPage>
  );
}
