"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import ScrollIndicator from "@/components/ScrollIndicator";
import TextReveal from "@/components/TextReveal";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-background pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
              B.Tech Computer Science Engineering
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight mb-6">
              <TextReveal
                as="span"
                className="block"
                stagger={0.03}
              >
                Building AI-Powered
              </TextReveal>
              <TextReveal
                as="span"
                className="block gradient-accent"
                delay={0.4}
                stagger={0.03}
              >
                Digital Experiences.
              </TextReveal>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10"
            >
              Computer Science Engineering student passionate about AI, software
              development, and building impactful technology businesses. I turn
              complex problems into intelligent, elegant solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <MagneticButton href="#projects" variant="primary" size="lg">
                View My Work
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>
              <MagneticButton href="#contact" variant="secondary" size="lg">
                Get in Touch
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-accent/10 to-transparent relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-3xl font-bold text-accent">M</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Musa Sheikh</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl glass flex items-center justify-center">
                <span className="text-2xl font-bold gradient-accent">20</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full glass flex items-center justify-center">
                <span className="text-xs text-muted-foreground text-center leading-tight">
                  AI<br/>Dev
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
