import type { FC } from "react";
import { Badge, Divider } from "@mantine/core";
import {
  IconBuildingCommunity,
  IconGitCommit,
  IconLayersSubtract,
  IconTag,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { ContributorDot } from "@/components/case-studies/ContributorDot";
import type {
  TimelineMilestone,
  TimelineSelection,
} from "@/components/case-studies/timeline.types";
import {
  EVENT_TYPE_STYLES,
  PRIMARY_AUTHOR,
  formatEventDate,
  getCollaborators,
  isPrimaryAuthorEvent,
} from "@/components/case-studies/timeline.utils";

export interface TimelineDetailPanelProps {
  /** Current selection; if null shows empty-state placeholder. */
  selection: TimelineSelection | null;
  /** Contributor name currently highlighted via hover. */
  hoveredContributor: string | null;
  /** Invoked when the user hovers a collaborator name in the panel. */
  onContributorHover: (author: string | null) => void;
  /**
   * Layout placement relative to the timeline track.
   * `below` — full-width panel under horizontal track; `sidebar` — right column in vertical split view.
   */
  placement?: "below" | "sidebar";
}

/**
 * Inline detail area for the case-study timeline.
 * Always visible — first milestone is pre-selected on mount.
 */
export const TimelineDetailPanel: FC<TimelineDetailPanelProps> = ({
  selection,
  hoveredContributor,
  onContributorHover,
  placement = "below",
}) => {
  const { t } = useTranslation();
  const isSidebar = placement === "sidebar";

  if (!selection) {
    return (
      <div
        className={[
          isSidebar ? "mt-0" : "mt-6",
          "p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-400 dark:text-neutral-600",
        ].join(" ")}
      >
        {t("caseStudies.noSelection")}
      </div>
    );
  }

  return (
    <div
      className={[
        isSidebar ? "mt-0 sticky top-4 max-h-[calc(100vh-6rem)] overflow-y-auto" : "mt-6",
        "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden transition-all duration-200",
      ].join(" ")}
    >
      {selection.kind === "milestone" ? (
        <MilestoneDetail milestone={selection.milestone} compact={isSidebar} />
      ) : (
        <EventDetail
          event={selection.event}
          milestoneTitle={selection.milestone.title}
          hoveredContributor={hoveredContributor}
          onContributorHover={onContributorHover}
          compact={isSidebar}
        />
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Milestone detail
// ---------------------------------------------------------------------------

const MilestoneDetail: FC<{ milestone: TimelineMilestone; compact?: boolean }> = ({
  milestone,
  compact = false,
}) => {
  const { t } = useTranslation();
  const snapshot = milestone.component_snapshot;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-widest font-medium text-neutral-400 dark:text-neutral-500 mb-1">
            {t("caseStudies.milestone")}
          </p>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
            {milestone.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-neutral-500 dark:text-neutral-500">
            <span className="flex items-center gap-1">
              <IconLayersSubtract size={13} />
              {milestone.version}
            </span>
            <span>{milestone.period}</span>
            <span className="flex items-center gap-1">
              <IconUser size={13} />
              {milestone.author_role}
            </span>
          </div>
        </div>
      </div>

      <Divider my="sm" />

      {/* Content grid */}
      <div
        className={[
          "grid gap-6 text-sm leading-relaxed",
          compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2",
        ].join(" ")}
      >
        {/* Left col */}
        <div className="flex flex-col gap-5">
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-2">
              {t("caseStudies.summary")}
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300">{milestone.summary}</p>
          </section>

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-2">
              {t("caseStudies.description")}
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300">{milestone.description}</p>
          </section>

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-2">
              {t("caseStudies.outcome")}
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300">{milestone.outcome}</p>
          </section>
        </div>

        {/* Right col */}
        <div className="flex flex-col gap-5">
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-2 flex items-center gap-1.5">
              <IconUsers size={13} />
              {t("caseStudies.collaborators")}
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300">{milestone.collaborator_context}</p>
          </section>

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-2 flex items-center gap-1.5">
              <IconBuildingCommunity size={13} />
              {t("caseStudies.componentSnapshot")}
            </h4>
            <p className="text-xs text-neutral-400 dark:text-neutral-600 mb-2">
              {snapshot.package}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {snapshot.tech_stack.map((tech) => (
                <Badge key={tech} size="xs" variant="outline" color="cyan">
                  {tech}
                </Badge>
              ))}
            </div>

            <p className="text-xs text-neutral-400 dark:text-neutral-600 mb-2">
              {t("caseStudies.componentCount", { count: snapshot.component_count })}
            </p>

            <div className="flex flex-wrap gap-1">
              {snapshot.components.map((component) => (
                <Badge key={component} size="xs" variant="light" color="gray">
                  {component}
                </Badge>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Event detail
// ---------------------------------------------------------------------------

const EventDetail: FC<{
  event: Extract<TimelineSelection, { kind: "event" }>["event"];
  milestoneTitle: string;
  hoveredContributor: string | null;
  onContributorHover: (author: string | null) => void;
  compact?: boolean;
}> = ({ event, milestoneTitle, hoveredContributor, onContributorHover, compact = false }) => {
  const { t } = useTranslation();
  const styles = EVENT_TYPE_STYLES[event.type];
  const collaborators = getCollaborators(event.authors);
  const includesMe = isPrimaryAuthorEvent(event.authors);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge size="sm" color={styles.badge} variant="light">
              {styles.label}
            </Badge>
            <span className="text-xs text-neutral-400 dark:text-neutral-600">
              {milestoneTitle}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
            {event.title}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
            {formatEventDate(event.date)}
          </p>
        </div>
      </div>

      <Divider my="sm" />

      <div
        className={[
          "grid gap-6 text-sm leading-relaxed",
          compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2",
        ].join(" ")}
      >
        {/* Left col */}
        <div className="flex flex-col gap-5">
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-2">
              {t("caseStudies.summary")}
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300">{event.summary}</p>
          </section>

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-2">
              {t("caseStudies.description")}
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300">{event.description}</p>
          </section>
        </div>

        {/* Right col */}
        <div className="flex flex-col gap-5">
          {/* Authors */}
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-2 flex items-center gap-1.5">
              <IconUsers size={13} />
              {t("caseStudies.authors")}
            </h4>
            <div className="flex flex-col gap-2">
              {includesMe && (
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-500 shrink-0" />
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    {PRIMARY_AUTHOR}
                  </span>
                  <span className="text-xs text-neutral-400">
                    ({t("caseStudies.primaryAuthor")})
                  </span>
                </div>
              )}
              {collaborators.map((author) => {
                const isHighlighted = hoveredContributor === author;
                return (
                  <div
                    key={author}
                    className={[
                      "flex items-center gap-2 rounded-md px-2 py-1 transition-colors cursor-default",
                      isHighlighted
                        ? "bg-neutral-100 dark:bg-neutral-800"
                        : "",
                    ].join(" ")}
                    onMouseEnter={() => onContributorHover(author)}
                    onMouseLeave={() => onContributorHover(null)}
                  >
                    <ContributorDot author={author} />
                    <span className="text-neutral-700 dark:text-neutral-300">{author}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Commit */}
          {event.commit && (
            <section>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-2 flex items-center gap-1.5">
                <IconGitCommit size={13} />
                {t("caseStudies.commit")}
              </h4>
              <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded font-mono">
                {event.commit}
              </code>
            </section>
          )}

          {/* Tags */}
          {event.tags.length > 0 && (
            <section>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-2 flex items-center gap-1.5">
                <IconTag size={13} />
                {t("caseStudies.tags")}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {event.tags.map((tag) => (
                  <Badge key={tag} size="sm" variant="light" color="cyan">
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
