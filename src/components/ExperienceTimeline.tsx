import { experience } from "@/data/experience";
import { TimelineEntry } from "@/components/TimelineEntry";

export function ExperienceTimeline() {
  return (
    <section className="flex flex-col gap-8">
      {experience.map((item) => (
        <TimelineEntry
          key={item.id}
          title={item.company}
          subtitle={item.role}
          period={item.period}
          highlight={item.highlight}
          description={item.description}
          technologies={item.technologies}
          badgeColor="cyan"
        />
      ))}
    </section>
  );
}
