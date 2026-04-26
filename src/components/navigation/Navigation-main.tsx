import { useTranslation } from "react-i18next";
import type { SupportedLanguages } from "@/i18n";
import { supportedLanguages } from "@/i18n";
import { useState } from "react";
import { NavLink, NavLinkRenderProps } from "react-router-dom";
import { Switch, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { NavLinkGroup } from "./link-components/Navigation-group";
import { Logo } from "./logo/Logo";

const NavLinks = [
  {
    name: "About me",
    href: "/",
  },
  {
    name: "Resume",
    href: "resume",
  },
];

const getNavLinkClassName = (
  { isActive, isPending }: NavLinkRenderProps,
  additionalClasses = "",
) => {
  let baseClass = "";
  if (isActive) baseClass = "active";
  else if (isPending) baseClass = "pending";
  return `${baseClass} ${additionalClasses}`.trim();
};

export const NavigationMain = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.split("-")[0] as SupportedLanguages;
  const [menuOpen, setMenuOpen] = useState(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const isDark = computedColorScheme === "dark";

  const languageSwitcher = () => (
    <div className="flex gap-1 text-sm items-center">
      {supportedLanguages.map((lang, idx) => (
        <span key={lang} className="flex items-center gap-1">
          {idx > 0 && <span className="opacity-30">|</span>}
          <button
            onClick={() => i18n.changeLanguage(lang)}
            className={currentLanguage === lang ? "font-bold" : "opacity-40 hover:opacity-70"}
          >
            {lang.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );

  const themeSwitcher = () => (
    <Switch
      checked={isDark}
      onChange={() => setColorScheme(isDark ? "light" : "dark")}
      size="md"
      color="dark.4"
      onLabel={<IconMoonStars size={14} color="var(--mantine-color-gray-1)" />}
      offLabel={<IconSun size={14} color="var(--mantine-color-black)" />}
      aria-label="Toggle light and dark mode"
    />
  );

  const rightControls = () => (
    <div className="flex gap-3 items-center">
      {languageSwitcher()}
      {themeSwitcher()}
    </div>
  );

  return (
    <>
      <div className="nav-surface fixed left-0 w-full top-0 z-[999]">
        <div className="flex justify-center h-[54px] m-auto">
          <div className="flex justify-between items-center w-9/12 py-3">
            <Logo linksTo="/" />

            {/* Desktop links */}
            <NavLinkGroup>
              <div className="hidden mobile:flex">
                {NavLinks.map((navLink, index) => (
                  <NavLink
                    key={index}
                    to={navLink.href}
                    className={(state) => getNavLinkClassName(state, "nav-link")}
                  >
                    {navLink.name}
                  </NavLink>
                ))}
                {rightControls()}
              </div>
            </NavLinkGroup>

            {/* Hamburger / X button */}
            <button
              className="mobile:hidden relative w-6 h-5 flex flex-col justify-between"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`block h-0.5 w-6 bg-neutral-700 transition-all duration-300 origin-center ${
                  menuOpen ? "translate-y-[9px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-neutral-700 transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-neutral-700 transition-all duration-300 origin-center ${
                  menuOpen ? "-translate-y-[9px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen mobile overlay */}
      <div
        className={`nav-surface fixed inset-0 z-[998] flex flex-col items-center justify-center gap-8 transition-opacity duration-300 mobile:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {NavLinks.map((navLink, index) => (
          <NavLink
            key={index}
            to={navLink.href}
            className={(state) => getNavLinkClassName(state, "nav-link text-2xl")}
            onClick={() => setMenuOpen(false)}
          >
            {navLink.name}
          </NavLink>
        ))}
        {rightControls()}
      </div>
    </>
  );
};
