/// <reference types="vite-plugin-svgr/client" />

import type { FC, MouseEvent } from "react";
import { useLayoutEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LogoImage from "@/assets/Logo.svg?react";

/** Brand mark linking to a configurable route (defaults at the call site). */
export interface LogoProps {
  /**
   * Path passed to `react-router-dom`'s `NavLink`. Defaults to `"home"`
   * (relative to the `/:lang` parent route). Kept as a prop so the logo can
   * point elsewhere on future pages.
   */
  linksTo?: string;
}

export const Logo: FC<LogoProps> = ({ linksTo = "home" }) => {
  const location = useLocation();
  const shouldScrollToTopRef = useRef(false);

  // Logo clicks must land at the top of the home page. Same-route clicks do
  // not remount the page, so we scroll in the click handler; cross-route
  // clicks also reset after the destination paints.
  useLayoutEffect(() => {
    if (!shouldScrollToTopRef.current) {
      return;
    }
    window.scrollTo(0, 0);
    shouldScrollToTopRef.current = false;
  }, [location.pathname, location.key]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    shouldScrollToTopRef.current = true;
    window.scrollTo(0, 0);
  };

  return (
    <NavLink to={linksTo} className="logo-link" onClick={handleClick}>
      {/* `?react` from vite-plugin-svgr imports the SVG as a React component. */}
      <LogoImage className="logo-svg" />
    </NavLink>
  );
};
