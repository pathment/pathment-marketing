import { PublicPlans } from "./PublicPlans";
import { SectionHeader } from "./SectionHeader";
import { SectionShell } from "./SectionShell";
export function PricingSection() {
  return (
    <SectionShell id="pricing" tone="plain" ariaLabelledby="pricing-title">
      <SectionHeader
        label="Plans that grow with your community"
        titleId="pricing-title"
        title="Start with a group. Grow into a community."
        description="Choose a plan for your whole workspace. Start free, then add capacity as more people join your program."
      />
      <PublicPlans />
      <div className="mt-7 flex flex-col items-center justify-between gap-3 rounded-xl bg-canvas px-5 py-4 text-sm sm:flex-row">
        <p className="text-muted">
          Team-assisted setup. Paid plans are invoiced manually.
        </p>
        <a href="/pricing" className="shrink-0 font-semibold text-accent">
          Plan details & getting started →
        </a>
      </div>
    </SectionShell>
  );
}
