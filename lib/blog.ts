import packageJson from "@/package.json";

const releaseDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export const CURRENT_VERSION = packageJson.version;
export const formatVersion = (version: string) => `v${version}`;
export const formatReleaseDate = (releasedAt: string) =>
  releaseDateFormatter.format(new Date(`${releasedAt}T00:00:00Z`));

export type BlogComponent = {
  name: string;
  preview?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  version: string;
  releasedAt: string;
  description: string;
  paragraphs: readonly string[];
  components?: readonly BlogComponent[];
};

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "keyboard-masonry-and-open-source",
    title: "Keyboard, a redesigned Masonry, and zero-setup contributions",
    version: "2.3.0",
    releasedAt: "2026-07-17",
    description:
      "One big day for Spark UI: a mechanical Keyboard component with a homepage type test, an animated item-driven Masonry powering Templates and Showcase, and a clean open-source boundary with no-setup contributions.",
    components: [
      { name: "keyboard", preview: "keyboard" },
      { name: "hello", preview: "hello" },
      { name: "masonry", preview: "masonry-cards" },
    ],
    paragraphs: [
      "Today's release rolls a full day of updates into one: version 2.3.0 introduces the Keyboard component, a typing test on the homepage, and the Keyboard Warrior leaderboard, adds Hello — an Apple-style welcome greeting — to Text & Motion, rebuilds Masonry into an animated grid that now powers two pages, and draws a clean boundary between the open-source frontend and the private production backend, with a flag that makes contributing a zero-setup experience.",
      "Keyboard is a 60% mechanical keyboard rendered entirely in code. Chunky two-tone keycaps press down with a 3D depth animation, the board scales fluidly with its container, and everything is styled with semantic tokens that adapt to light and dark themes. It listens to your physical keyboard and animates the matching keycaps as you type, and clicking an on-screen key calls onKeyPress with its value, so it works as a visualizer and a virtual keyboard alike. The docs open it in a bottom sheet for room to breathe, and the Dynamic Island example adds a keystroke feed where every key blurs in, lingers, and blurs away.",
      "The same component powers a new toy on the homepage: a 15-second type test, inspired by Keeby. Hit the Type test button in the hero and the page gives way to a random paragraph, a live stats panel, and the keyboard mirroring your keystrokes. A caret glides between letters as correct ones ink in and mistakes flash red, the seconds, wpm, and accuracy counters roll like odometers, and your final score counts up with Basic Number Ticker before offering a restart.",
      "Typing fast is more fun when it counts, so the test now feeds Keyboard Warrior — a leaderboard at /keyboard-warrior, also linked from the navbar. Finish a run, hit Post score, and sign in with GitHub to claim your spot; each player holds exactly one score, and posting again replaces the previous run. The page crowns the top three on a podium with their GitHub avatars, and avatars come straight from the auth profile — nothing extra to fill in.",
      "Text & Motion also gains Hello, a recreation of the Apple setup-screen welcome. A large greeting cycles through ten languages — Hello, こんにちは, Bonjour, 안녕하세요, and more — each word floating up and blurring in, holding for a moment, then blurring away for the next. The greetings list and interval are both configurable, so it works just as well for product welcomes as for hero flourishes.",
      "Masonry has been rebuilt from a CSS-columns wrapper into an animated, item-driven grid. It takes an items array with an img and a pixel height, measures its container, and places each tile into the shortest column, with configurable duration, stagger, entry direction, and hover behavior. A new renderItem prop swaps the default image tile for any content while keeping the same animations — which is exactly how Showcase now renders its community project cards, and how the new Templates page shares the same layout engine with dimmed placeholders until real templates ship.",
      "The repository itself got the same attention. The public repo is now purely the component library, the documentation site, and safe Supabase client helpers; the production backend lives in a separate private repository. Security never relied on hiding the schema — it comes from authentication, Row Level Security, and least-privilege access — and the full policy is documented in docs/architecture/OPEN_SOURCE_BOUNDARY.md.",
      "The change contributors will actually feel is the NEXT_PUBLIC_BACKEND flag, which defaults to false. Clone the repo, run npm install and npm run dev, and the entire site works — docs, previews, registry, everything — with no Supabase project and no accounts to create. Backend-powered features like login and favorites simply step aside instead of breaking, and switching the flag on with your own Supabase project restores the full experience using the schema in supabase/examples/favorites.sql.",
      "Keyboard and Masonry are available now through the Spark UI registry with live previews and full source you can customize after installation. The type test is live on the homepage — bring your fastest fingers.",
    ],
  },
  {
    slug: "dynamic-island-and-widget-stack",
    title: "Introducing Dynamic Island and Widget Stack",
    version: "2.2.0",
    releasedAt: "2026-07-16",
    description:
      "Two new signature components for fitting expressive, glanceable interactions into compact spaces.",
    components: [
      { name: "dynamic-island", preview: "dynamic-island-examples" },
      { name: "widget-stack", preview: "widget-stack-sizes" },
    ],
    paragraphs: [
      "Spark UI 2.2.0 adds Dynamic Island and Widget Stack, bringing the focused collection to 13 signature components. Both are designed for interfaces that need to show more without permanently taking over more of the page.",
      "Dynamic Island is a compact activity surface that smoothly morphs between a pill and expanded content. Use it for media playback, timers, calls, notifications, or any interaction that should stay available without becoming the center of the layout. It supports controlled and uncontrolled state, so it can manage its own expansion or follow another part of your application.",
      "The component also has a deliberate empty state: when no activity is available, pressing the island briefly enlarges and shakes it before returning to rest. Native buttons, customizable labels, Escape-key handling, focus restoration, and reduced-motion support keep the interaction playful without giving up accessibility.",
      "Widget Stack groups several glanceable widgets into one small or medium surface. People can swipe or scroll vertically between pages, use the dots to jump directly to a widget, or connect the active page to application state with the index-change callback. Each child remains ordinary React content, so the stack does not impose a separate widget API.",
      "Keyboard controls cover arrow keys, Page Up, Page Down, Home, and End. Every page and dot announces its position, visible focus states are included, and smooth scrolling automatically switches off when reduced motion is preferred.",
      "Both components are available now through the Spark UI registry with live examples, copyable installation commands, and source you can fully customize after installation.",
    ],
  },
  {
    slug: "interactive-pets-2-1-0",
    title: "Interactive Pets gets a livelier cat",
    version: "2.1.0",
    releasedAt: "2026-07-15",
    description:
      "A focused Interactive Pets update with new cat artwork, livelier motion, and a cleaner feeding experience.",
    components: [{ name: "interactive-pets" }],
    paragraphs: [
      "Interactive Pets 2.1.0 focuses the playground on one companion: Mochi the cat. The previous cat, dog, and bird sprites have been removed for now, giving the component a smaller API and a clearer foundation for future pets.",
      "Mochi now uses the solid cat artwork from the Spark UI site across the component and generated registry output. The new silhouette supports light and dark interfaces while staying portable when the component is installed into another project.",
      "The cat feels more alive even while the page is idle. Mochi continuously dances with a gentle bounce and tilt and blinks every few seconds. Dragging, keyboard movement, click messages, feeding reactions, and position callbacks continue to work alongside the new animation.",
      "Feeding has also been simplified. The old bowl is replaced by a compact black bone button, the bone travels toward the cat when activated, and the small feeding effect now appears at the cat's mouth. Message bubbles sit closer to the pet so reactions feel connected instead of floating above the scene. After the third feeding, Mochi says that it is full; projects can customize this response with the new `fullMessage` pet option.",
      "This is a small release by design: fewer pets, cleaner artwork, and more personality in the companion that remains. More animals can return once each one has artwork and motion that feels as considered as Mochi.",
    ],
  },
  {
    slug: "v2-signature-components",
    title: "A more focused Spark UI",
    version: "2.0.0",
    releasedAt: "2026-07-15",
    description:
      "Spark UI is now a focused collection of 11 expressive components built for motion, personality, and memorable interaction.",
    paragraphs: [
      "Version 2.0.0 is a deliberate reset around what made Spark UI worth using in the first place: components with expressive motion, distinctive visuals, and interactions that are difficult to find in a traditional component library. The registry now contains 11 focused components, including Interactive Pets, Tactile Highlight, Shimmer Text, Image Trail, Animated Gradient, Ghost Ether, Logo Carousel, QR Code, Receipt, Basic Number Ticker, and Spotify Card.",
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
    version: "1.0.0",
    releasedAt: "2026-07-12",
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
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export const LATEST_RELEASE = BLOG_POSTS[0];
