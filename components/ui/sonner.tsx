"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

export function Toaster(props: React.ComponentProps<typeof Sonner>) {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme as "light" | "dark" | undefined}
      {...props}
    />
  );
}
