import { useTranslation } from "react-i18next";
import type { SupportedLanguages } from "@/i18n";
import { supportedLanguages } from "@/i18n";
import { useRef, useState } from "react";
import { NavLink, NavLinkRenderProps } from "react-router-dom";
import {
  Menu,
  Switch,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { NavLinkGroup } from "./link-components/Navigation-group";
import { Logo } from "./logo/Logo";

const languageMetadata: Record<
  SupportedLanguages,
  { label: string; code: string; flagSrc: string }
> = {
  en: { label: "English", code: "EN", flagSrc: "https://flagcdn.com/w20/gb.png" },
  de: { label: "Deutsch", code: "DE", flagSrc: "https://flagcdn.com/w20/de.png" },
  sl: { label: "Slovenščina", code: "SL", flagSrc: "https://flagcdn.com/w20/si.png" },
};

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
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language.split("-")[0] as SupportedLanguages;
  const [menuOpen, setMenuOpen] = useState(false);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const isDark = computedColorScheme === "dark";
  const activeLanguage = languageMetadata[currentLanguage];
  const navLinks = [
    { name: t("nav.aboutMe"), href: "/" },
    { name: t("nav.resume"), href: "resume" },
  ];

  const desktopLanguageSwitcher = () => (
    <Menu
      position="bottom-end"
      shadow="sm"
      withinPortal={false}
      offset={4}
      styles={{ dropdown: { width: "max-content", minWidth: "unset" } }}
    >
      <Menu.Target>
        <UnstyledButton
          ref={languageButtonRef}
          className={`hidden mobile:flex items-center gap-2 rounded-md px-2 py-1 text-sm ${
            isDark ? "hover:bg-neutral-800" : "hover:bg-gray-100"
          }`}
          aria-label="Select language"
        >
          <img
            src={activeLanguage.flagSrc}
            alt={`${activeLanguage.label} flag`}
            className="h-3 w-5 rounded-[2px] object-cover"
            loading="lazy"
          />
          <span className="uppercase tracking-wide">{activeLanguage.code}</span>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        {supportedLanguages.map((lang) => {
          const language = languageMetadata[lang];
          const isActiveLanguage = currentLanguage === lang;
          return (
            <Menu.Item
              key={lang}
              onClick={() => i18n.changeLanguage(lang)}
              className={`pr-3 ${
                isActiveLanguage
                  ? isDark
                    ? "bg-neutral-800 hover:bg-neutral-700"
                    : "bg-gray-200 hover:bg-gray-300"
                  : isDark
                    ? "hover:bg-neutral-800"
                    : "hover:bg-gray-100"
              }`}
              leftSection={
                <img
                  src={language.flagSrc}
                  alt={`${language.label} flag`}
                  className="h-3 w-5 rounded-[2px] object-cover"
                  loading="lazy"
                />
              }
            >
              <span
                className={`uppercase text-xs tracking-wide ${
                  isActiveLanguage ? "font-semibold" : "font-normal"
                }`}
              >
                {language.code}
              </span>
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );

  const mobileLanguageSwitcher = () => (
    <div className="flex mobile:hidden gap-2 items-center">
      {supportedLanguages.map((lang) => {
        const language = languageMetadata[lang];
        return (
          <button
            key={lang}
            onClick={() => i18n.changeLanguage(lang)}
            className={`rounded-sm transition-opacity ${
              currentLanguage === lang
                ? "opacity-100 ring-1 ring-neutral-500"
                : "opacity-60 hover:opacity-90"
            }`}
            aria-label={`Switch language to ${language.label}`}
          >
            <img
              src={language.flagSrc}
              alt={`${language.label} flag`}
              className="h-3 w-5 rounded-[2px] object-cover"
              loading="lazy"
            />
          </button>
        );
      })}
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
      {desktopLanguageSwitcher()}
      {mobileLanguageSwitcher()}
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
                {navLinks.map((navLink, index) => (
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
                className={`block h-0.5 w-6 transition-all duration-300 origin-center ${
                  isDark ? "bg-neutral-100" : "bg-neutral-700"
                } ${
                  menuOpen ? "translate-y-[9px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 ${
                  isDark ? "bg-neutral-100" : "bg-neutral-700"
                } ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 transition-all duration-300 origin-center ${
                  isDark ? "bg-neutral-100" : "bg-neutral-700"
                } ${
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
        {navLinks.map((navLink, index) => (
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
