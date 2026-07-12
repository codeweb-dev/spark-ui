import React from "react";
import { Button } from "@/registry/spark-ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/spark-ui/hover-card";

export default function HoverCardDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@spark-ui</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-64">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Spark UI</h4>
            <p className="text-sm text-muted-foreground">
              Beautiful React components, ready to paste into your project.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
