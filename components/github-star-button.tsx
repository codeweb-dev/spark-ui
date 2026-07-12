import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";
import GithubIcon from "@/components/ui/github-icon";

interface GitHubLinkButtonProps {
  size?: "sm" | "md";
  className?: string;
}

// ponytail: plain link to the (placeholder) repo — add a star-count fetch once a real repo exists.
export function GitHubStarButton({
  size = "md",
  className = "",
}: GitHubLinkButtonProps) {
  return (
    <Link
      href={SITE_CONFIG.github}
      target="_blank"
      rel="noreferrer"
      aria-label={`${SITE_CONFIG.name} on GitHub`}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors ${
        size === "sm" ? "h-8 px-3 text-xs" : "h-9 px-3"
      } ${className}`}
    >
      <GithubIcon size={size === "sm" ? 14 : 16} />
      <span className="hidden sm:inline font-medium">GitHub</span>
    </Link>
  );
}
