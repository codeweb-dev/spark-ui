"use client";

import { InteractivePets } from "@/registry/spark-ui/interactive-pets";

export default function InteractivePetsDemo() {
  return (
    <div className="w-full max-w-xl">
      <InteractivePets
        pets={[{ id: "cat", name: "Mochi" }]}
        instructionText="Click Mochi to chat or tap the bowl to feed."
      />
    </div>
  );
}
