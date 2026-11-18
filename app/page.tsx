import { AnnouncementBar } from "../components/landing/AnnouncementBar";
import { FinalCta } from "../components/landing/FinalCta";
import { Footer } from "../components/landing/Footer";
import { Hero } from "../components/landing/Hero";
import { HowItWorks } from "../components/landing/HowItWorks";
import { MobileExperience } from "../components/landing/MobileExperience";
import { Navbar } from "../components/landing/Navbar";
import { PricingPreview } from "../components/landing/PricingPreview";
import { ProofBand } from "../components/landing/ProofBand";
import { RoleWorkspaces } from "../components/landing/RoleWorkspaces";
import { Toolkit } from "../components/landing/Toolkit";
import { ANDROID_APP_URL } from "../lib/links";

export default function HomePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Pathment",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android",
      url: "https://pathment.me",
      installUrl: ANDROID_APP_URL,
      description:
        "Mentorship and learning program operations for organizations, admins, mentors, and mentees.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        {/* Claim → proof → mechanism → product → reach → price → ask. */}
        <Hero />
        <ProofBand />
        <HowItWorks />
        <RoleWorkspaces />
        <Toolkit />
        <MobileExperience />
        <PricingPreview />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
