"use client";

import React from "react";
import { Progress } from "@/registry/spark-ui/progress";

export default function ProgressDemo() {
  const [value, setValue] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setValue(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex w-full items-center justify-center p-4">
      <Progress value={value} className="w-full max-w-sm" />
    </div>
  );
}
