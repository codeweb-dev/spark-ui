import NumberTicker from "@/registry/spark-ui/basic-number-ticker";

export default function BasicNumberTickerDemo() {
  return (
    <div className="flex items-center justify-center">
      <span className="text-5xl sm:text-6xl font-normal text-zinc-900 dark:text-zinc-50 font-mono">
        <NumberTicker from={0} target={99} />
        <span>%</span>
      </span>
    </div>
  );
}
