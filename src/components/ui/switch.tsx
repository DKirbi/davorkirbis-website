import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

/** Props for the shared shadcn switch primitive. */
export interface SwitchProps extends ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  /** `"lg"` enlarges the track for the mobile theme toggle. */
  size?: "default" | "lg";
}

export const Switch = forwardRef<ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, size = "default", ...props }, ref) => {
    const isLg = size === "lg";

    return (
      <SwitchPrimitives.Root
        className={cn(
          "peer inline-flex shrink-0 cursor-pointer items-center rounded-full shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",

          isLg ? "h-7 w-16 p-1" : "h-5 w-12 p-0.5",
          className,
        )}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
            isLg
              ? "h-5 w-5 data-[state=checked]:translate-x-9"
              : "h-4 w-4 data-[state=checked]:translate-x-7",
          )}
        />
      </SwitchPrimitives.Root>
    );
  },
);
Switch.displayName = SwitchPrimitives.Root.displayName;
