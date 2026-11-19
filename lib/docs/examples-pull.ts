/**
 * Samples for pull connectors: what a source can look like, how Pathment
 * calls it, and a small export endpoint you could build. Made-up people and
 * example.com hosts only.
 */
import type { Samples } from "./examples";

export const PULL_USER_AGENT = "Pathment-Sync/1.0 (+https://pathment.me/docs/guides/pulling)";

export const pullRequestExample = `GET /api/students HTTP/1.1
Host: sis.example.com
Accept: application/json
User-Agent: ${PULL_USER_AGENT}
Authorization: Bearer ••••••••••••••••`;

export const pullJsonPage1 = `{
  "data": [
    {
      "student_id": "S-101",
      "full_name": "Amina Yusuf",
      "email_address": "amina@example.com",
      "track": "Beginner"
    },
    {
      "student_id": "S-102",
      "full_name": "Tomás Ferreira",
      "email_address": "tomas@example.com",
      "track": "Advanced"
    }
  ],
  "links": {
    "next": "https://sis.example.com/api/students?page=2"
  }
}`;

export const pullJsonLastPage = `{
  "data": [
    {
      "student_id": "S-187",
      "full_name": "Kenji Sato",
      "email_address": "kenji@example.com",
      "track": "Beginner"
    }
  ],
  "links": {
    "next": null
  }
}`;

export const pullMappingExample = `{
  "fields": {
    "externalId": { "from": "student_id" },
    "email":      { "from": "email_address", "transform": "lowercase" },
    "firstName":  { "from": "full_name", "transform": "first_name" },
    "lastName":   { "from": "full_name", "transform": "last_name" },
    "level":      { "from": "track", "map": { "Beginner": "beginner", "Advanced": "senior" } }
  },
  "keepUnmapped": true
}`;

export const pullCsvExample = `student_id,full_name,email_address,track,notes
S-101,Amina Yusuf,amina@example.com,Beginner,
S-102,Tomás Ferreira,tomas@example.com,Advanced,"Prefers evenings, after 6pm"
S-103,Chidi Okafor,chidi@example.com,Beginner,"Said: ""happy to mentor later"""`;

export const exportEndpointSamples: Samples = {
  curl: `# Call your endpoint the way Pathment will, to check what it returns.
curl https://sis.example.com/api/students \\
  -H "Accept: application/json" \\
  -H "User-Agent: ${PULL_USER_AGENT}" \\
  -H "Authorization: Bearer $EXPORT_TOKEN"`,
  node: `// export.mjs: a read-only endpoint Pathment can pull from. npm install express
import crypto from "node:crypto";
import express from "express";

const app = express();
const PAGE_SIZE = 500; // 20 pages x 500 = 10,000 records, Pathment's limit per pull
const TOKEN = Buffer.from(process.env.EXPORT_TOKEN); // a token made only for this export

function authorised(req) {
  const sent = Buffer.from((req.get("Authorization") ?? "").replace(/^Bearer /, ""));
  return sent.length === TOKEN.length && crypto.timingSafeEqual(sent, TOKEN);
}

app.get("/api/students", async (req, res) => {
  if (!authorised(req)) return res.sendStatus(401);

  const page = Math.max(1, Number(req.query.page) || 1);
  // Everyone who should be in the intake, not only recent changes, in a stable order.
  const { rows, total } = await db.students.list({
    status: "applying",
    orderBy: "id",
    offset: (page - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  });

  res.json({
    data: rows.map((student) => ({
      student_id: student.id, // stable: never reused, never changes
      full_name: student.fullName,
      email_address: student.email,
      track: student.track,
    })),
    links: {
      // Relative or absolute, but always on this same host.
      next: page * PAGE_SIZE < total ? \`/api/students?page=\${page + 1}\` : null,
    },
  });
});

app.listen(3000);`,
  python: `# export.py: a read-only endpoint Pathment can pull from. pip install flask
import hmac
import os

from flask import Flask, abort, jsonify, request

app = Flask(__name__)
PAGE_SIZE = 500  # 20 pages x 500 = 10,000 records, Pathment's limit per pull
TOKEN = os.environ["EXPORT_TOKEN"]  # a token made only for this export


@app.get("/api/students")
def students():
    sent = request.headers.get("Authorization", "").removeprefix("Bearer ")
    if not hmac.compare_digest(sent, TOKEN):
        abort(401)

    page = max(1, request.args.get("page", 1, type=int))
    # Everyone who should be in the intake, not only recent changes, in a stable order.
    rows, total = db.list_students(
        status="applying", order_by="id", offset=(page - 1) * PAGE_SIZE, limit=PAGE_SIZE
    )

    return jsonify(
        {
            "data": [
                {
                    "student_id": row.id,  # stable: never reused, never changes
                    "full_name": row.full_name,
                    "email_address": row.email,
                    "track": row.track,
                }
                for row in rows
            ],
            "links": {
                # Relative or absolute, but always on this same host.
                "next": f"/api/students?page={page + 1}" if page * PAGE_SIZE < total else None
            },
        }
    )`,
};
