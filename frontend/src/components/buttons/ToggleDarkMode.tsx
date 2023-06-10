import { Button } from "@mui/material";
import { useColorScheme } from "../hooks/useColorScheme";

export default function ToggleDarkModeButton() {
    const { isDark, setIsDark } = useColorScheme();
    return (
        <Button
            onClick={() => setIsDark(!isDark)}
        />
    );
}