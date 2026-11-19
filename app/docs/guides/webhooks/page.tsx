import Link from "next/link";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock } from "../../../../components/docs/CodeBlock";
import { Callout } from "../../../../components/docs/Callout";
import { H2, Step, Steps, Table } from "../../../../components/docs/Prose";
import { docsMetadata } from "../../../../lib/docs/metadata";
import {
  eventExamples,
  headersExample,
  receiverSamples,
  verifyOnlySamples,
} from "../../../../lib/docs/examples-webhooks";

const HREF = "/docs/guides/webhooks";
export const metadata = docsMetadata(HREF);

const c = (text: string) => <code key={text}>{text}</code>;

export default function WebhooksGuidePage() {
  return (
    <DocsPage href={HREF}>
      <p>
        Instead of asking Pathment over and over whether anything changed, let Pathment tell you. A webhook
        is a request Pathment sends to your server the moment something happens: an applicant is accepted,
        a mentee joins a clan, a certificate is issued, a sync finishes.
      </p>

      <H2 id="setting-up">Setting up an endpoint</H2>
      <p>
        An endpoint is a URL on your server that Pathment sends events to. Workspace admins add them in the
        app.
      </p>
      <Steps>
        <Step title="Open the Webhooks page">
          <p>
            Go to <strong>Settings → Integrations → Webhooks</strong>{" "}and add an endpoint.
          </p>
        </Step>
        <Step title="Enter the URL">
          <p>
            It must be <code>https</code>{" "}and reachable on the public internet. Internal and private
            addresses are refused. Add a description if it helps you remember what the endpoint is for.
          </p>
        </Step>
        <Step title="Choose events">
          <p>
            Pick the events this endpoint should get, or choose <strong>all events</strong>. Picking only
            what you use keeps your receiver simple. The full list is in the{" "}
            <Link href="/docs/api/webhook-events">event reference</Link>.
          </p>
        </Step>
        <Step title="Copy the signing secret">
          <p>
            Pathment shows the endpoint&apos;s signing secret, which starts with <code>whsec_</code>. Put it in
            your server&apos;s environment as <code>PATHMENT_WEBHOOK_SECRET</code>. You can reveal it again
            later, or rotate it.
          </p>
        </Step>
      </Steps>
      <Callout type="warning" title="Rotating takes effect at once">
        <p>
          When you rotate a secret, the old one stops being used straight away. Update your receiver as soon
          as you rotate, or its signature checks will fail and deliveries will be retried.
        </p>
      </Callout>

      <H2 id="the-request">The request</H2>
      <p>Every event arrives as a <code>POST</code>{" "}with a JSON body and these headers:</p>
      <CodeBlock code={headersExample} language="http" title="Headers" />
      <p>The body is always the same envelope, with the details in <code>data</code>:</p>
      <CodeBlock code={eventExamples["applicant.created"]} language="json" title="applicant.created" />
      <Table
        head={["Field", "Meaning"]}
        rows={[
          [c("id"), "The event's unique ID. Retries of the same event keep the same ID."],
          [c("type"), "What happened, such as applicant.accepted."],
          [c("apiVersion"), "The payload format. It only changes with a new API version."],
          [c("createdAt"), "When the event happened."],
          [c("data"), "The details. Each event type has its own shape."],
        ]}
      />
      <p>
        Events reflect changes made anywhere in Pathment: in the app, through the API or by an import. Every
        event and its <code>data</code>{" "}is in the <Link href="/docs/api/webhook-events">event reference</Link>.
      </p>

      <H2 id="verifying-signatures">Verifying signatures</H2>
      <p>
        Anyone can send a request to a public URL. The <code>Pathment-Signature</code>{" "}header proves a
        request really came from Pathment and wasn&apos;t changed on the way. Always check it before you
        trust the body.
      </p>
      <p>The header has two parts:</p>
      <CodeBlock
        code="Pathment-Signature: t=1795169702,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd"
        language="http"
        title="Signature header"
      />
      <ul>
        <li>
          <code>t</code>{" "}is when Pathment signed the request, in Unix seconds.
        </li>
        <li>
          <code>v1</code>{" "}is the signature: HMAC-SHA256, hex encoded.
        </li>
      </ul>
      <p>To check it:</p>
      <ol>
        <li>
          Take <code>t</code>, a dot, and the <strong>raw request body</strong>: <code>{"{t}.{raw body}"}</code>.
        </li>
        <li>Compute HMAC-SHA256 of that with your endpoint&apos;s secret, as hex.</li>
        <li>
          Compare it with <code>v1</code>{" "}using a constant-time comparison.
        </li>
        <li>
          Reject the request if <code>t</code>{" "}is more than 5 minutes from now. That stops someone replaying
          a request they captured.
        </li>
      </ol>
      <CodeBlock samples={verifyOnlySamples} title="Verify a signature" />
      <Callout type="warning" title="Use the raw body">
        <p>
          Sign-check the body exactly as it arrived, byte for byte. If your framework parses the JSON first
          and you turn it back into a string, spacing and key order can change and the signature won&apos;t
          match. In Express, use <code>express.raw()</code>{" "}on the webhook route; in Flask, use{" "}
          <code>request.get_data()</code>.
        </p>
      </Callout>

      <H2 id="a-complete-receiver">A complete receiver</H2>
      <p>
        Here&apos;s a whole receiver: it verifies the signature, answers straight away, skips duplicates and
        handles the event afterwards.
      </p>
      <CodeBlock samples={receiverSamples} title="Webhook receiver" />

      <H2 id="responding-and-retries">Responding and retries</H2>
      <p>
        Answer with any <code>2xx</code>{" "}status within <strong>10 seconds</strong>. That tells Pathment you
        have the event. Do any slow work, like calling other systems, <em>after</em>{" "}you&apos;ve answered:
        put the event on a queue and return.
      </p>
      <p>
        Anything else counts as a failure: a non-2xx status, no answer within 10 seconds, or a connection
        error. Pathment then tries again:
      </p>
      <Table
        head={["Attempt", "Sent"]}
        rows={[
          ["1", "Straight away"],
          ["2", "1 minute later"],
          ["3", "5 minutes after that"],
          ["4", "30 minutes after that"],
          ["5", "2 hours after that"],
          ["6", "6 hours after that"],
          ["7", "12 hours after that"],
          ["8", "24 hours after that"],
        ]}
      />
      <p>
        That&apos;s 8 attempts over just under two days. If the last one fails too, the delivery is marked
        failed. You can still send it again with <strong>Redeliver</strong>{" "}in the delivery log. The{" "}
        <code>Pathment-Delivery-Attempt</code>{" "}header tells you which attempt you&apos;re looking at.
      </p>

      <H2 id="duplicates-and-order">Duplicates and order</H2>
      <p>Two things to build for from the start:</p>
      <ul>
        <li>
          <strong>You may get an event more than once.</strong>{" "}Delivery is at least once: if your answer
          gets lost, Pathment sends the event again. Store each event&apos;s <code>id</code>{" "}and ignore ones
          you&apos;ve already handled.
        </li>
        <li>
          <strong>Events can arrive out of order.</strong>{" "}A retry can land after a newer event. Use the
          event&apos;s <code>createdAt</code>, or the object&apos;s own <code>updatedAt</code>, to decide which
          is newest, and don&apos;t let an older event overwrite newer data.
        </li>
      </ul>

      <H2 id="testing">Testing with Send test and the delivery log</H2>
      <p>
        Each endpoint has a <strong>Send test</strong>{" "}button. It sends a <code>ping</code>{" "}event
        immediately and shows you the response, so you can check your URL and signature code without waiting
        for something real to happen.
      </p>
      <CodeBlock code={eventExamples.ping} language="json" title="ping" />
      <p>
        Every endpoint also has a <strong>delivery log</strong>. For each delivery it shows the event, its
        status, how many attempts it took, the response code, the start of the response body and how long
        your server took. When something goes wrong, start there: the response body usually says why.
      </p>
      <Callout type="tip" title="Testing on your own machine">
        <p>
          Your laptop isn&apos;t on the public internet, so Pathment can&apos;t reach <code>localhost</code>. Use
          a tunnelling tool to give your local server a temporary public <code>https</code>{" "}URL, add that as
          an endpoint, and press Send test.
        </p>
      </Callout>

      <H2 id="turning-off">Turning endpoints off</H2>
      <p>
        You can turn an endpoint off and on at any time, for example during maintenance on your side. While
        it&apos;s off, nothing is sent to it.
      </p>
      <p>
        Pathment also turns an endpoint off by itself if <strong>50 attempts in a row</strong>{" "}fail. The
        reason is shown on the endpoint in the app. Fix the problem, then turn it back on.
      </p>

      <H2 id="security-checklist">Security checklist</H2>
      <ul>
        <li>Verify the signature on every request, before you read the body.</li>
        <li>
          Use the raw body, and compare signatures in constant time (<code>timingSafeEqual</code>,{" "}
          <code>hmac.compare_digest</code>).
        </li>
        <li>Reject timestamps more than 5 minutes away from now.</li>
        <li>Keep the secret in your environment or secret store, never in code.</li>
        <li>Rotate the secret if it may have leaked, and update your receiver straight away.</li>
        <li>Ignore duplicate event IDs, and never let an older event overwrite newer data.</li>
        <li>
          <strong>Mind personal data.</strong>{" "}<code>applicant.*</code>{" "}events and{" "}
          <code>mentee.joined</code>{" "}carry names and email addresses. Only point them at systems that are
          allowed to hold that information.
        </li>
      </ul>
    </DocsPage>
  );
}
