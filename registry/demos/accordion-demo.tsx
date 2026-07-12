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
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It follows the WAI-ARIA design pattern and supports keyboard
            navigation.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It uses the same clean defaults and design tokens as
            shadcn/ui.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I customize it?</AccordionTrigger>
          <AccordionContent>
            Yes. Pass a className to any part of the component to customize it.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
