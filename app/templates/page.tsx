import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { TemplatesGrid } from "@/components/templates/templates-grid";
import { TEMPLATE_PLACEHOLDERS } from "@/lib/templates";

export const metadata = {
  title: "Templates | Spark UI",
  description: "Production-ready templates built with Spark UI.",
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 pb-16 mt-14 lg:px-6">
        <div className="mt-14 max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground">Spark UI</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Templates
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A preview of what&apos;s coming — full templates built with Spark UI
            components, ready to ship.
          </p>
        </div>

        <div className="mt-16">
          <TemplatesGrid items={TEMPLATE_PLACEHOLDERS} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
