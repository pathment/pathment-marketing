import Link from "next/link";
import { DocsPage } from "../../../components/docs/DocsPage";
import { Callout } from "../../../components/docs/Callout";
import { H2 } from "../../../components/docs/Prose";
import { docsMetadata } from "../../../lib/docs/metadata";

const HREF = "/docs/changelog";
export const metadata = docsMetadata(HREF);

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 font-mono text-[11px] font-medium text-brand-700 dark:bg-brand-400/10 dark:text-brand-300">
      {children}
    </span>
  );
}

export default function ChangelogPage() {
  return (
    <DocsPage href={HREF}>
      <p>
        Every change to the API, newest first. Additive changes land in <code>v1</code>{" "}without notice, as
        described in <Link href="/docs/versioning">Versioning</Link>. Breaking changes will always be
        announced here first.
      </p>

      <H2 id="webhooks">20 November 2026: Webhooks</H2>
      <p className="flex flex-wrap gap-2">
        <Tag>New</Tag>
        <Tag>Additive</Tag>
      </p>
      <p>
        <strong>Webhooks.</strong>{" "}Pathment now tells your server when things happen, so you don&apos;t have
        to poll.
      </p>
      <ul>
        <li>
          <strong>Endpoints in the app.</strong>{" "}Admins add them under Settings → Integrations → Webhooks,
          pick events, and get a signing secret they can reveal or rotate. Each endpoint has Send test, a
          delivery log and Redeliver.
        </li>
        <li>
          <strong>Signed requests.</strong>{" "}Every event carries a <code>Pathment-Signature</code>{" "}header:
          HMAC-SHA256 over the timestamp and raw body.
        </li>
        <li>
          <strong>Retries.</strong>{" "}Failed deliveries are retried 7 times over just under two days.
        </li>
        <li>
          <strong>Events:</strong>{" "}<code>applicant.created</code>, <code>applicant.assessment_sent</code>,{" "}
          <code>applicant.assessment_submitted</code>, <code>applicant.accepted</code>,{" "}
          <code>applicant.rejected</code>, <code>mentee.joined</code>, <code>task.approved</code>,{" "}
          <code>roadmap.completed</code>, <code>certificate.issued</code>, <code>sync.job.completed</code>{" "}
          and <code>ping</code>.
        </li>
        <li>
          <Link href="/docs/guides/webhooks">Webhooks guide</Link>{" "}and{" "}
          <Link href="/docs/api/webhook-events">event reference</Link>.
        </li>
      </ul>

      <H2 id="read-api">20 November 2026: Read API</H2>
      <p className="flex flex-wrap gap-2">
        <Tag>New</Tag>
        <Tag>Additive</Tag>
      </p>
      <p>
        <strong>Read API: programmes, clans, mentees and progress.</strong>{" "}You can now read what happens in
        Pathment, not just push people in. Nothing existing changed.
      </p>
      <ul>
        <li>
          <strong>Programmes and clans.</strong>{" "}<code>GET /programmes</code>,{" "}
          <code>GET /programmes/&#123;programmeId&#125;</code>,{" "}<code>GET /clans</code>{" "}and{" "}
          <code>GET /clans/&#123;clanId&#125;</code>, with the new <code>programmes:read</code>{" "}scope.{" "}
          <Link href="/docs/api/programmes">Programmes</Link>,{" "}<Link href="/docs/api/clans">Clans</Link>
        </li>
        <li>
          <strong>Mentees.</strong>{" "}<code>GET /mentees</code>{" "}and{" "}
          <code>GET /mentees/&#123;menteeId&#125;</code>, with their clans, enrollments and your{" "}
          <code>externalId</code>. Filter by programme, clan, email, external ID or{" "}
          <code>updatedSince</code>. New <code>mentees:read</code>{" "}scope.{" "}
          <Link href="/docs/api/mentees">Mentees</Link>
        </li>
        <li>
          <strong>Progress.</strong>{" "}<code>GET /mentees/&#123;menteeId&#125;/progress</code>{" "}and{" "}
          <code>GET /programmes/&#123;programmeId&#125;/progress</code>: completion, tasks, roadmap steps,
          attendance and certificates. New <code>progress:read</code>{" "}scope.{" "}
          <Link href="/docs/api/progress">Progress</Link>
        </li>
        <li>
          <strong>New guide:</strong>{" "}
          <Link href="/docs/guides/reading-progress">Show Pathment progress in your own system</Link>.
        </li>
      </ul>

      <H2 id="v1-launch">19 November 2026: v1</H2>
      <p className="flex flex-wrap gap-2">
        <Tag>New</Tag>
        <Tag>v1</Tag>
      </p>
      <p>The first public version of the Pathment API. It&apos;s about one job: getting people into intakes.</p>
      <ul>
        <li>
          <strong>API keys.</strong>{" "}Workspace admins create keys under Settings → Integrations → API keys,
          with <code>intakes:read</code>{" "}and <code>applicants:write</code>{" "}scopes, optional expiry and instant
          revoking. <Link href="/docs/authentication">Authentication</Link>
        </li>
        <li>
          <strong>Read intakes.</strong> <code>GET /intakes</code>{" "}and{" "}
          <code>GET /intakes/&#123;intakeId&#125;</code>, plus <code>GET /me</code>{" "}to check a key.{" "}
          <Link href="/docs/api/intakes">Intakes</Link>
        </li>
        <li>
          <strong>Push applicants.</strong> <code>POST /intakes/&#123;intakeId&#125;/applicants</code>{" "}takes up
          to 1,000 records, with matching that never creates duplicates, idempotency keys, dry runs and an
          optional assessment email for new applicants.{" "}
          <Link href="/docs/api/applicants">Applicants</Link>
        </li>
        <li>
          <strong>Connections and field mapping.</strong>{" "}Send records in your own shape and map them in the
          app, with transforms and value maps. <Link href="/docs/guides/field-mapping">Field mapping</Link>
        </li>
        <li>
          <strong>Jobs.</strong> <code>GET /jobs/&#123;jobId&#125;</code>{" "}reports counts, per-record errors and
          assessments sent. Every job also appears in Sync history in the app.{" "}
          <Link href="/docs/api/jobs">Jobs</Link>
        </li>
        <li>
          <strong>List applicants</strong>{" "}with their stage and status, filtered by stage, email, external ID
          or <code>updatedSince</code>.
        </li>
      </ul>

      <H2 id="roadmap">On the roadmap</H2>
      <p>
        These are what we&apos;re working on next. They aren&apos;t available yet, and details may change
        before they ship.
      </p>
      <ul>
        <li>
          <strong>Pull connectors.</strong>{" "}Connect a source you already use and Pathment fetches new people
          on a schedule, using the same connections and field mapping.
        </li>
      </ul>
      <Callout type="tip" title="Tell us what you need">
        <p>
          Building something the API can&apos;t do yet? <Link href="/contact">Get in touch</Link>. Real use
          cases decide what we build first.
        </p>
      </Callout>
    </DocsPage>
  );
}
