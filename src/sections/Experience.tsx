"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/Section";
import { experiences } from "@/lib/data";

const typeIcons: Record<string, string> = {
  learning: "📚",
  exploration: "🔬",
  building: "🛠️",
  entrepreneurship: "🚀",
  innovation: "💡",
  future: "🌟",
};

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <Section id="experience">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="kicker"
          >
            Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-4 font-display"
          >
            The path to<span className="gradient-accent"> founding.</span>
          </motion.h2>
        </div>

        <div ref={ref} className="relative max-w-3xl mx-auto">
          <div className="absolute left-[23px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent via-accent/30 to-transparent" />
          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.year}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-16"
              >
                <div className="absolute left-[14px] top-1 w-[19px] h-[19px] rounded-full bg-card border-2 border-accent flex items-center justify-center shadow-premium">
                  <div className="w-[7px] h-[7px] rounded-full bg-accent" />
                </div>
                <div className="bg-card rounded-2xl p-6 card-border shadow-card hover:shadow-premium-lg transition-all duration-500">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg">{typeIcons[exp.type] || "◆"}</span>
                    <span className="text-xs font-mono text-accent">{exp.year}</span>
                  </div>
                  <h3 className="text-base font-semibold mb-1">{exp.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
