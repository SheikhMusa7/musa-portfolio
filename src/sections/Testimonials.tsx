"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/Section";
import { guarantees } from "@/lib/data";

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <Section id="why-me">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="kicker"
          >
            Why work with me
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-4 font-display"
          >
            No agencies. No fluff.<br />
            Just <span className="gradient-accent">real work.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-muted-foreground leading-relaxed mt-6 max-w-xl"
          >
            I&rsquo;m an early-stage builder, not an agency. That means lower prices,
            faster decisions, and direct access to the person writing your code.
            Here&rsquo;s exactly what you get.
          </motion.p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {guarantees.map((g, i) => (
            <motion.article
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="bg-card rounded-2xl p-7 card-border shadow-card hover:shadow-premium-lg transition-shadow duration-500"
            >
              <div className="text-2xl mb-4">{g.icon}</div>
              <h3 className="text-base font-semibold mb-2">{g.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {g.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
