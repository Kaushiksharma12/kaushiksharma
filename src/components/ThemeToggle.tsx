"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("ks_portfolio_theme") as "light" | "dark" | null;
      if (stored) {
        setTheme(stored);
        document.documentElement.classList.toggle("dark", stored === "dark");
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      }
    } catch (e) {
      console.warn("localStorage access denied", e);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    try {
      localStorage.setItem("ks_portfolio_theme", nextTheme);
    } catch (e) {
      console.warn("localStorage write failed", e);
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="fixed top-5 right-5 z-50 flex items-center gap-2 px-3 py-1.5 border border-muted/30 rounded-full bg-bg/80 backdrop-blur-md text-ink hover:border-red transition-all duration-300 group"
    >
      <span className="font-technical text-[10px]">
        {theme === "light" ? "DAY // #efe9dc" : "NIGHT // #0e0c0b"}
      </span>
      {theme === "light" ? (
        <Sun className="w-3.5 h-3.5 text-orange group-hover:rotate-45 transition-transform duration-500" />
      ) : (
        <Moon className="w-3.5 h-3.5 text-red group-hover:-rotate-12 transition-transform duration-500" />
      )}
    </button>
  );
}
