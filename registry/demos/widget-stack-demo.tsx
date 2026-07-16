import { WidgetStack } from "@/registry/spark-ui/widget-stack";
import { CalendarDays, CloudSun, MapPin } from "lucide-react";

export default function WidgetStackDemo() {
  return (
    <WidgetStack size="medium" ariaLabel="Daily widgets">
      <article className="relative h-full bg-sky-500 text-white">
        <div
          role="img"
          aria-label="Beach at sunrise"
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/trail-3.jpg')" }}
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/65 to-transparent px-4 pb-3 pt-8">
          <p className="text-xs font-medium text-white/75">Photos</p>
          <p className="text-sm font-semibold">Beach memories</p>
        </div>
      </article>

      <article className="flex h-full items-center justify-between bg-linear-to-br from-sky-400 to-blue-700 p-4 text-white">
        <div>
          <p className="flex items-center gap-1 text-xs font-medium text-white/70">
            <MapPin className="size-3" aria-hidden /> Manila
          </p>
          <p className="mt-1 text-5xl font-light tracking-tight">28°</p>
          <p className="text-sm">Partly cloudy</p>
        </div>
        <CloudSun className="size-20 text-yellow-200" strokeWidth={1.25} />
      </article>
    </WidgetStack>
  );
}
