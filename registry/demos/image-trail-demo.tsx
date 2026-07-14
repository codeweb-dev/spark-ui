"use client";

import {
  ImageTrail,
  ImageTrailItem,
  ImageTrailItemCaption,
} from "@/registry/spark-ui/image-trail";

const IMAGES = [
  { src: "/images/trail-1.jpg", label: "Forest crossing" },
  { src: "/images/trail-2.jpg", label: "Golden hour" },
  { src: "/images/trail-3.jpg", label: "Open coast" },
  { src: "/images/trail-4.jpg", label: "Highlands" },
  { src: "/images/trail-5.jpg", label: "Into the light" },
];

export default function ImageTrailDemo() {
  return (
    <div className="relative flex h-[600px] w-full cursor-crosshair items-center justify-center overflow-hidden rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/30">
      {/* Background grid representation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      
      <ImageTrail
        className="absolute inset-0"
        threshold={90}
        intensity={0.2}
        repeatChildren={12}
        keyframes={{
          scale: [0.3, 1, 1, 0.3],
          rotate: [-6, 0, 4, 0],
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
        {IMAGES.map((image, index) => (
          <ImageTrailItem
            key={index}
            radius="xl"
            variant={index % 2 === 0 ? "framed" : "glass"}
            className="h-38 w-30 sm:h-48 sm:w-38"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.label}
              className="h-full w-full object-cover pointer-events-none select-none"
            />
            <ImageTrailItemCaption>
              <span className="mr-1.5 text-white/55">0{index + 1}</span>
              {image.label}
            </ImageTrailItemCaption>
          </ImageTrailItem>
        ))}
      </ImageTrail>
    </div>
  );
}
