"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
} from "framer-motion";
import React from "react";

export type PetType = "cat";

export type PetConfig = {
  id: PetType;
  name?: string;
  initialPosition?: { x: number; y: number };
  idleMessage?: string | string[];
  fedMessage?: string;
  fullMessage?: string;
};

export type InteractivePetsProps = {
  pets?: PetConfig[];
  className?: string;
  playgroundClassName?: string;
  showInstructions?: boolean;
  instructionText?: string;
  onPetMove?: (pet: PetType, position: { x: number; y: number }) => void;
  onPetFeed?: (pet: PetType) => void;
};

const PET_DEFAULTS: Record<
  PetType,
  Required<Omit<PetConfig, "id">> & { food: string }
> = {
  cat: {
    name: "Mochi",
    initialPosition: { x: 24, y: 64 },
    idleMessage: ["do not perceive me.", "busy napping.", "you may proceed."],
    fedMessage: "purr. accepted.",
    fullMessage: "i'm full.",
    food: "bone",
  },
};

const DEFAULT_PETS: PetConfig[] = [{ id: "cat" }];

const DEFAULT_INSTRUCTIONS =
  "Drag the cat anywhere, click it to chat, or tap the bone to feed it.";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

/* ------------------------------- Artwork -------------------------------- */

type SpriteProps = { idle: boolean; className?: string; draggable?: boolean };

export function CatSprite({ idle, className, draggable }: SpriteProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const animateIdle = idle && mounted;

  return (
    <motion.svg
      viewBox="0 0 736 736"
      fill="currentColor"
      className={cn(
        "text-black dark:text-white",
        draggable && "z-20 cursor-grab active:cursor-grabbing",
        className,
      )}
      drag={draggable}
      dragMomentum={false}
      aria-hidden
      initial={false}
      animate={
        animateIdle
          ? {
              rotate: [0, 3, -3, 2, 0],
              y: [0, -2, 0, -1, 0],
              scaleX: [1, 0.98, 1.02, 0.99, 1],
            }
          : { rotate: 0, y: 0, scaleX: 1 }
      }
      transition={
        animateIdle
          ? {
              duration: 3.6,
              repeat: Infinity,
              repeatDelay: 2.4,
              ease: "easeInOut",
            }
          : { duration: 0.3 }
      }
      style={{ transformOrigin: "50% 100%", touchAction: "none" }}
    >
      <path
        d="M189.517822,321.560608 C200.482208,304.250854 213.569870,289.241943 228.417297,275.677063 C231.700211,272.677704 233.908188,272.668304 237.240265,275.544403 C251.363831,287.735077 263.243622,301.821564 273.252991,317.492340 C275.388580,320.835846 277.180511,322.046173 281.215698,320.271118 C289.102448,316.801788 297.688904,315.932587 306.168793,316.193054 C311.751160,316.364532 314.345825,314.267792 316.685059,309.449768 C326.817535,288.580505 343.818115,273.918915 362.072845,260.483154 C364.738983,258.520874 366.633301,259.996460 368.730408,261.570160 C384.972260,273.758148 396.550598,289.624481 405.305267,307.733612 C406.029816,309.232361 406.872986,310.709686 407.334869,312.292206 C408.362427,315.812592 410.704742,316.672638 414.140076,316.646301 C457.275818,316.315521 492.104858,333.735413 519.660156,366.424438 C521.987671,369.185608 523.626282,370.497070 526.737854,367.332062 C543.566895,350.213959 546.994324,321.303497 534.473572,300.671021 C520.595276,277.801514 498.410797,274.791260 478.847137,293.160950 C474.353638,297.380219 470.198822,301.985413 465.506989,305.963501 C452.035034,317.386108 434.044373,315.581299 424.223114,302.058319 C418.794006,294.583008 418.473602,286.021088 420.241577,277.616516 C427.739410,241.973709 463.006561,218.618759 499.185364,223.235352 C542.669983,228.784195 579.665894,265.549377 585.673340,310.163574 C591.080627,350.320282 578.193237,384.391357 543.902283,408.453033 C541.014954,410.479095 541.191895,412.450226 542.019104,415.255981 C546.758179,431.330841 548.678711,447.726868 548.446838,464.522064 C547.780396,512.798340 520.568359,547.439331 473.686035,559.256287 C452.688141,564.548950 431.232727,565.749634 409.767487,565.991089 C373.609436,566.397888 337.436127,566.541809 301.283356,565.944336 C276.520020,565.535156 251.619354,565.542114 227.205750,560.289734 C209.064545,556.386780 191.968567,550.111145 178.576675,536.465393 C161.968781,519.542786 153.705139,498.704590 151.794479,475.513580 C148.045746,430.012787 157.361694,386.809082 176.467438,345.571259 C180.248489,337.410248 184.471130,329.461243 189.517822,321.560608 M330.370453,485.989319 C330.982941,487.704437 331.455017,489.486816 332.237244,491.120697 C333.862885,494.516357 335.967255,497.551300 340.217285,497.707733 C344.509766,497.865662 346.896606,495.011536 348.491425,491.588287 C353.026337,481.854340 353.042419,472.006104 348.359192,462.329956 C346.816864,459.143402 344.457550,456.320709 340.423157,456.416687 C336.237549,456.516205 333.885437,459.438690 332.297974,462.855865 C328.971802,470.015717 328.373444,477.502502 330.370453,485.989319 M228.754074,453.494293 C224.649353,450.907654 221.235672,451.864288 218.294373,455.483521 C211.502075,463.841461 211.602661,481.936035 218.505981,490.088348 C222.433090,494.725952 226.760406,494.688110 230.593018,489.982544 C238.107025,480.757294 237.477631,462.793579 228.754074,453.494293 M185.266632,481.237305 C190.100891,484.717743 194.912292,488.230743 199.787613,491.652710 C200.831985,492.385773 202.198288,493.238708 203.286743,491.757904 C203.960617,490.841095 203.502029,489.811676 202.617081,489.163788 C196.611649,484.766998 190.597641,480.381622 184.554657,476.036713 C183.684921,475.411346 182.610977,475.364532 181.900116,476.328613 C181.194717,477.285248 181.564438,478.213470 182.396759,478.942688 C183.142303,479.595917 183.930374,480.200623 185.266632,481.237305 M373.679810,497.526978 C374.764648,501.207062 376.887177,498.834412 378.130859,497.989166 C383.042450,494.650940 387.798279,491.078949 392.538971,487.497131 C393.632935,486.670532 395.119263,485.746948 393.523987,482.761353 C386.451477,486.836151 380.008362,491.619965 373.679810,497.526978 M209.143570,507.736420 C204.260498,505.080231 186.867783,505.785706 184.051880,509.923279 C192.120544,509.923279 199.430801,509.938873 206.740845,509.905365 C207.760666,509.900696 208.693054,509.512878 209.143570,507.736420 M387.568939,513.476257 C380.919128,513.858154 374.090515,512.246521 366.935150,514.712891 C371.742706,518.260986 387.174500,518.410400 391.905121,515.468567 C391.361969,513.580139 389.616943,513.922363 387.568939,513.476257 z"
      />
      <motion.g
        initial={false}
        animate={animateIdle ? { opacity: [0, 0, 1, 0] } : { opacity: 0 }}
        transition={
          animateIdle
            ? {
                duration: 0.22,
                repeat: Infinity,
                repeatDelay: 3.4,
                times: [0, 0.35, 0.5, 1],
              }
            : { duration: 0.1 }
        }
      >
        <ellipse cx="228" cy="476" rx="13" ry="24" />
        <ellipse cx="340" cy="477" rx="13" ry="24" />
        <path
          d="M216 477h24M328 478h24"
          fill="none"
          stroke="var(--background)"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </motion.g>
    </motion.svg>
  );
}

const SPRITES: Record<PetType, React.ComponentType<SpriteProps>> = {
  cat: CatSprite,
};

const FOOD_EMOJIS: Record<PetType, string> = {
  cat: "🦴",
};

/* -------------------------------- Effects ------------------------------- */

const CRUMB_OFFSETS = [
  { x: -14, y: -6 },
  { x: -6, y: 10 },
  { x: 4, y: -12 },
  { x: 12, y: 6 },
  { x: 18, y: -4 },
];

function Crumbs() {
  return (
    <div className="pointer-events-none absolute left-[38%] top-[68%]">
      {CRUMB_OFFSETS.map((offset, i) => (
        <motion.span
          key={i}
          className="absolute size-1 rounded-full bg-muted-foreground/70"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: offset.x, y: offset.y, opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.7, delay: i * 0.04, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* --------------------------------- Pet ----------------------------------- */

type ResolvedPet = Required<PetConfig> & { food: string };

const FULL_AFTER_FEEDS = 3;

const getFeedMessage = (pet: ResolvedPet, feedCount: number) =>
  feedCount >= FULL_AFTER_FEEDS ? pet.fullMessage : pet.fedMessage;

type PetActorProps = {
  pet: ResolvedPet;
  playgroundRef: React.RefObject<HTMLDivElement | null>;
  reduceMotion: boolean;
  feedCount: number;
  reactionVisible: boolean;
  registerRef: (el: HTMLDivElement | null) => void;
  onMove: (position: { x: number; y: number }) => void;
};

function PetActor({
  pet,
  playgroundRef,
  reduceMotion,
  feedCount,
  reactionVisible,
  registerRef,
  onMove,
}: PetActorProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(pet.initialPosition.x);
  const y = useMotionValue(pet.initialPosition.y);
  const [dragging, setDragging] = React.useState(false);
  const [showIdleBubble, setShowIdleBubble] = React.useState(false);
  const idleMessages = Array.isArray(pet.idleMessage)
    ? pet.idleMessage
    : [pet.idleMessage];
  const [idleMessage, setIdleMessage] = React.useState(idleMessages[0]);
  const idleTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const [fx, setFx] = React.useState<{
    type: "settle" | "bounce";
    id: number;
  } | null>(null);

  const Sprite = SPRITES[pet.id];
  const idle = true;

  // Bounce when a feeding lands (skip mount).
  const prevFeedCount = React.useRef(feedCount);
  React.useEffect(() => {
    if (feedCount > prevFeedCount.current) {
      setFx({ type: "bounce", id: feedCount });
    }
    prevFeedCount.current = feedCount;
  }, [feedCount]);

  // Keep the pet inside the playground when it resizes.
  React.useEffect(() => {
    const el = ref.current;
    const container = playgroundRef.current;
    if (!el || !container || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      x.set(clamp(x.get(), 0, container.clientWidth - el.offsetWidth));
      y.set(clamp(y.get(), 0, container.clientHeight - el.offsetHeight));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [playgroundRef, x, y]);

  React.useEffect(() => () => clearTimeout(idleTimer.current), []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showRandomMessage();
      return;
    }
    const step = event.shiftKey ? 24 : 8;
    const delta = {
      ArrowLeft: { dx: -step, dy: 0 },
      ArrowRight: { dx: step, dy: 0 },
      ArrowUp: { dx: 0, dy: -step },
      ArrowDown: { dx: 0, dy: step },
    }[event.key];
    if (!delta) return;
    event.preventDefault();
    const el = ref.current;
    const container = playgroundRef.current;
    if (!el || !container) return;
    x.set(clamp(x.get() + delta.dx, 0, container.clientWidth - el.offsetWidth));
    y.set(
      clamp(y.get() + delta.dy, 0, container.clientHeight - el.offsetHeight),
    );
    onMove({ x: Math.round(x.get()), y: Math.round(y.get()) });
  };

  const showRandomMessage = () => {
    setIdleMessage(
      idleMessages[Math.floor(Math.random() * idleMessages.length)] ?? "",
    );
    setShowIdleBubble(true);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setShowIdleBubble(false), 2400);
  };

  return (
    <motion.div
      data-pet-actor
      ref={(el) => {
        ref.current = el;
        registerRef(el);
      }}
      drag
      dragConstraints={playgroundRef}
      dragElastic={0}
      dragMomentum={false}
      whileDrag={{ scale: 1.1 }}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => {
        setDragging(false);
        if (!reduceMotion) setFx({ type: "settle", id: Date.now() });
        onMove({ x: Math.round(x.get()), y: Math.round(y.get()) });
      }}
      onClick={showRandomMessage}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-roledescription="draggable pet"
      aria-label={`${pet.name} the ${pet.id}. Click to chat, drag to move, or use arrow keys.`}
      style={{ x, y, touchAction: "none" }}
      className={cn(
        "pointer-events-auto absolute left-0 top-0 select-none rounded-2xl outline-none",
        "cursor-grab active:cursor-grabbing",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        dragging && "z-10",
      )}
    >
      <AnimatePresence>
        {(reactionVisible || showIdleBubble) && (
          <motion.div
            key={reactionVisible ? `fed-${feedCount}` : "idle"}
            initial={
              reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6, scale: 0.9 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.95 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="pointer-events-none absolute -top-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-popover px-2.5 py-1 text-[11px] leading-none text-popover-foreground shadow-sm"
          >
            {reactionVisible ? getFeedMessage(pet, feedCount) : idleMessage}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        key={fx?.id ?? "rest"}
        animate={
          fx && !reduceMotion
            ? fx.type === "bounce"
              ? { scale: [1, 1.18, 0.94, 1], rotate: [0, -4, 4, 0] }
              : { scaleY: [1, 0.82, 1.06, 1], scaleX: [1, 1.1, 0.97, 1] }
            : undefined
        }
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="origin-bottom"
      >
        <Sprite
          idle={idle}
          className={cn(
            "h-14 w-14 sm:h-16 sm:w-16",
          )}
        />
      </motion.div>
      {feedCount > 0 && !reduceMotion && (
        <Crumbs key={`crumbs-${feedCount}`} />
      )}
    </motion.div>
  );
}

/* ------------------------------ Component -------------------------------- */

type Flight = {
  id: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
};

export function InteractivePets({
  pets = DEFAULT_PETS,
  className,
  playgroundClassName,
  showInstructions = true,
  instructionText = DEFAULT_INSTRUCTIONS,
  onPetMove,
  onPetFeed,
}: InteractivePetsProps) {
  const reduceMotion = false;
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const playgroundRef = React.useRef<HTMLDivElement | null>(null);
  const petRefs = React.useRef<Partial<Record<PetType, HTMLDivElement | null>>>(
    {},
  );
  const buttonRefs = React.useRef<
    Partial<Record<PetType, HTMLButtonElement | null>>
  >({});
  const bubbleTimers = React.useRef<
    Partial<Record<PetType, ReturnType<typeof setTimeout>>>
  >({});
  const flightId = React.useRef(0);

  const [flights, setFlights] = React.useState<
    Partial<Record<PetType, Flight>>
  >({});
  const [feedCounts, setFeedCounts] = React.useState<
    Partial<Record<PetType, number>>
  >({});
  const feedCountsRef = React.useRef<Partial<Record<PetType, number>>>({});
  const [reactions, setReactions] = React.useState<
    Partial<Record<PetType, boolean>>
  >({});
  const [announcement, setAnnouncement] = React.useState("");

  const resolvedPets: ResolvedPet[] = pets.map((pet) => ({
    ...PET_DEFAULTS[pet.id],
    ...Object.fromEntries(
      Object.entries(pet).filter(([, value]) => value !== undefined),
    ),
    id: pet.id,
  }));

  React.useEffect(() => {
    const timers = bubbleTimers.current;
    return () => Object.values(timers).forEach(clearTimeout);
  }, []);

  const land = React.useCallback((pet: ResolvedPet) => {
    const feedCount = (feedCountsRef.current[pet.id] ?? 0) + 1;
    feedCountsRef.current = { ...feedCountsRef.current, [pet.id]: feedCount };
    setFeedCounts(feedCountsRef.current);
    setReactions((prev) => ({ ...prev, [pet.id]: true }));
    setAnnouncement(
      `${pet.name} the ${pet.id} was fed. ${getFeedMessage(pet, feedCount)}`,
    );
    clearTimeout(bubbleTimers.current[pet.id]);
    bubbleTimers.current[pet.id] = setTimeout(() => {
      setReactions((prev) => ({ ...prev, [pet.id]: false }));
    }, 2400);
  }, []);

  const feed = (pet: ResolvedPet) => {
    onPetFeed?.(pet.id);
    const wrapper = wrapperRef.current;
    const petEl = petRefs.current[pet.id];
    const buttonEl = buttonRefs.current[pet.id];
    if (reduceMotion || !wrapper || !petEl || !buttonEl) {
      land(pet);
      return;
    }
    const wrapperRect = wrapper.getBoundingClientRect();
    const petRect = petEl.getBoundingClientRect();
    const buttonRect = buttonEl.getBoundingClientRect();
    setFlights((prev) => ({
      ...prev,
      [pet.id]: {
        id: ++flightId.current,
        from: {
          x: buttonRect.left + buttonRect.width / 2 - wrapperRect.left,
          y: buttonRect.top + buttonRect.height / 2 - wrapperRect.top,
        },
        to: {
          x: petRect.left + petRect.width / 2 - wrapperRect.left,
          y: petRect.top + petRect.height / 2 - wrapperRect.top,
        },
      },
    }));
  };

  return (
    <div
      ref={wrapperRef}
      className={cn("relative w-full select-none", className)}
    >
      <div
        ref={playgroundRef}
        className={cn(
          "relative h-64 w-full rounded-xl border border-border bg-muted/30 sm:h-80",
          playgroundClassName,
        )}
      >
        {resolvedPets.map((pet) => (
          <PetActor
            key={pet.id}
            pet={pet}
            playgroundRef={playgroundRef}
            reduceMotion={reduceMotion}
            feedCount={feedCounts[pet.id] ?? 0}
            reactionVisible={reactions[pet.id] ?? false}
            registerRef={(el) => {
              petRefs.current[pet.id] = el;
            }}
            onMove={(position) => onPetMove?.(pet.id, position)}
          />
        ))}
        <div
          data-food-controls
          className="absolute inset-x-4 bottom-3 flex justify-around"
        >
          {resolvedPets.map((pet) => (
            <motion.button
              key={pet.id}
              type="button"
              ref={(el) => {
                buttonRefs.current[pet.id] = el;
              }}
              drag
              dragConstraints={playgroundRef}
              dragElastic={0}
              dragMomentum={false}
              whileDrag={{ scale: 1.1 }}
              onTap={() => feed(pet)}
              aria-label={`${pet.name}'s bone. Drag to move or activate to feed ${pet.name} a ${pet.food}`}
              className="pointer-events-auto flex h-6 w-9 cursor-grab items-center justify-center rounded-lg border border-border bg-black text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing"
              style={{ touchAction: "none" }}
            >
              <span aria-hidden>🦴</span>
            </motion.button>
          ))}
        </div>
      </div>

      {showInstructions && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {instructionText}
        </p>
      )}

      {resolvedPets.map((pet) => {
        const flight = flights[pet.id];
        if (!flight) return null;
        return (
          <motion.div
            key={flight.id}
            initial={{ x: flight.from.x - 10, y: flight.from.y - 10, scale: 1 }}
            animate={{ x: flight.to.x - 10, y: flight.to.y - 10, scale: 0.5 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            onAnimationComplete={() => {
              setFlights((prev) => ({ ...prev, [pet.id]: undefined }));
              land(pet);
            }}
            className="pointer-events-none absolute left-0 top-0 z-20 text-xl leading-none"
          >
            <span aria-hidden>{FOOD_EMOJIS[pet.id]}</span>
          </motion.div>
        );
      })}

      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </div>
  );
}
