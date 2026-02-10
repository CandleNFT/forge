"use client";

import { motion } from "framer-motion";

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large purple orb - top left */}
      <motion.div
        className="orb w-[600px] h-[600px] bg-purple-600/30 -top-48 -left-48"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Pink orb - top right */}
      <motion.div
        className="orb w-[500px] h-[500px] bg-pink-600/25 top-20 -right-32"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -20, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Blue orb - bottom left */}
      <motion.div
        className="orb w-[400px] h-[400px] bg-blue-600/20 bottom-20 left-20"
        animate={{
          x: [0, 40, -50, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Small purple orb - center right */}
      <motion.div
        className="orb w-[300px] h-[300px] bg-violet-500/20 top-1/2 right-1/4"
        animate={{
          x: [0, -30, 50, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Tiny accent orb */}
      <motion.div
        className="orb w-[200px] h-[200px] bg-fuchsia-500/15 bottom-1/3 left-1/3"
        animate={{
          x: [0, 70, -40, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
    </div>
  );
}
