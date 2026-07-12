import React from "react";
import { RichButton } from "@/registry/spark-ui/rich-button";

export default function RichButtonDemo() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4">
      <RichButton color="default">Default</RichButton>
      <RichButton color="blue">Primary</RichButton>
      <RichButton color="purple">Purple</RichButton>
      <RichButton color="emerald">Success</RichButton>
      <RichButton color="rose">Warning</RichButton>
      <RichButton color="amber">Caution</RichButton>
    </div>
  );
}
