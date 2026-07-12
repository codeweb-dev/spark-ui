import {
  Compass,
  Grid3X3,
  Keyboard,
  LucideIcon,
  MousePointer2,
  Navigation2,
  Radio,
  Rocket,
  Type,
  Sparkles,
} from "lucide-react";

export interface CategoryMeta {
  title: string;
  icon: LucideIcon;
  order: number;
}

export const CATEGORIES: Record<string, CategoryMeta> = {
  "Getting Started": { title: "Getting Started", icon: Rocket, order: 0 },
  Button: { title: "Button", icon: MousePointer2, order: 1 },
  Form: { title: "Form", icon: Keyboard, order: 2 },
  Navigation: { title: "Navigation", icon: Navigation2, order: 3 },
  Layout: { title: "Layout", icon: Grid3X3, order: 4 },
  Typography: { title: "Typography", icon: Type, order: 5 },
  Media: { title: "Media", icon: Radio, order: 6 },
  Backgrounds: { title: "Backgrounds", icon: Sparkles, order: 7 },
};

export const FALLBACK_CATEGORY: CategoryMeta = {
  title: "General",
  icon: Compass,
  order: 99,
};

export function getCategoryMeta(category?: string): CategoryMeta {
  if (!category) return FALLBACK_CATEGORY;
  return CATEGORIES[category] ?? FALLBACK_CATEGORY;
}
