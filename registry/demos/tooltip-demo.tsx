import React from "react";
import { Button } from "@/registry/spark-ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/spark-ui/tooltip";

export default function TooltipDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
