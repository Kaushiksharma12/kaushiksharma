"use client";

import { useState } from "react";
import { TechLabel } from "./TechLabel";
import { HandNote } from "./HandNote";
import { Cpu, Eye, Network } from "lucide-react";

interface TreeNode {
  id: string;
  depth: number;
  type: "MAX" | "MIN";
  score: number;
  move: string;
  board: (string | null)[];
  description: string;
  isOptimal?: boolean;
  children?: TreeNode[];
}

const sampleTreeData: TreeNode = {
  id: "root",
  depth: 0,
  type: "MAX",
  score: 10,
  move: "Center [1,1]",
  board: ["O", "X", "O", null, "X", null, null, null, null],
  description: "Root State: Bot evaluates all 5 open squares. Optimal move chosen at Center (index 4) leading to guaranteed win branch.",
  isOptimal: true,
  children: [
    {
      id: "node-1",
      depth: 1,
      type: "MIN",
      score: -10,
      move: "Top-Left [0,0]",
      board: ["O", "X", "O", "X", "X", null, null, null, null],
      description: "Sub-optimal branch: Opponent blocks center line, forcing score drop to -10.",
      isOptimal: false,
    },
    {
      id: "node-2",
      depth: 1,
      type: "MIN",
      score: 10,
      move: "Center-Right [1,2]",
      board: ["O", "X", "O", null, "X", "X", null, null, null],
      description: "Optimal Branch: Threat created on diagonal. Opponent cannot block both winning paths.",
      isOptimal: true,
      children: [
        {
          id: "node-2-1",
          depth: 2,
          type: "MAX",
          score: 10,
          move: "Bottom-Right [2,2]",
          board: ["O", "X", "O", null, "X", "X", null, null, "X"],
          description: "Terminal Leaf Node: Bot completes diagonal win. Score +10 evaluated.",
          isOptimal: true,
        },
        {
          id: "node-2-2",
          depth: 2,
          type: "MAX",
          score: 0,
          move: "Bottom-Left [2,0]",
          board: ["O", "X", "O", null, "X", "X", "O", null, null],
          description: "Draw Branch: Opponent blocks diagonal line.",
          isOptimal: false,
        }
      ]
    },
    {
      id: "node-3",
      depth: 1,
      type: "MIN",
      score: 0,
      move: "Bottom-Center [2,1]",
      board: ["O", "X", "O", null, "X", null, null, "O", null],
      description: "Neutral Branch: Leads to deterministic draw (Score 0).",
      isOptimal: false,
    }
  ]
};

export function MinimaxTree() {
  const [activeNode, setActiveNode] = useState<TreeNode>(sampleTreeData);
  const [highlightedPath, setHighlightedPath] = useState<string[]>(["root", "node-2", "node-2-1"]);

  const isHighlighted = (id: string) => highlightedPath.includes(id);

  return (
    <div className="p-6 md:p-8 border border-muted/30 rounded-2xl bg-bg/70 backdrop-blur-md shadow-2xl my-8">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-muted/20 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-red" />
          <span className="font-display text-xl sm:text-2xl text-ink">MINIMAX SEARCH TREE EXPLORER</span>
        </div>
        <div className="flex items-center gap-2">
          <TechLabel code="ALGO" variant="red">STATE SPACE PRUNING</TechLabel>
          <TechLabel code="DEPTH">LOOKAHEAD 9</TechLabel>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive Tree Nodes Diagram */}
        <div className="lg:col-span-7 space-y-6">
          <div className="text-center font-technical text-xs text-muted mb-2">
            HOVER OR TAP NODES TO TRACE OPTIMAL PATH // RED HIGHLIGHT = CHOSEN MINIMAX PATH
          </div>

          {/* Root Level */}
          <div className="flex justify-center">
            <button
              onMouseEnter={() => {
                setActiveNode(sampleTreeData);
                setHighlightedPath(["root"]);
              }}
              className={`p-3 border rounded-xl font-technical text-xs transition-all duration-300 ${
                isHighlighted("root")
                  ? "border-red bg-red/10 text-red shadow-[0_0_15px_rgba(201,56,46,0.3)] scale-105"
                  : "border-muted/30 bg-bg text-ink hover:border-red"
              }`}
            >
              <span className="block font-bold">ROOT [DEPTH 0]</span>
              <span className="text-[10px] opacity-80">SCORE: +10 (MAX)</span>
            </button>
          </div>

          {/* Connector Lines */}
          <div className="flex justify-around items-center px-12">
            <div className={`h-6 w-0.5 transition-colors ${isHighlighted("node-1") ? "bg-red" : "bg-muted/30"}`} />
            <div className={`h-6 w-0.5 transition-colors ${isHighlighted("node-2") ? "bg-red" : "bg-muted/30"}`} />
            <div className={`h-6 w-0.5 transition-colors ${isHighlighted("node-3") ? "bg-red" : "bg-muted/30"}`} />
          </div>

          {/* Level 1 MIN Nodes */}
          <div className="flex justify-between items-center gap-2">
            {sampleTreeData.children?.map((child) => (
              <button
                key={child.id}
                onMouseEnter={() => {
                  setActiveNode(child);
                  setHighlightedPath(["root", child.id]);
                }}
                className={`flex-1 p-2.5 border rounded-xl font-technical text-[11px] text-center transition-all duration-300 ${
                  isHighlighted(child.id)
                    ? "border-red bg-red/10 text-red shadow-[0_0_12px_rgba(201,56,46,0.3)] scale-105"
                    : "border-muted/30 bg-bg text-ink hover:border-red"
                }`}
              >
                <span className="block font-semibold">{child.move}</span>
                <span className="text-[10px] opacity-75">MIN: {child.score}</span>
              </button>
            ))}
          </div>

          {/* Connector to Level 2 */}
          <div className="flex justify-center">
            <div className={`h-6 w-0.5 transition-colors ${isHighlighted("node-2-1") ? "bg-red" : "bg-muted/30"}`} />
          </div>

          {/* Level 2 MAX Terminal Leaf Nodes */}
          <div className="flex justify-center gap-4">
            {sampleTreeData.children?.[1].children?.map((leaf) => (
              <button
                key={leaf.id}
                onMouseEnter={() => {
                  setActiveNode(leaf);
                  setHighlightedPath(["root", "node-2", leaf.id]);
                }}
                className={`px-4 py-2 border rounded-xl font-technical text-[10px] transition-all duration-300 ${
                  isHighlighted(leaf.id)
                    ? "border-red bg-red/10 text-red font-bold shadow-[0_0_12px_rgba(201,56,46,0.3)]"
                    : "border-muted/30 bg-bg text-muted hover:border-red"
                }`}
              >
                <span>LEAF: {leaf.move} [MAX {leaf.score}]</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Node Details & Mini Game Board Inspection */}
        <div className="lg:col-span-5 p-5 border border-muted/20 rounded-xl bg-bg/80 space-y-4">
          <div className="flex items-center justify-between border-b border-muted/20 pb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-red" />
              <span className="font-technical text-xs font-bold text-ink">NODE INSPECTOR</span>
            </div>
            <TechLabel code="STATE">{activeNode.move}</TechLabel>
          </div>

          {/* Grid Mini-Board */}
          <div className="w-36 h-36 mx-auto grid grid-cols-3 gap-1 p-2 bg-ink/5 border border-muted/30 rounded-lg">
            {activeNode.board.map((cell, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center font-display text-xl border border-muted/20 bg-bg rounded text-ink"
              >
                {cell === "X" && <span className="text-red font-bold">X</span>}
                {cell === "O" && <span className="text-orange font-bold">O</span>}
                {cell === null && <span className="text-muted/30 text-xs">•</span>}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-technical">
              <span className="text-muted">HEURISTIC EVALUATION:</span>
              <span className={activeNode.score > 0 ? "text-red font-bold" : "text-ink"}>
                {activeNode.score > 0 ? `+${activeNode.score} (BOT WIN)` : `${activeNode.score} (DRAW/MIN)`}
              </span>
            </div>
            <p className="font-editorial text-sm text-ink/90 leading-normal">
              {activeNode.description}
            </p>
          </div>

          <HandNote arrow="right" underline={false}>
            {activeNode.isOptimal ? "Optimal Decision Path Selected" : "Alternative Branch Evaluated"}
          </HandNote>
        </div>
      </div>
    </div>
  );
}
