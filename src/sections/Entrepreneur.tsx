"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/Section";
import MagneticButton from "@/components/MagneticButton";

export default function Entrepreneur() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <Section id="entrepreneur" className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/3 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="relative glass rounded-3xl p-8 sm:p-12 lg:p-20 card-border overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6 block"
            >
              Entrepreneurial Vision
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight mb-8"
            >
              Building More Than Projects —{" "}
              <span className="gradient-accent">Building a Business.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mb-10"
            >
              I&apos;m not just writing code — I&apos;m building the foundation for a technology
              company. My vision is to create a business that leverages artificial
              intelligence to solve real problems, build exceptional products, and
              make a meaningful impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10"
            >
              {[
                {
                  number: "01",
                  title: "Startup Mindset",
                  description: "Every line of code is written with product-market fit and scalability in mind.",
                },
                {
                  number: "02",
                  title: "AI as Leverage",
                  description: "Using artificial intelligence to multiply output and create disproportionate impact.",
                },
                {
                  number: "03",
                  title: "Real Solutions",
                  description: "Building products that solve genuine problems for real people and businesses.",
                },
              ].map((item) => (
                <div key={item.number} className="p-5 rounded-xl bg-surface/50 card-border">
                  <span className="text-xs text-accent font-mono mb-2 block">{item.number}</span>
                  <h4 className="text-sm font-semibold mb-2">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton href="#contact" variant="primary" size="lg">
                Let&apos;s Build Together
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}
