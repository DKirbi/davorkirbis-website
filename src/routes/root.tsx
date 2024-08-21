import { Outlet } from "react-router-dom";
import { NavigationMain } from "../components/navigation/Navigation-main";

export default function Root() {
  return (
    <div>
      <NavigationMain />
      <Outlet />
    </div>
  );
}
