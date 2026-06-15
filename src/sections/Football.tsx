"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/Section";

const footballValues = [
  {
    title: "Discipline",
    description: "Consistent practice and preparation create excellence. The same principle applies to coding and building products.",
    icon: "🎯",
  },
  {
    title: "Teamwork",
    description: "No one builds something great alone. Football taught me how to collaborate, communicate, and trust a team.",
    icon: "🤝",
  },
  {
    title: "Leadership",
    description: "Taking responsibility, making decisions under pressure, and elevating those around you.",
    icon: "⚡",
  },
  {
    title: "Competitive Mindset",
    description: "The drive to win, to improve, and to never settle for mediocrity translates directly into entrepreneurship.",
    icon: "🏆",
  },
];

export default function Football() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <Section id="football" className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="flex-1">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6 block"
            >
              Beyond Code
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6"
            >
              Football &{" "}
              <span className="gradient-accent">Engineering</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground leading-relaxed mb-8"
            >
              Football isn&apos;t just a sport I play — it&apos;s a framework for how I approach
              work and life. The pitch has taught me more about strategy, resilience, and
              high-performance teamwork than any classroom ever could.
            </motion.p>

            <p className="text-sm text-muted-foreground/60 italic">
              &ldquo;The same focus I bring to a 90-minute match, I bring to every project I build.&rdquo;
            </p>
          </div>

          <div ref={ref} className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {footballValues.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass rounded-2xl p-6 card-border hover:border-accent/20 transition-all duration-500"
              >
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
