import type { FC } from "react";
import { AboutMeHero } from "@/components/about-me/AboutMeHero";
import { AboutMeHeading } from "@/components/about-me/AboutMeHeading";
import { AboutMeBio } from "@/components/about-me/AboutMeBio";

/**
 * About Me route — stacked on xs (hero, heading, bio); from `sm` up the hero
 * and heading share one row with the heading growing (`flex-1`), full-width
 * bio below.
 *
 * No props — pure composition; all section components own their own i18n.
 * `Record<string, never>` instead of `interface Foo {}` because
 * `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type AboutMeProps = Record<string, never>;

export const AboutMe: FC<AboutMeProps> = () => (
  <div className="flex flex-col gap-8 w-11/12 max-w-5xl mx-auto pt-16">
    <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 w-full">
      <div className="shrink-0 flex justify-center sm:justify-start">
        <AboutMeHero />
      </div>
      <div className="min-w-0 flex-1 flex flex-col justify-center">
        <AboutMeHeading />
      </div>
    </div>
    <AboutMeBio />
  </div>
);
