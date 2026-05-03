/** Shape of a single top-level navigation entry. */
export interface NavLinkItem {
  /** Localized label rendered in the nav. */
  name: string;
  /** Path passed to `react-router-dom`'s `NavLink` (relative to `/`). */
  href: string;
}
