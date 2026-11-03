import { AboutPreview } from "@/components/site/home/AboutPreview";
import { ClientLogos } from "@/components/site/home/ClientLogos";
import { EmployerBriefings } from "@/components/site/home/EmployerBriefings";
import { Hero } from "@/components/site/home/Hero";
import { InsightsSection } from "@/components/site/home/InsightsSection";
import { NewsletterSection } from "@/components/site/home/NewsletterSection";
import { ServiceCards } from "@/components/site/home/ServiceCards";
import { TeamSection } from "@/components/site/home/TeamSection";
import { TestimonialsSection } from "@/components/site/home/TestimonialsSection";
import { WhatWeHandle } from "@/components/site/home/WhatWeHandle";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <AboutPreview />
      <ServiceCards />
      <EmployerBriefings />
      <WhatWeHandle />
      <TeamSection members={[]} />
      <TestimonialsSection testimonials={[]} />
      <InsightsSection posts={[]} />
      <ClientLogos logos={[]} />
      <NewsletterSection />
    </main>
  );
}
