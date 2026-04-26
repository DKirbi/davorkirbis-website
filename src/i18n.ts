import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import de from "./locales/de/translation.json";
import sl from "./locales/sl/translation.json";

export type SupportedLanguages = "en" | "de" | "sl";

export const supportedLanguages: SupportedLanguages[] = ["en", "de", "sl"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en" satisfies SupportedLanguages,
    supportedLngs: supportedLanguages,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: en },
      de: { translation: de satisfies typeof en },
      sl: { translation: sl satisfies typeof en },
    },
  });

export default i18n;
