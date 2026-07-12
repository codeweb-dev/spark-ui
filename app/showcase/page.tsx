import { ComingSoonPage } from "@/components/coming-soon-page";

export const metadata = {
  title: "Showcase | Spark UI",
  description: "Projects and products built with Spark UI.",
};

export default function ShowcasePage() {
  return (
    <ComingSoonPage
      eyebrow="Showcase"
      title="Made with Spark UI"
      description="We are preparing a collection of polished products and community projects built with Spark UI. Follow the roadmap for progress and launch updates."
    />
  );
}
