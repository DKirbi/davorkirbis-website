import type { FC } from "react";
import { experience } from "@/data/experience";
import { CvTimeline } from "@/components/cv/CvTimeline";

/**
 * Experience section of the CV. Thin wrapper that binds the `experience`
 * dataset and the `cvContent.experience` i18n root to `CvTimeline`.
 *
 * No props — `Record<string, never>` is used instead of an empty interface
 * because `@typescript-eslint/no-empty-object-type` (from
 * `tseslint.configs.recommended`) flags `interface Foo {}`.
 */
export type ExperienceTimelineProps = Record<string, never>;

export const ExperienceTimeline: FC<ExperienceTimelineProps> = () => (
  <CvTimeline
    items={experience}
    i18nRoot="cvContent.experience"
    titleKey="company"
    subtitleKey="role"
    badgeColor="cyan"
  />
);
