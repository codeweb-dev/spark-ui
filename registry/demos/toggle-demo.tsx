import { Bold } from "lucide-react";
import { Toggle } from "@/registry/spark-ui/toggle";

export default function ToggleDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
    </div>
  );
}

export function ToggleOutlineDemo() {
  return (
    <Toggle variant="outline" aria-label="Toggle bold">
      <Bold />
    </Toggle>
  );
}

export function ToggleWithTextDemo() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold /> Bold
    </Toggle>
  );
}

export function ToggleSizeDemo() {
  return (
    <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Toggle bold small"><Bold /></Toggle>
      <Toggle aria-label="Toggle bold"><Bold /></Toggle>
      <Toggle size="lg" aria-label="Toggle bold large"><Bold /></Toggle>
    </div>
  );
}

export function ToggleDisabledDemo() {
  return (
    <Toggle disabled aria-label="Toggle bold">
      <Bold />
    </Toggle>
  );
}
