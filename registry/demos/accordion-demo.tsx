import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/spark-ui/accordion";

export default function AccordionDemo() {
  return (
    <div className="w-87.5 sm:w-112.5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It uses Framer Motion for smooth, spring-based transitions and
            magnetic text effects on hover.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It is built on top of Radix UI accessible primitives,
            supporting keyboard navigation and screen readers.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I customize it?</AccordionTrigger>
          <AccordionContent>
            Absolutely. The component is built with Tailwind CSS and Framer
            Motion, making it easy to tweak colors, animations, and layouts.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
