# Handoff: The Farm — Client Progress Dashboard

## Overview

A client-facing dashboard for a social media management engagement. The Farm is a wedding, event, and lodging venue outside Asheville, NC. The agency (one manager) reports progress to the client team (Kristie — owner; Elizabeth and Melissa — client team), and the dashboard doubles as the artifact the manager presents from on monthly strategy calls.

Seven tabs: What's new · Where we've been · Where we are · Where we're going · Content Calendar · Content Library · Your Toolkit.

**The reason this needs to become a real app:** the HTML prototype's interactive parts (task checkboxes, task creation, post approvals, notes, drag-to-reschedule) hold state in browser memory only. Two people cannot see each other's changes, and a refresh discards everything. The prototype demonstrates the intended interaction model; the build must make it multi-user and persistent.

Currently deployed as a static bundle: `dutcheslma-glitch/the-farm` → `index.html` at repo root → Vercel (`the-farm-sand.vercel.app`).

## About the design files

The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy. The task is to **recreate these designs in a real application environment** with a database, authentication, and persistence.

- `design-reference/standalone-dashboard.html` — fully self-contained, open it in any browser. This is the best way to understand the design; click every tab and interaction.
- `design-reference/Client Dashboard.dc.html` — the authored source. Its `<script data-dc-script>` block holds all the logic; the markup above it is the template. Read it for exact structure.
- `reference-logic.js` — the logic class extracted for easier reading (state shape, handlers, chart math).
- `seed-data.js` — all content as plain data objects, ready to become database seed rows.
- `tokens/*.css` — the design system's CSS custom properties. Use these values verbatim.
- `assets/*` — photography used in the prototype.

No framework is prescribed. Nothing exists in the repo but the static bundle, so **choose the stack.** Recommended, given the requirements below: **Next.js (App Router) + TypeScript + Supabase** (Postgres, Auth, Realtime, Row Level Security) deployed on Vercel — it keeps the existing deployment target and Supabase's Realtime subscriptions solve the multi-user sync requirement without custom WebSocket work.

## Fidelity

**High-fidelity.** Final colors, typography, spacing, and interactions. Recreate pixel-accurately. Every value is specified in this document and in `tokens/`.

The prototype uses inline styles exclusively (a constraint of the authoring environment, not a design intent). In the real build, use whatever styling approach the chosen stack favors — Tailwind with the tokens mapped into `theme.extend`, CSS modules, or styled components. Preserve the *values*, not the technique.

---

## Design tokens

From `tokens/colors.css`. Use the CSS variable names or map them into your theme.

| Token | Hex | Role |
| --- | --- | --- |
| `--maroon` | `#6C1E27` | Primary brand. Hero panels, primary buttons, active states, eyebrow labels, serif accent text |
| `--maroon-deep` | `#4E141B` | Primary hover |
| `--maroon-tint` | `rgba(108,30,39,.08)` | Chip backgrounds, today-cell fill, drop-target highlight |
| `--beige` | `#D8CBBE` | Hairline borders on all cards, secondary button fill |
| `--beige-deep` | `#C4B4A3` | Border hover, unchecked checkbox border, scrollbar thumb |
| `--ivory` | `#F7F2EA` | Page background, empty-cell fill, row hover |
| `--cream` | `#EDE3D4` | Pill-group backgrounds, internal dividers, progress-bar track |
| `--parchment` | `#F2E9DC` | Secondary card fill (cadence chips, shoot-plan cards, add-task row) |
| `--ink` | `#2E2622` | Body text, sidebar background, dark buttons |
| `--ink-soft` | `#5C534C` | Secondary text, descriptions |
| `--ink-faint` | `#8B7F73` | Labels, meta text, axis labels |
| `--gold-deep` | `#A06D28` | Link hover, "need approval" count, script accent, shoot status |
| `--sage` | `#6F7355` | Success/done: completed checkboxes, progress fill, published status |
| `--sage-deep` | `#565A40` | Sage text on light backgrounds |

Note: gold and sage are *proposed* accents in the brand system, not confirmed official colors. They are used here for status semantics (gold = attention, sage = complete). Confirm with the brand owner before wider use.

### Typography

From `tokens/typography.css` and `tokens/fonts.css`. All three are Google Fonts; `.woff2` binaries are in the design system if you prefer self-hosting.

- `--font-serif`: **Playfair Display** — all headings and all numeric display values. Weight 400 only. Sentence case, never all caps. Negative tracking on large sizes (`-.02em`).
- `--font-sans`: **Lato** — body copy, labels, UI, buttons.
- `--font-script`: **Dancing Script** — one or two words of emphasis only. Used in exactly two places: the sidebar wordmark ("Progress") and the horizon question on Where we're going. Never for body text.

Type scale as used:

| Role | Font | Size / line-height | Weight | Tracking | Transform |
| --- | --- | --- | --- | --- | --- |
| Page title (h1) | serif | 34px / 1.1 | 400 | -.02em | sentence |
| Calendar page title | serif | 40px / 1.05 | 400 | -.02em | sentence |
| Card heading | serif | 19–27px / 1.2–1.25 | 400 | — | sentence |
| Hero metric | serif | 66px / 1 | 400 | — | — |
| Large metric | serif | 30–36px / 1 | 400 | — | — |
| Small metric | serif | 20–24px / 1 | 400 | — | — |
| Eyebrow | sans | 11px / 1 | 700 | .18em | uppercase |
| Section label | sans | 10px / 1 | 700 | .16em | uppercase |
| Micro label | sans | 8–9.5px / 1 | 700 | .10–.14em | uppercase |
| Body | sans | 13–15px / 1.5–1.65 | 400 | — | sentence |
| Table row text | sans | 14.5px / 1.4 | 400 | — | sentence |
| Button | sans | 10px / 1 | 700 | .14em | uppercase |
| Nav item | sans | 13px / 1.3 | 400 (700 active) | — | sentence |

### Shape and elevation

- Radii: **6px** buttons · **8px** nav items, calendar cells, small chips · **10px** thumbnail cards, note cards · **12px** panels inside the modal · **14px** all standard cards · **16px** modal · **999px** pills, avatars, status dots
- Standard card: `background: #fff; border: 1px solid var(--beige); border-radius: 14px; box-shadow: 0 2px 8px rgba(46,38,34,.07)`
- Emphasis card: same, plus `border-top: 3px solid var(--maroon)` (checklist, horizon card, toolkit items) or `border-top: 3px solid var(--sage)` (shipped cards)
- Calendar post card: `border-left: 3px solid <type color>`
- Modal: `box-shadow: 0 24px 60px rgba(46,38,34,.35)`, overlay `rgba(46,38,34,.55)`
- Dropdown menu: `box-shadow: 0 6px 18px rgba(46,38,34,.14)`
- **No** glass/blur effects, no colored left-border accents outside the calendar cards, no gradients except the two noted (IG avatar ring, chart area fills).

### Spacing

Card gaps `12–14px` · card padding `18–28px` · section bottom margin `14–30px` · main content padding `32px 44px 80px` · max content width `1240px`.

---

## Layout shell

**Sidebar + main**, `display: flex`, `min-height: 100vh`.

### Sidebar (collapsible)

`background: var(--ink)`, `position: sticky; top: 0; height: 100vh`, `transition: width .22s ease`.

Expanded (244px wide, padding `22px 18px`):
- Wordmark row: "The Farm" (serif 19px, `--ivory`) + "Progress" (script 14px, `--beige`), baseline-aligned, 6px gap. Clicking navigates to What's new. A 24×24px round-rect toggle button sits at the right of the row: `background: rgba(216,203,190,.1)`, glyph `‹`, title "Collapse navigation".
- Bottom border on the wordmark row: `1px solid rgba(216,203,190,.18)`, `padding-bottom: 18px`.
- Nav: 7 items, `gap: 2px`, `padding-top: 18px`. Each item is `display: flex; gap: 11px; padding: 10px; border-radius: 8px` with a two-digit numeral (`sans 9px/700`, `.08em`, `opacity: .5`, 14px wide, centered) then the label. Inactive `rgba(247,242,234,.62)`; active `--ivory` at weight 700 on `rgba(216,203,190,.16)`; hover `rgba(216,203,190,.1)`.
- Footer (pushed down with `margin-top: auto`): "Open Library ↗" pill — `background: var(--beige)`, `color: var(--ink)`, `border-radius: 999px`, `padding: 11px 14px`, sans 9.5px/700 `.14em` uppercase, full width, centered; hover `--beige-deep`. Below it, meta text `rgba(216,203,190,.45)` sans 11px/1.5: "Updated August 22, 2026 / Month two of the partnership".

Collapsed (68px wide, padding `22px 12px`):
- Wordmark becomes "F" only, script word hidden. Brand row switches to `flex-direction: column; align-items: center; gap: 12px` so the toggle sits *below* the mark — it must remain visible, and it becomes a 30×30px circle with glyph `›`, `background: rgba(216,203,190,.14)`, title "Expand navigation".
- Nav items become numerals only, centered, `padding: 11px 0`, sans 11px/700. Inactive `rgba(216,203,190,.72)`; **active gets a solid `--maroon` pill** so state stays scannable at this width.
- Library pill becomes `↗` at 13px; meta text hidden.

Collapse state must persist per user (localStorage is fine — it's a viewing preference, not shared data).

### Main

`flex: 1; min-width: 0; padding: 32px 44px 80px; max-width: 1240px`. Body `background: var(--ivory)`.

Every tab opens with a header block: eyebrow (`--maroon`, uppercase) → h1 (serif 34px, sentence case, ends with a period) → optional filter pills on the right, baseline-aligned via `align-items: flex-end; justify-content: space-between`.

Filter pill group: `display: flex; gap: 4–6px; padding: 4px; background: var(--cream); border-radius: 999px`. Each pill `padding: 8px 16px; border-radius: 999px`, sans 10px/700 `.12em` uppercase; active `background: var(--ink); color: var(--ivory)`, inactive transparent with `--ink-soft`.

Filter chip (used for library and calendar type filters): `padding: 8px 15px; border-radius: 999px; border: 1px solid var(--beige)`, sans 10px/700 `.1em` uppercase; active `background: var(--maroon); border-color: var(--maroon); color: var(--ivory)`.

---

## Screen 1 — What's new (`/`)

**Purpose:** answers "what's happened since I last looked, and what do you need from me?" This is the landing screen.

Header: eyebrow "Month two · updated August 22, 2026", h1 "What's new."

### 1a. Checklist (top of page — most important element)

Emphasis card (`border-top: 3px solid var(--maroon)`), `padding: 20px 24px 8px`.

Header row (`display: flex; align-items: center; gap: 16px; flex-wrap: wrap`):
- "Checklist" section label in `--maroon`
- Progress bar: `flex: 1; min-width: 120px; max-width: 220px; height: 4px; border-radius: 999px; background: var(--cream)`; fill `background: var(--sage)`, width = done/total as %, `transition: width .2s`
- "n of m done" — sans 12px, `--ink-faint`
- "+ Add task" link, `margin-left: auto`, sans 9.5px/700 `.12em` uppercase, `--maroon`. Toggles to "Cancel" when the add row is open.

Column grid for header and all rows: `grid-template-columns: 26px 1fr 190px 92px; gap: 14px; align-items: center`.

Header labels row: empty · "Task" · "Assigned to" · "Due" — micro labels, `--ink-faint`, `border-bottom: 1px solid var(--cream)`.

Add-task row (hidden until toggled): `background: var(--parchment)`. Contains a dashed placeholder checkbox (`border: 1.5px dashed var(--beige-deep)`), a text input ("What needs doing?"), an assignee `<select>` of all people, a 64px due-date text input ("Sep 1"), and a 28×28px `＋` submit button that is `--maroon`/`--ivory` when the title is non-empty and `--beige`/`--ink-soft` when empty. Submitting with an empty title is a no-op. Empty due date defaults to the string "No date".

Task rows: `padding: 12px 2px; border-bottom: 1px solid var(--ivory)`, hover `background: var(--ivory)`.
- **Checkbox**: 20×20px, `border-radius: 5px`, `border: 1.5px solid var(--beige-deep)` on white when open; when done, `background: var(--sage)`, `border-color: var(--sage)`, white `✓` glyph.
- **Title**: sans 14.5px. When done: `text-decoration: line-through; opacity: .45`.
- **Assignee chip**: `display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 999px; border: 1px solid var(--beige); background: #fff`, hover `border-color: var(--beige-deep)`. Contains a 22px circular avatar (initials, sans 8.5px/700, white on the person's color), the person's name (sans 12.5px), and a `▾` caret pushed right. Clicking opens a dropdown.
- **Assignee dropdown**: `position: absolute; top: calc(100% + 6px); left: 0; width: 190px; padding: 6px; background: #fff; border: 1px solid var(--beige); border-radius: 10px; box-shadow: 0 6px 18px rgba(46,38,34,.14); z-index: 10`. One row per person: 20px avatar + name, `padding: 7px 8px; border-radius: 7px`; current selection has `background: var(--maroon-tint)`; hover `var(--ivory)`. Only one dropdown open at a time.
- **Due**: sans 9.5px/700 `.1em` uppercase, `--maroon` when open, `--ink-faint` when done.

Seed tasks (see `seed-data.js`): Claude ↔ ActiveCampaign connector (JJG, Aug 27) · Food & Beverage shot list sign-off (Melissa, Aug 24) · Approve the September shoot plan (Kristie, Aug 29).

**Anyone with dashboard access can add a task and reassign any task.** No permission tiers.

### 1b. The log

Header row: "The log" section label · "12 entries · newest first" · a **List / Month** pill toggle.

**List mode** — a standard card, `padding: 6px 20px`. Rows: `grid-template-columns: auto auto minmax(170px,1fr) auto; gap: 8px 14px; align-items: center; padding: 13px 2px; border-bottom: 1px solid var(--ivory)`.
- Date — sans 9px/700 `.1em` uppercase, `--ink-faint`, `white-space: nowrap`
- Kind chip — sans 8.5px/700 `.12em` uppercase, white on the kind color, `padding: 5px 9px; border-radius: 999px; white-space: nowrap`
- Title — sans 14.5px, `--ink`
- Link — "Scoreboard →" / "Recap →" / "Open →" etc., sans 9px/700 `.12em` uppercase, `--maroon`, navigates to the tab that holds the detail

Kind colors: Numbers `#2E2622` · Shipped `#6F7355` · Call `#6C1E27` · Shoot `#A06D28` · Asset `#8B7F73`.

**Month mode** — a card containing a real calendar grid.
- Title row: month name (serif 21px) + `‹` `›` circular 28px nav buttons (`border: 1px solid var(--beige)`, hover `background: var(--maroon-tint); color: var(--maroon)`). Range covers July and August 2026.
- Day-of-week header: 7 columns, `grid-template-columns: repeat(7, minmax(0,1fr)); gap: 4px`, micro labels centered ("Sun"…"Sat").
- Cells: same 7-column grid, `min-height: 96px; padding: 7px 7px 8px; border-radius: 8px; overflow: hidden`. Empty leading/trailing cells are transparent with no border. Populated cells `background: var(--ivory); border: 1px solid var(--cream)`. Today (Aug 22) `background: var(--maroon-tint); border-color: var(--maroon)` and its date numeral goes weight 700 in `--maroon`.
- Entry chips inside a cell: `display: block; font: 400 10px/1.4; padding: 4px 7px; border-radius: 5px; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis`, background = kind color. Clicking navigates to the entry's tab. Title attribute carries "Kind — full title".
- Legend below: kind name + 8px color square for each of the five kinds.

Grid alignment is critical: use `minmax(0,1fr)`, not `1fr`, on both the header and cell grids, or the columns drift out of alignment when a chip is wide.

### 1c. Stats + top performer

A wrapping flex row: `display: flex; flex-wrap: wrap; gap: 14px; align-items: flex-start`. Stats block `flex: 1 1 500px`; reel card `flex: 0 1 320px; min-width: 260px`. The reel card must drop below the stats rather than compress them.

**Stats block** — two stacked pieces.

Top: `grid-template-columns: repeat(auto-fit, minmax(230px,1fr)); gap: 14px`.
1. **Hero panel** — `background: var(--maroon)`, `border-radius: 14px`, `padding: 26px 28px`, `min-height: 230px`, `display: flex; flex-direction: column; justify-content: space-between`. Contains: "Daily reach" label in `rgba(247,242,234,.6)`; the value **273** in serif 66px `--ivory` with "/day" in sans 15px `rgba(247,242,234,.65)`; a chip "+180% week over week" — `background: rgba(247,242,234,.14)`, `color: var(--beige)`, sans 10px/700 `.1em` uppercase, `border-radius: 999px`, `padding: 6px 12px`; and at the bottom a sparkline `<svg viewBox="0 0 260 44" preserveAspectRatio="none">` polyline in `#D8CBBE` at 2px, plotting the seven daily values against a 450 max.
2. **Weekly reach chart** — standard card. Title "Accounts reached per day" (serif 20px) + "1,911 this week · hover a day" (sans 11px, `--ink-faint`). SVG `viewBox="0 0 620 220"`, `overflow: visible`. Baseline axis at y=196 in `#EDE3D4`. Two dashed reference lines (`stroke-dasharray: 3 4`): 25/day baseline in `#C4B4A3` and 152/day best-ever pace in `#6F7355`, each with a left-aligned label at x=44. Area fill `rgba(108,30,39,.07)`; line `#6C1E27` at 2.5px, `stroke-linejoin: round`. Seven points: 4px radius white-filled circles with 2px maroon stroke, growing to 6px and filling maroon on hover. Each point has an invisible 26px-radius hit circle at y=110 for comfortable hovering. Weekday labels at y=214 in `#8B7F73`. Tooltip on hover: absolutely positioned at the point's percentage coordinates, `transform: translate(-50%,-128%)`, `background: var(--ink)`, `color: var(--ivory)`, `padding: 9px 13px; border-radius: 8px`, containing the value in serif 20px and "Mon · reached" in micro label style.

   Chart math: `max = 450`, `x0 = 40`, `w = 560`, `top = 30`, `bot = 196`; `y = bot - (v/max) * (bot - top)`; `x = x0 + i * w / (n-1)`. Daily values: Mon 118, Tue 196, Wed 342, Thu 288, Fri 251, Sat 397, Sun 319.

Below: five metric cards, `grid-template-columns: repeat(auto-fit, minmax(135px,1fr)); gap: 12px`. Each is a standard card, `padding: 18px 20px`, `min-height: 150px`, `cursor: pointer`, hover `border-color: var(--beige-deep)`. Front face shows a micro label, the value in serif 30px with a unit, and a comparison chip (`background: var(--maroon-tint)`, `color: var(--maroon)`, sans 9px/700). **Clicking flips the card** — value and chip are replaced by the "why" sentence in sans 13px/1.55 `--ink-soft`. Clicking again flips back. Cards flip independently.

Metrics: Views 6,460 (+180% w/w) · Accounts reached ~1,900 (26× prior week) · Interactions 123 (9× prior week) · Reel reach 723 (First ever) · Followers 4,694 (+9 this week). "Why" copy in `seed-data.js`.

**Top performer card** — standard card, `overflow: hidden`. A 16:10 image (`assets/pasture-horses.jpg`) with an absolutely positioned badge top-left: "▶ Top performer", `background: rgba(46,38,34,.72)`, `color: var(--ivory)`, sans 8.5px/700 `.1em` uppercase, `border-radius: 999px`, `padding: 5px 10px`. Below, `padding: 16px 20px 20px`: title "The horse-fence Reel" (serif 18px), then three stats in a row (`gap: 20px`) each showing serif 20px value over a micro label — 723 Reached · 1,200+ Plays · 29 Likes — and a "Watch ↗" button (`background: var(--ink)`, `color: var(--ivory)`, `border-radius: 6px`, `padding: 11px 18px`, hover `--maroon`).

---

## Screen 2 — Where we've been

**Purpose:** the narrative record, month by month.

Header: eyebrow "Chapter by chapter", h1 "Where we've been.", month pill group (July / August / September).

1. **Baseline row** — four standard cards, `grid-template-columns: repeat(4,1fr); gap: 12px`, `padding: 18px 20px`. Micro label, serif 32px value with unit, maroon-tint chip. Content: Posts in 90 days = 1 ("Effectively silent") · Reels in 12 months = 0 ("Biggest untapped lever") · Avg daily reach = 25/day ("−84% from active pace") · Followers at baseline = 4,685 ("+43 with zero posts"). This row does **not** change with the month selector — it's the fixed starting point.
2. **Month note** — standard card with `border-left: 3px solid var(--maroon)`, `padding: 20px 24px`, one paragraph in sans 15px/1.6. Changes with the month.
3. **Meeting recaps** — h1 "Meeting recaps" (serif 34px, sentence case), then an accordion list, `gap: 8px`. Each item is a standard card, `overflow: hidden`. Collapsed header (`display: flex; gap: 20px; padding: 16px 22px; cursor: pointer`, hover `background: var(--ivory)`): a 44px date block (day numeral serif 22px in `--maroon` over a 3-letter month in sans 8px/700 `.14em` `--ink-faint`), the title (serif 17px), attendees (micro label uppercase `--ink-faint`), and a `▾` caret that rotates 180° on open (`transition: transform .15s`). Expanded body: `border-top: 1px solid var(--ivory)`, `padding: 16px 22px 20px 86px` (left-indented to align with the title), recap text in sans 14px/1.65 `--ink-soft` at `max-width: 70ch`, plus a "Full notes & transcript →" link. **One open at a time** — opening another closes the current; clicking an open one collapses it. First item opens by default; switching months resets to the first.
4. **What shipped** — three standard cards with `border-top: 3px solid var(--sage)`, `grid-template-columns: repeat(3,1fr)`. Each has a serif 19px title and a list of items, each row `display: flex; gap: 9px` with a `✓` in `--sage-deep` and text in sans 13px/1.5 `--ink-soft`.

September has an empty calls and shipped array — render the note only, no empty card shells.

---

## Screen 3 — Where we are

**Purpose:** the scoreboard, plus what the account actually looks like.

Header: eyebrow "The scoreboard · week of July 27", h1 "Where we are."

1. **Chart + donut row** — `grid-template-columns: 1.5fr 1fr; gap: 14px`.
   - Left: the same weekly-reach chart as Screen 1, with a fuller subtitle ("Hover any day · dotted lines are the two pace records") and the reference-line labels spelled out ("25/day baseline", "152/day best-ever pace").
   - Right: **interactions donut**. Title "123 interactions" (serif 21px) + "9× the week before". A 118px `viewBox="0 0 120 120"` SVG: four concentric-arc circles at `r=46`, `stroke-width: 13`, `transform: rotate(-90 60 60)`, each with `stroke-dasharray` = `<segment length> <circumference − segment length>` and a cumulative negative `stroke-dashoffset`. Hovering a slice raises its `stroke-width` to 18 (`transition: stroke-width .15s`) and swaps the center text to that slice's value and label; default center shows the total (123) over "INTERACTIONS". Legend rows to the right mirror the hover: 9px color square + "**73** likes" style text, row background `var(--ivory)` when hovered. Segments: likes 73 `#6C1E27` · comments & other 24 `#D8CBBE` · shares 21 `#6F7355` · saves 5 `#2E2622`.
2. **Scoreboard + phone row** — `display: flex; flex-wrap: wrap; gap: 14px`. Scoreboard `flex: 1 1 480px` as `grid-template-columns: repeat(auto-fit, minmax(180px,1fr))`; four standard cards (First-ever Reel 723 reach / "Beats 12-mo median (615)" · Total interactions 123 / "9× prior week" · Shares 21 / "The strongest signal" · Engagement rate 3.3% / "Holding as volume scales"), plus a full-width footnote: "Instagram insights via Windsor.ai · measured against the July 23, 2026 baseline."
3. **Instagram phone mock** — `flex: 0 1 320px; min-width: 290px`. Header row: "The account today" section label + "Open ↗" linking to `https://www.instagram.com/thefarmevents`.

   Device: `background: var(--ink); border-radius: 38px; padding: 9px; box-shadow: 0 12px 30px rgba(46,38,34,.18)`. Screen: `background: #fff; border-radius: 30px; overflow: hidden`.
   - Status bar: "9:41" left, `▮▮▮ ▮` right, sans 10px/700.
   - Handle row: "thefarmevents" (sans 13px/700) + `☰`, `border-bottom: 1px solid var(--cream)`.
   - Profile row: 66px avatar with a gradient ring (`padding: 2.5px; background: linear-gradient(135deg, var(--maroon), var(--gold-deep))`, inner circle `border: 2px solid #fff`, image `assets/pavilion-autumn.jpg`), then three stats spread evenly — 38 posts · 4,694 followers · 812 following (value sans 15px/700, label sans 11px `--ink-soft`).
   - Bio: "The Farm" (sans 12.5px/700) then "Weddings, events & lodging · Candler, NC / A gathering place just outside Asheville."
   - Buttons: "Following" (`--maroon`/`--ivory`) and "Message" (`--cream`/`--ink`), `flex: 1` each, `border-radius: 7px`.
   - Tabs: Grid / Reels / Tagged, `flex: 1` each, `padding: 10px 0`, sans 9px/700 `.12em` uppercase; active `color: var(--ink)` with `border-bottom: 2px solid var(--ink)`, inactive `--ink-faint`. Clicking swaps the grid.
   - Grid: `repeat(3,1fr)`, `gap: 2px`, `padding: 2px`, each cell `aspect-ratio: 1` with a cover-fit background image, a type glyph top-right (`▶` Reel, `▣` carousel, none for photo) at 9px white with `text-shadow: 0 1px 3px rgba(0,0,0,.5)`, and a reach number bottom-left in sans 8.5px/700 white with the same shadow.
   - Home indicator: 96px × 4px `--beige-deep` pill, centered.

   Grid contents per tab in `seed-data.js` (9 grid / 6 reels / 3 tagged).

---

## Screen 4 — Where we're going

**Purpose:** the roadmap, made visual.

Header: eyebrow "The road ahead", h1 "Where we're going.", horizon pill group (30 Days / 90 Days / 6 Months / 12 Months). **Default: 30 Days.**

1. **Horizon card + In motion** — `display: flex; flex-wrap: wrap; gap: 14px`. Horizon card `flex: 1 1 460px`, In motion `flex: 0 1 340px; min-width: 280px`.
   - **Horizon card** — emphasis card (`border-top: 3px solid var(--maroon)`), `padding: 22px 26px`. Header line: horizon title (serif 25px), date (micro label uppercase `--ink-faint`), and the question in **Dancing Script 16px `--gold-deep`** pushed right with `margin-left: auto`. Then three goals, `gap: 16px`: title (serif 15px) with a right-aligned readout ("273 → 318 /day", micro label uppercase), an 8px progress bar (`background: var(--cream)`, fill `var(--maroon)`, width = `max(3, min(100, now/goal*100))`%), and a description in sans 12px/1.5 `--ink-soft`.
   - **In motion** — standard card. Four rows: label (sans 12.5px) with right-aligned percentage (sans 9px/700 `--ink-faint`), then a 6px bar with a `--sage` fill.
2. **Twelve-month Gantt** — standard card, `padding: 22px 26px 18px`. Title "The next twelve months" (serif 21px) + a legend (Campaign `#6C1E27` · Shoot `#A06D28` · System `#6F7355`, each an 8px square + micro label).
   - Structure: **`grid-template-columns: 210px minmax(0,1fr); gap: 14px`** on both the header and every row. Left column is the task label (8px color square + name, sans 12.5px, ellipsis on overflow); right column is a nested `repeat(12, minmax(0,1fr))` track.
   - Month header: Aug…Jul in micro labels, centered, `border-bottom: 1px solid var(--cream)`.
   - Bars: `grid-column: <start+1> / span <span>`, `height: 16px`, `border-radius: 5px`, background = kind color, `title` = the month range ("Aug – Sep"). Rows `gap: 6px`, each row `align-items: center` with a 26px track height.
   - Do **not** put the label text inside the bar — short bars clip it. This is why the label column exists.
   - Eight rows, listed in `seed-data.js`.
3. **Cadence chips** — three `--parchment` cards, `border-radius: 14px`, `padding: 18px 20px`, `grid-template-columns: repeat(auto-fit, minmax(240px,1fr))`. Each: cadence label in `--maroon` micro label, then the title in serif 17px.
4. **Trajectory chart** (bottom of the page) — standard card, `padding: 24px 28px 16px`. Title "Daily reach — the trajectory" (serif 21px) and a three-item legend: Actual (16×3px `--maroon` bar) · 30-day projection (`--sage`) · Target (`--maroon` at `opacity: .5`).

   SVG `viewBox="0 0 900 300"`, `overflow: visible`. Geometry: `max = 1000`, `x0 = 52`, `w = 828`, `top = 40`, `bot = 252`; same `y` formula as the weekly chart.
   - Five horizontal gridlines at 0/250/500/750/1000 in `#EDE3D4`, with right-aligned value labels at x=44.
   - A vertical dashed `#C4B4A3` line at the last actual point, x-labelled "TODAY" at y=16.
   - Area fill under the whole series, `rgba(108,30,39,.08)`.
   - **Actual** polyline (Baseline → Today) `#6C1E27` at 3px.
   - **Projection** segment (Today → 30 Days) `#6F7355` at 3px, `stroke-dasharray: 2 5`, `stroke-linecap: round`, plus a `rgba(111,115,85,.18)` triangle band spanning ±18% of the projected value at the 30-day x — the confidence cone.
   - **Target** polyline (30 Days → 90 Days → 6 Months → 12 Months) `#6C1E27` at 2.5px, `stroke-dasharray: 7 6`, `opacity: .55`.
   - Points: actual filled maroon at r=6; projection filled `#6F7355`; targets white-filled with maroon stroke at r=5. The point matching the selected horizon grows to r=8 with a 3px stroke. **Clicking a milestone selects that horizon**, driving the card above.
   - Per-point labels: value above the point (serif 14px, 17px when selected; `#565A40` for the projection, `#6C1E27` otherwise), name at y=274 (sans 9.5px/700 `.1em` uppercase), date at y=290 (sans 9.5px `#8B7F73`).

   Series: Baseline 25 (Jul 23, actual) · Today 273 (Aug 22, actual) · 30 Days 318 (Sep 22, projection) · 90 Days 400 (Nov 2026, target) · 6 Months 620 (Jan 2027, target) · 12 Months 900 (Jul 2027, target).

**All SVG text must be real `<text>` nodes rendered from the data.** The prototype originally attempted this through its templating layer and the labels silently failed to render — worth knowing so the axis labels don't get lost again.

---

## Screen 5 — Content Calendar

**Purpose:** the three-week publishing plan, and where the client approves posts.

Header block (`display: flex; justify-content: space-between; flex-wrap: wrap`):
- Left (`max-width: 52ch`): eyebrow "Social / The Farm", h1 "Content calendar" (serif **40px**), then a lead line in sans 15px/1.6 `--ink-soft`: "Three weeks out — reels, carousels, stories, and feed posts. Hover a card for owner and status."
- Right: an "Approve in Planable ↗" button (`--maroon`, `border-radius: 14px`, `max-width: 150px`, vertically centered text) followed by two counter cards (standard card, `padding: 18px 26px`, `min-width: 112px`, centered): **12** PLANNED and **4** NEED APPROVAL (the second value in `--gold-deep`).

Filter row: `border-top: 1px solid var(--beige)`, `padding: 16px 0`. Five type chips (ALL TYPES / REELS / CAROUSELS / STORIES / FEED) on the left, and the type legend on the right (Reel `#6C1E27` · Carousel `#A06D28` · Story `#2E2622` · Feed `#6F7355`).

Calendar card (standard card, `overflow: hidden`):
- Title row: "Aug 19 — Sep 8" (serif 27px) + "Three weeks out" (micro label).
- Day header: `repeat(7, minmax(0,1fr))` on `background: var(--maroon)`, full weekday names in `--ivory` sans 9px/700 `.14em` uppercase, `padding: 13px 10px`. **Monday-start.**
- Three week rows, each `repeat(7, minmax(0,1fr))`. Cells: `min-height: 150px; padding: 9px 8px; border-right: 1px solid var(--cream); border-bottom: 1px solid var(--cream)`. A cell with a post is `#fff`; empty cells are `var(--ivory)`.
- Date numeral top-left: sans 11px, weight 700 `--ink` when the day has a post, 400 `--ink-faint` otherwise. The 1st of a month renders as "Sep 1" rather than "1".
- **Post card**: `border: 1px solid var(--beige); border-left: 3px solid <type color>; border-radius: 10px; overflow: hidden; background: #fff; margin-top: 7px; cursor: grab; box-shadow: 0 2px 8px rgba(46,38,34,.07)`, hover `border-color: var(--maroon)`. Contents top to bottom: a row with the type label (sans 8px/700 `.12em`, type color) and a 7px status dot; a 52px cover-fit image; then `padding: 8px 8px 9px` with the title in **serif 12px `--maroon`** and a bottom row of angle (micro, `--ink-faint`) and owner (micro, `--maroon`). `title` attribute = "Status · Owner — drag to reschedule".
- Footer row: a note on the left and the status legend on the right (7px round dots): Scheduled `#6F7355` · In review `#A06D28` · Shoot locked `#6C1E27` · In Planable `#8B7F73`.

### Type filter behavior

Selecting a type **dims non-matching cards to `opacity: .28`** rather than removing them. Deliberate — the rhythm of the schedule stays legible while you focus on one format.

### Drag to reschedule

HTML5 drag-and-drop. On drag start, the dragged card drops to `opacity: .4` and **every valid drop target lights up**: `background: rgba(216,203,190,.28)` with `outline: 1px dashed var(--beige-deep); outline-offset: -3px`. The cell under the cursor deepens to `var(--maroon-tint)`. `transition: background .12s`.

Valid target = an empty day, or the post's own current day. **Occupied days reject the drop** — one post per day, enforced.

On drop, the post's date changes, the card moves, and the footer note swaps from "Drag any post to another day to reschedule it." to "n rescheduled — push the changes in GHL". The detail modal's publish date follows the new date.

In the real build a reschedule is a persisted mutation visible to everyone, and the footer note should become a genuine sync affordance (a "Push to GHL" action, or automatic if you wire the API).

### Post detail modal

Opens on card click. Overlay `position: fixed; inset: 0; z-index: 60; background: rgba(46,38,34,.55)`, `display: flex; align-items: flex-start; justify-content: center; padding: 44px 24px; overflow: auto`. Clicking the overlay closes; clicks inside must not propagate.

Panel: `max-width: 760px; background: var(--ivory); border-radius: 16px; overflow: hidden; box-shadow: 0 24px 60px rgba(46,38,34,.35)`.

1. **Hero** — 190px cover image, a 30px circular close button top-right (`rgba(46,38,34,.7)`, `✕`, hover `--maroon`), and the type pill top-left (white on the type color, sans 8.5px/700 `.14em`, `border-radius: 999px`).
2. **Head** — `padding: 24px 28px 8px`. Publish date + time in `--maroon` micro label ("Aug 26, 2026 · 12:00 PM"), title in serif 27px, then a meta row (`gap: 26px`) of four label/value pairs — Format · Angle · Owner · Status — above a `1px solid var(--beige)` divider.
3. **Caption** — "Caption" section label, then a white panel (`border: 1px solid var(--beige); border-radius: 12px; padding: 16px 18px`) with the caption in sans 14px/1.65 and **`white-space: pre-wrap`** (captions contain intentional line breaks).
4. **Approval row** — white panel, `display: flex; align-items: center; gap: 12px; flex-wrap: wrap`.
   - Status pill: when unapproved, "Awaiting approval" on `--maroon-tint` in `--maroon`; when approved, "✓ Approved by [name]" on `rgba(111,115,85,.14)` in `--sage-deep`.
   - A `<select>` pushed right (`margin-left: auto`): "Select approver…" plus all six people.
   - Action button: "Approve post" → "Undo approval". `--maroon`/`--ivory` when an approver is selected; `--beige`/`--ink-soft` and inert when not. **Approving requires selecting a name first.**
5. **Notes & requested changes** — a list of white note cards (`border-radius: 12px; padding: 13px 16px`), each with the author (sans 11px/700 `--maroon`), a timestamp (sans 10.5px `--ink-faint`), and the body (sans 13.5px/1.55 `--ink-soft`). Empty state: "No notes yet. Ask for a change and it lands here." Below, a composer: a 2-row `<textarea>` ("Add a note or request a change…", `border-radius: 10px`) and an "Add note" button (`--ink`, hover `--maroon`). Empty submissions are a no-op. New notes attribute to the selected approver, falling back to "You".
6. **Footer** — `border-top: 1px solid var(--beige)`. "Final approval and scheduling happen in Planable." + an "Open in Planable ↗" button (`--maroon`).

**Anyone with dashboard access can approve any post.** No permission tiers — but the *record of who approved* is the point, so the approver name must persist with the approval, along with a real timestamp.

Twelve posts with full captions, times, angles, owners, and statuses are in `seed-data.js`.

---

## Screen 6 — Content Library

Header: eyebrow "Captured on the property", h1 "The Content Library.", and an "Open on Dropbox ↗" primary button.

Filter chips: All / Photo / Video / Reel, plus an "n of 12 shown" count.

Grid: `repeat(4,1fr)`, `gap: 12px`. Each item is a standard card, `overflow: hidden`, hover `border-color: var(--maroon)`. A 4:3 cover image (implement as a `background-image` div, not an `<img>` — the prototype needed this to fill reliably) with a tag pill top-left (`rgba(46,38,34,.72)`, white, sans 8px/700 `.1em` uppercase). Below, `padding: 12px 14px 14px`: title in serif 15px and the month in a micro label.

Below the grid, two `--parchment` cards (`grid-template-columns: 1fr 1fr`): upcoming shoots — "August 26 · shoot locked / Food & Beverage" and "September · planned / Accommodations" — each with a status label, serif 20px title, a description, and a "View the plan →" link.

---

## Screen 7 — Your Toolkit

Header: eyebrow "Built to outlast the engagement", h1 "Yours to keep."

Three stacked emphasis cards (`border-top: 3px solid var(--maroon)`), `padding: 26px 30px`, `grid-template-columns: 1fr 300px; gap: 32px; align-items: start`.

Left column: a roman numeral (serif 16px `--maroon`) beside the title (serif 25px), a description in sans 14px/1.6 `--ink-soft` at `max-width: 60ch`, then a dark CTA button and a `--parchment` status pill (sans 9px/700 `.1em` uppercase, `--sage-deep`).

Right column: `border-left: 1px solid var(--cream); padding-left: 26px`, a list of `✓` items in `--maroon` with text in sans 12.5px/1.5.

Three items: The Farm Marketing Brain · The Farm Design System · The Content Library. Copy in `seed-data.js`.

---

## Data model

The prototype's flat arrays map to these tables. Postgres types shown; adapt as needed.

```
people
  id            text primary key        -- 'kristie', 'melissa', …
  name          text not null
  initials      text not null           -- 2 chars, for avatars
  color         text not null           -- hex, avatar background
  auth_user_id  uuid references auth.users  -- null for non-login people (e.g. JJG)

tasks
  id            uuid primary key
  title         text not null
  assignee_id   text references people(id)
  due           text                    -- free-text in the prototype ('Aug 27', 'No date');
                                        -- prefer `date null` + a "no date" render path
  done          boolean not null default false
  done_by       text references people(id)
  done_at       timestamptz
  created_by    text references people(id)
  created_at    timestamptz not null default now()
  sort_order    int

posts
  id            uuid primary key
  publish_at    timestamptz not null    -- prototype splits date ('Aug 26') and time ('12:00 PM')
  type          text not null           -- Reel | Carousel | Story | Feed
  title         text not null
  caption       text not null           -- preserve newlines
  angle         text not null           -- Identity | Story | Proof | Authority | Contrarian | Offer
  owner_id      text references people(id)
  status        text not null           -- Scheduled | In review | Shoot locked | In Planable
  image_url     text
  planable_url  text                    -- per-post deep link (currently a generic app.planable.io link)
  approved_by   text references people(id)
  approved_at   timestamptz

post_notes
  id            uuid primary key
  post_id       uuid references posts(id) on delete cascade
  author_id     text references people(id)
  body          text not null
  created_at    timestamptz not null default now()

log_entries
  id            uuid primary key
  occurred_on   date not null
  kind          text not null           -- Numbers | Shipped | Call | Shoot | Asset
  title         text not null
  link_label    text                    -- 'Scoreboard', 'Recap', 'Open'
  link_view     text                    -- which tab it navigates to

metrics_snapshots               -- drives What's new and Where we are
  id            uuid primary key
  captured_on   date not null
  daily_reach   int
  views         int
  accounts_reached int
  interactions  int
  followers     int
  engagement_rate numeric
  daily_series  jsonb                   -- [{label:'Mon', v:118}, …]
  interaction_breakdown jsonb           -- [{label:'likes', value:73}, …]

library_items
  id, title, type (Photo|Video|Reel), month, image_url, source_url

-- Largely static narrative content; a CMS table or version-controlled JSON both work:
-- months (note, calls[], shipped[]), horizons (goals with now/goal/unit), gantt rows,
-- cadence, toolkit items, baseline stats.
```

### Multi-user requirements

1. **Auth** — Kristie and Elizabeth (and Melissa) each get a login. Magic-link email is the lowest-friction option for non-technical clients; avoid password resets becoming your support burden.
2. **Realtime sync** — task ticks, new tasks, approvals, notes, and reschedules must appear for other viewers without a refresh. Supabase Realtime on the four mutable tables covers this.
3. **No permission tiers** — anyone with access can add a task, reassign a task, tick anything, approve any post, and add notes. Attribution matters, not restriction. Every mutation records who and when.
4. **Notifications** — when a post enters "In review" or a note is added, email the relevant people. Resend or Postmark; keep it to one digest per event type per day so it doesn't become noise.
5. **Audit trail** — the approval record (who, when) is the compliance-relevant part of this system. Never overwrite it silently; an undo should be recorded, not erased.

### The data-refresh problem (important context)

The manager currently retypes every number by hand, and asked specifically how to stop. Design for this:

- **`metrics_snapshots` should be written by an import, not by hand.** GoHighLevel is already in the stack; Windsor.ai supplies the Instagram insights. Either an API pull on a daily cron or an admin-only upload endpoint that accepts the export file.
- **Posts should sync with GHL Social Planner**, which is where scheduling and client approval can genuinely live. If GHL's API supports the calendar reads and writes, this dashboard becomes a view over GHL rather than a parallel system to maintain. That is the single highest-value integration in this project — verify feasibility early, because it determines whether the calendar tab is authoritative or merely a mirror.
- Failing an API, a single seed/import file that refreshes every metric on every tab in one paste is the fallback, and still a large improvement over hand-editing.

---

## State shape (from the prototype)

Useful as a checklist of what needs to be either server state or UI state in the real build.

| Key | Type | Purpose | Real build |
| --- | --- | --- | --- |
| `view` | string | active tab | URL route |
| `collapsed` | bool | sidebar collapsed | localStorage |
| `done` | map id→bool | task completion | **server** |
| `assigned` | map id→personId | task assignee overrides | **server** |
| `extraTasks` | array | user-created tasks | **server** |
| `addingTask`, `tDraft` | bool, object | add-task form | UI |
| `openAssign` | index/null | which assignee dropdown is open | UI |
| `logMode` | 'list' \| 'calendar' | log display mode | UI (URL param is nicer) |
| `calIdx` | int | which month the log calendar shows | UI |
| `flipped` | map i→bool | metric cards showing their "why" | UI |
| `month` | string | Where we've been month | URL param |
| `openCall` | int | which recap is expanded | UI |
| `horizon` | string | Where we're going horizon | URL param |
| `hoverDay`, `hoverSlice` | index/null | chart hovers | UI |
| `igTab` | string | phone mock tab | UI |
| `ccType` | string | calendar type filter | URL param |
| `ccDates` | map i→dateKey | reschedule overrides | **server** |
| `ccDrag`, `ccOver` | index, dateKey | drag in progress | UI |
| `ccOpen` | index/null | open post modal | URL param (deep-linkable) |
| `ccApprover` | map i→name | selected approver per post | UI until submitted |
| `ccApproved` | map i→bool | approval state | **server** |
| `ccNotes` | map i→array | notes per post | **server** |
| `ccDraft` | string | note composer | UI |

---

## Interactions summary

| Interaction | Trigger | Behavior |
| --- | --- | --- |
| Tab navigation | sidebar click | swaps main content; sidebar item goes active |
| Sidebar collapse | `‹` / `›` button | width 244px ↔ 68px, `transition: width .22s ease`; labels, search, meta hide; nav becomes numerals with a maroon active pill |
| Task complete | checkbox click | fills sage with `✓`, title strikes through at `opacity: .45`, progress bar and count update |
| Task reassign | assignee chip click | dropdown of six people; picking one swaps the avatar and name, closes the menu |
| Add task | "+ Add task" | reveals the parchment form row; `＋` commits and clears; label becomes "Cancel" |
| Log mode | List / Month pills | swaps between the row list and the month grid |
| Log month | `‹` `›` | steps between July and August 2026 |
| Log entry | row link or calendar chip | navigates to the tab holding the detail |
| Metric flip | metric card click | replaces value + chip with the "why" sentence; independent per card |
| Chart hover | point hover (26px hit area) | point grows and fills; dark tooltip above with value and weekday |
| Donut hover | slice or legend row hover | slice `stroke-width` 13 → 18; center text becomes that slice's value and label |
| Recap expand | header click | accordion; one open at a time; caret rotates 180° |
| Month switch | July / August / September | swaps note, recaps, and shipped cards; resets the open recap |
| Horizon switch | pill or trajectory milestone click | swaps the horizon card's title, date, question, and three goal bars; the chart's selected point grows |
| Phone tab | Grid / Reels / Tagged | swaps the 3-up grid |
| Library filter | All / Photo / Video / Reel | filters the grid; count updates |
| Calendar type filter | type chips | dims non-matching cards to `opacity: .28` |
| Post drag | drag a card | card to `opacity: .4`; valid targets get a dashed outline and tint; hovered target deepens to maroon-tint |
| Post drop | release on a valid cell | post moves to that date; occupied days reject; footer note updates |
| Post open | card click | modal with caption, meta, approval, notes |
| Approve | select a name, then "Approve post" | status pill flips to "✓ Approved by [name]"; button becomes "Undo approval"; inert until a name is chosen |
| Add note | textarea + "Add note" | appends an attributed note; empty input is a no-op |
| Modal close | `✕`, overlay click | closes; inside clicks don't propagate |

## Responsive behavior

Designed for desktop (the client opens this on a laptop; the manager presents from it). Every multi-column row uses `flex-wrap` with explicit basis values or `repeat(auto-fit, minmax(...))`, so the layout degrades gracefully as the window narrows — but no mobile breakpoint was designed. **If mobile matters, ask before assuming;** the calendar grid and the Gantt in particular need a different treatment at phone width, not just reflow.

Two hard-won layout notes:
- Use `minmax(0, 1fr)` rather than `1fr` in the calendar grids. With `1fr`, wide chips push their column and the dates stop lining up with the weekday headers.
- Give side columns an explicit basis (`flex: 0 1 320px`) and the main column a floor (`flex: 1 1 500px`). Without floors, the metric cards compress to unreadable widths before anything wraps.

## Assets

Ten photographs in `assets/`, drawn from The Farm design system's photography library (`/assets/photography/` in the design system project). They are **stand-ins** — the real content library lives in the client's Dropbox, and production should pull from there or from a CDN.

`autumn-centerpiece.png` · `chapel-interior.jpg` · `chef-plating.jpg` · `firepit.jpg` · `gathering-place.jpg` · `golden-hour-dip.jpg` · `pasture-horses.jpg` · `pavilion-autumn.jpg` · `pavilion-night.jpg` · `pizza-oven.jpg`

Fonts: Playfair Display, Lato, Dancing Script — Google Fonts. `tokens/fonts.css` has the `@font-face` rules; `.woff2` binaries are available in the design system project under `assets/fonts/`.

No icon set. The prototype uses typographic glyphs only (`✓ ✕ ▾ ‹ › ＋ ▶ ▣ ☰ ⌕ ↗ →`). If you introduce icons, match the brand's restraint: one thin-stroke set (Lucide fits) at low visual weight — never filled or bold icons, and no emoji anywhere.

## Content notes

Content in `seed-data.js` is a mix of real and placeholder. Treat these as placeholder and confirm with the manager before launch:

- Daily reach values for the seven-day chart (they sum to the real 1,911 weekly figure, but the day-level split is invented)
- All twelve calendar posts — captions, times, angles, and owners were written to match each post's stated angle
- Trajectory targets (400 / 620 / 900) and the 318 projection — a straight extrapolation of current pace, not a model
- "In motion" completion percentages
- Gantt row spans
- Instagram grid reach numbers and the 38-post count
- Library thumbnails (design-system photography standing in for real assets)

Real, confirmed content: the baseline stats (1 post in 90 days, 0 Reels in 12 months, 25/day reach, 4,685 followers), the July and August meeting records and what shipped, the current 273/day and 6,460 views figures, the 723-reach first Reel against a 615 twelve-month median, and the toolkit items.

## Voice

The client's brand voice governs all copy: warm, sincere, grounded, precise. Speaks to *you*, as *we*. Em dashes and Oxford commas; almost no exclamation points. Never "bespoke", "exclusive", "premium", "perfect", "epic". **No emoji.** Headings in sentence case, never all caps — the one exception is the micro-label style, where uppercase is a typographic device, not shouting.

## Files in this bundle

```
design_handoff_farm_dashboard/
├── README.md                              ← this file
├── design-reference/
│   ├── standalone-dashboard.html           ← open this first; self-contained
│   └── Client Dashboard.dc.html            ← authored source (template + logic)
├── reference-logic.js                      ← logic class, extracted for reading
├── seed-data.js                            ← all content as plain data
├── tokens/
│   ├── colors.css  fonts.css  spacing.css  typography.css
└── assets/                                 ← 10 photographs
```

## Suggested build order

1. Shell — sidebar, routing, tokens, typography. Get the collapse animation right; it sets the quality bar.
2. Static tabs — Where we've been, Your Toolkit, Content Library. No writes, fast wins, proves the visual system.
3. Charts — the three SVG charts. Real `<text>` nodes, exact geometry. These carry the credibility of the whole dashboard.
4. Auth + data layer — schema, seed, logins for the three client users.
5. Checklist — the first multi-user surface. Get realtime working here where the stakes are low.
6. Content Calendar — grid, drag-and-drop, modal, approvals, notes. The most complex screen; build it last, when the patterns are settled.
7. Integrations — GHL and metrics import. Verify the GHL Social Planner API early even if you build it late; it changes the architecture.
