import React from "react";
import { Separator } from "@/registry/spark-ui/separator";

export default function SeparatorDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-xs">
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Spark UI</h4>
          <p className="text-sm text-muted-foreground">
            Beautiful React components.
          </p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center gap-4 text-sm">
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Showcase</span>
          <Separator orientation="vertical" />
          <span>GitHub</span>
        </div>
      </div>
    </div>
  );
}
