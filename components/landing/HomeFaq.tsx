"use client";

import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { homeFaq } from "./site-content";
import { Reveal } from "./Reveal";

/**
 * Two columns of plain disclosure rows. No cards, no shadows, because an FAQ reads
 * better as a document than as a grid of boxes.
 */
export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="lp-bg scroll-mt-20 border-t border-line"
    >
      <div className="shell py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="lp-label">Questions</p>
            <h2 id="faq-heading" className="lp-heading mt-3 text-[clamp(1.8rem,3.2vw,2.6rem)]">
              Before you ask us.
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-muted">
              Still unsure about something?{" "}
              <Link
                href="/contact"
                className="font-semibold text-[var(--lp-green)] underline underline-offset-4"
              >
                Send us the question
              </Link>{" "}
              and a person answers, usually the same day.
            </p>
          </div>

          <Reveal>
          <dl className="border-t border-line">
            {homeFaq.map((item, index) => {
              const isOpen = open === index;
              return (
                <div key={item.question} className="border-b border-line">
                  <dt>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-control-${index}`}
                      onClick={() => setOpen(isOpen ? null : index)}
                      className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                    >
                      <span className="text-[1.02rem] font-semibold tracking-tight text-ink transition-colors group-hover:text-[var(--lp-green)]">
                        {item.question}
                      </span>
                      <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${isOpen ? "border-[var(--forest)] bg-[var(--forest)] text-white" : "border-line text-[var(--lp-green)]"}`}>
                        {isOpen ? (
                          <Minus className="h-3.5 w-3.5" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                      </span>
                    </button>
                  </dt>
                  <dd
                    id={`faq-panel-${index}`}
                    aria-labelledby={`faq-control-${index}`}
                    hidden={!isOpen}
                    className="max-w-2xl pb-6 pr-10 text-[15px] leading-7 text-muted"
                  >
                    {item.answer}
                  </dd>
                </div>
              );
            })}
          </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
