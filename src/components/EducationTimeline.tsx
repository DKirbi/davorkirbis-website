import { education } from "@/data/education";
import { TimelineEntry } from "@/components/TimelineEntry";

export function EducationTimeline() {
  return (
    <section className="flex flex-col gap-8">
      {education.map((item) => (
        <TimelineEntry
          key={item.id}
          title={item.school}
          subtitle={item.degree}
          period={item.period}
          highlight={item.highlight}
          description={item.description}
          technologies={item.technologies}
          badgeColor="blue"
        />
      ))}
    </section>
  );
}
