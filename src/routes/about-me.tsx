import type { FC } from "react";
import { AboutMeHero } from "@/components/about-me/AboutMeHero";
import { AboutMeHeading } from "@/components/about-me/AboutMeHeading";
import { AboutMeBio } from "@/components/about-me/AboutMeBio";

/**
 * About Me route — two-column layout composing the hero and the bio sections.
 *
 * No props — pure composition; all section components own their own i18n.
 * `Record<string, never>` instead of `interface Foo {}` because
 * `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type AboutMeProps = Record<string, never>;

export const AboutMe: FC<AboutMeProps> = () => (
  <div className="grid grid-cols-1 w-11/12 mx-auto md:grid-cols-2 gap-10 md:gap-40 pt-16">
    <AboutMeHero />
    <div className="flex flex-col gap-8">
      <AboutMeHeading />
      <AboutMeBio />
    </div>
  </div>
);
