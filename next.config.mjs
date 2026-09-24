import { createRequire } from "module";
const require = createRequire(import.meta.url);

const registryItems = require("./lib/registry.json");

// Build-time assertions
function validateRegistry(items) {
  const titles = new Set();
  const slugs = new Set();
  const ids = new Set();

  for (const item of items) {
    const normTitle = item.title.trim().toLowerCase();
    if (titles.has(normTitle)) {
      throw new Error(`Build assertion failed: Duplicate title "${item.title}" (${item.slug})`);
    }
    if (slugs.has(item.slug)) {
      throw new Error(`Build assertion failed: Duplicate slug "${item.slug}"`);
    }
    if (ids.has(item.id)) {
      throw new Error(`Build assertion failed: Duplicate id "${item.id}" (${item.title})`);
    }
    titles.add(normTitle);
    slugs.add(item.slug);
    ids.add(item.id);
  }
}

validateRegistry(registryItems);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["d3-scale", "d3-array", "recharts"],
  compress: true,

  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "arweave.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatar.vercel.sh" },
      { protocol: "https", hostname: "assets.coingecko.com" },
      { protocol: "https", hostname: "solana.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/sol-components",
        destination: "/sol",
        permanent: false,
      },
      {
        source: "/components",
        destination: "/sol",
        permanent: false,
      },
      {
        source: "/blocks",
        destination: "/sol",
        permanent: false,
      },
      {
        source: "/blocks/:slug",
        destination: "/components/:slug",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/r/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/image/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2678400, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
