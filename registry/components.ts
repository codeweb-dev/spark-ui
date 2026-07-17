import dynamic from "next/dynamic";
import React from "react";

export const registry: Record<
  string,
  React.ComponentType<Record<string, unknown>>
> = {
  "animated-gradient": dynamic(
    () => import("@/registry/demos/animated-gradient-demo"),
  ),
  "animated-gradient-presets": dynamic(
    () => import("@/registry/demos/animated-gradient-presets-demo"),
  ),
  "basic-number-ticker": dynamic(
    () => import("@/registry/demos/basic-number-ticker-demo"),
  ),
  "basic-number-ticker-variants": dynamic(
    () => import("@/registry/demos/basic-number-ticker-variants-demo"),
  ),
  "dynamic-island": dynamic(
    () => import("@/registry/demos/dynamic-island-demo"),
  ),
  "dynamic-island-examples": dynamic(
    () => import("@/registry/demos/dynamic-island-examples-demo"),
  ),
  "dynamic-island-spotify": dynamic(
    () => import("@/registry/demos/dynamic-island-spotify-demo"),
  ),
  "ghost-ether": dynamic(() => import("@/registry/demos/ghost-ether-demo")),
  "image-trail": dynamic(() => import("@/registry/demos/image-trail-demo")),
  "interactive-pets": dynamic(
    () => import("@/registry/demos/interactive-pets-demo"),
    { ssr: false },
  ),
  "logo-carousel": dynamic(() => import("@/registry/demos/logo-carousel-demo")),
  "logo-carousel-right": dynamic(
    () => import("@/registry/demos/logo-carousel-demo-right"),
  ),
  masonry: dynamic(() => import("@/registry/demos/masonry-demo")),
  "masonry-cards": dynamic(() => import("@/registry/demos/masonry-cards-demo")),
  "qr-code": dynamic(() => import("@/registry/demos/qr-code-demo")),
  "qr-code-variants": dynamic(
    () => import("@/registry/demos/qr-code-variants-demo"),
  ),
  receipt: dynamic(() => import("@/registry/demos/receipt-demo")),
  "shimmer-text": dynamic(() => import("@/registry/demos/shimmer-text-demo")),
  "shimmer-text-variants": dynamic(
    () => import("@/registry/demos/shimmer-text-variants-demo"),
  ),
  "spotify-card": dynamic(() => import("@/registry/demos/spotify-card-demo")),
  "tactile-highlight": dynamic(
    () => import("@/registry/demos/tactile-highlight-demo"),
  ),
  "widget-stack": dynamic(() => import("@/registry/demos/widget-stack-demo")),
  "widget-stack-sizes": dynamic(
    () => import("@/registry/demos/widget-stack-sizes-demo"),
  ),
};
