import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { ScrollArea } from "@mantine/core";
import { EventDot } from "@/components/case-studies/EventDot";
import { MilestoneMarker } from "@/components/case-studies/MilestoneMarker";
import type {
  SoloType,
  TimelineEvent,
  TimelineMilestone,
  TimelineOrientation,
} from "@/components/case-studies/timeline.types";
import {
  computeEventJitter,
  createTimeScale,
  ERA_ACCENT_COLORS,
  ERA_BG_COLORS,
  eventMatchesSearch,
  formatAxisDate,
  formatAxisYear,
  getAxisTicks,
  getDateExtent,
  parseMilestonePeriodDates,
  TRACK_PADDING,
} from "@/components/case-studies/timeline.utils";

// ---------------------------------------------------------------------------
// Layout constants
// ---------------------------------------------------------------------------

/** Minimum inner track width for horizontal mode (px). Allows scrolling on small screens. */
const MIN_TRACK_WIDTH = 900;
/** Height of the era label strip above the belt (px). */
const ERA_HEADER_H = 52;
/** Height of the thick belt zone where dots live (px). */
const BELT_H = 88;
/** Dot radius for event nodes — must match EventDot's DOT_R (px). */
const DOT_R = 7;
/** Height of the date axis strip below the belt (px). */
const DATE_AXIS_H = 40;
/** Total height of the horizontal track. */
const H_TRACK_HEIGHT = ERA_HEADER_H + BELT_H + DATE_AXIS_H;
/** Vertical center of the belt (relative to track top). */
const BELT_CENTER_Y = ERA_HEADER_H + BELT_H / 2;

/** Fixed height for vertical mode track. */
const VERTICAL_TRACK_HEIGHT = 820;
/** Width reserved for era labels to the left of the vertical belt (px). */
const VERT_LABEL_W = 108;
/** Width of the vertical belt (px). */
const VERT_BELT_W = 88;
/** Left offset where the vertical belt starts (px). */
const VERT_BELT_LEFT = VERT_LABEL_W + 12;
/** Horizontal center of the vertical belt (px). */
const VERT_BELT_CENTER_X = VERT_BELT_LEFT + VERT_BELT_W / 2;
/** Left offset for the vertical date axis ticks (px). */
const VERT_AXIS_LEFT = VERT_BELT_LEFT + VERT_BELT_W + 10;
/** Total width of the vertical track column (px). */
const VERT_TRACK_WIDTH = VERT_AXIS_LEFT + 72;

export interface TimelineTrackProps {
  milestones: TimelineMilestone[];
  soloType: SoloType;
  searchQuery: string;
  orientation: TimelineOrientation;
  selectedMilestoneId: string | null;
  selectedEventId: string | null;
  hoveredContributor: string | null;
  scrollToEventId: string | null;
  /** When non-null, restricts the D3 scale to this date range (zoomed view). */
  zoomDomain: [Date, Date] | null;
  onMilestoneSelect: (milestone: TimelineMilestone) => void;
  onEventSelect: (event: TimelineEvent, milestone: TimelineMilestone) => void;
  onContributorHover: (author: string | null) => void;
  /** Triggered when user clicks an era label or belt span (zoom in). */
  onEraZoom: (milestone: TimelineMilestone) => void;
}

export const TimelineTrack: FC<TimelineTrackProps> = ({
  milestones,
  soloType,
  searchQuery,
  orientation,
  selectedMilestoneId,
  selectedEventId,
  hoveredContributor,
  scrollToEventId,
  zoomDomain,
  onMilestoneSelect,
  onEventSelect,
  onContributorHover,
  onEraZoom,
}) => {
  // Measure outer container width
  const outerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(MIN_TRACK_WIDTH);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    setContainerWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  // Dot refs for scroll-to
  const dotRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const setDotRef = useCallback(
    (eventId: string) => (el: HTMLDivElement | null) => {
      if (el) dotRefs.current.set(eventId, el);
      else dotRefs.current.delete(eventId);
    },
    [],
  );

  useEffect(() => {
    if (!scrollToEventId) return;
    dotRefs.current.get(scrollToEventId)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [scrollToEventId]);

  // -------------------------------------------------------------------------
  // D3 scale
  // -------------------------------------------------------------------------
  const globalExtent = getDateExtent(milestones);
  const [minDate, maxDate] = zoomDomain ?? globalExtent;

  const outerWidth = containerWidth || MIN_TRACK_WIDTH;
  // When zoomed, expand the inner width so dots are more spread out
  const trackWidth =
    orientation === "horizontal"
      ? zoomDomain
        ? Math.max(outerWidth, MIN_TRACK_WIDTH * 1.6)
        : Math.max(outerWidth, MIN_TRACK_WIDTH)
      : VERTICAL_TRACK_HEIGHT;

  const scale = createTimeScale(minDate, maxDate, trackWidth, TRACK_PADDING);

  const { years, months: quarters } = getAxisTicks(minDate, maxDate);

  // -------------------------------------------------------------------------
  // Visibility helper
  // -------------------------------------------------------------------------
  const isDotVisible = (event: TimelineEvent): boolean => {
    if (soloType !== null && event.type !== soloType) return false;
    if (searchQuery && !eventMatchesSearch(event, searchQuery)) return false;
    return true;
  };

  // -------------------------------------------------------------------------
  // Horizontal layout
  // -------------------------------------------------------------------------
  if (orientation === "horizontal") {
    return (
      <div ref={outerRef} className="relative w-full">
        <ScrollArea type="auto" offsetScrollbars>
          <div
            style={{ width: trackWidth, height: H_TRACK_HEIGHT, position: "relative" }}
          >
            {/* ================================================================
                ERA HEADER STRIP
                Shows permanent clickable era labels spanning their date range.
            ================================================================= */}
            <EraHeaderStrip
              milestones={milestones}
              scale={scale}
              selectedMilestoneId={selectedMilestoneId}
              height={ERA_HEADER_H}
              onEraClick={onEraZoom}
            />

            {/* ================================================================
                BELT BACKGROUND
                A rounded band spanning the full width.
            ================================================================= */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: ERA_HEADER_H,
                left: TRACK_PADDING - 8,
                right: TRACK_PADDING - 8,
                height: BELT_H,
              }}
              className="rounded-lg bg-neutral-100 dark:bg-neutral-800/60"
            />

            {/* ================================================================
                ERA BACKGROUND SPANS
                Colored tinted bands within the belt for each milestone era.
            ================================================================= */}
            {milestones.map((milestone, i) => {
              const [eraStart, eraEnd] = parseMilestonePeriodDates(milestone.period);
              const startPx = scale(eraStart);
              const endPx = scale(eraEnd);
              const width = Math.max(endPx - startPx, 4);
              const accentColor = ERA_ACCENT_COLORS[i % ERA_ACCENT_COLORS.length];
              const bgColor = ERA_BG_COLORS[i % ERA_BG_COLORS.length];

              return (
                <button
                  key={milestone.id}
                  type="button"
                  aria-label={`Zoom into ${milestone.title}`}
                  onClick={() => onEraZoom(milestone)}
                  style={{
                    position: "absolute",
                    top: ERA_HEADER_H,
                    left: startPx,
                    width,
                    height: BELT_H,
                    backgroundColor: bgColor,
                    borderLeft: `2px solid ${accentColor}44`,
                    borderRight: `2px solid ${accentColor}22`,
                    cursor: "zoom-in",
                  }}
                  className="transition-all duration-150 hover:brightness-110 focus:outline-none rounded-sm"
                />
              );
            })}

            {/* ================================================================
                BELT CENTER LINE — subtle guide
            ================================================================= */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: BELT_CENTER_Y,
                left: TRACK_PADDING,
                right: TRACK_PADDING,
                height: 1,
              }}
              className="bg-neutral-300/50 dark:bg-neutral-600/40"
            />

            {/* ================================================================
                MILESTONE DOTS
                Diamond markers centered in the belt at each milestone anchor date.
            ================================================================= */}
            {milestones.map((milestone) => {
              const px = scale(new Date(milestone.date));
              return (
                <div
                  key={milestone.id}
                  style={{
                    position: "absolute",
                    left: px,
                    top: BELT_CENTER_Y,
                    transform: "translate(-50%, -50%)",
                    zIndex: 20,
                  }}
                >
                  <MilestoneMarker
                    milestone={milestone}
                    isSelected={selectedMilestoneId === milestone.id}
                    onSelect={onMilestoneSelect}
                  />
                </div>
              );
            })}

            {/* ================================================================
                EVENT DOTS
                Positioned horizontally by date, vertically jittered within belt.
            ================================================================= */}
            {milestones.flatMap((milestone) =>
              milestone.events.map((event) => {
                const px = scale(new Date(event.date));
                const jitter = computeEventJitter(event.id, BELT_H, DOT_R);
                const dotTop = BELT_CENTER_Y + jitter;

                return (
                  <div
                    key={event.id}
                    ref={setDotRef(event.id)}
                    style={{
                      position: "absolute",
                      left: px,
                      top: dotTop,
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                    }}
                  >
                    <EventDot
                      event={event}
                      isSelected={selectedEventId === event.id}
                      isVisible={isDotVisible(event)}
                      hoveredContributor={hoveredContributor}
                      onSelect={(e) => onEventSelect(e, milestone)}
                      onContributorHover={onContributorHover}
                    />
                  </div>
                );
              })
            )}

            {/* ================================================================
                DATE AXIS
            ================================================================= */}
            <HorizontalDateAxis
              years={years}
              quarters={quarters}
              scale={scale}
              yBase={ERA_HEADER_H + BELT_H + 4}
            />
          </div>
        </ScrollArea>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Vertical layout — belt anchored on the left for split-screen pairing
  // -------------------------------------------------------------------------
  const containerHeight = VERTICAL_TRACK_HEIGHT;
  const vScale = createTimeScale(minDate, maxDate, containerHeight, TRACK_PADDING);
  const { years: vYears, months: vQuarters } = getAxisTicks(minDate, maxDate);

  return (
    <div ref={outerRef} className="relative w-full max-w-full">
      <ScrollArea type="auto" offsetScrollbars>
        <div
          style={{
            position: "relative",
            height: containerHeight,
            width: VERT_TRACK_WIDTH,
            minWidth: VERT_TRACK_WIDTH,
          }}
        >
          {/* Belt background */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: TRACK_PADDING - 8,
              bottom: TRACK_PADDING - 8,
              left: VERT_BELT_LEFT,
              width: VERT_BELT_W,
            }}
            className="rounded-lg bg-neutral-100 dark:bg-neutral-800/60"
          />

          {/* Era background spans */}
          {milestones.map((milestone, i) => {
            const [eraStart, eraEnd] = parseMilestonePeriodDates(milestone.period);
            const startPy = vScale(eraStart);
            const endPy = vScale(eraEnd);
            const height = Math.max(endPy - startPy, 4);
            const accentColor = ERA_ACCENT_COLORS[i % ERA_ACCENT_COLORS.length];
            const bgColor = ERA_BG_COLORS[i % ERA_BG_COLORS.length];

            return (
              <button
                key={milestone.id}
                type="button"
                aria-label={`Zoom into ${milestone.title}`}
                onClick={() => onEraZoom(milestone)}
                style={{
                  position: "absolute",
                  top: startPy,
                  left: VERT_BELT_LEFT,
                  width: VERT_BELT_W,
                  height,
                  backgroundColor: bgColor,
                  borderTop: `2px solid ${accentColor}44`,
                  borderBottom: `2px solid ${accentColor}22`,
                  cursor: "zoom-in",
                }}
                className="transition-all duration-150 hover:brightness-110 focus:outline-none"
              />
            );
          })}

          {/* Center guide */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: TRACK_PADDING,
              bottom: TRACK_PADDING,
              left: VERT_BELT_CENTER_X,
              width: 1,
              transform: "translateX(-50%)",
            }}
            className="bg-neutral-300/50 dark:bg-neutral-600/40"
          />

          {/* Milestone dots */}
          {milestones.map((milestone) => {
            const py = vScale(new Date(milestone.date));
            return (
              <div
                key={milestone.id}
                style={{
                  position: "absolute",
                  top: py,
                  left: VERT_BELT_CENTER_X,
                  transform: "translate(-50%, -50%)",
                  zIndex: 20,
                }}
              >
                <MilestoneMarker
                  milestone={milestone}
                  isSelected={selectedMilestoneId === milestone.id}
                  onSelect={onMilestoneSelect}
                />
              </div>
            );
          })}

          {/* Event dots — horizontal jitter within belt width */}
          {milestones.flatMap((milestone) =>
            milestone.events.map((event) => {
              const py = vScale(new Date(event.date));
              const jitter = computeEventJitter(event.id, VERT_BELT_W, DOT_R);

              return (
                <div
                  key={event.id}
                  ref={setDotRef(event.id)}
                  style={{
                    position: "absolute",
                    top: py,
                    left: VERT_BELT_CENTER_X + jitter,
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  <EventDot
                    event={event}
                    isSelected={selectedEventId === event.id}
                    isVisible={isDotVisible(event)}
                    hoveredContributor={hoveredContributor}
                    onSelect={(e) => onEventSelect(e, milestone)}
                    onContributorHover={onContributorHover}
                  />
                </div>
              );
            })
          )}

          {/* Era labels — left of the belt */}
          {milestones.map((milestone, i) => {
            const [eraStart, eraEnd] = parseMilestonePeriodDates(milestone.period);
            const midPy = (vScale(eraStart) + vScale(eraEnd)) / 2;
            const accentColor = ERA_ACCENT_COLORS[i % ERA_ACCENT_COLORS.length];
            const isSelected = selectedMilestoneId === milestone.id;

            return (
              <button
                key={`era-label-${milestone.id}`}
                type="button"
                onClick={() => onEraZoom(milestone)}
                style={{
                  position: "absolute",
                  top: midPy,
                  left: 0,
                  width: VERT_LABEL_W - 4,
                  transform: "translateY(-50%)",
                  borderRight: `3px solid ${accentColor}`,
                  paddingRight: 8,
                  cursor: "zoom-in",
                  textAlign: "right",
                }}
                className={[
                  "focus:outline-none transition-opacity duration-150",
                  isSelected ? "opacity-100" : "opacity-70 hover:opacity-100",
                ].join(" ")}
              >
                <p
                  style={{ fontSize: 10, fontWeight: 600, lineHeight: 1.3, color: accentColor }}
                  className="leading-tight line-clamp-2"
                >
                  {milestone.title}
                </p>
                <p style={{ fontSize: 9 }} className="text-neutral-400 dark:text-neutral-600 mt-0.5">
                  {milestone.period}
                </p>
              </button>
            );
          })}

          {/* Vertical date axis — right of the belt */}
          <VerticalDateAxis
            years={vYears}
            quarters={vQuarters}
            scale={vScale}
            axisLeft={VERT_AXIS_LEFT}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

// ---------------------------------------------------------------------------
// EraHeaderStrip — permanent era labels above the belt
// ---------------------------------------------------------------------------

interface EraHeaderStripProps {
  milestones: TimelineMilestone[];
  scale: (d: Date) => number;
  selectedMilestoneId: string | null;
  height: number;
  onEraClick: (milestone: TimelineMilestone) => void;
}

const EraHeaderStrip: FC<EraHeaderStripProps> = ({
  milestones,
  scale,
  selectedMilestoneId,
  height,
  onEraClick,
}) => (
  <>
    {milestones.map((milestone, i) => {
      const [eraStart, eraEnd] = parseMilestonePeriodDates(milestone.period);
      const startPx = scale(eraStart);
      const endPx = scale(eraEnd);
      const width = Math.max(endPx - startPx, 60);
      const accentColor = ERA_ACCENT_COLORS[i % ERA_ACCENT_COLORS.length];
      const isSelected = selectedMilestoneId === milestone.id;

      return (
        <button
          key={milestone.id}
          type="button"
          aria-label={`${milestone.title} — click to zoom`}
          onClick={() => onEraClick(milestone)}
          style={{
            position: "absolute",
            top: 0,
            left: startPx,
            width,
            height,
            paddingLeft: 8,
            paddingRight: 4,
            borderLeft: `3px solid ${accentColor}`,
            borderBottom: `2px solid ${accentColor}44`,
            cursor: "zoom-in",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            overflow: "hidden",
            backgroundColor: isSelected ? `${accentColor}18` : "transparent",
            transition: "background-color 150ms ease",
          }}
          className={[
            "text-left focus:outline-none hover:brightness-105",
            isSelected ? "" : "hover:bg-black/5 dark:hover:bg-white/5",
          ].join(" ")}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: accentColor,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
            }}
          >
            {milestone.title}
          </span>
          <span
            style={{ fontSize: 9, lineHeight: 1.2, whiteSpace: "nowrap", display: "block" }}
            className="text-neutral-400 dark:text-neutral-500"
          >
            {milestone.period}
          </span>
        </button>
      );
    })}
  </>
);

// ---------------------------------------------------------------------------
// Date axis sub-components
// ---------------------------------------------------------------------------

interface AxisProps {
  years: Date[];
  quarters: Date[];
  scale: (d: Date) => number;
}

const HorizontalDateAxis: FC<AxisProps & { yBase: number }> = ({
  years,
  quarters,
  scale,
  yBase,
}) => (
  <>
    {quarters.map((d) => {
      const x = scale(d);
      const isYear = years.some((y) => y.getTime() === d.getTime());
      if (isYear) return null;
      return (
        <div
          key={d.getTime()}
          aria-hidden
          style={{
            position: "absolute",
            left: x,
            top: yBase,
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: 1, height: 6 }} className="bg-neutral-300 dark:bg-neutral-600 opacity-60" />
          <span
            style={{ fontSize: 9, marginTop: 2, whiteSpace: "nowrap" }}
            className="text-neutral-400 dark:text-neutral-600 select-none"
          >
            {formatAxisDate(d)}
          </span>
        </div>
      );
    })}
    {years.map((d) => {
      const x = scale(d);
      return (
        <div
          key={d.getTime()}
          aria-hidden
          style={{
            position: "absolute",
            left: x,
            top: yBase,
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: 2, height: 12 }} className="bg-neutral-400 dark:bg-neutral-500" />
          <span
            style={{ fontSize: 10, marginTop: 3, fontWeight: 600, whiteSpace: "nowrap" }}
            className="text-neutral-500 dark:text-neutral-400 select-none"
          >
            {formatAxisYear(d)}
          </span>
        </div>
      );
    })}
  </>
);

const VerticalDateAxis: FC<AxisProps & { axisLeft: number }> = ({
  years,
  quarters,
  scale,
  axisLeft,
}) => (
  <>
    {quarters.map((d) => {
      const y = scale(d);
      const isYear = years.some((yr) => yr.getTime() === d.getTime());
      if (isYear) return null;
      return (
        <div
          key={d.getTime()}
          aria-hidden
          style={{
            position: "absolute",
            top: y,
            left: axisLeft,
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <div style={{ width: 6, height: 1 }} className="bg-neutral-300 dark:bg-neutral-600 opacity-60" />
          <span style={{ fontSize: 9, whiteSpace: "nowrap" }} className="text-neutral-400 dark:text-neutral-600 select-none">
            {formatAxisDate(d)}
          </span>
        </div>
      );
    })}
    {years.map((d) => {
      const y = scale(d);
      return (
        <div
          key={d.getTime()}
          aria-hidden
          style={{
            position: "absolute",
            top: y,
            left: axisLeft,
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <div style={{ width: 10, height: 2 }} className="bg-neutral-400 dark:bg-neutral-500" />
          <span style={{ fontSize: 10, fontWeight: 600, whiteSpace: "nowrap" }} className="text-neutral-500 dark:text-neutral-400 select-none">
            {formatAxisYear(d)}
          </span>
        </div>
      );
    })}
  </>
);
