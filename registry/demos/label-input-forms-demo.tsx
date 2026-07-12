"use client";

import React from "react";
import { LabelInput } from "@/registry/spark-ui/label-input";

export default function LabelInputFormsDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="space-y-4 w-full max-w-sm">
        <LabelInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          ringColor="blue"
        />
        <LabelInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          ringColor="blue"
        />
      </div>
    </div>
  );
}
