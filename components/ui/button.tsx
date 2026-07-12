import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold",
    "transition-all duration-200 cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground border border-primary/60",
          "shadow-sm shadow-primary/25 inset-shadow-2xs inset-shadow-white/25",
          "hover:brightness-105 hover:shadow-md hover:shadow-primary/30 motion-safe:hover:-translate-y-px",
          "active:translate-y-0 active:shadow-xs active:brightness-95",
        ].join(" "),
        secondary: [
          "bg-secondary text-secondary-foreground border border-border",
          "shadow-xs hover:bg-accent hover:text-accent-foreground motion-safe:hover:-translate-y-px hover:shadow-sm",
          "active:translate-y-0 active:shadow-none",
        ].join(" "),
        outline: [
          "border border-input bg-background text-foreground",
          "shadow-xs hover:bg-accent hover:text-accent-foreground motion-safe:hover:-translate-y-px hover:shadow-sm",
          "active:translate-y-0 active:shadow-none",
        ].join(" "),
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: [
          "bg-destructive text-white border border-destructive/60",
          "shadow-sm hover:brightness-105 hover:shadow-md motion-safe:hover:-translate-y-px",
          "active:translate-y-0 active:shadow-xs active:brightness-95",
        ].join(" "),
        link: "text-primary underline-offset-4 hover:underline",
        spark: [
          "relative bg-primary text-primary-foreground border border-primary/60",
          "shadow-[0_0_16px_-4px_var(--primary)] inset-shadow-2xs inset-shadow-white/30",
          "hover:shadow-[0_0_24px_-4px_var(--primary)] hover:brightness-105 motion-safe:hover:-translate-y-px",
          "active:translate-y-0 active:shadow-[0_0_10px_-4px_var(--primary)] active:brightness-95",
        ].join(" "),
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        default: "h-10 px-5",
        lg: "h-12 px-8 text-base rounded-xl",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
