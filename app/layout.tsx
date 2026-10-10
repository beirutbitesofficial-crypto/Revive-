import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "The Revive Club | Gym, Basketball, Movement & Recovery in Beirut",
  description:
    "The Revive Club at Beirut Waterfront brings together gym training, basketball, movement classes, recovery, cycling, HIIT, coffee, gaming and community in one club.",
  robots: site.preview ? { index: false, follow: false } : undefined,
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
  openGraph: {
    title: "The Revive Club — Beirut Waterfront",
    description: "Gym. Court. Movement. Recovery. Classes. Community. You'll feel different here.",
    type: "website",
    images: [{ url: "/media/og.jpg", width: 1200, height: 630, alt: "The Revive Club entrance at Beirut Waterfront" }],
  },
  twitter: { card: "summary_large_image", images: ["/media/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#0F0706",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before paint so intro elements can start hidden without a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="bg-ink font-sans text-cream antialiased">
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
