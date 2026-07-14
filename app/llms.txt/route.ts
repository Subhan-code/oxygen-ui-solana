import {
  components,
  installCommand,
  REGISTRY_HOMEPAGE,
} from "@/lib/components";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const componentSections = components.map((item) => {
    const lines = [
      `### ${item.name}`,
      "",
      `- Page: ${SITE_URL}${item.href}`,
    ];
    if (item.description) lines.push(`- Description: ${item.description}`);
    const install = installCommand(item);
    if (install) lines.push(`- Install: \`${install}\``);
    if (item.source) lines.push(`- Source: ${item.source}`);
    if (item.dependencies?.length) {
      lines.push(
        `- Dependencies: ${item.dependencies.map((d) => d.name).join(", ")}`,
      );
    }
    return lines.join("\n");
  });

  const body = [
    "# Rare UI",
    "",
    "> A shadcn registry of rare, animated React components — frosted-glass, springy, Apple-flavored UI built with Tailwind CSS and Motion (Framer Motion). Every component is free to use and installable with one command via the shadcn CLI.",
    "",
    "Install any component into a React / Next.js project:",
    "",
    "```",
    "npx shadcn add swamimalode07/rare-ui/<component-name>",
    "```",
    "",
    `Source code for all components: ${REGISTRY_HOMEPAGE}`,
    "",
    "## Components",
    "",
    componentSections.join("\n\n"),
    "",
    "## Notes",
    "",
    "- Components are TypeScript + Tailwind CSS, following shadcn/ui conventions (cn + className merging, prop spreading, data-slot attributes).",
    "- Free for personal and commercial use. Attribution appreciated; please don't resell as your own kit.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
