"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

function getIsMobile(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
}

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile] = useState(getIsMobile);
  const cursorX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const cursorY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const cursorOuterX = useSpring(0, { stiffness: 80, damping: 20, mass: 0.3 });
  const cursorOuterY = useSpring(0, { stiffness: 80, damping: 20, mass: 0.3 });

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorOuterX.set(e.clientX);
      cursorOuterY.set(e.clientY);
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    const handleLinkHoverStart = () => setIsHovering(true);
    const handleLinkHoverEnd = () => setIsHovering(false);

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    const links = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHoverStart);
      link.addEventListener("mouseleave", handleLinkHoverEnd);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverStart);
        link.removeEventListener("mouseleave", handleLinkHoverEnd);
      });
    };
  }, [isMobile, cursorX, cursorY, cursorOuterX, cursorOuterY]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-accent/50 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorOuterX,
          y: cursorOuterY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
      />
    </>
  );
}
