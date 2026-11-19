import Link from "next/link";
import type { ReactNode } from "react";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock } from "../../../../components/docs/CodeBlock";
import { Callout } from "../../../../components/docs/Callout";
import { ParamTable, type Param } from "../../../../components/docs/ParamTable";
import { H2, RefSplit, Table } from "../../../../components/docs/Prose";
import { docsMetadata } from "../../../../lib/docs/metadata";
import { envelopeExample, eventExamples, headersExample } from "../../../../lib/docs/examples-webhooks";

const HREF = "/docs/api/webhook-events";
export const metadata = docsMetadata(HREF);

const applicantParam: Param = {
  name: "applicant",
  type: "Applicant",
  description: (
    <p>
      The applicant as it is now: the same{" "}
      <Link href="/docs/api/applicants#the-applicant-object">Applicant object</Link>{" "}the API returns.
    </p>
  ),
};

const assessmentParam = (when: ReactNode): Param => ({
  name: "assessment",
  type: "object",
  description: (
    <p>
      {when}{" "}It has <code>submittedAt</code>, <code>score</code>{" "}and <code>maxScore</code>. The score
      fields are <code>null</code>{" "}until the assessment is graded.
    </p>
  ),
});

interface EventDoc {
  type: string;
  id: string;
  summary: ReactNode;
  params: Param[];
  personal?: boolean;
}

const events: EventDoc[] = [
  {
    type: "applicant.created",
    id: "applicant-created",
    summary: "Someone was added to an intake: by applying, by an import in the app, or by a sync.",
    params: [applicantParam],
    personal: true,
  },
  {
    type: "applicant.assessment_sent",
    id: "applicant-assessment-sent",
    summary: "An applicant was sent their assessment.",
    params: [applicantParam],
    personal: true,
  },
  {
    type: "applicant.assessment_submitted",
    id: "applicant-assessment-submitted",
    summary: "An applicant handed in their assessment.",
    params: [applicantParam, assessmentParam("Their assessment.")],
    personal: true,
  },
  {
    type: "applicant.accepted",
    id: "applicant-accepted",
    summary: "An applicant was accepted.",
    params: [applicantParam, assessmentParam("Included when they submitted an assessment, left out otherwise.")],
    personal: true,
  },
  {
    type: "applicant.rejected",
    id: "applicant-rejected",
    summary: "An applicant was rejected.",
    params: [applicantParam, assessmentParam("Included when they submitted an assessment, left out otherwise.")],
    personal: true,
  },
  {
    type: "mentee.joined",
    id: "mentee-joined",
    summary: "A mentee was placed in a clan.",
    params: [
      {
        name: "mentee",
        type: "Mentee",
        description: (
          <p>
            The mentee: the same <Link href="/docs/api/mentees#the-mentee-object">Mentee object</Link>{" "}the
            API returns.
          </p>
        ),
      },
      {
        name: "clan",
        type: "object",
        description: (
          <p>
            The clan they joined: <code>id</code>, <code>name</code>{" "}and <code>programmeId</code>.
          </p>
        ),
      },
    ],
    personal: true,
  },
  {
    type: "task.approved",
    id: "task-approved",
    summary: "A mentor approved a mentee's task.",
    params: [
      { name: "menteeId", type: "string", description: "The mentee whose task it is." },
      {
        name: "task",
        type: "object",
        description: (
          <p>
            The task: <code>id</code>, <code>title</code>, <code>type</code>, <code>roadmapId</code>,{" "}
            <code>programmeId</code>{" "}and <code>clanId</code>{" "}(each <code>null</code>{" "}when the task
            isn&apos;t tied to one), and <code>approvedAt</code>.
          </p>
        ),
      },
    ],
  },
  {
    type: "roadmap.completed",
    id: "roadmap-completed",
    summary: "A mentee finished every step of a roadmap.",
    params: [
      { name: "menteeId", type: "string", description: "The mentee who finished it." },
      {
        name: "roadmap",
        type: "object",
        description: (
          <p>
            The roadmap&apos;s <code>id</code>{" "}and <code>name</code>.
          </p>
        ),
      },
      { name: "programmeId", type: "string", description: "The programme the roadmap belongs to." },
      { name: "clanId", type: "string", description: "The clan the mentee did it in." },
      { name: "completedAt", type: "string", description: "When they finished (ISO 8601)." },
    ],
  },
  {
    type: "certificate.issued",
    id: "certificate-issued",
    summary: "A mentee was issued a certificate.",
    params: [
      { name: "menteeId", type: "string", description: "Who received it." },
      { name: "programmeId", type: "string", description: "The programme it's for." },
      {
        name: "certificate",
        type: "object",
        description: (
          <p>
            Its <code>number</code>, <code>tier</code>, <code>issuedAt</code>{" "}and a public{" "}
            <code>verifyUrl</code>{" "}anyone can open to check it&apos;s genuine.
          </p>
        ),
      },
    ],
  },
  {
    type: "sync.job.completed",
    id: "sync-job-completed",
    summary: (
      <>
        A sync job finished, whatever its status, including <code>failed</code>. Use it instead of polling{" "}
        <Link href="/docs/api/jobs#retrieve-a-job">GET /jobs/&#123;jobId&#125;</Link>.
      </>
    ),
    params: [
      {
        name: "job",
        type: "Job",
        description: (
          <p>
            The finished job: the same <Link href="/docs/api/jobs#the-job-object">Job object</Link>{" "}the API
            returns, with its counts and errors.
          </p>
        ),
      },
    ],
  },
  {
    type: "ping",
    id: "ping",
    summary: (
      <>
        Only sent by the <strong>Send test</strong>{" "}button on an endpoint, to check your receiver works.
      </>
    ),
    params: [{ name: "message", type: "string", description: "A short greeting. Nothing to act on." }],
  },
];

export default function WebhookEventsPage() {
  return (
    <DocsPage href={HREF} layout="reference">
      <RefSplit
        aside={
          <>
            <CodeBlock code={envelopeExample} language="json" title="Envelope" />
            <CodeBlock code={headersExample} language="http" title="Headers" />
          </>
        }
      >
        <H2 id="the-event-envelope">The event envelope</H2>
        <p>
          Every webhook is a <code>POST</code>{" "}with a JSON body in this shape. Only <code>data</code>{" "}
          changes from one event type to the next. Setting up endpoints, verifying signatures and retries are
          covered in the <Link href="/docs/guides/webhooks">webhooks guide</Link>.
        </p>
        <ParamTable
          title="Attributes"
          kind="attributes"
          params={[
            {
              name: "id",
              type: "string",
              description: (
                <p>
                  The event&apos;s unique ID, starting <code>evt_</code>. Use it to ignore duplicates.
                </p>
              ),
            },
            { name: "type", type: "string", description: "The event type, from the list below." },
            {
              name: "apiVersion",
              type: "string",
              description: (
                <p>
                  The payload format, currently <code>2026-11-20</code>. It changes only with a new API
                  version.
                </p>
              ),
            },
            { name: "createdAt", type: "string", description: "When the event happened (ISO 8601, with milliseconds)." },
            { name: "data", type: "object", description: "The event's details. See each event below." },
          ]}
        />
        <ParamTable
          title="Headers"
          kind="attributes"
          params={[
            { name: "Content-Type", type: "string", description: "Always application/json." },
            { name: "User-Agent", type: "string", description: "Pathment-Webhooks/1.0 with a link to these docs." },
            { name: "Pathment-Event-Id", type: "string", description: "The same as the body's id." },
            { name: "Pathment-Event-Type", type: "string", description: "The same as the body's type." },
            {
              name: "Pathment-Delivery-Attempt",
              type: "integer",
              description: "1 for the first try, up to 8 for the last retry.",
            },
            {
              name: "Pathment-Signature",
              type: "string",
              description: (
                <p>
                  <code>t=&lt;unix seconds&gt;,v1=&lt;hex HMAC-SHA256&gt;</code>. See{" "}
                  <Link href="/docs/guides/webhooks#verifying-signatures">verifying signatures</Link>.
                </p>
              ),
            },
          ]}
        />
      </RefSplit>

      <div className="docs-prose max-w-[46rem]">
        <H2 id="event-types">Event types</H2>
        <Table
          head={["Event", "Sent when"]}
          rows={events.map((event) => [
            <a key="a" href={`#${event.id}`}>
              <code>{event.type}</code>
            </a>,
            <span key="s">{event.summary}</span>,
          ])}
        />
        <p>
          New event types may be added. Ignore types you don&apos;t recognise rather than failing.
        </p>
        <Callout type="warning" title="Personal data">
          <p>
            <code>applicant.*</code>{" "}events and <code>mentee.joined</code>{" "}contain names and email
            addresses. Only send them to systems that are allowed to hold that information.
          </p>
        </Callout>
      </div>

      {events.map((event) => (
        <RefSplit
          key={event.type}
          aside={<CodeBlock code={eventExamples[event.type]} language="json" title={event.type} />}
        >
          <H2 id={event.id}>
            <code>{event.type}</code>
          </H2>
          <p>{event.summary}</p>
          {event.personal ? (
            <p className="text-[0.9rem] text-muted">Contains personal data.</p>
          ) : null}
          <ParamTable title="data" kind="attributes" params={event.params} />
        </RefSplit>
      ))}
    </DocsPage>
  );
}
