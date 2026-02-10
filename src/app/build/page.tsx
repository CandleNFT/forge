"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { Navigation } from "@/components/Navigation";
import confetti from "canvas-confetti";

type BuildStep = {
  id: string;
  emoji: string;
  text: string;
  complete: boolean;
};

const initialSteps: BuildStep[] = [
  { id: "ignite", emoji: "🔥", text: "Igniting build engine...", complete: false },
  { id: "construct", emoji: "🏗️", text: "Constructing pages...", complete: false },
  { id: "style", emoji: "🎨", text: "Applying styles...", complete: false },
  { id: "deploy", emoji: "🚀", text: "Deploying to cloud...", complete: false },
];

const styleOptions = [
  { id: "minimal", label: "Minimal", icon: "◻️" },
  { id: "bold", label: "Bold", icon: "⬛" },
  { id: "playful", label: "Playful", icon: "🎨" },
];

const colorPresets = [
  { id: "purple", colors: ["#8b5cf6", "#ec4899"], label: "Purple Dream" },
  { id: "ocean", colors: ["#0ea5e9", "#06b6d4"], label: "Ocean Breeze" },
  { id: "sunset", colors: ["#f97316", "#ef4444"], label: "Sunset Glow" },
  { id: "forest", colors: ["#22c55e", "#10b981"], label: "Forest" },
  { id: "midnight", colors: ["#1e293b", "#475569"], label: "Midnight" },
];

export default function BuildPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("minimal");
  const [selectedColor, setSelectedColor] = useState("purple");
  const [isBuilding, setIsBuilding] = useState(false);
  const [steps, setSteps] = useState<BuildStep[]>(initialSteps);
  const [currentStep, setCurrentStep] = useState(-1);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleBuild = async () => {
    if (!prompt.trim()) return;
    
    setIsBuilding(true);
    setSteps(initialSteps);
    setCurrentStep(0);
    setDeployedUrl(null);

    // Simulate build process
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setSteps((prev) =>
        prev.map((step, index) =>
          index === i ? { ...step, complete: true } : step
        )
      );
    }

    // Generate fake URL
    const siteId = Math.random().toString(36).substring(2, 8);
    const siteName = prompt.toLowerCase().replace(/[^a-z0-9]/g, "-").substring(0, 20);
    setDeployedUrl(`https://${siteName}-${siteId}.vercel.app`);

    // Celebration confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#8b5cf6", "#ec4899", "#3b82f6"],
    });
    
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#8b5cf6", "#ec4899", "#3b82f6"],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#8b5cf6", "#ec4899", "#3b82f6"],
      });
    }, 250);
  };

  const resetBuild = () => {
    setIsBuilding(false);
    setSteps(initialSteps);
    setCurrentStep(-1);
    setDeployedUrl(null);
    setPrompt("");
  };

  return (
    <main className="min-h-screen relative">
      <FloatingOrbs />
      <Navigation />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="w-full max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!isBuilding ? (
              /* Build Form */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 md:p-12"
              >
                <div className="text-center mb-10">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-6xl mb-4"
                  >
                    🔥
                  </motion.div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    What will you <span className="gradient-text">FORGE</span>?
                  </h1>
                  <p className="text-gray-400 text-lg">
                    Describe your dream website and watch the magic happen
                  </p>
                </div>

                {/* Main Prompt Input */}
                <div className="mb-8">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="What's your website about? Be as detailed as you like...

Example: A modern portfolio website for a UX designer with a dark theme, project gallery, about section, and contact form."
                    className="w-full h-48 px-6 py-4 bg-black/30 border border-purple-500/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none transition-all"
                  />
                  <div className="flex justify-end mt-2">
                    <span className="text-sm text-gray-500">
                      {prompt.length} characters
                    </span>
                  </div>
                </div>

                {/* Advanced Options Toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
                >
                  <motion.span
                    animate={{ rotate: showAdvanced ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.span>
                  <span>Advanced Options</span>
                </button>

                {/* Advanced Options */}
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mb-8"
                    >
                      <div className="space-y-6 pt-2">
                        {/* Style Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Style Preference
                          </label>
                          <div className="flex flex-wrap gap-3">
                            {styleOptions.map((style) => (
                              <motion.button
                                key={style.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedStyle(style.id)}
                                className={`px-5 py-3 rounded-xl flex items-center gap-2 transition-all ${
                                  selectedStyle === style.id
                                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                    : "glass text-gray-300 hover:text-white"
                                }`}
                              >
                                <span>{style.icon}</span>
                                <span>{style.label}</span>
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Color Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Color Theme
                          </label>
                          <div className="flex flex-wrap gap-3">
                            {colorPresets.map((preset) => (
                              <motion.button
                                key={preset.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedColor(preset.id)}
                                className={`px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                                  selectedColor === preset.id
                                    ? "ring-2 ring-white ring-offset-2 ring-offset-[#030014]"
                                    : ""
                                }`}
                                style={{
                                  background: `linear-gradient(135deg, ${preset.colors[0]}, ${preset.colors[1]})`,
                                }}
                              >
                                <span className="text-white font-medium text-sm">
                                  {preset.label}
                                </span>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Build Button */}
                <motion.button
                  onClick={handleBuild}
                  disabled={!prompt.trim()}
                  whileHover={{ scale: prompt.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: prompt.trim() ? 0.98 : 1 }}
                  className={`w-full py-5 rounded-2xl font-bold text-xl transition-all ${
                    prompt.trim()
                      ? "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white btn-glow cursor-pointer bg-[length:200%_100%] hover:bg-right"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  🔥 FORGE IT
                </motion.button>
              </motion.div>
            ) : !deployedUrl ? (
              /* Building Progress */
              <motion.div
                key="progress"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 md:p-12"
              >
                <div className="text-center mb-10">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1, repeat: Infinity },
                    }}
                    className="text-6xl mb-4 inline-block"
                  >
                    ⚡
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    <span className="gradient-text">FORGING</span> Your Website
                  </h2>
                  <p className="text-gray-400">&ldquo;{prompt.substring(0, 50)}...&rdquo;</p>
                </div>

                {/* Progress Steps */}
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0.3, x: -20 }}
                      animate={{
                        opacity: index <= currentStep ? 1 : 0.3,
                        x: 0,
                      }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                        index === currentStep && !step.complete
                          ? "glass"
                          : step.complete
                          ? "bg-green-500/10"
                          : ""
                      }`}
                    >
                      <div className="text-3xl">
                        {step.complete ? (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            ✅
                          </motion.span>
                        ) : index === currentStep ? (
                          <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                          >
                            {step.emoji}
                          </motion.span>
                        ) : (
                          <span className="opacity-30">{step.emoji}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <span
                          className={`text-lg ${
                            step.complete
                              ? "text-green-400"
                              : index === currentStep
                              ? "text-white"
                              : "text-gray-500"
                          }`}
                        >
                          {step.text}
                        </span>
                        {index === currentStep && !step.complete && (
                          <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full shimmer rounded-full"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 2.5, ease: "easeInOut" }}
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Success State */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="glass-card p-8 md:p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-8xl mb-6"
                >
                  🎉
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Your Site is <span className="gradient-text">LIVE!</span>
                </h2>
                <p className="text-gray-400 mb-8 text-lg">
                  Your website has been forged and deployed successfully
                </p>

                {/* Deployed URL */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <div className="glass p-6 rounded-2xl inline-block">
                    <a
                      href={deployedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl md:text-2xl font-mono text-purple-400 hover:text-pink-400 transition-colors break-all"
                    >
                      {deployedUrl}
                    </a>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.a
                    href={deployedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white btn-glow"
                  >
                    Visit Your Site →
                  </motion.a>
                  <motion.button
                    onClick={resetBuild}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 glass rounded-xl font-semibold text-white hover:bg-white/10"
                  >
                    Build Another
                  </motion.button>
                </div>

                <Link href="/dashboard">
                  <p className="text-gray-500 hover:text-gray-300 mt-8 transition-colors cursor-pointer">
                    View in Dashboard →
                  </p>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
