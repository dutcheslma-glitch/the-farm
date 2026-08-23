import { Card } from "@/components/Card";

/** Placeholder for tabs not yet built out — this shell ships routing and
 * navigation for all seven tabs; charts, live data, and the multi-user
 * surfaces (README "Suggested build order" steps 3+) land in follow-up work. */
export function ComingSoon({ note }: { note: string }) {
  return (
    <Card className="px-7 py-9">
      <div className="text-[10px] font-bold uppercase leading-none tracking-[.16em] text-ink-faint">
        Under construction
      </div>
      <p className="mt-3 max-w-[60ch] text-[14px] leading-[1.6] text-ink-soft">{note}</p>
    </Card>
  );
}
