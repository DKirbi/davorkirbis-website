/// <reference types="vite-plugin-svgr/client" />

import "./Logo.scss";
import LogoImage from "../../../assets/Logo.svg?react";
export interface LogoProps {
  hrefName?: string;
}

export const Logo: React.FC<LogoProps> = ({ hrefName }) => {
  return (
    <a href={`${hrefName}`} className="logo-link">
      <LogoImage />
    </a>
  );
};
