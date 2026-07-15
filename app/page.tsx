import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { Showcase } from "@/components/landing/Showcase";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = {
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="relative z-10 max-w-350 mx-auto px-5 sm:px-6 md:px-10 lg:px-12">
        <Hero />
      </main>

      <Footer />
    </div>
  );
}
