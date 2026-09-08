import type { FC } from "react";

/** Animated three-bar hamburger button that morphs into an X when open. */
export interface HamburgerButtonProps {
  /** Whether the mobile menu is currently open; drives the bars-to-X morph and the `aria-label` (`Open menu` / `Close menu`). */
  open: boolean;
  /** Called with no arguments when the user taps the button; the parent decides whether to flip a boolean, close on outside click, etc. */
  onToggle: () => void;
}

export const HamburgerButton: FC<HamburgerButtonProps> = ({ open, onToggle }) => (
  <button
    className="mobile:hidden relative w-6 h-5 flex flex-col justify-between"
    onClick={onToggle}
    aria-label={open ? "Close menu" : "Open menu"}
  >
    <span
      className={`block h-0.5 w-6 bg-foreground transition-all duration-300 origin-center ${
        open ? "translate-y-[9px] rotate-45" : ""
      }`}
    />
    <span
      className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
        open ? "opacity-0" : ""
      }`}
    />
    <span
      className={`block h-0.5 w-6 bg-foreground transition-all duration-300 origin-center ${
        open ? "-translate-y-[9px] -rotate-45" : ""
      }`}
    />
  </button>
);
