import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { MantineColor } from "@mantine/core";
import { TimelineEntry } from "@/components/TimelineEntry";
import type { CvPillKey } from "@/data/experience";

// Items are typed as `ReadonlyArray<CvTimelineItem>` below — both
// `EducationItem` and `ExperienceItem` widen to this shape; no discriminated
// union is needed because the field names that differ between the two
// (`school`/`degree` vs `company`/`role`) are reached via `titleKey` and
// `subtitleKey` in `CvTimelineProps`, not from the item itself.
/** Generic CV section item — covers both education and experience entries. */
export interface CvTimelineItem {
  /** Stable id used both as a React key and as the `{id}` segment in the i18n key (`{i18nRoot}.{id}.*`). */
  id: string;
  /** Pill keys resolved against `cvContent.pills.{key}`. Optional because education entries can omit them. */
  technologies?: CvPillKey[];
}

/**
 * Shared timeline used by both `EducationTimeline` and `ExperienceTimeline`.
 *
 * Pulls localised strings from a parameterised i18n root so the two sections
 * can share identical JSX while keeping their existing key shapes
 * (`cvContent.education.{id}.school|degree` vs `cvContent.experience.{id}.company|role`).
 */
export interface CvTimelineProps {
  /** Section data; each item provides only an `id` and an optional pill list — every visible string is resolved via i18n here. */
  items: ReadonlyArray<CvTimelineItem>;
  /** Translation namespace prefix; choose `"cvContent.education"` or `"cvContent.experience"`. */
  i18nRoot: "cvContent.education" | "cvContent.experience";
  /** Field under each entry that holds the headline string. `"company"` for experience, `"school"` for education. */
  titleKey: "school" | "company";
  /** Field under each entry that holds the role / degree string. */
  subtitleKey: "degree" | "role";
  /** Mantine color forwarded to `TimelineEntry`'s technology pills. */
  badgeColor: MantineColor;
}

export const CvTimeline: FC<CvTimelineProps> = ({
  items,
  i18nRoot,
  titleKey,
  subtitleKey,
  badgeColor,
}) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-8">
      {items.map((item) => {
        // Compose the per-entry i18n base key once and resolve all fields against it.
        const baseKey = `${i18nRoot}.${item.id}`;
        const technologies = (item.technologies ?? []).map((pillKey) =>
          t(`cvContent.pills.${pillKey}`),
        );

        return (
          <TimelineEntry
            key={item.id}
            title={t(`${baseKey}.${titleKey}`)}
            subtitle={t(`${baseKey}.${subtitleKey}`)}
            period={{
              start: t(`${baseKey}.period.start`),
              end: t(`${baseKey}.period.end`),
            }}
            highlight={t(`${baseKey}.highlight`)}
            description={t(`${baseKey}.description`)}
            technologies={technologies}
            badgeColor={badgeColor}
          />
        );
      })}
    </section>
  );
};
