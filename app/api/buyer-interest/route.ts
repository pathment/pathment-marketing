import { createHash, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { validateBuyerLead, type BuyerLead } from "../../../lib/buyer-lead";

export const runtime = "nodejs";

const attempts = new Map<string, number[]>();
const duplicates = new Map<string, number>();
const WINDOW_MS = 15 * 60 * 1000;

function clientKey(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (attempts.get(key) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(key, recent);
  return recent.length > 5;
}

function duplicateKey(lead: BuyerLead) {
  return createHash("sha256").update(`${lead.email}|${lead.organizationName.toLowerCase()}`).digest("hex");
}

async function deliverLead(lead: BuyerLead, id: string) {
  const payload = { id, type: "buyer_interest", createdAt: new Date().toISOString(), ...lead, website: undefined, startedAt: undefined };
  if (process.env.LEADS_WEBHOOK_URL) {
    const response = await fetch(process.env.LEADS_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json", ...(process.env.LEADS_WEBHOOK_TOKEN ? { authorization: `Bearer ${process.env.LEADS_WEBHOOK_TOKEN}` } : {}) },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Lead webhook returned ${response.status}`);
    return;
  }
  if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFICATION_TO && process.env.LEAD_NOTIFICATION_FROM) {
    const rows = Object.entries(payload).filter(([, value]) => value).map(([key, value]) => `<tr><th align="left" style="padding:6px 12px 6px 0">${key.replace(/([A-Z])/g, " $1")}</th><td>${String(value).replace(/[<>&"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[char]!)}</td></tr>`).join("");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({ from: process.env.LEAD_NOTIFICATION_FROM, to: [process.env.LEAD_NOTIFICATION_TO], subject: `Pathment buyer interest — ${lead.organizationName}`, html: `<h1>New Pathment buyer interest</h1><table>${rows}</table>` }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Resend returned ${response.status}`);
    return;
  }
  throw new Error("Lead delivery is not configured");
}

export async function POST(request: NextRequest) {
  if (rateLimited(clientKey(request))) return NextResponse.json({ error: "Too many requests. Please wait 15 minutes and try again." }, { status: 429 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "The request could not be read." }, { status: 400 }); }
  const result = validateBuyerLead(body);
  if (!result.data) return NextResponse.json({ error: "Check the highlighted fields.", fields: result.errors }, { status: 422 });
  const lead = result.data;
  if (lead.website) return NextResponse.json({ ok: true, id: randomUUID() });
  if (!lead.startedAt || Date.now() - lead.startedAt < 1200) return NextResponse.json({ error: "Please review the form and try again." }, { status: 422 });
  const key = duplicateKey(lead);
  const previous = duplicates.get(key);
  if (previous && Date.now() - previous < 24 * 60 * 60 * 1000) return NextResponse.json({ error: "We already received this request. The Pathment team will follow up soon.", duplicate: true }, { status: 409 });
  const id = randomUUID();
  try {
    await deliverLead(lead, id);
    duplicates.set(key, Date.now());
    return NextResponse.json({ ok: true, id });
  } catch (error) {
    console.error("Buyer lead delivery failed", { id, error });
    return NextResponse.json({ error: "We could not safely deliver your request. Nothing was claimed as sent—please try again shortly." }, { status: 503 });
  }
}
