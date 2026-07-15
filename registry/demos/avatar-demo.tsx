import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/spark-ui/avatar";

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
