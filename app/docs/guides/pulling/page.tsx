import Link from "next/link";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock } from "../../../../components/docs/CodeBlock";
import { Callout } from "../../../../components/docs/Callout";
import { H2, H3, Step, Steps, Table } from "../../../../components/docs/Prose";
import { docsMetadata } from "../../../../lib/docs/metadata";
import {
  exportEndpointSamples,
  pullCsvExample,
  pullJsonLastPage,
  pullJsonPage1,
  pullMappingExample,
  pullRequestExample,
} from "../../../../lib/docs/examples-pull";

const HREF = "/docs/guides/pulling";
export const metadata = docsMetadata(HREF);

const c = (text: string) => <code key={text}>{text}</code>;

export default function PullingPage() {
  return (
    <DocsPage href={HREF}>
      <p>
        If your people already live behind a URL, such as a student system&apos;s export, a JSON feed or a
        published Google Sheet, Pathment can go and get them. You set it up once in the app, and Pathment
        fetches the list on a schedule and brings everyone into your intake. No code on your side.
      </p>
      <Callout type="note" title="Seeing this in your server logs?">
        <p>
          Requests with the user agent <code>Pathment-Sync/1.0</code>{" "}come from a pull connection that an
          admin in a Pathment workspace set up to read from your URL. This page explains what they do.
        </p>
      </Callout>

      <H2 id="pull-or-push">Pull or push?</H2>
      <p>
        There are two ways to get people into an intake. Both end in exactly the same place: the same
        matching, the same jobs, the same Sync history.
      </p>
      <Table
        head={["", "Pull (this guide)", "Push"]}
        rows={[
          ["Who sends", "Pathment fetches from your URL", "Your code calls the Pathment API"],
          ["Set up in", "The Pathment app", "Your code, with an API key"],
          ["When it runs", "On a schedule, or when you press Pull now", "Whenever your code decides"],
          ["Good for", "Exports, feeds and spreadsheets that already exist", "Systems you control and can change"],
        ]}
      />
      <p>
        To push instead, see <Link href="/docs/guides/syncing-users">Syncing users into an intake</Link>.
      </p>

      <H2 id="setting-up">Setting up a pull</H2>
      <p>Workspace admins set this up in the app. There is no API endpoint for it.</p>
      <Steps>
        <Step title="Create a connection">
          <p>
            Go to <strong>Settings → Integrations → Connections</strong>, choose <strong>New connection</strong>
            , and pick <strong>Pathment fetches them</strong>.
          </p>
        </Step>
        <Step title="Name it and choose the intake">
          <p>
            Give it a name you&apos;ll recognise, like &ldquo;Student system&rdquo;. Choose the intake people
            should go into: for pulling, an intake is required. Choose what happens after each sync: add
            people only, or also <Link href="/docs/guides/sending-assessments">send the assessment</Link>{" "}to
            new people.
          </p>
        </Step>
        <Step title="Tell Pathment where to look">
          <p>
            Enter the <a href="#the-url">URL</a>, the <a href="#formats">format</a>, and if needed where the
            records are and where the <a href="#pagination">next page</a>{" "}is. Add{" "}
            <a href="#sign-in">sign-in</a>{" "}details if the URL needs them.
          </p>
        </Step>
        <Step title="Test the URL">
          <p>
            Press <strong>Test the URL</strong>. Pathment fetches it without importing anything and tells you
            how many records and pages it found. See <a href="#testing">Testing</a>.
          </p>
        </Step>
        <Step title="Map the fields">
          <p>
            Use <strong>Suggest mapping</strong>{" "}and <strong>Preview</strong>{" "}to turn your fields into
            Pathment&apos;s. It works exactly like{" "}
            <Link href="/docs/guides/field-mapping">field mapping</Link>{" "}for pushed records.
          </p>
        </Step>
        <Step title="Choose a schedule and save">
          <p>
            Pick how often to pull. The first scheduled pull happens about a minute after you save. See{" "}
            <a href="#schedule">Schedule</a>.
          </p>
        </Step>
      </Steps>

      <H2 id="the-url">The URL</H2>
      <ul>
        <li>
          It must start with <code>https://</code>.
        </li>
        <li>
          It must be on the public internet. Private and internal addresses are refused, and Pathment checks
          this on every connection and on every redirect along the way.
        </li>
        <li>
          Don&apos;t put a username and password in the URL (<code>https://user:pass@...</code>). Use the{" "}
          <a href="#sign-in">sign-in settings</a>{" "}instead.
        </li>
        <li>
          Up to 5 redirects are followed. If a redirect goes to a different host, the sign-in details are not
          sent there.
        </li>
      </ul>
      <p>Each request looks like this:</p>
      <CodeBlock code={pullRequestExample} language="http" title="What Pathment sends" />
      <p>
        It&apos;s always a <code>GET</code>. <code>Accept</code>{" "}is <code>application/json</code>, or{" "}
        <code>text/csv</code>{" "}for CSV. The <code>Authorization</code>{" "}line only appears with token sign-in.
      </p>

      <H2 id="formats">Formats</H2>

      <H3 id="json">JSON</H3>
      <p>Pathment needs to find the list of records in the response. It looks in this order:</p>
      <ol>
        <li>
          If you filled in <strong>Records are at</strong>, it uses that path, such as <code>data.items</code>.
          Paths work exactly like <Link href="/docs/guides/field-mapping#paths">mapping paths</Link>, so{" "}
          <code>contact.emails[0]</code>-style indexes are fine too.
        </li>
        <li>If the whole body is an array, that&apos;s the list.</li>
        <li>
          Otherwise it looks for an array under one of these names: <code>data</code>, <code>results</code>,{" "}
          <code>items</code>, <code>records</code>, <code>rows</code>, <code>users</code>, <code>people</code>,{" "}
          <code>applicants</code>, <code>students</code>, <code>entries</code>{" "}or <code>list</code>.
        </li>
        <li>Failing that, if the object has exactly one array in it, it uses that.</li>
      </ol>
      <p>Here&apos;s a typical paginated response from a student system:</p>
      <CodeBlock code={pullJsonPage1} language="json" title="GET https://sis.example.com/api/students" />
      <p>The settings for it:</p>
      <Table
        head={["Setting", "Value"]}
        rows={[
          ["Format", "JSON"],
          ["Records are at", c("data")],
          ["Next page is at", c("links.next")],
        ]}
      />
      <p>
        (Pathment would find <code>data</code>{" "}by itself, but filling it in makes the setup clear.) And a
        mapping that turns those records into applicants:
      </p>
      <CodeBlock code={pullMappingExample} language="json" title="Field mapping" />

      <H3 id="pagination">Pagination</H3>
      <p>For JSON, Pathment can follow pages. It finds the next page in one of two ways:</p>
      <ul>
        <li>
          <strong>Next page is at</strong>: a path to the next page&apos;s URL in the body, such as{" "}
          <code>links.next</code>. The URL can be absolute or relative to the current page.
        </li>
        <li>
          A standard <code>Link</code>{" "}header with <code>rel=&quot;next&quot;</code>, for example{" "}
          <code>Link: &lt;https://sis.example.com/api/students?page=2&gt;; rel=&quot;next&quot;</code>.
        </li>
      </ul>
      <p>
        Pages must stay on the same host as the first URL, and Pathment follows up to 20 pages. On the last
        page, leave the next link out or set it to <code>null</code>:
      </p>
      <CodeBlock code={pullJsonLastPage} language="json" title="The last page" />

      <H3 id="csv">CSV</H3>
      <p>The first row holds the column names, and each row after it is one person.</p>
      <CodeBlock code={pullCsvExample} language="text" title="students.csv" />
      <ul>
        <li>
          Quoted fields are fine, including commas and line breaks inside quotes, and <code>&quot;&quot;</code>{" "}
          for a quote mark.
        </li>
        <li>A UTF-8 byte order mark at the start is fine.</li>
        <li>Blank rows are skipped, and every value is trimmed.</li>
        <li>CSV has no pages: the whole file is read in one go.</li>
      </ul>

      <H3 id="google-sheets">Google Sheets</H3>
      <p>A Google Sheet works as a CSV source once it&apos;s published:</p>
      <Steps>
        <Step title="Publish the sheet">
          <p>
            In Google Sheets, choose <strong>File → Share → Publish to web</strong>.
          </p>
        </Step>
        <Step title="Pick the sheet and CSV">
          <p>Choose the sheet (tab) with your people and pick CSV as the format.</p>
        </Step>
        <Step title="Paste the link">
          <p>
            Copy the link into the connection&apos;s URL and choose the CSV format. The link redirects
            before it reaches the file; that&apos;s fine.
          </p>
        </Step>
      </Steps>
      <Callout type="warning" title="Got an HTML page instead of CSV?">
        <p>
          If the URL returns a web page rather than CSV, the test tells you. With Google Sheets it almost
          always means the sheet isn&apos;t published yet, or the link is the normal sharing link instead of
          the published CSV one.
        </p>
      </Callout>
      <p>
        Anyone with a published link can read the sheet, so treat it like a{" "}
        <a href="#security-checklist">secret link</a>.
      </p>

      <H2 id="sign-in">Sign-in</H2>
      <Table
        head={["Option", "What Pathment sends", "Use it for"]}
        rows={[
          ["None", "Nothing extra", "Public URLs and secret links."],
          ["Bearer token", c("Authorization: Bearer <token>"), "Most APIs. The best choice when it's offered."],
          [
            "A header",
            "A header name and value you choose, such as X-Api-Key",
            "APIs that take a key in their own header.",
          ],
          ["Username and password", "HTTP Basic authentication", "Older systems that only support this."],
        ]}
      />
      <p>
        A custom header can&apos;t be one of <code>Host</code>, <code>Content-Length</code>,{" "}
        <code>Content-Type</code>, <code>Connection</code>, <code>Transfer-Encoding</code>,{" "}
        <code>Accept-Encoding</code>{" "}or <code>Cookie</code>.
      </p>
      <p>
        Pathment stores the credential encrypted and only ever sends it to the URL&apos;s own host. Once
        saved, it&apos;s never shown again. When you edit the connection, leave the field blank to keep the
        current one.
      </p>

      <H2 id="testing">Testing</H2>
      <p>
        <strong>Test the URL</strong>{" "}fetches your source without importing anyone. It reports how many
        records and pages it found, and puts the first 5 records in the sample, so{" "}
        <strong>Suggest mapping</strong>{" "}and <strong>Preview</strong>{" "}work on your real data.
      </p>
      <p>
        If something is wrong, the test says what. A <code>401</code>{" "}or <code>403</code>{" "}shows as the server
        having refused the sign-in; any other error status shows as &ldquo;The server answered HTTP&rdquo;
        followed by the code.
      </p>
      <Callout type="tip" title="A careful first run">
        <p>
          Test the URL and check the preview. Then, with sending assessments off, press{" "}
          <strong>Pull now</strong>{" "}once and read the job in Sync history. Only then turn on a schedule, or
          sending assessments.
        </p>
      </Callout>

      <H2 id="schedule">Schedule</H2>
      <Table
        head={["Schedule", "Pulls"]}
        rows={[
          ["Only when I press Pull now", "Never by itself. You decide when."],
          ["Every hour", "About an hour after the last pull."],
          ["Every 6 hours", "About 6 hours after the last pull."],
          ["Once a day", "About a day after the last pull."],
        ]}
      />
      <p>
        With a schedule, the first pull happens about a minute after you save. After that, each interval is
        counted from the last pull. <strong>Pull now</strong>{" "}works whatever the schedule.
      </p>

      <H2 id="what-a-pull-does">What a pull does</H2>
      <p>
        A pull does exactly what a pushed sync does. Records are split into jobs of up to 1,000, and each one
        follows the same rules:
      </p>
      <ul>
        <li>
          People are matched by your ID first, then by email. See{" "}
          <Link href="/docs/guides/matching-and-updates">Matching and updates</Link>.
        </li>
        <li>Only fields the source set last time are updated. Edits an admin made in Pathment stay.</li>
        <li>Closed applicants (rejected, withdrawn, removed) are never reopened.</li>
        <li>Nobody is deleted for being missing from a later pull.</li>
        <li>New people get the assessment if the connection is set to send it.</li>
      </ul>
      <p>
        Jobs appear in Sync history as <strong>Pulled · &lt;connection name&gt;</strong>. They&apos;re the same{" "}
        <Link href="/docs/api/jobs#the-job-object">Job object</Link>, and they fire{" "}
        <Link href="/docs/api/webhook-events#sync-job-completed">
          <code>sync.job.completed</code>
        </Link>{" "}
        webhooks like any other job.
      </p>

      <H3 id="nothing-new">When nothing has changed</H3>
      <p>
        If a <em>scheduled</em>{" "}pull gets exactly the same records as last time, and the mapping, intake and
        after-sync setting haven&apos;t changed either, it&apos;s skipped: no job is created and the connection
        shows &ldquo;nothing new&rdquo;. <strong>Pull now</strong>{" "}always runs, even when nothing changed.
      </p>

      <H2 id="limits">Limits</H2>
      <Table
        head={["Limit", "Value"]}
        rows={[
          ["Records per pull", "10,000. Any more are left out, and the connection says so."],
          ["Records per job", "1,000. A bigger pull becomes several jobs."],
          ["Pages per pull", "20 (JSON only)"],
          ["Time per page", "30 seconds"],
          ["Size per page", "10 MB"],
          ["Redirects", "5"],
        ]}
      />

      <H2 id="when-it-fails">When a pull fails</H2>
      <p>
        If Pathment can&apos;t fetch the records, a failed job appears in Sync history with the message
        &ldquo;Couldn&apos;t fetch the records:&rdquo; and the reason. A{" "}
        <code>sync.job.completed</code>{" "}webhook fires with status <code>failed</code>, a total of{" "}
        <code>0</code>{" "}and the message.
      </p>
      <p>
        The connection&apos;s card always shows when it last pulled, what happened (fetched, nothing new, no
        records, or failed, with the error) and when the next pull is due.
      </p>
      <Table
        head={["You see", "Usually means"]}
        rows={[
          ["The server refused the sign-in", "The token, key or password is wrong or expired. Paste a new one in Edit."],
          ["The server answered HTTP 404", "The URL has changed or has a typo."],
          ["The server answered HTTP 500", "Your source had a problem. Check its logs; the next pull will try again."],
          ["An HTML page instead of CSV", "A Google Sheet isn't published, or a login page was returned."],
          ["No records", "The records aren't where Pathment looked. Set Records are at."],
          ["A timeout or size error", "A page took over 30 seconds or was over 10 MB. Use smaller pages."],
        ]}
      />

      <H2 id="build-your-endpoint">What to build on your side</H2>
      <p>
        If you&apos;re a developer making a URL for Pathment to pull from, keep it simple:
      </p>
      <ul>
        <li>
          <strong>A plain GET</strong>{" "}that returns JSON (or CSV).
        </li>
        <li>
          <strong>Everyone who should be in the intake, every time</strong>, not just recent changes. Pathment
          works out what&apos;s new itself, and skips the pull if nothing changed.
        </li>
        <li>
          <strong>A stable ID for each person</strong>{" "}that never changes and is never reused. Map it to{" "}
          <code>externalId</code>.
        </li>
        <li>
          <strong>Pages</strong>, if the list is long: a next link in the body or a <code>Link</code>{" "}header,
          on the same host. 500 records a page fits the 10,000 limit in 20 pages.
        </li>
        <li>
          <strong>A read-only token</strong>{" "}made just for this export.
        </li>
      </ul>
      <CodeBlock samples={exportEndpointSamples} title="Your export endpoint" />

      <H2 id="security-checklist">Security checklist</H2>
      <ul>
        <li>Use a read-only credential that can only see this export, nothing else.</li>
        <li>Prefer a token over a username and password.</li>
        <li>
          A &ldquo;secret link&rdquo; with no sign-in, including a published Google Sheet, is only as private
          as the link. Anyone who gets it can read the data.
        </li>
        <li>
          To rotate a credential, create a new one in your system, paste it into the connection with{" "}
          <strong>Edit</strong>, then revoke the old one.
        </li>
        <li>Only include the people and fields Pathment needs. Leave out anything reviewers shouldn&apos;t see.</li>
      </ul>
    </DocsPage>
  );
}
