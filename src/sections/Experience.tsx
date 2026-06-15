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
    <Section id="experience" className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 block"
          >
            Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Experience{" "}
            <span className="gradient-accent">Timeline</span>
          </motion.h2>
        </div>

        <div ref={ref} className="relative max-w-3xl mx-auto">
          <div className="absolute left-[23px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent via-accent/50 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.year}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pl-16"
              >
                <div className="absolute left-[14px] top-1 w-[19px] h-[19px] rounded-full bg-background border-2 border-accent flex items-center justify-center">
                  <div className="w-[7px] h-[7px] rounded-full bg-accent" />
                </div>

                <div className="glass rounded-2xl p-6 card-border hover:border-accent/20 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-lg">{typeIcons[exp.type] || "◆"}</span>
                    <span className="text-xs font-mono text-accent">{exp.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{exp.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
