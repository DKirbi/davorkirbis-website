import type { FC } from "react";
import { Switch, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

/**
 * Mantine-driven dark/light mode toggle; reads + writes the global color scheme.
 *
 * State is read from / written to `useMantineColorScheme` directly so callers
 * don't have to thread `isDark` through props.
 */
export interface ThemeToggleProps {
  /**
   * Mantine `<Switch />` size token. `"md"` for the desktop top-bar (default);
   * the mobile overlay passes `"xl"` so the touch target visibly matches the
   * 55px flag buttons on its own row.
   */
  size?: "md" | "xl";
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ size = "md" }) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const isDark = computedColorScheme === "dark";

  // Scale the inline icons with the track so the sun/moon stays readable at
  // `xl`. Mantine's `<Switch />` doesn't auto-scale `onLabel` / `offLabel`.
  const iconSize = size === "xl" ? 20 : 14;

  return (
    <Switch
      checked={isDark}
      onChange={() => setColorScheme(isDark ? "light" : "dark")}
      size={size}
      color="dark.4"
      onLabel={<IconMoonStars size={iconSize} color="var(--mantine-color-gray-1)" />}
      offLabel={<IconSun size={iconSize} color="var(--mantine-color-black)" />}
      aria-label="Toggle light and dark mode"
    />
  );
};
