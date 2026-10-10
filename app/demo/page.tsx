import type { Metadata } from "next";
import { InteractiveDemo, type DemoRole } from "../../components/demo/InteractiveDemo";

export const metadata: Metadata = { title: "Experience Pathment | Interactive workspace preview", description: "Step inside faithful Admin, Mentor, and Mentee workspace previews using representative, read-only Dev Weekends data." };

export default async function DemoPage({ searchParams }: { searchParams: Promise<{ role?: string; page?: string }> }) {
  const { role, page } = await searchParams;
  const initialRole: DemoRole = role === "mentor" || role === "mentee" ? role : "admin";
  const initialPage = page?.startsWith(`${initialRole}-`) ? page : undefined;
  return <main id="main-content"><InteractiveDemo initialRole={initialRole} initialPage={initialPage} /></main>;
}
