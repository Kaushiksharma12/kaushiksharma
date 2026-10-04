import type { Metadata } from "next";
import { Anton, Instrument_Serif, IBM_Plex_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Navigation } from "@/components/Navigation";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  display: "swap",
});

const caveat = Caveat({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

import { JsonLd } from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaushiksharma.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KAUSHIK SHARMA // AI/ML Engineer & Developer",
    template: "%s // KAUSHIK SHARMA",
  },
  description: "Art-directed editorial portfolio of Kaushik Sharma, AI/ML Engineer & Developer specializing in intelligent applications, game AI algorithms, web scraping pipelines, and Next.js full-stack development.",
  openGraph: {
    title: "KAUSHIK SHARMA // AI/ML Engineer & Developer",
    description: "Building intelligent applications at the intersection of data, algorithms, and human experience.",
    url: siteUrl,
    siteName: "KAUSHIK SHARMA Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KAUSHIK SHARMA // AI/ML Engineer & Developer",
    description: "Building intelligent applications at the intersection of data, algorithms, and human experience.",
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
      className={`${anton.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable} ${caveat.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ks_portfolio_theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased selection:bg-red selection:text-white bg-bg text-ink relative">
        {/* Atmospheric Paper Texture SVG */}
        <svg className="paper-texture" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>

        {/* Technical Corner Crosshair Marks */}
        <div className="fixed top-3 left-3 font-technical text-[10px] text-muted/40 z-30 pointer-events-none">+</div>
        <div className="fixed top-3 right-3 font-technical text-[10px] text-muted/40 z-30 pointer-events-none">+</div>
        <div className="fixed bottom-3 left-3 font-technical text-[10px] text-muted/40 z-30 pointer-events-none">+</div>
        <div className="fixed bottom-3 right-3 font-technical text-[10px] text-muted/40 z-30 pointer-events-none">+</div>

        <JsonLd />
        <ThemeToggle />
        <Navigation />

        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
