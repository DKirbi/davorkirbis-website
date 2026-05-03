import type { FC } from "react";
import { useRef } from "react";
import { Menu, UnstyledButton } from "@mantine/core";
import { supportedLanguages } from "@/i18n";
import type { SupportedLanguages } from "@/i18n";
import { languageMetadata } from "@/components/navigation/language-metadata";

/** Desktop dropdown for switching i18n language (flag + uppercase code). */
export interface DesktopLanguageMenuProps {
  /** Active i18n language. Currently `'en' | 'de' | 'sl'` — see `SupportedLanguages` in `src/i18n.ts`. */
  currentLanguage: SupportedLanguages;
  /** Called with the language code the user picked; the parent is expected to call `i18n.changeLanguage` (and may persist the choice). */
  onChange: (language: SupportedLanguages) => void;
  /** Whether the app is in dark color scheme; controls hover / active background tints. */
  isDark: boolean;
}

export const DesktopLanguageMenu: FC<DesktopLanguageMenuProps> = ({
  currentLanguage,
  onChange,
  isDark,
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeLanguage = languageMetadata[currentLanguage];

  return (
    <Menu
      position="bottom-end"
      shadow="sm"
      withinPortal={false}
      offset={4}
      styles={{ dropdown: { width: "max-content", minWidth: "unset" } }}
    >
      {/* Trigger: current language flag + code */}
      <Menu.Target>
        <UnstyledButton
          ref={triggerRef}
          className={`hidden mobile:flex items-center gap-2 rounded-md px-2 py-1 text-sm ${
            isDark ? "hover:bg-neutral-800" : "hover:bg-gray-100"
          }`}
          aria-label="Select language"
        >
          <img
            src={activeLanguage.flagSrc}
            alt={`${activeLanguage.label} flag`}
            className="h-3 w-5 rounded-[2px] object-cover"
            loading="lazy"
          />
          <span className="uppercase tracking-wide">{activeLanguage.code}</span>
        </UnstyledButton>
      </Menu.Target>

      {/* Dropdown: one item per supported language, active row highlighted */}
      <Menu.Dropdown>
        {supportedLanguages.map((lang) => {
          const language = languageMetadata[lang];
          const isActiveLanguage = currentLanguage === lang;
          return (
            <Menu.Item
              key={lang}
              onClick={() => onChange(lang)}
              className={`pr-3 ${
                isActiveLanguage
                  ? isDark
                    ? "bg-neutral-800 hover:bg-neutral-700"
                    : "bg-gray-200 hover:bg-gray-300"
                  : isDark
                    ? "hover:bg-neutral-800"
                    : "hover:bg-gray-100"
              }`}
              leftSection={
                <img
                  src={language.flagSrc}
                  alt={`${language.label} flag`}
                  className="h-3 w-5 rounded-[2px] object-cover"
                  loading="lazy"
                />
              }
            >
              <span
                className={`uppercase text-xs tracking-wide ${
                  isActiveLanguage ? "font-semibold" : "font-normal"
                }`}
              >
                {language.code}
              </span>
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};
