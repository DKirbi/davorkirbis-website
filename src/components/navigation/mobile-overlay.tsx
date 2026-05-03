import type { FC } from "react";
import { NavLink } from "react-router-dom";
import type { SupportedLanguages } from "@/i18n";
import { RightControls } from "@/components/navigation/right-controls";
import { getNavLinkClassName } from "@/components/navigation/nav-link-class";
import type { NavLinkItem } from "@/components/navigation/nav-links";

/** Fullscreen mobile overlay shown when the hamburger menu is open. */
export interface MobileOverlayProps {
  /** Same shape as the top bar — the same items appear in both views. */
  navLinks: ReadonlyArray<NavLinkItem>;
  /** Drives the fade-in / pointer-events transition. */
  open: boolean;
  /** Called with no arguments after a link is tapped, so the overlay can dismiss itself before navigation animates. */
  onClose: () => void;
  /** Active i18n language. Currently `'en' | 'de' | 'sl'` — see `SupportedLanguages` in `src/i18n.ts`. */
  currentLanguage: SupportedLanguages;
  /** Forwarded to `RightControls`; same contract as `DesktopLanguageMenu.onChange`. */
  onLanguageChange: (language: SupportedLanguages) => void;
  /** Color-scheme flag forwarded to `RightControls`. */
  isDark: boolean;
}

export const MobileOverlay: FC<MobileOverlayProps> = ({
  navLinks,
  open,
  onClose,
  currentLanguage,
  onLanguageChange,
  isDark,
}) => (
  <div
    className={`nav-surface fixed inset-0 z-[998] flex flex-col items-center justify-center gap-8 transition-opacity duration-300 mobile:hidden ${
      open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    }`}
  >
    {navLinks.map((navLink, index) => (
      <NavLink
        key={index}
        to={navLink.href}
        className={(state) => getNavLinkClassName(state, "nav-link text-2xl")}
        onClick={onClose}
      >
        {navLink.name}
      </NavLink>
    ))}
    <RightControls
      currentLanguage={currentLanguage}
      onLanguageChange={onLanguageChange}
      isDark={isDark}
      layout="mobile"
    />
  </div>
);
