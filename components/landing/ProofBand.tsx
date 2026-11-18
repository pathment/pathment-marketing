import Image from "next/image";
import { Award, FileText, Users } from "lucide-react";
import { proof } from "./site-content";

/** Icons for the three detail figures under the headline metrics. */
const detailIcons = [Users, FileText, Award] as const;

/**
 * The band directly under the fold. Its job is to answer "is this real?"
 * before the visitor decides whether to keep scrolling. Every figure comes
 * from the verified `proof` block, never from the design file.
 */
export function ProofBand() {
  if (!proof.showMetrics || proof.metrics.length === 0) return null;

  return (
    <section aria-labelledby="proof-heading" className="border-b border-line bg-surface">
      <div className="shell grid gap-10 py-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:items-center lg:gap-0 lg:py-14">
        <div className="lg:border-r lg:border-line lg:pr-12">
          <p className="lp-label">
            <span aria-hidden className="h-px w-6 bg-current" />
            Trusted by real programs
          </p>
          <h2 id="proof-heading" className="mt-5 flex items-center gap-4">
            <Image
              src="/demo/brand/dev-weekends-logo.svg"
              alt=""
              width={52}
              height={52}
              className="h-12 w-12 rounded-xl"
            />
            <span className="lp-heading text-[2.1rem] leading-none">
              {proof.featured.name}
            </span>
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-6 text-muted">
            Runs its engineering fellowship on Pathment, from applications to
            certification.
          </p>
        </div>

        <div className="lg:pl-12">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0">
            {proof.metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`sm:px-6 ${index === 0 ? "sm:pl-0" : "sm:border-l sm:border-line"}`}
                title={metric.note}
              >
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span className="lp-heading numeric block text-[2.6rem] leading-none">
                    {metric.value}
                  </span>
                  <span className="mt-2 block text-[15px] text-ink/80">
                    {metric.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-7 grid gap-3 border-t border-line pt-5 text-sm text-ink/80 sm:grid-cols-3">
            {proof.detail.slice(0, 3).map((item, index) => {
              const Icon = detailIcons[index];
              return (
                <li key={item} className="numeric flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0 text-[var(--lp-green)]" />
                  {item}
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-[11px] text-muted">{proof.asOf}</p>
        </div>
      </div>
    </section>
  );
}
