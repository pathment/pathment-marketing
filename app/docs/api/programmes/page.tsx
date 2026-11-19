import Link from "next/link";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../../components/docs/CodeBlock";
import { Endpoint } from "../../../../components/docs/Endpoint";
import { ParamTable } from "../../../../components/docs/ParamTable";
import { H2, RefSplit } from "../../../../components/docs/Prose";
import { docsMetadata } from "../../../../lib/docs/metadata";
import { errorBody } from "../../../../lib/docs/examples";
import {
  listProgrammesSamples,
  programmeListResponse,
  programmeObject,
  retrieveProgrammeSamples,
} from "../../../../lib/docs/examples-read";

const HREF = "/docs/api/programmes";
export const metadata = docsMetadata(HREF);

export default function ProgrammesPage() {
  return (
    <DocsPage href={HREF} layout="reference">
      <RefSplit aside={<CodeBlock code={programmeObject} language="json" title="The Programme object" />}>
        <H2 id="the-programme-object">The Programme object</H2>
        <p>
          A programme is what people take part in: a fellowship, an internship, a training course. It holds
          the clans people are placed in and the work they do.
        </p>
        <ParamTable
          title="Attributes"
          kind="attributes"
          params={[
            { name: "id", type: "string", description: "The programme's ID." },
            { name: "name", type: "string", description: "The programme's name, as people see it in Pathment." },
            { name: "description", type: "string or null", description: "A short description, if one was written." },
            {
              name: "type",
              type: "string",
              description: (
                <p>
                  One of <code>internship</code>, <code>mentorship</code>, <code>training</code>{" "}or{" "}
                  <code>onboarding</code>.
                </p>
              ),
            },
            {
              name: "status",
              type: "string",
              description: (
                <p>
                  <code>draft</code>{" "}being set up · <code>published</code>{" "}live · <code>completed</code>{" "}
                  finished · <code>archived</code>{" "}put away.
                </p>
              ),
            },
            { name: "clanCount", type: "integer", description: "How many clans the programme has." },
            { name: "menteeCount", type: "integer", description: "How many mentees are enrolled." },
            { name: "createdAt", type: "string", description: "When the programme was created (ISO 8601)." },
          ]}
        />
      </RefSplit>

      <RefSplit
        aside={
          <>
            <CodeBlock samples={listProgrammesSamples} title="Request" />
            <ResponseBlock status={200} body={programmeListResponse} />
          </>
        }
      >
        <H2 id="list-programmes">List programmes</H2>
        <Endpoint method="GET" path="/programmes" />
        <p>
          Returns the programmes in the key&apos;s workspace. Requires the <code>programmes:read</code>{" "}
          scope.
        </p>
        <ParamTable
          title="Query parameters"
          params={[
            { name: "limit", type: "integer", meta: "1 to 100, default 50", description: "How many programmes per page." },
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
            {
              name: "status",
              type: "string",
              description: (
                <p>
                  Only programmes with this status, such as <code>published</code>.
                </p>
              ),
            },
          ]}
        />
        <p>
          <strong>Returns</strong>{" "}a list object: <code>data</code>{" "}(an array of Programme objects),{" "}
          <code>hasMore</code>{" "}and <code>nextCursor</code>.
        </p>
      </RefSplit>

      <RefSplit
        aside={
          <>
            <CodeBlock samples={retrieveProgrammeSamples} title="Request" />
            <ResponseBlock status={200} body={programmeObject} />
            <ResponseBlock
              status={404}
              title="Unknown programme"
              body={errorBody(
                "not_found",
                "programme_not_found",
                "No programme with ID 0f3a6c9e-2b58-4d71-8e4a-b19c7d2e5f60 in this workspace.",
              )}
            />
          </>
        }
      >
        <H2 id="retrieve-a-programme">Retrieve a programme</H2>
        <Endpoint method="GET" path="/programmes/{programmeId}" />
        <p>
          Returns one programme. Requires the <code>programmes:read</code>{" "}scope.
        </p>
        <ParamTable
          title="Path parameters"
          params={[{ name: "programmeId", type: "string", required: true, description: "The programme's ID." }]}
        />
        <p>
          <strong>Returns</strong>{" "}a Programme object, or <code>404</code>{" "}with{" "}
          <code>programme_not_found</code>{" "}if there&apos;s no such programme in this workspace.
        </p>
      </RefSplit>
    </DocsPage>
  );
}
