"use client";

import React from "react";
import { ImageTrail, ImageTrailItem } from "@/registry/spark-ui/image-trail";

const IMAGES = [
  "/images/trail-1.jpg",
  "/images/trail-2.jpg",
  "/images/trail-3.jpg",
  "/images/trail-4.jpg",
  "/images/trail-5.jpg",
];

export default function ImageTrailDemo() {
  return (
    <div className="relative w-full h-[600px] overflow-hidden cursor-crosshair flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/30">
      {/* Background grid representation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      
      <ImageTrail
        className="absolute inset-0"
        threshold={90}
        intensity={0.2}
        repeatChildren={12}
        keyframes={{
          scale: [0.3, 1, 1, 0.3],
          rotate: [0, -10, 10, 0],
          opacity: [0, 1, 1, 0],
        }}
        keyframesOptions={{
          duration: 1.2,
          times: [0, 0.05, 0.85, 1],
          ease: "easeOut",
        }}
        trailElementAnimationKeyframes={{
          x: { duration: 0.35, type: "tween", ease: "easeOut" },
          y: { duration: 0.35, type: "tween", ease: "easeOut" },
        }}
      >
        {IMAGES.map((src, index) => (
          <ImageTrailItem
            key={index}
            className="w-32 h-32 sm:w-40 sm:h-40 shadow-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-800"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Trail photo ${index + 1}`}
              className="w-full h-full object-cover pointer-events-none select-none"
            />
          </ImageTrailItem>
        ))}
      </ImageTrail>
    </div>
  );
}
