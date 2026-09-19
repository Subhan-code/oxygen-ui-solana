import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import registry from "@/registry.json";
import { REGISTRY } from "@/lib/registry";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const nameParam = url.searchParams.get("name")?.trim();
  const slugParam = url.searchParams.get("slug")?.trim();
  const fileParam = url.searchParams.get("file")?.trim();

  const query = (slugParam || nameParam || "").toLowerCase();

  let targetRelativePath: string | null = null;

  if (fileParam) {
    const normalized = path.normalize(fileParam).replace(/^(\.\.[\/\\])+/, "");
    if (normalized.startsWith("components") || normalized.startsWith("lib")) {
      targetRelativePath = normalized;
    }
  }

  if (!targetRelativePath && query) {
    const registryItem = REGISTRY.find(
      (item) =>
        item.slug.toLowerCase() === query ||
        item.name.toLowerCase() === query ||
        item.title.toLowerCase() === query ||
        (item.file && item.file.toLowerCase().includes(query))
    );
    if (registryItem?.file) {
      targetRelativePath = registryItem.file;
    }
  }

  if (!targetRelativePath && query) {
    const items = registry.items || [];
    const shadcnItem = items.find(
      (entry) =>
        entry.name.toLowerCase() === query ||
        entry.title?.toLowerCase() === query
    );
    const file = shadcnItem?.files?.[0]?.path;
    if (file) {
      targetRelativePath = file;
    }
  }

  if (!targetRelativePath && query) {
    try {
      const uiDir = path.join(process.cwd(), "components", "ui");
      const files = await readdir(uiDir);
      const strippedQuery = query.replace(/[^a-z0-9]/g, "");

      const matched = files.find((f) => {
        const strippedFile = f.replace(/\.tsx?$/, "").replace(/[^a-z0-9]/g, "");
        return strippedFile === strippedQuery;
      });

      if (matched) {
        targetRelativePath = path.join("components", "ui", matched);
      }
    } catch {
      // ignore readdir errors
    }
  }

  if (!targetRelativePath) {
    return new Response("Source not found.", { status: 404 });
  }

  try {
    const fullPath = path.join(process.cwd(), targetRelativePath);
    const code = await readFile(fullPath, "utf8");
    return new Response(code, {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  } catch {
    return new Response("Source file unavailable.", { status: 404 });
  }
}
