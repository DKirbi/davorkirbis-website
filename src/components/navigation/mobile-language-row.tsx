import type { FC } from "react";
import { supportedLanguages } from "@/i18n";
import type { SupportedLanguages } from "@/i18n";
import { languageMetadata } from "@/components/navigation/language-metadata";

// Note: no `isDark` prop on purpose — the mobile flag row signals the active
// language with opacity + ring instead of background tints, so it doesn't
// need to branch on color scheme.
/** Inline flag-row language switcher used below the mobile breakpoint. */
export interface MobileLanguageRowProps {
  /** Active i18n language. Currently `'en' | 'de' | 'sl'` — see `SupportedLanguages` in `src/i18n.ts`. */
  currentLanguage: SupportedLanguages;
  /** Called with the language code the user picked; the parent is expected to call `i18n.changeLanguage`. */
  onChange: (language: SupportedLanguages) => void;
}

export const MobileLanguageRow: FC<MobileLanguageRowProps> = ({ currentLanguage, onChange }) => (
  <div className="flex mobile:hidden gap-4 items-center">
    {supportedLanguages.map((lang) => {
      const language = languageMetadata[lang];
      const isActive = currentLanguage === lang;
      return (
        <button
          key={lang}
          onClick={() => onChange(lang)}
          className={`flex items-center justify-center h-[55px] w-[55px] rounded-md transition-opacity ${
            isActive ? "opacity-100 ring-2 ring-neutral-500" : "opacity-60 hover:opacity-90"
          }`}
          aria-label={`Switch language to ${language.label}`}
        >
          {/* Swap the flagcdn width param so the larger button doesn't blur the
              20px asset. `w40` is sharp at 36x24 css pixels. */}
          <img
            src={language.flagSrc.replace("w20", "w40")}
            alt={`${language.label} flag`}
            className="h-6 w-9 rounded-sm object-cover"
            loading="lazy"
          />
        </button>
      );
    })}
  </div>
);
