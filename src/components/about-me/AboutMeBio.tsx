import type { FC } from "react";
import { Blockquote, Card } from "@mantine/core";
import { Trans, useTranslation } from "react-i18next";

/**
 * Bio card on the About Me page: three localized paragraphs + a hobbies blockquote.
 *
 * No props — copy is owned by `react-i18next` and the external link target is
 * stable. `Record<string, never>` instead of `interface Foo {}` because
 * `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type AboutMeBioProps = Record<string, never>;

export const AboutMeBio: FC<AboutMeBioProps> = () => {
  const { t } = useTranslation();

  return (
    <Card shadow="sm" padding="lg" radius="md">
      {/* p1 contains a strong tag and an external link to sportradar.com */}
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
      <p className="text-lg leading-relaxed">
        <Trans i18nKey="aboutMe.ExperienceParagraph.p2" components={{ strong: <strong /> }} />
      </p>
      <p className="text-lg leading-relaxed">
        <Trans i18nKey="aboutMe.ExperienceParagraph.p3" components={{ strong: <strong /> }} />
      </p>
      <Blockquote mt="xl">{t("aboutMe.hobbies")}</Blockquote>
    </Card>
  );
};
