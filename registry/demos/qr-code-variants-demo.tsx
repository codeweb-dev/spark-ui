"use client";

import { QRCode } from "@/registry/spark-ui/qr-code";
import type { GradientPreset } from "@/registry/spark-ui/qr-code";

const gradientPresets: { gradient: GradientPreset; label: string }[] = [
  { gradient: "default", label: "Default" },
  { gradient: "ocean", label: "Ocean" },
  { gradient: "sunset", label: "Sunset" },
  { gradient: "forest", label: "Forest" },
  { gradient: "berry", label: "Berry" },
  { gradient: "twilight", label: "Twilight" },
  { gradient: "aurora", label: "Aurora" },
  { gradient: "fire", label: "Fire" },
  { gradient: "neon", label: "Neon" },
  { gradient: "rose", label: "Rose" },
  { gradient: "mint", label: "Mint" },
];

export default function QRCodeVariants() {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {gradientPresets.map((preset) => (
          <div
            key={preset.label}
            className="flex flex-col items-center gap-2 sm:gap-3"
          >
            <QRCode
              value="https://spark-ui-olive.vercel.app"
              size={100}
              className="w-full max-w-[100px] sm:max-w-[140px] lg:max-w-[160px]"
              gradient={preset.gradient}
            />
            <span className="text-xs sm:text-sm text-muted-foreground">
              {preset.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
