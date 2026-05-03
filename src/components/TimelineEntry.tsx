import type { FC } from "react";
import { Badge, Card, MantineColor } from "@mantine/core";

/** Single CV timeline card (used for both education and experience entries). */
export interface TimelineEntryProps {
  /** Headline of the entry (company name, school name, ...). */
  title: string;
  /** Secondary line under the title (role, degree, ...). Rendered italic + muted. */
  subtitle: string;
  /** Date range shown on the right of the header. Both ends are pre-formatted localized strings (e.g. `"Feb 2023"` / `"Present"`). */
  period: { start: string; end: string };
  /** One-sentence summary, rendered bold below the subtitle. */
  highlight: string;
  /** Long body text. Blank lines (`\n\n`) split it into paragraphs. */
  description: string;
  /** Already-localized pill labels. Hidden when omitted or empty. */
  technologies?: string[];
  /** Mantine color applied to the technology badges. Defaults to `"cyan"`. */
  badgeColor?: MantineColor;
}

export const TimelineEntry: FC<TimelineEntryProps> = ({
  title,
  subtitle,
  period,
  highlight,
  description,
  technologies,
  badgeColor = "cyan",
}) => {
  const mutedTextClass = "text-muted-foreground dark:text-[hsl(240_5%_78%)]";

  // Split description on blank-line boundaries so each paragraph becomes its own <p>.
  const paragraphs = description
    .trim()
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim());

  return (
    <Card shadow="sm" padding="lg" radius="md">
      {/* Header: title + period range */}
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-semibold">{title}</h2>
        <span className={`text-xs whitespace-nowrap ${mutedTextClass}`}>
          {period.start} &ndash; {period.end}
        </span>
      </div>

      {/* Body: subtitle, highlight, description paragraphs */}
      <h3 className={`text-sm italic ${mutedTextClass}`}>{subtitle}</h3>
      <p className="text-md font-bold leading-relaxed mt-2">{highlight}</p>
      <div className="flex flex-col gap-2 mt-2">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-sm leading-normal">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Footer: technology pills */}
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
};
