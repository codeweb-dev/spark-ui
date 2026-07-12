"use client";

import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import * as React from "react";

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    className={cn(
      "w-full border-t border-zinc-200 dark:border-zinc-800",
      className,
    )}
    {...props}
  />
));
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "group relative border-b border-zinc-200 transition-colors duration-300 dark:border-zinc-800",
      "data-[state=open]:bg-zinc-50/50 dark:data-[state=open]:bg-zinc-900/30",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "relative flex flex-1 items-center justify-between px-4 py-5 text-left font-semibold text-zinc-700 transition-all focus-visible:outline-none dark:text-zinc-300",
        "group-hover:text-zinc-950 dark:group-hover:text-white [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {/* Magnetic Text Effect */}
      <motion.span
        className="relative z-10 block"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {children}
      </motion.span>

      <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-500 group-hover:text-zinc-900 dark:text-zinc-600 dark:group-hover:text-zinc-100" />

      {/* Active Indicator Bar */}
      <div className="absolute left-0 top-1/2 h-0 w-1 -translate-y-1/2 bg-zinc-950 transition-all duration-300 group-data-[state=open]:h-3/4 dark:bg-zinc-50" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-[14px] text-zinc-500 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down dark:text-zinc-400"
    {...props}
  >
    <div className={cn("px-4 pb-6 pt-1 leading-relaxed", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
