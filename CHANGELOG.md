# Changelog

All notable changes to Spark UI are documented in this file.

The format follows the categories described in [VERSIONING.md](./docs/policies/VERSIONING.md). The newest release appears first.

## 2.5.0 - 2026-07-17

### Added

- Keyboard component: a 60% two-tone mechanical keyboard with 3D press animations, physical key highlighting via `KeyboardEvent.code`, and an `onKeyPress` callback for virtual typing
- Keyboard docs page with bottom-sheet previews and a Dynamic Island example that shows a blur-in/blur-out keystroke feed
- Type test on the homepage hero: a 15-second typing test built on Keyboard with random words, a gliding caret, rolling seconds/wpm/accuracy stats, and an animated result screen (inspired by [Keeby](https://getkeeby.com/))

## 2.4.0 - 2026-07-17

### Added

- `NEXT_PUBLIC_BACKEND` flag, default `false` in `.env.example`: the site runs UI-only with no Supabase project, so contributors need zero backend setup; GitHub login and favorites stay hidden until it is set to `true`
- `docs/architecture/OPEN_SOURCE_BOUNDARY.md` documenting the split between the public frontend and the private production backend
- Public `supabase/examples/favorites.sql` and `supabase/README.md` for optional local backend setup

### Changed

- Production Supabase backend (migrations) extracted into a separate private repository; the public repo now contains only the frontend and safe client helpers
- `VERSIONING.md` moved to `docs/policies/VERSIONING.md`

## 2.3.0 - 2026-07-17

### Added

- Redesigned Masonry component: an animated, item-driven grid (`items` with `img`/`height`) instead of a CSS-columns wrapper, with `duration`, `stagger`, `animateFrom`, `scaleOnHover`, `hoverScale`, `blurToFocus`, and `colorShiftOnHover` controls
- `renderItem` prop on Masonry for rendering custom tile content while keeping the same layout, entry, and hover animations
- Masonry "Cards" example demonstrating `renderItem` with a title-and-description overlay
- Templates page with placeholder content, sharing Showcase's hero and grid layout

### Changed

- Showcase now renders its project cards through Masonry's `renderItem` instead of a standalone layout

## 2.2.0 - 2026-07-16

### Added

- Dynamic Island component: a compact activity surface that morphs between a pill and expanded content, with controlled/uncontrolled state, keyboard handling, and reduced-motion support
- Widget Stack component: groups glanceable widgets into a small or medium surface with swipe/scroll paging, dot navigation, and keyboard controls

## 2.1.0 - 2026-07-15

### Changed

- Interactive Pets narrowed to a single companion, Mochi the cat, with continuous idle animation (bounce, tilt, blinking)
- Feeding interaction simplified to a bone button with a travel animation and a mouth-level feeding effect
- Added a customizable `fullMessage` pet option

### Removed

- Dog and bird pets (temporarily, pending artwork and motion of the same quality as Mochi)

## 2.0.0 - 2026-07-15

### Removed

- 25 shadcn-style primitive registry components (buttons, form controls, dialogs, tables, navigation, layout primitives)

### Changed

- Registry refocused to 11 signature components: Interactive Pets, Tactile Highlight, Shimmer Text, Image Trail, Animated Gradient, Ghost Ether, Logo Carousel, QR Code, Receipt, Basic Number Ticker, and Spotify Card
- Documentation reorganized into Backgrounds, Text & Motion, Media, Interactive, and Commerce

### Breaking Changes

- Primitive components removed in this release are no longer published or documented; existing installs are unaffected, but new projects should source primitives from shadcn/ui, Base UI, Radix, or their own design system

## 1.0.0 - 2026-07-12

### Added

- Initial public release: an open-source, shadcn-compatible source registry for React, TypeScript, and Tailwind CSS
- Per-component registry URLs with inspectable, installable TypeScript source
- Documentation system with live previews, source examples, copyable installation commands, searchable MDX pages, and generated property tables
- Light and dark theme support and a machine-readable registry index
