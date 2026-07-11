import { useEffect } from "react";
import { useGetThemeSettings } from "@workspace/api-client-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeManager() {
  const { mode, setMode } = useTheme();
  const { data: theme } = useGetThemeSettings();

  // Handle fallback theme mode if database defaultMode changes and no user override is set
  useEffect(() => {
    if (theme?.defaultMode && !localStorage.getItem("theme-mode")) {
      setMode(theme.defaultMode as "dark" | "light");
    }
  }, [theme]);

  useEffect(() => {
    if (!theme) return;
    const colors = mode === "dark" ? theme.customDark : theme.customLight;
    
    const root = document.documentElement;
    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--foreground", colors.foreground);
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-foreground", colors.primaryForeground);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--accent-foreground", colors.accentForeground);
    root.style.setProperty("--card", colors.card);
    root.style.setProperty("--card-foreground", colors.foreground);
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--input", colors.border);
    root.style.setProperty("--muted", colors.muted);
    root.style.setProperty("--muted-foreground", colors.mutedForeground);
    root.style.setProperty("--ring", colors.primary);

    if (theme.headingFont) {
      root.style.setProperty("--font-display", `'${theme.headingFont}', sans-serif`);
      const headingFontLink = document.getElementById("dynamic-heading-font") as HTMLLinkElement;
      const href = `https://fonts.googleapis.com/css2?family=${theme.headingFont.replace(/ /g, "+")}:wght@300;400;500;600;700;800&display=swap`;
      if (headingFontLink) {
        headingFontLink.href = href;
      } else {
        const link = document.createElement("link");
        link.id = "dynamic-heading-font";
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    }

    if (theme.bodyFont) {
      root.style.setProperty("--font-sans", `'${theme.bodyFont}', sans-serif`);
      const bodyFontLink = document.getElementById("dynamic-body-font") as HTMLLinkElement;
      const href = `https://fonts.googleapis.com/css2?family=${theme.bodyFont.replace(/ /g, "+")}:wght@300;400;500;600;700&display=swap`;
      if (bodyFontLink) {
        bodyFontLink.href = href;
      } else {
        const link = document.createElement("link");
        link.id = "dynamic-body-font";
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    }

    if (mode === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [theme, mode]);

  return null;
}
