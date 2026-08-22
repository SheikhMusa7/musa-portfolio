"use client";

import { personalInfo } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <a href="#" className="text-sm font-semibold tracking-tight text-foreground hover:text-accent transition-colors">
              Musa<span className="text-accent">.</span>
            </a>
            <p className="text-xs text-muted-foreground/60 mt-1">
              CS Student & Aspiring Entrepreneur.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {[
              { label: "LinkedIn", href: personalInfo.social.linkedin },
              { label: "GitHub", href: personalInfo.social.github },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground/60">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
