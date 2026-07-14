import { Checkbox } from "@/registry/spark-ui/checkbox";

export default function CheckboxDemo() {
  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
}
