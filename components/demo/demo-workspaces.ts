import type { DemoPageId, DemoRole } from "./demo-data";

export type DemoWorkspace = {
  label: string;
  entry: DemoPageId;
  tabs: Array<{ page: DemoPageId; label: string }>;
};

export const demoWorkspaces: Record<DemoRole, DemoWorkspace[]> = {
  admin: [
    { label: "Admissions", entry: "admin-intake", tabs: [{ page: "admin-intake", label: "Intake" }, { page: "admin-assessments", label: "Assessments" }, { page: "admin-invites", label: "Invites" }] },
    { label: "People", entry: "admin-clans", tabs: [{ page: "admin-clans", label: "Clans" }, { page: "admin-mentors", label: "Mentors" }, { page: "admin-mentees", label: "Mentees" }, { page: "admin-enrollments", label: "Enrollments" }, { page: "admin-requests", label: "Clan requests" }] },
    { label: "Learning", entry: "admin-programs", tabs: [{ page: "admin-programs", label: "Programs" }, { page: "admin-roadmaps", label: "Roadmaps" }, { page: "admin-schedules", label: "Schedules" }, { page: "admin-library", label: "Library" }, { page: "admin-handbook", label: "Handbook" }] },
    { label: "Recognition", entry: "admin-certificates", tabs: [{ page: "admin-certificates", label: "Certificates" }, { page: "admin-nominations", label: "Co-mentor nominations" }, { page: "admin-top-performers", label: "Top performers" }, { page: "admin-rewards", label: "Rewards" }] },
    { label: "Community", entry: "admin-announcements", tabs: [{ page: "admin-announcements", label: "Announcements" }, { page: "admin-meetings", label: "Live meetings" }, { page: "admin-moderation", label: "Moderation" }, { page: "admin-feedback", label: "Feedback" }] },
    { label: "Insights", entry: "admin-insights", tabs: [{ page: "admin-insights", label: "Overview" }, { page: "admin-review-records", label: "Review records" }, { page: "admin-activity", label: "Activity" }, { page: "admin-followups", label: "Follow-ups" }] },
    { label: "Administration", entry: "admin-access", tabs: [{ page: "admin-access", label: "Roles & access" }, { page: "admin-emails", label: "Email queue" }, { page: "admin-changelog", label: "What’s new" }] },
  ],
  mentor: [
    { label: "My mentees", entry: "mentor-mentees", tabs: [{ page: "mentor-mentees", label: "My mentees" }, { page: "mentor-clan-team", label: "Clan team" }] },
    { label: "Curriculum", entry: "mentor-roadmaps", tabs: [{ page: "mentor-roadmaps", label: "Roadmaps" }, { page: "mentor-interviews", label: "Interviews" }, { page: "mentor-quizzes", label: "Quizzes" }, { page: "mentor-programs", label: "Programs" }, { page: "mentor-library", label: "Library" }] },
    { label: "Recognition", entry: "mentor-top-performers", tabs: [{ page: "mentor-top-performers", label: "Top performers" }, { page: "mentor-promotions", label: "Promotions" }, { page: "mentor-certificates", label: "Certificates" }, { page: "mentor-rewards", label: "Rewards" }] },
    { label: "Insights", entry: "mentor-reports", tabs: [{ page: "mentor-reports", label: "Reports" }, { page: "mentor-scores", label: "Progress scores" }, { page: "mentor-leaderboard", label: "Leaderboard" }] },
    { label: "Community", entry: "mentor-community", tabs: [{ page: "mentor-community", label: "Community" }, { page: "mentor-announcements", label: "Announcements" }] },
  ],
  mentee: [
    { label: "My learning", entry: "mentee-tasks", tabs: [{ page: "mentee-tasks", label: "Tasks" }, { page: "mentee-roadmap", label: "Roadmap" }, { page: "mentee-library", label: "Library" }] },
    { label: "My progress", entry: "mentee-progress", tabs: [{ page: "mentee-progress", label: "Overview" }, { page: "mentee-daily-log", label: "Daily log" }, { page: "mentee-recognition", label: "Points & badges" }, { page: "mentee-certificates", label: "Certificates" }] },
    { label: "My support", entry: "mentee-mentor", tabs: [{ page: "mentee-mentor", label: "My mentor" }, { page: "mentee-blockers", label: "Roadblocks" }] },
    { label: "Community", entry: "mentee-community", tabs: [{ page: "mentee-community", label: "Conversations" }, { page: "mentee-announcements", label: "Announcements" }] },
  ],
};

export function workspaceForPage(role: DemoRole, page: DemoPageId) {
  return demoWorkspaces[role].find((workspace) => workspace.tabs.some((tab) => tab.page === page));
}
