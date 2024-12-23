import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export function Layout() {
    return (
        <div>
            <Navigation />
            <Outlet />
        </div>
    );
}

export default Layout;