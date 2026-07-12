/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SpotifyCardProps {
  trackUrl: string;
  className?: string;
}

const SpotifyLogo = ({
  className,
  isPlaying,
}: {
  className?: string;
  isPlaying?: boolean;
}) => (
  <motion.svg
    viewBox="0 0 24 24"
    className={cn(
      "fill-current opacity-40 transition-colors duration-500",
      className,
    )}
    animate={
      isPlaying
        ? {
            scale: [1, 1.1, 1],
            opacity: [0.4, 1, 0.4],
            color: ["#ffffff", "#1DB954", "#ffffff"],
          }
        : { color: "currentColor" }
    }
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.306c-.216.353-.674.464-1.027.249-2.846-1.74-6.427-2.133-10.645-1.17-.404.093-.81-.157-.903-.561-.093-.404.157-.81.561-.903 4.613-1.055 8.567-.611 11.76 1.343.353.216.464.674.249 1.027zm1.464-3.256c-.272.44-.848.58-1.288.308-3.258-1.998-8.224-2.58-12.074-1.41-.497.15-1.022-.13-1.173-.627-.151-.498.13-1.023.627-1.174 4.406-1.34 9.89-.687 13.6 1.587.441.27.581.847.308 1.287zm.126-3.393c-3.906-2.32-10.334-2.533-14.072-1.398-.6.182-1.23-.163-1.412-.763-.182-.599.163-1.23.763-1.412 4.293-1.303 11.395-1.043 15.9 1.631.538.319.715 1.015.396 1.554-.319.539-1.015.716-1.555.397z" />
  </motion.svg>
);

export function SpotifyCard({ trackUrl, className }: SpotifyCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [metadata, setMetadata] = useState<{
    title: string;
    artist: string;
    albumArt: string;
    previewUrl: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState<string[]>(["#1DB954", "#191414"]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const discControls = useAnimation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration gate
    setMounted(true);
    // The API accepts only a validated track ID (never a raw URL) to prevent
    // server-side request forgery.
    const trackId = trackUrl.match(/\/track\/([A-Za-z0-9]+)/)?.[1];
    const fetchMetadata = async () => {
      if (!trackId) {
        console.error("Spotify Card Error: invalid Spotify track URL");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(
          `/api/spotify/metadata?trackId=${encodeURIComponent(trackId)}`,
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setMetadata(data);

        // Extract palette from image
        if (data.albumArt) {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.src = data.albumArt;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (ctx) {
              canvas.width = 10;
              canvas.height = 10;
              ctx.drawImage(img, 0, 0, 10, 10);
              const pixels = ctx.getImageData(0, 0, 10, 10).data;
              const uniqueColors = new Set<string>();
              for (let i = 0; i < pixels.length; i += 12) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                uniqueColors.add(`rgb(${r}, ${g}, ${b})`);
                if (uniqueColors.size >= 3) break;
              }
              setColors(Array.from(uniqueColors));
            }
          };
        }

        // Cleanup previous audio if any
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }

        if (data.previewUrl) {
          const audio = new Audio(data.previewUrl);
          audio.crossOrigin = "anonymous";
          audio.onended = () => {
            setIsPlaying(false);
          };
          audioRef.current = audio;
        } else {
          console.warn("No preview URL found for this track");
        }
      } catch (err) {
        console.error("Spotify Card Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetadata();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [trackUrl]);

  useEffect(() => {
    if (isPlaying) {
      discControls.start({
        rotate: 360,
        transition: { duration: 4, repeat: Infinity, ease: "linear" },
      });
    } else {
      discControls.stop();
      discControls.start({
        rotate: 0,
        transition: { duration: 0.8, ease: "backOut" },
      });
    }
  }, [isPlaying, discControls]);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Use a then/catch to handle potential play request interruptions
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Playback interrupted:", err);
          setIsPlaying(false);
        });
    }
  };

  if (loading || !mounted) {
    return (
      <div
        className={cn(
          "w-95 h-32.5 rounded-3xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/10 backdrop-blur-xl",
          className,
        )}
      >
        <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
      </div>
    );
  }

  const {
    title = "Unknown Track",
    artist = "Unknown Artist",
    albumArt = "",
  } = metadata || {};

  return (
    <div
      className={cn(
        "group relative w-95 h-32.5 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 border border-black/5 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-2xl",
        className,
      )}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <img
            src={albumArt}
            alt=""
            className="w-full h-full object-cover blur-xl scale-125 opacity-50 dark:opacity-50"
          />
        </motion.div>

        {/* Subtle Overlay Wash */}
        <div className="absolute inset-0 bg-white/10 dark:bg-transparent" />

        {/* Animated Blobs for depth */}
        <motion.div
          animate={{
            x: [-20, 20, -20],
            y: [-10, 10, -10],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20 dark:opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${colors[0]} 0%, transparent 70%)`,
          }}
        />
        <motion.div
          animate={{
            x: [20, -20, 20],
            y: [10, -10, 10],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 dark:opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${colors[1] || colors[0]} 0%, transparent 70%)`,
          }}
        />

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-5 gap-6">
        {/* Album Cover / Disc */}
        <div className="relative flex items-center justify-center w-24 h-24 shrink-0">
          <motion.div
            layout
            animate={{
              borderRadius: isPlaying ? "100%" : "16px",
            }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="relative w-24 h-24 overflow-hidden shadow-2xl cursor-pointer ring-1 ring-black/5 dark:ring-white/10 z-10"
            onClick={togglePlayback}
          >
            <motion.div
              animate={discControls}
              className="w-full h-full origin-center"
            >
              <img
                src={albumArt}
                alt={title}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              {/* Vinyl Texture */}
              <motion.div
                initial={false}
                animate={{ opacity: isPlaying ? 0.3 : 0 }}
                className="absolute inset-0 bg-[repeating-radial-gradient(circle,transparent,transparent_1px,rgba(255,255,255,0.1)_2px)] pointer-events-none"
              />
              {/* Disc Center */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isPlaying ? 1 : 0,
                  scale: isPlaying ? 1 : 0.5,
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/90 dark:bg-black/95 border border-white/20 flex items-center justify-center pointer-events-none shadow-xl"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Info Section */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1 overflow-hidden pr-8">
          <div className="flex flex-col min-w-0">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight leading-tight truncate">
              {title}
            </h3>
            <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 truncate opacity-80">
              {artist}
            </span>
          </div>
        </div>

        {/* Spotify Branding */}
        <div className="absolute top-5 right-6">
          <SpotifyLogo
            className="w-5 h-5 text-zinc-900 dark:text-white"
            isPlaying={isPlaying}
          />
        </div>
      </div>
    </div>
  );
}
