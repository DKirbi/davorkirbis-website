import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { ALL_EVENT_TYPES, EVENT_TYPE_STYLES } from "@/components/case-studies/timeline.utils";
import type { SoloType, TimelineEventType } from "@/components/case-studies/timeline.types";

export interface TimelineLegendProps {
  /** Currently soloed event type, or null if all types are shown. */
  soloType: SoloType;
  /**
   * Invoked when the user clicks a type chip.
   * The parent should toggle: if clicking the same type that's already solo, reset to null.
   * If clicking a different type, set that as solo.
   */
  onSoloToggle: (type: TimelineEventType) => void;
  /** Invoked when the user clicks "Show all" — resets solo to null. */
  onShowAll: () => void;
}

export const TimelineLegend: FC<TimelineLegendProps> = ({ soloType, onSoloToggle, onShowAll }) => {
  const { t } = useTranslation();
  const isFiltered = soloType !== null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-3">
      {/* Show-all chip — only visible when a solo is active */}
      <button
        type="button"
        onClick={onShowAll}
        className={[
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-150 select-none",
          isFiltered
            ? "border-cyan-400 dark:border-cyan-600 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300"
            : "border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300",
        ].join(" ")}
        title={t("caseStudies.legendToggleAll")}
      >
        <span
          className={[
            "w-2 h-2 rounded-full",
            isFiltered ? "bg-cyan-500" : "bg-neutral-400 dark:bg-neutral-500",
          ].join(" ")}
        />
        {t("caseStudies.legendToggleAll")}
      </button>

      <span className="w-px h-4 bg-neutral-200 dark:bg-neutral-700" aria-hidden />

      {/* Per-type solo chips */}
      {ALL_EVENT_TYPES.map((type) => {
        const style = EVENT_TYPE_STYLES[type];
        const isSoloed = soloType === type;
        const isDimmed = isFiltered && !isSoloed;

        return (
          <button
            key={type}
            type="button"
            onClick={() => onSoloToggle(type)}
            aria-pressed={isSoloed}
            title={isSoloed ? t("caseStudies.legendToggleAll") : style.label}
            className={[
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-200 select-none",
              isSoloed
                ? "border-neutral-400 dark:border-neutral-500 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 shadow-sm scale-105"
                : isDimmed
                  ? "border-neutral-200 dark:border-neutral-800 text-neutral-300 dark:text-neutral-700 opacity-50"
                  : "border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500",
            ].join(" ")}
          >
            <span
              style={{ backgroundColor: style.hex }}
              className={[
                "w-2 h-2 rounded-full shrink-0 transition-opacity",
                isDimmed ? "opacity-30" : "opacity-100",
              ].join(" ")}
            />
            {style.label}
            {isSoloed && (
              <span className="ml-0.5 text-neutral-400 dark:text-neutral-500 font-normal">
                ×
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
