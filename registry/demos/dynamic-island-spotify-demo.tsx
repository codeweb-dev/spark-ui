"use client";

import { DynamicIsland } from "@/registry/spark-ui/dynamic-island";
import {
  SpotifyCard,
  type SpotifyCardRef,
} from "@/registry/spark-ui/spotify/spotify-card";
import { motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useCallback, useRef, useState } from "react";

export default function DynamicIslandSpotifyDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [islandOpen, setIslandOpen] = useState(false);
  const playerRef = useRef<SpotifyCardRef>(null);
  const reducedMotion = useReducedMotion();

  const handlePlayingChange = useCallback((playing: boolean) => {
    setIsPlaying(playing);
    if (!playing) setIslandOpen(false);
  }, []);

  return (
    <div className="relative h-96 w-full">
      <div className="absolute inset-x-0 top-0 flex justify-center">
        <DynamicIsland
          open={islandOpen}
          onOpenChange={setIslandOpen}
          expandLabel={
            isPlaying ? "Expand Spotify player" : "Unavailable activity"
          }
          collapseLabel="Collapse Spotify player"
          compact={
            isPlaying ? (
              <span className="flex items-center justify-between gap-4 px-2">
                <span className="flex items-center gap-2 text-xs font-semibold">
                  <span
                    className="size-2 rounded-full bg-green-500"
                    aria-hidden
                  />
                  Spotify
                </span>
                <span
                  className="flex h-4 items-end gap-1"
                  aria-label="Playing"
                >
                  {[8, 14, 10, 16].map((height, index) => (
                    <span
                      key={height}
                      className="w-0.75 animate-pulse rounded-full bg-green-400 motion-reduce:animate-none"
                      style={{
                        height,
                        animationDelay: `${index * 120}ms`,
                      }}
                      aria-hidden
                    />
                  ))}
                </span>
              </span>
            ) : null
          }
          expanded={isPlaying ? <span /> : undefined}
        />
      </div>

      <motion.div
        inert={islandOpen ? undefined : true}
        initial={false}
        animate={{
          opacity: islandOpen ? 1 : 0,
          scaleX: islandOpen ? 1 : 0.4,
          scaleY: islandOpen ? 1 : 0.34,
        }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 420, damping: 34 }
        }
        className={`pointer-events-none absolute inset-x-0 top-4 z-20 flex origin-top justify-center ${
          islandOpen ? "pointer-events-auto" : ""
        }`}
      >
        <SpotifyCard
          ref={playerRef}
          trackUrl="https://open.spotify.com/track/7EW7Yivb93qKAtp5qEm5of?si=b6de0dafaeaa4bfb"
          onPlayingChange={handlePlayingChange}
          className="h-32 w-80 rounded-2xl shadow-none"
        />
      </motion.div>

      <div className="absolute inset-x-0 bottom-2 flex flex-col items-center">
        <button
          type="button"
          onClick={() => playerRef.current?.togglePlayback()}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background outline-none transition hover:opacity-85 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {isPlaying ? (
            <Pause className="size-4 fill-current" aria-hidden />
          ) : (
            <Play className="size-4 fill-current" aria-hidden />
          )}
          {isPlaying ? "Pause Spotify preview" : "Play Spotify preview"}
        </button>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {isPlaying
            ? "Tap the Dynamic Island to see the Spotify Card."
            : "Play the preview to activate the Dynamic Island."}
        </p>
      </div>
    </div>
  );
}
