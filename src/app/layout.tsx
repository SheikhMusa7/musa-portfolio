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
  title: "Musa Sheikh | Computer Science Student, Python Developer & Aspiring Entrepreneur",
  description:
    "Computer Science student, Python developer, and aspiring entrepreneur building AI-powered automation systems, SaaS products, and intelligent digital solutions.",
  keywords: [
    "Musa Sheikh",
    "Python Developer",
    "AI Automation",
    "SaaS Development",
    "Computer Science",
    "Aspiring Entrepreneur",
    "Web Development",
  ],
  authors: [{ name: "Musa Sheikh" }],
  openGraph: {
    title: "Musa Sheikh | CS Student & Aspiring Entrepreneur",
    description:
      "Building AI systems, automation tools, and digital products. Computer Science student, Python developer, and aspiring tech founder.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Musa Sheikh | CS Student & Aspiring Entrepreneur",
    description:
      "Building AI systems, automation tools, and digital products. Computer Science student, Python developer, and aspiring tech founder.",
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
