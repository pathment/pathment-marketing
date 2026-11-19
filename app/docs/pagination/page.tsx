import { DocsPage } from "../../../components/docs/DocsPage";
import { CodeBlock } from "../../../components/docs/CodeBlock";
import { Callout } from "../../../components/docs/Callout";
import { H2 } from "../../../components/docs/Prose";
import { ParamTable } from "../../../components/docs/ParamTable";
import { docsMetadata } from "../../../lib/docs/metadata";
import { paginateSamples, updatedSinceSamples } from "../../../lib/docs/examples";

const HREF = "/docs/pagination";
export const metadata = docsMetadata(HREF);

export default function PaginationPage() {
  return (
    <DocsPage href={HREF}>
      <H2 id="how-pages-work">How pages work</H2>
      <p>
        An intake can hold thousands of applicants, so list endpoints hand them over a page at a time.
        This applies to <code>GET /intakes</code>{" "}and <code>GET /intakes/&#123;intakeId&#125;/applicants</code>.
      </p>
      <ParamTable
        title="Query parameters"
        params={[
          {
            name: "limit",
            type: "integer",
            meta: "1 to 100, default 50",
            description: "How many items to return in this page.",
          },
          {
            name: "cursor",
            type: "string",
            description: (
              <p>
                Where to carry on from. Pass the <code>nextCursor</code>{" "}from the previous response. Leave it
                out for the first page.
              </p>
            ),
          },
        ]}
      />
      <p>Every list response has the same three fields:</p>
      <CodeBlock
        language="json"
        title="List response"
        code={`{
  "data": [ ... ],
  "hasMore": true,
  "nextCursor": "eyJpZCI6ImFwcF9rM0o5eFAifQ"
}`}
      />
      <ul>
        <li>
          <code>data</code>{" "}is the items in this page.
        </li>
        <li>
          <code>hasMore</code>{" "}is <code>true</code>{" "}if there&apos;s at least one more page.
        </li>
        <li>
          <code>nextCursor</code>{" "}is what you pass as <code>cursor</code>{" "}to get that page. It&apos;s{" "}
          <code>null</code>{" "}on the last page.
        </li>
      </ul>
      <Callout type="note">
        <p>
          Cursors are opaque. They may look like something you could decode or build yourself, but their
          format can change at any time. Always pass back exactly what you were given.
        </p>
      </Callout>

      <H2 id="walking-every-page">Walking every page</H2>
      <p>
        To fetch everything, keep asking for the next page until <code>hasMore</code>{" "}is{" "}
        <code>false</code>.
      </p>
      <CodeBlock samples={paginateSamples} title="Fetch every applicant" />

      <H2 id="incremental-reads">Incremental reads with updatedSince</H2>
      <p>
        If you check an intake regularly, there&apos;s no need to read everyone each time. Pass{" "}
        <code>updatedSince</code>{" "}with an ISO 8601 timestamp to the applicants list, and you get only the
        people who changed after it: new applicants, new stages, new decisions.
      </p>
      <CodeBlock samples={updatedSinceSamples} title="Only what changed" />
      <p>
        Record the time just <em>before</em>{" "}each run starts and use it as <code>updatedSince</code>{" "}next
        time. A change that lands while you&apos;re reading then shows up in the next run, instead of
        falling into a gap. Getting the same person twice is harmless; missing one is not.
      </p>
      <Callout type="tip">
        <p>
          Results with <code>updatedSince</code>{" "}are paginated like any other list, so use the same loop.
        </p>
      </Callout>
    </DocsPage>
  );
}
