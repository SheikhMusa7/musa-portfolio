import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Musa Sheikh | Computer Science Engineer & Entrepreneur",
  description:
    "20-year-old Computer Science Engineering student passionate about AI, web development, and building impactful technology businesses. Python expert and AI-powered developer.",
  keywords: [
    "Musa Sheikh",
    "Computer Science Engineering",
    "AI Developer",
    "Python Developer",
    "Web Development",
    "Entrepreneur",
    "SSM College of Engineering",
  ],
  authors: [{ name: "Musa Sheikh" }],
  openGraph: {
    title: "Musa Sheikh | Computer Science Engineer & Entrepreneur",
    description:
      "Building AI-powered digital experiences. Computer Science Engineering student, Python expert, and future tech founder.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Musa Sheikh | Computer Science Engineer & Entrepreneur",
    description:
      "Building AI-powered digital experiences. Computer Science Engineering student, Python expert, and future tech founder.",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
