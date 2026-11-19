/**
 * Samples for the read API: programmes, clans, mentees and progress. Same
 * rules as examples.ts: made-up people, UUIDs that stay consistent across
 * pages, keys from the PATHMENT_API_KEY env var.
 */
import type { Samples } from "./examples";
import { API_BASE_URL as BASE } from "./nav";

export const PROGRAMME_ID = "61d9e2b8-3c4a-4f0e-b7a5-c8e1f04d9a23";
export const PROGRAMME_NAME = "Northwind Engineering Fellowship";
export const CLAN_ID = "5d2e8b4a-71c3-4f9e-a6d0-3b8c1e7f2a94";
export const CLAN_NAME = "Evening Web Fellows";
export const MENTEE_ID = "8c1a4f7e-3d92-4b05-a7e6-1f0c9d2b5e38";
export const MENTEE_2_ID = "d6b3f9a2-4e17-4c58-9a0d-5e8c2b1f7a63";
export const LEAD_MENTOR_ID = "f4e2b6a1-9c37-4d08-8b5f-6a2e0d3c7b19";
export const ROADMAP_ID = "2a9c6e1f-5b84-4d37-9e02-c7f1a3b8d460";

const PY_HEADERS = `HEADERS = {"Authorization": f"Bearer {os.environ['PATHMENT_API_KEY']}"}`;
const NODE_HEADERS = "const headers = { Authorization: `Bearer ${process.env.PATHMENT_API_KEY}` };";

/** A GET request with optional query parameters, in all three languages. */
function getRequest(
  path: string,
  query: Record<string, string>,
  read: { node: string; python: string },
): Samples {
  const entries = Object.entries(query);
  const qs = entries.length ? `?${entries.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&")}` : "";
  const nodeParams = entries.map(([k, v]) => `url.searchParams.set("${k}", "${v}");`).join("\n");
  const pyParams = entries.length
    ? `\n    params={${entries.map(([k, v]) => `"${k}": ${/^\d+$/.test(v) ? v : `"${v}"`}`).join(", ")}},`
    : "";
  return {
    curl: `curl ${qs ? `"${BASE}${path}${qs}"` : `${BASE}${path}`} \\
  -H "Authorization: Bearer $PATHMENT_API_KEY"`,
    node: entries.length
      ? `${NODE_HEADERS}

const url = new URL("${BASE}${path}");
${nodeParams}

const res = await fetch(url, { headers });
const body = await res.json();
${read.node}`
      : `${NODE_HEADERS}

const res = await fetch("${BASE}${path}", { headers });
const body = await res.json();
${read.node}`,
    python: `import os
import requests

${PY_HEADERS}

resp = requests.get(
    "${BASE}${path}",
    headers=HEADERS,${pyParams}
    timeout=30,
)
resp.raise_for_status()
body = resp.json()
${read.python}`,
  };
}

/* ----------------------------------------------------------------------------
   Requests
---------------------------------------------------------------------------- */

export const listProgrammesSamples = getRequest("/programmes", { status: "published" }, {
  node: `for (const programme of body.data) {
  console.log(programme.id, programme.name, programme.menteeCount);
}`,
  python: `for programme in body["data"]:
    print(programme["id"], programme["name"], programme["menteeCount"])`,
});

export const retrieveProgrammeSamples = getRequest(`/programmes/${PROGRAMME_ID}`, {}, {
  node: "console.log(body.name, body.status, body.clanCount);",
  python: 'print(body["name"], body["status"], body["clanCount"])',
});

export const listClansSamples = getRequest("/clans", { programmeId: PROGRAMME_ID, status: "active" }, {
  node: `for (const clan of body.data) {
  console.log(clan.name, clan.leadMentor?.name ?? "no lead mentor", clan.menteeCount);
}`,
  python: `for clan in body["data"]:
    lead = clan["leadMentor"]["name"] if clan["leadMentor"] else "no lead mentor"
    print(clan["name"], lead, clan["menteeCount"])`,
});

export const retrieveClanSamples = getRequest(`/clans/${CLAN_ID}`, {}, {
  node: "console.log(body.name, body.kind, body.menteeCount);",
  python: 'print(body["name"], body["kind"], body["menteeCount"])',
});

export const listMenteesSamples = getRequest("/mentees", { programmeId: PROGRAMME_ID, limit: "100" }, {
  node: `for (const mentee of body.data) {
  console.log(mentee.externalId ?? mentee.email, mentee.firstName, mentee.lastName);
}`,
  python: `for mentee in body["data"]:
    print(mentee["externalId"] or mentee["email"], mentee["firstName"], mentee["lastName"])`,
});

export const retrieveMenteeSamples = getRequest(`/mentees/${MENTEE_ID}`, {}, {
  node: "console.log(body.email, body.clans.map((clan) => clan.name));",
  python: 'print(body["email"], [clan["name"] for clan in body["clans"]])',
});

export const menteeProgressSamples = getRequest(`/mentees/${MENTEE_ID}/progress`, {}, {
  node: `for (const progress of body.data) {
  console.log(progress.programme.name, \`\${progress.completionPercent}%\`, progress.tasks.overdue, "overdue");
}`,
  python: `for progress in body["data"]:
    print(progress["programme"]["name"], f"{progress['completionPercent']}%", progress["tasks"]["overdue"], "overdue")`,
});

export const programmeProgressSamples = getRequest(
  `/programmes/${PROGRAMME_ID}/progress`,
  { clanId: CLAN_ID, limit: "100" },
  {
    node: `for (const progress of body.data) {
  console.log(progress.menteeId, progress.completionPercent, progress.attendance.rate);
}`,
    python: `for progress in body["data"]:
    print(progress["menteeId"], progress["completionPercent"], progress["attendance"]["rate"])`,
  },
);

export const menteesUpdatedSinceSamples = getRequest(
  "/mentees",
  { programmeId: PROGRAMME_ID, updatedSince: "2026-11-19T02:00:00Z" },
  {
    node: `// Only mentees whose details or placements changed since the last run.
console.log(body.data.length, "changed");`,
    python: `# Only mentees whose details or placements changed since the last run.
print(len(body["data"]), "changed")`,
  },
);

/** The nightly job from the reading-progress guide. */
export const nightlyProgressScript: Samples = {
  curl: `# One page of progress for a programme. Repeat with &cursor=<nextCursor>
# until "hasMore" is false. For a nightly job, use Node.js or Python.
curl "${BASE}/programmes/${PROGRAMME_ID}/progress?limit=100" \\
  -H "Authorization: Bearer $PATHMENT_API_KEY"`,
  node: `// nightly-progress.mjs: copy Pathment progress into your own database.
const API = "${BASE}";
const headers = { Authorization: \`Bearer \${process.env.PATHMENT_API_KEY}\` };

async function* pages(path, params = {}) {
  let cursor;
  do {
    const url = new URL(\`\${API}\${path}\`);
    url.searchParams.set("limit", "100");
    for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
    if (cursor) url.searchParams.set("cursor", cursor);

    const res = await fetch(url, { headers });
    const page = await res.json();
    if (!res.ok) throw new Error(\`\${page.error.code}: \${page.error.message} (\${page.requestId})\`);
    yield page.data;
    cursor = page.hasMore ? page.nextCursor : undefined;
  } while (cursor);
}

const startedAt = new Date().toISOString();
const lastRunAt = await db.getCheckpoint("pathment"); // null on the first run

// 1. Who changed? New mentees, new emails, new clan placements.
//    Needs mentees:read. Match them to your own people by externalId, then email.
for await (const mentees of pages("/mentees", lastRunAt ? { updatedSince: lastRunAt } : {})) {
  for (const mentee of mentees) {
    await db.upsertPerson({
      pathmentId: mentee.id,
      yourId: mentee.externalId, // set when they came in through a sync
      email: mentee.email,
    });
  }
}

// 2. Progress for everyone in each published programme. Needs programmes:read and progress:read.
for await (const programmes of pages("/programmes", { status: "published" })) {
  for (const programme of programmes) {
    for await (const rows of pages(\`/programmes/\${programme.id}/progress\`)) {
      for (const progress of rows) {
        await db.saveProgress(progress.menteeId, programme.id, {
          completionPercent: progress.completionPercent,
          overdueTasks: progress.tasks.overdue,
          attendanceRate: progress.attendance.rate, // null when there were no sessions
          certificates: progress.certificates.map((cert) => cert.verifyUrl),
        });
      }
    }
  }
}

await db.setCheckpoint("pathment", startedAt);`,
  python: `# nightly_progress.py: copy Pathment progress into your own database.
import os
from datetime import datetime, timezone

import requests

API = "${BASE}"
session = requests.Session()
session.headers["Authorization"] = f"Bearer {os.environ['PATHMENT_API_KEY']}"


def pages(path, **params):
    cursor = None
    while True:
        query = {"limit": 100, **params}
        if cursor:
            query["cursor"] = cursor
        resp = session.get(f"{API}{path}", params=query, timeout=60)
        page = resp.json()
        if not resp.ok:
            raise RuntimeError(f"{page['error']['code']}: {page['error']['message']} ({page['requestId']})")
        yield page["data"]
        if not page["hasMore"]:
            return
        cursor = page["nextCursor"]


started_at = datetime.now(timezone.utc).isoformat()
last_run_at = db.get_checkpoint("pathment")  # None on the first run

# 1. Who changed? New mentees, new emails, new clan placements.
#    Needs mentees:read. Match them to your own people by externalId, then email.
since = {"updatedSince": last_run_at} if last_run_at else {}
for mentees in pages("/mentees", **since):
    for mentee in mentees:
        db.upsert_person(
            pathment_id=mentee["id"],
            your_id=mentee["externalId"],  # set when they came in through a sync
            email=mentee["email"],
        )

# 2. Progress for everyone in each published programme. Needs programmes:read and progress:read.
for programmes in pages("/programmes", status="published"):
    for programme in programmes:
        for rows in pages(f"/programmes/{programme['id']}/progress"):
            for progress in rows:
                db.save_progress(
                    progress["menteeId"],
                    programme["id"],
                    completion_percent=progress["completionPercent"],
                    overdue_tasks=progress["tasks"]["overdue"],
                    attendance_rate=progress["attendance"]["rate"],  # None when there were no sessions
                    certificates=[cert["verifyUrl"] for cert in progress["certificates"]],
                )

db.set_checkpoint("pathment", started_at)`,
};

/* ----------------------------------------------------------------------------
   Objects and responses
---------------------------------------------------------------------------- */

const programmeJson = `{
    "id": "${PROGRAMME_ID}",
    "name": "${PROGRAMME_NAME}",
    "description": "Twelve weeks of guided projects and weekly mentor reviews.",
    "type": "mentorship",
    "status": "published",
    "clanCount": 4,
    "menteeCount": 120,
    "createdAt": "2026-08-14T08:30:00Z"
  }`;

export const programmeObject = programmeJson.replace(/\n {2}/g, "\n");

export const programmeListResponse = `{
  "data": [
    ${programmeJson.replace(/\n/g, "\n  ")}
  ],
  "hasMore": false,
  "nextCursor": null
}`;

const clanJson = `{
    "id": "${CLAN_ID}",
    "name": "${CLAN_NAME}",
    "programmeId": "${PROGRAMME_ID}",
    "kind": "cohort",
    "status": "active",
    "leadMentor": {
      "id": "${LEAD_MENTOR_ID}",
      "name": "Priya Raman"
    },
    "menteeCount": 18,
    "createdAt": "2026-09-01T09:00:00Z"
  }`;

export const clanObject = clanJson.replace(/\n {2}/g, "\n");

export const clanListResponse = `{
  "data": [
    ${clanJson.replace(/\n/g, "\n  ")}
  ],
  "hasMore": true,
  "nextCursor": "eyJpZCI6IjVkMmU4YjRhIn0"
}`;

export const menteeObject = `{
  "id": "${MENTEE_ID}",
  "email": "ada@example.com",
  "firstName": "Ada",
  "lastName": "Okafor",
  "externalId": "u_1042",
  "status": "active",
  "clans": [
    {
      "id": "${CLAN_ID}",
      "name": "${CLAN_NAME}",
      "programmeId": "${PROGRAMME_ID}",
      "membership": "active"
    }
  ],
  "enrollments": [
    {
      "programmeId": "${PROGRAMME_ID}",
      "status": "active",
      "enrolledAt": "2026-09-01T09:12:44Z",
      "completedAt": null
    }
  ],
  "createdAt": "2026-08-30T16:05:10Z",
  "updatedAt": "2026-11-18T21:47:02Z"
}`;

export const menteeListResponse = `{
  "data": [
    {
      "id": "${MENTEE_ID}",
      "email": "ada@example.com",
      "firstName": "Ada",
      "lastName": "Okafor",
      "externalId": "u_1042",
      "status": "active",
      "clans": [
        { "id": "${CLAN_ID}", "name": "${CLAN_NAME}", "programmeId": "${PROGRAMME_ID}", "membership": "active" }
      ],
      "enrollments": [
        { "programmeId": "${PROGRAMME_ID}", "status": "active", "enrolledAt": "2026-09-01T09:12:44Z", "completedAt": null }
      ],
      "createdAt": "2026-08-30T16:05:10Z",
      "updatedAt": "2026-11-18T21:47:02Z"
    }
  ],
  "hasMore": true,
  "nextCursor": "eyJpZCI6IjhjMWE0ZjdlIn0"
}`;

const progressJson = `{
    "menteeId": "${MENTEE_ID}",
    "programme": { "id": "${PROGRAMME_ID}", "name": "${PROGRAMME_NAME}" },
    "clan": { "id": "${CLAN_ID}", "name": "${CLAN_NAME}" },
    "enrollment": {
      "status": "active",
      "enrolledAt": "2026-09-01T09:12:44Z",
      "completedAt": null
    },
    "completionPercent": 42,
    "points": 310,
    "tasks": {
      "total": 24,
      "open": 6,
      "submitted": 2,
      "completed": 15,
      "revisionNeeded": 1,
      "overdue": 2
    },
    "roadmaps": [
      {
        "id": "${ROADMAP_ID}",
        "name": "Month 1: Foundations",
        "currentStep": 7,
        "totalSteps": 18,
        "completed": false
      }
    ],
    "attendance": {
      "sessions": 12,
      "present": 10,
      "absent": 1,
      "excused": 1,
      "rate": 0.83
    },
    "certificates": [
      {
        "number": "PM-7K2Q-9XWD",
        "tier": "participation",
        "issuedAt": "2026-10-31T12:00:00Z",
        "verifyUrl": "https://app.pathment.me/verify/PM-7K2Q-9XWD"
      }
    ],
    "updatedAt": "2026-11-19T01:58:12Z"
  }`;

export const progressObject = progressJson.replace(/\n {2}/g, "\n");

export const menteeProgressResponse = `{
  "data": [
    ${progressJson.replace(/\n/g, "\n  ")}
  ]
}`;

export const programmeProgressResponse = `{
  "data": [
    ${progressJson.replace(/\n/g, "\n  ")},
    {
      "menteeId": "${MENTEE_2_ID}",
      "programme": { "id": "${PROGRAMME_ID}", "name": "${PROGRAMME_NAME}" },
      "clan": { "id": "${CLAN_ID}", "name": "${CLAN_NAME}" },
      "enrollment": { "status": "matched", "enrolledAt": "2026-11-17T10:20:00Z", "completedAt": null },
      "completionPercent": 0,
      "points": 0,
      "tasks": { "total": 0, "open": 0, "submitted": 0, "completed": 0, "revisionNeeded": 0, "overdue": 0 },
      "roadmaps": [],
      "attendance": { "sessions": 0, "present": 0, "absent": 0, "excused": 0, "rate": null },
      "certificates": [],
      "updatedAt": "2026-11-17T10:20:00Z"
    }
  ],
  "hasMore": true,
  "nextCursor": "eyJtZW50ZWVJZCI6ImQ2YjNmOWEyIn0"
}`;
