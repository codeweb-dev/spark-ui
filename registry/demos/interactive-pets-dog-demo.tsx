"use client";

import { InteractivePets } from "@/registry/spark-ui/interactive-pets";

export default function InteractivePetsDogDemo() {
  return (
    <div className="w-full max-w-xl">
      <InteractivePets
        pets={[{ id: "dog", name: "Biscuit" }]}
        instructionText="Click Biscuit to chat or tap the bowl to feed."
      />
    </div>
  );
}
