import React from "react";
import { useColorScheme } from "../hooks/useColorScheme";
import { Button } from "@mui/material";

export default function ToggleDarkModeButton() {
    const { isDark, setIsDark } = useColorScheme();
    return (
        <Button
            onClick={(e) => setIsDark(!isDark)}
        />
    );
};