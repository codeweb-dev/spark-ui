# Spark UI signature component reference

## Animated Gradient

```tsx
import { AnimatedGradient } from "@/components/animated-gradient";

<AnimatedGradient variant="vortex" speed={1} opacity={0.8} />;
```

Variants: `mist`, `lava`, `vortex`. Accepts children for foreground content.

## Basic Number Ticker

```tsx
import NumberTicker from "@/components/basic-number-ticker";

<NumberTicker from={0} target={1024} />;
```

Default export. Key props: `from`, `target`, `transition`, `autoStart`, `onStart`, `onComplete`. Imperative control is available through `NumberTickerRef`.

## Ghost Ether

```tsx
import { GhostEther } from "@/components/ghost-ether";

<GhostEther className="absolute inset-0" />;
```

Interactive Three.js fluid background. Key tunables include `mouseForce`, `cursorSize`, `isViscous`, and `viscous`. Render once per page.

## Dynamic Island

```tsx
import { DynamicIsland } from "@/components/dynamic-island";

<DynamicIsland
  compact={<span>Now playing</span>}
  expanded={<div>Playback controls</div>}
/>;
```

Supports controlled or uncontrolled expansion through `open`, `defaultOpen`, and `onOpenChange`. With no content, activation grows and shakes the empty pill before returning it to its original size. Keep compact content non-interactive; buttons and sliders belong in `expanded`.
Common compositions include Face Unlock status, media controls, incoming calls, and notifications.

## Image Trail

```tsx
import {
  ImageTrail,
  ImageTrailItem,
  ImageTrailItemCaption,
} from "@/components/image-trail";

<ImageTrail className="h-96">
  <ImageTrailItem>
    <img src="/image.jpg" alt="Product preview" />
    <ImageTrailItemCaption>Preview</ImageTrailItemCaption>
  </ImageTrailItem>
</ImageTrail>;
```

Provide a sized container. The component file is server-safe; its internal behavior handles pointer movement.

## Interactive Pets

```tsx
import { InteractivePets } from "@/components/interactive-pets";

<InteractivePets
  pets={[
    {
      id: "cat",
      name: "Mochi",
      initialPosition: { x: 24, y: 64 },
      idleMessage: ["Hello!", "Feed me?"],
      fedMessage: "Thank you!",
    },
  ]}
/>;
```

Pet IDs: `cat`, `dog`, `bird`. Supports pointer dragging, keyboard movement, feed controls, custom messages, and `onPetMove` / `onPetFeed` callbacks.

## Logo Carousel

```tsx
import { LogoCarousel } from "@/components/logo-carousel";

<LogoCarousel duration={30} pauseOnHover fade>
  {logos}
</LogoCarousel>;
```

Key props: `duration`, `pauseOnHover`, `direction`, `reverse`, `fade`, `fadeAmount`, `repeat`, `gap`.

## QR Code

```tsx
import { QRCode } from "@/components/qr-code";

<QRCode value="https://example.com" size={160} gradient="sunset" />;
```

Key props: `value`, `size`, `fgColor`, `bgColor`, `errorCorrectionLevel`, `gradient`.

## Receipt

```tsx
import { Receipt } from "@/components/receipt";

<Receipt
  ticketId="SPARK-001"
  amount="$128.00"
  dateTime="15 Jul 2026 · 17:30"
  cardholder="Spark UI"
  cardLastFour="2026"
/>;
```

Required props: `ticketId`, `amount`, `dateTime`, `cardholder`, `cardLastFour`. Optional props: `title`, `description`, `barcodeValue`, `successIcon`, `className`.

## Shimmer Text

```tsx
import { ShimmerText } from "@/components/shimmer-text";

<ShimmerText duration={2}>Shipping soon</ShimmerText>;
```

Key props: `shimmerColor`, `shimmerColor2`, `direction`, `duration`.

## Spotify Card

```tsx
import { SpotifyCard } from "@/components/spotify-card";

<SpotifyCard trackUrl="https://open.spotify.com/track/..." />;
```

Requires Next.js App Router. Installation includes a validated metadata route at `app/api/spotify/metadata/route.ts`.
Use `onPlayingChange` to synchronize playback UI such as Dynamic Island sound bars.
Use a `SpotifyCardRef` and its `togglePlayback()` method for an external play button.

## Tactile Highlight

```tsx
import { TactileHighlight } from "@/components/tactile-highlight";

<TactileHighlight trigger="inView">important phrase</TactileHighlight>;
```

Key props: `direction`, `delay`, `trigger` (`auto`, `hover`, `inView`).
