import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Footer } from "../../components/landing/Footer";
import { Navbar } from "../../components/landing/Navbar";
import { shipped } from "../../components/landing/site-content";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What shipped in Pathment recently: new features for admins, mentors and mentees.",
  alternates: { canonical: "/changelog" },
  openGraph: {
    title: "Changelog",
    description: "What shipped in Pathment recently.",
    url: "https://pathment.me/changelog",
  },
};

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="lp-bg">
        <div className="shell max-w-3xl py-16 lg:py-24">
          <p className="lp-label">Changelog</p>
          <h1 className="lp-heading mt-3 text-[clamp(2rem,4vw,2.8rem)]">
            Built every week, with the programs that use it.
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-muted">
            What shipped recently for admins, mentors and mentees. Every change
            lands in the live product and the demo.
          </p>

          <ol className="relative mt-12 space-y-8 border-l border-line pl-7">
            {shipped.map((item, index) => (
              <li key={item.title} className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-[2.05rem] top-1.5 h-3 w-3 rounded-full ${
                    index === 0 ? "lp-pulse-ring bg-[var(--lp-green)]" : "bg-line"
                  }`}
                />
                <p className="numeric text-[12px] font-medium uppercase tracking-[0.12em] text-muted">
                  {item.date}
                </p>
                <p className="mt-1.5 flex items-start gap-2 text-[16px] font-medium leading-6 text-ink">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--lp-green)]" />
                  {item.title}
                </p>
              </li>
            ))}
          </ol>

          <Link
            href="/demo"
            className="lp-btn-leaf group mt-14 inline-flex"
          >
            See it in the live demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
