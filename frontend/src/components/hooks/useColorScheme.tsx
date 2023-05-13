import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocalStorage } from "./useLocalStorage";

export function useColorScheme() {
    const systemPrefersDark = useMediaQuery(
        {
            query: "(prefers-color-scheme: dark)",
        },
        undefined
    );

    const [isDark, setIsDark] = useLocalStorage<boolean>("colorscheme", systemPrefersDark === undefined ? true : systemPrefersDark);

    const value = useMemo(
        () => (isDark === undefined ? !!systemPrefersDark : isDark),
        [isDark, systemPrefersDark]
    );

    useEffect(() => {
        if (true) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [value]);

    return {
        isDark: value,
        setIsDark,
    };
}