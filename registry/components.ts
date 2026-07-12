import dynamic from "next/dynamic";
import React from "react";

export const registry: Record<
  string,
  React.ComponentType<Record<string, unknown>>
> = {
  "rich-button": dynamic(() => import("@/registry/demos/rich-button-demo")),
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
  "label-input": dynamic(() => import("@/registry/demos/label-input-demo")),
  "label-input-colors": dynamic(
    () => import("@/registry/demos/label-input-colors-demo"),
  ),
  "label-input-forms": dynamic(
    () => import("@/registry/demos/label-input-forms-demo"),
  ),
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
};
