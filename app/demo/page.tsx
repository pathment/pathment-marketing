import type { Metadata } from "next";
import { ExperienceDemo, type DemoDevice } from "../../components/demo/ExperienceDemo";
import type { DemoRole } from "../../components/demo/InteractiveDemo";
import type { DemoPageId } from "../../components/demo/demo-data";

export const metadata: Metadata = { title: "Experience Pathment | Web and mobile product tour", description: "Explore Pathment on web or mobile as an Admin, Mentor, or Mentee using representative, read-only Dev Weekends data." };

export default async function DemoPage({ searchParams }: { searchParams: Promise<{ role?: string; page?: string; device?: string }> }) {
  const { role, page, device } = await searchParams;
  const initialRole: DemoRole = role === "mentor" || role === "mentee" ? role : "admin";
  const initialPage = page?.startsWith(`${initialRole}-`) ? page as DemoPageId : undefined;
  const initialDevice: DemoDevice | undefined = device === "mobile" || device === "web" ? device : undefined;
  return <main id="main-content"><ExperienceDemo initialRole={initialRole} initialPage={initialPage} initialDevice={initialDevice} /></main>;
}
