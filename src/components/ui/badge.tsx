import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        outline:
          "text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        /** Static skill chip: accent border/text, not clickable. */
        skill: "pointer-events-none select-text border-primary bg-transparent text-primary shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/** Props for the shared shadcn badge primitive. */
export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <div className={cn(badgeVariants({ variant }), className)} {...props} />
);

export { badgeVariants };
