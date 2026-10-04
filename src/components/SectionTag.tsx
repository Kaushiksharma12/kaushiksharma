"use client";

import { useEffect, useState } from "react";

interface SectionTagProps {
  currentSection: string; // e.g. "01 / IDENTITY" | "02 / SELECTED WORK" | "03 / AI LAB"
}

export function SectionTag({ currentSection }: SectionTagProps) {
  const [displayTag, setDisplayTag] = useState(currentSection);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (currentSection !== displayTag) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setDisplayTag(currentSection);
        setAnimating(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [currentSection, displayTag]);

  return (
    <div className="fixed top-6 left-6 z-40 flex items-center gap-3 select-none pointer-events-none">
      <div className="w-2 h-2 rounded-full bg-red animate-pulse" />
      <div className="overflow-hidden h-5">
        <span
          className={`block font-technical text-xs tracking-widest text-ink transition-transform duration-300 ${
            animating ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {displayTag}
        </span>
      </div>
    </div>
  );
}
