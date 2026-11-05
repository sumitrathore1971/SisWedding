import type { Metadata, Viewport } from "next";
import { Noto_Serif_Devanagari, Poppins, Molle, Jim_Nightshade } from "next/font/google";
import { weddingData } from "@/data/wedding";
import "./globals.css";

const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-serif",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const molle = Molle({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-molle",
  display: "swap",
});

const jimNightshade = Jim_Nightshade({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jim-nightshade",
  display: "swap",
});

export const metadata: Metadata = {
  title: weddingData.meta.title,
  description: weddingData.meta.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="hi"
      className={`${notoSerifDevanagari.variable} ${poppins.variable} ${molle.variable} ${jimNightshade.variable} scroll-smooth antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jim+Nightshade&family=Molle:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-neutral-900 font-sans text-neutral-900 overflow-x-hidden selection:bg-neutral-800 selection:text-white">
        {children}
      </body>
    </html>
  );
}
