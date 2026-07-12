import * as cheerio from "cheerio";
import got from "got";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const trackUrl = searchParams.get("url");

  if (!trackUrl) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  try {
    const { body: html } = await got(trackUrl, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

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
  } catch (error) {
    console.error("Spotify Metadata Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch metadata" },
      { status: 500 },
    );
  }
}
