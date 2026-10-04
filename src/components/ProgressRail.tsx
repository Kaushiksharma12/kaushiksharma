"use client";

interface ProgressRailProps {
  progress: number; // 0 to 1
}

export function ProgressRail({ progress }: ProgressRailProps) {
  const percent = Math.min(100, Math.max(0, progress * 100));

  return (
    <div className="fixed top-0 right-0 h-full w-[3px] bg-muted/15 z-40 pointer-events-none">
      <div
        className="w-full bg-red transition-all duration-150 ease-out shadow-[0_0_8px_rgba(201,56,46,0.6)]"
        style={{ height: `${percent}%` }}
      />
    </div>
  );
}
