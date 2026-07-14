import type { FC } from "react";
import {
  IconLayoutColumns,
  IconLayoutRows,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { TimelineSearchAutocomplete } from "@/components/case-studies/TimelineSearchAutocomplete";
import { TimelineZoomControls } from "@/components/case-studies/TimelineZoomControls";
import type {
  TimelineData,
  TimelineOrientation,
  TimelineSearchOption,
} from "@/components/case-studies/timeline.types";

export interface TimelineToolbarProps {
  /** Timeline dataset for autocomplete options. */
  data: TimelineData;
  /** Current search query string. */
  searchQuery: string;
  /** Invoked on every keystroke in the search box. */
  onSearchChange: (value: string) => void;
  /** Invoked when the user selects a milestone or event from autocomplete. */
  onSearchSelect: (option: TimelineSearchOption) => void;
  /** Current orientation. */
  orientation: TimelineOrientation;
  /** Invoked when the user toggles orientation. */
  onOrientationToggle: () => void;
  /** Label for the current zoom context shown beside zoom buttons. */
  zoomLabel: string;
  /** Whether zoom-out is available. */
  canZoomOut: boolean;
  /** Whether zoom-in is available. */
  canZoomIn: boolean;
  /** Whether reset-to-all-eras is available. */
  canReset: boolean;
  /** Zoom into the next narrower era view. */
  onZoomIn: () => void;
  /** Zoom out one level toward the full timeline. */
  onZoomOut: () => void;
  /** Reset to the full global timeline view. */
  onZoomReset: () => void;
}

export const TimelineToolbar: FC<TimelineToolbarProps> = ({
  data,
  searchQuery,
  onSearchChange,
  onSearchSelect,
  orientation,
  onOrientationToggle,
  zoomLabel,
  canZoomOut,
  canZoomIn,
  canReset,
  onZoomIn,
  onZoomOut,
  onZoomReset,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* Row 1: autocomplete search + zoom controls + orientation toggle */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[12rem] max-w-md">
          <TimelineSearchAutocomplete
            data={data}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            onOptionSelect={onSearchSelect}
          />
        </div>

        <TimelineZoomControls
          zoomLabel={zoomLabel}
          canZoomOut={canZoomOut}
          canZoomIn={canZoomIn}
          canReset={canReset}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onReset={onZoomReset}
        />

        {/* Orientation toggle */}
        <button
          type="button"
          aria-label={t("caseStudies.orientationToggle")}
          title={
            orientation === "horizontal"
              ? t("caseStudies.orientationVertical")
              : t("caseStudies.orientationHorizontal")
          }
          onClick={onOrientationToggle}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          {orientation === "horizontal" ? (
            <IconLayoutRows size={15} />
          ) : (
            <IconLayoutColumns size={15} />
          )}
          <span className="hidden sm:inline">
            {orientation === "horizontal"
              ? t("caseStudies.orientationVertical")
              : t("caseStudies.orientationHorizontal")}
          </span>
        </button>
      </div>

      {/*
        Quick jump filter chips — temporarily disabled.
        Re-enable by restoring chips props and the block below.
      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-neutral-500 dark:text-neutral-400 shrink-0">
            {t("caseStudies.quickJump")}:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {chips.map((chip) => {
              const isActive = activeChipEventId === chip.eventId;
              return (
                <button
                  key={chip.eventId}
                  type="button"
                  onClick={() => onChipClick(chip)}
                  className={[
                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border transition-all duration-150 select-none max-w-[16rem] truncate",
                    isActive
                      ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300"
                      : "border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400",
                  ].join(" ")}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
      */}
    </div>
  );
};
