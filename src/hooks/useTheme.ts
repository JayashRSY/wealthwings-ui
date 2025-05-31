import { useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "./useRedux";
import { setTheme, ThemeType } from "@/features/theme/themeSlice";

export type Theme = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  // Set the theme in Redux
  const setThemeRedux = useCallback((newTheme: ThemeType) => {
    dispatch(setTheme(newTheme));
  }, [dispatch]);

  // Effect to update the <html> class
  useEffect(() => {
    const root = window.document.documentElement;
    const appliedTheme = theme === "system" ? getSystemTheme() : theme;

    root.classList.remove("light", "dark");
    root.classList.add(appliedTheme);

    // Listen for system theme changes if 'system' is selected
    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => {
        const systemTheme = getSystemTheme();
        root.classList.remove("light", "dark");
        root.classList.add(systemTheme);
      };
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    setThemeRedux(theme === "dark" ? "light" : "dark");
  }, [theme, setThemeRedux]);

  return { theme, setTheme: setThemeRedux, toggleTheme };
}
