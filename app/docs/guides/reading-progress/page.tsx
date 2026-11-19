import Link from "next/link";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock } from "../../../../components/docs/CodeBlock";
import { Callout } from "../../../../components/docs/Callout";
import { H2, Table } from "../../../../components/docs/Prose";
import { docsMetadata } from "../../../../lib/docs/metadata";
import {
  listProgrammesSamples,
  menteesUpdatedSinceSamples,
  nightlyProgressScript,
  programmeProgressSamples,
} from "../../../../lib/docs/examples-read";

const HREF = "/docs/guides/reading-progress";
export const metadata = docsMetadata(HREF);

const c = (text: string) => <code key={text}>{text}</code>;

export default function ReadingProgressPage() {
  return (
    <DocsPage href={HREF}>
      <p>
        Pathment knows how each mentee is doing: how much of their work is done, where they are on their
        roadmaps, how often they come to sessions. This guide shows you how to copy that into your own
        system every night, so it can sit next to everything else you know about them.
      </p>

      <H2 id="what-you-need">What you need</H2>
      <p>
        Create a key for this job in <strong>Settings → Integrations → API keys</strong>{" "}with the scopes it
        needs. A key can carry any mix of scopes.
      </p>
      <Table
        head={["Scope", "Why", "Needed?"]}
        rows={[
          [c("programmes:read"), "To find the programmes (and clans) to read.", "Yes"],
          [c("progress:read"), "To read progress. Progress has mentee IDs, not names.", "Yes"],
          [
            c("mentees:read"),
            "To put names and emails to those IDs, or match them to your own records.",
            "Only if your system needs to know who's who",
          ],
        ]}
      />
      <p>
        See <Link href="/docs/authentication#scopes">Scopes</Link>{" "}for the full list.
      </p>

      <H2 id="the-shape-of-the-job">The shape of the job</H2>
      <p>The nightly job does three things:</p>
      <ol>
        <li>Lists the programmes you care about.</li>
        <li>Pages through progress for each one and stores it.</li>
        <li>Picks up any mentees who changed since last night, so you can match them to your records.</li>
      </ol>
      <p>
        Start with the programmes. Most jobs only want the live ones:
      </p>
      <CodeBlock samples={listProgrammesSamples} title="GET /programmes" />

      <H2 id="paging-through-progress">Paging through progress</H2>
      <p>
        <code>GET /programmes/&#123;programmeId&#125;/progress</code>{" "}returns one Progress object per enrolled
        mentee, up to 100 a page. Follow <code>nextCursor</code>{" "}until <code>hasMore</code>{" "}is{" "}
        <code>false</code>, exactly as in <Link href="/docs/pagination">Pagination</Link>. Add{" "}
        <code>clanId</code>{" "}if you only want one clan.
      </p>
      <CodeBlock samples={programmeProgressSamples} title="GET /programmes/{programmeId}/progress" />
      <p>
        Store what your system needs. For most dashboards that&apos;s <code>completionPercent</code>,{" "}
        <code>tasks.overdue</code>, <code>attendance.rate</code>{" "}and each certificate&apos;s <code>verifyUrl</code>.
        Every field is explained on the <Link href="/docs/api/progress">Progress object</Link>.
      </p>
      <Callout type="tip" title="Two numbers that trip people up">
        <p>
          <code>tasks.overdue</code>{" "}overlaps with <code>open</code>{" "}and <code>revisionNeeded</code>, so
          don&apos;t add them together. And <code>attendance.rate</code>{" "}is <code>null</code>, not{" "}
          <code>0</code>, when there have been no sessions yet: show &ldquo;no sessions&rdquo;, not
          &ldquo;0% attendance&rdquo;.
        </p>
      </Callout>

      <H2 id="incremental-changes">Incremental changes with updatedSince</H2>
      <p>
        People don&apos;t change much from one night to the next. Instead of reading every mentee each time,
        pass <code>updatedSince</code>{" "}to <code>GET /mentees</code>{" "}with the time your last run started. You
        get only mentees whose details, clans or enrollments changed since then.
      </p>
      <CodeBlock samples={menteesUpdatedSinceSamples} title="GET /mentees?updatedSince=..." />
      <p>
        Save the time just <em>before</em>{" "}each run starts, and use it next time. A change that lands while
        the job runs then shows up the following night instead of slipping through.
      </p>

      <H2 id="matching-mentees">Matching mentees to your records</H2>
      <p>To link a Pathment mentee to a person in your system:</p>
      <ol>
        <li>
          <strong>Use <code>externalId</code>{" "}first.</strong>{" "}If the person came into Pathment through a{" "}
          <Link href="/docs/guides/syncing-users">sync</Link>, it holds the ID you sent, so the match is
          exact.
        </li>
        <li>
          <strong>Fall back to email.</strong>{" "}For people added another way, <code>externalId</code>{" "}is{" "}
          <code>null</code>. Match on email, ignoring case.
        </li>
        <li>
          <strong>Then store Pathment&apos;s <code>id</code>.</strong>{" "}Once you&apos;ve matched someone, keep
          their mentee <code>id</code>{" "}against your record. Progress rows only carry{" "}
          <code>menteeId</code>, so that&apos;s what joins them up.
        </li>
      </ol>

      <H2 id="nightly-script">A complete nightly script</H2>
      <p>
        Here it is all together. Swap the <code>db</code>{" "}calls for your own storage.
      </p>
      <CodeBlock samples={nightlyProgressScript} title="nightly progress" />
      <p>
        A programme of a few hundred mentees takes a handful of requests, well inside the{" "}
        <Link href="/docs/rate-limits">rate limit</Link>.
      </p>

      <H2 id="privacy">Privacy</H2>
      <ul>
        <li>
          <strong>Progress on its own has no names.</strong>{" "}A key with only <code>progress:read</code>{" "}sees
          mentee IDs and how they&apos;re doing, nothing that says who they are. If your reporting only needs
          totals and trends, that&apos;s all you need.
        </li>
        <li>
          <strong><code>mentees:read</code>{" "}is personal data.</strong>{" "}It returns names and email addresses.
          Grant it only to systems that should hold that information.
        </li>
        <li>
          <strong>Keep only what you use.</strong>{" "}If your system doesn&apos;t show attendance, don&apos;t store
          it.
        </li>
        <li>
          <strong>Mind who can see it.</strong>{" "}Once progress is in your system, your access rules apply,
          not Pathment&apos;s. Show a mentee&apos;s progress only to the people who could see it in Pathment.
        </li>
      </ul>
    </DocsPage>
  );
}
