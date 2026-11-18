import { BarChart3, BookOpen, Layers, Users } from "lucide-react";
import { Reveal } from "./Reveal";

const tools = [
  {
    icon: Layers,
    title: "Program operations",
    body: "Applications, cohorts, mentor-led clans and program setup.",
  },
  {
    icon: Users,
    title: "Mentorship experience",
    body: "Mentor matching, reviews, feedback and 1:1 collaboration.",
  },
  {
    icon: BookOpen,
    title: "Learning & progress",
    body: "Structured learning, milestones and outcome tracking.",
  },
  {
    icon: BarChart3,
    title: "Insights & outcomes",
    body: "Engagement, program health and real impact reports.",
  },
] as const;

const audiences = [
  "Fellowships & bootcamps",
  "Internal L&D",
  "Universities & career services",
  "Communities & nonprofits",
] as const;

export function Toolkit() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="lp-bg scroll-mt-20"
    >
      <div className="shell grid gap-8 py-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,3fr)] lg:items-center lg:gap-8 lg:py-16">
        <div>
          <p className="lp-label">Everything you need</p>
          <h2
            id="capabilities-heading"
            className="lp-heading mt-3 text-[clamp(1.5rem,2.4vw,1.85rem)]"
          >
            A complete toolkit for mentorship programs.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            The essential building blocks to run your program end to end.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {tools.map((tool, index) => (
            <li key={tool.title}>
              <Reveal delay={index * 0.06} className="lp-card h-full p-5">
                <tool.icon className="h-6 w-6 text-[var(--lp-green)]" strokeWidth={2} />
                <h3 className="mt-4 text-[15px] font-semibold text-ink">{tool.title}</h3>
                <p className="mt-1.5 text-[13px] leading-5 text-muted">{tool.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {/* Who it is for. Anchored so the Solutions menu has a destination. */}
      <div id="audiences" className="scroll-mt-24 border-t border-line">
        <div className="shell flex flex-col gap-3 py-5 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
          <span className="lp-label !text-[10px]">Built for</span>
          {audiences.map((audience) => (
            <span key={audience} className="font-medium text-ink/80">
              {audience}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
