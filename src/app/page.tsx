import AnalyticsSection from "./components/home/analytics-section";
import CtaSection from "./components/home/cta-section";
import FeaturesSection from "./components/home/features-section";
import Footer from "./components/home/footer";
import HeroSection from "./components/home/hero-section";
import HowItWorksSection from "./components/home/how-it-works-section";
import Navbar from "./components/home/navbar";
import PricingSection from "./components/home/pricing-section";
import TestimonialsSection from "./components/home/testimonials-section";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar session={session} />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AnalyticsSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
