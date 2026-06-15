"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/Section";
import { skills } from "@/lib/data";

const skillIcons: Record<string, string> = {
  Python: "🐍",
  "Artificial Intelligence": "🧠",
  "Web Development": "🌐",
  Automation: "⚡",
  "Problem Solving": "🔍",
  "UI/UX Understanding": "🎨",
  "Prompt Engineering": "💬",
  "Business Development": "📈",
};

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <Section id="skills" className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 block"
          >
            Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Skills &{" "}
            <span className="gradient-accent">Technologies</span>
          </motion.h2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative glass rounded-2xl p-6 card-border hover:border-accent/20 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">{skillIcons[skill.name] || "◆"}</span>
                <span className="text-xs text-muted-foreground font-mono">
                  {skill.level}%
                </span>
              </div>

              <h3 className="text-base font-semibold mb-1">{skill.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{skill.category}</p>

              <div className="relative h-1.5 rounded-full bg-surface overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{
                    duration: 1.2,
                    delay: 0.3 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                />
              </div>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
