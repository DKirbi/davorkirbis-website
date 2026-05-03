import type { FC } from "react";
import { education } from "@/data/education";
import { CvTimeline } from "@/components/cv/CvTimeline";

/**
 * Education section of the CV. Thin wrapper that binds the `education`
 * dataset and the `cvContent.education` i18n root to `CvTimeline`.
 *
 * No props — `Record<string, never>` is used instead of an empty interface
 * because `@typescript-eslint/no-empty-object-type` (from
 * `tseslint.configs.recommended`) flags `interface Foo {}`.
 */
export type EducationTimelineProps = Record<string, never>;

export const EducationTimeline: FC<EducationTimelineProps> = () => (
  <CvTimeline
    items={education}
    i18nRoot="cvContent.education"
    titleKey="school"
    subtitleKey="degree"
    badgeColor="blue"
  />
);
