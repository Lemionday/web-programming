import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export default function Navbar() {
    const auth = useAuth();
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
        </nav>
    )
}