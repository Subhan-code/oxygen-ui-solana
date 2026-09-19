import { REGISTRY_REPO } from "@/lib/components";

export async function fetchStarCount() {
  try {
    const res = await fetch(`https://api.github.com/repos/${REGISTRY_REPO}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.includes("application/json")) return null;
    const data = await res.json();
    return (data.stargazers_count as number) ?? null;
  } catch {
    return null;
  }
}
