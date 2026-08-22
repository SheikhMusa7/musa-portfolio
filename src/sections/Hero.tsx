"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <Image
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80"
          alt=""
          fill
          className="object-cover opacity-[0.10] object-center"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <motion.div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[140px] pointer-events-none"
        style={{ y: glowY }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full pt-32 pb-20"
      >
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="kicker"
          >
            AI Engineer &amp; Aspiring Entrepreneur
          </motion.span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight text-foreground mt-5 mb-6 font-display">
            <TextReveal as="span" className="block" delay={0.1} stagger={0.04} accentWords={["AI", "Products"]}>
              Building AI Products
            </TextReveal>
            <TextReveal as="span" className="block" delay={0.32} stagger={0.04}>
              That Ship.
            </TextReveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed mb-10"
          >
            AI engineer from Srinagar building products and startups with Python,
            Claude, and AI automation. B.Tech CSE student turning ideas into systems
            that work &mdash; and working toward launching a tech business of my own.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a href="#projects">
              <LiquidButton className="text-white border rounded-full" size="xl">
                Work With Me
                <span className="text-lg">&rarr;</span>
              </LiquidButton>
            </a>
            <MagneticButton href="#vision" variant="secondary" size="lg">
              Explore My Vision
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-muted-foreground/40">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="2" />
            <motion.circle
              cx="8" cy="8" r="2" fill="currentColor"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
