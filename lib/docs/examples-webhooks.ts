/**
 * Webhook samples: receivers in Node.js and Python, and a full example
 * payload for every event. Same rules as examples.ts: made-up people and
 * UUIDs that match the rest of the docs.
 */
import { INTAKE_ID, jobPartialObject, type Samples } from "./examples";
import {
  CLAN_ID,
  CLAN_NAME,
  MENTEE_ID,
  PROGRAMME_ID,
  ROADMAP_ID,
  menteeObject,
} from "./examples-read";

export const APPLICANT_ID = "9e47b0d3-1f25-4c8a-b6e9-0d7a3c5f2e81";
export const TASK_ID = "a71c5e3b-0f9d-4b26-8e4a-6d2b9f1c3e57";
export const EXAMPLE_TIMESTAMP = 1795169702; // 2026-11-20T10:15:02Z
export const EXAMPLE_SIGNATURE =
  "t=1795169702,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd";

/** Adds `spaces` to the start of every line after the first. */
function indent(text: string, spaces: number) {
  return text.replace(/\n/g, `\n${" ".repeat(spaces)}`);
}

function envelope(id: string, type: string, createdAt: string, data: string) {
  return `{
  "id": "evt_${id}",
  "type": "${type}",
  "apiVersion": "2026-11-20",
  "createdAt": "${createdAt}",
  "data": ${indent(data, 2)}
}`;
}

function applicant(status: string, stage: string, updatedAt: string) {
  return `{
  "id": "${APPLICANT_ID}",
  "intakeId": "${INTAKE_ID}",
  "externalId": "u_1042",
  "email": "ada@example.com",
  "firstName": "Ada",
  "lastName": "Okafor",
  "phone": "+447700900123",
  "level": "senior",
  "country": "GB",
  "status": "${status}",
  "stage": "${stage}",
  "responses": { "github": "ada-okafor" },
  "source": "api",
  "createdAt": "2026-11-19T10:02:11Z",
  "updatedAt": "${updatedAt}"
}`;
}

/* ----------------------------------------------------------------------------
   Event payloads
---------------------------------------------------------------------------- */

export const envelopeExample = `{
  "id": "evt_0c4f8e2a-6b13-4d97-a5e0-8f2c1b7d4a69",
  "type": "applicant.accepted",
  "apiVersion": "2026-11-20",
  "createdAt": "2026-11-20T10:15:02.120Z",
  "data": { ... }
}`;

export const headersExample = `POST /webhooks/pathment HTTP/1.1
Content-Type: application/json
User-Agent: Pathment-Webhooks/1.0 (+https://pathment.me/docs/guides/webhooks)
Pathment-Event-Id: evt_0c4f8e2a-6b13-4d97-a5e0-8f2c1b7d4a69
Pathment-Event-Type: applicant.accepted
Pathment-Delivery-Attempt: 1
Pathment-Signature: ${EXAMPLE_SIGNATURE}`;

export const eventExamples: Record<string, string> = {
  "applicant.created": envelope(
    "3b8d1f6a-92c4-4e07-b5a1-7c0e2d9f4b18",
    "applicant.created",
    "2026-11-19T10:02:11.402Z",
    `{
  "applicant": ${indent(applicant("pending", "added", "2026-11-19T10:02:11Z"), 2)}
}`,
  ),
  "applicant.assessment_sent": envelope(
    "e1a7c4d9-5f20-4b8e-9c63-2a0d8b5f1e74",
    "applicant.assessment_sent",
    "2026-11-19T10:02:12.877Z",
    `{
  "applicant": ${indent(applicant("assessment_sent", "assessment_sent", "2026-11-19T10:02:12Z"), 2)}
}`,
  ),
  "applicant.assessment_submitted": envelope(
    "7d2e9b4c-1a68-4f35-8e0b-c5f3a6d1b290",
    "applicant.assessment_submitted",
    "2026-11-19T16:48:30.015Z",
    `{
  "applicant": ${indent(applicant("under_review", "submitted", "2026-11-19T16:48:29Z"), 2)},
  "assessment": {
    "submittedAt": "2026-11-19T16:48:29Z",
    "score": null,
    "maxScore": null
  }
}`,
  ),
  "applicant.accepted": envelope(
    "0c4f8e2a-6b13-4d97-a5e0-8f2c1b7d4a69",
    "applicant.accepted",
    "2026-11-20T10:15:02.120Z",
    `{
  "applicant": ${indent(applicant("accepted", "accepted", "2026-11-20T10:15:01Z"), 2)},
  "assessment": {
    "submittedAt": "2026-11-19T16:48:29Z",
    "score": 34,
    "maxScore": 40
  }
}`,
  ),
  "applicant.rejected": envelope(
    "5a9f3c7e-2d41-4b86-a0e5-9b1c6f8d2e43",
    "applicant.rejected",
    "2026-11-20T10:16:44.560Z",
    `{
  "applicant": {
    "id": "c3e8a1f5-7b24-4d09-9f6e-1a5d0b8c4e27",
    "intakeId": "${INTAKE_ID}",
    "externalId": "u_1043",
    "email": "bo@example.com",
    "firstName": "Bo",
    "lastName": "Lindqvist",
    "phone": null,
    "level": "beginner",
    "country": "SE",
    "status": "rejected",
    "stage": "rejected",
    "responses": {},
    "source": "api",
    "createdAt": "2026-11-19T10:02:11Z",
    "updatedAt": "2026-11-20T10:16:44Z"
  }
}`,
  ),
  "mentee.joined": envelope(
    "9f6b2d8e-4c17-4a53-b0e9-3d7a1c5f8b62",
    "mentee.joined",
    "2026-11-20T11:02:40.903Z",
    `{
  "mentee": ${indent(menteeObject, 2)},
  "clan": {
    "id": "${CLAN_ID}",
    "name": "${CLAN_NAME}",
    "programmeId": "${PROGRAMME_ID}"
  }
}`,
  ),
  "task.approved": envelope(
    "2c7a5e1d-8b39-4f04-9e6a-0d4b8c2f7a15",
    "task.approved",
    "2026-11-20T14:31:09.338Z",
    `{
  "menteeId": "${MENTEE_ID}",
  "task": {
    "id": "${TASK_ID}",
    "title": "Build a small REST API",
    "type": "project",
    "roadmapId": "${ROADMAP_ID}",
    "programmeId": "${PROGRAMME_ID}",
    "clanId": "${CLAN_ID}",
    "approvedAt": "2026-11-20T14:31:08Z"
  }
}`,
  ),
  "roadmap.completed": envelope(
    "b4d0f7a2-3e85-4c19-a6b7-5f9e2c1d8a30",
    "roadmap.completed",
    "2026-11-20T14:31:09.512Z",
    `{
  "menteeId": "${MENTEE_ID}",
  "roadmap": {
    "id": "${ROADMAP_ID}",
    "name": "Month 1: Foundations"
  },
  "programmeId": "${PROGRAMME_ID}",
  "clanId": "${CLAN_ID}",
  "completedAt": "2026-11-20T14:31:08Z"
}`,
  ),
  "certificate.issued": envelope(
    "6e3c9a5f-0b72-4d28-8f1a-e4b7d2c9a053",
    "certificate.issued",
    "2026-11-20T15:00:03.004Z",
    `{
  "menteeId": "${MENTEE_ID}",
  "programmeId": "${PROGRAMME_ID}",
  "certificate": {
    "number": "PM-7K2Q-9XWD",
    "tier": "participation",
    "issuedAt": "2026-11-20T15:00:02Z",
    "verifyUrl": "https://app.pathment.me/verify/PM-7K2Q-9XWD"
  }
}`,
  ),
  "sync.job.completed": envelope(
    "d8a1e6c3-7f40-4b95-a2d8-6c0f9e3b1a74",
    "sync.job.completed",
    "2026-11-19T10:02:24.311Z",
    `{
  "job": ${indent(jobPartialObject, 2)}
}`,
  ),
  ping: envelope(
    "4a0e7c2b-9d58-4f16-b3c4-8e1f5a9d0b62",
    "ping",
    "2026-11-20T09:58:41.770Z",
    `{
  "message": "Hello from Pathment. Your endpoint is receiving webhooks."
}`,
  ),
};

/* ----------------------------------------------------------------------------
   Receivers
---------------------------------------------------------------------------- */

const NO_CURL = `# A webhook receiver runs on your own server, so there's no cURL version.
# Pick Node.js or Python above. To try your receiver, use "Send test"
# on the endpoint in Pathment: Settings → Integrations → Webhooks.`;

export const receiverSamples: Samples = {
  curl: NO_CURL,
  node: `// server.mjs: npm install express, then node server.mjs
import crypto from "node:crypto";
import express from "express";

const SECRET = process.env.PATHMENT_WEBHOOK_SECRET; // the endpoint's whsec_... secret
const TOLERANCE_SECONDS = 5 * 60;
const app = express();

function verifySignature(rawBody, header) {
  if (!header) return false;
  const parts = {};
  for (const piece of header.split(",")) {
    const at = piece.indexOf("=");
    if (at > 0) parts[piece.slice(0, at).trim()] = piece.slice(at + 1).trim();
  }

  // Reject old or future timestamps, so a captured request can't be replayed.
  const timestamp = Number(parts.t);
  if (!Number.isFinite(timestamp)) return false;
  if (Math.abs(Date.now() / 1000 - timestamp) > TOLERANCE_SECONDS) return false;

  // HMAC-SHA256 of "{t}.{raw body}", hex encoded.
  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(\`\${parts.t}.\`)
    .update(rawBody)
    .digest();
  const received = Buffer.from(parts.v1 ?? "", "hex");
  return received.length === expected.length && crypto.timingSafeEqual(received, expected);
}

const seen = new Set(); // use your database in production

async function handleEvent(event) {
  switch (event.type) {
    case "applicant.accepted":
      console.log("Accepted:", event.data.applicant.email);
      break;
    case "sync.job.completed":
      console.log("Sync finished:", event.data.job.status, event.data.job.counts);
      break;
    case "ping":
      console.log(event.data.message);
      break;
    default:
      // Ignore events you don't use. New event types can appear.
      break;
  }
}

// express.raw keeps the exact bytes Pathment signed. Don't use express.json() here.
app.post("/webhooks/pathment", express.raw({ type: "application/json" }), (req, res) => {
  if (!verifySignature(req.body, req.get("Pathment-Signature"))) {
    return res.status(400).send("Invalid signature");
  }

  const event = JSON.parse(req.body.toString("utf8"));
  res.sendStatus(200); // answer first, well inside 10 seconds

  if (seen.has(event.id)) return; // a retry of something already handled
  seen.add(event.id);
  setImmediate(() => handleEvent(event).catch(console.error)); // use a real job queue in production
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));`,
  python: `# app.py: pip install flask, then flask --app app run --port 3000
import hashlib
import hmac
import json
import os
import threading
import time

from flask import Flask, abort, request

SECRET = os.environ["PATHMENT_WEBHOOK_SECRET"].encode()  # the endpoint's whsec_... secret
TOLERANCE_SECONDS = 5 * 60
app = Flask(__name__)
seen = set()  # use your database in production


def verify_signature(raw_body, header):
    if not header:
        return False
    parts = dict(piece.strip().split("=", 1) for piece in header.split(",") if "=" in piece)

    # Reject old or future timestamps, so a captured request can't be replayed.
    try:
        timestamp = int(parts.get("t", ""))
    except ValueError:
        return False
    if abs(time.time() - timestamp) > TOLERANCE_SECONDS:
        return False

    # HMAC-SHA256 of "{t}.{raw body}", hex encoded.
    signed = parts["t"].encode() + b"." + raw_body
    expected = hmac.new(SECRET, signed, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, parts.get("v1", ""))


def handle_event(event):
    if event["type"] == "applicant.accepted":
        print("Accepted:", event["data"]["applicant"]["email"])
    elif event["type"] == "sync.job.completed":
        print("Sync finished:", event["data"]["job"]["status"], event["data"]["job"]["counts"])
    elif event["type"] == "ping":
        print(event["data"]["message"])
    # Ignore events you don't use. New event types can appear.


@app.post("/webhooks/pathment")
def pathment_webhook():
    raw_body = request.get_data()  # the exact bytes Pathment signed
    if not verify_signature(raw_body, request.headers.get("Pathment-Signature")):
        abort(400)

    event = json.loads(raw_body)
    if event["id"] not in seen:  # skip retries of something already handled
        seen.add(event["id"])
        # Do the work after answering. Use a real job queue in production.
        threading.Thread(target=handle_event, args=(event,), daemon=True).start()
    return "", 200`,
};

/** Just the verification step, for the guide's walkthrough. */
export const verifyOnlySamples: Samples = {
  curl: NO_CURL,
  node: `import crypto from "node:crypto";

// rawBody: the request body exactly as received (a Buffer), not re-serialised JSON.
// header: the Pathment-Signature header, e.g. "t=1795169702,v1=5257a8..."
function verifySignature(rawBody, header, secret) {
  const parts = Object.fromEntries(
    header.split(",").map((piece) => {
      const at = piece.indexOf("=");
      return [piece.slice(0, at).trim(), piece.slice(at + 1).trim()];
    }),
  );
  if (Math.abs(Date.now() / 1000 - Number(parts.t)) > 300) return false;

  const expected = crypto.createHmac("sha256", secret).update(\`\${parts.t}.\`).update(rawBody).digest();
  const received = Buffer.from(parts.v1 ?? "", "hex");
  return received.length === expected.length && crypto.timingSafeEqual(received, expected);
}`,
  python: `import hashlib
import hmac
import time

# raw_body: the request body exactly as received (bytes), not re-serialised JSON.
# header: the Pathment-Signature header, e.g. "t=1795169702,v1=5257a8..."
def verify_signature(raw_body, header, secret):
    parts = dict(piece.strip().split("=", 1) for piece in header.split(",") if "=" in piece)
    if abs(time.time() - int(parts["t"])) > 300:
        return False

    signed = parts["t"].encode() + b"." + raw_body
    expected = hmac.new(secret.encode(), signed, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, parts.get("v1", ""))`,
};
