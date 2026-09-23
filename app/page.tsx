import { PageMotion } from "../components/landing/PageMotion";
import { PricingSection } from "../components/landing/PricingSection";
import { FAQ } from "../components/landing/FAQ";
import { Features } from "../components/landing/Features";
import { FinalCta } from "../components/landing/FinalCta";
import { Footer } from "../components/landing/Footer";
import { Hero } from "../components/landing/Hero";
import { LogoMarquee } from "../components/landing/LogoMarquee";
import { Workflow } from "../components/landing/Workflow";
import { Navbar } from "../components/landing/Navbar";
import { ProductTour } from "../components/landing/ProductTour";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <PageMotion />
      <main id="main-content">
        <Hero />
        <LogoMarquee />
        <ProductTour />
        <Features />
        <Workflow />
        <PricingSection />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
