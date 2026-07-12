"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/spark-ui/accordion";
import NumberTicker from "@/registry/spark-ui/basic-number-ticker";
import { LabelInput } from "@/registry/spark-ui/label-input";
import { Pagination, usePaginationState } from "@/registry/spark-ui/pagination";
import { RichButton } from "@/registry/spark-ui/rich-button";
import { ShimmerText } from "@/registry/spark-ui/shimmer-text";
import { TactileHighlight } from "@/registry/spark-ui/tactile-highlight";
import { motion, type Variants } from "framer-motion";
import { Keyboard, Layout, MousePointer2, Navigation2, Type, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function CategoryBadge({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-background border border-border text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-2 w-fit shadow-xs">
      <Icon size={10} /> {label}
    </div>
  );
}

function ShowcaseCard({
  href,
  title,
  icon,
  label,
  span,
  children,
}: {
  href: string;
  title: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  span: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={`${span} group relative overflow-hidden rounded-3xl border border-border bg-card/50 p-6 md:p-8 shadow-sm transition-colors duration-500 flex flex-col`}
    >
      <div className="flex items-start justify-between">
        <div>
          <CategoryBadge icon={icon} label={label} />
          <h3 className="text-lg font-semibold tracking-tight">
            <Link
              href={href}
              className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {title}
            </Link>
          </h3>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center pt-6 min-h-56">
        {children}
      </div>
    </motion.div>
  );
}

export function Showcase() {
  const pagination = usePaginationState(1);

  return (
    <section aria-label="Component showcase">
      <div className="text-center space-y-3 pb-12">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Built to be borrowed
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
          A quick look at a few of the components. Every one installs as plain
          source code you can read, restyle, and ship.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6"
      >
        <ShowcaseCard
          href="/docs/components/accordion"
          title="Accordion"
          icon={Layout}
          label="Layout"
          span="md:col-span-5"
        >
          <Accordion type="single" collapsible className="w-full max-w-sm">
            <AccordionItem value="i1" className="border-border">
              <AccordionTrigger className="text-sm font-semibold">
                Design philosophy
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground">
                Composable primitives, warm defaults.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="i2" className="border-border">
              <AccordionTrigger className="text-sm font-semibold">
                Motion
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground">
                Springs tuned for feedback, not spectacle.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ShowcaseCard>

        <ShowcaseCard
          href="/docs/components/label-input"
          title="Label Input"
          icon={Keyboard}
          label="Form"
          span="md:col-span-7"
        >
          <LabelInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            ringColor="amber"
            className="w-full max-w-sm"
          />
        </ShowcaseCard>

        <ShowcaseCard
          href="/docs/components/pagination"
          title="Pagination"
          icon={Navigation2}
          label="Navigation"
          span="md:col-span-7"
        >
          <div className="scale-90 sm:scale-100">
            <Pagination
              totalPages={8}
              currentPage={pagination.page}
              onPageChange={pagination.setPage}
              color="default"
              showEdges
            />
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          href="/docs/components/basic-number-ticker"
          title="Number Ticker"
          icon={Type}
          label="Typography"
          span="md:col-span-5"
        >
          <span className="text-5xl font-mono text-foreground">
            <NumberTicker from={0} target={99} />
            <span>%</span>
          </span>
        </ShowcaseCard>

        <ShowcaseCard
          href="/docs/components/shimmer-text"
          title="Shimmer Text"
          icon={Type}
          label="Typography"
          span="md:col-span-6"
        >
          <ShimmerText variant="default" duration={2} className="text-3xl md:text-4xl">
            Feel the spark
          </ShimmerText>
        </ShowcaseCard>

        <ShowcaseCard
          href="/docs/components/tactile-highlight"
          title="Tactile Highlight"
          icon={MousePointer2}
          label="Typography"
          span="md:col-span-6"
        >
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-foreground text-center leading-tight">
            Build{" "}
            <TactileHighlight direction="left">
              better interfaces
            </TactileHighlight>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          href="/docs/components/rich-button"
          title="Rich Button"
          icon={Zap}
          label="Button"
          span="md:col-span-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <RichButton color="amber" size="sm" className="rounded-xl">
              <Zap size={14} className="mr-2" /> Primary
            </RichButton>
            <RichButton color="emerald" size="sm" className="rounded-xl">
              Success
            </RichButton>
            <RichButton color="purple" size="sm" className="rounded-xl">
              Purple
            </RichButton>
            <RichButton color="default" size="sm" className="rounded-xl">
              Neutral
            </RichButton>
          </div>
        </ShowcaseCard>
      </motion.div>
    </section>
  );
}
