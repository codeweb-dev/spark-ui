import { cn } from "@/lib/utils";
import type * as React from "react";

export interface ReceiptProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  ticketId: string;
  amount: string;
  dateTime: string;
  cardholder: string;
  cardLastFour: string;
  barcodeValue?: string;
  successIcon?: React.ReactNode;
}

export function Receipt({
  title = "Thank you!",
  description = "Your ticket has been issued successfully",
  ticketId,
  amount,
  dateTime,
  cardholder,
  cardLastFour,
  barcodeValue = ticketId,
  successIcon = "🎉",
  className,
  ...props
}: ReceiptProps) {
  return (
    <article
      className={cn(
        "relative w-full max-w-sm overflow-hidden rounded-3xl bg-zinc-100 text-card-foreground dark:bg-card",
        className,
      )}
      {...props}
    >
      <div className="px-6 pb-6 pt-7 text-center sm:px-8">
        <div className="text-4xl" aria-hidden>
          {successIcon}
        </div>
        <h2 className="mt-4 text-xl font-bold tracking-tight">{title}</h2>
        <p className="mx-auto mt-1.5 max-w-56 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="relative px-6 sm:px-8">
        <span className="absolute -left-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-background" />
        <span className="absolute -right-3 top-1/2 size-6 -translate-y-1/2 rounded-full bg-background" />
        <div className="border-t border-dashed border-border" />
      </div>

      <div className="space-y-5 px-6 py-6 sm:px-8">
        <div className="grid grid-cols-[1fr_auto] gap-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Ticket ID
            </p>
            <p className="mt-1 font-semibold tabular-nums">{ticketId}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Amount
            </p>
            <p className="mt-1 font-semibold tabular-nums">{amount}</p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Date &amp; Time
          </p>
          <time className="mt-1 block font-semibold">{dateTime}</time>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-background/80 p-3.5 dark:bg-muted/60">
          <div className="relative h-7 w-10 shrink-0" aria-label="Mastercard">
            <span className="absolute left-0 top-1 size-6 rounded-full bg-red-500" />
            <span className="absolute right-0 top-1 size-6 rounded-full bg-amber-400/90" />
          </div>
          <div>
            <p className="font-semibold">{cardholder}</p>
            <p className="text-sm tabular-nums text-muted-foreground">
              •••• {cardLastFour}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-dashed border-border px-6 pb-10 pt-6 sm:px-8">
        <div
          className="h-16 w-full text-foreground"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg,currentColor 0 2px,transparent 2px 5px,currentColor 5px 6px,transparent 6px 10px)",
          }}
          aria-hidden
        />
        <p className="mt-2 text-center font-mono text-[11px] tracking-[0.3em] text-muted-foreground">
          {barcodeValue}
        </p>
      </div>

      <div className="absolute inset-x-2 bottom-0 flex justify-around" aria-hidden>
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className="size-6 translate-y-1/2 rounded-full bg-background"
          />
        ))}
      </div>
    </article>
  );
}
