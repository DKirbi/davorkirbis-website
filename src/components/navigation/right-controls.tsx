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
  /**
   * `"topbar"` (default): inline horizontal cluster used on desktop.
   * `"mobile"`: stacks the flag row above the theme toggle (each on its own
   * row) with extra vertical breathing room, and renders the toggle at
   * `size="xl"`.
   */
  layout?: "topbar" | "mobile";
}

export const RightControls: FC<RightControlsProps> = ({
  currentLanguage,
  onLanguageChange,
  isDark,
  layout = "topbar",
}) => {
  if (layout === "mobile") {
    return (
      <div className="flex flex-col items-center gap-6">
        <MobileLanguageRow currentLanguage={currentLanguage} onChange={onLanguageChange} />
        <div className="mt-2">
          <ThemeToggle size="xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-center">
      <DesktopLanguageMenu
        currentLanguage={currentLanguage}
        onChange={onLanguageChange}
        isDark={isDark}
      />
      <ThemeToggle />
    </div>
  );
};
