import { scaleTime } from "d3-scale";
import { timeYear, timeMonth } from "d3-time";
import { timeFormat } from "d3-time-format";
import type {
  FilterChip,
  TimelineData,
  TimelineEventType,
  TimelineMilestone,
  TimelineSearchOption,
} from "@/components/case-studies/timeline.types";

/** Author name treated as "my" contributions on the timeline. */
export const PRIMARY_AUTHOR = "Davor Kirbis";

/** All event types in display order for legend rendering. */
export const ALL_EVENT_TYPES: TimelineEventType[] = [
  "contribution",
  "release",
  "milestone",
  "fix",
  "team",
  "infrastructure",
  "context",
  "field",
];

/** Tailwind classes for event-type color encoding on nodes. */
export const EVENT_TYPE_STYLES: Record<
  TimelineEventType,
  { fill: string; hex: string; ring: string; badge: string; label: string }
> = {
  release: {
    fill: "bg-green-500",
    hex: "#22c55e",
    ring: "ring-green-500/40",
    badge: "green",
    label: "Release",
  },
  contribution: {
    fill: "bg-cyan-500",
    hex: "#06b6d4",
    ring: "ring-cyan-500/40",
    badge: "cyan",
    label: "My contribution",
  },
  milestone: {
    fill: "bg-amber-500",
    hex: "#f59e0b",
    ring: "ring-amber-500/40",
    badge: "yellow",
    label: "Milestone",
  },
  fix: {
    fill: "bg-red-500",
    hex: "#ef4444",
    ring: "ring-red-500/40",
    badge: "red",
    label: "Fix",
  },
  team: {
    fill: "bg-violet-500",
    hex: "#8b5cf6",
    ring: "ring-violet-500/40",
    badge: "grape",
    label: "Team",
  },
  infrastructure: {
    fill: "bg-orange-500",
    hex: "#f97316",
    ring: "ring-orange-500/40",
    badge: "orange",
    label: "Infrastructure",
  },
  context: {
    fill: "bg-slate-500",
    hex: "#64748b",
    ring: "ring-slate-500/40",
    badge: "gray",
    label: "Context",
  },
  field: {
    fill: "bg-teal-500",
    hex: "#14b8a6",
    ring: "ring-teal-500/40",
    badge: "teal",
    label: "Field / Off-site",
  },
};

/** Palette for collaborator dots — stable per author via hash. */
const COLLABORATOR_DOT_COLORS = [
  "bg-violet-400",
  "bg-pink-400",
  "bg-indigo-400",
  "bg-rose-400",
  "bg-fuchsia-400",
  "bg-sky-400",
  "bg-lime-400",
  "bg-emerald-400",
] as const;

const COLLABORATOR_DOT_HEX = [
  "#a78bfa",
  "#f472b6",
  "#818cf8",
  "#fb7185",
  "#e879f9",
  "#38bdf8",
  "#a3e635",
  "#34d399",
] as const;

/**
 * Parse timeline dates for sorting and D3 scale input.
 * Supports `YYYY-MM` and `YYYY-MM-DD`. Month-only values sort at day 1.
 */
export const parseTimelineDate = (date: string): Date => {
  const parts = date.split("-").map(Number);
  const [year = 2023, month = 1, day = 1] = parts;
  return new Date(year, month - 1, day);
};

/** Whether the primary author contributed to this event. */
export const isPrimaryAuthorEvent = (authors: string[]): boolean =>
  authors.includes(PRIMARY_AUTHOR);

/** Non-primary authors shown as minimal collaborator dots. */
export const getCollaborators = (authors: string[]): string[] =>
  authors.filter((author) => author !== PRIMARY_AUTHOR);

/** Deterministic dot color class for a collaborator name. */
export const getCollaboratorColor = (author: string): string => {
  let hash = 0;
  for (let i = 0; i < author.length; i += 1) {
    hash = author.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLLABORATOR_DOT_COLORS.length;
  return COLLABORATOR_DOT_COLORS[index];
};

/** Deterministic hex color for a collaborator name (for SVG use). */
export const getCollaboratorHex = (author: string): string => {
  let hash = 0;
  for (let i = 0; i < author.length; i += 1) {
    hash = author.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLLABORATOR_DOT_HEX.length;
  return COLLABORATOR_DOT_HEX[index];
};

/** Split meta.period into start/end labels for timeline endpoints. */
export const splitTimelinePeriod = (
  period: string,
): { start: string; end: string } => {
  const [start = "", end = ""] = period.split("—").map((part) => part.trim());
  return { start, end };
};

/** Format an event date for compact display. */
export const formatEventDate = (date: string): string => {
  const parsed = parseTimelineDate(date);
  return parsed.toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
};

/** Format a date as "Feb 2023" style for axis tick labels. */
export const formatAxisDate = timeFormat("%b %Y");

/** Format a year for year-level tick labels. */
export const formatAxisYear = timeFormat("%Y");

// ---------------------------------------------------------------------------
// D3 time scale helpers
// ---------------------------------------------------------------------------

/** Padding in px on each end of the timeline track. */
export const TRACK_PADDING = 48;

/** Default horizontal track width (overridden by ResizeObserver in component). */
export const DEFAULT_TRACK_WIDTH = 900;

/** Default vertical track height. */
export const DEFAULT_TRACK_HEIGHT = 700;

/**
 * Build a D3 time scale mapping [minDate, maxDate] → [padding, size - padding].
 */
export const createTimeScale = (
  minDate: Date,
  maxDate: Date,
  size: number,
  padding = TRACK_PADDING,
) =>
  scaleTime()
    .domain([minDate, maxDate])
    .range([padding, size - padding])
    .clamp(true);

/**
 * Derive the overall date extent from all milestones + events.
 */
export const getDateExtent = (milestones: TimelineMilestone[]): [Date, Date] => {
  const allDates: Date[] = milestones.flatMap((m) => [
    parseTimelineDate(m.date),
    ...m.events.map((e) => parseTimelineDate(e.date)),
  ]);
  const min = new Date(Math.min(...allDates.map((d) => d.getTime())));
  const max = new Date(Math.max(...allDates.map((d) => d.getTime())));
  // Add a small buffer so dots don't sit right on the edge
  min.setMonth(min.getMonth() - 1);
  max.setMonth(max.getMonth() + 1);
  return [min, max];
};

/**
 * Generate year and quarter tick positions for the date axis.
 * Returns year ticks and month ticks (every 3 months).
 */
export const getAxisTicks = (
  minDate: Date,
  maxDate: Date,
): { years: Date[]; months: Date[] } => {
  const years = timeYear.range(
    timeYear.floor(minDate),
    timeYear.ceil(maxDate),
  );
  const months = timeMonth.every(3)?.range(
    timeMonth.floor(minDate),
    timeMonth.ceil(maxDate),
  ) ?? [];
  return { years, months };
};

/**
 * Generate filter chips from the most significant "contribution" events —
 * those authored by the primary author with a commit hash.
 */
export const buildFilterChips = (data: TimelineData): FilterChip[] => {
  const chips: FilterChip[] = [];
  for (const milestone of data.milestones) {
    for (const event of milestone.events) {
      if (
        isPrimaryAuthorEvent(event.authors) &&
        event.commit !== null &&
        (event.type === "contribution" || event.type === "release" || event.type === "milestone")
      ) {
        chips.push({
          label: event.title,
          eventId: event.id,
          milestoneId: milestone.id,
        });
      }
    }
  }
  // Cap to a reasonable number to avoid toolbar overflow
  return chips.slice(0, 12);
};

/**
 * Check whether an event matches a search query (case-insensitive).
 * Matches against title, summary, and tags.
 */
export const eventMatchesSearch = (
  event: { title: string; summary: string; tags: string[] },
  query: string,
): boolean => {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  return (
    event.title.toLowerCase().includes(q) ||
    event.summary.toLowerCase().includes(q) ||
    event.tags.some((tag) => tag.toLowerCase().includes(q))
  );
};

/** Whether a milestone matches a search query (case-insensitive). */
export const milestoneMatchesSearch = (
  milestone: Pick<TimelineMilestone, "title" | "summary" | "version" | "period">,
  query: string,
): boolean => {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  return (
    milestone.title.toLowerCase().includes(q) ||
    milestone.summary.toLowerCase().includes(q) ||
    milestone.version.toLowerCase().includes(q) ||
    milestone.period.toLowerCase().includes(q)
  );
};

/**
 * Build flat autocomplete options for every milestone and nested event.
 */
export const buildTimelineSearchOptions = (data: TimelineData): TimelineSearchOption[] => {
  const options: TimelineSearchOption[] = [];

  for (const milestone of data.milestones) {
    options.push({
      id: `milestone:${milestone.id}`,
      kind: "milestone",
      label: milestone.title,
      description: milestone.summary,
      group: "Milestones",
      milestoneId: milestone.id,
    });

    for (const event of milestone.events) {
      options.push({
        id: `event:${event.id}`,
        kind: "event",
        label: event.title,
        description: event.summary,
        group: milestone.title,
        milestoneId: milestone.id,
        eventId: event.id,
      });
    }
  }

  return options;
};

/**
 * Filter autocomplete options by query across labels, summaries, groups, and event tags.
 */
export const filterTimelineSearchOptions = (
  options: TimelineSearchOption[],
  data: TimelineData,
  query: string,
): TimelineSearchOption[] => {
  const q = query.trim().toLowerCase();
  if (!q) return options.slice(0, 24);

  const milestoneById = new Map(data.milestones.map((m) => [m.id, m]));

  return options.filter((option) => {
    if (
      option.label.toLowerCase().includes(q) ||
      option.description.toLowerCase().includes(q) ||
      option.group.toLowerCase().includes(q)
    ) {
      return true;
    }

    if (option.kind === "event" && option.eventId) {
      const milestone = milestoneById.get(option.milestoneId);
      const event = milestone?.events.find((e) => e.id === option.eventId);
      if (event?.tags.some((tag) => tag.toLowerCase().includes(q))) return true;
    }

    return false;
  }).slice(0, 24);
};

/**
 * Group filtered options for Mantine Autocomplete `data` prop.
 */
export const groupTimelineSearchOptions = (
  options: TimelineSearchOption[],
): Array<{ group: string; items: Array<{ value: string; label: string }> }> => {
  const groups = new Map<string, Array<{ value: string; label: string }>>();

  for (const option of options) {
    const items = groups.get(option.group) ?? [];
    items.push({ value: option.id, label: option.label });
    groups.set(option.group, items);
  }

  return Array.from(groups.entries()).map(([group, items]) => ({ group, items }));
};

// ---------------------------------------------------------------------------
// Era / zoom helpers
// ---------------------------------------------------------------------------

/**
 * Parse a milestone period string ("2023-02 — 2023-12") into [startDate, endDate].
 * The end date is extended by one month so the final era spans to its month end.
 */
export const parseMilestonePeriodDates = (period: string): [Date, Date] => {
  const [startStr = "", endStr = ""] = period.split("—").map((s) => s.trim());
  const start = parseTimelineDate(startStr);
  const end = parseTimelineDate(endStr);
  // Shift end one month forward so the span visually covers the whole last month
  end.setMonth(end.getMonth() + 1);
  return [start, end];
};

/**
 * Deterministic vertical jitter for an event dot within the belt.
 * Returns a value in [-maxJitter, +maxJitter].
 */
export const computeEventJitter = (
  eventId: string,
  beltH: number,
  dotR: number,
): number => {
  let h = 0;
  for (let i = 0; i < eventId.length; i++) {
    h = (h * 31 + eventId.charCodeAt(i)) | 0;
  }
  const maxJitter = beltH / 2 - dotR - 8;
  return ((Math.abs(h) % 1000) / 1000 - 0.5) * 2 * maxJitter;
};

/**
 * Subtle era background fill colors — one per milestone index (0-based).
 * Designed to be visible but not overwhelming in both light and dark mode.
 */
export const ERA_BG_COLORS = [
  "rgba(99,  179, 237, 0.12)", // sky-blue  — Stencil era
  "rgba(167, 139, 250, 0.12)", // violet    — v1 Last Stencil
  "rgba(52,  211, 153, 0.12)", // emerald   — React Rewrite
  "rgba(251, 191,  36, 0.12)", // amber     — Controlled Direction
  "rgba(20,  184, 166, 0.12)", // teal      — Mantine Direction
  "rgba(236,  72, 153, 0.10)", // pink      — MCP / AI Era
] as const;

/**
 * Accent border/label colors matching the era backgrounds — opaque version.
 */
export const ERA_ACCENT_COLORS = [
  "#63b3ed",
  "#a78bfa",
  "#34d399",
  "#fbbf24",
  "#14b8a6",
  "#ec4899",
] as const;
