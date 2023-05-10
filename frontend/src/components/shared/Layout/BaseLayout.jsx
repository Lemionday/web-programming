import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar";

export default function BaseLayout() {
    document.documentElement.setAttribute('data-theme', 'dark');
    return <>
        <Navbar />
        <Outlet />
    </>;
}