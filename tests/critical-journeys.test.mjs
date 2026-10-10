import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const source = (path) => readFile(new URL(path, root), "utf8");

test("canonical application destinations are centralized and correct", async () => {
  const links = await source("lib/links.ts");
  assert.match(links, /https:\/\/app\.pathment\.me\/login/);
  assert.match(links, /https:\/\/app\.pathment\.me\/register/);
  assert.match(links, /https:\/\/play\.google\.com\/apps\/testing\/me\.pathment\.app/);
  assert.doesNotMatch(links, /devweekends/i);
});

test("homepage presents the interactive Android experience without test-phase copy", async () => {
  const page = await source("app/page.tsx");
  const mobile = await source("components/landing/MobileExperience.tsx");
  const product = await source("components/mobile/MobileProductDemo.tsx");
  assert.match(page, /MobileExperience/);
  assert.match(mobile, /\/demo\?device=mobile/);
  assert.match(mobile, /\/demo\?device=web/);
  assert.match(mobile, /Google Play/);
  assert.doesNotMatch(mobile, /closed test|testing phase|invited tester/i);
  for (const destination of ["Home", "Intake", "People", "Review", "Journey", "Inbox", "More"]) {
    assert.match(product, new RegExp(`label: "${destination}"`));
  }
  for (const role of ["admin", "mentor", "mentee"]) assert.match(product, new RegExp(`${role}: \\[`));
  assert.match(product, /safe simulation/i);
});

test("homepage exposes demo, registration, sign-in, and contact journeys", async () => {
  const hero = await source("components/landing/Hero.tsx");
  const form = await source("components/landing/FinalCta.tsx");
  assert.match(hero, /Explore the product/);
  assert.match(hero, /Create an organization/);
  assert.match(hero, /Already use Pathment\? Sign in/);
  assert.match(form, /Talk to the Pathment team/);
});

test("demo contains all roles and completion controls", async () => {
  const demo = await source("components/demo/InteractiveDemo.tsx");
  const screens = await source("components/demo/DemoScreens.tsx");
  const workspaces = await source("components/demo/demo-workspaces.ts");
  for (const role of ["admin", "mentor", "mentee"]) assert.match(demo, new RegExp(`${role}:`));
  for (const destination of ["Intake", "Assessments", "Invites", "My mentees", "My learning"]) assert.match(`${demo}\n${workspaces}`, new RegExp(destination));
  assert.match(demo, /onRestart/);
  assert.match(demo, /demo_step_completed/);
  assert.match(screens, /Nothing was saved here/);
  assert.match(screens, /Node fundamentals & the module system/);
  assert.match(screens, /onKeyDown=.*Enter.*event\.key === " "/);
  assert.match(screens, /BadgeDetail/);
  assert.match(demo, /dev-weekends-logo\.svg/);
  assert.match(demo, /fictional demo profile/);
  assert.match(screens, /Conversation with/);
  assert.match(screens, /Attendance and review order/);
  assert.match(screens, /My Fellowship Roadmap/);
});

test("experience chooser supports web and mobile with viewport-aware defaults", async () => {
  const page = await source("app/demo/page.tsx");
  const chooser = await source("components/demo/ExperienceDemo.tsx");
  assert.match(page, /device/);
  assert.match(chooser, /matchMedia/);
  assert.match(chooser, /max-width: 1023px/);
  assert.match(chooser, /Open Web workspace/);
  assert.match(chooser, /Open mobile app/);
  assert.match(chooser, /Choose a Pathment role/);
  assert.match(chooser, /switch role or device at any time/i);
});

test("demo exposes the complete role navigation rather than dead-end previews", async () => {
  const demo = await source("components/demo/InteractiveDemo.tsx");
  const workspaces = await source("components/demo/demo-workspaces.ts");
  const sources = `${demo}\n${workspaces}`;
  const uniquePages = (role) => new Set((sources.match(new RegExp(`page: "${role}-[^"]+"`, "g")) ?? []).map((entry) => entry.slice(7, -1)));
  assert.equal(uniquePages("admin").size, 31);
  assert.equal(uniquePages("mentor").size, 23);
  assert.equal(uniquePages("mentee").size, 14);
  assert.doesNotMatch(demo, /const adminNavigation: NavGroup/);
  assert.match(demo, /WorkspaceTabs/);
  for (const interaction of ["Manage workspaces", "Search Pathment preview", "Notifications", "Send feedback", "Customize menu"]) {
    assert.match(demo, new RegExp(interaction));
  }
});

test("admin preview uses route-specific product screens and complete local actions", async () => {
  const screens = await source("components/demo/AdminProductScreens.tsx");
  const router = await source("components/demo/DemoScreens.tsx");
  assert.match(router, /AdminProductPage/);
  for (const route of [
    "admin-intake", "admin-assessments", "admin-invites", "admin-clans", "admin-mentors",
    "admin-programs", "admin-handbook", "admin-certificates", "admin-rewards",
    "admin-announcements", "admin-insights", "admin-access", "admin-settings",
  ]) assert.match(screens, new RegExp(`case "${route}"`));
  for (const action of [
    "Create assessment", "Create invite link", "Create clan", "Create program",
    "Save handbook", "Create gift", "Create custom role", "Profile", "AI Connections",
  ]) assert.match(screens, new RegExp(action));
  assert.match(screens, /does not contact the production API/);
  for (const intakeElement of ["New cohort", "Review applications", "Admissions settings", "Run intake scoring", "accept & invite"]) {
    assert.match(screens, new RegExp(intakeElement, "i"));
  }
  for (const reviewElement of ["Attendance trend", "Review coverage", "Talk time", "Mentee participation"]) {
    assert.match(screens, new RegExp(reviewElement));
  }
});

test("mentor preview covers each real workspace and keeps simulated decisions explicit", async () => {
  const screens = await source("components/demo/MentorProductScreens.tsx");
  const router = await source("components/demo/DemoScreens.tsx");
  assert.match(router, /MentorProductPage/);
  for (const route of [
    "mentor-dashboard", "mentor-review", "mentor-approvals", "mentor-mentees",
    "mentor-clan-team", "mentor-roadmaps", "mentor-interviews", "mentor-quizzes",
    "mentor-programs", "mentor-library", "mentor-top-performers", "mentor-promotions",
    "mentor-certificates", "mentor-rewards", "mentor-reports", "mentor-scores",
    "mentor-leaderboard", "mentor-community", "mentor-announcements",
    "mentor-schedule", "mentor-handbook", "mentor-settings",
  ]) assert.match(screens, new RegExp(`case "${route}"`));
  for (const interaction of [
    "Assign task", "Mark reviewed", "Bulk review", "Start interview",
    "Certificate criteria & rules", "Review history", "Availability", "Documents & replies",
  ]) assert.match(screens, new RegExp(interaction));
  assert.match(screens, /Nothing was sent to a real mentee or API/);
  for (const reviewElement of ["Start review room", "Attendance", "Up next", "Progress on open work", "Mentee summary", "Extension requests", "Session progress"]) {
    assert.match(screens, new RegExp(reviewElement));
  }
  assert.match(screens, /linear-gradient\(125deg,#d7f8e7,#b8eed7\)/);
});

test("mentee preview implements every product workspace without cross-role aliases", async () => {
  const screens = await source("components/demo/MenteeProductScreens.tsx");
  const router = await source("components/demo/DemoScreens.tsx");
  assert.match(router, /MenteeProductPage/);
  for (const route of [
    "mentee-dashboard", "mentee-tasks", "mentee-roadmap", "mentee-library",
    "mentee-progress", "mentee-daily-log", "mentee-recognition", "mentee-certificates",
    "mentee-mentor", "mentee-blockers", "mentee-community", "mentee-announcements",
    "mentee-messages", "mentee-settings",
  ]) assert.match(screens, new RegExp(`case "${route}"`));
  for (const interaction of [
    "My tasks", "My Fellowship Roadmap", "Daily log", "XP, coins & badges",
    "My certificates", "Pick a time Aisha is free", "Log a roadblock",
    "Start a conversation", "Write a reply", "Settings sections",
  ]) assert.match(screens, new RegExp(interaction));
  assert.doesNotMatch(router, /"mentee-library": "admin-library"/);
  assert.doesNotMatch(router, /"mentee-certificates": "mentor-recognition"/);
  assert.match(screens, /nothing is uploaded or saved/i);
});

test("shared demo shell shows clan artwork and routes the profile to settings", async () => {
  const demo = await source("components/demo/InteractiveDemo.tsx");
  assert.match(demo, /selectedClan\.image/);
  assert.match(demo, /Node Guild · Active program/);
  assert.match(demo, /Profile & settings/);
  assert.match(demo, /ChangelogPreview/);
});

test("buyer endpoint has validation, duplicate, rate-limit, and delivery failure states", async () => {
  const route = await source("app/api/buyer-interest/route.ts");
  for (const status of ["422", "409", "429", "503"]) assert.match(route, new RegExp(`status: ${status}`));
  assert.match(route, /LEADS_WEBHOOK_URL/);
  assert.match(route, /RESEND_API_KEY/);
});

test("pricing selection is carried into the recoverable buyer lead", async () => {
  const plans = await source("components/landing/PublicPlans.tsx");
  const contact = await source("app/contact/page.tsx");
  const form = await source("components/landing/BuyerInterestForm.tsx");
  const lead = await source("lib/buyer-lead.ts");
  assert.match(plans, /\?plan=\$\{encodeURIComponent\(plan\.name\)\}/);
  assert.match(contact, /selectedPlan/);
  assert.match(form, /name="planInterest"/);
  assert.match(lead, /planInterest/);
});

test("customer-facing application copy contains no em dashes", async () => {
  async function collect(directory) {
    const entries = await readdir(new URL(directory, root), { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
      const path = `${directory}${entry.name}`;
      if (entry.isDirectory()) files.push(...await collect(`${path}/`));
      else if (/\.(?:ts|tsx|js|jsx)$/.test(entry.name)) files.push(path);
    }
    return files;
  }
  for (const path of [...await collect("app/"), ...await collect("components/")]) {
    assert.doesNotMatch(await source(path), /—/, path);
  }
});

test("no visible marketing source retains request-access or customer-workspace CTAs", async () => {
  const paths = ["app/page.tsx", "components/landing/Hero.tsx", "components/landing/Navbar.tsx", "components/landing/Footer.tsx", "components/landing/FinalCta.tsx"];
  for (const path of paths) {
    const value = await source(path);
    assert.doesNotMatch(value, /request-access|devweekends/i, path);
  }
});
