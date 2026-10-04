"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FlowField } from "@/components/FlowField";
import { NameMark } from "@/components/NameMark";
import { HandNote } from "@/components/HandNote";
import { TechLabel } from "@/components/TechLabel";
import { SectionTag } from "@/components/SectionTag";
import { ProgressRail } from "@/components/ProgressRail";
import { profileData } from "@/content/profile";
import { projectsData } from "@/content/projects";
import { labData } from "@/content/lab";
import { ArrowRight, Terminal, Cpu, Layers } from "lucide-react";

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("01 / IDENTITY");
  const [labTopY, setLabTopY] = useState<number | null>(null);
  const [entranceStage, setEntranceStage] = useState(4);

  const labSectionRef = useRef<HTMLDivElement | null>(null);

  // Cinematic Entrance Sequence (Plays once per session)
  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("ks_entrance_seen");
      if (hasSeen) {
        setEntranceStage(4);
      } else {
        sessionStorage.setItem("ks_entrance_seen", "true");
        setEntranceStage(1);
        const t1 = setTimeout(() => setEntranceStage(2), 300);
        const t2 = setTimeout(() => setEntranceStage(3), 700);
        const t3 = setTimeout(() => setEntranceStage(4), 1100);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
        };
      }
    } catch (e) {
      setEntranceStage(4);
    }
  }, []);

  // Scroll Progress and Section Tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const p = totalScroll > 0 ? currentScroll / totalScroll : 0;
      setScrollProgress(p);

      if (labSectionRef.current) {
        const rect = labSectionRef.current.getBoundingClientRect();
        setLabTopY(rect.top);

        if (rect.top <= window.innerHeight * 0.5) {
          setCurrentSection("03 / AI LAB");
        } else if (currentScroll > window.innerHeight * 0.6) {
          setCurrentSection("02 / SELECTED WORK");
        } else {
          setCurrentSection("01 / IDENTITY");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pocketArcadeX = projectsData.find((p) => p.id === "pocketarcadex") || projectsData[0];

  return (
    <div className="relative min-h-screen">
      <ProgressRail progress={scrollProgress} />
      <SectionTag currentSection={currentSection} />
      <FlowField scrollProgress={scrollProgress} labTopY={labTopY} />

      {/* SECTION 01: IDENTITY HERO */}
      <section className="min-h-screen flex flex-col justify-between px-6 md:px-16 pt-24 pb-12 relative z-10 max-w-7xl mx-auto">
        {/* Top Technical Metadata Bar */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 transition-all duration-700 ${
            entranceStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="flex items-center gap-3">
            <TechLabel code="SYS-INIT" variant="red">
              LIVE SYSTEM // ON-LINE
            </TechLabel>
            <TechLabel code="LOC">MUMBAI, IN [19.0760° N, 72.8777° E]</TechLabel>
          </div>
          <TechLabel code="STACK">NEXT.JS 15 // TS // CANVAS 2D</TechLabel>
        </div>

        {/* Hero Name Treatment & Editorial Statement */}
        <div className="my-auto py-8">
          <div className="mb-4">
            <TechLabel code="FOCUS" variant="ink">
              {profileData.tagline}
            </TechLabel>
          </div>

          <NameMark entranceTriggered={entranceStage >= 2} />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8 items-end">
            <div
              className={`md:col-span-7 transition-all duration-1000 ${
                entranceStage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <p className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-ink leading-tight font-light">
                {profileData.editorialStatement}
              </p>
            </div>

            <div
              className={`md:col-span-5 flex flex-col items-start md:items-end gap-3 transition-all duration-1000 ${
                entranceStage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <HandNote arrow="right" underline={true}>
                Building Intelligent Applications →
              </HandNote>
              <p className="font-technical text-xs text-muted max-w-xs text-left md:text-right">
                B.Sc. Computer Science (AI & ML) • CGPA 7.83 <br />
                Autowhat AI Intern • Playwright & Next.js Systems
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Hero Gateway Bar */}
        <div className="flex items-center justify-between border-t border-muted/20 pt-6 text-xs font-technical text-muted">
          <span>SCROLL TO EXPLORE STORY</span>
          <span className="animate-bounce">↓ [02 SELECTED WORK]</span>
        </div>
      </section>

      {/* SECTION 02: SELECTED WORK GATEWAY */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 relative z-10 max-w-7xl mx-auto border-t border-muted/15">
        <div className="flex items-center gap-3 mb-8">
          <TechLabel code="02" variant="red">
            SELECTED WORK
          </TechLabel>
          <TechLabel code="FLAGSHIP">FEATURED ENGINEERING STORY</TechLabel>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Project Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="font-technical text-xs text-muted tracking-widest">
                01 // FEATURED PROJECT
              </span>
              <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl text-ink hover:text-red transition-colors duration-300">
                {pocketArcadeX.title.toUpperCase()}
              </h2>
              <p className="font-editorial text-xl sm:text-2xl text-muted italic">
                {pocketArcadeX.subtitle}
              </p>
            </div>

            <p className="font-editorial text-lg text-ink/90 leading-relaxed max-w-2xl">
              {pocketArcadeX.solution} Integrated 5 classic board games (Ludo, Chess, Tic-Tac-Toe, Connect 4, Snakes & Ladders) into a unified Progressive Web App featuring Minimax Bot decision trees and real-time room sync.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {pocketArcadeX.skillsShown.slice(0, 5).map((skill) => (
                <TechLabel key={skill} code="SKILL">
                  {skill}
                </TechLabel>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              <Link
                href="/work/pocketarcadex"
                className="group flex items-center gap-3 px-6 py-3.5 bg-ink text-bg font-technical text-xs tracking-wider rounded-full hover:bg-red hover:text-white transition-all duration-300 shadow-lg"
              >
                <span>EXPLORE POCKET ARCADEX CASE STUDY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <HandNote arrow="right" underline={false}>
                Interactive Minimax Tree Inside →
              </HandNote>
            </div>
          </div>

          {/* Right Column: Visual Teaser / Minimax Search Tree Mockup */}
          <div className="lg:col-span-5">
            <div className="p-6 border border-muted/30 rounded-2xl bg-bg/60 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-red transition-colors duration-500">
              <div className="flex items-center justify-between border-b border-muted/20 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-red" />
                  <span className="font-technical text-xs text-ink font-semibold">MINIMAX BOT ENGINE</span>
                </div>
                <TechLabel code="DEPTH">FULL SEARCH</TechLabel>
              </div>

              {/* Simplified Visual Minimax Tree Teaser */}
              <div className="space-y-4 py-4">
                <div className="flex justify-center">
                  <div className="px-3 py-1 bg-red/10 border border-red text-red font-technical text-xs rounded">
                    ROOT [SCORE: 0]
                  </div>
                </div>
                <div className="flex justify-around text-[10px] font-technical text-muted">
                  <div className="flex flex-col items-center">
                    <span className="h-4 w-px bg-muted/40 mb-1" />
                    <span className="px-2 py-0.5 border border-muted/30 rounded text-ink">MIN: -1</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="h-4 w-px bg-red mb-1" />
                    <span className="px-2 py-0.5 border border-red text-red font-bold rounded">MAX: +10</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="h-4 w-px bg-muted/40 mb-1" />
                    <span className="px-2 py-0.5 border border-muted/30 rounded text-ink">MIN: 0</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-muted/20 pt-3 flex justify-between items-center text-[10px] font-technical text-muted">
                <span>STATES SEARCHED: 255,168</span>
                <span className="text-red font-semibold">OPTIMAL MOVE CHOSEN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: AI LAB SCENE (ALWAYS DARK #0c0908) */}
      <section
        ref={labSectionRef}
        className="min-h-screen bg-[#0c0908] text-[#ece4d6] px-6 md:px-16 py-24 relative z-10 transition-colors duration-700"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ece4d6]/15 pb-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <TechLabel code="03" variant="red">
                  AI LAB & RESEARCH
                </TechLabel>
                <TechLabel code="ROOM">DIFFERENT ROOM OF THE SAME WORLD</TechLabel>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl text-[#ece4d6]">
                EXPERIMENTAL SCRATCHPAD
              </h2>
            </div>
            <div className="text-right">
              <HandNote arrow="down" underline={false} className="!text-[#c9382e]">
                One experiment at a time.
              </HandNote>
              <p className="font-technical text-xs text-[#968c7e] mt-1">
                Honest Learning Log & Failure Notes
              </p>
            </div>
          </div>

          {/* Experiment List */}
          <div className="space-y-6">
            {labData.map((exp) => (
              <div
                key={exp.id}
                className="p-6 border border-[#ece4d6]/10 rounded-xl bg-[#14100e] hover:border-[#c9382e] transition-all duration-300 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-technical text-xs text-[#c9382e] font-semibold">
                      [{exp.sysId}]
                    </span>
                    <span className="font-technical text-xs text-[#968c7e]">• {exp.category}</span>
                  </div>

                  <span
                    className={`font-technical text-[10px] px-2 py-0.5 rounded border uppercase ${
                      exp.status === "logged"
                        ? "border-[#c9382e] text-[#c9382e] bg-[#c9382e]/10"
                        : exp.status === "learning"
                        ? "border-[#e58b3a] text-[#e58b3a] bg-[#e58b3a]/10"
                        : "border-[#968c7e] text-[#968c7e]"
                    }`}
                  >
                    STATUS: {exp.status}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl text-[#ece4d6] group-hover:text-[#c9382e] transition-colors mb-2">
                  {exp.title}
                </h3>

                <p className="font-editorial text-[#968c7e] text-base mb-4 max-w-4xl">
                  {exp.summary}
                </p>

                {/* Failure Log Note */}
                <div className="p-3 border-l-2 border-[#c9382e] bg-[#0c0908] rounded-r text-sm space-y-1">
                  <span className="font-technical text-[10px] text-[#c9382e] block">
                    FAILURE / ITERATION LOG:
                  </span>
                  <p className="font-editorial italic text-[#ece4d6]/90">{exp.findingOrFailure}</p>
                  <p className="font-handwritten text-base text-[#c9382e] pt-1">
                    "{exp.handwrittenNote}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/ai-lab"
              className="inline-flex items-center gap-3 px-6 py-3 border border-[#c9382e] text-[#c9382e] font-technical text-xs rounded-full hover:bg-[#c9382e] hover:text-white transition-all"
            >
              <span>VIEW FULL AI LAB INDEX</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-bg border-t border-muted/20 py-12 px-6 md:px-16 text-xs font-technical text-muted relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-ink font-bold">KAUSHIK SHARMA</span> // AI/ML ENGINEER & DEVELOPER
            <p className="mt-1">MUMBAI, MAHARASHTRA • B.SC. COMPUTER SCIENCE (AI & ML)</p>
          </div>
          <div className="flex items-center gap-6">
            <a href={profileData.github} target="_blank" rel="noreferrer" className="hover:text-red">
              GITHUB
            </a>
            <a href={profileData.linkedin} target="_blank" rel="noreferrer" className="hover:text-red">
              LINKEDIN
            </a>
            <a href={`mailto:${profileData.email}`} className="hover:text-red">
              EMAIL
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
