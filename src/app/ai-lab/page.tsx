"use client";

import { useState } from "react";
import Link from "next/link";
import { TechLabel } from "@/components/TechLabel";
import { HandNote } from "@/components/HandNote";
import { FlowField } from "@/components/FlowField";
import { labData, LabItem } from "@/content/lab";
import { ArrowLeft, Terminal, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

export default function AILabPage() {
  const [selectedTag, setSelectedTag] = useState<string>("ALL");

  const filteredItems = selectedTag === "ALL"
    ? labData
    : labData.filter((item) => item.status.toUpperCase() === selectedTag);

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
          <TechLabel code="AI LAB" variant="red">RESEARCH SCRATCHPAD</TechLabel>
          <TechLabel code="TOTAL NOTES">{labData.length} ENTRIES</TechLabel>
        </div>
      </div>

      <div className="space-y-4 mb-10">
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-ink tracking-tight">
          AI LAB SCRATCHPAD
        </h1>
        <p className="font-editorial text-xl sm:text-2xl text-muted italic max-w-3xl">
          An ongoing engineering notebook documenting model evaluations, web scraping edge cases, game state space optimizations, and honest failure logs.
        </p>
      </div>

      {/* Tag Filter Pills */}
      <div className="flex flex-wrap items-center gap-3 border-b border-muted/20 pb-6 mb-10">
        <span className="font-technical text-xs text-muted mr-2">FILTER STATUS:</span>
        {["ALL", "LOGGED", "LEARNING", "PLANNED"].map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-1.5 font-technical text-xs rounded-full border transition-all ${
              selectedTag === tag
                ? "border-red bg-red text-white font-bold"
                : "border-muted/30 text-muted hover:border-ink"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Lab Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.map((item) => {
          const isLogged = item.status === "logged";
          const isLearning = item.status === "learning";

          return (
            <div
              key={item.id}
              className="p-6 md:p-8 border border-muted/30 rounded-2xl bg-bg/80 backdrop-blur-md space-y-5 hover:border-red transition-all shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-muted/15 pb-3">
                  <div className="flex items-center gap-2">
                    {isLogged && <CheckCircle2 className="w-4 h-4 text-red" />}
                    {isLearning && <AlertTriangle className="w-4 h-4 text-orange" />}
                    {!isLogged && !isLearning && <Clock className="w-4 h-4 text-muted" />}
                    <span className="font-technical text-xs font-bold text-ink uppercase">
                      {item.category}
                    </span>
                  </div>
                  <TechLabel
                    code="STATUS"
                    variant={isLogged ? "red" : isLearning ? "orange" : "muted"}
                  >
                    {item.status.toUpperCase()}
                  </TechLabel>
                </div>

                <div className="space-y-1">
                  <span className="font-technical text-[10px] text-muted">{item.date}</span>
                  <h2 className="font-display text-xl sm:text-2xl text-ink leading-[1.15]">{item.title}</h2>
                </div>

                <p className="font-editorial text-base text-ink/90 leading-relaxed">
                  {item.hypothesis}
                </p>

                {item.failureAnalysis && (
                  <div className="p-4 border border-red/20 rounded-xl bg-red/5 space-y-1">
                    <span className="font-technical text-[10px] text-red font-bold uppercase">
                      FAILURE / BOTTLENECK ANALYSIS:
                    </span>
                    <p className="font-editorial text-sm text-ink/90">
                      {item.failureAnalysis}
                    </p>
                  </div>
                )}

                {item.learnings && item.learnings.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-technical text-[10px] text-muted font-bold uppercase">
                      ITERATION LEARNINGS:
                    </span>
                    <ul className="space-y-1 font-editorial text-sm text-ink/80">
                      {item.learnings.map((l, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red font-bold">•</span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.codeSnippet && (
                  <div className="p-4 border border-muted/20 rounded-xl bg-ink/5 overflow-x-auto">
                    <div className="flex items-center gap-2 font-technical text-[10px] text-muted mb-2">
                      <Terminal className="w-3 h-3 text-red" />
                      <span>CODE INSIGHT</span>
                    </div>
                    <pre className="font-technical text-xs text-ink whitespace-pre">
                      {item.codeSnippet}
                    </pre>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-muted/15 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 font-technical text-[10px] border border-muted/20 rounded text-muted"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
