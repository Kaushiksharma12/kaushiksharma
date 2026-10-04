"use client";

interface HandNoteProps {
  children: React.ReactNode;
  arrow?: "right" | "down" | "none";
  underline?: boolean;
  className?: string;
}

export function HandNote({ children, arrow = "right", underline = true, className = "" }: HandNoteProps) {
  return (
    <span className={`inline-relative font-handwritten text-lg sm:text-xl text-red items-center gap-1 select-none ${className}`}>
      <span>{children}</span>
      
      {arrow === "right" && (
        <svg
          className="inline-block w-5 h-4 ml-1 text-red overflow-visible align-middle"
          viewBox="0 0 24 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 8h18M14 2l6 6-6 6" className="animate-stroke" />
        </svg>
      )}

      {arrow === "down" && (
        <svg
          className="inline-block w-4 h-5 ml-1 text-red overflow-visible align-middle"
          viewBox="0 0 16 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 2v18M2 14l6 6 6-6" className="animate-stroke" />
        </svg>
      )}

      {underline && (
        <svg
          className="block w-full h-2 mt-0.5 text-red opacity-80 overflow-visible"
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path
            d="M2 8 C 30 2, 70 11, 98 5"
            className="animate-stroke"
          />
        </svg>
      )}
    </span>
  );
}
