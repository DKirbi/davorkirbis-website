import type { FC } from "react";
import { useTranslation } from "react-i18next";
import type { TimelineMilestone, TimelineMeta } from "@/components/case-studies/timeline.types";
import { ERA_ACCENT_COLORS } from "@/components/case-studies/timeline.utils";

export interface TimelineOverviewProps {
  /** Case-study metadata including the narrative overview. */
  meta: TimelineMeta;
  /** Ordered milestone eras to link in the overview. */
  milestones: TimelineMilestone[];
  /** Currently focused milestone id, if any. */
  selectedMilestoneId: string | null;
  /** Invoked when the user clicks a milestone link — focuses that era on the timeline. */
  onMilestoneFocus: (milestone: TimelineMilestone) => void;
}

/**
 * Narrative introduction under the Podium heading with linked milestone eras.
 */
export const TimelineOverview: FC<TimelineOverviewProps> = ({
  meta,
  milestones,
  selectedMilestoneId,
  onMilestoneFocus,
}) => {
  const { t } = useTranslation();

  return (
    <section className="mb-6 space-y-4">
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
        {meta.overview}
      </p>

      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-3">
          {t("caseStudies.eraOverview")}
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {milestones.map((milestone, index) => {
            const accentColor = ERA_ACCENT_COLORS[index % ERA_ACCENT_COLORS.length];
            const isSelected = selectedMilestoneId === milestone.id;

            return (
              <span key={milestone.id}>
                <button
                  type="button"
                  onClick={() => onMilestoneFocus(milestone)}
                  title={milestone.summary}
                  style={{ color: accentColor }}
                  className={[
                    "inline font-medium underline-offset-2 decoration-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-1 rounded-sm transition-opacity",
                    isSelected ? "opacity-100" : "opacity-85 hover:opacity-100",
                  ].join(" ")}
                >
                  {milestone.title}
                </button>
                {index < milestones.length - 1 ? (
                  <span className="text-neutral-400 dark:text-neutral-600">
                    {index === milestones.length - 2
                      ? ` ${t("caseStudies.overviewAnd")} `
                      : ", "}
                  </span>
                ) : null}
              </span>
            );
          })}
          .
        </p>

        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {milestones.map((milestone, index) => {
            const accentColor = ERA_ACCENT_COLORS[index % ERA_ACCENT_COLORS.length];
            const isSelected = selectedMilestoneId === milestone.id;

            return (
              <li key={milestone.id}>
                <button
                  type="button"
                  onClick={() => onMilestoneFocus(milestone)}
                  style={{ borderLeftColor: accentColor }}
                  className={[
                    "w-full text-left pl-3 border-l-[3px] rounded-r-md py-2 pr-2 transition-colors",
                    isSelected
                      ? "bg-white dark:bg-neutral-800 shadow-sm"
                      : "hover:bg-white/70 dark:hover:bg-neutral-800/60",
                  ].join(" ")}
                >
                  <p
                    style={{ color: accentColor }}
                    className="text-xs font-semibold leading-snug"
                  >
                    {milestone.title}
                  </p>
                  <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                    {milestone.period} · {milestone.version}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {milestone.summary}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-600">
        {meta.role} · {meta.period}
      </p>
    </section>
  );
};
