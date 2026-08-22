"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Entrepreneur() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="py-24 lg:py-32 relative bg-background">
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="kicker">Founder Mindset</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mt-8 mb-8 font-display leading-snug text-foreground/90">
            &ldquo;I&rsquo;m not just learning to code - I&rsquo;m learning to build
            <span className="gradient-accent"> AI products and startups</span> that people actually pay for.
            Every project is a step toward that.&rdquo;
          </h2>
          <p className="text-sm text-muted-foreground">- The mission I&rsquo;m building toward</p>
        </motion.div>
      </div>
    </section>
  );
}
