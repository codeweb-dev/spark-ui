import { AnimatedGradient } from "@/registry/spark-ui/animated-gradient";

export default function AnimatedGradientDemo() {
  return (
    <AnimatedGradient
      variant="mist"
      speed={0.6}
      opacity={0.8}
      className="h-96 w-full"
    >
      <div className="flex flex-col items-center justify-center gap-1.5 w-full h-full select-none pointer-events-none">
        <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans drop-shadow-md">
          Animated
        </span>
        <span className="text-xl sm:text-2xl text-zinc-400 font-medium font-serif italic drop-shadow-sm">
          Gradient
        </span>
      </div>
    </AnimatedGradient>
  );
}
