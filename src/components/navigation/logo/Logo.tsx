/// <reference types="vite-plugin-svgr/client" />

import LogoImage from "../../../assets/Logo.svg?react";
import { NavLink } from "react-router-dom";
export interface LogoProps {
  linksTo?: string;
}

export const Logo: React.FC<LogoProps> = ({ linksTo }) => {
  return (
    <NavLink to={`${linksTo}`} className="logo-link">
      <LogoImage />
    </NavLink>
  );
};
