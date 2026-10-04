"use client";

import { useState, useEffect, useCallback } from "react";
import { TechLabel } from "./TechLabel";
import { HandNote } from "./HandNote";
import { Gamepad2, RotateCcw, Cpu } from "lucide-react";

type Board = (string | null)[];
type Difficulty = "easy" | "medium" | "hard";

export function TicTacToeGame() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true); // Player = X, Bot = O
  const [difficulty, setDifficulty] = useState<Difficulty>("hard");
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [statesSearched, setStatesSearched] = useState<number>(0);
  const [lastBotLatency, setLastBotLatency] = useState<number>(0);
  const [cellScores, setCellScores] = useState<(number | null)[]>(Array(9).fill(null));

  const checkWinner = useCallback((b: Board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, c, d] of lines) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) {
        return { winner: b[a], line: [a, c, d] };
      }
    }
    if (b.every((cell) => cell !== null)) {
      return { winner: "draw", line: null };
    }
    return null;
  }, []);

  // Minimax Algorithm Core Engine
  const minimax = useCallback((b: Board, depth: number, isMax: boolean, maxDepth: number, countObj: { count: number }): number => {
    countObj.count += 1;
    const result = checkWinner(b);
    if (result) {
      if (result.winner === "O") return 10 - depth;
      if (result.winner === "X") return depth - 10;
      return 0;
    }
    if (depth >= maxDepth) return 0;

    if (isMax) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (b[i] === null) {
          b[i] = "O";
          const score = minimax(b, depth + 1, false, maxDepth, countObj);
          b[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (b[i] === null) {
          b[i] = "X";
          const score = minimax(b, depth + 1, true, maxDepth, countObj);
          b[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }, [checkWinner]);

  // Compute Heuristic Scores for Empty Cells (Visual Overlay)
  const calculateCellScores = useCallback((currentBoard: Board, currentDiff: Difficulty) => {
    const scores: (number | null)[] = Array(9).fill(null);
    const maxDepth = currentDiff === "easy" ? 1 : currentDiff === "medium" ? 2 : 9;
    const countObj = { count: 0 };

    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = "O";
        scores[i] = minimax(currentBoard, 0, false, maxDepth, countObj);
        currentBoard[i] = null;
      }
    }
    setCellScores(scores);
  }, [minimax]);

  // Execute Bot Turn
  const makeBotMove = useCallback((currentBoard: Board) => {
    const startTime = performance.now();
    const maxDepth = difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 9;
    const countObj = { count: 0 };
    let bestMove = -1;
    let bestScore = -Infinity;

    const available = currentBoard.map((c, i) => (c === null ? i : null)).filter((i) => i !== null) as number[];

    if (difficulty === "easy") {
      bestMove = available[Math.floor(Math.random() * available.length)];
      countObj.count = available.length;
    } else {
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = "O";
          const score = minimax(currentBoard, 0, false, maxDepth, countObj);
          currentBoard[i] = null;
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
    }

    const endTime = performance.now();
    setLastBotLatency(Math.round(endTime - startTime));
    setStatesSearched(countObj.count);

    if (bestMove !== -1) {
      const nextBoard = [...currentBoard];
      nextBoard[bestMove] = "O";
      setBoard(nextBoard);

      const res = checkWinner(nextBoard);
      if (res) {
        setWinner(res.winner);
        setWinningLine(res.line);
      } else {
        setIsPlayerTurn(true);
        calculateCellScores(nextBoard, difficulty);
      }
    }
  }, [difficulty, minimax, checkWinner, calculateCellScores]);

  const handleCellClick = (index: number) => {
    if (!isPlayerTurn || board[index] !== null || winner !== null) return;

    const nextBoard = [...board];
    nextBoard[index] = "X";
    setBoard(nextBoard);

    const res = checkWinner(nextBoard);
    if (res) {
      setWinner(res.winner);
      setWinningLine(res.line);
    } else {
      setIsPlayerTurn(false);
      setTimeout(() => makeBotMove(nextBoard), 250);
    }
  };

  const resetGame = () => {
    const emptyBoard = Array(9).fill(null);
    setBoard(emptyBoard);
    setWinner(null);
    setWinningLine(null);
    setIsPlayerTurn(true);
    setStatesSearched(0);
    setLastBotLatency(0);
    calculateCellScores(emptyBoard, difficulty);
  };

  useEffect(() => {
    calculateCellScores(board, difficulty);
  }, [difficulty]);

  return (
    <div className="p-6 md:p-8 border border-muted/30 rounded-2xl bg-bg/70 backdrop-blur-md shadow-2xl my-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-muted/20 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Gamepad2 className="w-5 h-5 text-red" />
          <span className="font-display text-xl sm:text-2xl text-ink">PLAY VS MINIMAX BOT ENGINE</span>
        </div>

        {/* Difficulty Controls */}
        <div className="flex items-center gap-2">
          {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => {
                setDifficulty(d);
                resetGame();
              }}
              className={`px-3 py-1 font-technical text-xs rounded border transition-all ${
                difficulty === d
                  ? "border-red text-red bg-red/10 font-bold"
                  : "border-muted/30 text-muted hover:border-ink"
              }`}
            >
              {d.toUpperCase()} {d === "hard" ? "[UNBEATABLE]" : d === "medium" ? "[2-DEPTH]" : "[RANDOM]"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Playable Game Grid */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-72 h-72 sm:w-80 sm:h-80 grid grid-cols-3 gap-2 p-3 bg-ink/5 border border-muted/30 rounded-2xl relative">
            {board.map((cell, idx) => {
              const isWinCell = winningLine?.includes(idx);
              const heuristic = cellScores[idx];

              return (
                <button
                  key={idx}
                  onClick={() => handleCellClick(idx)}
                  disabled={!isPlayerTurn || cell !== null || winner !== null}
                  className={`relative flex flex-col items-center justify-center font-display text-4xl rounded-xl border transition-all duration-300 ${
                    isWinCell
                      ? "border-red bg-red/20 text-red shadow-[0_0_20px_rgba(201,56,46,0.4)]"
                      : cell !== null
                      ? "border-muted/30 bg-bg text-ink"
                      : "border-muted/20 bg-bg/50 hover:border-red hover:bg-red/5 text-muted"
                  }`}
                >
                  {cell === "X" && <span className="text-red">X</span>}
                  {cell === "O" && <span className="text-orange">O</span>}
                  {cell === null && heuristic !== null && (
                    <span className="font-technical text-[10px] text-muted/60 absolute bottom-1.5 right-2">
                      {heuristic > 0 ? `+${heuristic}` : heuristic}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={resetGame}
            className="mt-6 flex items-center gap-2 px-4 py-2 border border-muted/30 rounded-full font-technical text-xs text-ink hover:border-red transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red" />
            <span>RESET BOARD STATE</span>
          </button>
        </div>

        {/* Live Engine Metrics & Status Panel */}
        <div className="lg:col-span-6 space-y-5 p-6 border border-muted/20 rounded-xl bg-bg/80">
          <div className="flex items-center justify-between border-b border-muted/20 pb-3">
            <span className="font-technical text-xs font-bold text-ink">MINIMAX LIVE TELEMETRY</span>
            <TechLabel code="MODE">{difficulty.toUpperCase()}</TechLabel>
          </div>

          <div className="space-y-3 font-technical text-xs">
            <div className="flex justify-between items-center py-1 border-b border-muted/15">
              <span className="text-muted">CURRENT TURN:</span>
              <span className={isPlayerTurn ? "text-red font-bold" : "text-orange font-bold"}>
                {winner ? "GAME OVER" : isPlayerTurn ? "PLAYER (X)" : "MINIMAX BOT (O)..."}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-muted/15">
              <span className="text-muted">STATES EXPLORED:</span>
              <span className="text-ink font-bold">{statesSearched.toLocaleString()} nodes</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-muted/15">
              <span className="text-muted">EVALUATION TIME:</span>
              <span className="text-ink font-bold">{lastBotLatency} ms</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-muted">GAME RESULT:</span>
              <span className="text-red font-bold uppercase">
                {winner === "X"
                  ? "PLAYER VICTORIOUS"
                  : winner === "O"
                  ? "MINIMAX BOT VICTORIOUS"
                  : winner === "draw"
                  ? "STALEMATE DRAW"
                  : "IN PROGRESS"}
              </span>
            </div>
          </div>

          <HandNote arrow="right" underline={false}>
            {difficulty === "hard"
              ? "Full tree guarantees minimax never loses."
              : "Sub-optimal depth allows player tactical wins."}
          </HandNote>
        </div>
      </div>
    </div>
  );
}
