"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/switch";
import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
 
    <div
      className="relative w-14 h-8 dark:bg-[#1D1D1D] bg-white rounded-full cursor-pointer flex-row flex items-center justify-between gap-2 p-1"

      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <div
        className={
          theme === "dark"
            ? "absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition"
            : "absolute top-1 right-1 bg-zinc-600 w-6 h-6 rounded-full transition"
        }
      />

      <LuSun size={20} color="#4C4C4C" />
      <LuMoon size={20} color="#4C4C4C" />


    </div>
  );
}
