import { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supportedLanguages, type SupportedLanguages } from "@/i18n";
import { NavigationMain } from "@/components/navigation/Navigation-main";

/**
 * Layout route mounted at `/:lang`. Validates the `:lang` URL segment against
 * `supportedLanguages` (redirecting to the default `/en/home` on anything
 * unknown) and keeps `i18n.language` in sync with the URL — the URL is the
 * source of truth so shared links always render in the language they were
 * shared in. Renders the top navigation + the route `Outlet`.
 */
export default function LangRoot() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  // `useEffect` must run on every render even when we end up redirecting, so
  // the early-return below it is fine — the effect is keyed by `lang` and
  // will simply no-op for invalid values (the redirect unmounts us anyway).
  useEffect(() => {
    if (lang && supportedLanguages.includes(lang as SupportedLanguages) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  if (!lang || !supportedLanguages.includes(lang as SupportedLanguages)) {
    return <Navigate to="/en/home" replace />;
  }

  return (
    <div>
      <NavigationMain />
      <Outlet />
    </div>
  );
}
