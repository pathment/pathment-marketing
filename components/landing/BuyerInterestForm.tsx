"use client";

import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { track } from "../../lib/analytics";
import { programTypes, validateBuyerLead, type LeadErrors } from "../../lib/buyer-lead";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export function BuyerInterestForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<LeadErrors>({});
  const [message, setMessage] = useState("");
  const startedAt = useRef(0);
  const trackedStart = useRef(false);

  function noteStart() {
    if (!trackedStart.current) {
      trackedStart.current = true;
      startedAt.current = Date.now();
      track("buyer_form_started", { location: compact ? "homepage" : "contact" });
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const payload = { ...data, startedAt: startedAt.current };
    const validation = validateBuyerLead(payload);
    if (!validation.data) { setErrors(validation.errors); setStatus("error"); setMessage("Check the highlighted fields."); return; }
    setErrors({}); setStatus("loading"); setMessage("");
    try {
      const response = await fetch("/api/buyer-interest", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(validation.data) });
      const result = await response.json();
      if (response.ok) {
        setStatus("success");
        track("buyer_form_submitted", { location: compact ? "homepage" : "contact" });
        form.reset();
        return;
      }
      setStatus(result.duplicate ? "duplicate" : "error");
      setErrors(result.fields || {});
      setMessage(result.error || "We could not submit the request.");
    } catch {
      setStatus("error");
      setMessage("The request could not reach Pathment. Check your connection and try again.");
    }
  }

  if (status === "success") return <div role="status" className="rounded-2xl border border-brand-200 bg-brand-50 p-7 text-brand-950"><CheckCircle2 size={28} /><h3 className="mt-4 text-xl font-semibold">Your request reached the Pathment team.</h3><p className="mt-2 text-sm leading-6">We’ll review your program needs and contact you about pricing and onboarding. Keep an eye on your work inbox.</p><button type="button" onClick={() => { setStatus("idle"); startedAt.current = 0; trackedStart.current = false; }} className="mt-5 text-sm font-semibold underline underline-offset-4">Send another request</button></div>;

  const fieldClass = "mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10";
  return (
    <form onSubmit={submit} onFocus={noteStart} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Work email" name="email" type="email" autoComplete="email" required error={errors.email} className={fieldClass} placeholder="you@organization.org" />
        <Field label="Full name" name="fullName" autoComplete="name" required error={errors.fullName} className={fieldClass} placeholder="Your name" />
      </div>
      <Field label="Organization name" name="organizationName" autoComplete="organization" required error={errors.organizationName} className={fieldClass} placeholder="Organization or institution" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Select label="Program type" name="programType" className={fieldClass} options={[...programTypes]} />
        <Select label="Expected participants" name="participants" className={fieldClass} options={["Under 25", "25–100", "101–500", "501–1,000", "More than 1,000"]} />
      </div>
      {!compact ? <div className="grid gap-5 sm:grid-cols-2"><Select label="Organization size" name="organizationSize" className={fieldClass} options={["1–25", "26–100", "101–500", "501–1,000", "More than 1,000"]} /><Select label="Desired launch" name="launchTimeframe" className={fieldClass} options={["As soon as possible", "Within 1–3 months", "Within 3–6 months", "Later this year", "Still exploring"]} /></div> : null}
      <label className="block text-sm font-semibold text-ink">Anything we should know? <span className="font-normal text-muted">Optional</span><textarea name="message" rows={compact ? 3 : 4} className={fieldClass} placeholder="Tell us about your program or implementation questions." aria-describedby={errors.message ? "message-error" : undefined} />{errors.message ? <span id="message-error" className="mt-1 block text-xs text-red-700">{errors.message}</span> : null}</label>
      <div className="sr-only" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {message ? <p role="alert" className={`rounded-xl border p-4 text-sm leading-6 ${status === "duplicate" ? "border-amber-300 bg-amber-50 text-amber-950" : "border-red-200 bg-red-50 text-red-800"}`}>{message}</p> : null}
      <button type="submit" disabled={status === "loading"} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-wait disabled:opacity-70">{status === "loading" ? <><LoaderCircle className="animate-spin" size={17} />Sending securely…</> : <>Request pricing guidance <ArrowRight size={17} /></>}</button>
      <p className="text-xs leading-5 text-muted">The Pathment team will use these details to contact you about pricing and onboarding. We do not sell your information. See our <a href="/privacy" className="underline underline-offset-2">privacy policy</a>.</p>
    </form>
  );
}

function Field({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const id = `field-${props.name}`;
  return <label className="block text-sm font-semibold text-ink">{label}{props.required ? <span className="text-accent"> *</span> : null}<input {...props} id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} />{error ? <span id={`${id}-error`} className="mt-1 block text-xs text-red-700">{error}</span> : null}</label>;
}

function Select({ label, options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[] }) {
  return <label className="block text-sm font-semibold text-ink">{label} <span className="font-normal text-muted">Optional</span><select {...props} defaultValue=""><option value="">Select an option</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
