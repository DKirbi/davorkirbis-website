/// <reference types="vite-plugin-svgr/client" />

import type { FC } from "react";
import { NavLink } from "react-router-dom";
import LogoImage from "@/assets/Logo.svg?react";

/** Brand mark linking to a configurable route (defaults at the call site). */
export interface LogoProps {
  /**
   * Path passed to `react-router-dom`'s `NavLink`. Optional — when omitted
   * the link still renders but its `to` resolves to the literal string
   * `"undefined"`. Today the only caller passes `"/"`; the prop is kept so
   * the logo can point elsewhere on future pages.
   */
  linksTo?: string;
}

export const Logo: FC<LogoProps> = ({ linksTo }) => (
  <NavLink to={`${linksTo}`} className="logo-link">
    {/* `?react` from vite-plugin-svgr imports the SVG as a React component. */}
    <LogoImage className="logo-svg" />
  </NavLink>
);
