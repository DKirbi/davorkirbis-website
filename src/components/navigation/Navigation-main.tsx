import { useState } from "react";
import { NavLink, NavLinkRenderProps } from "react-router-dom";
import { NavLinkGroup } from "./link-components/Navigation-group";
import { Logo } from "./logo/Logo";

export interface NavProps {
  children?: React.ReactNode;
}

const NavLinks = [
  {
    name: "ABOUT ME",
    href: "about-me",
  },
  {
    name: "RESUME",
    href: "cv",
  },
];

const getNavLinkClassName = (
  { isActive, isPending }: NavLinkRenderProps,
  additionalClasses = "",
) => {
  let baseClass = "";
  if (isActive) baseClass = "active";
  else if (isPending) baseClass = "pending";
  return `${baseClass} ${additionalClasses}`.trim();
};

export const NavigationMain: React.FC<NavProps> = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed left-0 w-full top-0 z-[999] bg-[#efefef]">
        <div className="flex justify-center h-[54px] m-auto">
          <div className="flex justify-between items-center w-9/12 py-3">
            <Logo linksTo="/about-me" />

            {/* Desktop links */}
            <NavLinkGroup>
              <div className="hidden mobile:flex">
                {NavLinks.map((navLink, index) => (
                  <NavLink
                    key={index}
                    to={navLink.href}
                    className={(state) => getNavLinkClassName(state, "nav-link")}
                  >
                    {navLink.name}
                  </NavLink>
                ))}
              </div>
            </NavLinkGroup>

            {/* Hamburger / X button */}
            <button
              className="mobile:hidden relative w-6 h-5 flex flex-col justify-between"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`block h-0.5 w-6 bg-neutral-700 transition-all duration-300 origin-center ${
                  menuOpen ? "translate-y-[9px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-neutral-700 transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-neutral-700 transition-all duration-300 origin-center ${
                  menuOpen ? "-translate-y-[9px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen mobile overlay */}
      <div
        className={`fixed inset-0 z-[998] bg-[#efefef] flex flex-col items-center justify-center gap-8 transition-opacity duration-300 mobile:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {NavLinks.map((navLink, index) => (
          <NavLink
            key={index}
            to={navLink.href}
            className={(state) => getNavLinkClassName(state, "nav-link text-2xl")}
            onClick={() => setMenuOpen(false)}
          >
            {navLink.name}
          </NavLink>
        ))}
      </div>
    </>
  );
};
