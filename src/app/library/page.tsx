"use client";

import { useState } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { ChipGroup } from "@/components/ChipGroup";
import { LIB } from "@/lib/data";
import type { LibraryTag } from "@/lib/types";

const FILTERS = ["All", "Photo", "Video", "Reel"] as const;
type Filter = (typeof FILTERS)[number];

const SHOOTS = [
  {
    status: "August 26 · shoot locked",
    title: "Food & Beverage",
    body: "Chef Mike, the kitchen, and the dishes that make people come back.",
  },
  {
    status: "September · planned",
    title: "Accommodations",
    body: "Cabins, the private retreat angle, and what a stay on the property looks like.",
  }
];

export default function ContentLibraryPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const items = filter === "All" ? LIB : LIB.filter((l) => l.tag === (filter as LibraryTag));

  return (
    <>
      <PageHeader
        eyebrow="Captured on the property"
        title="The Content Library."
        right={
          <a
            href="#"
            className="rounded-sm bg-maroon px-5 py-3 text-[10px] font-bold uppercase leading-none tracking-[.14em] text-ivory no-underline hover:bg-maroon-deep"
          >
            Open on Dropbox ↗
          </a>
        }
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <ChipGroup options={FILTERS} value={filter} onChange={setFilter} />
        <div className="text-[11px] text-ink-faint">
          {items.length} of {LIB.length} shown
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {items.map((item, i) => (
          <Card key={`${item.title}-${i}`} className="overflow-hidden transition-colors hover:border-maroon">
            <div className="relative aspect-[4/3] w-full">
              <Image src={item.img} alt={item.title} fill sizes="(max-width: 1240px) 25vw, 300px" className="object-cover" />
              <span
                className="absolute left-2 top-2 rounded-pill px-2 py-1 text-[8px] font-bold uppercase leading-none tracking-[.1em] text-white"
                style={{ background: "rgba(46,38,34,.72)" }}
              >
                {item.tag}
              </span>
            </div>
            <div className="px-3.5 pb-3.5 pt-3">
              <div className="font-serif text-[15px] leading-[1.25] text-ink">{item.title}</div>
              <div className="mt-1 text-[10px] font-bold uppercase leading-none tracking-[.14em] text-ink-faint">
                {item.month}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {SHOOTS.map((shoot) => (
          <div key={shoot.title} className="rounded-lg bg-parchment px-5 py-[18px]">
            <div className="text-[10px] font-bold uppercase leading-none tracking-[.14em] text-gold-deep">{shoot.status}</div>
            <div className="mt-2 font-serif text-[20px] leading-[1.2] text-ink">{shoot.title}</div>
            <p className="mt-2 text-[13px] leading-[1.5] text-ink-soft">{shoot.body}</p>
            <a
              href="#"
              className="mt-3 inline-block text-[9.5px] font-bold uppercase tracking-[.12em] text-maroon no-underline hover:text-gold-deep"
            >
              View the plan →
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
