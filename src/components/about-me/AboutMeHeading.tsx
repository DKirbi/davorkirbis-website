import type { FC } from "react";
import { Trans } from "react-i18next";

/**
 * Two-line localized heading on the About Me page.
 *
 * No props — strings come straight from `react-i18next` so the route can stay
 * declarative. `Record<string, never>` instead of `interface Foo {}` because
 * `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type AboutMeHeadingProps = Record<string, never>;

export const AboutMeHeading: FC<AboutMeHeadingProps> = () => (
  <div className="flex flex-col gap-2">
    <h1 className="text-3xl md:text-5xl md:leading-normal leading-relaxed">
      <Trans i18nKey="aboutMe.heading.foreword" components={{ strong: <strong /> }} />{" "}
      <br className="hidden md:block" />{" "}
      <Trans i18nKey="aboutMe.heading.role" components={{ strong: <strong /> }} />
    </h1>
  </div>
);
