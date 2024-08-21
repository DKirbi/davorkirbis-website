import { Link } from "react-router-dom";
import "./Navigation-link.scss";

export interface NavigationLinkProps {
  active?: boolean;
  underline?: boolean;
  label?: string;
  padding?: string;
  hrefName?: string;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  label,
  active,
  hrefName,
}) => {
  return (
    <li
      className={`${
        active ? "isActive" : "isInactive"
      } p-1 text-sm text-neutral-700	 hover:text-neutral-100	 `}
    >
      <Link to={`${hrefName}`}>{label}</Link>
    </li>
  );
};
