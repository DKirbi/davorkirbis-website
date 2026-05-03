import type { SupportedLanguages } from "@/i18n";

/** Display data shown next to each language switcher entry. */
export interface LanguageMeta {
  /** Native-language display name shown in `aria-label`s and tooltips (e.g. `"Slovenščina"`). */
  label: string;
  /** Two-letter uppercase code rendered in the desktop trigger (e.g. `"SL"`). */
  code: string;
  /** Absolute URL of the 20px-wide flag PNG served by flagcdn.com. */
  flagSrc: string;
}

export const languageMetadata: Record<SupportedLanguages, LanguageMeta> = {
  en: { label: "English", code: "EN", flagSrc: "https://flagcdn.com/w20/gb.png" },
  de: { label: "Deutsch", code: "DE", flagSrc: "https://flagcdn.com/w20/de.png" },
  sl: { label: "Slovenščina", code: "SL", flagSrc: "https://flagcdn.com/w20/si.png" },
};
