import Link from "next/link";
import { DocsPage } from "../../../components/docs/DocsPage";
import { CodeBlock } from "../../../components/docs/CodeBlock";
import { Callout } from "../../../components/docs/Callout";
import { H2 } from "../../../components/docs/Prose";
import { docsMetadata } from "../../../lib/docs/metadata";
import { API_BASE_URL } from "../../../lib/docs/nav";

const HREF = "/docs/versioning";
export const metadata = docsMetadata(HREF);

export default function VersioningPage() {
  return (
    <DocsPage href={HREF}>
      <H2 id="current-version">The current version</H2>
      <p>
        The version is part of every URL. Today there is one version, <code>v1</code>:
      </p>
      <CodeBlock code={API_BASE_URL} language="text" title="Base URL" />
      <p>
        Because it&apos;s in the path, you always know which version you&apos;re calling, and nothing changes
        under you because of a setting somewhere else.
      </p>

      <H2 id="additive-changes">Changes we make without a new version</H2>
      <p>
        We keep improving <code>v1</code> in ways that don&apos;t break working code. These can arrive at
        any time:
      </p>
      <ul>
        <li>New endpoints.</li>
        <li>New fields in responses.</li>
        <li>New optional request parameters.</li>
        <li>New values in lists we document as open, like error codes.</li>
      </ul>
      <p>
        We note these in the <Link href="/docs/changelog">changelog</Link>.
      </p>

      <H2 id="breaking-changes">Breaking changes</H2>
      <p>
        Anything that could break working code, like removing or renaming a field, changing a type or
        making an optional parameter required, ships as a new version: <code>/v2</code>.
      </p>
      <p>
        When that happens, <code>v1</code> keeps working for at least <strong>six months</strong> after we
        announce <code>v2</code>. The announcement goes in the <Link href="/docs/changelog">changelog</Link>,
        along with what changed and how to move over.
      </p>

      <H2 id="staying-compatible">Staying compatible</H2>
      <p>One rule covers almost everything:</p>
      <Callout type="warning" title="Ignore fields you don't recognise">
        <p>
          Don&apos;t fail when a response contains a field you didn&apos;t expect. Read the fields you need
          and skip the rest. Strict schema validation that rejects unknown fields will break the day we
          add one.
        </p>
      </Callout>
      <ul>
        <li>
          Branch on error <code>type</code> as a fallback when you meet an unfamiliar <code>code</code>.
        </li>
        <li>Treat IDs and cursors as opaque strings. Don&apos;t parse them or assume a length.</li>
        <li>
          Handle enum values you don&apos;t know, such as a new applicant <code>stage</code>, by showing
          them as they are rather than crashing.
        </li>
      </ul>
    </DocsPage>
  );
}
