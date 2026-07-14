/** Event categories from the Podium case-study timeline JSON. */
export type TimelineEventType =
  | "contribution"
  | "release"
  | "milestone"
  | "team"
  | "infrastructure"
  | "context"
  | "field"
  | "fix";

/** Single event within a milestone group. */
export interface TimelineEvent {
  /** Stable identifier for selection and keys. */
  id: string;
  /** ISO-like date string; may be year-month only (e.g. `2023-06`). */
  date: string;
  /** Category used for visual encoding on the timeline. */
  type: TimelineEventType;
  /** Short headline shown in the detail panel. */
  title: string;
  /** One-line summary for tooltips and panel preview. */
  summary: string;
  /** Longer narrative shown when the event is selected. */
  description: string;
  /** Git commit authors associated with this event. */
  authors: string[];
  /** Optional commit hash reference. */
  commit: string | null;
  /** Thematic labels (e.g. `react`, `mantine`). */
  tags: string[];
}

/** Tech snapshot attached to a milestone era. */
export interface ComponentSnapshot {
  /** Stack labels for the era (Stencil, React, Mantine, …). */
  tech_stack: string[];
  /** Primary npm package name for the era. */
  package: string;
  /** Number of documented components at snapshot time. */
  component_count: number;
  /** Component names included in the snapshot. */
  components: string[];
  /** Optional internal Storybook reference path. */
  storybook_ref: string | null;
}

/** Top-level milestone grouping on the horizontal timeline. */
export interface TimelineMilestone {
  /** Stable identifier for selection and keys. */
  id: string;
  /** Era headline rendered above the milestone node. */
  title: string;
  /** Version range label (e.g. `v0.19.1 — v1.1.0`). */
  version: string;
  /** Anchor date for chronological ordering. */
  date: string;
  /** Human-readable period span shown below the node. */
  period: string;
  /** Role held during this era. */
  author_role: string;
  /** One-paragraph era summary for the detail panel. */
  summary: string;
  /** Longer era narrative. */
  description: string;
  /** Result or impact statement for the era. */
  outcome: string;
  /** Context about collaborators during this era. */
  collaborator_context: string;
  /** Representative commit hash for the era. */
  anchor_commit: string;
  /** Component inventory snapshot for the era. */
  component_snapshot: ComponentSnapshot;
  /** Chronological events belonging to this milestone. */
  events: TimelineEvent[];
}

/** Role progression entry from timeline meta. */
export interface RoleProgressionEntry {
  /** Job title during the span. */
  title: string;
  /** Start month (YYYY-MM). */
  from: string;
  /** End month (YYYY-MM) or null if ongoing. */
  to: string | null;
  /** Short description of responsibilities. */
  summary: string;
}

/** Document metadata at the root of timeline.json. */
export interface TimelineMeta {
  /** Overall case-study span (e.g. `2023-02 — 2026-07`). */
  period: string;
  /** Primary author name used to distinguish "my" vs collaborator events. */
  primary_author: string;
  /** Current or headline role. */
  role: string;
  /** Ordered role changes over the case-study span. */
  role_progression: RoleProgressionEntry[];
  /** ISO timestamp when the JSON was generated. */
  generated_at: string;
  /** Human-readable purpose blurb for the dataset. */
  purpose: string;
  /** Narrative overview of the full case-study arc shown above the timeline. */
  overview: string;
}

/** Root shape of `src/assets/timeline.json`. */
export interface TimelineData {
  /** Case-study metadata and author context. */
  meta: TimelineMeta;
  /** Ordered milestone groups displayed on the timeline. */
  milestones: TimelineMilestone[];
}

/** Discriminated union for the inline detail panel selection state. */
export type TimelineSelection =
  | { kind: "milestone"; milestone: TimelineMilestone }
  | { kind: "event"; event: TimelineEvent; milestone: TimelineMilestone };

/** Timeline layout orientation. */
export type TimelineOrientation = "horizontal" | "vertical";

/**
 * Solo-filter: null means all types visible.
 * When set to a specific type, only that type's dots are fully visible;
 * all others are dimmed to near-invisible.
 */
export type SoloType = TimelineEventType | null;

/** Computed position for a single event or milestone dot on the SVG track. */
export interface DotPosition {
  /** Pixel offset along the primary axis (x for horizontal, y for vertical). */
  px: number;
  /** The milestone or event this position belongs to. */
  milestoneId: string;
  /** Null for milestone anchors; event id otherwise. */
  eventId: string | null;
}

/** A searchable milestone or event entry for the timeline autocomplete. */
export interface TimelineSearchOption {
  /** Stable option id (`milestone:…` or `event:…`). */
  id: string;
  /** Whether this option represents a milestone era or a single event. */
  kind: "milestone" | "event";
  /** Primary label shown in the autocomplete dropdown. */
  label: string;
  /** Secondary line (summary) shown beneath the label. */
  description: string;
  /** Combobox group heading (milestone title or "Milestones"). */
  group: string;
  /** Milestone that owns this option. */
  milestoneId: string;
  /** Event id when `kind` is `event`. */
  eventId?: string;
}

/** A filter chip representing a notable event for quick navigation. */
export interface FilterChip {
  /** Chip label shown in the toolbar. */
  label: string;
  /** Event id to navigate to. */
  eventId: string;
  /** Milestone id that owns this event. */
  milestoneId: string;
}
