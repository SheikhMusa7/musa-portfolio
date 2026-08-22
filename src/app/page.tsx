"use client";

import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Vision from "@/sections/Vision";
import Entrepreneur from "@/sections/Entrepreneur";
import Football from "@/sections/Football";
import Experience from "@/sections/Experience";
import Testimonials from "@/sections/Testimonials";
import Services from "@/sections/Services";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

export default function Home() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest<HTMLAnchorElement>("a[href^='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <>
      <CustomCursor />
      <Navigation />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-30">
        <WebGLShader />
      </div>
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Vision />
        <Entrepreneur />
        <Football />
        <Experience />
        <Testimonials />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
