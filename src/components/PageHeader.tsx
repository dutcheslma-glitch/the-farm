import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  right,
  size = "default"
}: {
  eyebrow: string;
  title: string;
  right?: ReactNode;
  /** "large" is the 40px calendar-page title per README typography scale. */
  size?: "default" | "large";
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="text-[11px] font-bold uppercase leading-none tracking-[.18em] text-maroon">{eyebrow}</div>
        <h1
          className="mt-2 font-serif tracking-[-.02em] text-ink"
          style={size === "large" ? { fontSize: 40, lineHeight: 1.05 } : { fontSize: 34, lineHeight: 1.1 }}
        >
          {title}
        </h1>
      </div>
      {right}
    </div>
  );
}
