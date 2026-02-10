"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const examples = [
  "A crypto portfolio tracker",
  "A restaurant website with online ordering",
  "A SaaS landing page",
  "An AI startup homepage",
  "A personal blog with dark mode",
  "A fitness tracking dashboard",
  "An e-commerce store",
  "A wedding invitation site",
];

export function TypeWriter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentExample = examples[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentExample.length) {
          setDisplayText(currentExample.slice(0, displayText.length + 1));
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % examples.length);
        }
      }
    }, isDeleting ? 30 : 80);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <div className="h-[1.5em] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={displayText}
          className="text-2xl md:text-4xl font-light text-purple-300"
        >
          &ldquo;{displayText}
          <span className="cursor text-pink-400">|</span>&rdquo;
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
