"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/Section";
import MagneticButton from "@/components/MagneticButton";
import { projects } from "@/lib/data";

const categoryColors: Record<string, string> = {
  "AI Applications": "from-blue-500/20 to-purple-500/20 border-blue-500/20",
  "Automation Tools": "from-emerald-500/20 to-teal-500/20 border-emerald-500/20",
  "Web Platforms": "from-orange-500/20 to-rose-500/20 border-orange-500/20",
  "Business Solutions": "from-violet-500/20 to-pink-500/20 border-violet-500/20",
};

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <Section id="projects" className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 block"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Selected{" "}
            <span className="gradient-accent">Projects</span>
          </motion.h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative glass rounded-2xl overflow-hidden card-border hover:border-accent/20 transition-all duration-500"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  categoryColors[project.category] || ""
                }`}
              />

              <div className="relative p-8">
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20 mb-5">
                  {project.category}
                </span>

                <h3 className="text-xl font-semibold mb-4">{project.title}</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                      Challenge
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                      Solution
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                      Results
                    </h4>
                    <p className="text-sm text-accent font-medium">
                      {project.results}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded-md bg-surface text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <MagneticButton href={project.liveUrl} variant="primary" size="sm">
                    Live Demo
                  </MagneticButton>
                  <MagneticButton href={project.codeUrl} variant="secondary" size="sm">
                    Source Code
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
