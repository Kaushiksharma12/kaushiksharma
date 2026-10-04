"use client";

import { useState } from "react";
import Link from "next/link";
import { TechLabel } from "@/components/TechLabel";
import { HandNote } from "@/components/HandNote";
import { FlowField } from "@/components/FlowField";
import { capabilitiesData, toolsData, CapabilityNode } from "@/content/skills";
import { ArrowLeft, Network, Cpu, Layers } from "lucide-react";

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeNode, setActiveNode] = useState<CapabilityNode>(capabilitiesData[0]);

  const categories = ["ALL", "AI/ML", "Data & Analytics", "Engineering & Automation", "Core Systems"];

  const filteredNodes = selectedCategory === "ALL"
    ? capabilitiesData
    : capabilitiesData.filter((node) => node.category === selectedCategory);

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
          <TechLabel code="CAPABILITIES" variant="red">CONNECTED GRAPH</TechLabel>
          <TechLabel code="TOTAL NODES">{capabilitiesData.length} SKILL NODES</TechLabel>
        </div>
      </div>

      <div className="space-y-4 mb-10">
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-ink tracking-tight">
          TECHNICAL CAPABILITIES
        </h1>
        <p className="font-editorial text-xl sm:text-2xl text-muted italic max-w-3xl">
          A connected capability graph mapping core AI/ML algorithms, data engineering tools, web scraping architectures, and modern web frameworks to practical implementations.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-3 border-b border-muted/20 pb-6 mb-10">
        <span className="font-technical text-xs text-muted mr-2">CATEGORY FILTER:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 font-technical text-xs rounded-full border transition-all ${
              selectedCategory === cat
                ? "border-red bg-red text-white font-bold"
                : "border-muted/30 text-muted hover:border-ink"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Skill Nodes List */}
        <div className="lg:col-span-6 space-y-4">
          <span className="font-technical text-xs text-muted block mb-2">
            SELECT A CAPABILITY NODE TO INSPECT GRAPH CONNECTIONS:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredNodes.map((node) => {
              const isActive = activeNode.id === node.id;

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`p-4 border rounded-xl font-technical text-left transition-all duration-300 ${
                    isActive
                      ? "border-red bg-red/10 text-red shadow-[0_0_15px_rgba(201,56,46,0.25)] scale-[1.02]"
                      : "border-muted/30 bg-bg/70 text-ink hover:border-red"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm">{node.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-muted mt-2">
                    <span>[{node.category}]</span>
                    <TechLabel code="DEPTH" variant={node.depth === "Applied" ? "red" : "muted"}>
                      {node.depth}
                    </TechLabel>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Node Connection Inspector */}
        <div className="lg:col-span-6 p-6 md:p-8 border border-muted/30 rounded-2xl bg-bg/80 backdrop-blur-md space-y-6 shadow-xl sticky top-24">
          <div className="flex items-center justify-between border-b border-muted/20 pb-4">
            <div className="flex items-center gap-3">
              <Network className="w-5 h-5 text-red" />
              <h2 className="font-display text-2xl text-ink">{activeNode.name}</h2>
            </div>
            <TechLabel code="DEPTH" variant="red">{activeNode.depth}</TechLabel>
          </div>

          <p className="font-editorial text-lg text-ink/90 leading-relaxed">
            {activeNode.description}
          </p>

          {/* Connected Graph Nodes */}
          <div className="space-y-3">
            <span className="font-technical text-xs font-bold text-muted uppercase">
              GRAPH CONNECTIONS:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeNode.connections.map((connId) => {
                const connected = capabilitiesData.find((c) => c.id === connId);
                return (
                  <button
                    key={connId}
                    onClick={() => connected && setActiveNode(connected)}
                    className="px-3 py-1 font-technical text-xs border border-red/40 rounded-full bg-red/5 text-red hover:bg-red hover:text-white transition-all"
                  >
                    → {connected ? connected.name : connId}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tooling Directory */}
          <div className="space-y-3 pt-4 border-t border-muted/20">
            <span className="font-technical text-xs font-bold text-ink uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-red" /> TOOLING DIRECTORY:
            </span>
            <div className="flex flex-wrap gap-2">
              {toolsData.map((tool) => (
                <span
                  key={tool.name}
                  className="px-2.5 py-1 font-technical text-xs border border-muted/20 rounded bg-ink/5 text-ink"
                >
                  {tool.name}
                </span>
              ))}
            </div>
          </div>

          <HandNote arrow="right" underline={false}>
            Node connected into production codebases.
          </HandNote>
        </div>
      </div>
    </div>
  );
}
