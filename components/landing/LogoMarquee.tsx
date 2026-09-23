import { Building2, GraduationCap, Users } from "lucide-react";
export function LogoMarquee() {
  return (
    <section
      aria-label="Who Pathment is for"
      className="border-y border-line bg-surface"
    >
      <div className="page-width flex flex-col justify-between gap-6 py-7 md:flex-row md:items-center">
        <p className="text-sm text-muted">
          Built for people.
          <br />
          <span className="font-semibold text-ink">
            Ready for your way of mentoring.
          </span>
        </p>
        <div className="flex flex-wrap gap-x-9 gap-y-4 text-sm font-medium text-ink">
          {[
            [Users, "Communities"],
            [GraduationCap, "Fellowships"],
            [Building2, "Learning teams"],
          ].map(([Icon, label]) => {
            const Mark = Icon as typeof Users;
            return (
              <span key={label as string} className="flex items-center gap-2.5">
                <Mark size={18} strokeWidth={1.6} className="text-accent" />
                {label as string}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
