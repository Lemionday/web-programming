import { Outlet } from "react-router-dom";
import { useColorScheme } from "../hooks/useColorScheme";

export function BaseLayout() {
    return <div>
        <Outlet />
    </div>;
}