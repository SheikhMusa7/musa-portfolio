"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/Section";
import AnoAI from "@/components/ui/animated-shader-background";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const pillars = [
    {
      no: "01",
      title: "AI Engineer",
      subtitle: "Python & Claude",
      description: "Building with Python, Claude, and AI automation. I turn messy real-world problems into pipelines, products, and systems that actually work.",
      color: "from-violet-500/20 to-purple-500/10",
      icon: "⚙️",
    },
    {
      no: "02",
      title: "CSE Student",
      subtitle: "B.Tech, SSM College",
      description: "B.Tech Computer Science Engineering at SSM College, Srinagar. The theory behind every system I ship — algorithms, architecture, engineering discipline.",
      color: "from-purple-500/20 to-pink-500/10",
      icon: "📚",
    },
    {
      no: "03",
      title: "Future Founder",
      subtitle: "Building AI Products & Startups",
      description: "Every project is a step toward launching a tech business. I'm not just learning to code — I'm learning to build products people pay for.",
      color: "from-pink-500/20 to-rose-500/10",
      icon: "🚀",
    },
  ];

  return (
    <Section id="about" className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <AnoAI />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="kicker"
          >
            About
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mt-4 font-display"
          >
            Three identities.<br />One<span className="gradient-accent"> mission.</span>
          </motion.h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative bg-card rounded-2xl overflow-hidden card-border shadow-card hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-500"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative p-8">
                <span className="text-3xl mb-5 block">{pillar.icon}</span>
                <span className="text-xs text-accent font-mono mb-2 block">{pillar.no}</span>
                <h3 className="text-xl font-semibold mb-1">{pillar.title}</h3>
                <p className="text-xs text-accent/70 font-medium mb-4">{pillar.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
