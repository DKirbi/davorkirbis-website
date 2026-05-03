import type { FC } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useComputedColorScheme } from "@mantine/core";
import type { SupportedLanguages } from "@/i18n";
import { TopBar } from "@/components/navigation/top-bar";
import { MobileOverlay } from "@/components/navigation/mobile-overlay";
import type { NavLinkItem } from "@/components/navigation/nav-links";

/**
 * Top-level navigation: composes the fixed top bar with the mobile overlay.
 *
 * No props — all state is local (menu open + computed color scheme), and the
 * component reads i18n + Mantine context directly so the router can mount it
 * with no wiring. `Record<string, never>` instead of `interface Foo {}`
 * because `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type NavigationMainProps = Record<string, never>;

export const NavigationMain: FC<NavigationMainProps> = () => {
  const { i18n, t } = useTranslation();
  // Parent owns `menuOpen` so both `<TopBar />` (the trigger) and
  // `<MobileOverlay />` (the surface) see the same state without a shared
  // store or context.
  const [menuOpen, setMenuOpen] = useState(false);

  // Resolve current state once: language + dark-mode flag are shared by both bars.
  const currentLanguage = i18n.language.split("-")[0] as SupportedLanguages;
  const computedColorScheme = useComputedColorScheme("light");
  const isDark = computedColorScheme === "dark";

  const navLinks: ReadonlyArray<NavLinkItem> = [
    { name: t("nav.aboutMe"), href: "/" },
    { name: t("nav.resume"), href: "resume" },
  ];

  const handleLanguageChange = (language: SupportedLanguages) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <TopBar
        navLinks={navLinks}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        isDark={isDark}
      />
      <MobileOverlay
        navLinks={navLinks}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        isDark={isDark}
      />
    </>
  );
};
