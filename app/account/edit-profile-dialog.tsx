"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import TwitterXIcon from "@/components/ui/twitter-x-icon";
import { createClient } from "@/lib/supabase/client";
import {
  Facebook,
  Instagram,
  Link as LinkIcon,
  Linkedin,
  Youtube,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const PLATFORMS = [
  { key: "x", label: "X", icon: TwitterXIcon },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "tiktok", label: "TikTok", icon: LinkIcon },
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "youtube", label: "YouTube", icon: Youtube },
  { key: "instagram", label: "Instagram", icon: Instagram },
] as const;

export type Platform = (typeof PLATFORMS)[number]["key"];

export function EditProfileDialog({
  initialBio,
  initialLinks,
}: {
  initialBio: string;
  initialLinks: Partial<Record<Platform, string>>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [bio, setBio] = useState(initialBio);
  const [links, setLinks] = useState(initialLinks);

  const save = async () => {
    const invalid = PLATFORMS.filter(({ key }) => {
      const url = links[key]?.trim();
      return url && !/^https:\/\//.test(url);
    });
    if (invalid.length > 0) {
      toast.error("Links must start with https://", {
        description: invalid.map((p) => p.label).join(", "),
      });
      return;
    }

    setBusy(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const results = await Promise.all([
      supabase
        .from("profiles")
        .update({ bio: bio.trim() || null })
        .eq("id", user.id),
      ...PLATFORMS.map(({ key }) => {
        const url = links[key]?.trim();
        return url
          ? supabase
              .from("profile_links")
              .upsert(
                { user_id: user.id, platform: key, url },
                { onConflict: "user_id,platform" },
              )
          : supabase
              .from("profile_links")
              .delete()
              .eq("user_id", user.id)
              .eq("platform", key);
      }),
    ]);
    setBusy(false);

    if (results.some((result) => result.error)) {
      toast.error("Couldn't save your profile", {
        description: "Something went wrong. Please try again.",
      });
      return;
    }

    toast.success("Profile updated");
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="shrink-0 self-start sm:self-center"
        >
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Add a short bio and your social links.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label htmlFor="bio" className="text-sm font-medium">
              Bio
            </label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              maxLength={160}
              rows={3}
              placeholder="Tell people about yourself"
              className="mt-1.5 resize-none"
            />
            <p className="mt-1 text-right text-xs text-muted-foreground">
              {bio.length}/160
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {PLATFORMS.map(({ key, label, icon: Icon }) => (
              <div key={key}>
                <label htmlFor={`link-${key}`} className="text-sm font-medium">
                  {label}
                </label>
                <InputGroup className="mt-1.5">
                  <InputGroupAddon>
                    <Icon size={16} />
                  </InputGroupAddon>
                  <InputGroupInput
                    id={`link-${key}`}
                    type="url"
                    value={links[key] ?? ""}
                    onChange={(event) =>
                      setLinks((prev) => ({
                        ...prev,
                        [key]: event.target.value,
                      }))
                    }
                    placeholder="https://"
                  />
                </InputGroup>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={busy}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={save} disabled={busy}>
            {busy ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
