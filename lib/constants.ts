// Official production origin. Override with NEXT_PUBLIC_APP_URL (e.g. for
// previews); trailing slashes are stripped so URL concatenation stays clean.
const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") ||
  "https://spark-ui-olive.vercel.app";

export const SITE_CONFIG = {
  name: "Spark UI",
  tagline: "Components that make interfaces feel alive.",
  description:
    "A collection of polished React components, thoughtful interactions, and open-source building blocks for modern products.",
  url: APP_URL,
  github: "https://github.com/codeweb-dev/spark-ui",
  author: "Spark UI",
  authorUrl: APP_URL,
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
