import { useState, useEffect } from "react";

export function useTheme() {
  const [mode, setMode] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("theme-mode");
    if (saved === "dark" || saved === "light") return saved;
    return "dark"; // default to dark
  });

  const toggle = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
    // Dispatch event to notify other instances
    window.dispatchEvent(new CustomEvent("theme-mode-changed", { detail: newMode }));
  };

  useEffect(() => {
    const handleChanged = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === "dark" || detail === "light") {
        setMode(detail);
      }
    };
    window.addEventListener("theme-mode-changed", handleChanged);
    return () => window.removeEventListener("theme-mode-changed", handleChanged);
  }, []);

  return { mode, toggle, setMode: (newMode: "dark" | "light") => {
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
    window.dispatchEvent(new CustomEvent("theme-mode-changed", { detail: newMode }));
  }};
}
