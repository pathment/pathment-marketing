import { AnnouncementBar } from "../components/landing/AnnouncementBar";
import { AudienceGrid } from "../components/landing/AudienceGrid";
import { CapabilityGrid } from "../components/landing/CapabilityGrid";
import { FinalCta } from "../components/landing/FinalCta";
import { Footer } from "../components/landing/Footer";
import { Hero } from "../components/landing/Hero";
import { HomeFaq } from "../components/landing/HomeFaq";
import { Lifecycle } from "../components/landing/Lifecycle";
import { MobileExperience } from "../components/landing/MobileExperience";
import { Navbar } from "../components/landing/Navbar";
import { PricingPreview } from "../components/landing/PricingPreview";
import { ProblemSection } from "../components/landing/ProblemSection";
import { ProofBand } from "../components/landing/ProofBand";
import { RoleWorkspaces } from "../components/landing/RoleWorkspaces";
import { Testimonials } from "../components/landing/Testimonials";
import { homeFaq } from "../components/landing/site-content";

export default function HomePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Pathment",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android",
      url: "https://pathment.me",
      description:
        "Mentorship and learning program operations for organizations, admins, mentors, and mentees.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: homeFaq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
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
        {/* Narrative order: claim → proof → problem → product → mechanism →
            fit → voices → reach → price → objections → ask. */}
        <Hero />
        <ProofBand />
        <ProblemSection />
        <RoleWorkspaces />
        <CapabilityGrid />
        <Lifecycle />
        <AudienceGrid />
        <Testimonials />
        <MobileExperience />
        <PricingPreview />
        <HomeFaq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
