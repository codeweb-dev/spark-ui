"use client";

import React from "react";
import { LogoCarousel } from "@/registry/spark-ui/logo-carousel";

const LOGOS = [
  { name: "Cursor", path: "/logos/cursor.svg" },
  { name: "Descript", path: "/logos/descript.svg" },
  { name: "Discord", path: "/logos/discord.svg" },
  { name: "Duolingo", path: "/logos/duolingo.svg" },
  { name: "Framer", path: "/logos/framer.svg" },
  { name: "Google", path: "/logos/google.svg" },
  { name: "Linear", path: "/logos/linear.svg" },
  { name: "Netflix", path: "/logos/netflix.svg" },
  { name: "Notion", path: "/logos/notion.svg" },
  { name: "OpenAI", path: "/logos/openai.svg" },
  { name: "OpenSea", path: "/logos/opensea.svg" },
  { name: "Phantom", path: "/logos/phantom.svg" },
  { name: "Ramp", path: "/logos/ramp.svg" },
  { name: "Shopify", path: "/logos/shopify.svg" },
  { name: "Tesla", path: "/logos/tesla.svg" },
  { name: "Vercel", path: "/logos/vercel.svg" },
];

export default function LogoCarouselDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10">
      <LogoCarousel gap="4.5rem">
        {LOGOS.map((logo, idx) => (
          <img
            key={idx}
            src={logo.path}
            alt={logo.name}
            className="h-9 w-auto opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer logo-carousel-logo"
          />
        ))}
      </LogoCarousel>
    </div>
  );
}
