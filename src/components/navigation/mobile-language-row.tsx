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
  <div className="flex mobile:hidden gap-2 items-center">
    {supportedLanguages.map((lang) => {
      const language = languageMetadata[lang];
      const isActive = currentLanguage === lang;
      return (
        <button
          key={lang}
          onClick={() => onChange(lang)}
          className={`rounded-sm transition-opacity ${
            isActive ? "opacity-100 ring-1 ring-neutral-500" : "opacity-60 hover:opacity-90"
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
