import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { getCategoryMeta } from "./categories";

const DOCS_PATH = path.join(process.cwd(), "content/docs");

export interface DocMetadata {
  title: string;
  description?: string;
  slug: string;
  category?: string;
}

export interface DocContent extends DocMetadata {
  content: string;
}

export function getDocSlugs(dir: string = DOCS_PATH): string[] {
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir, { recursive: true }) as string[];
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, "").replace(/\\/g, "/"));
}

export function getDocBySlug(slug: string[]): DocContent | null {
  const fullPath = path.join(DOCS_PATH, ...slug) + ".mdx";

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: slug.join("/"),
    title: data.title || "Untitled",
    description: data.description || "",
    category: data.category || "General",
    content,
  };
}

export function getAllDocs(): DocMetadata[] {
  const slugs = getDocSlugs();
  const docs = slugs.map((slug) => {
    const fullPath = path.join(DOCS_PATH, slug) + ".mdx";
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title || "Untitled",
      description: data.description || "",
      category: data.category || "General",
    };
  });

  return docs.sort((a, b) => {
    const orderA = getCategoryMeta(a.category).order;
    const orderB = getCategoryMeta(b.category).order;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.title.localeCompare(b.title);
  });
}

export function getAdjacentDocs(currentSlug: string): { 
  prev: DocMetadata | null; 
  next: DocMetadata | null; 
} {
  const allDocs = getAllDocs();
  const currentIndex = allDocs.findIndex((doc) => doc.slug === currentSlug);

  return {
    prev: currentIndex > 0 ? allDocs[currentIndex - 1] : null,
    next: currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null,
  };
}
