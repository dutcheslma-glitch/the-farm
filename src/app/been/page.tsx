"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { PillGroup } from "@/components/PillGroup";
import { BASELINE, MONTHS } from "@/lib/data";

const MONTH_OPTIONS = Object.keys(MONTHS) as (keyof typeof MONTHS)[];

export default function WhereWeveBeenPage() {
  const [month, setMonth] = useState<keyof typeof MONTHS>("August");
  const [openCall, setOpenCall] = useState(0);

  function pickMonth(m: keyof typeof MONTHS) {
    setMonth(m);
    setOpenCall(0);
  }

  const record = MONTHS[month];

  return (
    <>
      <PageHeader
        eyebrow="Chapter by chapter"
        title="Where we've been."
        right={<PillGroup options={MONTH_OPTIONS} value={month} onChange={pickMonth} />}
      />

      {/* Baseline row — fixed, does not change with the month selector */}
      <div className="mb-7 grid grid-cols-4 gap-3">
        {BASELINE.map((b) => (
          <Card key={b.label} className="px-5 py-[18px]">
            <div className="text-[10px] font-bold uppercase leading-none tracking-[.16em] text-ink-faint">{b.label}</div>
            <div className="mt-2 font-serif text-[32px] leading-none text-ink">
              {b.value}
              <span className="text-[20px] text-ink-faint">{b.unit}</span>
            </div>
            <div
              className="mt-3 inline-block rounded-pill px-3 py-1.5 text-[10px] font-bold"
              style={{ background: "#F2E4E2", color: "#6C1E27" }}
            >
              {b.chip}
            </div>
          </Card>
        ))}
      </div>

      {/* Month note */}
      <Card className="mb-9 px-6 py-5" style={{ borderLeft: "3px solid #6C1E27" }}>
        <p className="text-[15px] leading-[1.6] text-ink">{record.note}</p>
      </Card>

      {/* Meeting recaps */}
      {record.calls.length > 0 && (
        <section className="mb-9">
          <h2 className="mb-4 font-serif text-[34px] leading-[1.1] tracking-[-.02em] text-ink">Meeting recaps</h2>
          <div className="flex flex-col gap-2">
            {record.calls.map((call, i) => {
              const open = openCall === i;
              return (
                <Card key={call.day + call.title} className="overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenCall(open ? -1 : i)}
                    className="flex w-full items-center gap-5 px-[22px] py-4 text-left hover:bg-ivory"
                  >
                    <div className="w-11 flex-none text-center">
                      <div className="font-serif text-[22px] leading-none text-maroon">{call.day}</div>
                      <div className="mt-1 text-[8px] font-bold uppercase leading-none tracking-[.14em] text-ink-faint">
                        {call.mon}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-serif text-[17px] leading-[1.25] text-ink">{call.title}</div>
                      <div className="mt-1 text-[10px] font-bold uppercase leading-none tracking-[.14em] text-ink-faint">
                        {call.who}
                      </div>
                    </div>
                    <span
                      className="flex-none text-[11px] text-ink-faint transition-transform duration-150"
                      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      ▾
                    </span>
                  </button>
                  {open && (
                    <div className="border-t border-ivory px-[22px] pb-5 pt-4" style={{ paddingLeft: 86 }}>
                      <p className="max-w-[70ch] text-[14px] leading-[1.65] text-ink-soft">{call.recap}</p>
                      <a
                        href="#"
                        className="mt-3 inline-block text-[9px] font-bold uppercase tracking-[.12em] text-maroon no-underline hover:text-gold-deep"
                      >
                        Full notes &amp; transcript →
                      </a>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* What shipped */}
      {record.shipped.length > 0 && (
        <section>
          <div className="grid grid-cols-3 gap-3">
            {record.shipped.map((group) => (
              <Card key={group.title} accent="sage" className="px-6 py-6">
                <h3 className="font-serif text-[19px] leading-[1.2] text-ink">{group.title}</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="text-sage-deep">✓</span>
                      <span className="text-[13px] leading-[1.5] text-ink-soft">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
