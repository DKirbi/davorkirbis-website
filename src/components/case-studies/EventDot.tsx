import type { FC } from "react";
import { Tooltip } from "@mantine/core";
import type { TimelineEvent } from "@/components/case-studies/timeline.types";
import {
  EVENT_TYPE_STYLES,
  formatEventDate,
  getCollaboratorHex,
  getCollaborators,
  isPrimaryAuthorEvent,
} from "@/components/case-studies/timeline.utils";

export interface EventDotProps {
  /** Event payload. */
  event: TimelineEvent;
  /** Whether this event is currently selected. */
  isSelected: boolean;
  /**
   * Whether this event is fully visible.
   * false = solo filter active and this event's type is not soloed, OR no search match.
   * Dimmed dots show at 10% opacity and are non-interactive.
   */
  isVisible: boolean;
  /** Contributor name currently hovered in the detail panel (null if none). */
  hoveredContributor: string | null;
  /** Invoked when the user clicks the event dot. */
  onSelect: (event: TimelineEvent) => void;
  /** Invoked when the user hovers a contributor dot. */
  onContributorHover: (author: string | null) => void;
  /** DOM ref callback for scroll-to support. */
  dotRef?: (el: HTMLDivElement | null) => void;
}

/** Dot radius for main event nodes (px). */
const DOT_R = 7;
/** Dot radius for contributor dots (px). */
const COLLAB_R = 4;

/**
 * A single event dot rendered inside the timeline belt.
 * Absolute positioning (left + top) is handled entirely by the parent.
 * This component renders the button, tooltip, and contributor dots.
 */
export const EventDot: FC<EventDotProps> = ({
  event,
  isSelected,
  isVisible,
  hoveredContributor,
  onSelect,
  onContributorHover,
  dotRef,
}) => {
  const styles = EVENT_TYPE_STYLES[event.type];
  const isMine = isPrimaryAuthorEvent(event.authors);
  const collaborators = getCollaborators(event.authors);

  return (
    <div
      ref={dotRef}
      className="flex flex-col items-center"
      style={{ opacity: isVisible ? 1 : 0.1, pointerEvents: isVisible ? "auto" : "none", transition: "opacity 200ms ease" }}
    >
      {/* Main event dot */}
      <Tooltip
        label={
          <div style={{ maxWidth: 220, whiteSpace: "normal", wordBreak: "break-word" }}>
            <div className="font-medium text-xs leading-snug">{event.title}</div>
            <div className="text-xs opacity-75 mt-0.5">{formatEventDate(event.date)}</div>
            {event.summary && (
              <div className="text-xs opacity-60 mt-1 leading-relaxed line-clamp-3">
                {event.summary}
              </div>
            )}
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
          aria-label={event.title}
          aria-pressed={isSelected}
          onClick={() => onSelect(event)}
          style={{
            width: DOT_R * 2,
            height: DOT_R * 2,
            borderRadius: "50%",
            border: "2px solid",
            borderColor: isMine ? "white" : styles.hex,
            backgroundColor: isMine ? styles.hex : "transparent",
            boxShadow: isSelected ? `0 0 0 3px ${styles.hex}55` : undefined,
            transform: isSelected ? "scale(1.35)" : undefined,
            transition: "transform 150ms ease, box-shadow 150ms ease",
            cursor: "pointer",
            outline: "none",
            flexShrink: 0,
          }}
          className={[
            "focus-visible:ring-2 focus-visible:ring-offset-1 relative z-10",
            isSelected ? "" : "hover:scale-125",
          ].join(" ")}
          onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.transform = "scale(1.25)"; }}
          onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.transform = ""; }}
        />
      </Tooltip>

      {/* Contributor dots — rendered directly below the main dot */}
      {collaborators.length > 0 && (
        <div className="flex items-center gap-0.5 mt-0.5">
          {collaborators.map((author) => {
            const isHighlighted = hoveredContributor === author;
            return (
              <Tooltip
                key={author}
                label={author}
                withArrow
                position="bottom"
                openDelay={100}
              >
                <span
                  role="presentation"
                  onMouseEnter={() => onContributorHover(author)}
                  onMouseLeave={() => onContributorHover(null)}
                  style={{
                    width: COLLAB_R * 2,
                    height: COLLAB_R * 2,
                    borderRadius: "50%",
                    backgroundColor: getCollaboratorHex(author),
                    opacity: isHighlighted ? 1 : 0.7,
                    transform: isHighlighted ? "scale(1.5)" : "scale(1)",
                    transition: "transform 150ms ease, opacity 150ms ease",
                    display: "inline-block",
                    flexShrink: 0,
                    cursor: "default",
                  }}
                />
              </Tooltip>
            );
          })}
        </div>
      )}
    </div>
  );
};
