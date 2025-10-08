"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import clsx from "clsx";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Theme toggle"
      >
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={clsx(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "hover:bg-secondary hover:text-secondary-foreground"
      )}
      aria-label={isDark ? "Light theme" : "Dark theme"}
    >
      <Sun className={clsx("h-4 w-4 transition-all", isDark && "rotate-90 scale-0")} />
      <Moon className={clsx("absolute h-4 w-4 transition-all", !isDark && "-rotate-90 scale-0")} />
    </button>
  );
}
