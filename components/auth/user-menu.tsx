"use client";

import { SignInDialog } from "@/components/auth/sign-in-dialog";
import { createClient } from "@/lib/supabase/client";
import { isBackendEnabled } from "@/lib/supabase/config";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { User } from "@supabase/supabase-js";
import { LogOut, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const itemClass =
  "flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground";

export function UserMenu() {
  if (!isBackendEnabled()) return null;
  return <UserMenuInner />;
}

function UserMenuInner() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null),
    );
    return () => subscription.unsubscribe();
  }, []);

  if (!user) return <SignInDialog />;

  const name =
    user.user_metadata.user_name ??
    user.user_metadata.preferred_username ??
    user.user_metadata.name ??
    user.email ??
    "GitHub user";
  const avatarUrl = user.user_metadata.avatar_url as string | undefined;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Account menu"
          className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="size-9.5 rounded-full border"
            />
          ) : (
            <span className="flex size-9.5 items-center justify-center rounded-full border bg-muted text-sm font-medium">
              {name[0]?.toUpperCase()}
            </span>
          )}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-101 min-w-48 rounded-xl border bg-popover p-1 text-popover-foreground shadow-md"
        >
          <div className="px-3 py-2">
            <p className="text-sm font-medium">{name}</p>
            {user.email && (
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
          <DropdownMenu.Separator className="my-1 h-px bg-border" />
          <DropdownMenu.Item asChild className={itemClass}>
            <Link href="/favorites">
              <Star className="size-4" aria-hidden />
              Favorites
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={itemClass}
            onSelect={() => createClient().auth.signOut()}
          >
            <LogOut className="size-4" aria-hidden />
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
