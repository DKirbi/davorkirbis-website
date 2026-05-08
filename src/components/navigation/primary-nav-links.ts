import type { TFunction } from "i18next";
import type { NavLinkItem } from "@/components/navigation/nav-links";

/** Primary nav entries shared by the top bar and footer sitemap. */
export function getPrimaryNavLinks(t: TFunction): NavLinkItem[] {
  return [
    { name: t("nav.aboutMe"), href: "home" },
    { name: t("nav.resume"), href: "resume" },
  ];
}
