import type { FC } from "react";
import { Tooltip } from "@mantine/core";
import type { TimelineMilestone } from "@/components/case-studies/timeline.types";

export interface MilestoneMarkerProps {
  /** Milestone payload. */
  milestone: TimelineMilestone;
  /** Whether this milestone is currently selected. */
  isSelected: boolean;
  /** Invoked when the user clicks the milestone dot. */
  onSelect: (milestone: TimelineMilestone) => void;
}

/** Radius of the milestone diamond/dot (px). */
const MILESTONE_R = 10;

/**
 * A diamond-shaped milestone anchor dot rendered on the timeline belt.
 * Labels are handled by EraHeaderStrip; this component is dot-only.
 */
export const MilestoneMarker: FC<MilestoneMarkerProps> = ({
  milestone,
  isSelected,
  onSelect,
}) => (
  <Tooltip
    label={
      <div style={{ maxWidth: 220, whiteSpace: "normal", wordBreak: "break-word" }}>
        <div className="font-semibold text-xs">{milestone.title}</div>
        <div className="text-xs opacity-75 mt-0.5">{milestone.period}</div>
        <div className="text-xs opacity-60 mt-1 leading-snug line-clamp-2">
          {milestone.summary}
        </div>
      </div>
    }
    multiline
    maw={240}
    withArrow
    position="top"
    openDelay={150}
  >
    <button
      type="button"
      aria-label={milestone.title}
      aria-pressed={isSelected}
      onClick={() => onSelect(milestone)}
      style={{
        width: MILESTONE_R * 2,
        height: MILESTONE_R * 2,
        transform: isSelected ? "rotate(45deg) scale(1.2)" : "rotate(45deg)",
        transition: "transform 150ms ease, box-shadow 150ms ease",
      }}
      className={[
        "bg-cyan-600 dark:bg-cyan-500 border-2 border-white dark:border-neutral-900 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 relative z-10",
        isSelected
          ? "ring-2 ring-cyan-400 ring-offset-2 shadow-lg"
          : "hover:shadow-lg",
      ].join(" ")}
    />
  </Tooltip>
);
