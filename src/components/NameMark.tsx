"use client";

import { useEffect, useState } from "react";

interface NameMarkProps {
  entranceTriggered?: boolean;
}

export function NameMark({ entranceTriggered = true }: NameMarkProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative inline-block select-none py-2 w-full max-w-full overflow-hidden">
      {/* Stacked Asymmetric Name Display */}
      <div className="flex flex-col items-start leading-[0.82] tracking-tighter w-full">
        {/* Line 1: KAUSHIK */}
        <div
          className={`font-display text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[7.8vw] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#d9772b] via-[#a3201a] to-[#14110f] dark:from-[#e58b3a] dark:via-[#c9382e] dark:to-[#ece4d6] transition-all duration-1000 ${
            entranceTriggered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            WebkitBackgroundClip: "text",
            backgroundSize: "200% 200%",
            animation: "driftGradient 18s ease infinite alternate",
          }}
        >
          KAUSHIK
        </div>

        {/* Line 2: SHARMA (Asymmetrically Offset to the Right) */}
        <div
          className={`font-display text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[7.8vw] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#a3201a] via-[#d9772b] to-[#14110f] dark:from-[#c9382e] dark:via-[#e58b3a] dark:to-[#ece4d6] ml-[6vw] sm:ml-[8vw] md:ml-[10vw] transition-all duration-1000 delay-200 ${
            entranceTriggered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            WebkitBackgroundClip: "text",
            backgroundSize: "200% 200%",
            animation: "driftGradient 22s ease infinite alternate-reverse",
          }}
        >
          SHARMA
        </div>
      </div>

      <style jsx>{`
        @keyframes driftGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
