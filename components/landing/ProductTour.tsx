"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  LayoutDashboard,
  ClipboardCheck,
  Route,
  Play,
  Maximize2,
  X,
} from "lucide-react";
const screens = [
  {
    id: "admin",
    label: "For admins",
    icon: LayoutDashboard,
    image: "/product/admin-dashboard.webp",
    title: "See the whole program. Focus your next move.",
    copy: "Bring people, programs, and progress into focus. Spot the groups that need support and keep your mentorship community moving together.",
    alt: "Pathment admin overview with active mentees, clan priorities, approvals, and completion distribution in a demo workspace.",
  },
  {
    id: "mentor",
    label: "For mentors",
    icon: ClipboardCheck,
    image: "/product/mentor-dashboard.webp",
    title: "Less catching up. More moving people forward.",
    copy: "Find the reviews, roadblocks, and check-ins that need your attention. Spend less time gathering updates and more time giving useful guidance.",
    alt: "Pathment mentor dashboard with pending reviews, roadblocks, and mentee check-ins in a demo workspace.",
  },
  {
    id: "mentee",
    label: "For mentees",
    icon: Route,
    image: "/product/mentee-dashboard.webp",
    title: "Your next step, always within reach.",
    copy: "Know what to work on, see how far you have come, and find support when you need it. A clear place to return to, wherever you are in your learning journey.",
    alt: "Pathment mentee dashboard with the next task, completed work, mentor support, and an active learning queue.",
  },
];
export function ProductTour() {
  const [active, setActive] = useState(0);
  const [video, setVideo] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const screen = screens[active];
  return (
    <section id="solutions" className="section-space bg-surface">
      <div className="page-width">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">The real product, up close</p>
            <h2 className="section-title mt-4">
              Three perspectives.
              <br />
              One shared direction.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted">
            Explore the admin, mentor, and mentee views, captured from our
            working demo workspace.
          </p>
        </div>
        <div id="product-tour" className="mt-10 scroll-mt-28">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-5 sm:flex-row">
            <div
              role="tablist"
              aria-label="Product screens"
              className="flex flex-wrap gap-2"
            >
              {screens.map(({ id, label, icon: Icon }, i) => (
                <button
                  key={id}
                  id={`tour-${id}`}
                  role="tab"
                  aria-selected={!video && active === i}
                  aria-controls="tour-panel"
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => {
                    setActive(i);
                    setVideo(false);
                  }}
                  onKeyDown={(e) => {
                    const next =
                      e.key === "ArrowRight"
                        ? (i + 1) % screens.length
                        : e.key === "ArrowLeft"
                          ? (i + screens.length - 1) % screens.length
                          : e.key === "Home"
                            ? 0
                            : e.key === "End"
                              ? screens.length - 1
                              : null;
                    if (next !== null) {
                      e.preventDefault();
                      setActive(next);
                      setVideo(false);
                      document
                        .getElementById(`tour-${screens[next].id}`)
                        ?.focus();
                    }
                  }}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${!video && active === i ? "bg-brand-600 text-white" : "bg-soft text-muted hover:bg-soft"}`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setVideo((v) => !v)}
              aria-pressed={video}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              <Play size={16} />
              {video ? "Back to screenshots" : "Watch the 32-second tour"}
            </button>
          </div>
          {video ? (
            <div
              id="tour-panel"
              className="mt-7 rounded-2xl border border-line bg-[#072e2a] p-3 sm:p-5"
            >
              <video
                controls
                playsInline
                preload="metadata"
                poster="/product/tour-poster.webp"
                className="aspect-[3/2] w-full rounded-xl"
                aria-label="32-second Pathment visual tour using real demo screenshots"
              >
                <source src="/product/pathment-tour.mp4" type="video/mp4" />
                <track
                  kind="captions"
                  src="/product/tour.vtt"
                  srcLang="en"
                  label="English"
                  default
                />
                Your browser does not support video. Explore the product
                screenshots instead.
              </video>
              <p className="mt-4 text-center text-xs leading-6 text-brand-200">
                A captioned visual tour of the admin overview, mentor dashboard,
                and mentee learning experience. Demo data. No audio.
              </p>
            </div>
          ) : (
            <div
              id="tour-panel"
              role="tabpanel"
              aria-labelledby={`tour-${screen.id}`}
              className="pt-7"
              tabIndex={0}
            >
              <div className="mb-6 grid gap-3 md:grid-cols-2 md:items-start">
                <h3 className="max-w-md text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  {screen.title}
                </h3>
                <p className="text-sm leading-7 text-muted">{screen.copy}</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-line bg-soft p-2 sm:p-4">
                <button
                  onClick={() => dialog.current?.showModal()}
                  aria-label={`Enlarge ${screen.label} screenshot`}
                  className="group relative block aspect-[1424/900] w-full overflow-hidden rounded-lg text-left"
                >
                  <Image
                    unoptimized
                    src={screen.image}
                    alt={screen.alt}
                    width={1424}
                    height={900}
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="h-full w-full object-contain bg-white"
                  />
                  <span className="absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink shadow-sm">
                    <Maximize2 size={14} /> View full size
                  </span>
                </button>
              </div>
              <p className="mt-3 text-xs text-muted">
                Actual Pathment interface. Sample names and activity from the
                demo workspace.
              </p>
            </div>
          )}
        </div>
        <dialog
          ref={dialog}
          aria-label={`${screen.label} product screenshot`}
          className="m-auto max-h-[95dvh] w-[96vw] max-w-[1600px] overflow-auto rounded-2xl border border-line bg-surface p-3 backdrop:bg-[#072e2a]/75 sm:p-5"
          onClick={(e) => {
            if (e.target === e.currentTarget) dialog.current?.close();
          }}
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-ink">
              {screen.label} · Pathment demo
            </p>
            <a
              href={screen.image}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs font-semibold text-accent underline underline-offset-4"
            >
              Open original
            </a>
            <button
              onClick={() => dialog.current?.close()}
              className="rounded-lg bg-soft p-2 text-ink"
              aria-label="Close screenshot"
            >
              <X size={20} />
            </button>
          </div>
          <Image
            unoptimized
            src={screen.image}
            alt={screen.alt}
            width={1424}
            height={900}
            sizes="96vw"
            className="h-auto w-full"
          />
        </dialog>
      </div>
    </section>
  );
}
