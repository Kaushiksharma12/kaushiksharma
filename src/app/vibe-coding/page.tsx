"use client";

import Link from "next/link";
import { TechLabel } from "@/components/TechLabel";
import { HandNote } from "@/components/HandNote";
import { FlowField } from "@/components/FlowField";
import { ArrowLeft, Sparkles, Terminal, Cpu, Workflow, ShieldCheck, Repeat } from "lucide-react";

const toolchainSteps = [
  {
    step: "01",
    title: "AI-DRIVEN ARCHITECTURE & PROTOTYPING",
    description: "Rapid iteration using LLM agents, Next.js App Router, and TypeScript schemas to turn complex specifications into working software foundations.",
    tools: ["Next.js 15", "TypeScript", "Tailwind CSS"]
  },
  {
    step: "02",
    title: "AUTOMATED END-TO-END FEEDBACK LOOPS",
    description: "Integrating headless Playwright and automated browser testing to continuously validate user interactions, state transitions, and edge cases.",
    tools: ["Playwright", "Headless Chromium", "CI Automation"]
  },
  {
    step: "03",
    title: "WORKFLOW ORCHESTRATION & CAPACITOR NATIVE WRAPPERS",
    description: "Packaging responsive web applications into cross-platform PWAs and native mobile bundles with automated n8n webhook triggers.",
    tools: ["Capacitor", "PWA Manifest", "n8n Workflows"]
  }
];

export default function VibeCodingPage() {
  return (
    <div className="relative min-h-screen px-6 md:px-16 pt-24 pb-20 max-w-7xl mx-auto">
      <FlowField calmMode={true} />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-technical text-xs text-muted hover:text-red transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOME</span>
        </Link>
        <div className="flex items-center gap-2">
          <TechLabel code="VIBE CODING" variant="red">DEVELOPMENT PHILOSOPHY</TechLabel>
          <TechLabel code="LOOP">AI AGENT + CODE</TechLabel>
        </div>
      </div>

      <div className="space-y-4 mb-12">
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-ink tracking-tight">
          VIBE CODING MANIFESTO
        </h1>
        <p className="font-editorial text-xl sm:text-2xl text-muted italic max-w-3xl">
          &quot;Vibe coding is not about writing fewer lines of code—it is about elevating developer focus from boilerplate syntax to architectural leverage, high-fidelity user experiences, and automated verification loops.&quot;
        </p>
      </div>

      {/* Workflow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        {toolchainSteps.map((item) => (
          <div
            key={item.step}
            className="p-6 md:p-8 border border-muted/30 rounded-2xl bg-bg/80 backdrop-blur-md space-y-5 hover:border-red transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-muted/20 pb-3">
                <span className="font-display text-3xl text-red">{item.step}</span>
                <TechLabel code="PHASE">{item.title.split(" ")[0]}</TechLabel>
              </div>
              <h2 className="font-display text-xl sm:text-2xl text-ink leading-[1.15]">{item.title}</h2>
              <p className="font-editorial text-base text-ink/90 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-muted/20 flex flex-wrap gap-2">
              {item.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 font-technical text-xs border border-muted/20 rounded bg-ink/5 text-ink"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 border border-muted/30 rounded-2xl bg-bg/60 space-y-6 my-12">
        <div className="flex items-center gap-3 border-b border-muted/20 pb-4">
          <Sparkles className="w-5 h-5 text-red" />
          <h2 className="font-display text-3xl text-ink">THE AGENTIC DEVELOPMENT ADVANTAGE</h2>
        </div>
        <p className="font-editorial text-lg text-ink/90 leading-relaxed">
          By pairing modern generative AI models with strict TypeScript schemas, automated browser validation, and continuous visual testing, development cycles collapse from weeks to hours without compromising code quality or performance.
        </p>
        <HandNote arrow="right" underline={false}>
          Building the future of software engineering at high speed.
        </HandNote>
      </div>
    </div>
  );
}
