/**
 * Code samples and example objects shared across the docs. Everything here
 * uses made-up people (example.com addresses, Ofcom drama phone numbers) and
 * placeholder IDs. Keys always come from the PATHMENT_API_KEY env var.
 */
import type { CodeLanguage } from "./language";
import { API_BASE_URL as BASE } from "./nav";

export type Samples = Record<CodeLanguage, string>;

export const INTAKE_ID = "7957933d-7cc7-495c-b367-92b756b57b3e";
export const JOB_ID = "3f1d8a52-0c6e-4b9a-a7d4-5e2b91c07f38";
export const CONNECTION_ID = "c2a9f6e1-4d38-4b7c-8e05-913fd2b6a7c0";
export const IDEMPOTENCY_KEY = "6f1c2a9e-4b7d-4c1e-9a53-2f8d0b7e1c44";

const PY_HEADERS = `HEADERS = {"Authorization": f"Bearer {os.environ['PATHMENT_API_KEY']}"}`;
const NODE_HEADERS = "const headers = { Authorization: `Bearer ${process.env.PATHMENT_API_KEY}` };";

function getSamples(path: string, read: { node: string; python: string }): Samples {
  return {
    curl: `curl ${BASE}${path} \\
  -H "Authorization: Bearer $PATHMENT_API_KEY"`,
    node: `${NODE_HEADERS}

const res = await fetch("${BASE}${path}", { headers });
const body = await res.json();
${read.node}`,
    python: `import os
import requests

${PY_HEADERS}

resp = requests.get("${BASE}${path}", headers=HEADERS, timeout=30)
resp.raise_for_status()
body = resp.json()
${read.python}`,
  };
}

/* ----------------------------------------------------------------------------
   Requests
---------------------------------------------------------------------------- */

export const meSamples = getSamples("/me", {
  node: "console.log(body.organization.name, body.apiKey.scopes);",
  python: 'print(body["organization"]["name"], body["apiKey"]["scopes"])',
});

export const listIntakesSamples: Samples = {
  curl: `curl "${BASE}/intakes?limit=20" \\
  -H "Authorization: Bearer $PATHMENT_API_KEY"`,
  node: `${NODE_HEADERS}

const res = await fetch("${BASE}/intakes?limit=20", { headers });
const { data, hasMore, nextCursor } = await res.json();

for (const intake of data) {
  console.log(intake.id, intake.name, intake.status);
}`,
  python: `import os
import requests

${PY_HEADERS}

resp = requests.get(
    "${BASE}/intakes",
    headers=HEADERS,
    params={"limit": 20},
    timeout=30,
)
resp.raise_for_status()
page = resp.json()

for intake in page["data"]:
    print(intake["id"], intake["name"], intake["status"])`,
};

export const retrieveIntakeSamples = getSamples(`/intakes/${INTAKE_ID}`, {
  node: "console.log(body.name, body.levels.map((level) => level.key));",
  python: 'print(body["name"], [level["key"] for level in body["levels"]])',
});

const TWO_RECORDS_JSON = `[
      {
        "externalId": "u_1042",
        "email": "ada@example.com",
        "firstName": "Ada",
        "lastName": "Okafor",
        "level": "senior"
      },
      {
        "externalId": "u_1043",
        "email": "bo@example.com",
        "firstName": "Bo",
        "lastName": "Lindqvist",
        "level": "beginner"
      }
    ]`;

export const pushSamples: Samples = {
  curl: `curl ${BASE}/intakes/${INTAKE_ID}/applicants \\
  -X POST \\
  -H "Authorization: Bearer $PATHMENT_API_KEY" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: ${IDEMPOTENCY_KEY}" \\
  -d '{
    "records": ${TWO_RECORDS_JSON}
  }'`,
  node: `import { randomUUID } from "node:crypto";

const res = await fetch("${BASE}/intakes/${INTAKE_ID}/applicants", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.PATHMENT_API_KEY}\`,
    "Content-Type": "application/json",
    // One key per batch. Reuse it if you retry this exact batch.
    "Idempotency-Key": randomUUID(),
  },
  body: JSON.stringify({
    records: [
      { externalId: "u_1042", email: "ada@example.com", firstName: "Ada", lastName: "Okafor", level: "senior" },
      { externalId: "u_1043", email: "bo@example.com", firstName: "Bo", lastName: "Lindqvist", level: "beginner" },
    ],
  }),
});

const { job } = await res.json();
console.log(res.status, job.id, job.status); // 202 <job id> queued`,
  python: `import os
import uuid
import requests

resp = requests.post(
    "${BASE}/intakes/${INTAKE_ID}/applicants",
    headers={
        "Authorization": f"Bearer {os.environ['PATHMENT_API_KEY']}",
        # One key per batch. Reuse it if you retry this exact batch.
        "Idempotency-Key": str(uuid.uuid4()),
    },
    json={
        "records": [
            {"externalId": "u_1042", "email": "ada@example.com", "firstName": "Ada", "lastName": "Okafor", "level": "senior"},
            {"externalId": "u_1043", "email": "bo@example.com", "firstName": "Bo", "lastName": "Lindqvist", "level": "beginner"},
        ]
    },
    timeout=30,
)
resp.raise_for_status()
job = resp.json()["job"]
print(resp.status_code, job["id"], job["status"])  # 202 <job id> queued`,
};

/** A push in the sender's own shape, mapped by a connection, with assessments on. */
export const pushWithConnectionSamples: Samples = {
  curl: `curl ${BASE}/intakes/${INTAKE_ID}/applicants \\
  -X POST \\
  -H "Authorization: Bearer $PATHMENT_API_KEY" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: ${IDEMPOTENCY_KEY}" \\
  -d '{
    "connection": "${CONNECTION_ID}",
    "sendAssessment": true,
    "records": [
      {
        "id": 1042,
        "full_name": "Ada Okafor",
        "user": { "email_address": "Ada@Example.com" },
        "mobile": "+44 7700 900123",
        "track": "Advanced"
      }
    ]
  }'`,
  node: `import { randomUUID } from "node:crypto";

const res = await fetch("${BASE}/intakes/${INTAKE_ID}/applicants", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.PATHMENT_API_KEY}\`,
    "Content-Type": "application/json",
    "Idempotency-Key": randomUUID(),
  },
  body: JSON.stringify({
    connection: "${CONNECTION_ID}",
    sendAssessment: true,
    // Records exactly as your system stores them. The connection maps them.
    records: crmRows,
  }),
});
const { job } = await res.json();`,
  python: `import os
import uuid
import requests

resp = requests.post(
    "${BASE}/intakes/${INTAKE_ID}/applicants",
    headers={
        "Authorization": f"Bearer {os.environ['PATHMENT_API_KEY']}",
        "Idempotency-Key": str(uuid.uuid4()),
    },
    json={
        "connection": "${CONNECTION_ID}",
        "sendAssessment": True,
        # Records exactly as your system stores them. The connection maps them.
        "records": crm_rows,
    },
    timeout=30,
)
resp.raise_for_status()
job = resp.json()["job"]`,
};

export const dryRunSamples: Samples = {
  curl: `curl ${BASE}/intakes/${INTAKE_ID}/applicants \\
  -X POST \\
  -H "Authorization: Bearer $PATHMENT_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "connection": "${CONNECTION_ID}",
    "dryRun": true,
    "records": [ ... ]
  }'`,
  node: `const res = await fetch("${BASE}/intakes/${INTAKE_ID}/applicants", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.PATHMENT_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    connection: "${CONNECTION_ID}",
    dryRun: true,
    records,
  }),
});
const { job } = await res.json();
// Poll GET /jobs/{id} as usual, then read job.counts and job.errors.`,
  python: `resp = requests.post(
    "${BASE}/intakes/${INTAKE_ID}/applicants",
    headers=HEADERS,
    json={
        "connection": "${CONNECTION_ID}",
        "dryRun": True,
        "records": records,
    },
    timeout=30,
)
resp.raise_for_status()
job = resp.json()["job"]
# Poll GET /jobs/{id} as usual, then read job["counts"] and job["errors"].`,
};

export const listApplicantsSamples: Samples = {
  curl: `curl "${BASE}/intakes/${INTAKE_ID}/applicants?stage=submitted&limit=50" \\
  -H "Authorization: Bearer $PATHMENT_API_KEY"`,
  node: `${NODE_HEADERS}

const url = new URL("${BASE}/intakes/${INTAKE_ID}/applicants");
url.searchParams.set("stage", "submitted");
url.searchParams.set("limit", "50");

const res = await fetch(url, { headers });
const { data } = await res.json();
for (const applicant of data) {
  console.log(applicant.email, applicant.stage, applicant.status);
}`,
  python: `import os
import requests

${PY_HEADERS}

resp = requests.get(
    "${BASE}/intakes/${INTAKE_ID}/applicants",
    headers=HEADERS,
    params={"stage": "submitted", "limit": 50},
    timeout=30,
)
resp.raise_for_status()
for applicant in resp.json()["data"]:
    print(applicant["email"], applicant["stage"], applicant["status"])`,
};

export const retrieveJobSamples = getSamples(`/jobs/${JOB_ID}`, {
  node: "console.log(body.status, body.counts);",
  python: 'print(body["status"], body["counts"])',
});

export const pollJobSamples: Samples = {
  curl: `# Run until "status" is succeeded, partial or failed.
while true; do
  status=$(curl -s ${BASE}/jobs/${JOB_ID} \\
    -H "Authorization: Bearer $PATHMENT_API_KEY" | jq -r .status)
  echo "$status"
  case "$status" in queued|running) sleep 2 ;; *) break ;; esac
done`,
  node: `${NODE_HEADERS}

async function waitForJob(jobId) {
  while (true) {
    const res = await fetch(\`${BASE}/jobs/\${jobId}\`, { headers });
    const job = await res.json();
    if (job.status !== "queued" && job.status !== "running") return job;
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

const job = await waitForJob("${JOB_ID}");
console.log(job.status, job.counts);`,
  python: `import os
import time
import requests

${PY_HEADERS}

def wait_for_job(job_id):
    while True:
        resp = requests.get(f"${BASE}/jobs/{job_id}", headers=HEADERS, timeout=30)
        resp.raise_for_status()
        job = resp.json()
        if job["status"] not in ("queued", "running"):
            return job
        time.sleep(2)

job = wait_for_job("${JOB_ID}")
print(job["status"], job["counts"])`,
};

export const paginateSamples: Samples = {
  curl: `# First page
curl "${BASE}/intakes/${INTAKE_ID}/applicants?limit=100" \\
  -H "Authorization: Bearer $PATHMENT_API_KEY"

# Next page: pass nextCursor from the previous response
curl "${BASE}/intakes/${INTAKE_ID}/applicants?limit=100&cursor=eyJpZCI6ImFwcF9rM0o5eFAifQ" \\
  -H "Authorization: Bearer $PATHMENT_API_KEY"`,
  node: `${NODE_HEADERS}

async function listAll(path, params = {}) {
  const results = [];
  let cursor;
  do {
    const url = new URL(\`${BASE}\${path}\`);
    url.searchParams.set("limit", "100");
    for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
    if (cursor) url.searchParams.set("cursor", cursor);

    const res = await fetch(url, { headers });
    const page = await res.json();
    results.push(...page.data);
    cursor = page.hasMore ? page.nextCursor : undefined;
  } while (cursor);
  return results;
}

const applicants = await listAll("/intakes/${INTAKE_ID}/applicants");
console.log(applicants.length);`,
  python: `import os
import requests

${PY_HEADERS}

def list_all(path, **params):
    results, cursor = [], None
    while True:
        query = {"limit": 100, **params}
        if cursor:
            query["cursor"] = cursor
        resp = requests.get(f"${BASE}{path}", headers=HEADERS, params=query, timeout=30)
        resp.raise_for_status()
        page = resp.json()
        results.extend(page["data"])
        if not page["hasMore"]:
            return results
        cursor = page["nextCursor"]

applicants = list_all("/intakes/${INTAKE_ID}/applicants")
print(len(applicants))`,
};

export const updatedSinceSamples: Samples = {
  curl: `curl "${BASE}/intakes/${INTAKE_ID}/applicants?updatedSince=2026-11-18T00:00:00Z" \\
  -H "Authorization: Bearer $PATHMENT_API_KEY"`,
  node: `// Save the time *before* you start reading, so nothing slips through the gap.
const startedAt = new Date().toISOString();
// listAll is the helper from "Walking every page" above.
const changed = await listAll("/intakes/${INTAKE_ID}/applicants", { updatedSince: lastRunAt });
await saveCheckpoint(startedAt);`,
  python: `from datetime import datetime, timezone

# list_all is the helper from "Walking every page" above.
# Save the time *before* you start reading, so nothing slips through the gap.
started_at = datetime.now(timezone.utc).isoformat()
changed = list_all("/intakes/${INTAKE_ID}/applicants", updatedSince=last_run_at)
save_checkpoint(started_at)`,
};

export const retrySamples: Samples = {
  curl: `# curl can retry on 429 and 5xx for you, honouring Retry-After.
curl ${BASE}/me \\
  --retry 5 --retry-all-errors \\
  -H "Authorization: Bearer $PATHMENT_API_KEY"`,
  node: `async function request(url, options = {}, attempt = 0) {
  const res = await fetch(url, options);
  const retryable = res.status === 429 || res.status >= 500;
  if (!retryable || attempt >= 5) return res;

  // Prefer the server's hint. Otherwise back off: 1s, 2s, 4s, 8s, 16s.
  const retryAfter = Number(res.headers.get("Retry-After"));
  const waitMs = retryAfter > 0 ? retryAfter * 1000 : 1000 * 2 ** attempt;
  await new Promise((resolve) => setTimeout(resolve, waitMs));
  return request(url, options, attempt + 1);
}`,
  python: `import time
import requests

def request(method, url, attempt=0, **kwargs):
    resp = requests.request(method, url, timeout=30, **kwargs)
    retryable = resp.status_code == 429 or resp.status_code >= 500
    if not retryable or attempt >= 5:
        return resp

    # Prefer the server's hint. Otherwise back off: 1s, 2s, 4s, 8s, 16s.
    retry_after = int(resp.headers.get("Retry-After", 0))
    time.sleep(retry_after if retry_after > 0 else 2 ** attempt)
    return request(method, url, attempt + 1, **kwargs)`,
};

/* ----------------------------------------------------------------------------
   Objects and responses
---------------------------------------------------------------------------- */

export const meResponse = `{
  "organization": {
    "id": "4b6c1e90-8a2f-4d57-93c1-6fe0d8a2b475",
    "name": "Northwind Fellowship",
    "slug": "northwind"
  },
  "apiKey": {
    "id": "e0f3a7c4-5b19-4e62-8d0a-a41c9b7e3d56",
    "name": "CRM sync",
    "prefix": "pk_live_a1b2",
    "scopes": ["intakes:read", "applicants:write"],
    "expiresAt": null
  }
}`;

export const intakeObject = `{
  "id": "${INTAKE_ID}",
  "name": "Spring 2027 cohort",
  "programme": {
    "id": "61d9e2b8-3c4a-4f0e-b7a5-c8e1f04d9a23",
    "name": "Northwind Engineering Fellowship"
  },
  "status": "open",
  "levels": [
    { "key": "beginner", "label": "Beginner" },
    { "key": "senior", "label": "Senior" }
  ],
  "assessmentMode": "on_invite",
  "applicantCount": 128,
  "createdAt": "2026-10-02T09:14:00Z"
}`;

export const intakeListResponse = `{
  "data": [
    {
      "id": "${INTAKE_ID}",
      "name": "Spring 2027 cohort",
      "programme": { "id": "61d9e2b8-3c4a-4f0e-b7a5-c8e1f04d9a23", "name": "Northwind Engineering Fellowship" },
      "status": "open",
      "levels": [
        { "key": "beginner", "label": "Beginner" },
        { "key": "senior", "label": "Senior" }
      ],
      "assessmentMode": "on_invite",
      "applicantCount": 128,
      "createdAt": "2026-10-02T09:14:00Z"
    }
  ],
  "hasMore": false,
  "nextCursor": null
}`;

export const applicantObject = `{
  "id": "9e47b0d3-1f25-4c8a-b6e9-0d7a3c5f2e81",
  "intakeId": "${INTAKE_ID}",
  "externalId": "u_1042",
  "email": "ada@example.com",
  "firstName": "Ada",
  "lastName": "Okafor",
  "phone": "+447700900123",
  "level": "senior",
  "country": "GB",
  "status": "assessment_sent",
  "stage": "in_progress",
  "responses": {
    "github": "ada-okafor",
    "heardAboutUs": "Spring meetup"
  },
  "source": "api",
  "createdAt": "2026-11-19T10:02:11Z",
  "updatedAt": "2026-11-19T14:40:03Z"
}`;

export const applicantListResponse = `{
  "data": [
    {
      "id": "9e47b0d3-1f25-4c8a-b6e9-0d7a3c5f2e81",
      "intakeId": "${INTAKE_ID}",
      "externalId": "u_1042",
      "email": "ada@example.com",
      "firstName": "Ada",
      "lastName": "Okafor",
      "phone": "+447700900123",
      "level": "senior",
      "country": "GB",
      "status": "under_review",
      "stage": "submitted",
      "responses": { "github": "ada-okafor" },
      "source": "api",
      "createdAt": "2026-11-19T10:02:11Z",
      "updatedAt": "2026-11-21T08:15:47Z"
    }
  ],
  "hasMore": true,
  "nextCursor": "eyJpZCI6ImFwcF9rM0o5eFAifQ"
}`;

export const jobQueuedResponse = `{
  "job": {
    "id": "${JOB_ID}",
    "status": "queued",
    "dryRun": false,
    "intakeId": "${INTAKE_ID}",
    "connection": null,
    "total": 2,
    "counts": { "created": 0, "updated": 0, "unchanged": 0, "skipped": 0, "failed": 0 },
    "assessmentsSent": 0,
    "errors": [],
    "createdAt": "2026-11-19T10:02:09Z",
    "startedAt": null,
    "finishedAt": null
  }
}`;

export const jobSucceededObject = `{
  "id": "${JOB_ID}",
  "status": "succeeded",
  "dryRun": false,
  "intakeId": "${INTAKE_ID}",
  "connection": null,
  "total": 2,
  "counts": { "created": 2, "updated": 0, "unchanged": 0, "skipped": 0, "failed": 0 },
  "assessmentsSent": 0,
  "errors": [],
  "createdAt": "2026-11-19T10:02:09Z",
  "startedAt": "2026-11-19T10:02:10Z",
  "finishedAt": "2026-11-19T10:02:11Z"
}`;

export const jobPartialObject = `{
  "id": "${JOB_ID}",
  "status": "partial",
  "dryRun": false,
  "intakeId": "${INTAKE_ID}",
  "connection": "${CONNECTION_ID}",
  "total": 250,
  "counts": {
    "created": 212,
    "updated": 30,
    "unchanged": 5,
    "skipped": 1,
    "failed": 2
  },
  "assessmentsSent": 212,
  "errors": [
    {
      "index": 3,
      "externalId": "u_93",
      "email": "grace@example",
      "field": "email",
      "code": "invalid_email",
      "message": "\\"grace@example\\" is not a valid email address."
    },
    {
      "index": 118,
      "externalId": "u_207",
      "email": "lin@example.com",
      "field": "level",
      "code": "invalid_level",
      "message": "\\"expert\\" is not one of this intake's levels: beginner, senior."
    },
    {
      "index": 201,
      "externalId": "u_311",
      "email": "sam@example.com",
      "field": null,
      "code": "applicant_closed",
      "message": "This applicant was withdrawn, so the record was skipped."
    }
  ],
  "createdAt": "2026-11-19T10:02:09Z",
  "startedAt": "2026-11-19T10:02:10Z",
  "finishedAt": "2026-11-19T10:02:24Z"
}`;

export const dryRunJobObject = `{
  "id": "b84e2c19-6a07-4f53-9d1e-27c5a0f8e6d4",
  "status": "partial",
  "dryRun": true,
  "intakeId": "${INTAKE_ID}",
  "connection": "${CONNECTION_ID}",
  "total": 500,
  "counts": { "created": 461, "updated": 0, "unchanged": 0, "skipped": 0, "failed": 39 },
  "assessmentsSent": 0,
  "errors": [
    {
      "index": 12,
      "externalId": "1191",
      "email": null,
      "field": "email",
      "code": "missing_email",
      "message": "No email after mapping. The rule reads user.email_address, which is empty."
    }
  ],
  "createdAt": "2026-11-19T09:40:00Z",
  "startedAt": "2026-11-19T09:40:01Z",
  "finishedAt": "2026-11-19T09:40:06Z"
}`;

export function errorBody(type: string, code: string, message: string, field?: string) {
  const fieldLine = field ? `\n    "field": "${field}",` : "";
  return `{
  "error": {
    "type": "${type}",
    "code": "${code}",${fieldLine}
    "message": "${message}"
  },
  "requestId": "2d7f4c1a-9b3e-4a68-8c52-e6a0b9d1f374"
}`;
}

/* ----------------------------------------------------------------------------
   Quickstart: the whole flow in one script
---------------------------------------------------------------------------- */

export const quickstartScript: Samples = {
  curl: `#!/usr/bin/env bash
# quickstart.sh: needs curl and jq. Run with: bash quickstart.sh
set -euo pipefail
API="${BASE}"
AUTH="Authorization: Bearer $PATHMENT_API_KEY"

# 1. Who am I?
curl -sf "$API/me" -H "$AUTH" | jq '{workspace: .organization.name, scopes: .apiKey.scopes}'

# 2. Pick the first open intake.
INTAKE_ID=$(curl -sf "$API/intakes" -H "$AUTH" \\
  | jq -r '[.data[] | select(.status == "open")][0].id')
echo "Using intake $INTAKE_ID"

# 3. Push two applicants. Keep the key: reuse it if you have to retry.
IDEMPOTENCY_KEY=$(uuidgen)
JOB_ID=$(curl -sf "$API/intakes/$INTAKE_ID/applicants" -X POST \\
  -H "$AUTH" -H "Content-Type: application/json" \\
  -H "Idempotency-Key: $IDEMPOTENCY_KEY" \\
  -d '{"records": [
    {"externalId": "u_1042", "email": "ada@example.com", "firstName": "Ada", "lastName": "Okafor"},
    {"externalId": "u_1043", "email": "bo@example.com", "firstName": "Bo", "lastName": "Lindqvist"}
  ]}' | jq -r .job.id)
echo "Job $JOB_ID queued"

# 4. Poll every 2 seconds until the job has finished.
while true; do
  JOB=$(curl -sf "$API/jobs/$JOB_ID" -H "$AUTH")
  STATUS=$(echo "$JOB" | jq -r .status)
  case "$STATUS" in queued|running) sleep 2 ;; *) break ;; esac
done
echo "$JOB" | jq '{status, counts, errors}'`,
  node: `// quickstart.mjs: Node 18 or newer. Run with: node quickstart.mjs
import { randomUUID } from "node:crypto";

const API = "${BASE}";
const headers = {
  Authorization: \`Bearer \${process.env.PATHMENT_API_KEY}\`,
  "Content-Type": "application/json",
};

async function call(path, options = {}) {
  const res = await fetch(\`\${API}\${path}\`, { ...options, headers: { ...headers, ...options.headers } });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(\`\${res.status} \${body.error.code}: \${body.error.message} (request \${body.requestId})\`);
  }
  return body;
}

// 1. Who am I?
const me = await call("/me");
console.log(\`Workspace: \${me.organization.name}. Scopes: \${me.apiKey.scopes.join(", ")}\`);

// 2. Pick the first open intake.
const intakes = await call("/intakes");
const intake = intakes.data.find((item) => item.status === "open");
if (!intake) throw new Error("No open intake. Open one in Pathment first.");
console.log(\`Using intake \${intake.name} (\${intake.id})\`);

// 3. Push two applicants. Keep the key: reuse it if you have to retry.
const { job } = await call(\`/intakes/\${intake.id}/applicants\`, {
  method: "POST",
  headers: { "Idempotency-Key": randomUUID() },
  body: JSON.stringify({
    records: [
      { externalId: "u_1042", email: "ada@example.com", firstName: "Ada", lastName: "Okafor" },
      { externalId: "u_1043", email: "bo@example.com", firstName: "Bo", lastName: "Lindqvist" },
    ],
  }),
});
console.log(\`Job \${job.id} is \${job.status}\`);

// 4. Poll every 2 seconds until the job has finished.
let current = job;
while (current.status === "queued" || current.status === "running") {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  current = await call(\`/jobs/\${job.id}\`);
}

console.log(\`Finished: \${current.status}\`, current.counts);
for (const error of current.errors) {
  console.log(\`  record \${error.index} (\${error.email}): \${error.code}, \${error.message}\`);
}`,
  python: `# quickstart.py: Python 3.8+ with requests. Run with: python quickstart.py
import os
import time
import uuid

import requests

API = "${BASE}"
session = requests.Session()
session.headers["Authorization"] = f"Bearer {os.environ['PATHMENT_API_KEY']}"


def call(method, path, **kwargs):
    resp = session.request(method, f"{API}{path}", timeout=30, **kwargs)
    body = resp.json()
    if not resp.ok:
        error = body["error"]
        raise RuntimeError(
            f"{resp.status_code} {error['code']}: {error['message']} (request {body['requestId']})"
        )
    return body


# 1. Who am I?
me = call("GET", "/me")
print(f"Workspace: {me['organization']['name']}. Scopes: {', '.join(me['apiKey']['scopes'])}")

# 2. Pick the first open intake.
intakes = call("GET", "/intakes")["data"]
intake = next((item for item in intakes if item["status"] == "open"), None)
if intake is None:
    raise SystemExit("No open intake. Open one in Pathment first.")
print(f"Using intake {intake['name']} ({intake['id']})")

# 3. Push two applicants. Keep the key: reuse it if you have to retry.
job = call(
    "POST",
    f"/intakes/{intake['id']}/applicants",
    headers={"Idempotency-Key": str(uuid.uuid4())},
    json={
        "records": [
            {"externalId": "u_1042", "email": "ada@example.com", "firstName": "Ada", "lastName": "Okafor"},
            {"externalId": "u_1043", "email": "bo@example.com", "firstName": "Bo", "lastName": "Lindqvist"},
        ]
    },
)["job"]
print(f"Job {job['id']} is {job['status']}")

# 4. Poll every 2 seconds until the job has finished.
while job["status"] in ("queued", "running"):
    time.sleep(2)
    job = call("GET", f"/jobs/{job['id']}")

print(f"Finished: {job['status']}", job["counts"])
for error in job["errors"]:
    print(f"  record {error['index']} ({error['email']}): {error['code']}, {error['message']}")`,
};

export const mappingExample = `{
  "fields": {
    "email":      { "from": "user.email_address", "transform": "lowercase" },
    "firstName":  { "from": "full_name", "transform": "first_name" },
    "lastName":   { "from": "full_name", "transform": "last_name" },
    "phone":      { "from": "mobile", "transform": "digits" },
    "level":      { "from": "track", "map": { "Beginner": "beginner", "Advanced": "senior" }, "default": "beginner" },
    "externalId": { "from": "id" }
  },
  "keepUnmapped": true
}`;
