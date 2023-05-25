import { Outlet } from "react-router-dom";

export function BaseLayout() {
    return <div className="dark">
        <div className="bg-white dark:bg-gray-900">
            <Outlet />
        </div>
    </div>;
}