"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-xs text-muted-foreground tracking-widest uppercase">
        Scroll
      </span>
      <div className="w-[1px] h-10 bg-gradient-to-b from-muted-foreground/50 to-transparent relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-4 bg-accent/60"
          animate={{
            y: [0, 40, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
    </motion.div>
  );
}
