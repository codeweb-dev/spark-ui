"use client";

import { Badge } from "@/registry/spark-ui/badge";
import { Button } from "@/registry/spark-ui/button";
import { Input } from "@/registry/spark-ui/input";
import { Progress } from "@/registry/spark-ui/progress";
import { QRCode } from "@/registry/spark-ui/qr-code";
import { SITE_CONFIG } from "@/lib/constants";
import { Switch } from "@/registry/spark-ui/switch";
import { Textarea } from "@/registry/spark-ui/textarea";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CircleHelp,
  FileText,
  MessageCircle,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

function BentoCard({
  href,
  title,
  className = "",
  children,
}: {
  href: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      className={`relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-sm ${className}`}
    >
      <Link
        href={href}
        className="mb-6 inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {title}
      </Link>
      {children}
    </article>
  );
}

const bars = [48, 76, 58, 80, 44];

export function Showcase() {
  return (
    <section
      aria-label="Component showcase"
      className="grid auto-rows-[minmax(12rem,auto)] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
    >
      <BentoCard
        href="/docs/components/button"
        title="Component kit"
        className="min-h-110"
      >
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Button size="sm">
              Button <ArrowRight className="size-3.5" />
            </Button>
            <Button size="sm" variant="secondary">Secondary</Button>
            <Button size="sm" variant="outline">Outline</Button>
          </div>
          <Input placeholder="Name" />
          <Textarea placeholder="Message" className="min-h-24 resize-none" />
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Switch defaultChecked aria-label="Example switch" className="ml-auto" />
          </div>
          <div className="flex gap-2 border-t pt-5">
            <Button size="sm" variant="outline">Alert Dialog</Button>
            <Button size="sm" variant="outline" className="ml-auto">Button Group</Button>
          </div>
        </div>
      </BentoCard>

      <BentoCard
        href="/docs/components/basic-number-ticker"
        title="Contribution history"
        className="min-h-150 xl:row-span-2"
      >
        <p className="-mt-5 text-sm text-muted-foreground">Last 5 months of activity</p>
        <div className="mt-10 flex h-52 items-end gap-3">
          {bars.map((height, index) => (
            <div key={height} className="flex flex-1 flex-col items-center gap-3">
              <div
                className={`w-full rounded-xl ${index === 0 ? "bg-foreground" : "bg-muted-foreground/40"}`}
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-muted-foreground">
                {['Dec', 'Jan', 'Feb', 'Mar', 'Apr'][index]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-muted p-4">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Upcoming</p>
            <p className="mt-2 font-medium">May 2026</p>
          </div>
          <div className="rounded-2xl bg-muted p-4">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Plan</p>
            <p className="mt-2 font-medium">Accelerated</p>
          </div>
        </div>
        <Button className="mt-4 w-full" variant="secondary">View full report</Button>
      </BentoCard>

      <BentoCard
        href="/docs/components/input"
        title="Set a new milestone"
        className="min-h-125"
      >
        <p className="-mt-5 mb-7 text-sm leading-relaxed text-muted-foreground">
          Define your target and track progress toward it.
        </p>
        <div className="space-y-5">
          <label className="block space-y-2 text-sm font-medium">
            Goal name
            <Input placeholder="e.g. New car" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-2 text-sm font-medium">
              Amount
              <Input defaultValue="$15,000" />
            </label>
            <label className="block space-y-2 text-sm font-medium">
              Date
              <Input defaultValue="Dec 2026" />
            </label>
          </div>
          <Button className="w-full">Create goal</Button>
          <Button className="w-full" variant="outline">Cancel</Button>
        </div>
      </BentoCard>

      <BentoCard
        href="/docs/components/qr-code"
        title="Connect a device"
        className="flex min-h-125 flex-col items-center text-center"
      >
        <div className="rounded-2xl bg-white p-4">
          <QRCode value={SITE_CONFIG.url} size={180} fgColor="#000" bgColor="#fff" />
        </div>
        <h3 className="mt-7 text-base font-medium">Scan to connect</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Open the mobile app and scan this code to link your device.
        </p>
      </BentoCard>

      <BentoCard href="/docs/components/progress" title="Payout threshold" className="min-h-88">
        <p className="-mt-5 text-sm text-muted-foreground">Minimum balance required before payout.</p>
        <div className="mt-8 flex items-end justify-between">
          <span className="text-sm font-medium">Current amount</span>
          <strong className="text-2xl tracking-tight">$2,500</strong>
        </div>
        <Progress value={38} className="mt-5 h-2" />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>$50 min</span><span>$10,000 max</span>
        </div>
      </BentoCard>

      <BentoCard href="/docs/components/card" title="Quick links" className="min-h-88">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            [FileText, 'Documents'],
            [WalletCards, 'Billing'],
            [BarChart3, 'Analytics'],
            [CalendarDays, 'Calendar'],
            [CircleHelp, 'Help center'],
            [MessageCircle, 'Contact'],
          ].map(([Icon, label]) => (
            <div key={label as string} className="flex items-center gap-2 rounded-xl p-3 hover:bg-muted">
              <Icon className="size-4 text-muted-foreground" />
              <span>{label as string}</span>
            </div>
          ))}
        </div>
      </BentoCard>

      <BentoCard href="/docs/components/card" title="Claimable balance" className="min-h-88">
        <div className="text-4xl font-semibold tracking-tight">$1,211.29</div>
        <Badge variant="outline" className="mt-3">Pending setup</Badge>
        <div className="mt-6 rounded-2xl bg-muted p-4 text-sm">
          <div className="flex justify-between text-muted-foreground"><span>Net royalties</span><span>$1,248.75</span></div>
          <div className="mt-3 flex justify-between"><span>Processing fee</span><span>-$37.46</span></div>
        </div>
      </BentoCard>
    </section>
  );
}
