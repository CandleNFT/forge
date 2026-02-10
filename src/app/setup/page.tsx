"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { Navigation } from "@/components/Navigation";
import { setVercelToken, isSetupComplete } from "@/lib/auth";

const steps = [
  {
    number: "1",
    title: "Go to Vercel Tokens",
    description: "Visit your Vercel account settings to create a new token",
    action: "https://vercel.com/account/tokens",
  },
  {
    number: "2",
    title: "Create a Token",
    description: 'Click "Create Token", name it "FORGE", and set expiration',
  },
  {
    number: "3",
    title: "Paste Below",
    description: "Copy the token and paste it in the field below",
  },
];

export default function SetupPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    // If already set up, redirect to build
    if (isSetupComplete()) {
      router.push("/build");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token.trim()) {
      setError("Please enter your Vercel token");
      return;
    }

    if (token.length < 20) {
      setError("That doesn't look like a valid Vercel token");
      return;
    }

    setIsValidating(true);

    // Simulate validation (in production, you'd verify with Vercel API)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Save token
    setVercelToken(token.trim());
    
    // Redirect to build
    router.push("/build");
  };

  return (
    <main className="min-h-screen relative">
      <FloatingOrbs />
      <Navigation />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-6xl mb-4"
              >
                🤖
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Hey! I&apos;m <span className="gradient-text">Bobert</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Before I can deploy your sites, I need access to your Vercel account
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-sm font-bold shrink-0">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                    {step.action && (
                      <a
                        href={step.action}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-2 text-sm text-purple-400 hover:text-pink-400 transition-colors"
                      >
                        Open Vercel Tokens →
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Token Input Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Vercel API Token
                </label>
                <div className="relative">
                  <input
                    type={showToken ? "text" : "password"}
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Paste your token here..."
                    className="w-full px-4 py-4 bg-black/30 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all pr-12 font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showToken ? "🙈" : "👁️"}
                  </button>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isValidating}
                whileHover={{ scale: token ? 1.02 : 1 }}
                whileTap={{ scale: token ? 0.98 : 1 }}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  token && !isValidating
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white btn-glow"
                    : "bg-gray-800 text-gray-500"
                }`}
              >
                {isValidating ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⚡
                    </motion.span>
                    Connecting to Vercel...
                  </span>
                ) : (
                  "Connect Vercel Account"
                )}
              </motion.button>
            </form>

            {/* Security Note */}
            <div className="mt-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-start gap-3">
                <span className="text-xl">🔒</span>
                <div>
                  <p className="text-sm text-gray-300">
                    Your token is stored locally in your browser and never sent to our servers.
                    Bobert uses it directly to deploy to your Vercel account.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skip for now (dev only) */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6 text-gray-500 text-sm"
          >
            Just exploring?{" "}
            <button
              onClick={() => {
                setVercelToken("demo_token_for_preview");
                router.push("/build");
              }}
              className="text-purple-400 hover:text-pink-400 transition-colors underline"
            >
              Continue in demo mode
            </button>
          </motion.p>
        </motion.div>
      </section>
    </main>
  );
}
