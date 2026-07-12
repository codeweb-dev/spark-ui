import React from "react";
import { Badge } from "@/registry/spark-ui/badge";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-4">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}
