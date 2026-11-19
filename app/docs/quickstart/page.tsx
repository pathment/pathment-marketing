import Link from "next/link";
import { Braces, ListChecks, Shuffle } from "lucide-react";
import { DocsPage } from "../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../components/docs/CodeBlock";
import { Callout } from "../../../components/docs/Callout";
import { Card, CardGrid, H2, Step, Steps } from "../../../components/docs/Prose";
import { docsMetadata } from "../../../lib/docs/metadata";
import {
  intakeListResponse,
  jobQueuedResponse,
  jobSucceededObject,
  listIntakesSamples,
  meResponse,
  meSamples,
  pollJobSamples,
  pushSamples,
  quickstartScript,
} from "../../../lib/docs/examples";

const HREF = "/docs/quickstart";
export const metadata = docsMetadata(HREF);

export default function QuickstartPage() {
  return (
    <DocsPage href={HREF}>
      <p>
        By the end of this page you&apos;ll have pushed two applicants into a Pathment intake from your own
        code, and seen Pathment confirm it. Every step has an example you can copy.
      </p>

      <H2 id="before-you-start">Before you start</H2>
      <ul>
        <li>
          You need to be an <strong>admin</strong> in a Pathment workspace, or have one create a key for
          you.
        </li>
        <li>
          The workspace needs at least one <strong>open intake</strong>. If you don&apos;t have one, create
          it in Pathment first. A test intake is perfect.
        </li>
        <li>
          Pick a language: cURL in a terminal, Node.js 18 or newer, or Python 3.8 or newer with{" "}
          <code>requests</code> installed (<code>pip install requests</code>).
        </li>
      </ul>

      <H2 id="steps">Steps</H2>
      <Steps>
        <Step id="create-a-key" title="1. Create an API key">
          <p>
            In Pathment, go to <strong>Settings → Integrations → API keys</strong> and create a key. Give
            it a name you&apos;ll recognise later, like &ldquo;Quickstart&rdquo;, and tick both scopes:{" "}
            <code>intakes:read</code> and <code>applicants:write</code>.
          </p>
          <p>
            The full key starts with <code>pk_live_</code> and is shown only once. Copy it and put it in an
            environment variable, so it never ends up in your code:
          </p>
          <CodeBlock code={`export PATHMENT_API_KEY="pk_live_••••••••••••••••••••••••••••••••"`} language="bash" title="Terminal" />
          <Callout type="warning">
            <p>
              Treat the key like a password. Anyone who has it can add applicants to your workspace. Keep
              it on servers, never in a browser or a mobile app.
            </p>
          </Callout>
        </Step>

        <Step id="check-the-key" title="2. Check the key works">
          <p>
            Call <code>GET /me</code>. It needs no particular scope, so it&apos;s the quickest way to see
            that the key is right and which workspace it belongs to.
          </p>
          <CodeBlock samples={meSamples} title="GET /me" />
          <ResponseBlock status={200} body={meResponse} />
          <p>
            Got a <code>401</code>? The key is missing, mistyped or revoked. The error&apos;s{" "}
            <code>code</code> tells you which. See <Link href="/docs/errors">Errors</Link>.
          </p>
        </Step>

        <Step id="find-your-intake" title="3. Find your intake">
          <p>
            Applicants always go into an intake, so you need its ID. List your intakes and copy the{" "}
            <code>id</code> of the one you want.
          </p>
          <CodeBlock samples={listIntakesSamples} title="GET /intakes" />
          <ResponseBlock status={200} body={intakeListResponse} />
          <p>
            Note the <code>levels</code>. If the intake has levels, each applicant&apos;s <code>level</code>{" "}
            must match one of them, by key or label (any case). If it has none, any <code>level</code> you send
            is kept under <code>responses.level</code>.
          </p>
        </Step>

        <Step id="push-applicants" title="4. Push two applicants">
          <p>
            Now send two people. Swap in your intake ID, and change the <code>level</code> values to match
            your intake&apos;s levels (or leave <code>level</code> out if it has none).
          </p>
          <CodeBlock samples={pushSamples} title="POST /intakes/{intakeId}/applicants" />
          <p>
            Pathment answers straight away with <code>202 Accepted</code> and a job. The work itself
            happens in the background, which is why big batches don&apos;t time out.
          </p>
          <ResponseBlock status={202} body={jobQueuedResponse} />
          <Callout type="tip" title="Why the Idempotency-Key?">
            <p>
              If your network drops and you send the same batch again with the same key, Pathment hands
              back the original job instead of starting a second one. It&apos;s a free safety net. Read
              more in <Link href="/docs/idempotency">Idempotency</Link>.
            </p>
          </Callout>
        </Step>

        <Step id="check-the-job" title="5. Check the job">
          <p>
            Ask for the job every couple of seconds until its <code>status</code> is no longer{" "}
            <code>queued</code> or <code>running</code>. Small batches usually finish within a second or
            two.
          </p>
          <CodeBlock samples={pollJobSamples} title="GET /jobs/{jobId}" />
          <ResponseBlock status={200} body={jobSucceededObject} />
          <p>
            <code>created: 2</code> means both people are now applicants in your intake, at the
            &ldquo;Added&rdquo; stage. Open the intake in Pathment and you&apos;ll see them there.
          </p>
          <p>
            Run the same push again with a <em>new</em> idempotency key and the job will report{" "}
            <code>unchanged: 2</code>. Pathment recognised both people and had nothing to change.
          </p>
        </Step>
      </Steps>

      <H2 id="full-script">The whole thing as one script</H2>
      <p>
        Here are all five steps together. It finds your first open intake, pushes the two records and
        prints the result. The Node.js version uses top-level <code>await</code>, so save it as a{" "}
        <code>.mjs</code> file.
      </p>
      <CodeBlock samples={quickstartScript} title="quickstart" />

      <H2 id="next-steps">Next steps</H2>
      <CardGrid>
        <Card href="/docs/guides/syncing-users" title="Sync your real data" icon={Shuffle}>
          Batching, retries and keeping Pathment in step with your system over time.
        </Card>
        <Card href="/docs/guides/dry-runs-and-reports" title="Rehearse with a dry run" icon={ListChecks}>
          See what a sync would do before it touches anything.
        </Card>
        <Card href="/docs/api/applicants" title="Applicants reference" icon={Braces}>
          Every field you can send, and everything you get back.
        </Card>
      </CardGrid>
    </DocsPage>
  );
}
