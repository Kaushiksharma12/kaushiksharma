"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "01 / HOME" },
    { href: "/work/pocketarcadex", label: "02 / SELECTED WORK" },
    { href: "/ai-lab", label: "03 / AI LAB" },
    { href: "/skills", label: "04 / CAPABILITIES" },
    { href: "/vibe-coding", label: "05 / VIBE CODING" },
    { href: "/experience", label: "06 / EXPERIENCE" },
    { href: "/education", label: "07 / EDUCATION" },
    { href: "/about", label: "08 / ABOUT" },
    { href: "/resume", label: "09 / RESUME" },
    { href: "/contact", label: "10 / CONTACT" },
  ];

  return (
    <>
      {/* Desktop Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-30 px-6 py-5 flex items-center justify-between pointer-events-none">
        {/* Left space reserved for SectionTag */}
        <div className="w-48" />

        {/* Center Desktop Links */}
        <nav className="hidden xl:flex items-center gap-6 pointer-events-auto bg-bg/70 backdrop-blur-md px-6 py-2 border border-muted/20 rounded-full">
          {links.slice(0, 5).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-technical text-[11px] tracking-wider transition-colors duration-300 ${
                  isActive ? "text-red font-bold" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Menu Trigger for Full Menu & Mobile */}
        <div className="pointer-events-auto flex items-center gap-3 mr-16">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            className="flex items-center gap-2 px-3.5 py-1.5 border border-muted/30 rounded-full bg-bg/80 backdrop-blur-md font-technical text-xs text-ink hover:border-red transition-all"
          >
            <span>{open ? "CLOSE" : "MENU"}</span>
            {open ? <X className="w-3.5 h-3.5 text-red" /> : <Menu className="w-3.5 h-3.5 text-ink" />}
          </button>
        </div>
      </header>

      {/* Full Overlay Editorial Menu */}
      <div
        className={`fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl flex flex-col justify-between p-8 md:p-16 transition-all duration-500 ease-in-out ${
          open ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="flex justify-between items-center border-b border-muted/20 pb-6">
          <span className="font-technical text-xs text-muted">NAVIGATE // INDEX</span>
          <button
            onClick={() => setOpen(false)}
            className="font-technical text-xs text-red hover:underline flex items-center gap-2"
          >
            CLOSE [ESC] <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto max-w-5xl mx-auto w-full">
          {links.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 py-2 border-b border-muted/15"
              >
                <span className="font-technical text-xs text-muted group-hover:text-red transition-colors">
                  0{idx + 1}
                </span>
                <span
                  className={`font-display text-2xl sm:text-4xl transition-all duration-300 ${
                    isActive ? "text-red font-bold" : "text-ink group-hover:translate-x-3 group-hover:text-red"
                  }`}
                >
                  {link.label.split("/")[1].trim()}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-muted/20 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted font-technical">
          <span>KAUSHIK SHARMA // AI/ML ENGINEER & DEVELOPER</span>
          <span>MUMBAI, MAHARASHTRA</span>
        </div>
      </div>
    </>
  );
}
