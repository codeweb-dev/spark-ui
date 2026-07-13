"use client";

import { InteractivePets } from "@/registry/spark-ui/interactive-pets";

export default function InteractivePetsBirdDemo() {
  return (
    <div className="w-full max-w-xl">
      <InteractivePets
        pets={[{ id: "bird", name: "Pip" }]}
        instructionText="Drag Pip anywhere or tap to feed."
      />
    </div>
  );
}
