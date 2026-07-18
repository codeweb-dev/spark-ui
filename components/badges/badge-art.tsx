import { Medal } from "lucide-react";
import Image from "next/image";

export function BadgeArt({
  imageUrl,
  size,
}: {
  imageUrl?: string | null;
  size: number;
}) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt=""
        width={size}
        height={size}
        className="shrink-0"
      />
    );
  }
  return (
    <Medal
      className="shrink-0 text-muted-foreground"
      style={{ width: size, height: size }}
      aria-hidden
    />
  );
}
