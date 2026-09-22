import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ComponentStudio from "@/components/playground/ComponentStudio";
import { getAllSlugs, getComponentBySlug, REGISTRY } from "@/lib/registry";
import { componentJsonLd, componentPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const href = `/components/${slug}`;
    return componentPageMetadata(href);
  } catch {
    return {
      title: "Component Studio | Oxygen UI",
    };
  }
}

export default async function ComponentSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }

  const item = getComponentBySlug(slug);
  if (!item) {
    notFound();
  }

  const href = `/components/${slug}`;

  return (
    <>
      <JsonLd data={componentJsonLd(href)} />
      <ComponentStudio item={item} allComponents={REGISTRY} />
    </>
  );
}
