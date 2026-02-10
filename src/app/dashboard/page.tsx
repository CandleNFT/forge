"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { Navigation } from "@/components/Navigation";

// Mock data for demo
const mockSites = [
  {
    id: "1",
    name: "My Portfolio",
    url: "https://my-portfolio-a1b2c3.vercel.app",
    createdAt: "2024-01-15",
    status: "live",
    description: "Personal portfolio website with dark theme",
  },
  {
    id: "2",
    name: "Coffee Shop Landing",
    url: "https://coffee-shop-d4e5f6.vercel.app",
    createdAt: "2024-01-12",
    status: "live",
    description: "Landing page for local coffee shop",
  },
  {
    id: "3",
    name: "Tech Startup Site",
    url: "https://tech-startup-g7h8i9.vercel.app",
    createdAt: "2024-01-10",
    status: "building",
    description: "Modern SaaS landing page with animations",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen relative">
      <FloatingOrbs />
      <Navigation />

      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Your <span className="gradient-text">Sites</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Manage and monitor your forged creations
              </p>
            </div>
            <Link href="/build">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white btn-glow flex items-center gap-2"
              >
                <span className="text-xl">+</span>
                Create New Site
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <StatCard label="Total Sites" value="3" icon="🌐" />
            <StatCard label="Live" value="2" icon="🟢" />
            <StatCard label="Building" value="1" icon="⚡" />
            <StatCard label="This Month" value="2" icon="📅" />
          </motion.div>

          {/* Sites Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSites.map((site, index) => (
              <SiteCard key={site.id} site={site} index={index} />
            ))}
            
            {/* Add New Site Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + mockSites.length * 0.1 }}
            >
              <Link href="/build">
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-card h-full min-h-[280px] p-6 flex flex-col items-center justify-center cursor-pointer group border-2 border-dashed border-purple-500/30 hover:border-purple-500/60 transition-all"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center mb-4 group-hover:from-purple-600/40 group-hover:to-pink-600/40 transition-all"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-3xl">+</span>
                  </motion.div>
                  <span className="text-lg font-semibold text-gray-400 group-hover:text-white transition-colors">
                    Create New Site
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Empty State (when no sites) */}
          {mockSites.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-12 text-center"
            >
              <div className="text-6xl mb-6">🏗️</div>
              <h2 className="text-2xl font-bold mb-4">No sites yet</h2>
              <p className="text-gray-400 mb-8">
                Create your first website and see it appear here
              </p>
              <Link href="/build">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white btn-glow"
                >
                  Create Your First Site
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-3xl font-bold gradient-text">{value}</span>
      </div>
      <span className="text-gray-400 text-sm">{label}</span>
    </motion.div>
  );
}

function SiteCard({
  site,
  index,
}: {
  site: {
    id: string;
    name: string;
    url: string;
    createdAt: string;
    status: string;
    description: string;
  };
  index: number;
}) {
  const isLive = site.status === "live";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      whileHover={{ y: -4 }}
      className="glass-card p-6 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-xl">
            {site.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-lg">{site.name}</h3>
            <span
              className={`text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 ${
                isLive
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isLive ? "bg-green-400 animate-pulse" : "bg-yellow-400"
                }`}
              />
              {isLive ? "Live" : "Building"}
            </span>
          </div>
        </div>
        
        {/* Actions Menu */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          ⋮
        </motion.button>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 flex-1">
        {site.description}
      </p>

      {/* URL */}
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-purple-400 hover:text-pink-400 transition-colors truncate mb-4"
      >
        {site.url.replace("https://", "")}
      </a>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
        <span className="text-xs text-gray-500">
          Created {new Date(site.createdAt).toLocaleDateString()}
        </span>
        <div className="flex gap-2">
          <motion.a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 glass rounded-lg text-sm font-medium hover:bg-white/10 transition-all"
          >
            Visit →
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
