import type { HTMLAttributes } from "react";

const ACCENT_COLOR: Record<string, string> = {
  maroon: "#6C1E27",
  sage: "#6F7355"
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  accent?: "maroon" | "sage";
}

/** Standard card per README "Shape and elevation": white, 1px beige border,
 * 14px radius, soft shadow. Pass `accent` for the 3px top-border emphasis
 * variant used on checklists, shipped cards, etc. */
export function Card({ accent, className = "", style, ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-beige bg-white shadow-card ${className}`}
      style={{
        ...(accent ? { borderTop: `3px solid ${ACCENT_COLOR[accent]}` } : {}),
        ...style
      }}
      {...props}
    />
  );
}
