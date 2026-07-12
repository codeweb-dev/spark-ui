"use client";

import {
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
} from "@/registry/spark-ui/kanban";
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

  const moveTask = (id: string, status: Status) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, status } : task)),
    );
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
              <KanbanColumnCount>{columnTasks.length}</KanbanColumnCount>
            </KanbanColumnHeader>
            <KanbanColumnContent>
              {columnTasks.map((task) => (
                <KanbanCard
                  key={task.id}
                  draggable
                  data-dragging={dragging === task.id}
                  onDragStart={(event) => {
                    event.dataTransfer.setData("text/plain", task.id);
                    setDragging(task.id);
                  }}
                  onDragEnd={() => {
                    setDragging(null);
                    setOver(null);
                  }}
                >
                  <KanbanCardTitle>{task.title}</KanbanCardTitle>
                  <KanbanCardDescription>{task.description}</KanbanCardDescription>
                  <KanbanCardFooter>
                    <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{task.label}</span>
                    <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[9px] font-medium text-primary-foreground">{task.assignee}</span>
                  </KanbanCardFooter>
                </KanbanCard>
              ))}
            </KanbanColumnContent>
          </KanbanColumn>
        );
      })}
      </Kanban>
    </div>
  );
}
