import { AnnouncementBar } from "../components/landing/AnnouncementBar";
import { FinalCta } from "../components/landing/FinalCta";
import { Footer } from "../components/landing/Footer";
import { Hero } from "../components/landing/Hero";
import { HomeFaq } from "../components/landing/HomeFaq";
import { Journey } from "../components/landing/Journey";
import { Navbar } from "../components/landing/Navbar";
import { PricingPreview } from "../components/landing/PricingPreview";
import { ProofBand } from "../components/landing/ProofBand";
import { ReplaceStack } from "../components/landing/ReplaceStack";
import { RoleWorkspaces } from "../components/landing/RoleWorkspaces";
import { homeFaq } from "../components/landing/site-content";
import { TrustStrip } from "../components/landing/TrustStrip";
import { ANDROID_APP_URL } from "../lib/links";
import { getPublishedPlansOrNull } from "../lib/plans";

/** Re-render at most every five minutes so published prices stay current. */
export const revalidate = 300;

export default async function HomePage() {
  const plans = await getPublishedPlansOrNull();
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
        {/* Claim → proof → the problem → one cohort's journey → each seat
            (with Android) → trust → price → objections → ask. Green only
            bookends the page: the hero and the closing call to action. */}
        <Hero />
        <ProofBand />
        <ReplaceStack />
        <Journey />
        <RoleWorkspaces />
        <TrustStrip />
        <PricingPreview initialPlans={plans} />
        <HomeFaq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
