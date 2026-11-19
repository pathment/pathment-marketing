import Link from "next/link";
import { BarChart3, Braces, Rocket, Shuffle } from "lucide-react";
import { DocsPage } from "../../components/docs/DocsPage";
import { CodeBlock } from "../../components/docs/CodeBlock";
import { Callout } from "../../components/docs/Callout";
import { Card, CardGrid, H2, Step, Steps } from "../../components/docs/Prose";
import { docsMetadata } from "../../lib/docs/metadata";
import { meSamples } from "../../lib/docs/examples";
import { API_BASE_URL } from "../../lib/docs/nav";

const HREF = "/docs";
export const metadata = docsMetadata(HREF);

export default function DocsHome() {
  return (
    <DocsPage
      href={HREF}
      lead="The Pathment API brings people into an intake from your own systems, shows where each of them has got to, and lets you read how your mentees are doing."
    >
      <H2 id="what-you-can-do">What you can do today</H2>
      <p>
        Most programmes already keep a list of people somewhere, such as a CRM, a sign-up form, a
        spreadsheet or a student system. The API connects that list to Pathment and lets you read back what
        happens there.
      </p>
      <p>To get people in, you can:</p>
      <ul>
        <li>
          Push applicants into an intake, up to 1,000 per request. Pathment creates new applicants and
          updates the ones it already has, without making duplicates. See{" "}
          <Link href="/docs/guides/syncing-users">Syncing users</Link>.
        </li>
        <li>
          Send records with your own field names and let a{" "}
          <Link href="/docs/guides/field-mapping">connection</Link>{" "}map them to ours.
        </li>
        <li>
          Let Pathment fetch them on a schedule from a JSON or CSV URL, or a published Google Sheet. See{" "}
          <Link href="/docs/guides/pulling">Pulling from a URL</Link>.
        </li>
        <li>Have new applicants emailed the assessment for their level when the sync finishes.</li>
      </ul>
      <p>To get information out, you can:</p>
      <ul>
        <li>
          List applicants with their stage (added, assessment sent, submitted, accepted and so on), or only
          the ones that changed since you last checked.
        </li>
        <li>
          Read programmes, clans and mentees, including your own IDs on people who came in through a sync.
        </li>
        <li>
          Read each mentee&apos;s progress in a programme: completed work, overdue tasks, roadmap steps,
          attendance and certificates. See <Link href="/docs/guides/reading-progress">Reading progress</Link>.
        </li>
        <li>
          Receive a webhook when an applicant is accepted, a mentee joins a clan, a certificate is issued or
          a sync finishes. See <Link href="/docs/guides/webhooks">Webhooks</Link>.
        </li>
      </ul>

      <H2 id="base-url">Base URL</H2>
      <p>Every endpoint lives under one address. Requests and responses are JSON.</p>
      <CodeBlock code={API_BASE_URL} language="text" title="Base URL" />
      <p>
        You authenticate with an API key in the <code>Authorization</code>{" "}header. Here is the smallest
        useful request: it tells you which workspace your key belongs to.
      </p>
      <CodeBlock samples={meSamples} title="GET /me" />

      <H2 id="three-steps">Your first sync in three steps</H2>
      <Steps>
        <Step title="Create an API key">
          <p>
            A workspace admin creates one in Pathment under{" "}
            <strong>Settings → Integrations → API keys</strong>. You see the full key once, so copy it
            somewhere safe. <Link href="/docs/authentication">More on keys</Link>.
          </p>
        </Step>
        <Step title="Push your applicants">
          <p>
            Send a batch of records to <code>POST /intakes/&#123;intakeId&#125;/applicants</code>. You get
            back a job straight away, while Pathment does the work in the background.
          </p>
        </Step>
        <Step title="Check the job">
          <p>
            Poll <code>GET /jobs/&#123;jobId&#125;</code>{" "}until it finishes. It tells you how many people
            were created, updated or skipped, and exactly which records had a problem.
          </p>
        </Step>
      </Steps>

      <H2 id="start-here">Start here</H2>
      <CardGrid>
        <Card href="/docs/quickstart" title="Quickstart" icon={Rocket}>
          Push your first two applicants and watch the job finish. About ten minutes.
        </Card>
        <Card href="/docs/guides/syncing-users" title="Syncing users" icon={Shuffle}>
          Batching, retries, and keeping people up to date over time.
        </Card>
        <Card href="/docs/guides/reading-progress" title="Reading progress" icon={BarChart3}>
          Copy mentee progress into your own system every night.
        </Card>
        <Card href="/docs/api" title="API reference" icon={Braces}>
          Every endpoint, parameter and object, with examples in three languages.
        </Card>
      </CardGrid>
      <Callout type="tip" title="New to APIs?">
        <p>
          The <Link href="/docs/quickstart">Quickstart</Link>{" "}works by copy and paste, and every example
          comes in cURL, Node.js and Python. Pick a language once and every page remembers it.
        </p>
      </Callout>

      <p>
        See the <Link href="/docs/changelog">changelog</Link>{" "}for what has shipped and when.
      </p>
    </DocsPage>
  );
}
