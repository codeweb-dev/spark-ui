export interface CategoryMeta {
  title: string;
  order: number;
}

export const CATEGORIES: Record<string, CategoryMeta> = {
  "Getting Started": { title: "Getting Started", order: 0 },
  Components: { title: "Components", order: 1 },
  "Signature Components": { title: "Signature Components", order: 2 },
};

export const FALLBACK_CATEGORY: CategoryMeta = {
  title: "General",
  order: 99,
};

export function getCategoryMeta(category?: string): CategoryMeta {
  if (!category) return FALLBACK_CATEGORY;
  return CATEGORIES[category] ?? FALLBACK_CATEGORY;
}
