import {
  Route,
  ClipboardCheck,
  CalendarDays,
  MessagesSquare,
  Users,
  Sparkles,
} from "lucide-react";
const features = [
  {
    icon: Route,
    title: "A path people can follow",
    text: "Break big learning goals into practical tasks and milestones. Give mentees a clear next step, every time they return.",
  },
  {
    icon: ClipboardCheck,
    title: "Feedback that moves work forward",
    text: "Review submissions, request changes, and recognize good work. Keep the conversation connected to the task.",
  },
  {
    icon: Users,
    title: "Small groups. Strong connections.",
    text: "Organize programs into cohorts and mentor-led clans, so every learner has people to turn to.",
  },
  {
    icon: CalendarDays,
    title: "Make time for meaningful check-ins",
    text: "Keep sessions, attendance, and coaching notes together. Spend your time with people, not piecing together updates.",
  },
  {
    icon: MessagesSquare,
    title: "A community between sessions",
    text: "Keep questions, conversations, and shared wins close to the learning. Help people feel part of something.",
  },
  {
    icon: Sparkles,
    title: "Support for the work behind the scenes",
    text: "Use AI-assisted roadmaps and evaluation where your plan enables them, with mentors guiding the learning journey.",
  },
];
export function Features() {
  return (
    <section id="features" className="section-space bg-surface">
      <div className="page-width">
        <div className="grid gap-5 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow">Less coordination. More connection.</p>
            <h2 className="section-title mt-4">
              Everything around
              <br />
              the mentoring moment.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-muted md:justify-self-end">
            Good mentorship takes more than a meeting. Pathment gives the work
            before, between, and after each session a place to belong.
          </p>
        </div>
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title} className="border-t border-line pt-7">
              <Icon
                size={23}
                strokeWidth={1.6}
                className="mb-6 text-accent"
              />
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
