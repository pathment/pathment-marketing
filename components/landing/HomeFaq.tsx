"use client";

import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { homeFaq } from "./site-content";

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
      className="scroll-mt-20 border-b border-line bg-canvas"
    >
      <div className="shell rhythm">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="label">Questions</p>
            <h2 id="faq-heading" className="display-lg mt-6">
              Before you{" "}
              <span className="accent-serif">ask us.</span>
            </h2>
            <p className="lede mt-5">
              Still unsure about something?{" "}
              <Link
                href="/contact"
                className="font-semibold text-accent underline underline-offset-4"
              >
                Send us the question
              </Link>{" "}
              and a person answers, usually the same day.
            </p>
          </div>

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
                      className="flex w-full items-start justify-between gap-6 py-5 text-left"
                    >
                      <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
                        {item.question}
                      </span>
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-accent">
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
        </div>
      </div>
    </section>
  );
}
