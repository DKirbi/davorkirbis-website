import type { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import { Trans, useTranslation } from "react-i18next";

const SKETCHFLOW_URL = "https://github.com/DKirbi/SketchFlow-AI";

/**
 * Bio card on the About Me page: current role, past hats, and SketchFlow-AI.
 *
 * No props — copy is owned by `react-i18next` and the external link targets
 * are stable. `Record<string, never>` instead of `interface Foo {}` because
 * `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type AboutMeBioProps = Record<string, never>;

export const AboutMeBio: FC<AboutMeBioProps> = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent className="p-6">
        {/* Current role at Sportradar */}
        <p className="text-lg leading-relaxed">
          <Trans
            i18nKey="aboutMe.ExperienceParagraph.p1"
            components={{
              strong: <strong />,
              a: (
                <a
                  className="sportradar-link"
                  href="https://sportradar.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
            }}
          />
        </p>
        {/* Past Product Designer + Design System Tech Lead hats */}
        <p className="text-lg leading-relaxed">
          <Trans i18nKey="aboutMe.ExperienceParagraph.p2" components={{ strong: <strong /> }} />
        </p>
        {/* SketchFlow-AI: GitHub link, then the short project description */}
        <p className="text-lg leading-relaxed">
          {t("aboutMe.ExperienceParagraph.p3Lead")}{" "}
          <a
            className="sportradar-link inline-flex items-center gap-1.5"
            href={SKETCHFLOW_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithubFilled aria-hidden size={18} className="shrink-0" />
            {t("aboutMe.sketchFlow.label")}
          </a>
          .
        </p>
        <p className="text-lg leading-relaxed">{t("aboutMe.sketchFlow.description")}</p>
      </CardContent>
    </Card>
  );
};
