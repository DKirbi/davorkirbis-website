import { NavLinkGroup } from "./link-components/Navigation-group";
import { NavigationLink } from "./link-components/NavLink";
import { Logo } from "./logo/Logo";

export interface NavProps {
  children?: React.ReactNode;
}

const NavLinks = [
  {
    name: "ABOUT ME",
    href: "aboutme",
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

export const NavigationMain: React.FC<NavProps> = () => {
  return (
    <div className=" flex justify-center bg-slate-400 h-[54px]  fixed left-0 w-full m-auto top-0">
      <div className="flex justify-between align-middle w-9/12  fixed py-3">
        <Logo />
        <NavLinkGroup>
          {NavLinks.map((navLink, index) => {
            return <NavigationLink key={index} label={`${navLink.name}`} />;
          })}
        </NavLinkGroup>
      </div>
    </div>
  );
};
