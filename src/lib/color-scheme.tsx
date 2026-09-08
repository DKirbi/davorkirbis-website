import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { FC, PropsWithChildren } from "react";

/** Resolved light/dark scheme applied as `class="dark"` on `<html>`. */
export type ColorScheme = "light" | "dark";

const STORAGE_KEY = "color-scheme";
const LEGACY_STORAGE_KEY = "mantine-color-scheme-value";
const DEFAULT_THEME = "default";

/** Read the scheme already applied by the FOUC script (or default to light). */
const readDocumentColorScheme = (): ColorScheme => {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

/** Apply scheme + default theme to `<html>` and persist for the next load. */
const applyColorScheme = (scheme: ColorScheme): void => {
  document.documentElement.classList.toggle("dark", scheme === "dark");
  document.documentElement.dataset.theme = DEFAULT_THEME;
  document.documentElement.style.colorScheme = scheme;
  localStorage.setItem(STORAGE_KEY, scheme);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
};

/** Value exposed by `ColorSchemeProvider`. */
export interface ColorSchemeContextValue {
  /** Current resolved scheme. */
  colorScheme: ColorScheme;
  /** Set light or dark and persist. */
  setColorScheme: (scheme: ColorScheme) => void;
  /** Flip between light and dark. */
  toggleColorScheme: () => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextValue | null>(null);

/**
 * Owns the document `dark` class and `data-theme`. Mount once at the app root.
 */
export const ColorSchemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(readDocumentColorScheme);

  useEffect(() => {
    applyColorScheme(colorScheme);
  }, [colorScheme]);

  const setColorScheme = useCallback((scheme: ColorScheme) => {
    setColorSchemeState(scheme);
  }, []);

  const toggleColorScheme = useCallback(() => {
    setColorSchemeState((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ colorScheme, setColorScheme, toggleColorScheme }),
    [colorScheme, setColorScheme, toggleColorScheme],
  );

  return <ColorSchemeContext.Provider value={value}>{children}</ColorSchemeContext.Provider>;
};

/** Read / write the global color scheme. Must be used under `ColorSchemeProvider`. */
export const useColorScheme = (): ColorSchemeContextValue => {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw new Error("useColorScheme must be used within ColorSchemeProvider");
  }
  return context;
};

export { STORAGE_KEY };
