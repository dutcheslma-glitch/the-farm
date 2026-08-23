"use client";

/** Filter chip group — README "Layout shell": bordered pill, maroon when
 * active. Used for library/calendar type filters. */
export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  format = (opt) => opt
}: {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  format?: (opt: T) => string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="rounded-pill border px-[15px] py-2 text-[10px] font-bold uppercase leading-none tracking-[.1em]"
            style={{
              borderColor: active ? "#6C1E27" : "#D8CBBE",
              background: active ? "#6C1E27" : "transparent",
              color: active ? "#F7F2EA" : "#5A4F47"
            }}
          >
            {format(opt)}
          </button>
        );
      })}
    </div>
  );
}
