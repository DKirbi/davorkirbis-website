import type { NavLinkRenderProps } from "react-router-dom";

/**
 * Compose className for `react-router-dom`'s `NavLink` based on its render
 * state, optionally appending caller-provided utility classes.
 */
export const getNavLinkClassName = (
  { isActive, isPending }: NavLinkRenderProps,
  additionalClasses = "",
): string => {
  let baseClass = "";
  if (isActive) baseClass = "active";
  else if (isPending) baseClass = "pending";
  return `${baseClass} ${additionalClasses}`.trim();
};
