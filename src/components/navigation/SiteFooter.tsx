import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Text } from "@mantine/core";
import { SocialIcons } from "@/components/about-me/SocialIcons";
import { getPrimaryNavLinks } from "@/components/navigation/primary-nav-links";
import { getNavLinkClassName } from "@/components/navigation/nav-link-class";
import "@/components/navigation/link-components/Navigation-link.scss";

/**
 * Site footer: social links, primary nav mirror, copyright. Mounted once under
 * `LangRoot` so every localized route shows it.
 */
export type SiteFooterProps = Record<string, never>;

export const SiteFooter: FC<SiteFooterProps> = () => {
  const { t } = useTranslation();
  const navLinks = getPrimaryNavLinks(t);
  const year = new Date().getFullYear();

  return (
    <footer className="footer-surface w-full shrink-0 py-10">
      <div className="w-11/12 max-w-5xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div className="flex justify-center sm:justify-start">
            <SocialIcons />
          </div>
          <nav
            aria-label={t("footer.sitemapLabel")}
            className="flex flex-row flex-wrap gap-x-2 gap-y-2 justify-center sm:justify-end"
          >
            {navLinks.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                className={(state) => getNavLinkClassName(state, "nav-link")}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <Text size="sm" c="dimmed" ta="center" component="p">
          {t("footer.copyright", { year })}
        </Text>
      </div>
    </footer>
  );
};
