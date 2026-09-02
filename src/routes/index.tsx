import { createFileRoute } from "@tanstack/react-router";

import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { ConsultationProvider } from "@/components/site/consultation-context";
import { ConsultationModal } from "@/components/site/consultation-modal";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Statement } from "@/components/site/statement";
import { WhyHeaven } from "@/components/site/why-heaven";
import { DesignYourSpace } from "@/components/site/design-your-space";
import { Collections } from "@/components/site/collections";
import { Bespoke } from "@/components/site/bespoke";
import { Materials } from "@/components/site/materials";
import { Process } from "@/components/site/process";
import { Proof } from "@/components/site/proof";
import { Showroom } from "@/components/site/showroom";
import { Timeline } from "@/components/site/timeline";
import { FinalCta, Footer } from "@/components/site/final-cta";
import { MobileCta } from "@/components/site/mobile-cta";

const TITLE = "Heaven Furniture Mart — Bespoke Furniture in Chattogram";
const DESCRIPTION =
  "Bespoke sofas, beds, dining sets and office furniture designed and crafted around your space in Agrabad, Chattogram. Request a free design consultation.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ConsultationProvider>
          <Navbar />
          <main>
            <Hero />
            <Statement />
            <WhyHeaven />
            <DesignYourSpace />
            <Collections />
            <Bespoke />
            <Materials />
            <Process />
            <Proof />
            <Showroom />
            <Timeline />
            <FinalCta />
          </main>
          <Footer />
          <MobileCta />
          <ConsultationModal />
        </ConsultationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
