// Shapes mirror the tables sketched in design_handoff_farm_dashboard/README.md
// ("Data model" section). Fields not yet backed by Supabase are still typed
// here so the static content can be ported as-is and swapped for live
// queries later without reshaping the UI.

export type NavId = "now" | "been" | "are" | "going" | "calendar" | "library" | "toolkit";

export interface NavItem {
  id: NavId;
  label: string;
  num: string;
  href: string;
}

export interface Person {
  id: string;
  name: string;
  initials: string;
  color: string;
}

export interface Task {
  key: string;
  title: string;
  who: string;
  due: string;
}

export type LogKind = "Numbers" | "Shipped" | "Call" | "Shoot" | "Asset";

export interface FeedEntry {
  date: string;
  kind: LogKind;
  title: string;
  link: string;
  view: NavId;
}

export interface HeroMetric {
  label: string;
  value: string;
  unit: string;
  week: string;
  base: string;
  why: string;
}

export interface BaselineStat {
  label: string;
  value: string;
  unit: string;
  chip: string;
}

export interface MeetingRecap {
  day: string;
  mon: string;
  title: string;
  who: string;
  recap: string;
}

export interface ShippedGroup {
  title: string;
  items: string[];
}

export interface MonthRecord {
  note: string;
  calls: MeetingRecap[];
  shipped: ShippedGroup[];
}

export type HorizonKey = "30 Days" | "90 Days" | "6 Months" | "12 Months";

export interface HorizonGoal {
  t: string;
  d: string;
  now: number;
  goal: number;
  unit: string;
}

export interface Horizon {
  title: string;
  when: string;
  question: string;
  goals: HorizonGoal[];
}

export interface InMotionItem {
  label: string;
  pct: number;
}

export type PostType = "Reel" | "Carousel" | "Story" | "Feed";
export type PostStatus = "Scheduled" | "In review" | "Shoot locked" | "In Planable";
export type Angle = "Identity" | "Story" | "Proof" | "Authority" | "Contrarian" | "Offer";

export interface Post {
  date: string;
  time: string;
  caption: string;
  type: PostType;
  title: string;
  angle: Angle;
  owner: string;
  status: PostStatus;
  img: string;
}

export interface CadenceItem {
  every: string;
  title: string;
  body: string;
}

export type LibraryTag = "Photo" | "Video" | "Reel";

export interface LibraryItem {
  img: string;
  title: string;
  tag: LibraryTag;
  month: string;
}

export interface ToolkitItem {
  num: string;
  title: string;
  body: string;
  cta: string;
  status: string;
  items: string[];
}

export interface GanttRow {
  what: string;
  start: number;
  span: number;
  kind: "campaign" | "shoot" | "system";
}

export interface TrajectoryPoint {
  label: string;
  when: string;
  value: number;
  kind: "actual" | "projection" | "target";
}
