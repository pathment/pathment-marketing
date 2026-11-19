import Link from "next/link";
import { DocsPage } from "../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../components/docs/CodeBlock";
import { Callout } from "../../../components/docs/Callout";
import { H2, Step, Steps, Table } from "../../../components/docs/Prose";
import { docsMetadata } from "../../../lib/docs/metadata";
import { errorBody, meSamples } from "../../../lib/docs/examples";

const HREF = "/docs/authentication";
export const metadata = docsMetadata(HREF);

export default function AuthenticationPage() {
  return (
    <DocsPage href={HREF}>
      <H2 id="api-keys">API keys</H2>
      <p>
        Every request to the Pathment API carries an API key. The key says which workspace you&apos;re
        acting for and what you&apos;re allowed to do there.
      </p>
      <p>A key looks like this:</p>
      <CodeBlock code="pk_live_9fK2mQ7xR4tL8wN1cV6bH3jD5sA0pZyE" language="text" title="Example key (not a real one)" />
      <p>
        It&apos;s always <code>pk_live_</code>{" "}followed by 32 random characters. After you create it,
        Pathment only ever shows its <strong>prefix</strong>: the first 12 characters, such as{" "}
        <code>pk_live_9fK2</code>. That&apos;s enough to tell your keys apart, and useless to anyone who
        sees it over your shoulder.
      </p>

      <H2 id="creating-a-key">Creating a key</H2>
      <p>Only workspace admins can create keys.</p>
      <Steps>
        <Step title="Open the API keys page">
          <p>
            In Pathment, go to <strong>Settings → Integrations → API keys</strong>.
          </p>
        </Step>
        <Step title="Name it and pick scopes">
          <p>
            Name the key after what will use it, such as &ldquo;HubSpot sync&rdquo; or &ldquo;Nightly
            student import&rdquo;. Choose only the <a href="#scopes">scopes</a>{" "}it needs. You can also set
            an expiry date.
          </p>
        </Step>
        <Step title="Copy it once">
          <p>
            The full key appears once. Copy it straight into your secret store or environment. If you lose
            it, you can&apos;t get it back: create a new one and revoke the old.
          </p>
        </Step>
      </Steps>

      <H2 id="sending-the-key">Sending the key</H2>
      <p>
        Put the key in the <code>Authorization</code>{" "}header as a bearer token, on every request:
      </p>
      <CodeBlock code="Authorization: Bearer pk_live_••••••••••••••••••••••••••••••••" language="http" title="Header" />
      <p>
        In our examples the key comes from an environment variable called <code>PATHMENT_API_KEY</code>.
        Do the same in your code, so the key never sits in a file you might commit.
      </p>
      <CodeBlock samples={meSamples} title="GET /me" />
      <p>
        Requests must use HTTPS. <code>GET /me</code>{" "}works with any valid key, which makes it a handy
        health check for an integration.
      </p>

      <H2 id="scopes">Scopes</H2>
      <p>
        A scope is a permission. A key can only do what its scopes allow, so a key that only reads
        can&apos;t be used to change anything, even if it leaks.
      </p>
      <Table
        head={["Scope", "Lets the key"]}
        rows={[
          [
            <code key="s">intakes:read</code>,
            "List and retrieve intakes, list applicants, and read jobs.",
          ],
          [
            <code key="s">applicants:write</code>,
            "Push applicants into an intake, and read the jobs that creates.",
          ],
        ]}
      />
      <p>
        Calling an endpoint without the right scope returns <code>403</code>{" "}with the code{" "}
        <code>insufficient_scope</code>. The message names the scope you&apos;re missing.
      </p>
      <ResponseBlock
        status={403}
        title="Missing scope"
        body={errorBody(
          "permission_error",
          "insufficient_scope",
          "This key needs the intakes:read scope to list applicants.",
        )}
      />

      <H2 id="workspaces">One key, one workspace</H2>
      <p>
        A key belongs to the workspace it was created in, and only ever sees that workspace&apos;s data.
        There is no way to point a key at another workspace. If you run several workspaces, create a key
        in each.
      </p>

      <H2 id="expiry-and-revoking">Expiry and revoking</H2>
      <p>
        You can give a key an <strong>expiry date</strong>{" "}when you create it. After that date, requests
        with it fail with <code>expired_api_key</code>. Keys without an expiry last until revoked.
      </p>
      <p>
        You can <strong>revoke</strong>{" "}a key at any time from the same settings page. It stops working
        immediately, on the very next request, with <code>revoked_api_key</code>. Revoke a key the moment
        you think it might have leaked.
      </p>

      <H2 id="rotating">Rotating a key</H2>
      <p>
        Rotating means swapping a key for a fresh one. Done in this order, nothing breaks in between:
      </p>
      <Steps>
        <Step title="Create the new key">
          <p>Same name with a date on the end works well, with the same scopes as the old key.</p>
        </Step>
        <Step title="Deploy it">
          <p>
            Update the secret wherever your integration runs and deploy. Check it with{" "}
            <code>GET /me</code>.
          </p>
        </Step>
        <Step title="Revoke the old key">
          <p>Once nothing uses the old key any more, revoke it.</p>
        </Step>
      </Steps>

      <H2 id="good-habits">Good habits</H2>
      <ul>
        <li>
          <strong>One key per integration.</strong>{" "}If your CRM sync and your student import share a key,
          you can&apos;t revoke one without breaking the other.
        </li>
        <li>
          <strong>Server-side only.</strong>{" "}Never put a key in front-end JavaScript, a mobile app or
          anywhere a user could read it.
        </li>
        <li>
          <strong>Smallest scopes that work.</strong>{" "}A reporting script only needs{" "}
          <code>intakes:read</code>.
        </li>
        <li>
          <strong>Rotate on a schedule</strong>, and straight away when someone with access leaves.
        </li>
      </ul>
      <Callout type="note">
        <p>
          Spotted a key somewhere it shouldn&apos;t be, like a public repository? Revoke it in Pathment
          first, then tidy up. Revoking takes effect at once.
        </p>
      </Callout>

      <H2 id="auth-errors">Authentication errors</H2>
      <p>
        All of these return <code>401</code>{" "}with the type <code>authentication_error</code>. The{" "}
        <code>code</code>{" "}tells you what to fix.
      </p>
      <Table
        head={["Code", "What it means"]}
        rows={[
          [<code key="c">missing_api_key</code>, "No Authorization header, or it isn't in the Bearer form."],
          [<code key="c">invalid_api_key</code>, "The key doesn't exist. Check for a typo or a missing character."],
          [<code key="c">revoked_api_key</code>, "Someone revoked this key. Create a new one."],
          [<code key="c">expired_api_key</code>, "The key passed its expiry date. Create a new one."],
        ]}
      />
      <p>
        See <Link href="/docs/errors">Errors</Link>{" "}for every other error the API can return.
      </p>
    </DocsPage>
  );
}
