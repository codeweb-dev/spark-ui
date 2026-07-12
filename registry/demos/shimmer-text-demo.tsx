import { ShimmerText } from "@/registry/spark-ui/shimmer-text";

export default function ShimmerTextDemo() {
  return (
    <div className="flex items-center justify-center py-12 px-6">
      <ShimmerText
        variant="default"
        duration={2}
        className="text-4xl md:text-5xl"
      >
        Build beautiful interfaces
      </ShimmerText>
    </div>
  );
}
