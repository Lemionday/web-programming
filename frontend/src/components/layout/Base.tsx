import { Outlet } from "react-router-dom";

export function BaseLayout() {
    return <div className="">
        <div className="bg-white text-gray-600 dark:bg-gray-900 dark:text-gray-300">
            <Outlet />
        </div>
    </div>;
}