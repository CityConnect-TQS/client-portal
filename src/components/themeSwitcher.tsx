"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { MaterialSymbol } from "react-material-symbols";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  if (!mounted) return null;

  let iconComponent;
  if (theme === "light") {
    iconComponent = <MaterialSymbol icon="light_mode" size={20} />;
  } else if (theme === "dark") {
    iconComponent = <MaterialSymbol icon="dark_mode" size={20} />;
  } else {
    iconComponent = <MaterialSymbol icon="night_sight_auto" size={20} />;
  }

  return (
    <div>
      <Button
        isIconOnly
        variant="ghost"
        className="border-none"
        onClick={switchTheme}
        onPress={switchTheme}
      >
        {iconComponent}
      </Button>
    </div>
  );
}
