"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-md border border-card-border bg-card" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      id="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-md border border-card-border bg-card hover:bg-card-muted transition-colors focus:outline-none focus:ring-1 focus:ring-card-accent"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-foreground transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-foreground transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
export default ThemeToggle;
