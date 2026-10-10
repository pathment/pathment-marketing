import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Smartphone } from "lucide-react";
import { ANDROID_CLOSED_TEST_URL } from "../../lib/links";

const roleScreens = [
  {
    role: "Admin",
    title: "Decisions stay visible",
    copy: "See admissions, people, and the program signals that need attention.",
    image: "/mobile/admin-home.webp",
    alt: "Pathment Android admin home showing pending applications, program totals, and clan status.",
  },
  {
    role: "Mentor",
    title: "The next review is clear",
    copy: "Keep mentees, overdue submissions, and follow-ups within reach.",
    image: "/mobile/mentor-home.webp",
    alt: "Pathment Android mentor home showing mentees needing attention and a review queue.",
  },
  {
    role: "Mentee",
    title: "Progress travels with them",
    copy: "Check the next step, log progress, and raise a roadblock from the phone.",
    image: "/mobile/mentee-home.webp",
    alt: "Pathment Android mentee home showing progress, daily log, and roadblock actions.",
  },
] as const;

function PhoneScreen({ screen, featured = false }: { screen: (typeof roleScreens)[number]; featured?: boolean }) {
  return (
    <article className={`min-w-[78vw] snap-center sm:min-w-[21rem] md:min-w-0 ${featured ? "md:-translate-y-5" : ""}`}>
      <div className="rounded-[2.2rem] border border-white/15 bg-[#041f1c] p-2 shadow-[0_30px_80px_-35px_rgba(0,0,0,.75)]">
        <div className="overflow-hidden rounded-[1.75rem] bg-white">
          <Image
            src={screen.image}
            alt={screen.alt}
            width={540}
            height={1050}
            sizes="(max-width: 767px) 78vw, (max-width: 1279px) 30vw, 330px"
            className="h-auto w-full"
          />
        </div>
      </div>
      <div className="px-2 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-300">{screen.role}</p>
        <h3 className="mt-2 text-lg font-semibold text-white">{screen.title}</h3>
        <p className="mt-2 text-sm leading-6 text-brand-100/70">{screen.copy}</p>
      </div>
    </article>
  );
}

export function MobileExperience() {
  return (
    <section id="mobile-app" className="scroll-mt-[4.5rem] overflow-hidden bg-brand-950 px-5 py-20 text-white sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-300/25 bg-white/5 px-3 py-2 text-xs font-semibold text-brand-100">
              <Smartphone aria-hidden="true" size={15} />
              Android closed testing
            </div>
            <h2 className="mt-6 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              The same program, in their pocket.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-brand-100/75">
              Pathment’s native Android app keeps admins, mentors, and mentees close to the work that matters. These are real screens captured from the seeded product—not marketing mockups.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[.045] p-6 sm:p-7">
            <ul className="grid gap-4 text-sm leading-6 text-brand-50 sm:grid-cols-2">
              <li className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-brand-300" size={18} />Quick access to the next decision, review, or learning step.</li>
              <li className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-brand-300" size={18} />Role-specific navigation with the same Pathment design language.</li>
              <li className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-brand-300" size={18} />Real seeded program data from the local demo environment.</li>
              <li className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-brand-300" size={18} />Designed for fast check-ins when a laptop is not nearby.</li>
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={ANDROID_CLOSED_TEST_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-400 px-5 py-3.5 text-sm font-semibold text-brand-950 transition hover:bg-brand-300 sm:w-auto"
              >
                Join the Android closed test <ArrowUpRight aria-hidden="true" size={17} />
              </a>
              <p className="text-xs leading-5 text-brand-100/60">Available to invited testers through Google Play. A permitted Google account is required.</p>
            </div>
          </div>
        </div>

        <div aria-label="Pathment Android app screens" className="mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
          {roleScreens.map((screen, index) => <PhoneScreen key={screen.role} screen={screen} featured={index === 1} />)}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[.045]">
            <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-white">
              <Image src="/mobile/admin-intake.webp" alt="Pathment Android intake view with applicants ready for an admission decision." fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover object-top" />
            </div>
            <div className="p-6"><p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-300">Admin detail</p><h3 className="mt-2 text-xl font-semibold">Admissions without the spreadsheet chase</h3><p className="mt-3 text-sm leading-6 text-brand-100/70">Review who is ready, how long they have waited, and what happens after acceptance.</p></div>
          </article>
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[.045]">
            <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-white">
              <Image src="/mobile/mentor-review.webp" alt="Pathment Android mentor review queue with waiting submissions and point values." fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover object-top" />
            </div>
            <div className="p-6"><p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-300">Mentor detail</p><h3 className="mt-2 text-xl font-semibold">A review queue that explains itself</h3><p className="mt-3 text-sm leading-6 text-brand-100/70">Oldest work appears first, with the learner, task, wait time, and points kept together.</p></div>
          </article>
        </div>
      </div>
    </section>
  );
}
