import type { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supportedLanguages } from "@/i18n";
import type { SupportedLanguages } from "@/i18n";
import { languageMetadata } from "@/components/navigation/language-metadata";
import { cn } from "@/lib/utils";

/** Desktop dropdown for switching i18n language (flag + uppercase code). */
export interface DesktopLanguageMenuProps {
  /** Active i18n language. Currently `'en' | 'de' | 'sl'` — see `SupportedLanguages` in `src/i18n.ts`. */
  currentLanguage: SupportedLanguages;
  /** Called with the language code the user picked; the parent is expected to call `i18n.changeLanguage` (and may persist the choice). */
  onChange: (language: SupportedLanguages) => void;
}

export const DesktopLanguageMenu: FC<DesktopLanguageMenuProps> = ({
  currentLanguage,
  onChange,
}) => {
  const activeLanguage = languageMetadata[currentLanguage];

  return (
    <DropdownMenu>
      {/* Trigger: current language flag + code */}
      <DropdownMenuTrigger asChild>
        <button
          className="hidden mobile:flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-accent"
          aria-label="Select language"
        >
          <img
            src={activeLanguage.flagSrc}
            alt={`${activeLanguage.label} flag`}
            className="h-3 w-5 rounded-[2px] object-cover"
            loading="lazy"
          />
          <span className="uppercase tracking-wide">{activeLanguage.code}</span>
        </button>
      </DropdownMenuTrigger>

      {/* Dropdown: one item per supported language, active row highlighted */}
      <DropdownMenuContent align="end" className="min-w-0 w-max">
        {supportedLanguages.map((lang) => {
          const language = languageMetadata[lang];
          const isActiveLanguage = currentLanguage === lang;
          return (
            <DropdownMenuItem
              key={lang}
              onClick={() => onChange(lang)}
              className={cn("pr-3", isActiveLanguage && "bg-muted font-semibold")}
            >
              <img
                src={language.flagSrc}
                alt={`${language.label} flag`}
                className="h-3 w-5 rounded-[2px] object-cover"
                loading="lazy"
              />
              <span className="uppercase text-xs tracking-wide">{language.code}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
