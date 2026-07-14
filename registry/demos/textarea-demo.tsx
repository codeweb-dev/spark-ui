import { Textarea } from "@/registry/spark-ui/textarea";

export default function TextareaDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <Textarea
        placeholder="Type your message here."
        className="w-full max-w-sm"
      />
    </div>
  );
}
