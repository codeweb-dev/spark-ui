"use client";

import { createClient } from "@/lib/supabase/client";
import {
  BadgeCheck,
  Heart,
  LayoutDashboard,
  LogOut,
  Medal,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard },
  { href: "/account/favorites", label: "Favorites", icon: Heart },
  { href: "/account/badges", label: "Badges", icon: BadgeCheck },
  { href: "/account/achievements", label: "Achievements", icon: Medal },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

const itemClass =
  "flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors";

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="-mb-px flex overflow-x-auto">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`${itemClass} ${
              active
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </Link>
        );
      })}
      <button
        type="button"
        onClick={async () => {
          await createClient().auth.signOut();
          window.location.href = "/";
        }}
        className={`${itemClass} ml-auto cursor-pointer border-transparent text-muted-foreground hover:text-foreground`}
      >
        <LogOut className="size-4" aria-hidden />
        Sign out
      </button>
    </nav>
  );
}
