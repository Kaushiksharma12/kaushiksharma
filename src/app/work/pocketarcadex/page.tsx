"use client";

import Link from "next/link";
import { TechLabel } from "@/components/TechLabel";
import { HandNote } from "@/components/HandNote";
import { FlowField } from "@/components/FlowField";
import { MinimaxTree } from "@/components/MinimaxTree";
import { TicTacToeGame } from "@/components/TicTacToeGame";
import { projectsData } from "@/content/projects";
import { ArrowLeft, ExternalLink, Github, Cpu, Layers, ShieldCheck, Zap } from "lucide-react";

export default function PocketArcadeXPage() {
  const project = projectsData.find((p) => p.id === "pocketarcadex") || projectsData[0];

  return (
    <div className="relative min-h-screen px-6 md:px-16 pt-24 pb-20 max-w-7xl mx-auto">
      <FlowField calmMode={true} />

      {/* Back Button & Section Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-technical text-xs text-muted hover:text-red transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO LANDING STORY</span>
        </Link>
        <div className="flex items-center gap-2">
          <TechLabel code="CASE STUDY" variant="red">FLAGSHIP ENGINEERING</TechLabel>
          <TechLabel code="TYPE">{project.type}</TechLabel>
        </div>
      </div>

      {/* Hero Title & Subtitle */}
      <div className="space-y-4 mb-12">
        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl text-ink tracking-tight">
          POCKET ARCADEX
        </h1>
        <p className="font-editorial text-2xl sm:text-3xl text-muted italic max-w-3xl">
          {project.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-bg font-technical text-xs rounded-full hover:bg-red hover:text-white transition-all shadow-md"
          >
            <span>LAUNCH LIVE DEMO</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/Kaushiksharma12"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-muted/30 font-technical text-xs text-ink rounded-full hover:border-red transition-all"
          >
            <Github className="w-4 h-4" />
            <span>VIEW SOURCE ON GITHUB</span>
          </a>
        </div>
      </div>

      {/* Grid Overview: Purpose, Problem, Solution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        <div className="p-6 border border-muted/20 rounded-xl bg-bg/80 space-y-3">
          <div className="flex items-center gap-2 text-red font-technical text-xs font-bold">
            <Zap className="w-4 h-4" />
            <span>01 // PURPOSE</span>
          </div>
          <p className="font-editorial text-lg text-ink/90">{project.purpose}</p>
        </div>

        <div className="p-6 border border-muted/20 rounded-xl bg-bg/80 space-y-3">
          <div className="flex items-center gap-2 text-orange font-technical text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>02 // PROBLEM</span>
          </div>
          <p className="font-editorial text-lg text-ink/90">{project.problem}</p>
        </div>

        <div className="p-6 border border-muted/20 rounded-xl bg-bg/80 space-y-3">
          <div className="flex items-center gap-2 text-ink font-technical text-xs font-bold">
            <Layers className="w-4 h-4" />
            <span>03 // SOLUTION</span>
          </div>
          <p className="font-editorial text-lg text-ink/90">{project.solution}</p>
        </div>
      </div>

      {/* Interactive Visual Hero Component: Minimax Tree */}
      <section className="my-16">
        <div className="mb-4">
          <TechLabel code="HERO VISUAL" variant="red">DECISION ALGORITHM INTERACTIVE EXPLORER</TechLabel>
        </div>
        <MinimaxTree />
      </section>

      {/* Playable Game Engine Component */}
      <section className="my-16">
        <div className="mb-4">
          <TechLabel code="INTERACTIVE DEMO" variant="ink">MINIMAX BOT GAME ENGINE</TechLabel>
        </div>
        <TicTacToeGame />
      </section>

      {/* Technical Decisions & Engineering Insights */}
      <section className="my-16 p-8 border border-muted/30 rounded-2xl bg-bg/60 space-y-6">
        <div className="flex items-center gap-3 border-b border-muted/20 pb-4">
          <Cpu className="w-5 h-5 text-red" />
          <h2 className="font-display text-3xl text-ink">ENGINEERING DECISIONS & METRICS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-technical text-xs text-red font-bold uppercase tracking-wider">
              INTERESTING DECISIONS:
            </h3>
            <ul className="space-y-3 font-editorial text-base text-ink/90">
              {project.decisions.map((dec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red font-bold">•</span>
                  <span>{dec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-technical text-xs text-ink font-bold uppercase tracking-wider">
              KEY HIGHLIGHTS & ARCHITECTURE:
            </h3>
            <ul className="space-y-3 font-editorial text-base text-ink/90">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-orange font-bold">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-muted/20 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <TechLabel key={tech} code="TECH">
              {tech}
            </TechLabel>
          ))}
        </div>
      </section>
    </div>
  );
}
