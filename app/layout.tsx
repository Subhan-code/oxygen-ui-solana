import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit, Plus_Jakarta_Sans } from "next/font/google";
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

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

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
  verification: {
    other: {
      "dmca-site-verification": "d2xxWFFmektvUkxyYWNwaW84dTNjQT090",
    },
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
      className={`${outfit.variable} ${inter.variable} ${geistMono.variable} ${openRunde.variable} ${calSans.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                var origError = console.error;
                var EXT_PATTERNS = [
                  'bis_skin_checked',
                  'cz-shortcut-listen',
                  'grammarly-extension',
                  'data-new-gr-c-s-check-loaded',
                  'data-gr-ext-installed',
                  'chrome-extension://',
                  'hydration-mismatch'
                ];
                console.error = function() {
                  var args = Array.prototype.slice.call(arguments);
                  var isExtErr = args.some(function(arg) {
                    var str = typeof arg === 'string' ? arg : '';
                    try { str = str || JSON.stringify(arg); } catch(e){}
                    return EXT_PATTERNS.some(function(p) { return str.indexOf(p) !== -1; });
                  });
                  if (isExtErr) return;
                  origError.apply(console, args);
                };
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans font-runde" suppressHydrationWarning>
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
