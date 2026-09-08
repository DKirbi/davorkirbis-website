import type { FC } from "react";
import { WorkPlaceholder } from "@/components/work/WorkPlaceholder";

/**
 * Work route — currently a WIP placeholder until case studies ship.
 *
 * No props — route shell exists so the router can mount the page at `/work`.
 * Kept separate from `WorkPlaceholder` so future route-level concerns
 * (loaders, layout) don't bleed into the placeholder. `Record<string, never>`
 * instead of `interface Foo {}` because `@typescript-eslint/no-empty-object-type`
 * flags the latter.
 */
export type WorkProps = Record<string, never>;

export const Work: FC<WorkProps> = () => <WorkPlaceholder />;
