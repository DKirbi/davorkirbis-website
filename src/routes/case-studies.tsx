import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { PodiumTimeline } from "@/components/case-studies/PodiumTimeline";

/**
 * Case Studies route — showcases portfolio case studies with interactive timelines.
 */
export type CaseStudiesProps = Record<string, never>;

export const CaseStudies: FC<CaseStudiesProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="w-11/12 max-w-6xl mx-auto pt-16 pb-24">
      <h1 className="text-2xl font-semibold mb-8">{t("caseStudies.title")}</h1>
      <PodiumTimeline />
    </div>
  );
};
