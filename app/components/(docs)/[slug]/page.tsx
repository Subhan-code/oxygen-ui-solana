import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ComponentStudio from "@/components/playground/ComponentStudio";
import {
  getComponentDoc,
  getAllComponentDocs,
  KEPT_SLUGS,
} from "@/lib/component-docs";
import { componentJsonLd, componentPageMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
  return KEPT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const doc = getComponentDoc(slug);
    if (!doc) {
      return {
        title: "Component Not Found | Oxygen UI",
      };
    }
    const href = `/components/${slug}`;
    const seo = componentPageMetadata(href);
    return {
      ...seo,
      title: `${doc.title} — Component Studio | Oxygen UI`,
      description: doc.description,
    };
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

  const doc = getComponentDoc(slug);
  if (!doc) {
    notFound();
  }

  const href = `/components/${slug}`;

  return (
    <>
      <JsonLd data={componentJsonLd(href)} />
      <ComponentStudio doc={doc} allDocs={getAllComponentDocs()} />
    </>
  );
}
