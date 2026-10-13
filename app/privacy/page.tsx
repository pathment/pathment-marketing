import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  Database,
  EyeOff,
  FileKey2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import { Footer } from "../../components/landing/Footer";
import { Navbar } from "../../components/landing/Navbar";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn what information Pathment collects, how it is used, who can see it, and the choices available to workspace members.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy",
    description:
      "A clear account of how Pathment handles information across mentorship workspaces, the website, and mobile apps.",
    url: "https://pathment.me/privacy",
  },
};

const contents = [
  ["overview", "The short version"],
  ["scope", "Who this policy covers"],
  ["information", "Information we handle"],
  ["use", "How we use information"],
  ["visibility", "Who can see what"],
  ["ai", "AI-assisted features"],
  ["sharing", "When information is shared"],
  ["retention", "Retention and deletion"],
  ["security", "How we protect information"],
  ["choices", "Your choices and rights"],
  ["international", "International processing"],
  ["changes", "Changes to this policy"],
  ["contact", "Contact us"],
] as const;

function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28 border-t border-line py-10 sm:py-12"
    >
      <div className="mb-5 flex items-baseline gap-4">
        <span
          className="font-mono text-xs font-medium text-accent"
          aria-hidden="true"
        >
          {number}
        </span>
        <h2
          id={`${id}-title`}
          className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        >
          {title}
        </h2>
      </div>
      <div className="space-y-5 text-[15px] leading-7 text-muted sm:text-base sm:leading-8">
        {children}
      </div>
    </section>
  );
}

function BulletList({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-3 pl-1">{children}</ul>;
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        className="mt-[0.72rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
        aria-hidden="true"
      />
      <span>{children}</span>
    </li>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <header className="relative overflow-hidden border-b border-line bg-surface">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60 [background-image:radial-gradient(var(--line)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:py-28">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-soft px-3 py-1.5 text-xs font-semibold text-accent">
                <ShieldCheck size={15} aria-hidden="true" />
                Privacy at Pathment
              </div>
              <h1 className="font-display text-4xl leading-[1.08] font-semibold tracking-[-0.045em] text-ink sm:text-6xl">
                Your work is personal.
                <br />
                <span className="text-accent">We treat it that way.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                This policy explains what Pathment handles, why we need it, who
                can see it, and how you can stay in control across the website,
                product, and mobile apps.
              </p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                <span>Effective 4 October 2026</span>
                <span aria-hidden="true" className="hidden text-line sm:inline">
                  •
                </span>
                <a
                  href="mailto:hello@pathment.me"
                  className="font-medium text-accent hover:underline"
                >
                  hello@pathment.me
                </a>
              </div>
            </div>

            <aside className="rounded-2xl border border-line bg-canvas/90 p-6 shadow-md-soft backdrop-blur-sm sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-soft text-accent">
                  <EyeOff size={19} aria-hidden="true" />
                </div>
                <p className="font-display text-lg font-semibold text-ink">
                  No advertising business model
                </p>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">
                We do not sell personal information or use it to build
                third-party advertising profiles. Pathment uses information to
                run, secure, and improve the mentorship service.
              </p>
            </aside>
          </div>
        </header>

        <section
          aria-labelledby="privacy-principles"
          className="border-b border-line bg-canvas"
        >
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
            <h2 id="privacy-principles" className="sr-only">
              Our privacy principles
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: Building2,
                  title: "Your workspace sets the context",
                  body: "Your organisation decides who joins, which role they hold, and which programmes and clans they can access.",
                },
                {
                  icon: LockKeyhole,
                  title: "Access follows responsibility",
                  body: "Admins, mentors, and mentees receive different views. Workspace and clan boundaries are enforced by the service.",
                },
                {
                  icon: UserRoundCheck,
                  title: "People remain accountable",
                  body: "AI can help draft or recommend. Authorised people review the decisions that shape a member’s journey.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-line bg-surface p-6"
                >
                  <Icon size={21} className="text-accent" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-base font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[250px_minmax(0,760px)] lg:justify-between lg:py-16">
          <aside className="hidden lg:block">
            <nav aria-label="Privacy policy sections" className="sticky top-28">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                On this page
              </p>
              <ol className="border-l border-line">
                {contents.map(([id, label], index) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="group flex gap-3 border-l border-transparent py-2 pl-4 text-sm text-muted transition-colors hover:border-accent hover:text-ink"
                    >
                      <span className="font-mono text-[10px] text-muted/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0">
            <div className="mb-4 rounded-2xl border border-line bg-soft p-5 text-sm leading-7 text-ink sm:p-6">
              <strong>Plain language first.</strong> This notice is meant to be
              readable. It describes Pathment’s general practices and does not
              replace the privacy or data-processing terms agreed with your
              organisation.
            </div>

            <PolicySection id="overview" number="01" title="The short version">
              <p>
                Pathment is a mentorship platform used by organisations to run
                programmes, organise mentor-led clans, set learning paths,
                review work, communicate, and understand programme health. We
                collect only the information needed to provide those
                experiences, keep them secure, and support the people using
                them.
              </p>
              <BulletList>
                <Bullet>We do not sell personal information.</Bullet>
                <Bullet>
                  We do not use personal information for third-party behavioural
                  advertising.
                </Bullet>
                <Bullet>
                  Workspace information is separated by organisation and access
                  is based on role and clan membership.
                </Bullet>
                <Bullet>
                  You can ask about, correct, export, or delete information as
                  described below.
                </Bullet>
              </BulletList>
            </PolicySection>

            <PolicySection
              id="scope"
              number="02"
              title="Who this policy covers"
            >
              <p>
                This policy applies when you visit{" "}
                <Link
                  href="/"
                  className="font-medium text-accent hover:underline"
                >
                  pathment.me
                </Link>
                , use a Pathment workspace on the web, use the Pathment mobile
                app, follow a Pathment email or app link, apply to a programme,
                or contact us.
              </p>
              <p>
                For information submitted through a workspace, the organisation
                running that workspace usually decides why and how the
                information is used. Pathment processes that information to
                provide the service on the organisation’s behalf. For our public
                website, account security, service operations, and direct
                communications with us, Pathment may decide how the information
                is handled.
              </p>
            </PolicySection>

            <PolicySection
              id="information"
              number="03"
              title="Information we handle"
            >
              <p>
                The information depends on how you use Pathment and which
                features your organisation enables.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [
                    "Account and profile",
                    "Name, email, profile photo, role, workspace and clan membership, availability, goals, skills, preferences, and account security settings.",
                  ],
                  [
                    "Programme activity",
                    "Applications, assessment answers, roadmaps, assigned tasks, submissions, feedback, scores, progress, blockers, attendance, meeting notes, certificates, points, and rewards.",
                  ],
                  [
                    "Communication",
                    "Direct messages, community posts, comments, reactions, reports, announcements, support requests, and notification preferences.",
                  ],
                  [
                    "Files and media",
                    "Documents, links, images, audio answers, profile and clan images, and camera snapshots when a clearly marked proctored interview requires them.",
                  ],
                  [
                    "Device and usage",
                    "IP address, browser or app details, device and push tokens, sign-in and session records, page or route activity, timestamps, diagnostics, and security audit events.",
                  ],
                  [
                    "Public-site contact",
                    "The information you choose to send when asking about a workspace, pricing, support, or another Pathment service.",
                  ],
                ].map(([title, body]) => (
                  <div
                    key={title}
                    className="rounded-xl border border-line bg-surface p-5"
                  >
                    <h3 className="text-sm font-semibold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-6">{body}</p>
                  </div>
                ))}
              </div>
              <p>
                The public marketing site stores your light or dark appearance
                choice in your browser. The signed-in product also uses
                essential browser or app storage to keep your session and
                selected workspace working. We do not currently use the
                marketing site to run third-party advertising trackers.
              </p>
              <h3 className="font-display text-lg font-semibold text-ink">
                Where it comes from
              </h3>
              <p>
                We receive information directly from you, from the organisation
                that creates or manages your workspace, from other members when
                they collaborate with or review your work, and automatically
                from the device and service as you use Pathment. We may also
                receive information from a service your organisation asks us to
                connect.
              </p>
            </PolicySection>

            <PolicySection id="use" number="04" title="How we use information">
              <BulletList>
                <Bullet>
                  Provide accounts, workspaces, programmes, learning workflows,
                  reviews, messaging, meetings, notifications, certificates, and
                  other requested features.
                </Bullet>
                <Bullet>
                  Apply workspace, role, programme, and clan access rules.
                </Bullet>
                <Bullet>
                  Send transactional messages such as invitations, sign-in
                  links, password resets, review reminders, and programme
                  updates.
                </Bullet>
                <Bullet>
                  Protect accounts, detect abuse, investigate incidents, enforce
                  limits, and maintain audit records.
                </Bullet>
                <Bullet>
                  Measure reliability and feature use, troubleshoot problems,
                  and improve the service.
                </Bullet>
                <Bullet>
                  Respond to support, sales, privacy, and security requests.
                </Bullet>
                <Bullet>
                  Meet legal obligations and establish, exercise, or defend
                  legal claims.
                </Bullet>
              </BulletList>
              <p>
                Depending on the context and applicable law, these uses rely on
                our contract with an organisation or user, legitimate interests
                in operating and securing the service, consent where it is
                required, or compliance with law.
              </p>
            </PolicySection>

            <PolicySection id="visibility" number="05" title="Who can see what">
              <p>
                Pathment is collaborative, so some information is meant to be
                shared inside your workspace. What another member can see
                depends on their role, permissions, programme, and clan
                relationship.
              </p>
              <BulletList>
                <Bullet>
                  <strong className="text-ink">Mentees</strong> see their own
                  journey, feedback, clan spaces, conversations, results, and
                  information intentionally shared with them.
                </Bullet>
                <Bullet>
                  <strong className="text-ink">Mentors</strong> see the members
                  and work they are authorised to support, including
                  submissions, progress, notes, and relevant programme activity.
                </Bullet>
                <Bullet>
                  <strong className="text-ink">
                    Admins and authorised workspace staff
                  </strong>{" "}
                  can manage membership and programmes and may access broader
                  operational, moderation, reporting, and audit information.
                </Bullet>
                <Bullet>
                  <strong className="text-ink">Public visitors</strong> can see
                  information deliberately published, such as a certificate
                  verification page or public programme application.
                </Bullet>
              </BulletList>
              <p>
                Do not place sensitive information in a shared post, submission,
                note, or file unless it is appropriate for the people who can
                access that space.
              </p>
            </PolicySection>

            <PolicySection id="ai" number="06" title="AI-assisted features">
              <div className="rounded-2xl border border-line bg-soft p-6">
                <div className="flex items-center gap-3 text-ink">
                  <Bot size={21} aria-hidden="true" />
                  <h3 className="font-display font-semibold">
                    Assistance, not silent authority
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Pathment uses AI to help draft roadmaps, feedback, summaries,
                  recommendations, and other working material. Authorised people
                  can review or edit these outputs before using them in
                  consequential mentorship decisions.
                </p>
              </div>
              <p>
                When an AI feature is used, the instructions and relevant
                workspace content needed for that feature may be sent to an AI
                service provider. This may include task text, submissions,
                feedback, assessment answers, or knowledge documents. We limit
                that context to the feature being requested and apply the same
                workspace access rules before it is sent.
              </p>
              <p>
                AI output can be incomplete or wrong. Members should review it,
                and should not enter confidential information that is unrelated
                to the mentorship task. Contact your workspace administrator if
                you need to understand whether a particular AI feature is
                enabled for your programme.
              </p>
              <p>
                Pathment does not use an AI output by itself to make a legal or
                similarly significant decision about a member. If you believe a
                decision relied on incorrect information or automation, ask the
                authorised person or workspace administrator to review it.
              </p>
            </PolicySection>

            <PolicySection
              id="sharing"
              number="07"
              title="When information is shared"
            >
              <p>
                We share information only when needed for the service or another
                legitimate purpose described here:
              </p>
              <BulletList>
                <Bullet>
                  With members of your workspace according to their permissions
                  and the feature you use.
                </Bullet>
                <Bullet>
                  With service providers that support hosting, databases, file
                  storage, email, push notifications, video meetings, security,
                  and AI-assisted features.
                </Bullet>
                <Bullet>
                  With your organisation when it requests support, an export, an
                  investigation, or another action it is authorised to direct.
                </Bullet>
                <Bullet>
                  When required by law, legal process, or a valid government
                  request, or when reasonably necessary to protect people,
                  Pathment, a workspace, or the public.
                </Bullet>
                <Bullet>
                  As part of a merger, financing, acquisition, restructuring, or
                  sale, subject to appropriate confidentiality and notice
                  requirements.
                </Bullet>
              </BulletList>
              <p>
                We require service providers to handle information for the
                services they provide to us and to protect it appropriately.
              </p>
            </PolicySection>

            <PolicySection
              id="retention"
              number="08"
              title="Retention and deletion"
            >
              <p>
                We keep information for as long as needed to provide the
                workspace, preserve legitimate programme records, meet
                contractual and legal obligations, resolve disputes, and protect
                the service. Your organisation may set additional retention
                requirements for its workspace.
              </p>
              <p>
                Some operational records follow shorter cycles. Our routine
                policy removes expired refresh-token records after a limited
                safety period, clears sent email bodies after 30 days, and
                removes successful routine activity audit events after 90 days.
                Security, financial, dispute, backup, and programme records may
                be kept longer when there is a valid reason.
              </p>
              <p>
                If an account or workspace is closed, information may remain for
                a reasonable period in backups or restricted records before
                deletion. We may keep de-identified or aggregated information
                that no longer identifies an individual.
              </p>
            </PolicySection>

            <PolicySection
              id="security"
              number="09"
              title="How we protect information"
            >
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  [
                    FileKey2,
                    "Scoped access",
                    "Workspace, role, permission, and clan checks limit access to relevant information.",
                  ],
                  [
                    Database,
                    "Operational controls",
                    "Audit records, session controls, rate limits, and monitoring help detect misuse.",
                  ],
                  [
                    LockKeyhole,
                    "Protected transport",
                    "Pathment services use encrypted network connections in normal operation.",
                  ],
                ].map(([Icon, title, body]) => {
                  const SecurityIcon = Icon as typeof ShieldCheck;
                  return (
                    <div
                      key={String(title)}
                      className="rounded-xl border border-line bg-surface p-5"
                    >
                      <SecurityIcon
                        size={19}
                        className="text-accent"
                        aria-hidden="true"
                      />
                      <h3 className="mt-4 text-sm font-semibold text-ink">
                        {String(title)}
                      </h3>
                      <p className="mt-2 text-sm leading-6">{String(body)}</p>
                    </div>
                  );
                })}
              </div>
              <p>
                No system is completely secure. Use a strong, unique password
                where applicable, protect sign-in links and devices, enable
                available account protections, and tell us promptly if you
                believe an account or workspace has been compromised.
              </p>
            </PolicySection>

            <PolicySection
              id="choices"
              number="10"
              title="Your choices and rights"
            >
              <p>
                Depending on where you live, you may have rights to access,
                correct, delete, restrict, object to, or receive a copy of
                personal information, and to withdraw consent where processing
                is based on consent.
              </p>
              <div className="rounded-xl border-l-4 border-accent bg-soft p-5 text-ink">
                <strong>Your right to object.</strong> You can object to direct
                marketing at any time. You may also be able to object when
                processing is based on legitimate interests or your particular
                situation. Email us or contact your workspace administrator so
                the request reaches the responsible organisation.
              </div>
              <BulletList>
                <Bullet>
                  Update available profile and notification settings directly in
                  Pathment.
                </Bullet>
                <Bullet>
                  Contact your workspace administrator for programme records or
                  membership managed by your organisation.
                </Bullet>
                <Bullet>
                  Email us for account, security, or privacy help. We may need
                  to verify your identity and coordinate with the organisation
                  that controls the workspace.
                </Bullet>
                <Bullet>
                  You may complain to the relevant data protection authority if
                  you believe your rights have not been respected.
                </Bullet>
              </BulletList>
              <p>
                If a workspace includes minors, the organisation running the
                programme is responsible for obtaining any authorisation or
                consent required by law. A parent or guardian can contact the
                organisation or Pathment about a child’s information.
              </p>
            </PolicySection>

            <PolicySection
              id="international"
              number="11"
              title="International processing"
            >
              <p>
                Pathment and its service providers may process information in
                countries other than the one where you live. Where required, we
                use contractual and organisational safeguards intended to
                protect information during those transfers.
              </p>
            </PolicySection>

            <PolicySection
              id="changes"
              number="12"
              title="Changes to this policy"
            >
              <p>
                We may update this policy as Pathment changes or legal
                requirements develop. We will change the effective date above
                and, when a change is material, provide additional notice
                through the service, by email, or through the organisation
                running your workspace.
              </p>
            </PolicySection>

            <PolicySection id="contact" number="13" title="Contact us">
              <p>
                If you have a privacy question or request, tell us what you need
                and which workspace is involved. Please do not email passwords,
                sign-in links, assessment files, or other sensitive content.
              </p>
              <a
                href="mailto:hello@pathment.me?subject=Pathment%20privacy%20request"
                className="group mt-2 flex items-center justify-between gap-5 rounded-2xl bg-brand-600 p-5 text-white transition-colors hover:bg-brand-700 sm:p-6"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
                    <Mail size={19} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium text-white/70">
                      Privacy requests
                    </span>
                    <span className="mt-0.5 block font-display text-lg font-semibold">
                      hello@pathment.me
                    </span>
                  </span>
                </span>
                <ArrowRight
                  className="shrink-0 transition-transform group-hover:translate-x-1"
                  size={20}
                  aria-hidden="true"
                />
              </a>
            </PolicySection>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
