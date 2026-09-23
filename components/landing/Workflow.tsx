import { Users, Route, ChartNoAxesCombined } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { SectionHeader } from "./SectionHeader";
const steps = [
  {
    icon: Users,
    title: "Bring your people together",
    description:
      "Work with our team to set up your workspace. Invite mentors and mentees, and organize your first program.",
  },
  {
    icon: Route,
    title: "Give growth a direction",
    description:
      "Create cohorts and mentor-led groups. Build roadmaps with clear milestones, tasks, and room for feedback.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Make progress visible",
    description:
      "Review submissions, celebrate milestones, and see where your mentees need a little more support.",
  },
];
export function Workflow() {
  return (
    <SectionShell
      id="how-it-works"
      tone="muted"
      ariaLabelledby="how-it-works-title"
    >
      <SectionHeader
        label="How it works"
        titleId="how-it-works-title"
        title="From good intentions to real progress."
        description="Start with one program. Build a rhythm that works for your people."
      />
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, description }, i) => (
          <article key={title} className="border-t border-zinc-300 pt-6">
            <div className="mb-7 flex items-center justify-between">
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <Icon className="text-accent" size={23} />
            </div>
            <h3 className="mb-3 text-xl font-semibold tracking-tight text-ink">
              {title}
            </h3>
            <p className="max-w-sm text-sm leading-7 text-muted">
              {description}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
