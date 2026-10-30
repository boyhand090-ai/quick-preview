import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/webdev/Hero";
import { SubServices } from "@/components/webdev/SubServices";
import { BrandsLogo } from "@/components/webdev/BrandsLogo";
import { Projects } from "@/components/webdev/Projects";
import { PainPoints } from "@/components/webdev/PainPoints";
import { OurProcess } from "@/components/webdev/OurProcess";
import { Strategy } from "@/components/webdev/Strategy";
import { Testimonials } from "@/components/webdev/Testimonials";
import { TechStack } from "@/components/webdev/TechStack";
import { Faqs } from "@/components/webdev/Faqs";
import { ContactForm } from "@/components/webdev/ContactForm";
import { Footer } from "@/components/webdev/Footer";
import { webflowDevData } from "@/data/servicesData";

const { meta } = webflowDevData;

export const Route = createFileRoute("/services/webflow-development")({
  head: () => ({
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WebflowDevelopmentPage,
});

function WebflowDevelopmentPage() {
  return (
    <div className="webdev-page flex min-h-screen flex-col bg-background text-foreground antialiased">
      <Header />
      <main id="main-content" className="w-full flex-1">
        <Hero data={webflowDevData.hero} />
        <SubServices data={webflowDevData.subservices} />
        <BrandsLogo />
        <Projects data={webflowDevData.projects} />
        <PainPoints data={webflowDevData.pain_points} />
        <OurProcess data={webflowDevData.process} />
        <Strategy data={webflowDevData.strategy} />
        <Testimonials />
        <TechStack data={webflowDevData.tech_stack} />
        <Faqs data={webflowDevData.faqs} />
        <ContactForm defaultService="Web Development" />
      </main>
      <Footer />
    </div>
  );
}
