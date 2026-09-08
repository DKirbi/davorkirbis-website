import type { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * Personal-life paragraph shown under the hero actions on desktop and at the
 * bottom of the About Me page on mobile.
 *
 * No props — copy is owned by `react-i18next`. Placement is decided by the
 * parent grid. `Record<string, never>` instead of `interface Foo {}` because
 * `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type AboutMeHobbiesProps = Record<string, never>;

export const AboutMeHobbies: FC<AboutMeHobbiesProps> = () => {
  const { t } = useTranslation();

  return (
    <p className="text-sm leading-relaxed text-muted-foreground">{t("aboutMe.hobbies")}</p>
  );
};
