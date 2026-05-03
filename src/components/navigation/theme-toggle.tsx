import type { FC } from "react";
import { Switch, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

/**
 * Mantine-driven dark/light mode toggle; reads + writes the global color scheme.
 *
 * No props — all state is read from / written to `useMantineColorScheme`
 * directly so callers don't have to thread `isDark` through props.
 * `Record<string, never>` instead of `interface Foo {}` because
 * `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type ThemeToggleProps = Record<string, never>;

export const ThemeToggle: FC<ThemeToggleProps> = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const isDark = computedColorScheme === "dark";

  return (
    <Switch
      checked={isDark}
      onChange={() => setColorScheme(isDark ? "light" : "dark")}
      size="md"
      color="dark.4"
      onLabel={<IconMoonStars size={14} color="var(--mantine-color-gray-1)" />}
      offLabel={<IconSun size={14} color="var(--mantine-color-black)" />}
      aria-label="Toggle light and dark mode"
    />
  );
};
