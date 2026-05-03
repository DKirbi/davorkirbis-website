import { Badge, Card, MantineColor } from "@mantine/core";

export type TimelineEntryProps = {
  title: string;
  subtitle: string;
  period: { start: string; end: string };
  highlight: string;
  description: string;
  technologies?: string[];
  badgeColor?: MantineColor;
};

export function TimelineEntry({
  title,
  subtitle,
  period,
  highlight,
  description,
  technologies,
  badgeColor = "cyan",
}: TimelineEntryProps) {
  const mutedTextClass = "text-muted-foreground dark:text-[hsl(240_5%_78%)]";

  return (
    <Card shadow="sm" padding="lg" radius="md">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-semibold">{title}</h2>
        <span className={`text-xs whitespace-nowrap ${mutedTextClass}`}>
          {period.start} &ndash; {period.end}
        </span>
      </div>
      <h3 className={`text-sm italic ${mutedTextClass}`}>{subtitle}</h3>
      <p className="text-md font-bold leading-relaxed mt-2">{highlight}</p>
      <div className="flex flex-col gap-2 mt-2">
        {description
          .trim()
          .split(/\n\n+/)
          .map((paragraph, i) => (
            <p key={i} className="text-sm leading-normal">
              {paragraph.trim()}
            </p>
          ))}
      </div>
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {technologies.map((tech) => (
            <Badge key={tech} size="md" color={badgeColor}>
              {tech}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
}
