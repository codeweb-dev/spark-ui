"use client";

import { Avatar, AvatarFallback } from "@/registry/spark-ui/avatar";
import { Badge } from "@/registry/spark-ui/badge";
import {
  Kanban,
  KanbanCard,
  KanbanCardDescription,
  KanbanCardFooter,
  KanbanCardTitle,
  KanbanColumn,
  KanbanColumnContent,
  KanbanColumnHeader,
  KanbanColumnTitle,
} from "@/registry/spark-ui/kanban";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { useState } from "react";

type Status = "backlog" | "progress" | "done";

type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
  label: string;
  assignee: string;
};

const initialTasks: Task[] = [
  { id: "1", title: "Improve empty states", description: "Add guidance and a primary action.", status: "backlog", label: "Design", assignee: "AK" },
  { id: "2", title: "Keyboard shortcuts", description: "Document the global command menu.", status: "backlog", label: "Docs", assignee: "MP" },
  { id: "3", title: "Billing settings", description: "Build the subscription management view.", status: "progress", label: "Feature", assignee: "JL" },
  { id: "4", title: "Accessibility audit", description: "Review focus order and contrast.", status: "done", label: "A11y", assignee: "SC" },
];

const columns: { id: Status; title: string }[] = [
  { id: "backlog", title: "Backlog" },
  { id: "progress", title: "In progress" },
  { id: "done", title: "Done" },
];

export default function KanbanDemo() {
  const [tasks, setTasks] = useState(initialTasks);
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOver] = useState<Status | null>(null);

  const moveTask = (id: string, status: Status, beforeId?: string) => {
    setTasks((current) => {
      const moving = current.find((task) => task.id === id);
      if (!moving) return current;
      if (!beforeId && moving.status === status) return current;

      const next = current.filter((task) => task.id !== id);
      const beforeIndex = beforeId
        ? next.findIndex((task) => task.id === beforeId)
        : -1;
      const lastColumnIndex = next.findLastIndex(
        (task) => task.status === status,
      );

      next.splice(
        beforeIndex >= 0 ? beforeIndex : lastColumnIndex + 1,
        0,
        { ...moving, status },
      );
      return next;
    });
  };

  return (
    <div className="w-full overflow-x-auto">
      <Kanban className="w-full min-w-200">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.id);

          return (
            <KanbanColumn
              key={column.id}
              data-over={over === column.id}
              onDragOver={(event) => {
                event.preventDefault();
                setOver(column.id);
              }}
              onDragLeave={() => setOver(null)}
              onDrop={(event) => {
                event.preventDefault();
                moveTask(event.dataTransfer.getData("text/plain"), column.id);
                setDragging(null);
                setOver(null);
              }}
            >
              <KanbanColumnHeader>
                <KanbanColumnTitle>{column.title}</KanbanColumnTitle>
                <Badge variant="secondary">{columnTasks.length}</Badge>
              </KanbanColumnHeader>
              <KanbanColumnContent>
                {columnTasks.map((task) => (
                  <motion.div
                    layout
                    key={task.id}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    onDragEnter={() => {
                      if (dragging && dragging !== task.id) {
                        moveTask(dragging, column.id, task.id);
                      }
                    }}
                  >
                    <KanbanCard
                      draggable
                      data-dragging={dragging === task.id}
                      onDragStart={(event) => {
                        event.dataTransfer.effectAllowed = "move";
                        event.dataTransfer.setData("text/plain", task.id);
                        setDragging(task.id);
                      }}
                      onDragEnd={() => {
                        setDragging(null);
                        setOver(null);
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <KanbanCardTitle>{task.title}</KanbanCardTitle>
                        <GripVertical
                          className="size-4 shrink-0 text-muted-foreground"
                          aria-hidden
                        />
                      </div>
                      <KanbanCardDescription>
                        {task.description}
                      </KanbanCardDescription>
                      <KanbanCardFooter>
                        <Badge variant="secondary">{task.label}</Badge>
                        <Avatar size="sm">
                          <AvatarFallback>{task.assignee}</AvatarFallback>
                        </Avatar>
                      </KanbanCardFooter>
                    </KanbanCard>
                  </motion.div>
                ))}
              </KanbanColumnContent>
            </KanbanColumn>
          );
        })}
      </Kanban>
    </div>
  );
}
