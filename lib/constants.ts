// Official production origin. Override with NEXT_PUBLIC_APP_URL (e.g. for
// previews); trailing slashes are stripped so URL concatenation stays clean.
const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") ||
  "https://spark-ui-olive.vercel.app";

export const SITE_CONFIG = {
  name: "Spark UI",
  tagline: "Components that make interfaces feel alive.",
  description:
    "A focused collection of signature React components with expressive motion and distinctive interactions.",
  url: APP_URL,
  github: "https://github.com/codeweb-dev/spark-ui",
  author: "Spark UI",
  authorUrl: APP_URL,
  keywords: [
    "React components",
    "Signature UI components",
    "shadcn registry",
    "Tailwind CSS",
    "Framer Motion",
    "Design engineering",
    "Accessible components",
  ],
  defaultOgImage: "/opengraph-image",
};

export const BETA_DOC_SLUGS = new Set(["components/interactive-pets"]);

export const NEW_DOC_SLUGS = new Set([
  "components/dynamic-island",
  "components/receipt",
  "components/interactive-pets",
]);

export const UPDATED_DOC_SLUGS = new Set<string>();
