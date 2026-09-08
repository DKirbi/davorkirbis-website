import type { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  IconBrandFlickr,
  IconBrandGithubFilled,
  IconBrandLinkedin,
  IconMailFilled,
} from "@tabler/icons-react";

/**
 * Row of external profile / contact icons on the About Me hero.
 *
 * No props — the four destinations (LinkedIn, Flickr, GitHub, mailto) are
 * stable for the personal site. Promote to a `links` prop the moment a
 * second caller appears. `Record<string, never>` instead of `interface
 * Foo {}` because `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type SocialIconsProps = Record<string, never>;

const ICON_STYLE = { width: "70%", height: "70%" } as const;

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/davorkirbis/",
    label: "LinkedIn",
    icon: IconBrandLinkedin,
  },
  {
    href: "https://www.flickr.com/photos/davorkirbis/",
    label: "Flickr",
    icon: IconBrandFlickr,
  },
  {
    href: "https://github.com/DKirbi",
    label: "GitHub",
    icon: IconBrandGithubFilled,
  },
] as const;

export const SocialIcons: FC<SocialIconsProps> = () => (
  <div className="icons-container flex flex-row gap-4 justify-center">
    {socialLinks.map(({ href, label, icon: Icon }) => (
      <Button key={label} asChild size="icon" className="h-10 w-10 rounded-md [&_svg]:size-[70%]">
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
          <Icon style={ICON_STYLE} stroke={1.5} />
        </a>
      </Button>
    ))}
    <Button asChild size="icon" className="h-10 w-10 rounded-md [&_svg]:size-[70%]">
      <a href="mailto:davor.kirbis@gmail.com" aria-label="Email">
        <IconMailFilled style={ICON_STYLE} />
      </a>
    </Button>
  </div>
);
