import { Button } from "@/registry/spark-ui/button";
import { ArrowRight, CircleArrowUp, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button variant="spark">Spark</Button>
    </div>
  );
}

export function ButtonDefaultDemo() {
  return <Button>Button</Button>;
}

export function ButtonOutlineDemo() {
  return <Button variant="outline">Outline</Button>;
}

export function ButtonSecondaryDemo() {
  return <Button variant="secondary">Secondary</Button>;
}

export function ButtonGhostDemo() {
  return <Button variant="ghost">Ghost</Button>;
}

export function ButtonDestructiveDemo() {
  return <Button variant="destructive">Destructive</Button>;
}

export function ButtonLinkDemo() {
  return <Button variant="link">Link</Button>;
}

export function ButtonSparkDemo() {
  return <Button variant="spark">Spark</Button>;
}

export function ButtonSizeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

export function ButtonIconDemo() {
  return (
    <Button size="icon" aria-label="Move up">
      <CircleArrowUp />
    </Button>
  );
}

export function ButtonWithIconDemo() {
  return (
    <Button>
      Continue <ArrowRight />
    </Button>
  );
}

export function ButtonRoundedDemo() {
  return (
    <Button className="rounded-full">
      Get Started <ArrowRight />
    </Button>
  );
}

export function ButtonAsLinkDemo() {
  return (
    <Button asChild>
      <Link href="/docs/installation">
        Installation <ExternalLink />
      </Link>
    </Button>
  );
}

export function ButtonDisabledDemo() {
  return <Button disabled>Disabled</Button>;
}
