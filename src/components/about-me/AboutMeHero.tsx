import type { FC } from "react";
import Avatar from "@/assets/Me3.jpeg";
import { SocialIcons } from "@/components/about-me/SocialIcons";
import { DownloadResumeButton } from "@/components/about-me/DownloadResumeButton";

/**
 * Hero column on the About Me page: portrait photo, social icons, CV download.
 *
 * No props — child components own their own data (image asset, hardcoded
 * social links, i18n strings). `Record<string, never>` instead of `interface
 * Foo {}` because `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type AboutMeHeroProps = Record<string, never>;

export const AboutMeHero: FC<AboutMeHeroProps> = () => (
  <div className="hero-page flex flex-col justify-start">
    <div className="flex flex-col gap-10 align-center">
      <img
        src={`${Avatar}`}
        alt="Me"
        className="md:h-[300px] md:w-[auto] h-[200px] w-[auto] self-center rounded-xl object-cover saturate-[0.1] hover:saturate-100 transition-all duration-300"
      />

      {/* Action cluster: social links + CV download */}
      <div className="buttons-wrapper flex flex-col gap-4">
        <SocialIcons />
        <DownloadResumeButton />
      </div>
    </div>
  </div>
);
