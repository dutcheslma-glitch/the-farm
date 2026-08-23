import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { TOOLKIT } from "@/lib/data";

export default function YourToolkitPage() {
  return (
    <>
      <PageHeader eyebrow="Built to outlast the engagement" title="Yours to keep." />

      <div className="flex flex-col gap-5">
        {TOOLKIT.map((item) => (
          <Card key={item.num} accent="maroon" className="grid grid-cols-[1fr_300px] items-start gap-8 px-[30px] py-[26px]">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-[16px] leading-none text-maroon">{item.num}</span>
                <h2 className="font-serif text-[25px] leading-[1.2] text-ink">{item.title}</h2>
              </div>
              <p className="mt-3 max-w-[60ch] text-[14px] leading-[1.6] text-ink-soft">{item.body}</p>
              <a
                href="#"
                className="mt-5 inline-block rounded-sm bg-ink px-5 py-3 text-[10px] font-bold uppercase leading-none tracking-[.14em] text-ivory no-underline hover:bg-maroon"
              >
                {item.cta}
              </a>
              <div
                className="mt-4 inline-block rounded-pill bg-parchment px-3 py-1.5 text-[9px] font-bold uppercase leading-none tracking-[.1em] text-sage-deep"
              >
                {item.status}
              </div>
            </div>
            <ul className="flex flex-col gap-2.5 border-l border-cream pl-[26px]">
              {item.items.map((i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="text-maroon">✓</span>
                  <span className="text-[12.5px] leading-[1.5] text-ink-soft">{i}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </>
  );
}
