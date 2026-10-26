import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_DESC, SITE_NAME, SITE_URL } from "@/lib/site";
import RiveCursor from "@/components/RiveCursor";
import ScrollSnap from "@/components/ScrollSnap";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Plinth — the base your billing stands on", template: "%s · Plinth" },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: { title: "Plinth — the base your billing stands on", description: SITE_DESC, url: SITE_URL, siteName: SITE_NAME, type: "website", locale: "en_NG" },
  twitter: { card: "summary_large_image", title: "Plinth — the base your billing stands on", description: SITE_DESC },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0A0A0A", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/ClashDisplay-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Satoshi-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/danfo-3d.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-jade focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
        {children}
        <RiveCursor />
        <ScrollSnap />
      </body>
    </html>
  );
}
