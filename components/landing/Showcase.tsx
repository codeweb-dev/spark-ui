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
import { ShimmerText } from "@/registry/spark-ui/shimmer-text";
import { TactileHighlight } from "@/registry/spark-ui/tactile-highlight";
import Link from "next/link";
import React from "react";

function ShowcaseCard({
  href,
  title,
  span,
  children,
}: {
  href: string;
  title: string;
  span: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${span} flex flex-col rounded-xl border border-border bg-card p-6`}
    >
      <h3 className="text-sm font-medium">
        <Link
          href={href}
          className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          {title}
        </Link>
      </h3>
      <div className="flex-1 flex items-center justify-center pt-6 min-h-48">
        {children}
      </div>
    </div>
  );
}

export function Showcase() {
  const pagination = usePaginationState(1);

  return (
    <section
      aria-label="Component showcase"
      className="grid grid-cols-1 md:grid-cols-12 gap-4"
    >
      <ShowcaseCard
        href="/docs/components/accordion"
        title="Accordion"
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
        span="md:col-span-7"
      >
        <LabelInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          ringColor="primary"
          className="w-full max-w-sm"
        />
      </ShowcaseCard>

      <ShowcaseCard
        href="/docs/components/pagination"
        title="Pagination"
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
        span="md:col-span-6"
      >
        <ShimmerText variant="default" duration={2} className="text-3xl md:text-4xl">
          Feel the spark
        </ShimmerText>
      </ShowcaseCard>

      <ShowcaseCard
        href="/docs/components/tactile-highlight"
        title="Tactile Highlight"
        span="md:col-span-6"
      >
        <div className="text-2xl md:text-3xl font-bold tracking-tight text-foreground text-center leading-tight">
          Build{" "}
          <TactileHighlight direction="left">
            better interfaces
          </TactileHighlight>
        </div>
      </ShowcaseCard>

    </section>
  );
}
