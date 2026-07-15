import dynamic from "next/dynamic";
import React from "react";

export const registry: Record<
  string,
  React.ComponentType<Record<string, unknown>>
> = {
  accordion: dynamic(() => import("@/registry/demos/accordion-demo")),
  "tactile-highlight": dynamic(
    () => import("@/registry/demos/tactile-highlight-demo"),
  ),
  "spotify-card": dynamic(() => import("@/registry/demos/spotify-card-demo")),
  "shimmer-text": dynamic(() => import("@/registry/demos/shimmer-text-demo")),
  "shimmer-text-variants": dynamic(
    () => import("@/registry/demos/shimmer-text-variants-demo"),
  ),
  "basic-number-ticker": dynamic(
    () => import("@/registry/demos/basic-number-ticker-demo"),
  ),
  "basic-number-ticker-variants": dynamic(
    () => import("@/registry/demos/basic-number-ticker-variants-demo"),
  ),
  input: dynamic(() => import("@/registry/demos/input-demo")),
  "interactive-pets": dynamic(
    () => import("@/registry/demos/interactive-pets-demo"),
    { ssr: false },
  ),
  "interactive-pets-dog": dynamic(
    () => import("@/registry/demos/interactive-pets-dog-demo"),
    { ssr: false },
  ),
  "interactive-pets-bird": dynamic(
    () => import("@/registry/demos/interactive-pets-bird-demo"),
    { ssr: false },
  ),
  kanban: dynamic(() => import("@/registry/demos/kanban-demo")),
  "qr-code": dynamic(() => import("@/registry/demos/qr-code-demo")),
  "qr-code-variants": dynamic(
    () => import("@/registry/demos/qr-code-variants-demo"),
  ),
  pagination: dynamic(() => import("@/registry/demos/pagination-demo")),
  "pagination-variants": dynamic(
    () => import("@/registry/demos/pagination-variants-demo"),
  ),
  "animated-gradient": dynamic(
    () => import("@/registry/demos/animated-gradient-demo"),
  ),
  "animated-gradient-presets": dynamic(
    () => import("@/registry/demos/animated-gradient-presets-demo"),
  ),
  "ghost-ether": dynamic(() => import("@/registry/demos/ghost-ether-demo")),
  "logo-carousel": dynamic(() => import("@/registry/demos/logo-carousel-demo")),
  "logo-carousel-right": dynamic(
    () => import("@/registry/demos/logo-carousel-demo-right"),
  ),
  "image-trail": dynamic(() => import("@/registry/demos/image-trail-demo")),
  badge: dynamic(() => import("@/registry/demos/badge-demo")),
  card: dynamic(() => import("@/registry/demos/card-demo")),
  receipt: dynamic(() => import("@/registry/demos/receipt-demo")),
  empty: dynamic(() => import("@/registry/demos/empty-demo")),
  alert: dynamic(() => import("@/registry/demos/alert-demo")),
  "alert-dialog": dynamic(() => import("@/registry/demos/alert-dialog-demo")),
  breadcrumb: dynamic(() => import("@/registry/demos/breadcrumb-demo")),
  button: dynamic(() => import("@/registry/demos/button-demo")),
  "button-default": dynamic(() =>
    import("@/registry/demos/button-demo").then((mod) => mod.ButtonDefaultDemo),
  ),
  "button-outline": dynamic(() =>
    import("@/registry/demos/button-demo").then((mod) => mod.ButtonOutlineDemo),
  ),
  "button-secondary": dynamic(() =>
    import("@/registry/demos/button-demo").then((mod) =>
      mod.ButtonSecondaryDemo,
    ),
  ),
  "button-ghost": dynamic(() =>
    import("@/registry/demos/button-demo").then((mod) => mod.ButtonGhostDemo),
  ),
  "button-destructive": dynamic(() =>
    import("@/registry/demos/button-demo").then((mod) =>
      mod.ButtonDestructiveDemo,
    ),
  ),
  "button-link": dynamic(() =>
    import("@/registry/demos/button-demo").then((mod) => mod.ButtonLinkDemo),
  ),
  "button-spark": dynamic(() =>
    import("@/registry/demos/button-demo").then((mod) => mod.ButtonSparkDemo),
  ),
  "button-size": dynamic(() =>
    import("@/registry/demos/button-demo").then((mod) => mod.ButtonSizeDemo),
  ),
  "button-icon": dynamic(() =>
    import("@/registry/demos/button-demo").then((mod) => mod.ButtonIconDemo),
  ),
  "button-with-icon": dynamic(() =>
    import("@/registry/demos/button-demo").then((mod) =>
      mod.ButtonWithIconDemo,
    ),
  ),
  "button-rounded": dynamic(() =>
    import("@/registry/demos/button-demo").then((mod) => mod.ButtonRoundedDemo),
  ),
  "button-as-link": dynamic(() =>
    import("@/registry/demos/button-demo").then((mod) => mod.ButtonAsLinkDemo),
  ),
  "button-disabled": dynamic(() =>
    import("@/registry/demos/button-demo").then((mod) => mod.ButtonDisabledDemo),
  ),
  checkbox: dynamic(() => import("@/registry/demos/checkbox-demo")),
  dialog: dynamic(() => import("@/registry/demos/dialog-demo")),
  "dropdown-menu": dynamic(() => import("@/registry/demos/dropdown-menu-demo")),
  "hover-card": dynamic(() => import("@/registry/demos/hover-card-demo")),
  popover: dynamic(() => import("@/registry/demos/popover-demo")),
  progress: dynamic(() => import("@/registry/demos/progress-demo")),
  separator: dynamic(() => import("@/registry/demos/separator-demo")),
  sheet: dynamic(() => import("@/registry/demos/sheet-demo")),
  skeleton: dynamic(() => import("@/registry/demos/skeleton-demo")),
  switch: dynamic(() => import("@/registry/demos/switch-demo")),
  table: dynamic(() => import("@/registry/demos/table-demo")),
  textarea: dynamic(() => import("@/registry/demos/textarea-demo")),
  toggle: dynamic(() => import("@/registry/demos/toggle-demo")),
  "toggle-outline": dynamic(() =>
    import("@/registry/demos/toggle-demo").then((mod) => mod.ToggleOutlineDemo),
  ),
  "toggle-with-text": dynamic(() =>
    import("@/registry/demos/toggle-demo").then((mod) => mod.ToggleWithTextDemo),
  ),
  "toggle-size": dynamic(() =>
    import("@/registry/demos/toggle-demo").then((mod) => mod.ToggleSizeDemo),
  ),
  "toggle-disabled": dynamic(() =>
    import("@/registry/demos/toggle-demo").then((mod) => mod.ToggleDisabledDemo),
  ),
  tooltip: dynamic(() => import("@/registry/demos/tooltip-demo")),
};
