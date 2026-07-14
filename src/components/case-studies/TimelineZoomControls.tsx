import type { FC } from "react";
import { IconMinus, IconPlus, IconZoomReset } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

/** Props for the always-visible timeline zoom control group. */
export interface TimelineZoomControlsProps {
  /** Human-readable label for the current zoom context (e.g. era title or "All eras"). */
  zoomLabel: string;
  /** Whether zoom-out is available (not at the widest view). */
  canZoomOut: boolean;
  /** Whether zoom-in is available (not at the most narrow era). */
  canZoomIn: boolean;
  /** Whether reset-to-all-eras is meaningful (currently zoomed in). */
  canReset: boolean;
  /** Zoom into the next narrower era view. */
  onZoomIn: () => void;
  /** Zoom out one level toward the full timeline. */
  onZoomOut: () => void;
  /** Reset to the full global timeline view. */
  onReset: () => void;
}

/**
 * Persistent zoom controls for the case-study timeline.
 * Always rendered as part of the toolbar so zoom is discoverable without clicking eras.
 */
export const TimelineZoomControls: FC<TimelineZoomControlsProps> = ({
  zoomLabel,
  canZoomOut,
  canZoomIn,
  canReset,
  onZoomIn,
  onZoomOut,
  onReset,
}) => {
  const { t } = useTranslation();

  const btnBase =
    "inline-flex items-center justify-center w-7 h-7 rounded-md border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors";
  const btnEnabled = "hover:bg-neutral-200 dark:hover:bg-neutral-700";
  const btnDisabled = "opacity-40 cursor-not-allowed";

  return (
    <div
      className="inline-flex items-center gap-1.5 shrink-0"
      role="group"
      aria-label={t("caseStudies.zoomControlsLabel")}
    >
      <button
        type="button"
        aria-label={t("caseStudies.zoomOut")}
        title={t("caseStudies.zoomOut")}
        disabled={!canZoomOut}
        onClick={onZoomOut}
        className={[btnBase, canZoomOut ? btnEnabled : btnDisabled].join(" ")}
      >
        <IconMinus size={14} />
      </button>

      <button
        type="button"
        aria-label={t("caseStudies.zoomIn")}
        title={t("caseStudies.zoomIn")}
        disabled={!canZoomIn}
        onClick={onZoomIn}
        className={[btnBase, canZoomIn ? btnEnabled : btnDisabled].join(" ")}
      >
        <IconPlus size={14} />
      </button>

      <button
        type="button"
        aria-label={t("caseStudies.zoomReset")}
        title={t("caseStudies.zoomReset")}
        disabled={!canReset}
        onClick={onReset}
        className={[btnBase, canReset ? btnEnabled : btnDisabled].join(" ")}
      >
        <IconZoomReset size={14} />
      </button>

      <span
        className="hidden sm:inline text-xs text-neutral-500 dark:text-neutral-400 max-w-[10rem] truncate px-1"
        title={zoomLabel}
      >
        {zoomLabel}
      </span>
    </div>
  );
};
