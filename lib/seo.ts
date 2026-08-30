import type { Metadata } from "next";
import { components } from "@/lib/components";
import {
  SITE_ALT_NAMES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_REPO,
  SITE_URL,
} from "@/lib/site";

export const SITE_KEYWORDS = [
  "oxygenui",
  "oxygen ui",
  "oxygen ui components",
  "solana ui library",
  "solana react components",
  "solana dapp ui",
  "solana ui primitives",
  "solana developer tooling",
  "solana foundation grant",
  "web3 frontend components",
  "solana token component",
  "solana wallet ui",
  "react components",
  "next.js components",
  "shadcn registry",
  "shadcn components",
  "animated ui components",
  "framer motion components",
  "motion react",
  "tailwind css components",
  "free ui components",
  "copy paste components",
  "ui component library",
  "microinteractions",
];

export function componentPageMetadata(href: string): Metadata {
  const item = components.find((c) => c.href === href);
  if (!item) return {};

  const name = item.name.toLowerCase();
  const title = `${item.name} — Solana React Component`;
  const description = item.description || `Copy-paste ${item.name} component for Solana dApps with Tailwind CSS and Motion.`;
  const url = `${SITE_URL}${item.href}`;

  return {
    title,
    description,
    keywords: [
      name,
      `${name} react`,
      `${name} component`,
      `animated ${name}`,
      `${name} shadcn`,
      `${name} solana`,
      ...SITE_KEYWORDS,
    ],
    alternates: {
      canonical: item.href,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/ogimage.webp",
          width: 2400,
          height: 1260,
          alt: `${item.name} - Oxygen UI Component`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/ogimage.webp"],
    },
  };
}

export function componentJsonLd(href: string) {
  const item = components.find((c) => c.href === href);
  if (!item) return null;

  const url = `${SITE_URL}${item.href}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Components",
            item: `${SITE_URL}/components`,
          },
          { "@type": "ListItem", position: 3, name: item.name, item: url },
        ],
      },
      {
        "@type": "SoftwareSourceCode",
        name: item.name,
        description: item.description,
        url,
        codeRepository: item.source ?? SITE_REPO,
        programmingLanguage: "TypeScript",
        runtimePlatform: "React",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        license: "https://opensource.org/licenses/MIT",
        author: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: SITE_ALT_NAMES,
        url: SITE_URL,
        logo: `${SITE_URL}/logos/Oxygenui.svg`,
        sameAs: [SITE_REPO],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: SITE_ALT_NAMES,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: SITE_NAME,
        alternateName: SITE_ALT_NAMES,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        softwareHelp: `${SITE_URL}/components`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    ],
  };
}

export function componentsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE_NAME} Components`,
    url: `${SITE_URL}/components`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: components.length,
      itemListElement: components.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        description: item.description,
        url: `${SITE_URL}${item.href}`,
      })),
    },
  };
}
