"use client";

import { InteractivePets } from "@/registry/spark-ui/interactive-pets";

export default function InteractivePetsDemo() {
  return (
    <div className="w-full max-w-xl">
      <InteractivePets
        pets={[{ id: "cat", name: "Mochi" }]}
        instructionText="Drag Mochi anywhere or tap to feed."
      />
    </div>
  );
}
