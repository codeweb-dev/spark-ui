import {
  Flame,
  Heart,
  Keyboard,
  type LucideIcon,
  Rocket,
  Sunrise,
  Trophy,
} from "lucide-react";

export const metadata = {
  title: "Achievements",
  description: "Track your Spark UI achievements.",
};

// ponytail: static example data — swap for real tracking when it exists.
const EXAMPLES: {
  icon: LucideIcon;
  title: string;
  description: string;
  progress: number;
  goal: number;
}[] = [
  {
    icon: Heart,
    title: "First Favorite",
    description: "Save your first component.",
    progress: 1,
    goal: 1,
  },
  {
    icon: Flame,
    title: "Collector",
    description: "Save 10 components to your favorites.",
    progress: 4,
    goal: 10,
  },
  {
    icon: Keyboard,
    title: "Speed Demon",
    description: "Hit 100 WPM in the type test.",
    progress: 72,
    goal: 100,
  },
  {
    icon: Trophy,
    title: "Podium Finish",
    description: "Reach the Keyboard Warrior top 3.",
    progress: 0,
    goal: 1,
  },
  {
    icon: Sunrise,
    title: "Early Bird",
    description: "Join Spark UI in its first year.",
    progress: 1,
    goal: 1,
  },
  {
    icon: Rocket,
    title: "Show Off",
    description: "Get a project featured in the showcase.",
    progress: 0,
    goal: 1,
  },
];

export default function AchievementsPage() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Achievements
        </h1>
        <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          Preview
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        A preview of the milestones you&apos;ll unlock — progress tracking is
        coming soon.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {EXAMPLES.map(({ icon: Icon, title, description, progress, goal }) => {
          const done = progress >= goal;
          return (
            <div
              key={title}
              className={`rounded-2xl border bg-card p-5 transition-colors hover:border-foreground/20 ${
                done ? "" : "opacity-80"
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon className="size-8" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold tracking-tight">{title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {progress}/{goal}
                </span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full ${
                    done ? "bg-emerald-500" : "bg-primary"
                  }`}
                  style={{
                    width: `${Math.min(100, (progress / goal) * 100)}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
