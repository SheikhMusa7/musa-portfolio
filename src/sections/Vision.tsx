"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/Section";

export default function Vision() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const items = [
    { n: "01", title: "Applied AI & Agents", desc: "Production systems grounded in real data and processes, not demos." },
    { n: "02", title: "AI-Driven Automation", desc: "Self-optimizing pipelines that predict, prevent, and scale without headcount growth." },
    { n: "03", title: "Responsible AI Governance", desc: "Policy, evaluation, and oversight built in from day one." },
  ];

  return (
    <Section id="vision">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="flex-1 w-full">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-premium-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>
          </div>
          <div className="flex-1 max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="kicker"
            >
              The Vision
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-4 mb-6 font-display"
            >
              Intelligence, wired into<br />the way<span className="gradient-accent"> business runs.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-muted-foreground leading-relaxed mb-8"
            >
              I move past pilots and demos, embedding AI into operations, decisions, and products — with guardrails
              that businesses can trust.
            </motion.p>
            <div className="space-y-5">
              {items.map((item, i) => (
                <motion.div
                  key={item.n}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-4"
                >
                  <span className="text-xs text-accent font-mono w-6 flex-shrink-0 mt-0.5">{item.n}</span>
                  <div>
                    <h4 className="text-sm font-semibold">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
