export interface ShowcaseEntry {
  slug: string;
  title: string;
  author: string;
  verified: boolean;
  category: string;
  description: string;
  image: string;
}

// ponytail: placeholder entries so the layout has real content to render.
// Swap these for actual community submissions when they come in.
export const SHOWCASE_PROJECTS: ShowcaseEntry[] = [
  {
    slug: "nimbus-analytics",
    title: "Nimbus Analytics",
    author: "Alex Rivera",
    verified: true,
    category: "Dashboard",
    description:
      "A real-time analytics dashboard for tracking product metrics at a glance.",
    image: "/images/trail-1.jpg",
  },
  {
    slug: "wanderlist",
    title: "Wanderlist",
    author: "Priya Shah",
    verified: false,
    category: "Portfolio",
    description:
      "A travel photographer's portfolio built to load fast and feel cinematic.",
    image: "/images/trail-2.jpg",
  },
  {
    slug: "fernweh-studio",
    title: "Fernweh Studio",
    author: "Jonas Weber",
    verified: true,
    category: "Landing Page",
    description:
      "Landing page for a design studio specializing in brand identity.",
    image: "/images/trail-3.jpg",
  },
  {
    slug: "loopline",
    title: "Loopline",
    author: "Mei Tanaka",
    verified: false,
    category: "Music",
    description:
      "A collaborative playlist app for musicians to share work in progress.",
    image: "/images/trail-4.jpg",
  },
  {
    slug: "solstice",
    title: "Solstice",
    author: "Daniel Osei",
    verified: true,
    category: "SaaS",
    description:
      "Marketing site for a SaaS platform that helps teams ship faster.",
    image: "/images/trail-5.jpg",
  },
  {
    slug: "driftwood",
    title: "Driftwood",
    author: "Clara Nilsson",
    verified: false,
    category: "E-commerce",
    description: "An online store for handcrafted furniture and home goods.",
    image: "/images/trail-1.jpg",
  },
];
