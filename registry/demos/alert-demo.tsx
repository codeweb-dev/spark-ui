import { Terminal } from "lucide-react";
import React from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/spark-ui/alert";

export default function AlertDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <Alert className="max-w-md">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the CLI.
        </AlertDescription>
      </Alert>
    </div>
  );
}
