import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/spark-ui/card";

export default function CardDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Project Alpha</CardTitle>
          <CardDescription>Deployed 2 hours ago</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            All checks passing. Latest build compiled in 3.2s with zero
            warnings.
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">main · a1b2c3d</p>
        </CardFooter>
      </Card>
    </div>
  );
}
