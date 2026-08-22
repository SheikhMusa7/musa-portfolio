"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/Section";
import MagneticButton from "@/components/MagneticButton";
import { projects } from "@/lib/data";

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <Section id="projects">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="kicker"
          >
            Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mt-4 font-display"
          >
            Shipped &<br /><span className="gradient-accent">proven.</span>
          </motion.h2>
        </div>

        <div ref={ref} className="space-y-16">
          {projects.slice(0, 2).map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className={`group flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-16 items-center transition-[transform] duration-300`}
            >
              <div className="flex-1 w-full">
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-premium-lg">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={
                        i === 0
                          ? "/projects/the-other-kashmir.png"
                          : "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
                      }
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
              <div className="flex-1 max-w-xl">
                <span className="text-xs text-accent font-mono mb-3 block">
                  {String(i + 1).padStart(2, "0")} / {project.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 font-display">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.problem}</p>
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">{project.solution}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 text-xs rounded-full bg-surface/80 text-muted-foreground border border-border">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-accent">{project.result}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center"
        >
          <MagneticButton href="#contact" variant="primary" size="lg">
            Discuss Your Project
            <span className="text-lg">&rarr;</span>
          </MagneticButton>
        </motion.div>
      </div>
    </Section>
  );
}
