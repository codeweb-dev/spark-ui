"use client";

import { DynamicIsland } from "@/registry/spark-ui/dynamic-island";
import {
  Bell,
  Lock,
  LockOpen,
  Music2,
  Pause,
  Phone,
  PhoneOff,
  Play,
  ScanFace,
  SkipBack,
  SkipForward,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

const examples = [
  { id: "face", label: "Face Unlock", icon: ScanFace },
  { id: "media", label: "Media", icon: Music2 },
  { id: "call", label: "Call", icon: Phone },
  { id: "notification", label: "Notification", icon: Bell },
] as const;

type Example = (typeof examples)[number]["id"];

export default function DynamicIslandExamplesDemo() {
  const [example, setExample] = useState<Example>("face");
  const [unlocked, setUnlocked] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [callState, setCallState] = useState<"incoming" | "active" | "ended">(
    "incoming",
  );
  const [notificationState, setNotificationState] = useState<
    "unread" | "read" | "dismissed"
  >("unread");

  let compact: ReactNode;
  let expanded: ReactNode;

  if (example === "face") {
    compact = (
      <span className="flex w-full items-center justify-between px-1.5">
        {unlocked ? (
          <LockOpen className="size-5 text-emerald-400" aria-hidden />
        ) : (
          <Lock className="size-5 text-white" aria-hidden />
        )}
        <span className="text-[11px] font-semibold text-white/85">
          {unlocked ? "Unlocked" : "Face ID"}
        </span>
      </span>
    );
    expanded = (
      <div className="flex h-full flex-col items-center justify-center gap-2 px-8 py-5">
        <span className="grid size-12 place-items-center rounded-full border border-cyan-400/40 bg-cyan-400/10">
          {unlocked ? (
            <LockOpen className="size-6 text-emerald-400" aria-hidden />
          ) : (
            <Lock className="size-6 text-cyan-400" aria-hidden />
          )}
        </span>
        <div className="text-center">
          <p className="text-sm font-semibold">
            {unlocked ? "Face recognized" : "Ready to scan"}
          </p>
          <p className="text-xs text-white/50">
            {unlocked ? "iPhone unlocked" : "Look at your device"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setUnlocked((value) => !value)}
          className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          {unlocked ? "Lock again" : "Unlock"}
        </button>
      </div>
    );
  } else if (example === "media") {
    compact = (
      <span className="flex w-full items-center justify-between px-1.5">
        <span className="grid size-6 place-items-center rounded-full bg-linear-to-br from-orange-400 via-rose-500 to-violet-600">
          <Music2 className="size-3.5 text-white" aria-hidden />
        </span>
        <span className="text-[11px] font-semibold text-white/85">
          {playing ? "Playing" : "Paused"}
        </span>
      </span>
    );
    expanded = (
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex items-center gap-3">
          <span className="size-14 rounded-2xl bg-linear-to-br from-orange-400 via-rose-500 to-violet-600" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">
              Midnight City
            </span>
            <span className="block text-xs text-white/50">Neon Avenue</span>
          </span>
        </div>
        <div className="flex items-center justify-center gap-7">
          <button
            type="button"
            aria-label="Previous track"
            className="rounded-full p-2 text-white/70 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-white"
          >
            <SkipBack className="size-5 fill-current" />
          </button>
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((value) => !value)}
            className="rounded-full bg-white p-2.5 text-black outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            {playing ? (
              <Pause className="size-5 fill-current" />
            ) : (
              <Play className="size-5 fill-current" />
            )}
          </button>
          <button
            type="button"
            aria-label="Next track"
            className="rounded-full p-2 text-white/70 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-white"
          >
            <SkipForward className="size-5 fill-current" />
          </button>
        </div>
      </div>
    );
  } else if (example === "call") {
    compact = (
      <span className="flex w-full items-center justify-between px-1.5">
        <span
          className={`grid size-6 place-items-center rounded-full ${
            callState === "ended" ? "bg-red-500" : "bg-emerald-500"
          }`}
        >
          {callState === "ended" ? (
            <PhoneOff className="size-3.5 text-white" aria-hidden />
          ) : (
            <Phone className="size-3.5 fill-white text-white" aria-hidden />
          )}
        </span>
        <span className="text-[11px] font-semibold text-white/85">
          {callState === "incoming"
            ? "Incoming"
            : callState === "active"
              ? "00:12"
              : "Ended"}
        </span>
      </span>
    );
    expanded = (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-linear-to-br from-violet-400 to-fuchsia-600 text-sm font-bold">
            MC
          </span>
          <span>
            <span className="block text-sm font-semibold">Maya Chen</span>
            <span className="block text-xs text-white/50">
              {callState === "incoming"
                ? "Incoming call"
                : callState === "active"
                  ? "Connected · 00:12"
                  : "Call ended"}
            </span>
          </span>
        </div>
        <div className="flex gap-5">
          {callState === "incoming" ? (
            <>
              <button
                type="button"
                onClick={() => setCallState("ended")}
                className="rounded-full bg-red-500 p-3 outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                aria-label="Decline call"
              >
                <PhoneOff className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setCallState("active")}
                className="rounded-full bg-emerald-500 p-3 outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                aria-label="Accept call"
              >
                <Phone className="size-5 fill-current" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() =>
                setCallState(callState === "active" ? "ended" : "incoming")
              }
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              {callState === "active" ? "End call" : "Call again"}
            </button>
          )}
        </div>
      </div>
    );
  } else {
    compact = (
      <span className="flex w-full items-center justify-between px-1.5">
        <span className="grid size-6 place-items-center rounded-full bg-amber-400">
          <Bell className="size-3.5 fill-black text-black" aria-hidden />
        </span>
        <span className="text-[11px] font-semibold text-white/85">
          {notificationState === "unread"
            ? "1 new"
            : notificationState === "read"
              ? "Read"
              : "Clear"}
        </span>
      </span>
    );
    expanded = (
      <div className="flex h-full flex-col justify-center gap-3 p-5 text-left">
        {notificationState === "dismissed" ? (
          <>
            <p className="text-center text-sm font-semibold">
              You&apos;re all caught up
            </p>
            <button
              type="button"
              onClick={() => setNotificationState("unread")}
              className="mx-auto rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Reset notification
            </button>
          </>
        ) : (
          <>
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blue-500 text-xs font-bold">
                N
              </span>
              <span>
                <span className="block text-sm font-semibold">Nina</span>
                <span className="block text-xs leading-relaxed text-white/60">
                  Are we still on for dinner tonight?
                </span>
              </span>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setNotificationState("dismissed")}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => setNotificationState("read")}
                className="rounded-full bg-blue-500 px-3 py-1.5 text-xs font-semibold outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                Mark read
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-10 py-4">
      <DynamicIsland
        key={example}
        compact={compact}
        expanded={expanded}
        expandLabel={`Open ${examples.find((item) => item.id === example)?.label}`}
      />

      <div className="flex flex-wrap justify-center gap-2">
        {examples.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            aria-pressed={example === id}
            onClick={() => setExample(id)}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-ring ${
              example === id
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="size-3.5" aria-hidden />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
