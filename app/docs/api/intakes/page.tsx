import Link from "next/link";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../../components/docs/CodeBlock";
import { Endpoint } from "../../../../components/docs/Endpoint";
import { ParamTable } from "../../../../components/docs/ParamTable";
import { H2, RefSplit } from "../../../../components/docs/Prose";
import { docsMetadata } from "../../../../lib/docs/metadata";
import {
  errorBody,
  intakeListResponse,
  intakeObject,
  listIntakesSamples,
  retrieveIntakeSamples,
} from "../../../../lib/docs/examples";

const HREF = "/docs/api/intakes";
export const metadata = docsMetadata(HREF);

export default function IntakesPage() {
  return (
    <DocsPage href={HREF} layout="reference">
      <RefSplit aside={<CodeBlock code={intakeObject} language="json" title="The Intake object" />}>
        <H2 id="the-intake-object">The Intake object</H2>
        <p>
          An intake is one admissions round of a programme, such as &ldquo;Spring 2027 cohort&rdquo;. People
          apply to an intake, and applicants you push always land in one.
        </p>
        <ParamTable
          title="Attributes"
          kind="attributes"
          params={[
            { name: "id", type: "string", description: "The intake's ID. Use it in applicant URLs." },
            { name: "name", type: "string", description: "The intake's name, as admins see it in Pathment." },
            {
              name: "programme",
              type: "object",
              description: (
                <p>
                  The programme this intake belongs to, as <code>id</code>{" "}and <code>name</code>.
                </p>
              ),
            },
            {
              name: "status",
              type: "string",
              description: (
                <>
                  <p>Where the intake is in its life:</p>
                  <p>
                    <code>planning</code>{" "}being set up · <code>open</code>{" "}taking applications ·{" "}
                    <code>running</code>{" "}under way · <code>closed</code>{" "}no longer taking applications ·{" "}
                    <code>completed</code>{" "}finished.
                  </p>
                </>
              ),
            },
            {
              name: "levels",
              type: "array of objects",
              description: (
                <p>
                  The levels applicants can be placed at, each with a <code>key</code>{" "}and a{" "}
                  <code>label</code>{" "}(what people see). An applicant&apos;s <code>level</code>{" "}can match either,
                  ignoring case. Empty if
                  the intake doesn&apos;t use levels.
                </p>
              ),
            },
            {
              name: "assessmentMode",
              type: "string",
              description: (
                <p>
                  When applicants get the assessment. <code>after_form</code>: right after they fill in the
                  application form. <code>on_invite</code>: when they&apos;re sent it, by an admin or by a sync
                  with <Link href="/docs/guides/sending-assessments">sendAssessment</Link>.
                </p>
              ),
            },
            { name: "applicantCount", type: "integer", description: "How many applicants the intake has." },
            { name: "createdAt", type: "string", description: "When the intake was created (ISO 8601)." },
          ]}
        />
      </RefSplit>

      <RefSplit
        aside={
          <>
            <CodeBlock samples={listIntakesSamples} title="Request" />
            <ResponseBlock status={200} body={intakeListResponse} />
          </>
        }
      >
        <H2 id="list-intakes">List intakes</H2>
        <Endpoint method="GET" path="/intakes" />
        <p>
          Returns the intakes in the key&apos;s workspace. Requires the <code>intakes:read</code>{" "}
          scope.
        </p>
        <ParamTable
          title="Query parameters"
          params={[
            { name: "limit", type: "integer", meta: "1 to 100, default 50", description: "How many intakes per page." },
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
          ]}
        />
        <p>
          <strong>Returns</strong>{" "}a list object: <code>data</code>{" "}(an array of Intake objects),{" "}
          <code>hasMore</code>{" "}and <code>nextCursor</code>.
        </p>
      </RefSplit>

      <RefSplit
        aside={
          <>
            <CodeBlock samples={retrieveIntakeSamples} title="Request" />
            <ResponseBlock status={200} body={intakeObject} />
            <ResponseBlock
              status={404}
              title="Unknown intake"
              body={errorBody("not_found", "intake_not_found", "No intake with ID 1c8e5b7a-2f40-4d93-a6b1-7e9d0c3f5a28 in this workspace.")}
            />
          </>
        }
      >
        <H2 id="retrieve-an-intake">Retrieve an intake</H2>
        <Endpoint method="GET" path="/intakes/{intakeId}" />
        <p>
          Returns one intake. Useful for checking its <code>status</code>{" "}and <code>levels</code>{" "}before a
          sync. Requires the <code>intakes:read</code>{" "}scope.
        </p>
        <ParamTable
          title="Path parameters"
          params={[{ name: "intakeId", type: "string", required: true, description: "The intake's ID." }]}
        />
        <p>
          <strong>Returns</strong>{" "}an Intake object, or <code>404</code>{" "}with <code>intake_not_found</code>{" "}
          if there&apos;s no such intake in this workspace.
        </p>
      </RefSplit>
    </DocsPage>
  );
}
