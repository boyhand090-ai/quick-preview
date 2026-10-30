import { createFileRoute } from "@tanstack/react-router";
import { heroImages } from "@/data/site";
import { Toaster } from "@/components/ui/sonner";
import { Preloader } from "@/components/site/preloader";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { ShowcaseReveal } from "@/components/site/showcase-reveal";
import { Services, ClientLogos } from "@/components/site/services";
import { Portfolio } from "@/components/site/portfolio";
import { Testimonials, Strategy } from "@/components/site/testimonials";
import { Process, ConsultCta } from "@/components/site/process";
import { Faq } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

const title = "six2eight — Full-Service Digital Growth Agency";
const description =
  "Strategy, branding, websites, SEO, advertising, lead generation, and AI automation: connected digital systems for ambitious businesses.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: heroImages[0]?.src },
      { name: "twitter:image", content: heroImages[0]?.src },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Preloader />
      <Header />
      <main id="main-content">
        <Hero />
        <ShowcaseReveal />
        <Services />
        <ClientLogos />
        <Portfolio />
        <Testimonials />
        <Strategy />
        <Process />
        <ConsultCta />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
