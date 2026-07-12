"use client";

import { AnimatedGradient } from "@/registry/spark-ui/animated-gradient";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const presets = [
  { name: "Lava", value: "lava" },
  { name: "Mist", value: "mist" },
  { name: "Vortex", value: "vortex" },
] as const;


export default function AnimatedGradientPresetsDemo() {
  const [active, setActive] = useState<typeof presets[number]["value"]>("lava");

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-black">
      <AnimatedGradient
        key={active}
        variant={active}
        speed={1}
        opacity={0.9}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Pills Container at top center */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex flex-nowrap items-center justify-center gap-1.5 p-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 max-w-[95%] sm:max-w-none">
        {presets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => setActive(preset.value)}
            className={cn(
              "relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-300 cursor-pointer select-none whitespace-nowrap flex-shrink-0 z-10",
              active === preset.value
                ? "text-black"
                : "text-zinc-400 hover:text-white"
            )}
          >
            {active === preset.value && (
              <motion.div
                layoutId="activePresetBg"
                className="absolute inset-0 bg-white rounded-full -z-10 shadow-lg shadow-black/20"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{preset.name}</span>
          </button>
        ))}
      </div>

      {/* Centered text showing current preset name */}
      <div className="relative z-10 text-center pointer-events-none select-none">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white capitalize drop-shadow-lg font-sans">
          {active}
        </h2>
      </div>
    </div>
  );
}
