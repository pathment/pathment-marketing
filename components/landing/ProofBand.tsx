import Image from "next/image";
import { proof } from "./site-content";

/**
 * The band directly under the fold. Its job is to answer "is this real?"
 * before the visitor decides whether to keep scrolling.
 *
 * Two modes. With one nameable customer, a thin row of five placeholder
 * wordmarks reads as weaker than no logos at all, so "featured" tells that
 * one customer's story and lets the numbers carry the weight. Switch
 * `proof.mode` to "wall" once there are at least three real names.
 */
export function ProofBand() {
  const hasMetrics = proof.showMetrics && proof.metrics.length > 0;
  const isWall = proof.mode === "wall" && proof.organizations.length > 0;

  if (!hasMetrics && !isWall) return null;

  return (
    <section
      aria-labelledby="proof-heading"
      className="border-y border-line bg-sand"
    >
      <div className="shell py-14 lg:py-16">
        {isWall ? (
          <>
            <h2
              id="proof-heading"
              className="text-center font-display text-base font-medium tracking-tight text-muted"
            >
              {proof.heading}
            </h2>
            <ul className="mt-9 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
              {proof.organizations.map((org) => (
                <li key={org.name} className="flex items-center justify-center">
                  {org.logo ? (
                    <Image
                      src={org.logo}
                      alt={org.name}
                      width={132}
                      height={36}
                      className="h-8 w-auto max-w-[9rem] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                    />
                  ) : (
                    // Until a mark is cleared for use, the name set in the
                    // display face reads as a wordmark, never as a fake logo.
                    <span className="text-center font-display text-[15px] font-semibold tracking-tight text-ink/55">
                      {org.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="max-w-4xl">
            <p className="label label-plain text-[10px]">{proof.heading}</p>
            <h2 id="proof-heading" className="mt-5 display-md">
              <span className="text-accent">{proof.featured.name}</span>{" "}
              {proof.featured.descriptor}
            </h2>
          </div>
        )}

        {hasMetrics ? (
          <>
            <dl
              className={`grid gap-10 sm:grid-cols-3 ${
                isWall ? "mt-14 border-t border-line pt-12" : "mt-12"
              }`}
            >
              {proof.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <span className="numeric block font-display text-5xl font-semibold tracking-[-0.045em] text-accent lg:text-[4rem] lg:leading-none">
                      {metric.value}
                    </span>
                    <span className="mt-3 block text-sm font-semibold text-ink">
                      {metric.label}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-muted">
                      {metric.note}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {proof.detail.length > 0 ? (
              <ul className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-muted">
                {proof.detail.map((item) => (
                  <li
                    key={item}
                    className="numeric flex items-center gap-2 before:h-1 before:w-1 before:rounded-full before:bg-accent/50"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-4 text-xs text-muted">{proof.asOf}</p>
          </>
        ) : null}
      </div>
    </section>
  );
}
