import { education } from "@/data/education";
import { TimelineEntry } from "@/components/TimelineEntry";
import { useTranslation } from "react-i18next";

export function EducationTimeline() {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-8">
      {education.map((item) => {
        const baseKey = `cvContent.education.${item.id}`;
        return (
        <TimelineEntry
          key={item.id}
          title={t(`${baseKey}.school`)}
          subtitle={t(`${baseKey}.degree`)}
          period={{
            start: t(`${baseKey}.period.start`),
            end: t(`${baseKey}.period.end`),
          }}
          highlight={t(`${baseKey}.highlight`)}
          description={t(`${baseKey}.description`)}
          technologies={(item.technologies ?? []).map((pillKey) => t(`cvContent.pills.${pillKey}`))}
          badgeColor="blue"
        />
        );
      })}
    </section>
  );
}
