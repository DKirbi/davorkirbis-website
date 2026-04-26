import { experience } from "@/data/experience";
import { TimelineEntry } from "@/components/TimelineEntry";
import { useTranslation } from "react-i18next";

export function ExperienceTimeline() {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-8">
      {experience.map((item) => {
        const baseKey = `cvContent.experience.${item.id}`;
        return (
        <TimelineEntry
          key={item.id}
          title={t(`${baseKey}.company`)}
          subtitle={t(`${baseKey}.role`)}
          period={{
            start: t(`${baseKey}.period.start`),
            end: t(`${baseKey}.period.end`),
          }}
          highlight={t(`${baseKey}.highlight`)}
          description={t(`${baseKey}.description`)}
          technologies={item.technologies.map((pillKey) => t(`cvContent.pills.${pillKey}`))}
          badgeColor="cyan"
        />
        );
      })}
    </section>
  );
}
