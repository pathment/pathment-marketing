import Image from "next/image";
import { testimonials } from "./site-content";
import { Stagger, StaggerItem } from "./Reveal";

/**
 * Nine quotes in a three-column masonry so the cards keep their natural
 * height instead of padding out to a shared one.
 *
 * Any entry still flagged `placeholder` is written copy, not something a
 * person said, so it renders without a name and the section heading says the
 * block is illustrative. Nothing invented is ever attributed to anyone.
 * Delete the flag and add `name` as real feedback arrives; the two states mix
 * freely, so they can be swapped in one at a time.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  const allPlaceholder = testimonials.every((item) => item.placeholder);
  const anyPlaceholder = testimonials.some((item) => item.placeholder);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-b border-line bg-sand"
    >
      <div className="shell rhythm">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <div>
            <p className="label">
              {allPlaceholder ? "What the work sounds like" : "From the people running it"}
            </p>
            <h2 id="testimonials-heading" className="display-lg mt-6">
              Three seats, three versions of{" "}
              <span className="accent-serif">the same relief.</span>
            </h2>
          </div>
          {anyPlaceholder ? (
            <p className="text-sm leading-6 text-muted">
              {allPlaceholder
                ? "Illustrative, not quoted. These describe the situations Pathment is built for, in the words program leads, mentors and mentees tend to use. Named feedback replaces them as it comes in."
                : "Entries without a name are illustrative rather than quoted."}
            </p>
          ) : null}
        </div>

        <Stagger
          className="mt-12 gap-4 lg:mt-16 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid"
          stagger={0.04}
        >
          {testimonials.map((item) => (
            <StaggerItem key={item.quote}>
              <figure className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
                <blockquote className="font-display text-[1.02rem] font-medium leading-[1.6] tracking-tight text-ink">
                  {item.placeholder ? item.quote : `“${item.quote}”`}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  {item.name && item.avatar ? (
                    <Image
                      src={item.avatar}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-canvas font-mono text-[10px] uppercase text-accent"
                    >
                      {item.role.slice(0, 1)}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink">
                      {item.name ?? item.role}
                    </span>
                    <span className="block truncate text-xs text-muted">
                      {item.name ? `${item.role} · ${item.context}` : item.context}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
