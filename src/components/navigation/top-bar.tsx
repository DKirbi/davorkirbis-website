import type { FC } from "react";
import { NavLink } from "react-router-dom";
import type { SupportedLanguages } from "@/i18n";
import { Logo } from "@/components/navigation/logo/Logo";
import { NavLinkGroup } from "@/components/navigation/link-components/Navigation-group";
import { RightControls } from "@/components/navigation/right-controls";
import { HamburgerButton } from "@/components/navigation/hamburger-button";
import { getNavLinkClassName } from "@/components/navigation/nav-link-class";
import type { NavLinkItem } from "@/components/navigation/nav-links";

// Note: `onToggleMenu` is a void-callback rather than the raw `setMenuOpen`
// setter from the parent — the child only signals intent ("user tapped the
// hamburger"), the parent owns the flip semantics.
/** Fixed top navigation bar: logo, desktop links + controls, mobile hamburger. */
export interface TopBarProps {
  /** Top-level navigation entries; read-only because the array is built once per render in `NavigationMain`. */
  navLinks: ReadonlyArray<NavLinkItem>;
  /** Mirrors the parent's mobile-menu state so the hamburger can render the X variant when open. */
  menuOpen: boolean;
  /** Called with no arguments when the hamburger is tapped. */
  onToggleMenu: () => void;
  /** Active i18n language. Currently `'en' | 'de' | 'sl'` — see `SupportedLanguages` in `src/i18n.ts`. */
  currentLanguage: SupportedLanguages;
  /** Forwarded to `RightControls`; same contract as `DesktopLanguageMenu.onChange`. */
  onLanguageChange: (language: SupportedLanguages) => void;
  /** Color-scheme flag forwarded to the hamburger bars and the desktop language menu. */
  isDark: boolean;
}

export const TopBar: FC<TopBarProps> = ({
  navLinks,
  menuOpen,
  onToggleMenu,
  currentLanguage,
  onLanguageChange,
  isDark,
}) => (
  <div className="nav-surface fixed left-0 w-full top-0 z-[999]">
    <div className="flex justify-center h-[54px] m-auto">
      <div className="flex justify-between items-center w-9/12 py-3">
        <Logo linksTo="/" />

        {/* Desktop links + right controls (hidden below mobile breakpoint) */}
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
            <RightControls
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
              isDark={isDark}
            />
          </div>
        </NavLinkGroup>

        {/* Mobile hamburger trigger */}
        <HamburgerButton open={menuOpen} onToggle={onToggleMenu} isDark={isDark} />
      </div>
    </div>
  </div>
);
