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
  "ghost-ether": dynamic(() => import("@/registry/demos/ghost-ether-demo")),
  "image-trail": dynamic(() => import("@/registry/demos/image-trail-demo")),
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
  "logo-carousel": dynamic(() => import("@/registry/demos/logo-carousel-demo")),
  "logo-carousel-right": dynamic(
    () => import("@/registry/demos/logo-carousel-demo-right"),
  ),
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
};
