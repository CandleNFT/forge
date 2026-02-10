"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { isSetupComplete, clearVercelToken } from "@/lib/auth";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(isSetupComplete());
  }, []);

  const handleDisconnect = () => {
    clearVercelToken();
    setIsConnected(false);
    window.location.href = "/setup";
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-2xl px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">🔥</span>
            </motion.div>
            <span className="text-2xl font-bold gradient-text">FORGE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/#how-it-works">How it Works</NavLink>
            <NavLink href="/#pricing">Pricing</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            
            {/* Vercel Connection Status */}
            {isConnected && (
              <div className="relative group">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30"
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-green-400">Vercel Connected</span>
                </motion.div>
                
                {/* Dropdown on hover */}
                <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="glass rounded-xl p-2 min-w-[160px]">
                    <button
                      onClick={handleDisconnect}
                      className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/build">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white btn-glow transition-all duration-300 hover:from-purple-500 hover:to-pink-500"
              >
                Start Building
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span 
              className="w-6 h-0.5 bg-white rounded-full"
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
            />
            <motion.span 
              className="w-6 h-0.5 bg-white rounded-full"
              animate={{ opacity: isOpen ? 0 : 1 }}
            />
            <motion.span 
              className="w-6 h-0.5 bg-white rounded-full"
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ 
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0 
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="glass rounded-2xl mt-2 p-6 flex flex-col gap-4">
            <MobileNavLink href="/#how-it-works" onClick={() => setIsOpen(false)}>
              How it Works
            </MobileNavLink>
            <MobileNavLink href="/#pricing" onClick={() => setIsOpen(false)}>
              Pricing
            </MobileNavLink>
            <MobileNavLink href="/dashboard" onClick={() => setIsOpen(false)}>
              Dashboard
            </MobileNavLink>
            
            {/* Mobile Vercel Status */}
            {isConnected && (
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-green-400">Vercel Connected</span>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
            
            <Link href="/build" onClick={() => setIsOpen(false)}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white mt-2"
              >
                Start Building
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <motion.span 
        className="text-gray-300 hover:text-white transition-colors relative group"
        whileHover={{ y: -2 }}
      >
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
      </motion.span>
    </Link>
  );
}

function MobileNavLink({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <span className="text-gray-300 hover:text-white transition-colors text-lg">
        {children}
      </span>
    </Link>
  );
}
