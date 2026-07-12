"use client";

import React from "react";
import { LabelInput } from "@/registry/spark-ui/label-input";

export default function LabelInputColorsDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <LabelInput label="Blue" ringColor="blue" />
        <LabelInput label="Purple" ringColor="purple" />
        <LabelInput label="Pink" ringColor="pink" />
        <LabelInput label="Green" ringColor="green" />
        <LabelInput label="Orange" ringColor="orange" />
        <LabelInput label="Rose" ringColor="rose" />
      </div>
    </div>
  );
}
