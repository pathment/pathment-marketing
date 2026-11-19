import { DocsPage } from "../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../components/docs/CodeBlock";
import { Callout } from "../../../components/docs/Callout";
import { H2, Table } from "../../../components/docs/Prose";
import { docsMetadata } from "../../../lib/docs/metadata";
import { errorBody, pushSamples } from "../../../lib/docs/examples";

const HREF = "/docs/idempotency";
export const metadata = docsMetadata(HREF);

export default function IdempotencyPage() {
  return (
    <DocsPage href={HREF}>
      <H2 id="why">Why it matters</H2>
      <p>
        Networks fail at awkward moments. Say you send a batch of 800 applicants and the connection drops
        before the response arrives. Did Pathment get it? You can&apos;t tell, so you send it again.
      </p>
      <p>
        Pathment never creates duplicate applicants, so a resend is never a disaster. But without
        idempotency you&apos;d get two jobs for one batch, two entries in your sync history, and two rounds
        of work. With an <code>Idempotency-Key</code>, the second request simply hands you back the first
        job.
      </p>

      <H2 id="how-it-works">How it works</H2>
      <p>
        Add an <code>Idempotency-Key</code> header to <code>POST /intakes/&#123;intakeId&#125;/applicants</code>.
        It can be any string you like, up to 255 characters.
      </p>
      <CodeBlock language="http" title="Header" code="Idempotency-Key: 6f1c2a9e-4b7d-4c1e-9a53-2f8d0b7e1c44" />
      <p>Pathment remembers each key for 24 hours. Within that time:</p>
      <Table
        head={["You send", "You get"]}
        rows={[
          ["A key it hasn't seen", <>A new job, with <code>202 Accepted</code>.</>],
          ["The same key and the same body", <>The original job, with <code>200 OK</code>. Nothing new is created.</>],
          ["The same key with a different body", <><code>409</code> with <code>idempotency_key_reused</code>.</>],
        ]}
      />
      <p>
        That <code>409</code> protects you from a real bug: reusing one key for two different batches,
        which would otherwise quietly drop the second batch.
      </p>
      <ResponseBlock
        status={409}
        title="Key reused with a different body"
        body={errorBody(
          "conflict",
          "idempotency_key_reused",
          "This Idempotency-Key was already used with a different request body.",
        )}
      />
      <p>After 24 hours a key is forgotten, and sending it again starts a fresh job.</p>

      <H2 id="choosing-a-key">Choosing a key</H2>
      <p>
        Generate a random UUID for each batch, just before you send it the first time. Store it with the
        batch, so a retry can find it again.
      </p>
      <CodeBlock samples={pushSamples} title="Push with an Idempotency-Key" />
      <Callout type="tip" title="Deterministic keys work too">
        <p>
          If your batches have a natural identity, like &ldquo;the 2 a.m. import on 19 November, page
          3&rdquo;, a key built from that (<code>nightly-2026-11-19-p3</code>) works well. The key just
          needs to be the same for retries of one batch and different for every other batch.
        </p>
      </Callout>

      <H2 id="retrying-safely">Retrying safely</H2>
      <ol>
        <li>Make the key once, before the first attempt.</li>
        <li>On a timeout, a dropped connection or a <code>5xx</code>, retry with the same key and the same body.</li>
        <li>
          On a <code>200</code> or <code>202</code>, carry on with the job you got back, whichever attempt
          it came from.
        </li>
        <li>Never change the records and reuse the key. A changed batch is a new batch and needs a new key.</li>
      </ol>
      <Callout type="note">
        <p>
          Idempotency keys are for the push endpoint. Every other endpoint only reads, so repeating those
          requests is always safe.
        </p>
      </Callout>
    </DocsPage>
  );
}
