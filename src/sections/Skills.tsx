"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/Section";
import { skills } from "@/lib/data";

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const metrics = [
    { value: "95%", label: "Python proficiency" },
    { value: "90%", label: "AI & ML expertise" },
    { value: "80%", label: "Faster project delivery" },
    { value: "12+", label: "Businesses impacted" },
  ];

  const topSkills = skills.slice(0, 4);

  return (
    <Section id="skills" className="!py-0">
      <div className="bg-mutedbg relative overflow-hidden">
        <div className="absolute inset-0 bg-noise pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[160px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="kicker"
            >
              Capabilities
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mt-4 font-display"
            >
              Measured where<br />it <span className="gradient-accent">counts.</span>
            </motion.h2>
          </div>

          <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-display gradient-accent">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-2">{metric.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-card rounded-xl p-5 card-border shadow-card hover:shadow-premium-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent/[0.08] flex items-center justify-center text-xs font-bold text-accent">
                    {skill.icon}
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{skill.name}</h3>
                <p className="text-xs text-muted-foreground">{skill.category}</p>
                <div className="relative h-1.5 rounded-full bg-surface mt-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
