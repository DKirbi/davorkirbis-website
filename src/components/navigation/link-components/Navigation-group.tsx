import "./Navigation-link.scss";

export interface NavLinkGroupProps {
  children: React.ReactNode;
}

export const NavLinkGroup: React.FC<NavLinkGroupProps> = ({ children }) => {
  return (
    <nav>
      <ul className="flex">{children}</ul>
    </nav>
  );
};
