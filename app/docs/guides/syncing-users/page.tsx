import Link from "next/link";
import { DocsPage } from "../../../../components/docs/DocsPage";
import { CodeBlock, ResponseBlock } from "../../../../components/docs/CodeBlock";
import { Callout } from "../../../../components/docs/Callout";
import { H2, Table } from "../../../../components/docs/Prose";
import { docsMetadata } from "../../../../lib/docs/metadata";
import {
  jobPartialObject,
  listIntakesSamples,
  pollJobSamples,
  pushSamples,
  type Samples,
} from "../../../../lib/docs/examples";
import { API_BASE_URL as BASE } from "../../../../lib/docs/nav";

const HREF = "/docs/guides/syncing-users";
export const metadata = docsMetadata(HREF);

const syncScript: Samples = {
  curl: `# A shell script is fine for a one-off import. For a recurring sync,
# use Node.js or Python: you'll want proper batching and retries.
# people.json holds an array of up to 1,000 records.
curl ${BASE}/intakes/$INTAKE_ID/applicants -X POST \\
  -H "Authorization: Bearer $PATHMENT_API_KEY" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: $(uuidgen)" \\
  -d "{\\"records\\": $(cat people.json)}"`,
  node: `// sync.mjs: push every person from your system into one intake.
import { randomUUID } from "node:crypto";

const API = "${BASE}";
const INTAKE_ID = process.env.PATHMENT_INTAKE_ID;
const headers = {
  Authorization: \`Bearer \${process.env.PATHMENT_API_KEY}\`,
  "Content-Type": "application/json",
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function send(path, options, attempt = 0) {
  const res = await fetch(\`\${API}\${path}\`, { ...options, headers: { ...headers, ...options?.headers } });
  if ((res.status === 429 || res.status >= 500) && attempt < 5) {
    const wait = Number(res.headers.get("Retry-After")) || 2 ** attempt;
    await sleep(wait * 1000);
    return send(path, options, attempt + 1); // same body, same Idempotency-Key
  }
  const body = await res.json();
  if (!res.ok) throw new Error(\`\${body.error.code}: \${body.error.message} (\${body.requestId})\`);
  return body;
}

async function pushBatch(records) {
  const { job } = await send(\`/intakes/\${INTAKE_ID}/applicants\`, {
    method: "POST",
    headers: { "Idempotency-Key": randomUUID() }, // made once, reused by retries
    body: JSON.stringify({ records }),
  });
  let current = job;
  while (current.status === "queued" || current.status === "running") {
    await sleep(2000);
    current = await send(\`/jobs/\${job.id}\`);
  }
  return current;
}

// Your own data, shaped as Pathment fields. externalId is your ID for the person.
const people = (await loadPeopleFromYourSystem()).map((person) => ({
  externalId: String(person.id),
  email: person.email,
  firstName: person.firstName,
  lastName: person.lastName,
  level: person.level,
}));

for (let i = 0; i < people.length; i += 1000) {
  const job = await pushBatch(people.slice(i, i + 1000));
  console.log(\`Batch \${i / 1000 + 1}: \${job.status}\`, job.counts);
  for (const error of job.errors) {
    console.warn(\`  #\${i + error.index} \${error.email ?? ""} \${error.code}: \${error.message}\`);
  }
}`,
  python: `# sync.py: push every person from your system into one intake.
import os
import time
import uuid

import requests

API = "${BASE}"
INTAKE_ID = os.environ["PATHMENT_INTAKE_ID"]
session = requests.Session()
session.headers["Authorization"] = f"Bearer {os.environ['PATHMENT_API_KEY']}"


def send(method, path, attempt=0, **kwargs):
    resp = session.request(method, f"{API}{path}", timeout=60, **kwargs)
    if (resp.status_code == 429 or resp.status_code >= 500) and attempt < 5:
        wait = int(resp.headers.get("Retry-After", 0)) or 2 ** attempt
        time.sleep(wait)
        return send(method, path, attempt + 1, **kwargs)  # same body, same key
    body = resp.json()
    if not resp.ok:
        raise RuntimeError(f"{body['error']['code']}: {body['error']['message']} ({body['requestId']})")
    return body


def push_batch(records):
    key = str(uuid.uuid4())  # made once, reused by retries
    job = send(
        "POST",
        f"/intakes/{INTAKE_ID}/applicants",
        headers={"Idempotency-Key": key},
        json={"records": records},
    )["job"]
    while job["status"] in ("queued", "running"):
        time.sleep(2)
        job = send("GET", f"/jobs/{job['id']}")
    return job


# Your own data, shaped as Pathment fields. externalId is your ID for the person.
people = [
    {
        "externalId": str(person["id"]),
        "email": person["email"],
        "firstName": person["first_name"],
        "lastName": person["last_name"],
        "level": person["level"],
    }
    for person in load_people_from_your_system()
]

for start in range(0, len(people), 1000):
    job = push_batch(people[start : start + 1000])
    print(f"Batch {start // 1000 + 1}: {job['status']}", job["counts"])
    for error in job["errors"]:
        print(f"  #{start + error['index']} {error.get('email') or ''} {error['code']}: {error['message']}")`,
};

export default function SyncingUsersPage() {
  return (
    <DocsPage href={HREF}>
      <H2 id="the-push-model">The push model</H2>
      <p>
        In v1, your system does the sending. Whenever you have people Pathment should know about, you push
        them to an intake. Pathment works out who is new and who it already has, and reports back.
      </p>
      <p>That gives you one simple loop:</p>
      <ol>
        <li>Collect the people from your system.</li>
        <li>Send them in batches of up to 1,000.</li>
        <li>Wait for each job to finish and read its report.</li>
        <li>Do it again whenever your data changes. Repeats are safe.</li>
      </ol>
      <p>
        You can run that once to import a list, or on a schedule (every hour, every night) to keep
        Pathment in step with a system that keeps changing.
      </p>

      <H2 id="pick-the-intake">1. Pick the intake</H2>
      <p>
        Applicants always belong to an intake: one admissions round of one programme. List your intakes
        and note the <code>id</code>{" "}of the one you&apos;re filling.
      </p>
      <CodeBlock samples={listIntakesSamples} title="GET /intakes" />
      <p>
        Look at its <code>levels</code>{" "}too. If the intake has levels (say <code>beginner</code>{" "}and{" "}
        <code>senior</code>), each person&apos;s <code>level</code>{" "}must match one of them by key or label,
        ignoring case, and it decides
        which assessment they get.
      </p>
      <Callout type="tip">
        <p>
          Store the intake ID in config, not in code. When the next round opens, you change one setting
          rather than redeploying.
        </p>
      </Callout>

      <H2 id="shape-the-records">2. Shape the records</H2>
      <p>You have two choices.</p>
      <p>
        <strong>Use Pathment&apos;s field names.</strong>{" "}Build each record with <code>email</code>,{" "}
        <code>firstName</code>, <code>lastName</code>, <code>phone</code>, <code>level</code>,{" "}
        <code>country</code>{" "}and <code>externalId</code>. Anything else you include is kept under{" "}
        <code>responses</code>, where reviewers can see it. Nothing is dropped.
      </p>
      <CodeBlock
        language="json"
        title="A record in Pathment's shape"
        code={`{
  "externalId": "u_1042",
  "email": "ada@example.com",
  "firstName": "Ada",
  "lastName": "Okafor",
  "phone": "+447700900123",
  "level": "senior",
  "country": "GB",
  "responses": { "github": "ada-okafor" },
  "cohortPreference": "evenings"
}`}
      />
      <p>
        Here <code>cohortPreference</code>{" "}isn&apos;t a Pathment field, so it ends up in{" "}
        <code>responses</code>{" "}next to <code>github</code>.
      </p>
      <p>
        <strong>Or send your own shape and let a connection map it.</strong>{" "}Set up a{" "}
        <Link href="/docs/guides/field-mapping">connection</Link>{" "}in Pathment once, then send records
        exactly as your system stores them, with <code>&quot;connection&quot;: &quot;&lt;connection ID&gt;&quot;</code>{" "}
        in the body. This is the better choice if a non-developer should be able to adjust the mapping
        later.
      </p>
      <Callout type="warning" title="Always send externalId">
        <p>
          <code>externalId</code>{" "}is your own ID for the person, such as the row ID in your CRM. It&apos;s
          optional, but strongly recommended: it&apos;s how Pathment recognises the same person next time,
          even if they change their email. See{" "}
          <Link href="/docs/guides/matching-and-updates">Matching and updates</Link>.
        </p>
      </Callout>

      <H2 id="send-in-batches">3. Send in batches</H2>
      <p>
        Send up to 1,000 records per request to{" "}
        <code>POST /intakes/&#123;intakeId&#125;/applicants</code>, each with its own{" "}
        <code>Idempotency-Key</code>.
      </p>
      <CodeBlock samples={pushSamples} title="POST /intakes/{intakeId}/applicants" />
      <p>
        You get <code>202 Accepted</code>{" "}and a job straight away. A well-formed request is accepted even
        if some records inside it are wrong. Those are reported on the job, one by one, so a single bad
        email never holds up the other 999.
      </p>
      <p>
        If the request itself is wrong (not JSON, more than 1,000 records, no <code>records</code>{" "}array)
        you get a <code>400</code>{" "}and nothing is queued.
      </p>

      <H2 id="wait-for-the-job">4. Wait for the job</H2>
      <p>
        Poll <code>GET /jobs/&#123;jobId&#125;</code>{" "}every 2 seconds until <code>status</code>{" "}is{" "}
        <code>succeeded</code>, <code>partial</code>{" "}or <code>failed</code>.
      </p>
      <CodeBlock samples={pollJobSamples} title="Poll the job" />
      <Callout type="tip" title="Rather not poll?">
        <p>
          Subscribe a <Link href="/docs/guides/webhooks">webhook</Link>{" "}endpoint to{" "}
          <Link href="/docs/api/webhook-events#sync-job-completed">
            <code>sync.job.completed</code>
          </Link>
          . Pathment sends you the finished job, counts and errors included, as soon as it&apos;s done,
          whatever its status.
        </p>
      </Callout>
      <p>A finished job tells you what happened to every record:</p>
      <ResponseBlock status={200} title="A partial job" body={jobPartialObject} />
      <Table
        head={["Count", "Meaning"]}
        rows={[
          [<code key="c">created</code>, "New applicants, now at the Added stage."],
          [<code key="c">updated</code>, "People Pathment already had, with at least one field changed."],
          [<code key="c">unchanged</code>, "People Pathment already had, with nothing new to change."],
          [<code key="c">skipped</code>, "Records deliberately left alone, such as a withdrawn applicant."],
          [<code key="c">failed</code>, "Records with a problem. Each one is listed in errors."],
        ]}
      />
      <p>
        Each entry in <code>errors</code>{" "}has the record&apos;s <code>index</code>{" "}in your batch (counting
        from 0), its <code>externalId</code>{" "}and <code>email</code>, and a <code>code</code>{" "}and{" "}
        <code>message</code>. Log these, fix the source data, and the next sync picks them up.
      </p>
      <Table
        head={["Record code", "What to do"]}
        rows={[
          [<code key="c">missing_email</code>, "Every record needs an email. Check the source, or your mapping."],
          [<code key="c">invalid_email</code>, "Fix the address in your system."],
          [<code key="c">invalid_level</code>, "The value matches none of the intake's levels by key or label (ignoring case). Fix it at the source, or map your values in a connection."],
          [<code key="c">duplicate_in_batch</code>, "The same person appears twice in this batch. Send them once."],
          [<code key="c">applicant_closed</code>, "This person was rejected, withdrew or was removed. Nothing to do: they stay closed."],
          [
            <code key="c">intake_full</code>,
            "The intake has reached its application cap, so new people aren't added; each one counts as failed. Updates to people already in it still go through. An admin can raise the cap in the app.",
          ],
          [<code key="c">mapping_failed</code>, "The connection's mapping couldn't read this record. Check the rule named in the message."],
        ]}
      />
      <Callout type="note" title="When an intake fills up">
        <p>
          If an intake has an application cap, new people stop being added once it&apos;s reached. They come
          back on the job as <code>intake_full</code>{" "}errors and are counted in <code>failed</code>, while updates to existing applicants carry on as
          normal. Raise the cap in Pathment, then run the sync again: the waiting people are added and
          everyone else comes back <code>unchanged</code>.
        </p>
      </Callout>

      <H2 id="keep-in-sync">5. Keep them in sync</H2>
      <p>
        Run the same sync again whenever your data changes. You don&apos;t need to work out who&apos;s new:
        send everyone in scope and Pathment sorts it out.
      </p>
      <ul>
        <li>New people are created.</li>
        <li>People whose details changed in your system are updated.</li>
        <li>
          People already in Pathment with nothing new come back <code>unchanged</code>.
        </li>
        <li>
          People missing from a later batch are left exactly as they are. A sync never deletes anyone.
        </li>
        <li>
          If an admin edited someone&apos;s details in Pathment, the sync doesn&apos;t overwrite them.
        </li>
      </ul>
      <p>
        The rules behind this are in <Link href="/docs/guides/matching-and-updates">Matching and updates</Link>.
        To read back where everyone is, list applicants with{" "}
        <Link href="/docs/pagination#incremental-reads">updatedSince</Link>.
      </p>

      <H2 id="example-sync">A complete sync script</H2>
      <p>
        Here&apos;s everything together: batching, an idempotency key per batch, retries for{" "}
        <code>429</code>{" "}and <code>5xx</code>, polling and error reporting. Swap{" "}
        <code>loadPeopleFromYourSystem</code>{" "}for your own query.
      </p>
      <CodeBlock samples={syncScript} title="sync" />

      <H2 id="checklist">Before you go live</H2>
      <ul>
        <li>The key has only the scopes it needs and lives in a secret store.</li>
        <li>
          Every record has an <code>externalId</code>.
        </li>
        <li>
          Level values match the intake&apos;s levels (by key or label), directly or through a{" "}
          <Link href="/docs/guides/field-mapping#value-maps">value map</Link>.
        </li>
        <li>
          You&apos;ve run the sync as a <Link href="/docs/guides/dry-runs-and-reports">dry run</Link>{" "}and the
          report looks right.
        </li>
        <li>Retries reuse the batch&apos;s Idempotency-Key.</li>
        <li>
          Someone looks at job errors. A log line nobody reads is the same as no log line.
        </li>
      </ul>
    </DocsPage>
  );
}
