import { Inbox } from "lucide-react";
import React from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/spark-ui/empty";

export default function EmptyDemo() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>No messages</EmptyTitle>
        <EmptyDescription>
          You&apos;re all caught up. New messages will show up here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
