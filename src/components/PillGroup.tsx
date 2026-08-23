"use client";

/** Filter pill group — README "Layout shell": cream track, active pill on
 * dark ink background. Used for month/horizon/list-vs-month style toggles. */
export function PillGroup<T extends string>({
  options,
  value,
  onChange
}: {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex gap-1.5 rounded-pill bg-cream p-1">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="rounded-pill px-4 py-2 text-[10px] font-bold uppercase leading-none tracking-[.12em]"
            style={{
              background: active ? "#2E2622" : "transparent",
              color: active ? "#F7F2EA" : "#5A4F47"
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
