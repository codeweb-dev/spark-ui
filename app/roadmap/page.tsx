import { Navbar } from "@/components/landing/Navbar";
import { Check, Circle, LoaderCircle } from "lucide-react";

export const metadata = {
  title: "Roadmap | Spark UI",
  description: "See what is shipping next for Spark UI.",
};

const roadmap = [
  { title: "Component registry", description: "Core components and installation workflow.", status: "complete" },
  { title: "Showcase", description: "Community projects and real-world examples.", status: "progress" },
  { title: "Templates", description: "Production-ready pages and application starters.", status: "progress" },
  { title: "More components", description: "New primitives, blocks, and animated components.", status: "planned" },
] as const;

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Roadmap</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">What we’re building next</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Follow the progress of upcoming Spark UI components, showcases, and templates.
        </p>
        <div className="mt-12 divide-y rounded-2xl border bg-card px-6">
          {roadmap.map((item) => {
            const Icon = item.status === "complete" ? Check : item.status === "progress" ? LoaderCircle : Circle;
            return (
              <div key={item.title} className="flex gap-4 py-6">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border bg-muted">
                  <Icon className={`size-4 ${item.status === "progress" ? "animate-spin" : ""}`} aria-hidden />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-medium">{item.title}</h2>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
