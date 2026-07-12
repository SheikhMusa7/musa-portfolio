"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/Section";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <Section id="testimonials">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="kicker"
          >
            What people say
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-4 font-display"
          >
            Trusted by<br /><span className="gradient-accent">founders & leaders.</span>
          </motion.h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-card rounded-2xl p-8 card-border shadow-card hover:shadow-premium-lg transition-shadow duration-500 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-11 h-11 rounded-full bg-accent/[0.08] flex items-center justify-center ring-1 ring-accent/15">
                  <span className="text-sm font-semibold text-accent">{t.avatar}</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 italic">
                &ldquo;{t.content}&rdquo;
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
