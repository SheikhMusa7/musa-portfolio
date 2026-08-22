import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Musa Ahmad | AI Engineer & Aspiring Entrepreneur",
  description:
    "AI engineer and aspiring entrepreneur building AI products and startups. Python, Claude, AI automation, and web development. B.Tech CSE student based in Srinagar, Kashmir.",
  keywords: [
    "Musa Ahmad",
    "AI Engineer",
    "Aspiring Entrepreneur",
    "AI Products",
    "Startups",
    "Python Developer",
    "Claude",
    "AI Automation",
    "Web Development",
    "Srinagar",
    "Kashmir",
    "B.Tech CSE",
  ],
  authors: [{ name: "Musa Ahmad" }],
  openGraph: {
    title: "Musa Ahmad | AI Engineer & Aspiring Entrepreneur",
    description:
      "Building AI products and startups. Python, Claude, AI automation, and web development. Based in Srinagar, Kashmir.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Musa Ahmad | AI Engineer & Aspiring Entrepreneur",
    description:
      "Building AI products and startups. Python, Claude, AI automation, and web development. Based in Srinagar, Kashmir.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
