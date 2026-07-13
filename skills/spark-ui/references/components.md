# Spark UI component reference

Install any component with:

```bash
npx shadcn@latest add https://spark-ui-olive.vercel.app/r/<name>.json
```

(Official registry origin per SKILL.md — use `http://localhost:3000` only when the registry repo itself runs locally.) Import paths below assume the CLI's default target, `components/<name>` — verify against the consumer project's `components.json` aliases. All components accept `className`, merged via `cn()`. "Server-safe" means the file has no `"use client"` directive.

## Primitives

### button — server-safe

```tsx
import { Button, buttonVariants, type ButtonProps } from "@/components/button";

<Button variant="spark" size="lg">Launch</Button>
<Button asChild><a href="/docs">Docs</a></Button>
```

- `variant`: `default` | `secondary` | `outline` | `ghost` | `destructive` | `link` | `spark` (glowing brand variant)
- `size`: `sm` | `default` | `lg` | `icon`
- `asChild`: renders the child element (Radix Slot) instead of a `<button>` — use for links and as overlay triggers.
- `buttonVariants({ variant, size })` styles non-Button elements.

### badge — server-safe

```tsx
import { Badge, badgeVariants } from "@/components/badge";
<Badge variant="secondary">Beta</Badge>;
```

- `variant`: `default` | `secondary` | `destructive` | `outline`.

### input / textarea — server-safe

```tsx
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
<Input type="email" placeholder="m@example.com" />
<Textarea placeholder="Type your message here." />
```

Single components; accept all native input/textarea props. Both are `w-full` by default — constrain with `max-w-*` on the element or a parent.

### checkbox / switch / toggle / progress / separator — client

```tsx
import { Checkbox } from "@/components/checkbox";
import { Switch } from "@/components/switch";
import { Toggle } from "@/components/toggle";
import { Progress } from "@/components/progress";
import { Separator } from "@/components/separator";

<Checkbox id="terms" checked={checked} onCheckedChange={setChecked} />
<Switch checked={on} onCheckedChange={setOn} />
<Toggle variant="outline" size="sm" pressed={bold} onPressedChange={setBold}>B</Toggle>
<Progress value={66} />
<Separator orientation="vertical" />
```

- Radix wrappers; support controlled (`checked`/`pressed` + change handler) and uncontrolled (`defaultChecked`/`defaultPressed`) use.
- Pair checkbox/switch with a `<label htmlFor>` matching an `id`.
- `toggle` variants: `default` | `outline`; sizes `default` | `sm` | `lg`. `toggleVariants` also exported.

### skeleton — server-safe

```tsx
import { Skeleton } from "@/components/skeleton";
<Skeleton className="h-4 w-48" />;
```

Size it entirely with `className`.

### alert — server-safe

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/alert";

<Alert variant="destructive">
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Something needs attention.</AlertDescription>
</Alert>;
```

- `variant`: `default` | `destructive`.

### empty — server-safe

```tsx
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/empty";

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <InboxIcon />
    </EmptyMedia>
    <EmptyTitle>No results</EmptyTitle>
    <EmptyDescription>Try a different search.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Clear filters</Button>
  </EmptyContent>
</Empty>;
```

## Layout

### card — server-safe

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/card";
```

Hierarchy: `Card` > `CardHeader` (`CardTitle`, `CardDescription`) / `CardContent` / `CardFooter`. All are styled `div`s — safe to omit or reorder sections.

### table — server-safe

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/table";

<Table>
  <TableCaption>A list of recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>;
```

The root renders its own `overflow-auto` wrapper and is `w-full` — give the parent real width.

### kanban — server-safe (state lives in your client component)

```tsx
import {
  Kanban,
  KanbanColumn,
  KanbanColumnHeader,
  KanbanColumnTitle,
  KanbanColumnCount,
  KanbanColumnContent,
  KanbanCard,
  KanbanCardTitle,
  KanbanCardDescription,
  KanbanCardFooter,
} from "@/components/kanban";

<Kanban className="min-w-200">
  <KanbanColumn
    onDragOver={(e) => e.preventDefault()}
    onDrop={(e) => moveTask(e.dataTransfer.getData("text/plain"), "done")}
  >
    <KanbanColumnHeader>
      <KanbanColumnTitle>Done</KanbanColumnTitle>
      <KanbanColumnCount>{doneTasks.length}</KanbanColumnCount>
    </KanbanColumnHeader>
    <KanbanColumnContent>
      {doneTasks.map((t) => (
        <KanbanCard
          key={t.id}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", t.id)}
        >
          <KanbanCardTitle>{t.title}</KanbanCardTitle>
          <KanbanCardDescription>{t.description}</KanbanCardDescription>
          <KanbanCardFooter>…</KanbanCardFooter>
        </KanbanCard>
      ))}
    </KanbanColumnContent>
  </KanbanColumn>
</Kanban>;
```

- Pure structural primitives: you own the task array, filtering, and HTML drag-and-drop handlers.
- Boards are wide; wrap in `overflow-x-auto` when the container can be narrow.
- Styling hooks: `data-over` on `KanbanColumn` and `data-dragging` on `KanbanCard` (set them from your handlers).

## Overlays (all client, Radix-based)

Shared rules: Trigger/Content pairs inside the root; use `asChild` on triggers to wrap a `Button`; always include the Title subcomponent in modal content; content portals at `z-50`.

### dialog

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Edit profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes and save.</DialogDescription>
    </DialogHeader>
    {/* body */}
    <DialogFooter>
      <Button type="submit">Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

Also exports `DialogOverlay`, `DialogPortal` for advanced use. `DialogContent` accepts `showCloseButton={false}` to hide the built-in ✕. Controlled: `open` + `onOpenChange` on `Dialog`.

### alert-dialog

Same shape as dialog with `AlertDialogAction` / `AlertDialogCancel` in the footer (see SKILL.md pattern). Installing it auto-installs `button` (registry dependency). No built-in close button — actions close it.

### sheet

```tsx
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/sheet";

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>Make changes to your profile here.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>;
```

`SheetContent side`: `top` | `right` | `bottom` | `left` (cva variant).

### dropdown-menu

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onSelect={handleEdit}>Edit</DropdownMenuItem>
    <DropdownMenuCheckboxItem checked={muted} onCheckedChange={setMuted}>
      Muted
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

### popover / hover-card / tooltip

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@/components/popover";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/hover-card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button size="icon" aria-label="Add">
        <Plus />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Add item</TooltipContent>
  </Tooltip>
</TooltipProvider>;
```

- Tooltip requires `TooltipProvider` (place once near the app root).
- Popover is click-driven; HoverCard is hover-driven (link previews).
- Icon-only trigger buttons need `aria-label`.

## Navigation

### breadcrumb — server-safe

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/breadcrumb";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>;
```

`BreadcrumbLink` supports `asChild` for framework `Link` components. `BreadcrumbPage` marks the current page (aria-current).

### accordion — client

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes — Radix accordion underneath.</AccordionContent>
  </AccordionItem>
</Accordion>;
```

`type="single" | "multiple"`; each `AccordionItem` needs a unique `value`.

### pagination — client

```tsx
import { Pagination, usePaginationState } from "@/components/pagination";

const { currentPage, setCurrentPage } = usePaginationState(1);
<Pagination
  totalPages={12}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
  variant="outline"
  color="violet"
  showEdges
/>;
```

- Required: `totalPages`, `currentPage` (1-indexed), `onPageChange`.
- `variant`: `solid` | `outline` | `ghost` | `squircle`; `size`: `sm` | `md` | `lg`; `siblingCount`, `showEdges`.
- `color`: `default` plus 16 named Tailwind hues (`blue`, `violet`, `emerald`, …) — see `PaginationColor` type.

## Typography & effects (all client unless noted)

### shimmer-text

```tsx
import { ShimmerText } from "@/components/shimmer-text";
<ShimmerText duration={2}>Shipping soon</ShimmerText>;
```

Props: `shimmerColor`, `shimmerColor2`, `direction`, `duration`, plus more in the source.

### tactile-highlight

```tsx
import { TactileHighlight } from "@/components/tactile-highlight";
<TactileHighlight trigger="inView">important phrase</TactileHighlight>;
```

Props: `direction`, `delay`, `trigger` (`auto` | `hover` | `inView`). Uses `mix-blend-difference`, so contrast holds in both themes.

### basic-number-ticker

```tsx
import NumberTicker, {
  type NumberTickerRef,
} from "@/components/basic-number-ticker";
<NumberTicker from={0} target={1024} />;
```

- **Default export.** Props: `from`, `target` (required), `transition`, `autoStart`, `onStart`, `onComplete`.
- Imperative control via ref: `ref.current.startAnimation()`.

## Media & backgrounds

### interactive-pets

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
  onPetMove={(pet, position) => console.log(pet, position)}
  onPetFeed={(pet) => console.log(`${pet} was fed`)}
/>
```

- `pets`: `PetConfig[]`; IDs are `cat` | `dog` | `bird`. Omitted pets are not rendered.
- Each config accepts `name`, pixel-based `initialPosition: { x, y }`, `idleMessage: string | string[]`, and `fedMessage`. Clicking a pet selects a random message when an array is supplied.
- Other props: `className`, `playgroundClassName`, `showInstructions`, `instructionText`, `onPetMove`, `onPetFeed`.
- Pets support pointer dragging and arrow-key movement; Enter/Space shows a message. Food bowls can also be dragged and activated to feed their matching pet.
- The component respects reduced motion. Feeding still updates messages and callbacks when travel/bounce animations are skipped.

Site-wide pet in Next.js App Router:

```tsx
// app/layout.tsx
<InteractivePets
  pets={[{ id: "cat", initialPosition: { x: 24, y: 80 } }]}
  showInstructions={false}
  className="pointer-events-none fixed inset-0 z-40"
  playgroundClassName="h-dvh rounded-none border-0 bg-transparent sm:h-dvh"
/>
```

Mount it once in the root layout so it persists across navigation. The transparent full-viewport wrapper provides drag constraints without intercepting page input; the component's pet and bowl elements use `pointer-events-auto`. Food controls sit along the playground bottom by default and expose `data-food-controls` for scoped position overrides.

### image-trail — server-safe file

```tsx
import {
  ImageTrail,
  ImageTrailItem,
  ImageTrailItemCaption,
} from "@/components/image-trail";

<ImageTrail className="h-96">
  <ImageTrailItem>
    <img src="/a.jpg" alt="" />
  </ImageTrailItem>
  <ImageTrailItem>
    <img src="/b.jpg" alt="" />
    <ImageTrailItemCaption>Caption</ImageTrailItemCaption>
  </ImageTrailItem>
</ImageTrail>;
```

Framed images follow the pointer with momentum; ships demo assets. Needs a sized container.

### animated-gradient

```tsx
import { AnimatedGradient } from "@/components/animated-gradient";
<AnimatedGradient
  variant="vortex"
  speed={1}
  opacity={0.8}
  className="absolute inset-0"
/>;
```

`variant`: `mist` | `lava` | `vortex`. WebGL shader background; accepts `children` to render content on top.

### ghost-ether

```tsx
import { GhostEther, type GhostEtherProps } from "@/components/ghost-ether";
<GhostEther className="absolute inset-0" />;
```

Three.js fluid background (installs `three` + `@types/three`). Tunables include `mouseForce`, `cursorSize`, `isViscous`, `viscous` — see `GhostEtherProps` in the installed source. Heavy: render once per page, client only.

### logo-carousel / logo-carousel-right

```tsx
import { LogoCarousel } from "@/components/logo-carousel";
<LogoCarousel duration={30} pauseOnHover fade>
  {logos}
</LogoCarousel>;
```

Props: `duration`, `pauseOnHover`, `direction` (`left`|`right`|`up`|`down`), `reverse`, `fade`, `fadeAmount`, `repeat`, `gap`. `logo-carousel` installs demo logo assets. `logo-carousel-right` exports `LogoCarouselDemoRight`, a preconfigured right-scrolling variant.

### qr-code

```tsx
import { QRCode } from "@/components/qr-code";
<QRCode
  value="https://spark-ui-olive.vercel.app"
  size={160}
  gradient="sunset"
/>;
```

Props: `value` (required), `size`, `fgColor`, `bgColor`, `errorCorrectionLevel` (`L`|`M`|`Q`|`H`), `gradient` presets. Renders an SVG.

### spotify-card

```tsx
import { SpotifyCard } from "@/components/spotify-card";
<SpotifyCard trackUrl="https://open.spotify.com/track/..." />;
```

- Props: `trackUrl` (required), `className`.
- Installs `app/api/spotify/metadata/route.ts`, which scrapes track metadata server-side (`got` + `cheerio`) — **requires Next.js App Router**. The card extracts the track ID from `trackUrl` and fetches `/api/spotify/metadata?trackId=...` at runtime; the route only ever requests `https://open.spotify.com/track/<id>` (SSRF-safe) and returns 400 for anything that isn't a valid track ID.
