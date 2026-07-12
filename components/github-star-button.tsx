"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import GithubIcon from "./ui/github-icon";

interface GitHubStarButtonProps {
  size?: "sm" | "md";
  className?: string;
}

export function GitHubStarButton({
  size = "md",
  className = "",
}: GitHubStarButtonProps) {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/codeweb-dev/spark-ui",
        );
        if (response.ok) {
          const data = await response.json();
          setStars(data.stargazers_count);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStars();
  }, []);

  const formatStars = (count: number): string => {
    return count.toLocaleString();
  };

  if (loading || stars === null) {
    return (
      <Link
        href="https://github.com/codeweb-dev/spark-ui"
        target="_blank"
        className={`inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md border border-input bg-background text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors ${
          size === "sm" ? "h-8 px-3 text-xs" : ""
        } ${className}`}
      >
        <GithubIcon size={size === "sm" ? 14 : 16} />
        <span className="h-4 w-8 animate-pulse rounded bg-muted"></span>
      </Link>
    );
  }

  return (
    <Link
      href="https://github.com/codeweb-dev/spark-ui"
      target="_blank"
      className={`inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md border border-input bg-background text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors ${
        size === "sm" ? "h-8 px-3 text-xs" : ""
      } ${className}`}
    >
      <GithubIcon size={size === "sm" ? 14 : 16} />
      <span className="font-medium">{formatStars(stars)}</span>
    </Link>
  );
}
