import type { FC } from "react";
import Avatar from "@/assets/Me3.jpeg";
import { DownloadResumeButton } from "@/components/about-me/DownloadResumeButton";

/**
 * Hero column on the About Me page: portrait photo and CV download (socials
 * live in the site footer).
 *
 * No props — child components own their own data (image asset, i18n strings).
 * `Record<string, never>` instead of `interface Foo {}` because
 * `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type AboutMeHeroProps = Record<string, never>;

export const AboutMeHero: FC<AboutMeHeroProps> = () => (
  <div className="flex flex-col items-center gap-6">
    <img
      src={`${Avatar}`}
      alt="Me"
      className="h-48 md:h-[300px] w-auto rounded-xl object-cover saturate-[0.1] hover:saturate-100 transition duration-300"
    />
    <div className="flex flex-col gap-4 items-center">
      <DownloadResumeButton />
    </div>
  </div>
);
