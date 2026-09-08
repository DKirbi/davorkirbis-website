import type { FC } from "react";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { Switch } from "@/components/ui/switch";
import { useColorScheme } from "@/lib/color-scheme";
import { cn } from "@/lib/utils";

/**
 * Dark/light mode toggle; reads + writes the global color scheme.
 *
 * State is read from / written to `useColorScheme` so callers don't have to
 * thread `isDark` through props.
 */
export interface ThemeToggleProps {
  /**
   * Track size. `"md"` for the desktop top-bar (default); the mobile overlay
   * passes `"xl"` so the touch target visibly matches the 55px flag buttons.
   */
  size?: "md" | "xl";
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ size = "md" }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const isXl = size === "xl";
  const iconSize = isXl ? 20 : 14;

  return (
    <div className="relative inline-flex items-center">
      <Switch
        checked={isDark}
        onCheckedChange={() => toggleColorScheme()}
        aria-label="Toggle light and dark mode"
        size={isXl ? "lg" : "default"}
      />
      {/* Moon on the left, sun on the right. The thumb covers the unused icon. */}
      <span
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-between",
          isXl ? "px-2" : "px-1.5",
        )}
        aria-hidden
      >
        <IconMoonStars
          size={iconSize}
          className={cn(
            "transition-opacity",
            isDark ? "text-primary-foreground opacity-100" : "opacity-0",
          )}
        />
        <IconSun
          size={iconSize}
          className={cn("transition-opacity", isDark ? "opacity-0" : "text-foreground opacity-100")}
        />
      </span>
    </div>
  );
};
