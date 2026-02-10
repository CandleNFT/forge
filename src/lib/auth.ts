"use client";

const VERCEL_TOKEN_KEY = "forge_vercel_token";

export function getVercelToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(VERCEL_TOKEN_KEY);
}

export function setVercelToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(VERCEL_TOKEN_KEY, token);
}

export function clearVercelToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(VERCEL_TOKEN_KEY);
}

export function isSetupComplete(): boolean {
  return !!getVercelToken();
}
