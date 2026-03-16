import { education } from "@/data/education";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EducationTimeline() {
  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        {education.map((item) => (
          <Card key={item.id} className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">
                {item.school}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{item.degree}</p>
              <p className="text-xs text-muted-foreground">
                {item.period.start} &ndash; {item.period.end}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="text-sm leading-relaxed">{item.highlight}</p>
              <div className="flex flex-col gap-2">
                {item.description
                  .trim()
                  .split(/\n\n+/)
                  .map((paragraph, i) => (
                    <p key={i} className="text-sm leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))}
              </div>
              {item.technologies && item.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
