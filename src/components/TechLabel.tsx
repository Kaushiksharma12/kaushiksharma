"use client";

interface TechLabelProps {
  children: React.ReactNode;
  code?: string;
  variant?: "muted" | "ink" | "red" | "orange";
  className?: string;
}

export function TechLabel({ children, code, variant = "muted", className = "" }: TechLabelProps) {
  const colorMap = {
    muted: "text-muted border-muted/30 bg-muted/5",
    ink: "text-ink border-ink/40 bg-ink/5",
    red: "text-red border-red/40 bg-red/5",
    orange: "text-orange border-orange/40 bg-orange/5",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 border font-technical rounded-sm tracking-wider uppercase ${colorMap[variant]} ${className}`}
    >
      {code && <span className="opacity-60">[{code}]</span>}
      <span>{children}</span>
    </span>
  );
}
