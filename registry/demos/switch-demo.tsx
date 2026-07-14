import { Switch } from "@/registry/spark-ui/switch";

export default function SwitchDemo() {
  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode" className="text-sm font-medium">
        Airplane mode
      </label>
    </div>
  );
}
