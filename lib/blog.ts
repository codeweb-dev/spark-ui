export const BLOG_POSTS = [
  {
    slug: "v2-signature-components",
    title: "A more focused Spark UI",
    version: "Version 2.0",
    date: "July 15, 2026",
    description:
      "Spark UI is now a focused collection of 11 expressive components built for motion, personality, and memorable interaction.",
    paragraphs: [
      "Version 2 is a deliberate reset around what made Spark UI worth using in the first place: components with expressive motion, distinctive visuals, and interactions that are difficult to find in a traditional component library. The registry now contains 11 focused components, including Interactive Pets, Tactile Highlight, Shimmer Text, Image Trail, Animated Gradient, Ghost Ether, Logo Carousel, QR Code, Receipt, Basic Number Ticker, and Spotify Card.",
      "The first release also shipped familiar buttons, form controls, dialogs, tables, navigation elements, and layout primitives. Those components worked, but they duplicated an ecosystem that shadcn/ui already maintains exceptionally well. They made Spark UI look like another general-purpose UI kit instead of a focused creative layer, and every duplicate primitive increased the amount of documentation, testing, dependency management, and long-term maintenance required.",
      "We removed 25 shadcn-style registry components in Version 2. This was not a rejection of shadcn/ui. It was the opposite: shadcn/ui is already the right place for dependable application foundations, so Spark UI no longer needs to maintain competing versions of the same building blocks.",
      "Spark UI now complements the component system you already use. Build the structure of an application with shadcn/ui, Base UI, Radix, or your own design system, then reach for Spark UI when a moment needs more character: a reactive headline, an animated background, a playful site companion, a visual number transition, or a richer media treatment.",
      "The website and registry were rebuilt around that narrower purpose. Documentation is grouped by Backgrounds, Text & Motion, Media, Interactive, and Commerce. Installation examples, search, navigation, the agent skill, generated registry files, and project dependencies now describe only the retained collection.",
      "Projects that previously copied a removed component are not broken—the source already lives in those projects and remains theirs. The change only means Spark UI no longer publishes or documents those primitive registry items going forward. New projects should install their standard primitives from their preferred system and use Spark UI for the signature layer.",
      "A smaller registry gives each remaining component more attention, clearer examples, stronger accessibility and reduced-motion behavior, and a much clearer reason to exist. Version 2 is less about having more components and more about making every component unmistakably Spark UI.",
      "Templates and Showcase are next. The first template will be a portfolio that developers can use as a starting point for presenting their work, while Showcase will give the community a place to share what they build with Spark UI.",
      "Sign up early for a chance to be one of five users who receive Spark UI Pro for free, along with an exclusive early-supporter badge. More Pro benefits will be announced soon, so stay tuned.",
    ],
  },
  {
    slug: "v1-launch",
    title: "Introducing Spark UI",
    version: "Version 1.0",
    date: "July 12, 2026",
    description:
      "The first public release of Spark UI as an open-source, source-first component registry for React.",
    paragraphs: [
      "Version 1 launched Spark UI on July 12, 2026 as an open-source, shadcn-compatible source registry for React, TypeScript, and Tailwind CSS. The goal was to make polished components easy to inspect, install, customize, and fully own without adding a permanent Spark UI runtime package.",
      "Every component was distributed through an individual registry URL. Developers could inspect the generated JSON with the shadcn CLI, install a single item, and receive the readable TypeScript source plus only the dependencies that item required. Once installed, the component became ordinary local application code rather than an opaque package API.",
      "The original catalog combined common interface foundations—buttons, form controls, overlays, navigation, tables, and layout pieces—with more experimental work centered on motion and personality. Components such as Shimmer Text, Tactile Highlight, Basic Number Ticker, Image Trail, animated backgrounds, and Logo Carousel began defining the visual direction that would later become Spark UI's primary focus.",
      "Version 1 also introduced the documentation system used across the project: live previews, source examples, copyable installation commands, searchable MDX pages, generated property tables, light and dark themes, and a machine-readable registry index for tools and coding agents.",
      "The release established several principles that continue today. Components use semantic design tokens instead of fixed brand colors, expose their source for direct customization, install independently, and treat motion as functional feedback rather than decoration alone. Interactive components were also expected to preserve keyboard access and respect reduced-motion preferences.",
      "Most importantly, Version 1 proved that Spark UI's strongest work was not another implementation of familiar primitives. It was the smaller group of components that made interfaces feel alive. That lesson shaped the more focused direction introduced in Version 2.",
    ],
  },
] as const;

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
