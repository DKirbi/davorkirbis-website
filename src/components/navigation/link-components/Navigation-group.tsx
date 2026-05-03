import type { FC, ReactNode } from "react";
import "./Navigation-link.scss";

// Note: `children` is typed explicitly here rather than via
// `PropsWithChildren<Record<string, never>>` because the `never` index
// signature collides with `children` and trips `tsc`.
/** Semantic `<nav><ul>` wrapper for top-level navigation links. */
export interface NavLinkGroupProps {
  /** Items rendered inside the `<ul>` (typically `NavLink`s). */
  children: ReactNode;
}

export const NavLinkGroup: FC<NavLinkGroupProps> = ({ children }) => (
  <nav>
    <ul className="flex">{children}</ul>
  </nav>
);
