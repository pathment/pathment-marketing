import Link from "next/link";
import { DocsPage } from "../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../components/docs/CodeBlock";
import { Callout } from "../../../components/docs/Callout";
import { H2, Table } from "../../../components/docs/Prose";
import { ParamTable } from "../../../components/docs/ParamTable";
import { docsMetadata } from "../../../lib/docs/metadata";
import { errorBody, retrySamples } from "../../../lib/docs/examples";

const HREF = "/docs/errors";
export const metadata = docsMetadata(HREF);

const c = (code: string) => <code key={code}>{code}</code>;

export default function ErrorsPage() {
  return (
    <DocsPage href={HREF}>
      <p>
        When a request fails, you get an HTTP status that says what kind of problem it is, and a JSON body
        that says exactly what went wrong. Your code can rely on both.
      </p>

      <H2 id="error-shape">The error shape</H2>
      <p>Every error response looks like this:</p>
      <ResponseBlock
        status={400}
        title="Validation error"
        body={errorBody(
          "invalid_request",
          "validation_failed",
          "records[3].email must be a string.",
          "records[3].email",
        )}
      />
      <ParamTable
        kind="attributes"
        params={[
          {
            name: "error.type",
            type: "string",
            required: true,
            description: "The broad category. It always matches the HTTP status, as in the table below.",
          },
          {
            name: "error.code",
            type: "string",
            required: true,
            description: (
              <p>
                The specific reason, such as <code>invalid_api_key</code>. Branch on this in your code.
              </p>
            ),
          },
          {
            name: "error.message",
            type: "string",
            required: true,
            description:
              "A sentence written for a person. Log it and show it to developers, but don't parse it: the wording can improve over time.",
          },
          {
            name: "error.field",
            type: "string",
            description: (
              <p>
                When the problem is one field, its path in your request body, such as{" "}
                <code>records[3].email</code>.
              </p>
            ),
          },
          {
            name: "requestId",
            type: "string",
            required: true,
            description: (
              <p>
                The ID of this request. It matches the <code>X-Request-Id</code>{" "}header.
              </p>
            ),
          },
        ]}
      />

      <H2 id="status-codes">Status codes and types</H2>
      <Table
        head={["Status", "Type", "What happened"]}
        rows={[
          ["400", c("invalid_request"), "The request is malformed or a value is invalid. Fix it before retrying."],
          ["401", c("authentication_error"), "No key, or a key that doesn't work. See Authentication."],
          ["403", c("permission_error"), "The key is valid but lacks the scope for this endpoint."],
          ["404", c("not_found"), "The intake or job doesn't exist, or belongs to another workspace."],
          ["409", c("conflict"), "An Idempotency-Key was reused with a different body."],
          ["429", c("rate_limited"), "Too many requests. Wait for Retry-After seconds, then retry."],
          ["500", c("api_error"), "Something broke on our side. Retry with backoff."],
        ]}
      />
      <p>
        Successful requests return <code>200</code>, or <code>202</code>{" "}when work has been queued, as
        with pushing applicants.
      </p>

      <H2 id="error-codes">Error codes</H2>
      <Table
        head={["Code", "Status", "What to do"]}
        rows={[
          [c("validation_failed"), "400", <>A field is missing or has the wrong type. <code>field</code>{" "}points at it.</>],
          [c("too_many_records"), "400", "You sent more than 1,000 records. Split the batch."],
          [c("invalid_json"), "400", "The body isn't valid JSON. Check quoting and the Content-Type header."],
          [c("missing_api_key"), "401", "Send Authorization: Bearer pk_live_..."],
          [c("invalid_api_key"), "401", "The key doesn't exist. Check you copied all of it."],
          [c("revoked_api_key"), "401", "The key was revoked. Use a new one."],
          [c("expired_api_key"), "401", "The key passed its expiry date. Use a new one."],
          [c("insufficient_scope"), "403", "Create a key with the scope named in the message."],
          [c("intake_not_found"), "404", "Check the intake ID, and that the key is from the same workspace."],
          [c("job_not_found"), "404", "Check the job ID, and that the key is from the same workspace."],
          [c("idempotency_key_reused"), "409", "Use a new Idempotency-Key for a different batch."],
          [c("rate_limited"), "429", "Wait for Retry-After seconds, then retry."],
          [c("internal_error"), "500", "Retry with backoff. If it keeps happening, send us the requestId."],
        ]}
      />
      <Callout type="note">
        <p>
          We may add new codes over time. Treat an unknown <code>code</code>{" "}by falling back to its{" "}
          <code>type</code>, which never changes for a given status.
        </p>
      </Callout>

      <H2 id="request-ids">Request IDs</H2>
      <p>
        Every response, successful or not, has an <code>X-Request-Id</code>{" "}header. Errors repeat it in
        the body as <code>requestId</code>. Log it alongside the error. If you ever need our help, the
        request ID lets us find exactly what happened in seconds.
      </p>

      <H2 id="record-errors">Errors inside a job</H2>
      <p>
        Pushing applicants is different. The request itself succeeds as long as the batch is well formed,
        and problems with <em>individual</em>{" "}records, like one bad email address in 500, are reported on
        the job instead. One bad record never sinks the rest of the batch.
      </p>
      <p>
        Those record-level codes (<code>invalid_email</code>, <code>duplicate_in_batch</code>{" "}and so on)
        are listed on the <Link href="/docs/api/jobs#record-error-codes">Job object</Link>.
      </p>

      <H2 id="handling-errors">Handling errors well</H2>
      <ul>
        <li>
          <strong>Don&apos;t retry 4xx errors</strong>{" "}(except 429). The same request will fail the same
          way. Fix it first.
        </li>
        <li>
          <strong>Retry 429 and 5xx</strong>{" "}with a growing wait. For 429, wait the number of seconds in{" "}
          <code>Retry-After</code>.
        </li>
        <li>
          <strong>Retry pushes with the same Idempotency-Key</strong>, so a retry can never create a second
          job.
        </li>
      </ul>
      <CodeBlock samples={retrySamples} title="Retry with backoff" />
    </DocsPage>
  );
}
