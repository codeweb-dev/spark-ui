import * as cheerio from "cheerio";
import got from "got";
import { NextRequest, NextResponse } from "next/server";

// SSRF guard: the outbound request destination is always built server-side
// from a validated Spotify track ID — never from a caller-supplied URL.
const TRACK_ID_RE = /^[A-Za-z0-9]{1,64}$/;
const MAX_RESPONSE_BYTES = 1_000_000;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const trackId = searchParams.get("trackId") ?? "";

  if (!TRACK_ID_RE.test(trackId)) {
    return NextResponse.json({ error: "Invalid track ID" }, { status: 400 });
  }

  try {
    const request = got(`https://open.spotify.com/track/${trackId}`, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; SparkUI-SpotifyCard/1.0)",
        accept: "text/html",
      },
      followRedirect: false,
      retry: { limit: 0 },
      timeout: { request: 5000 },
    });
    request.on("downloadProgress", ({ transferred }) => {
      if (transferred > MAX_RESPONSE_BYTES) request.cancel();
    });
    const { headers, body: html } = await request;

    if (!headers["content-type"]?.includes("text/html")) {
      return NextResponse.json(
        { error: "Failed to fetch metadata" },
        { status: 502 },
      );
    }

    const $ = cheerio.load(html);

    const title =
      $('meta[property="og:title"]').attr("content") || "Unknown Track";
    const image = $('meta[property="og:image"]').attr("content") || "";
    const previewUrl =
      $('meta[property="og:audio"]').attr("content") ||
      $('meta[name="twitter:audio:src"]').attr("content") ||
      "";

    // Spotify's og:description is often: "Artist · Album · Song · Year"
    const description =
      $('meta[property="og:description"]').attr("content") || "";
    // Usually the first part is the Artist
    const artist = description.split("·")[0]?.trim() || "Unknown Artist";

    return NextResponse.json({
      title,
      artist,
      albumArt: image,
      previewUrl,
    });
  } catch {
    // Non-2xx, redirect attempt, timeout, or oversized response. Keep the
    // client response generic — no upstream details.
    return NextResponse.json(
      { error: "Failed to fetch metadata" },
      { status: 502 },
    );
  }
}
