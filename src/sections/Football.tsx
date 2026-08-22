"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/Section";

export default function Football() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const values = [
    { title: "Discipline", desc: "Consistent daily practice and preparation." },
    { title: "Teamwork", desc: "Clear communication and trust under pressure." },
    { title: "Leadership", desc: "Taking responsibility and elevating others." },
    { title: "Drive", desc: "The will to win and never accept mediocrity." },
  ];

  return (
    <Section id="football">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="flex-1">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="kicker"
            >
              Performance Background
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-4 mb-6 font-display"
            >
              Football &<br /><span className="gradient-accent">Engineering.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-muted-foreground leading-relaxed mb-8"
            >
              Football taught me how to perform under pressure, lead a team, and
              show up consistently. These aren&rsquo;t soft skills - they&rsquo;re the same
              competencies that separate good engineers from great founders.
            </motion.p>
            <div ref={ref} className="space-y-3">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span className="font-medium">{v.title}</span>
                  <span className="text-muted-foreground">- {v.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-premium-lg">
              <Image
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80"
                alt="Football"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white/60 text-xs italic">&ldquo;The discipline of a 90-minute match<br/>is the same discipline it takes to ship a product.&rdquo;</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
