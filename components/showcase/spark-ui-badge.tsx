import { SITE_CONFIG } from "@/lib/constants";

export function SparkUIBadge() {
  return (
    <a href={SITE_CONFIG.url} target="_blank" rel="noopener noreferrer">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/badge-featured-dark.svg"
        alt="Featured on Spark UI"
        width={230}
        height={78}
        className="h-18 w-auto dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/badge-featured.svg"
        alt="Featured on Spark UI"
        width={230}
        height={78}
        className="hidden h-18 w-auto dark:block"
      />
    </a>
  );
}
