import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Manrope, Outfit } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LOCALE_BOOT } from "@/i18n/config";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Azul — Discover Nature. Travel Responsibly.",
    template: "%s · Azul",
  },
  description:
    "Explore extraordinary destinations in Algeria, experience authentic local cultures, and travel in a way that respects the planet.",
  keywords: [
    "sustainable tourism",
    "Algeria",
    "eco travel",
    "Ghardaïa",
    "Tassili n'Ajjer",
    "Djurdjura",
    "Taghit",
  ],
  openGraph: {
    title: "Azul — Discover Nature. Travel Responsibly.",
    description:
      "Explore extraordinary destinations in Algeria and travel in a way that respects the planet.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#173F35",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${outfit.variable} ${manrope.variable} ${arabic.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ivory text-charcoal">
        <script dangerouslySetInnerHTML={{ __html: LOCALE_BOOT }} />
        <LanguageProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
