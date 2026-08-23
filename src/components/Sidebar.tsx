"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/data";

const STORAGE_KEY = "farm-dashboard:sidebar-collapsed";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Collapse state is a per-user viewing preference, not shared data — see
  // README.md "Collapse state must persist per user (localStorage is fine)".
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "1") setCollapsed(true);
    setHydrated(true);
  }, []);

  function toggle() {
    setCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  }

  return (
    <aside
      className="sticky top-0 flex h-screen flex-none flex-col bg-ink"
      style={{
        width: collapsed ? 68 : 244,
        padding: collapsed ? "22px 12px" : "22px 18px",
        transition: hydrated ? "width .22s ease" : undefined
      }}
    >
      {/* Brand row */}
      <div
        className="flex border-b pb-[18px]"
        style={{
          borderColor: "rgba(216,203,190,.18)",
          flexDirection: collapsed ? "column" : "row",
          alignItems: collapsed ? "center" : "center",
          gap: collapsed ? 12 : 8,
          padding: collapsed ? "0 0 18px" : "0 8px 18px"
        }}
      >
        <Link
          href="/"
          className="flex min-w-0 items-baseline gap-1.5 no-underline"
          style={collapsed ? undefined : { flex: 1 }}
        >
          <span className="font-serif text-[19px] leading-none text-ivory">{collapsed ? "F" : "The Farm"}</span>
          {!collapsed && <span className="font-script text-[14px] leading-none text-beige">Progress</span>}
        </Link>
        <button
          type="button"
          onClick={toggle}
          title={collapsed ? "Expand navigation" : "Collapse navigation"}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          className="flex flex-none items-center justify-center text-beige"
          style={{
            width: collapsed ? 30 : 24,
            height: collapsed ? 30 : 24,
            borderRadius: collapsed ? 999 : 6,
            background: "rgba(216,203,190,.14)",
            fontSize: collapsed ? 14 : 11
          }}
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 pt-[18px]">
        {NAV.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          if (collapsed) {
            return (
              <Link
                key={item.id}
                href={item.href}
                title={item.label}
                className="flex items-center justify-center rounded-md no-underline"
                style={{
                  padding: "11px 0",
                  font: "700 11px/1 var(--font-lato), sans-serif",
                  color: active ? "#F7F2EA" : "rgba(216,203,190,.72)",
                  background: active ? "#6C1E27" : "transparent"
                }}
              >
                {item.num}
              </Link>
            );
          }
          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center gap-[11px] overflow-hidden whitespace-nowrap rounded-md px-[10px] py-[10px] no-underline transition-colors hover:bg-[rgba(216,203,190,.1)]"
              style={{
                background: active ? "rgba(216,203,190,.16)" : "transparent"
              }}
            >
              <span
                className="w-3.5 flex-none text-center text-[9px] font-bold leading-none tracking-[.08em] opacity-50"
                style={{ color: active ? "#F7F2EA" : "rgba(247,242,234,.62)" }}
              >
                {item.num}
              </span>
              <span
                className="overflow-hidden text-ellipsis text-[13px] leading-[1.3]"
                style={{
                  fontWeight: active ? 700 : 400,
                  color: active ? "#F7F2EA" : "rgba(247,242,234,.62)"
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto flex flex-col gap-3">
        <a
          href="#"
          className="block rounded-pill bg-beige text-center font-bold uppercase text-ink no-underline transition-colors hover:bg-beige-deep"
          style={{
            padding: collapsed ? "11px 0" : "11px 14px",
            fontSize: collapsed ? 13 : 9.5,
            letterSpacing: collapsed ? 0 : ".14em"
          }}
        >
          {collapsed ? "↗" : "Open Library ↗"}
        </a>
        {!collapsed && (
          <div className="px-2 text-[11px] leading-[1.5]" style={{ color: "rgba(216,203,190,.45)" }}>
            <div>Updated August 22, 2026</div>
            <div>Month two of the partnership</div>
          </div>
        )}
      </div>
    </aside>
  );
}
