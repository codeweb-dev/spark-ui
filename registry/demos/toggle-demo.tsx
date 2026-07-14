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
