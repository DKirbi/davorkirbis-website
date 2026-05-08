import type { FC } from "react";
import { ThemeIcon } from "@mantine/core";
import {
  IconBrandFlickr,
  IconBrandGithubFilled,
  IconBrandLinkedin,
  IconMailFilled,
} from "@tabler/icons-react";

/**
 * Row of external profile / contact icons (site footer).
 *
 * No props — the four destinations (LinkedIn, Flickr, GitHub, mailto) are
 * stable for the personal site. Promote to a `links` prop the moment a
 * second caller appears. `Record<string, never>` instead of `interface
 * Foo {}` because `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type SocialIconsProps = Record<string, never>;

const ICON_STYLE = { width: "70%", height: "70%" } as const;

export const SocialIcons: FC<SocialIconsProps> = () => (
  <div className="icons-container flex flex-row gap-4 justify-center">
    <a
      href="https://www.linkedin.com/in/davorkirbis/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
    >
      <ThemeIcon size="lg" variant="filled">
        <IconBrandLinkedin style={ICON_STYLE} stroke={1.5} />
      </ThemeIcon>
    </a>
    <a
      href="https://www.flickr.com/photos/davorkirbis/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Flickr"
    >
      <ThemeIcon size="lg" variant="filled">
        <IconBrandFlickr style={ICON_STYLE} stroke={1.5} />
      </ThemeIcon>
    </a>
    <a
      href="https://github.com/DKirbi"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <ThemeIcon size="lg" variant="filled">
        <IconBrandGithubFilled style={ICON_STYLE} stroke={1.5} />
      </ThemeIcon>
    </a>
    <a href="mailto:davor.kirbis@gmail.com" aria-label="Email">
      <ThemeIcon size="lg" variant="filled">
        <IconMailFilled style={ICON_STYLE} stroke={1.5} />
      </ThemeIcon>
    </a>
  </div>
);
