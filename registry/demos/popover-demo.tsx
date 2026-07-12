import React from "react";
import { Button } from "@/registry/spark-ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/spark-ui/popover";

export default function PopoverDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
