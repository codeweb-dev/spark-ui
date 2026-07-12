import { SpotifyCard } from "@/registry/spark-ui/spotify/spotify-card";

export default function SpotifyCardDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <SpotifyCard trackUrl="https://open.spotify.com/track/7EW7Yivb93qKAtp5qEm5of?si=b6de0dafaeaa4bfb" />
    </div>
  );
}
