"use client";

import { cn } from "@/lib/utils";
import QRCodeLib from "qrcode";
import * as React from "react";

type GradientPreset =
  | "default"
  | "ocean"
  | "sunset"
  | "forest"
  | "berry"
  | "twilight"
  | "aurora"
  | "fire"
  | "neon"
  | "rose"
  | "mint";

export type { GradientPreset };

interface QRCodeProps extends React.SVGProps<SVGSVGElement> {
  /** The URL or data to encode in the QR code */
  value: string;
  /** Overall size of the QR code */
  size?: number;
  /** Foreground color (ignored if gradient is set) */
  fgColor?: string;
  /** Background color */
  bgColor?: string;
  /** Error correction level */
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  /** Gradient preset to apply */
  gradient?: GradientPreset;
  /** Custom className for the SVG */
  className?: string;
}

const gradients: Record<GradientPreset, [string, string]> = {
  default: ["var(--foreground)", "var(--foreground)"],
  ocean: ["#06b6d4", "#3b82f6"],
  sunset: ["#f97316", "#ec4899"],
  forest: ["#22c55e", "#06b6d4"],
  berry: ["#8b5cf6", "#ec4899"],
  twilight: ["#6366f1", "#06b6d4"],
  aurora: ["#10b981", "#8b5cf6"],
  fire: ["#ef4444", "#f59e0b"],
  neon: ["#06b6d4", "#8b5cf6"],
  rose: ["#f43f5e", "#ec4899"],
  mint: ["#10b981", "#06b6d4"],
};

function isInFinderPattern(row: number, col: number, size: number): boolean {
  return (
    (row < 7 && col < 7) ||
    (row < 7 && col >= size - 7) ||
    (row >= size - 7 && col < 7)
  );
}

export function QRCode({
  value,
  size = 160,
  fgColor = "var(--foreground)",
  bgColor = "var(--background)",
  errorCorrectionLevel = "M",
  gradient = "default",
  className,
  ...props
}: QRCodeProps) {
  const qrData = React.useMemo(() => {
    try {
      return QRCodeLib.create(value, { errorCorrectionLevel });
    } catch {
      return null;
    }
  }, [value, errorCorrectionLevel]);

  if (!qrData) {
    return null;
  }

  const moduleCount = qrData.modules.size;
  const moduleSize = size / moduleCount;
  const radius = moduleSize * 0.45;
  const gradientId = `qr-grad-${gradient}-${size}`;
  const [gradStart, gradEnd] = gradients[gradient];
  const useGradient = gradient !== "default";
  const effectiveColor = useGradient ? `url(#${gradientId})` : (gradient === "default" ? fgColor : gradStart);

  const finderPositions: [number, number][] = [
    [0, 0],
    [0, moduleCount - 7],
    [moduleCount - 7, 0],
  ];

  const finderOuterSize = 7 * moduleSize;
  const finderMiddleSize = 3 * moduleSize;

  const dots: { cx: number; cy: number }[] = [];

  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (
        qrData.modules.get(row, col) &&
        !isInFinderPattern(row, col, moduleCount)
      ) {
        dots.push({
          cx: (col + 0.5) * moduleSize,
          cy: (row + 0.5) * moduleSize,
        });
      }
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn(className)}
      {...props}
    >
      <defs>
        {useGradient && (
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
        )}
      </defs>

      <rect width={size} height={size} fill={bgColor} rx={moduleSize * 1.5} />

      {finderPositions.map(([r, c], idx) => {
        const cx = c * moduleSize + finderOuterSize / 2;
        const cy = r * moduleSize + finderOuterSize / 2;
        const outerSize = finderOuterSize;
        const whiteSize = finderOuterSize - moduleSize * 1.5;
        const innerSize = finderMiddleSize;

        return (
          <g key={`finder-${idx}`}>
            <rect
              x={cx - outerSize / 2}
              y={cy - outerSize / 2}
              width={outerSize}
              height={outerSize}
              rx={outerSize * 0.3}
              ry={outerSize * 0.3}
              fill={effectiveColor}
            />
            <rect
              x={cx - whiteSize / 2}
              y={cy - whiteSize / 2}
              width={whiteSize}
              height={whiteSize}
              rx={whiteSize * 0.3}
              ry={whiteSize * 0.3}
              fill={bgColor}
            />
            <rect
              x={cx - innerSize / 2}
              y={cy - innerSize / 2}
              width={innerSize}
              height={innerSize}
              rx={innerSize * 0.3}
              ry={innerSize * 0.3}
              fill={effectiveColor}
            />
          </g>
        );
      })}

      {dots.map(({ cx, cy }, i) => (
        <circle key={i} cx={cx} cy={cy} r={radius} fill={effectiveColor} />
      ))}
    </svg>
  );
}

