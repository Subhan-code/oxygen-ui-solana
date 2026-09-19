export const SOURCE_LOADING = "// Loading…";
export const SOURCE_ERROR = "// Unable to load source.";

export async function fetchSource(nameOrSlug?: string, filePath?: string) {
  try {
    const params = new URLSearchParams();
    if (filePath) params.set("file", filePath);
    if (nameOrSlug) params.set("name", nameOrSlug);
    const res = await fetch(`/api/source?${params.toString()}`);
    return res.ok ? await res.text() : SOURCE_ERROR;
  } catch {
    return SOURCE_ERROR;
  }
}
