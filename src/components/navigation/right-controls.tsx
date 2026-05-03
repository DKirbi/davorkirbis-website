import type { FC } from "react";
import type { SupportedLanguages } from "@/i18n";
import { DesktopLanguageMenu } from "@/components/navigation/desktop-language-menu";
import { MobileLanguageRow } from "@/components/navigation/mobile-language-row";
import { ThemeToggle } from "@/components/navigation/theme-toggle";

/** Right-hand controls cluster: language switchers + theme toggle. */
export interface RightControlsProps {
  /** Active i18n language. Currently `'en' | 'de' | 'sl'` — see `SupportedLanguages` in `src/i18n.ts`. */
  currentLanguage: SupportedLanguages;
  /** Forwarded to both language switchers; same contract as `DesktopLanguageMenu.onChange`. */
  onLanguageChange: (language: SupportedLanguages) => void;
  /** Whether the app is in dark color scheme; forwarded only to `DesktopLanguageMenu` (the row + toggle don't need it). */
  isDark: boolean;
}

export const RightControls: FC<RightControlsProps> = ({
  currentLanguage,
  onLanguageChange,
  isDark,
}) => (
  <div className="flex gap-3 items-center">
    <DesktopLanguageMenu
      currentLanguage={currentLanguage}
      onChange={onLanguageChange}
      isDark={isDark}
    />
    <MobileLanguageRow currentLanguage={currentLanguage} onChange={onLanguageChange} />
    <ThemeToggle />
  </div>
);
