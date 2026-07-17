export interface TemplateEntry {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

// ponytail: placeholder entries so the layout has real content to render.
// Swap these for actual templates when they ship.
export const TEMPLATE_PLACEHOLDERS: TemplateEntry[] = [
  {
    slug: "dashboard",
    title: "Dashboard",
    category: "Dashboard",
    description: "An analytics dashboard with charts, tables, and filters.",
    image: "/images/trail-1.jpg",
  },
  {
    slug: "landing-page",
    title: "Landing Page",
    category: "Marketing",
    description: "A conversion-focused landing page with pricing and FAQ.",
    image: "/images/trail-2.jpg",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    category: "Portfolio",
    description: "A minimal portfolio for showcasing creative work.",
    image: "/images/trail-3.jpg",
  },
  {
    slug: "admin-panel",
    title: "Admin Panel",
    category: "Admin",
    description: "A full admin panel with auth, tables, and settings.",
    image: "/images/trail-4.jpg",
  },
  {
    slug: "storefront",
    title: "Storefront",
    category: "E-commerce",
    description: "A product catalog and checkout flow for online stores.",
    image: "/images/trail-5.jpg",
  },
  {
    slug: "docs-site",
    title: "Docs Site",
    category: "Documentation",
    description: "A searchable documentation site with a sidebar and MDX.",
    image: "/images/trail-1.jpg",
  },
];
