import { useCallback, useEffect, useMemo, useRef } from "react";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useColorScheme, type ColorScheme } from "@/lib/color-scheme";
import { supportedLanguages, type SupportedLanguages } from "@/i18n";

const APPEARANCE_MESSAGE_TYPE = "showcase:set-appearance";
const APPEARANCE_PROTOCOL_VERSION = 1;

/** Host → SketchFlow appearance snapshot (full theme + locale). */
interface ShowcaseSetAppearanceMessage {
  type: typeof APPEARANCE_MESSAGE_TYPE;
  version: typeof APPEARANCE_PROTOCOL_VERSION;
  theme: ColorScheme;
  locale: SupportedLanguages;
}

/** Resolve a usable SketchFlow origin, or null if the env value is missing/invalid. */
const parseSketchflowOrigin = (raw: string | undefined): string | null => {
  if (!raw?.trim()) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
};

/** Build the iframe `src` with host-owned theme/locale query params. */
const buildSketchflowSrc = (
  originUrl: string,
  theme: ColorScheme,
  locale: SupportedLanguages,
): string => {
  const url = new URL(originUrl);
  url.searchParams.set("theme", theme);
  url.searchParams.set("locale", locale);
  return url.toString();
};

/**
 * Full-viewport SketchFlow iframe under the 54px top bar.
 *
 * Theme and locale are owned by this site: query params on first paint /
 * language change, `postMessage` on theme toggle without remounting.
 */
export type WorkShowcaseFrameProps = Record<string, never>;

export const WorkShowcaseFrame: FC<WorkShowcaseFrameProps> = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const { colorScheme } = useColorScheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeReadyRef = useRef(false);
  // Theme at src-build time only. Updating this ref must not rebuild `src` on
  // toggle — that would reload the iframe and wipe SketchFlow navigation.
  const themeForSrcRef = useRef(colorScheme);
  themeForSrcRef.current = colorScheme;

  const locale: SupportedLanguages = supportedLanguages.includes(
    lang as SupportedLanguages,
  )
    ? (lang as SupportedLanguages)
    : "en";

  const configuredUrl = import.meta.env.VITE_SKETCHFLOW_URL;
  const targetOrigin = parseSketchflowOrigin(configuredUrl);

  // Rebuild `src` when locale or origin changes so language switches reload
  // SketchFlow with the current theme. Theme-only toggles must not rewrite `src`.
  const iframeSrc = useMemo(() => {
    if (!configuredUrl || !targetOrigin) return null;
    return buildSketchflowSrc(configuredUrl, themeForSrcRef.current, locale);
  }, [configuredUrl, locale, targetOrigin]);

  const postAppearance = useCallback(() => {
    const contentWindow = iframeRef.current?.contentWindow;
    if (!contentWindow || !targetOrigin) return;
    const message: ShowcaseSetAppearanceMessage = {
      type: APPEARANCE_MESSAGE_TYPE,
      version: APPEARANCE_PROTOCOL_VERSION,
      theme: colorScheme,
      locale,
    };
    contentWindow.postMessage(message, targetOrigin);
  }, [colorScheme, locale, targetOrigin]);

  // Reset readiness when the iframe document is about to reload.
  useEffect(() => {
    iframeReadyRef.current = false;
  }, [iframeSrc]);

  // Theme (and locale, if src did not already reload) while the iframe is live.
  useEffect(() => {
    if (!iframeReadyRef.current) return;
    postAppearance();
  }, [postAppearance]);

  const handleLoad = () => {
    iframeReadyRef.current = true;
    postAppearance();
  };

  if (!iframeSrc) {
    return (
      <div className="fixed inset-[54px_0_0_0] flex items-center justify-center px-6">
        <p className="text-lg text-muted-foreground">{t("work.missingUrl")}</p>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      title={t("work.iframeTitle")}
      src={iframeSrc}
      width="100%"
      height="100%"
      loading="eager"
      onLoad={handleLoad}
      className="fixed inset-[54px_0_0_0] border-0"
    />
  );
};
