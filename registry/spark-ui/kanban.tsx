import { cn } from "@/lib/utils";
import * as React from "react";

function Kanban({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kanban"
      className={cn(
        "grid auto-cols-[minmax(16rem,1fr)] grid-flow-col gap-4 overflow-x-auto pb-4",
        className,
      )}
      {...props}
    />
  );
}

function KanbanColumn({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="kanban-column"
      className={cn(
        "flex min-h-80 flex-col rounded-xl border bg-muted/40 p-2 transition-colors data-[over=true]:border-ring data-[over=true]:bg-muted",
        className,
      )}
      {...props}
    />
  );
}

function KanbanColumnHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="kanban-column-header"
      className={cn("flex items-center justify-between gap-2 px-2 py-2", className)}
      {...props}
    />
  );
}

function KanbanColumnTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="kanban-column-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}

function KanbanColumnCount({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="kanban-column-count"
      className={cn(
        "inline-flex min-w-5 items-center justify-center rounded-md bg-background px-1.5 py-0.5 text-xs text-muted-foreground shadow-xs",
        className,
      )}
      {...props}
    />
  );
}

function KanbanColumnContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kanban-column-content"
      className={cn("flex flex-1 flex-col gap-2", className)}
      {...props}
    />
  );
}

function KanbanCard({
  className,
  ...props
}: React.ComponentProps<"article">) {
  return (
    <article
      data-slot="kanban-card"
      className={cn(
        "cursor-grab rounded-lg border bg-card p-3 text-card-foreground shadow-xs transition-[box-shadow,opacity] hover:shadow-sm active:cursor-grabbing data-[dragging=true]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function KanbanCardTitle({
  className,
  ...props
}: React.ComponentProps<"h4">) {
  return (
    <h4
      data-slot="kanban-card-title"
      className={cn("text-sm font-medium leading-snug", className)}
      {...props}
    />
  );
}

function KanbanCardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="kanban-card-description"
      className={cn("mt-1 text-xs leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

function KanbanCardFooter({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer
      data-slot="kanban-card-footer"
      className={cn("mt-3 flex items-center justify-between gap-2", className)}
      {...props}
    />
  );
}

export {
  Kanban,
  KanbanCard,
  KanbanCardDescription,
  KanbanCardFooter,
  KanbanCardTitle,
  KanbanColumn,
  KanbanColumnContent,
  KanbanColumnCount,
  KanbanColumnHeader,
  KanbanColumnTitle,
};
