import { Metadata } from "next";
import { HeroSection } from "./components/HeroSection";
import { ReferencesSection } from "./components/ReferencesSection";
import { AboutTeaser } from "./components/AboutTeaser";
import { ProjectsPeek } from "./components/ProjectsPeek";
import { Footer } from "./components/Footer";
import { FooterBackground } from "./components/FooterBackground";

export const metadata: Metadata = {
  title: "Pascal Meyer | Product & UX Designer",
  description: "Freelance Product, UX & UI Designer in Switzerland and Germany. Explore my portfolio of digital products for Tenzir, Porsche, and VW Group.",
};

export default function Page() {
  return (
    <main className="relative">
      <HeroSection />
      <ProjectsPeek />
      <ReferencesSection />
      <AboutTeaser />
      <div className="relative w-full bg-[var(--color-100)]">
        <FooterBackground />
        {/* Gradient overlay: color-100 (top) to color-100@80% (bottom) */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(to bottom, var(--color-100), var(--color-100-80))`,
          }}
        />
        <div className="max-w-[1920px] mx-auto relative z-[2]">
          <Footer />
        </div>
      </div>
    </main>
  );
}

