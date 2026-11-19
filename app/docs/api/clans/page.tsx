import Link from "next/link";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../../components/docs/CodeBlock";
import { Endpoint } from "../../../../components/docs/Endpoint";
import { ParamTable } from "../../../../components/docs/ParamTable";
import { H2, RefSplit } from "../../../../components/docs/Prose";
import { docsMetadata } from "../../../../lib/docs/metadata";
import { errorBody } from "../../../../lib/docs/examples";
import {
  clanListResponse,
  clanObject,
  listClansSamples,
  retrieveClanSamples,
} from "../../../../lib/docs/examples-read";

const HREF = "/docs/api/clans";
export const metadata = docsMetadata(HREF);

export default function ClansPage() {
  return (
    <DocsPage href={HREF} layout="reference">
      <RefSplit aside={<CodeBlock code={clanObject} language="json" title="The Clan object" />}>
        <H2 id="the-clan-object">The Clan object</H2>
        <p>
          A clan is a group of mentees inside a programme, usually with a lead mentor. It&apos;s who people
          learn alongside, and where review sessions happen.
        </p>
        <ParamTable
          title="Attributes"
          kind="attributes"
          params={[
            { name: "id", type: "string", description: "The clan's ID." },
            { name: "name", type: "string", description: "The clan's name." },
            { name: "programmeId", type: "string", description: "The programme it belongs to." },
            {
              name: "kind",
              type: "string",
              description: (
                <p>
                  <code>cohort</code>{" "}for a group that runs together for a set time, or{" "}
                  <code>standing</code>{" "}for an ongoing group people join and leave.
                </p>
              ),
            },
            {
              name: "status",
              type: "string",
              description: (
                <p>
                  <code>active</code>, <code>inactive</code>{" "}or <code>archived</code>.
                </p>
              ),
            },
            {
              name: "leadMentor",
              type: "object or null",
              description: (
                <p>
                  The lead mentor&apos;s <code>id</code>{" "}and <code>name</code>, or <code>null</code>{" "}if the
                  clan doesn&apos;t have one yet.
                </p>
              ),
            },
            { name: "menteeCount", type: "integer", description: "How many mentees are in the clan." },
            { name: "createdAt", type: "string", description: "When the clan was created (ISO 8601)." },
          ]}
        />
      </RefSplit>

      <RefSplit
        aside={
          <>
            <CodeBlock samples={listClansSamples} title="Request" />
            <ResponseBlock status={200} body={clanListResponse} />
          </>
        }
      >
        <H2 id="list-clans">List clans</H2>
        <Endpoint method="GET" path="/clans" />
        <p>
          Returns the clans in the key&apos;s workspace, across all programmes unless you filter. Requires
          the <code>programmes:read</code>{" "}scope.
        </p>
        <ParamTable
          title="Query parameters"
          params={[
            { name: "limit", type: "integer", meta: "1 to 100, default 50", description: "How many clans per page." },
            {
              name: "cursor",
              type: "string",
              description: (
                <p>
                  The <code>nextCursor</code>{" "}from the previous page. See{" "}
                  <Link href="/docs/pagination">Pagination</Link>.
                </p>
              ),
            },
            { name: "programmeId", type: "string", description: "Only clans in this programme." },
            {
              name: "status",
              type: "string",
              description: (
                <p>
                  Only clans with this status, such as <code>active</code>.
                </p>
              ),
            },
          ]}
        />
        <p>
          <strong>Returns</strong>{" "}a list object: <code>data</code>{" "}(an array of Clan objects),{" "}
          <code>hasMore</code>{" "}and <code>nextCursor</code>.
        </p>
      </RefSplit>

      <RefSplit
        aside={
          <>
            <CodeBlock samples={retrieveClanSamples} title="Request" />
            <ResponseBlock status={200} body={clanObject} />
            <ResponseBlock
              status={404}
              title="Unknown clan"
              body={errorBody(
                "not_found",
                "clan_not_found",
                "No clan with ID 7b1e4d8a-6c92-4f05-a3e7-0d5b9c2f8e14 in this workspace.",
              )}
            />
          </>
        }
      >
        <H2 id="retrieve-a-clan">Retrieve a clan</H2>
        <Endpoint method="GET" path="/clans/{clanId}" />
        <p>
          Returns one clan. Requires the <code>programmes:read</code>{" "}scope.
        </p>
        <ParamTable
          title="Path parameters"
          params={[{ name: "clanId", type: "string", required: true, description: "The clan's ID." }]}
        />
        <p>
          <strong>Returns</strong>{" "}a Clan object, or <code>404</code>{" "}with <code>clan_not_found</code>.
        </p>
      </RefSplit>
    </DocsPage>
  );
}
