export interface CategoryMeta {
  title: string;
  order: number;
}

export const CATEGORIES: Record<string, CategoryMeta> = {
  "Getting Started": { title: "Getting Started", order: 0 },
  Button: { title: "Button", order: 1 },
  Form: { title: "Form", order: 2 },
  Navigation: { title: "Navigation", order: 3 },
  Layout: { title: "Layout", order: 4 },
  Typography: { title: "Typography", order: 5 },
  Media: { title: "Media", order: 6 },
  Backgrounds: { title: "Backgrounds", order: 7 },
};

export const FALLBACK_CATEGORY: CategoryMeta = {
  title: "General",
  order: 99,
};

export function getCategoryMeta(category?: string): CategoryMeta {
  if (!category) return FALLBACK_CATEGORY;
  return CATEGORIES[category] ?? FALLBACK_CATEGORY;
}
