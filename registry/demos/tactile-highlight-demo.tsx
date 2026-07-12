import React from "react";
import { TactileHighlight } from "@/registry/spark-ui/tactile-highlight";

export default function TactileHighlightDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center min-h-[50vh]">
      <p className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[1.2] max-w-4xl">
        Our mission is to build{" "}
        <TactileHighlight direction="left" delay={0.2} trigger="inView">
          Better Interfaces.
        </TactileHighlight>
      </p>
    </div>
  );
}
