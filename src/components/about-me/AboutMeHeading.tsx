import type { FC } from "react";
import { Trans, useTranslation } from "react-i18next";

/**
 * Two-line localized heading on the About Me page.
 *
 * No props — strings come straight from `react-i18next` so the route can stay
 * declarative. `Record<string, never>` instead of `interface Foo {}` because
 * `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type AboutMeHeadingProps = Record<string, never>;

export const AboutMeHeading: FC<AboutMeHeadingProps> = () => {
  // `<Trans>` reads i18n via `useContext` only and does not subscribe to
  // `languageChanged`, so a parent that does (e.g. via `useTranslation`) must
  // re-render this component for the heading to update. The route owner
  // doesn't subscribe, so we subscribe here to make the heading reactive.
  useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl md:text-5xl md:leading-normal leading-relaxed">
        <Trans i18nKey="aboutMe.heading.foreword" components={{ strong: <strong /> }} />{" "}
        <br className="hidden sm:block" />{" "}
        <Trans i18nKey="aboutMe.heading.role" components={{ strong: <strong /> }} />
      </h1>
    </div>
  );
};
