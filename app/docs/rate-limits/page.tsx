import Link from "next/link";
import { DocsPage } from "../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../components/docs/CodeBlock";
import { Callout } from "../../../components/docs/Callout";
import { H2, Table } from "../../../components/docs/Prose";
import { docsMetadata } from "../../../lib/docs/metadata";
import { errorBody, retrySamples } from "../../../lib/docs/examples";

const HREF = "/docs/rate-limits";
export const metadata = docsMetadata(HREF);

export default function RateLimitsPage() {
  return (
    <DocsPage href={HREF}>
      <p>
        Limits keep the API fast for everyone. They&apos;re generous enough that a normal sync never gets
        close, and every response tells you where you stand.
      </p>

      <H2 id="limits">The limits</H2>
      <Table
        head={["Limit", "Value"]}
        rows={[
          ["Requests per API key", "120 per minute"],
          ["Records per push request", "1,000"],
        ]}
      />
      <p>
        The request limit is counted per key, so two integrations with their own keys don&apos;t eat into
        each other&apos;s allowance. That&apos;s one more reason to give each integration its own key.
      </p>
      <p>
        At 1,000 records a request, 120 requests a minute is room for a very large sync. Pushing 50,000
        people takes 50 requests.
      </p>

      <H2 id="headers">Rate limit headers</H2>
      <p>Every response includes three headers:</p>
      <Table
        head={["Header", "Meaning"]}
        rows={[
          [<code key="h">X-RateLimit-Limit</code>, "Requests allowed per minute for this key (120)."],
          [<code key="h">X-RateLimit-Remaining</code>, "Requests left in the current window."],
          [<code key="h">X-RateLimit-Reset</code>, "When the window resets, as a Unix timestamp in seconds."],
        ]}
      />
      <CodeBlock
        language="http"
        title="Response headers"
        code={`X-Request-Id: 2d7f4c1a-9b3e-4a68-8c52-e6a0b9d1f374
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 117
X-RateLimit-Reset: 1795082520`}
      />

      <H2 id="when-limited">When you hit the limit</H2>
      <p>
        Go over and you get <code>429</code>{" "}with a <code>Retry-After</code>{" "}header: the number of
        seconds to wait before trying again. Nothing about your request was processed, so it&apos;s safe to
        send again once the wait is over.
      </p>
      <ResponseBlock
        status={429}
        title="Rate limited"
        body={errorBody("rate_limited", "rate_limited", "Too many requests. Try again in 12 seconds.")}
      />
      <CodeBlock samples={retrySamples} title="Retry with backoff" />

      <H2 id="staying-under">Staying comfortably under</H2>
      <ul>
        <li>
          <strong>Send full batches.</strong>{" "}One request with 1,000 records beats 1,000 requests with one.
        </li>
        <li>
          <strong>Poll jobs gently.</strong>{" "}Every 2 seconds is plenty. Most jobs finish in seconds.
        </li>
        <li>
          <strong>Read only what changed.</strong>{" "}Use <code>updatedSince</code>{" "}on the applicants list
          instead of fetching everyone every time. See <Link href="/docs/pagination">Pagination</Link>.
        </li>
        <li>
          <strong>Watch <code>X-RateLimit-Remaining</code></strong>{" "}and slow down before it reaches zero.
        </li>
      </ul>
      <Callout type="tip">
        <p>
          Need more than this for a one-off migration? <Link href="/contact">Tell us</Link>{" "}what you&apos;re
          moving and we&apos;ll help.
        </p>
      </Callout>
    </DocsPage>
  );
}
