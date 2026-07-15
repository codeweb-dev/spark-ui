export interface CategoryMeta {
  title: string;
  order: number;
}

export const CATEGORIES: Record<string, CategoryMeta> = {
  "Getting Started": { title: "Getting Started", order: 0 },
  Backgrounds: { title: "Backgrounds", order: 1 },
  "Text & Motion": { title: "Text & Motion", order: 2 },
  Media: { title: "Media", order: 3 },
  Interactive: { title: "Interactive", order: 4 },
  Commerce: { title: "Commerce", order: 5 },
};

export const FALLBACK_CATEGORY: CategoryMeta = {
  title: "General",
  order: 99,
};

export function getCategoryMeta(category?: string): CategoryMeta {
  if (!category) return FALLBACK_CATEGORY;
  return CATEGORIES[category] ?? FALLBACK_CATEGORY;
}
