import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";
import { SITE_KEYWORDS, siteJsonLd } from "@/lib/seo";
import ScrollLockCleaner from "@/components/ScrollLockCleaner";
import "./globals.css";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const origConsoleError = console.error;
  const EXTENSION_PATTERNS = [
    "bis_skin_checked",
    "cz-shortcut-listen",
    "grammarly-extension",
    "data-new-gr-c-s-check-loaded",
    "data-gr-ext-installed",
    "chrome-extension://",
    "M_ID",
  ];
  console.error = (...args: unknown[]) => {
    const isExtensionError = args.some((arg) => {
      if (typeof arg === "string") {
        return EXTENSION_PATTERNS.some((pattern) => arg.includes(pattern));
      }
      try {
        const str = JSON.stringify(arg);
        return EXTENSION_PATTERNS.some((pattern) => str.includes(pattern));
      } catch {
        return false;
      }
    });
    if (isExtensionError) return;
    origConsoleError(...args);
  };

  window.addEventListener(
    "error",
    (event) => {
      if (
        event.filename?.includes("chrome-extension://") ||
        event.error?.stack?.includes("chrome-extension://") ||
        (typeof event.message === "string" && event.message.includes("M_ID"))
      ) {
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const calSans = Plus_Jakarta_Sans({
  variable: "--font-cal-sans",
  subsets: ["latin"],
  display: "swap",
});

const openRunde = localFont({
  variable: "--font-open-runde",
  src: [
    {
      path: "../public/fonts/OpenRunde-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenRunde-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenRunde-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenRunde-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TAGLINE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: "Syed Subhan", url: "https://x.com/SubhanHQ" }],
  creator: "Syed Subhan",
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/logos/Oxygenui.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: "/ogimage.webp",
        width: 2400,
        height: 1260,
        alt: "Oxygen UI: Open-source Solana UI library",
        type: "image/webp",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    images: ["/ogimage.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} ${openRunde.variable} ${calSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollLockCleaner />
          <div className="flex flex-1 flex-col" suppressHydrationWarning>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
