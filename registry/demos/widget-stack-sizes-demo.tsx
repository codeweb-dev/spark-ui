import { WidgetStack } from "@/registry/spark-ui/widget-stack";
import { BatteryCharging, CloudSun, Sun } from "lucide-react";

function CalendarWidget() {
  return (
    <article className="h-full bg-zinc-50 p-4 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50">
      <p className="text-xs font-bold uppercase text-red-500">July</p>
      <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-[7px]">
        {"SMTWTFS".split("").map((day, index) => (
          <span key={`${day}-${index}`} className="font-semibold text-zinc-50">
            {day}
          </span>
        ))}
        {Array.from({ length: 31 }, (_, index) => (
          <span
            key={index}
            className={
              index === 3
                ? "mx-auto grid size-4 place-items-center rounded-full bg-red-500 text-white"
                : "grid size-4 place-items-center"
            }
          >
            {index + 1}
          </span>
        ))}
      </div>
    </article>
  );
}

function WeatherWidget() {
  return (
    <article className="flex h-full flex-col justify-between bg-linear-to-br from-sky-400 to-blue-700 p-4 text-white">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium">Manila</p>
        <CloudSun className="size-8 text-yellow-200" aria-hidden />
      </div>
      <div>
        <p className="text-5xl font-light tracking-tight">28°</p>
        <p className="text-xs text-white/75">Partly cloudy</p>
      </div>
    </article>
  );
}

function BatteryWidget() {
  return (
    <article className="flex h-full flex-col justify-between bg-emerald-500 p-4 text-white">
      <BatteryCharging className="size-8" aria-hidden />
      <div>
        <p className="text-4xl font-light">82%</p>
        <p className="text-xs text-white/75">Device</p>
      </div>
    </article>
  );
}

export default function WidgetStackSizesDemo() {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-8 overflow-x-auto px-6 py-4">
      <WidgetStack size="medium" ariaLabel="Featured widgets">
        <article className="relative h-full bg-sky-500 text-white">
          <div
            role="img"
            aria-label="Green mountains at sunrise"
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/images/trail-2.jpg')" }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent px-4 pb-3 pt-8">
            <p className="text-sm font-semibold">Photos</p>
          </div>
        </article>
        <article className="flex h-full items-center justify-between bg-linear-to-br from-orange-300 to-rose-500 p-4 text-white">
          <div>
            <p className="text-sm font-semibold">Good afternoon</p>
            <p className="mt-1 text-xs text-white/75">UV index is moderate</p>
          </div>
          <Sun className="size-20 text-yellow-100" strokeWidth={1.25} />
        </article>
      </WidgetStack>

      <WidgetStack size="small" ariaLabel="Calendar stack">
        <CalendarWidget />
        <WeatherWidget />
        <BatteryWidget />
      </WidgetStack>
    </div>
  );
}
