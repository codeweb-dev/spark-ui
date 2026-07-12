"use client";

import GhostEther from "@/registry/spark-ui/ghost-ether";

export default function GhostEtherDemo() {
  return (
    <div className="relative w-full h-96 bg-zinc-950 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <GhostEther
        colors={["#7b2cbf", "#3f37c9", "#00f5d4"]}
        mouseForce={22}
        cursorSize={75}
        isViscous={true}
        viscous={25}
        iterationsViscous={24}
        iterationsPoisson={24}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.0}
        takeoverDuration={0.3}
        autoResumeDelay={2000}
        autoRampDuration={1.0}
        className="w-full h-full"
      />
    </div>
  );
}
