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
    name: "CV",
    href: "cv",
  },

  {
    name: "PHOTOS",
    href: "photos",
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
  return (
    <div className="fixed left-0 w-full top-0 z-[999]">
      <div className="flex justify-center h-[54px]  m-auto ">
        <div className="flex justify-between align-middle w-9/12   py-3">
          <Logo linksTo="/" />
          <NavLinkGroup>
            {NavLinks.map((navLink, index) => {
              return (
                <NavLink
                  key={index}
                  to={`${navLink.href}`}
                  className={(state) => getNavLinkClassName(state, "nav-link")}
                >
                  {`${navLink.name}`}
                </NavLink>
              );
            })}
          </NavLinkGroup>
        </div>
      </div>
    </div>
  );
};
