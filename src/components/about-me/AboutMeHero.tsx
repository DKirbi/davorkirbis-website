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
  <div className="flex flex-col items-center gap-6">
    <img
      src={`${Avatar}`}
      alt="Me"
      className="h-48 md:h-[300px] w-auto rounded-xl object-cover saturate-[0.1] hover:saturate-100 transition duration-300"
    />
    {/* Action cluster: social links + CV download */}
    <div className="flex flex-col gap-4 items-center">
      <SocialIcons />
      <DownloadResumeButton />
    </div>
  </div>
);
