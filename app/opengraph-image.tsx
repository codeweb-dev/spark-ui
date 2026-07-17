import { SITE_CONFIG } from "@/lib/constants";
import { ImageResponse } from "next/og";

export const alt = SITE_CONFIG.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const host = new URL(SITE_CONFIG.url).host;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0a09",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage:
            "linear-gradient(#1e1b17 1px, transparent 1px), linear-gradient(90deg, #1e1b17 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 720,
          height: 720,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(246,166,35,0.22) 0%, rgba(246,166,35,0) 70%)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        <svg width="100" height="100" viewBox="0 0 32 32">
          <path
            d="M16 2 Q19 13 30 16 Q19 19 16 30 Q13 19 2 16 Q13 13 16 2 Z"
            fill="#f6a623"
          />
        </svg>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#f7f4ef",
          }}
        >
          {SITE_CONFIG.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#a8a096",
            textAlign: "center",
            maxWidth: 520,
            lineHeight: 1.4,
          }}
        >
          {SITE_CONFIG.tagline}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 44,
          right: 56,
          display: "flex",
          fontSize: 20,
          color: "#6b655c",
          letterSpacing: 0.5,
        }}
      >
        {host}
      </div>
    </div>,
    size,
  );
}
