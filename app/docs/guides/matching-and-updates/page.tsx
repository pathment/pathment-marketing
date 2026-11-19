import Link from "next/link";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock } from "../../../../components/docs/CodeBlock";
import { Callout } from "../../../../components/docs/Callout";
import { H2, Table } from "../../../../components/docs/Prose";
import { docsMetadata } from "../../../../lib/docs/metadata";

const HREF = "/docs/guides/matching-and-updates";
export const metadata = docsMetadata(HREF);

export default function MatchingPage() {
  return (
    <DocsPage href={HREF}>
      <p>
        You can send the same people over and over and Pathment will never create a duplicate. This page
        explains how it recognises someone, and the few firm rules it follows when it does.
      </p>

      <H2 id="how-matching-works">How a record finds its applicant</H2>
      <p>For each record in a batch, Pathment looks for an existing applicant in two steps:</p>
      <ol>
        <li>
          <strong>By <code>externalId</code>.</strong>{" "}If the record has one, Pathment looks for an
          applicant with the same ID. When you push through a{" "}
          <Link href="/docs/guides/field-mapping">connection</Link>, IDs are matched within that connection.
          Without a connection, they&apos;re matched across your workspace.
        </li>
        <li>
          <strong>By email, within the same intake.</strong>{" "}If no ID matched, Pathment looks for an
          applicant in this intake with the same email address.
        </li>
      </ol>
      <p>
        The first match wins. If neither finds anyone, the record is a new person.
      </p>
      <Callout type="tip" title="Why externalId comes first">
        <p>
          People change email addresses. If Ada moves from <code>ada@example.com</code>{" "}to{" "}
          <code>ada.okafor@example.com</code>{" "}in your CRM, her <code>externalId</code>{" "}still finds her, and
          her email is updated instead of a second Ada appearing.
        </p>
      </Callout>

      <H2 id="what-happens">What happens to each record</H2>
      <Table
        head={["Situation", "Result", "Counted as"]}
        rows={[
          ["No existing applicant matches", "A new applicant is created at the Added stage.", <code key="c">created</code>],
          ["A match, and something changed", "The applicant is updated (see the rules below).", <code key="c">updated</code>],
          ["A match, and nothing changed", "Nothing is written.", <code key="c">unchanged</code>],
          [
            "A match, but they were rejected, withdrew or were removed",
            "Left alone. Closed applicants are never reopened.",
            <code key="c">skipped</code>,
          ],
          [
            "The same email or externalId appeared earlier in this batch",
            "The later record fails. The earlier one is processed.",
            <code key="c">failed</code>,
          ],
          ["Someone from an earlier sync is missing from this batch", "Nothing. They stay as they are.", "Not counted"],
        ]}
      />

      <H2 id="what-updates-change">What an update can change</H2>
      <p>
        A sync only updates the fields <strong>it set last time</strong>. If an admin has edited a field
        in Pathment since, the sync leaves that field alone from then on.
      </p>
      <p>An example makes this clearer. Your first sync sends:</p>
      <CodeBlock
        language="json"
        title="First sync"
        code={`{ "externalId": "u_1042", "email": "ada@example.com", "firstName": "Ada", "phone": "+447700900123", "level": "beginner" }`}
      />
      <p>
        Then a programme admin reviews Ada and moves her to <code>senior</code>{" "}in Pathment. Next week your
        sync sends a new phone number, and still says <code>beginner</code>:
      </p>
      <CodeBlock
        language="json"
        title="Later sync"
        code={`{ "externalId": "u_1042", "email": "ada@example.com", "firstName": "Ada", "phone": "+447700900456", "level": "beginner" }`}
      />
      <Table
        head={["Field", "After the second sync", "Why"]}
        rows={[
          ["phone", <code key="v">+447700900456</code>, "The sync set it last time, and nobody touched it in Pathment."],
          ["level", <code key="v">senior</code>, "An admin changed it in Pathment, so the sync no longer owns it."],
        ]}
      />
      <p>
        This means people in Pathment can correct things without a nightly sync quietly undoing their
        work. Your system stays the source for fields nobody has touched; Pathment wins for fields someone
        deliberately changed.
      </p>
      <Callout type="note">
        <p>
          A sync changes the person&apos;s details, never their progress. Stage and status move through what
          happens in Pathment (the assessment, reviews, decisions), not through pushes.
        </p>
      </Callout>

      <H2 id="closed-applicants">Closed applicants stay closed</H2>
      <p>
        If someone was rejected, withdrew or was removed, a sync never brings them back. Their record is
        skipped and listed in the job&apos;s <code>errors</code>{" "}with the code <code>applicant_closed</code>,
        so you can see it happened. Nothing about them changes.
      </p>
      <p>
        This protects decisions. A person who withdrew shouldn&apos;t get an assessment email because they
        are still in your CRM.
      </p>

      <H2 id="nothing-is-deleted">Nothing is ever deleted</H2>
      <p>
        A sync only adds and updates. If someone was in last week&apos;s batch and isn&apos;t in this
        week&apos;s, Pathment doesn&apos;t treat that as a deletion. It can&apos;t tell &ldquo;removed from your
        system&rdquo; apart from &ldquo;filtered out of this export&rdquo;, so it plays safe. Removing an
        applicant is always a decision someone makes in Pathment.
      </p>

      <H2 id="duplicates-in-a-batch">Duplicates in one batch</H2>
      <p>
        If two records in the same batch share an email or an <code>externalId</code>, the first one is
        processed and the later one fails with <code>duplicate_in_batch</code>. Its <code>index</code>{" "}in
        the job&apos;s errors tells you which row to look at.
      </p>
      <p>
        This usually means duplicate rows in the source. De-duplicate before sending, or accept the error
        if the first row is the one you want.
      </p>
    </DocsPage>
  );
}
