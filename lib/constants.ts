export const SITE_CONFIG = {
  name: "Spark UI",
  tagline: "Components that make interfaces feel alive.",
  description:
    "A collection of polished React components, thoughtful interactions, and open-source building blocks for modern products.",
  // Placeholder until a production domain is supplied. Override with NEXT_PUBLIC_APP_URL.
  url: process.env.NEXT_PUBLIC_APP_URL || "https://spark-ui.example.com",
  // GitHub placeholder until a public repository exists.
  github: "https://github.com/codeweb-dev/spark-ui",
  author: "Spark UI",
  authorUrl: "https://spark-ui.example.com",
  keywords: [
    "React components",
    "UI library",
    "shadcn registry",
    "Tailwind CSS",
    "Framer Motion",
    "Design engineering",
    "Accessible components",
  ],
  defaultOgImage: "/opengraph-image",
};

export const NEW_DOC_SLUGS = new Set([
  "components/qr-code",
  "components/shimmer-text",
  "components/tactile-highlight",
  "components/kanban",
  "components/image-trail",
  "components/logo-carousel",
  "components/spotify-card",
  "components/ghost-ether",
]);
