import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FORGE - Build Websites with AI",
  description: "Describe it. We build it. You launch it. The AI-powered website builder that turns your ideas into live websites in seconds.",
  keywords: ["website builder", "AI", "no-code", "web development", "deploy"],
  authors: [{ name: "FORGE" }],
  openGraph: {
    title: "FORGE - Build Websites with AI",
    description: "Turn your ideas into live websites in seconds",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen bg-[#030014]">
        {children}
      </body>
    </html>
  );
}
