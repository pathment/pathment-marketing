import Link from "next/link";
import { BarChart3, BookOpenText, Braces, Rocket, Shuffle } from "lucide-react";
import { DocsPage } from "../../components/docs/DocsPage";
import { CodeBlock } from "../../components/docs/CodeBlock";
import { Callout } from "../../components/docs/Callout";
import { Card, CardGrid, H2, Step, Steps } from "../../components/docs/Prose";
import { docsMetadata } from "../../lib/docs/metadata";
import { meSamples } from "../../lib/docs/examples";
import { API_BASE_URL } from "../../lib/docs/nav";

const HREF = "/docs";
export const metadata = docsMetadata(HREF);

const coming = [
  {
    title: "Webhooks",
    body: "We tell you when something changes, like an applicant submitting their assessment, instead of you polling.",
  },
  {
    title: "Pull connectors",
    body: "Point Pathment at a source you already use and it fetches new people on a schedule. No code on your side.",
  },
];

export default function DocsHome() {
  return (
    <DocsPage
      href={HREF}
      lead="The Pathment API lets you bring people into an intake straight from your own systems, see where each of them has got to, and read how your mentees are doing. These docs show you how, one plain step at a time."
    >
      <H2 id="what-you-can-do">What you can do today</H2>
      <p>
        Most programmes already keep a list of people somewhere: a CRM, a sign-up form, a spreadsheet, a
        student system. The API connects that list to Pathment, and brings what happens in Pathment back
        out.
      </p>
      <ul>
        <li>
          <strong>Push applicants into an intake.</strong>{" "}Send up to 1,000 people per request. Pathment
          creates new applicants, updates the ones it has seen before and never makes duplicates.
        </li>
        <li>
          <strong>Send records in your own shape.</strong>{" "}A{" "}
          <Link href="/docs/guides/field-mapping">connection</Link>{" "}maps your field names to ours, so you
          don&apos;t have to reshape your data first.
        </li>
        <li>
          <strong>Send the assessment automatically.</strong>{" "}New applicants can get the assessment for
          their level by email as soon as the sync finishes.
        </li>
        <li>
          <strong>Track where everyone is.</strong>{" "}List applicants with their stage (added, assessment
          sent, submitted, accepted and so on) and ask for only what changed since your last check.
        </li>
        <li>
          <strong>Read programmes, clans and mentees.</strong>{" "}See how your workspace is organised and who
          is placed where, with your own IDs on people who came in through a sync.
        </li>
        <li>
          <strong>Read progress.</strong>{" "}For every mentee in a programme: how much of their work is done,
          overdue tasks, roadmap steps, attendance and certificates. Ideal for your own dashboards.{" "}
          <Link href="/docs/guides/reading-progress">Reading progress</Link>
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

      <H2 id="three-steps">The path in three steps</H2>
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
          The full picture: batching, retries, keeping people in step over time.
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
          That&apos;s fine. The <Link href="/docs/quickstart">Quickstart</Link>{" "}works by copying and pasting,
          and every example comes in cURL, Node.js and Python. Pick your language once and every page
          remembers it.
        </p>
      </Callout>

      <H2 id="whats-coming">What&apos;s coming</H2>
      <p>
        Next we&apos;re working on telling you when things change, and on doing more of the work for
        you.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {coming.map((item) => (
          <div key={item.title} className="rounded-xl border border-dashed border-line bg-surface/60 p-5">
            <p className="flex items-center gap-2 font-semibold text-[var(--docs-heading)]">
              <BookOpenText className="h-4 w-4 text-accent" aria-hidden />
              {item.title}
            </p>
            <p className="mt-2 text-[0.9rem] leading-6 text-muted">{item.body}</p>
          </div>
        ))}
      </div>
      <p>
        See the <Link href="/docs/changelog">changelog</Link>{" "}for what has shipped and what&apos;s next.
      </p>
    </DocsPage>
  );
}
