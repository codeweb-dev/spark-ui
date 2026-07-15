"use client";

import { InteractivePets } from "@/registry/spark-ui/interactive-pets";
import { usePathname } from "next/navigation";

export function SitePet() {
  const isHome = usePathname() === "/";

  return (
    <InteractivePets
      key={isHome ? "home" : "page"}
      pets={[
        {
          id: "cat",
          name: "Mochi",
          initialPosition: { x: 0, y: 0 },
          idleMessage: [
            "Interactive Pets is now in beta!",
            "New this version: pets roam the whole site.",
            "Drag me around and try my bone.",
            "Click me anytime for release updates.",
          ],
          fedMessage: "Thanks for testing the beta!",
        },
      ]}
      showInstructions={false}
      className={
        "pointer-events-none fixed inset-0 z-40 **:data-food-controls:inset-x-auto " +
        (isHome
          ? "**:data-food-controls:top-24 **:data-food-controls:bottom-auto **:data-food-controls:left-[calc(50%+1rem)] **:data-pet-actor:top-24 **:data-pet-actor:left-[calc(50%-5rem)]"
          : "**:data-food-controls:top-auto **:data-food-controls:right-6 **:data-food-controls:bottom-6 **:data-food-controls:left-auto **:data-pet-actor:top-auto **:data-pet-actor:right-24 **:data-pet-actor:bottom-6 **:data-pet-actor:left-auto")
      }
      playgroundClassName="h-dvh rounded-none border-0 bg-transparent sm:h-dvh"
    />
  );
}
