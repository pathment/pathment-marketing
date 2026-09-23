import { ArrowRight } from "lucide-react";
export function FinalCta() {
  return (
    <section
      id="request-access"
      className="bg-canvas px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="relative mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-3xl bg-brand-950 px-7 py-12 sm:p-14 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
            Your community. Your next chapter.
          </p>
          <h2 className="max-w-xl font-display text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl">
            Make room for your next generation.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-brand-100/80">
            Tell us about your community and the program you have in mind. We’ll
            help you take the first step.
          </p>
        </div>
        <div className="md:justify-self-end">
          <a
            href="mailto:enterprise@pathment.com?subject=Let%E2%80%99s%20set%20up%20a%20Pathment%20workspace"
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#e2efcf] px-6 py-4 text-sm font-semibold text-[#123e3b] hover:bg-[#edf5e2]"
          >
            Talk to the Pathment team <ArrowRight size={17} />
          </a>
          <p className="mt-4 max-w-xs text-xs leading-5 text-brand-100/70">
            Opens your email app. Workspace setup is assisted by our team.
          </p>
          <a
            href="/pricing"
            className="mt-4 inline-block text-sm text-white underline underline-offset-4"
          >
            Compare plans first
          </a>
        </div>
      </div>
    </section>
  );
}
