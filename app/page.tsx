import { FinalCta } from "../components/landing/FinalCta";
import { Footer } from "../components/landing/Footer";
import { Hero } from "../components/landing/Hero";
import { Navbar } from "../components/landing/Navbar";
import { CustomerJourney } from "../components/landing/CustomerJourney";

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Pathment",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://pathment.me",
    description: "Mentorship and learning program operations for organizations, admins, mentors, and mentees.",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Navbar />
      <main id="main-content">
        <Hero />
        <CustomerJourney />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
