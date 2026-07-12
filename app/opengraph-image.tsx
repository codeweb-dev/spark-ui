import { SITE_CONFIG } from "@/lib/constants";
import { ImageResponse } from "next/og";

export const alt = SITE_CONFIG.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          background: "#161412",
          color: "#f7f4ef",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32">
          <path
            d="M16 2 Q19 13 30 16 Q19 19 16 30 Q13 19 2 16 Q13 13 16 2 Z"
            fill="#f6a623"
          />
        </svg>
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2 }}>
          {SITE_CONFIG.name}
        </div>
        <div style={{ fontSize: 34, color: "#b8b0a4" }}>
          {SITE_CONFIG.tagline}
        </div>
      </div>
    ),
    size,
  );
}
