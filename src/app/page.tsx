"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { Navigation } from "@/components/Navigation";
import { TypeWriter } from "@/components/TypeWriter";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <FloatingOrbs />
      <Navigation />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-300">AI-Powered Website Generation</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="gradient-text glow-text">Describe it.</span>
            <br />
            <span className="text-white">We build it.</span>
            <br />
            <span className="gradient-text glow-text">You launch it.</span>
          </h1>

          {/* Typing examples */}
          <div className="my-12">
            <TypeWriter />
          </div>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12">
            Just describe your dream website in plain English. Our AI builds and 
            deploys it in seconds. No code. No design skills. No waiting.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/build">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl font-bold text-lg text-white btn-glow transition-all duration-300 bg-[length:200%_100%] hover:bg-right"
              >
                Start Forging — It&apos;s Free
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 glass rounded-2xl font-semibold text-white hover:bg-white/10 transition-all"
            >
              Watch Demo
            </motion.button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-20"
          >
            <Stat value="10K+" label="Sites Built" />
            <Stat value="<30s" label="Build Time" />
            <Stat value="99.9%" label="Uptime" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-purple-500/50 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-3 rounded-full bg-purple-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              How <span className="gradient-text">FORGE</span> Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three simple steps from idea to live website
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              icon="💭"
              title="Describe Your Vision"
              description="Tell us what you want in plain English. Be as detailed or simple as you like."
              delay={0.1}
            />
            <StepCard
              number="02"
              icon="🔥"
              title="Watch FORGE Build"
              description="Our AI crafts your pages, styles, and functionality in real-time."
              delay={0.2}
            />
            <StepCard
              number="03"
              icon="🚀"
              title="Launch Instantly"
              description="Your site goes live on a blazing-fast CDN with a custom URL. Done."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Start free. Scale when you&apos;re ready.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard
              name="Free"
              price="$0"
              period="/forever"
              features={[
                "1 site per month",
                "forge.app subdomain",
                "Basic templates",
                "Community support",
              ]}
              cta="Start Free"
              delay={0.1}
            />
            <PricingCard
              name="Pro"
              price="$19"
              period="/month"
              features={[
                "Unlimited sites",
                "Custom domains",
                "Premium templates",
                "Priority support",
                "Analytics dashboard",
                "No FORGE branding",
              ]}
              cta="Go Pro"
              featured
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center glass-card p-12 md:p-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">FORGE</span> your idea?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join 10,000+ creators who build with FORGE
          </p>
          <Link href="/build">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-xl text-white btn-glow"
            >
              Start Building Now — Free
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-500/20 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center">
                <span className="text-xl">🔥</span>
              </div>
              <span className="text-2xl font-bold gradient-text">FORGE</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Blog</a>
              <a href="#" className="hover:text-white transition-colors">Docs</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>

            <div className="flex gap-4">
              <SocialIcon icon="𝕏" />
              <SocialIcon icon="📷" />
              <SocialIcon icon="💬" />
            </div>
          </div>
          
          <div className="text-center text-gray-500 mt-12">
            <p>© 2024 FORGE. All rights reserved.</p>
            <p className="mt-2">Powered by Bobert 🤖</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold gradient-text">{value}</div>
      <div className="text-gray-400 mt-1">{label}</div>
    </div>
  );
}

function StepCard({
  number,
  icon,
  title,
  description,
  delay,
}: {
  number: string;
  icon: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className="glass-card p-8 relative group"
    >
      <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-sm font-bold opacity-60 group-hover:opacity-100 transition-opacity">
        {number}
      </div>
      <div className="text-5xl mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function PricingCard({
  name,
  price,
  period,
  features,
  cta,
  featured,
  delay,
}: {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  featured?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className={`glass-card p-8 relative ${featured ? "glow-purple" : ""}`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-semibold">
          Most Popular
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold gradient-text">{price}</span>
          <span className="text-gray-400">{period}</span>
        </div>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="text-green-400">✓</span>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <Link href="/build">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 rounded-xl font-semibold transition-all ${
            featured
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white btn-glow"
              : "glass text-white hover:bg-white/10"
          }`}
        >
          {cta}
        </motion.button>
      </Link>
    </motion.div>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-purple-500/20 transition-colors"
    >
      {icon}
    </motion.a>
  );
}
