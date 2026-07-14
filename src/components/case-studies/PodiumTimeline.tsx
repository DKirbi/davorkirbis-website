import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import timelineData from "@/assets/timeline.json";
import { TimelineOverview } from "@/components/case-studies/TimelineOverview";
import { TimelineDetailPanel } from "@/components/case-studies/TimelineDetailPanel";
import { TimelineLegend } from "@/components/case-studies/TimelineLegend";
import { TimelineToolbar } from "@/components/case-studies/TimelineToolbar";
import { TimelineTrack } from "@/components/case-studies/TimelineTrack";
import type {
  SoloType,
  TimelineData,
  TimelineEvent,
  TimelineEventType,
  TimelineMilestone,
  TimelineOrientation,
  TimelineSearchOption,
  TimelineSelection,
} from "@/components/case-studies/timeline.types";
import { parseMilestonePeriodDates } from "@/components/case-studies/timeline.utils";

const data = timelineData as TimelineData;

// Quick jump chips — temporarily disabled; restore with buildFilterChips(data).
// const FILTER_CHIPS = buildFilterChips(data);

/** Horizontal Podium case-study timeline — orchestrator. */
export type PodiumTimelineProps = Record<string, never>;

export const PodiumTimeline: FC<PodiumTimelineProps> = () => {
  const { t } = useTranslation();

  // -------------------------------------------------------------------------
  // State
  // -------------------------------------------------------------------------

  const [selection, setSelection] = useState<TimelineSelection | null>(() => ({
    kind: "milestone",
    milestone: data.milestones[0],
  }));

  /** Solo legend filter: null = all types visible. */
  const [soloType, setSoloType] = useState<SoloType>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [orientation, setOrientation] = useState<TimelineOrientation>("horizontal");
  const [hoveredContributor, setHoveredContributor] = useState<string | null>(null);
  const [scrollToEventId, setScrollToEventId] = useState<string | null>(null);

  /**
   * Zoomed milestone id — when set, the D3 scale narrows to that milestone's period.
   * null = full global view.
   */
  const [zoomedMilestoneId, setZoomedMilestoneId] = useState<string | null>(null);

  // -------------------------------------------------------------------------
  // Derived values
  // -------------------------------------------------------------------------

  const selectedMilestoneId =
    selection?.kind === "milestone"
      ? selection.milestone.id
      : selection?.kind === "event"
        ? selection.milestone.id
        : null;

  const selectedEventId = selection?.kind === "event" ? selection.event.id : null;

  const zoomedMilestoneIndex = useMemo(() => {
    if (!zoomedMilestoneId) return -1;
    return data.milestones.findIndex((m) => m.id === zoomedMilestoneId);
  }, [zoomedMilestoneId]);

  const zoomedMilestone =
    zoomedMilestoneIndex >= 0 ? data.milestones[zoomedMilestoneIndex] : null;

  /** D3 zoom domain — null means use global extent. */
  const zoomDomain: [Date, Date] | null = useMemo(() => {
    if (!zoomedMilestone) return null;
    return parseMilestonePeriodDates(zoomedMilestone.period);
  }, [zoomedMilestone]);

  const zoomLabel = zoomedMilestone?.title ?? t("caseStudies.zoomAllEras");
  const canZoomOut = zoomedMilestoneId !== null;
  const canZoomIn =
    zoomedMilestoneId === null ||
    zoomedMilestoneIndex < data.milestones.length - 1;
  const canReset = zoomedMilestoneId !== null;

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  const handleMilestoneSelect = useCallback((milestone: TimelineMilestone) => {
    setSelection({ kind: "milestone", milestone });
    setScrollToEventId(null);
  }, []);

  const handleEventSelect = useCallback(
    (event: TimelineEvent, milestone: TimelineMilestone) => {
      setSelection({ kind: "event", event, milestone });
    },
    [],
  );

  const handleSoloToggle = useCallback((type: TimelineEventType) => {
    setSoloType((prev) => (prev === type ? null : type));
  }, []);

  const handleShowAll = useCallback(() => setSoloType(null), []);

  // Quick jump — temporarily disabled.
  // const handleChipClick = useCallback((chip: FilterChip) => { ... }, []);

  const handleOrientationToggle = useCallback(() => {
    setOrientation((prev) => (prev === "horizontal" ? "vertical" : "horizontal"));
  }, []);

  const zoomToMilestone = useCallback((milestone: TimelineMilestone) => {
    setZoomedMilestoneId(milestone.id);
    setSelection({ kind: "milestone", milestone });
  }, []);

  /**
   * Zoom into a milestone's time range (era click on track).
   * Also selects the milestone so the detail panel updates.
   */
  const handleEraZoom = useCallback(
    (milestone: TimelineMilestone) => {
      zoomToMilestone(milestone);
    },
    [zoomToMilestone],
  );

  /** Reset to full global view. */
  const handleZoomReset = useCallback(() => {
    setZoomedMilestoneId(null);
  }, []);

  /** Zoom in to the next era (or selected/first era from global view). */
  const handleZoomIn = useCallback(() => {
    if (zoomedMilestoneId === null) {
      const targetId = selectedMilestoneId ?? data.milestones[0]?.id;
      const milestone = data.milestones.find((m) => m.id === targetId);
      if (milestone) zoomToMilestone(milestone);
      return;
    }

    const next = data.milestones[zoomedMilestoneIndex + 1];
    if (next) zoomToMilestone(next);
  }, [selectedMilestoneId, zoomToMilestone, zoomedMilestoneId, zoomedMilestoneIndex]);

  /** Zoom out one era level, or back to the full timeline. */
  const handleZoomOut = useCallback(() => {
    if (zoomedMilestoneId === null) return;

    if (zoomedMilestoneIndex <= 0) {
      setZoomedMilestoneId(null);
      return;
    }

    const previous = data.milestones[zoomedMilestoneIndex - 1];
    if (previous) zoomToMilestone(previous);
  }, [zoomToMilestone, zoomedMilestoneId, zoomedMilestoneIndex]);

  /** Focus a milestone or event from autocomplete search. */
  const handleSearchSelect = useCallback(
    (option: TimelineSearchOption) => {
      const milestone = data.milestones.find((m) => m.id === option.milestoneId);
      if (!milestone) return;

      zoomToMilestone(milestone);

      if (option.kind === "event" && option.eventId) {
        const event = milestone.events.find((e) => e.id === option.eventId);
        if (event) {
          setSelection({ kind: "event", event, milestone });
          setScrollToEventId(event.id);
          return;
        }
      }

      setSelection({ kind: "milestone", milestone });
      setScrollToEventId(null);
    },
    [zoomToMilestone],
  );

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="relative">
      {/* Case-study intro */}
      <header className="mb-2">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Podium
        </h2>
      </header>

      <TimelineOverview
        meta={data.meta}
        milestones={data.milestones}
        selectedMilestoneId={selectedMilestoneId}
        onMilestoneFocus={handleEraZoom}
      />

      {/* Toolbar: autocomplete + zoom controls + orientation */}
      <TimelineToolbar
        data={data}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSelect={handleSearchSelect}
        orientation={orientation}
        onOrientationToggle={handleOrientationToggle}
        zoomLabel={zoomLabel}
        canZoomOut={canZoomOut}
        canZoomIn={canZoomIn}
        canReset={canReset}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
      />

      {/* Interactive legend */}
      <TimelineLegend
        soloType={soloType}
        onSoloToggle={handleSoloToggle}
        onShowAll={handleShowAll}
      />

      {orientation === "vertical" ? (
        /* Vertical split: timeline left, detail panel right */
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-[minmax(260px,42%)_1fr] gap-6 lg:gap-8 items-start">
          <div className="min-w-0">
            <TimelineTrack
              milestones={data.milestones}
              soloType={soloType}
              searchQuery={searchQuery}
              orientation={orientation}
              selectedMilestoneId={selectedMilestoneId}
              selectedEventId={selectedEventId}
              hoveredContributor={hoveredContributor}
              scrollToEventId={scrollToEventId}
              zoomDomain={zoomDomain}
              onMilestoneSelect={handleMilestoneSelect}
              onEventSelect={handleEventSelect}
              onContributorHover={setHoveredContributor}
              onEraZoom={handleEraZoom}
            />
          </div>

          <TimelineDetailPanel
            selection={selection}
            hoveredContributor={hoveredContributor}
            onContributorHover={setHoveredContributor}
            placement="sidebar"
          />
        </div>
      ) : (
        <>
          {/* Horizontal: track above, detail below */}
          <div className="mt-2">
            <TimelineTrack
              milestones={data.milestones}
              soloType={soloType}
              searchQuery={searchQuery}
              orientation={orientation}
              selectedMilestoneId={selectedMilestoneId}
              selectedEventId={selectedEventId}
              hoveredContributor={hoveredContributor}
              scrollToEventId={scrollToEventId}
              zoomDomain={zoomDomain}
              onMilestoneSelect={handleMilestoneSelect}
              onEventSelect={handleEventSelect}
              onContributorHover={setHoveredContributor}
              onEraZoom={handleEraZoom}
            />
          </div>

          <TimelineDetailPanel
            selection={selection}
            hoveredContributor={hoveredContributor}
            onContributorHover={setHoveredContributor}
            placement="below"
          />
        </>
      )}
    </div>
  );
};
