import Link from "next/link";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../../components/docs/CodeBlock";
import { Endpoint } from "../../../../components/docs/Endpoint";
import { ParamTable } from "../../../../components/docs/ParamTable";
import { H2, RefSplit } from "../../../../components/docs/Prose";
import { docsMetadata } from "../../../../lib/docs/metadata";
import { errorBody, meResponse, meSamples } from "../../../../lib/docs/examples";

const HREF = "/docs/api/me";
export const metadata = docsMetadata(HREF);

export default function MePage() {
  return (
    <DocsPage href={HREF} layout="reference">
      <RefSplit
        aside={
          <>
            <CodeBlock samples={meSamples} title="Request" />
            <ResponseBlock status={200} body={meResponse} />
            <ResponseBlock
              status={401}
              title="Revoked key"
              body={errorBody("authentication_error", "revoked_api_key", "This API key was revoked.")}
            />
          </>
        }
      >
        <H2 id="retrieve-me">Retrieve the current key</H2>
        <Endpoint method="GET" path="/me" />
        <p>
          Returns the workspace the key belongs to and the key&apos;s own details. Any valid key can call it,
          whatever its scopes, which makes it the right first call when you set up an integration and a
          good health check afterwards.
        </p>
        <p>
          It takes no parameters. If the key is missing, wrong, revoked or expired you get a{" "}
          <code>401</code>; see <Link href="/docs/authentication#auth-errors">authentication errors</Link>.
        </p>
        <ParamTable
          title="Returns"
          kind="attributes"
          params={[
            { name: "organization.id", type: "string", required: true, description: "The workspace's ID." },
            { name: "organization.name", type: "string", required: true, description: "The workspace's name, as shown in Pathment." },
            { name: "organization.slug", type: "string", required: true, description: "The short name used in the workspace's web address." },
            { name: "apiKey.id", type: "string", required: true, description: "The key's ID." },
            { name: "apiKey.name", type: "string", required: true, description: "The name the admin gave the key." },
            {
              name: "apiKey.prefix",
              type: "string",
              required: true,
              description: (
                <p>
                  The first 12 characters, such as <code>pk_live_a1b2</code>. This is what Pathment shows in
                  the API keys list, so you can tell which key is which.
                </p>
              ),
            },
            {
              name: "apiKey.scopes",
              type: "array of strings",
              required: true,
              description: (
                <p>
                  What the key may do: <code>intakes:read</code>, <code>applicants:write</code>, or both.
                </p>
              ),
            },
            {
              name: "apiKey.expiresAt",
              type: "string or null",
              required: true,
              description: "When the key stops working, or null if it never expires.",
            },
          ]}
        />
      </RefSplit>
    </DocsPage>
  );
}
