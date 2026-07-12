"use client";

import { useRef } from "react";
import NumberTicker, { NumberTickerRef } from "@/registry/spark-ui/basic-number-ticker";
import { RotateCcw } from "lucide-react";

export default function BasicNumberTickerVariantsDemo() {
  const tickerRef = useRef<NumberTickerRef>(null);

  const handleRestart = () => {
    tickerRef.current?.startAnimation();
  };

  return (
    <div className="w-full max-w-2xl px-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/30 dark:bg-zinc-900/5 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 dark:divide-zinc-800">
        
        {/* Metric 1: Avg. Latency */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
              Avg. Latency
            </span>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-400 mt-0.5">
              1.2s linear transition
            </p>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-normal text-zinc-900 dark:text-zinc-50 font-mono tracking-tight">
              <NumberTicker
                from={10}
                target={124}
                transition={{ duration: 1.2, ease: "linear" }}
              />
              <span className="text-zinc-400 dark:text-zinc-400 text-lg ml-0.5">ms</span>
            </span>
          </div>
        </div>

        {/* Metric 2: Uptime */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
              Uptime Guarantee
            </span>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-400 mt-0.5">
              2.5s easeOut transition
            </p>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-normal text-zinc-900 dark:text-zinc-50 font-mono tracking-tight">
              <NumberTicker
                from={90}
                target={99.9}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />
              <span className="text-zinc-400 dark:text-zinc-400 text-lg ml-0.5">%</span>
            </span>
          </div>
        </div>

        {/* Metric 3: Deployments */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
              Deployments
            </span>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-400 mt-0.5">
              Manual trigger
            </p>
          </div>
          <div className="mt-4 flex flex-col items-start">
            <span className="text-3xl font-normal text-zinc-900 dark:text-zinc-50 font-mono tracking-tight">
              +<NumberTicker
                ref={tickerRef}
                from={0}
                target={156}
                autoStart={false}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </span>
            <button
              onClick={handleRestart}
              className="mt-2 flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors active:scale-95 cursor-pointer"
            >
              <RotateCcw size={10} />
              Re-animate
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
