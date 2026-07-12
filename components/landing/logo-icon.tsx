import { cn } from "@/lib/utils";

/**
 * Spark UI brand mark: a geometric four-point spark.
 * Renders in the current text color by default; pass a text-* class to tint.
 */
export function LogoIcon({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={cn("fill-current", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path d="M16 2 Q19 13 30 16 Q19 19 16 30 Q13 19 2 16 Q13 13 16 2 Z" />
    </svg>
  );
}
