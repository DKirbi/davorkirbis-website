import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { CvSection } from "@/components/cv/CvSection";
import { EducationTimeline } from "@/components/EducationTimeline";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

/**
 * CV route — two-column layout with experience and education sections.
 *
 * No props — composes two `CvSection`s; titles + divider colors live here so
 * adding a third section is a one-liner. `Record<string, never>` instead of
 * `interface Foo {}` because `@typescript-eslint/no-empty-object-type` flags
 * the latter.
 */
export type CvProps = Record<string, never>;

export const CV: FC<CvProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 w-11/12 mx-auto md:grid-cols-2 gap-40 pt-16">
      <CvSection title={t("cv.experience")} dividerColor="cyan">
        <ExperienceTimeline />
      </CvSection>
      <CvSection title={t("cv.education")} dividerColor="blue">
        <EducationTimeline />
      </CvSection>
    </div>
  );
};
