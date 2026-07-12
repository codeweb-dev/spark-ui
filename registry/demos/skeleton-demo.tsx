import React from "react";
import { Skeleton } from "@/registry/spark-ui/skeleton";

export default function SkeletonDemo() {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-52" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
}
