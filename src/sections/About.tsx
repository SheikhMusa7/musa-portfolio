"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/Section";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <Section id="about" className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div ref={ref}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6 block"
            >
              About
            </motion.span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-8">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Computer Science Student.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block gradient-accent"
              >
                Future Founder.
              </motion.span>
            </h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              {[
                "My journey into technology started with curiosity and a single Python script. I was 15 when I wrote my first program — a simple automation that saved me hours of manual work. That moment of creating something from nothing, watching a machine follow my instructions, felt like magic. I've been chasing that feeling ever since.",
                "Today, I'm a Computer Science Engineering student at SSM College of Engineering, where I've built everything from AI-powered applications to full-scale web platforms. But my education hasn't been confined to the classroom. I've spent countless nights exploring machine learning models, building automation tools, and understanding how technology can solve real problems.",
                "What drives me isn't just the technology itself — it's what technology enables. The ability to take an idea, shape it into a product, and put it in the hands of people who need it. That's the real power of software, and that's what I'm building toward.",
                "Football taught me discipline, teamwork, and the value of consistent effort. AI taught me to think differently about problems. Entrepreneurship taught me to act. I bring all of these into everything I build.",
              ].map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="lg:pl-12">
            <div className="sticky top-32 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-2xl p-8 card-border"
              >
                <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  {[
                    { label: "Age", value: "20" },
                    { label: "Education", value: "B.Tech CSE" },
                    { label: "Primary Stack", value: "Python & Next.js" },
                    { label: "Focus", value: "AI & Automation" },
                    { label: "Motto", value: "Build relentlessly" },
                  ].map((fact) => (
                    <div key={fact.label} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0">
                      <span className="text-sm text-muted-foreground">{fact.label}</span>
                      <span className="text-sm font-medium">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-2xl p-8 card-border"
              >
                <h3 className="text-lg font-semibold mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {["Artificial Intelligence", "Technology", "Entrepreneurship", "Football", "Startups", "Innovation"].map(
                    (interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1.5 text-xs rounded-full bg-accent/10 text-accent border border-accent/20"
                      >
                        {interest}
                      </span>
                    )
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
