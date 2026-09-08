import type { FC } from "react";
import { AboutMeHero } from "@/components/about-me/AboutMeHero";
import { AboutMeHeading } from "@/components/about-me/AboutMeHeading";
import { AboutMeBio } from "@/components/about-me/AboutMeBio";
import { AboutMeHobbies } from "@/components/about-me/AboutMeHobbies";

/**
 * About Me route — two-column layout composing the hero, bio, and hobbies.
 *
 * Named grid areas keep hobbies under the social/download cluster on desktop
 * and at the bottom of the page on mobile, so the intro stays beneath the
 * portrait. `Record<string, never>` instead of `interface Foo {}` because
 * `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type AboutMeProps = Record<string, never>;

export const AboutMe: FC<AboutMeProps> = () => (
  <div className="grid w-11/12 max-w-5xl mx-auto pt-16 gap-8 md:gap-12 grid-cols-1 md:grid-cols-[280px_1fr] md:grid-rows-[auto_1fr] md:items-start [grid-template-areas:'hero'_'content'_'hobbies'] md:[grid-template-areas:'hero_content'_'hobbies_content']">
    <div className="[grid-area:hero]">
      <AboutMeHero />
    </div>
    <div className="flex flex-col gap-6 [grid-area:content]">
      <AboutMeHeading />
      <AboutMeBio />
    </div>
    <div className="[grid-area:hobbies]">
      <AboutMeHobbies />
    </div>
  </div>
);
