import { ShimmerText } from "@/registry/spark-ui/shimmer-text";

export default function ShimmerTextVariantsDemo() {
  return (
    <div className="flex flex-col gap-6">
      <ShimmerText variant="default" className="text-xl">
        Build beautiful interfaces
      </ShimmerText>
      <ShimmerText variant="green" className="text-xl">
        Build beautiful interfaces
      </ShimmerText>
      <ShimmerText variant="purple" className="text-xl">
        Build beautiful interfaces
      </ShimmerText>
      <ShimmerText variant="red" className="text-xl">
        Build beautiful interfaces
      </ShimmerText>
    </div>
  );
}
