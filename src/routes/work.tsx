import type { FC } from "react";
import { Outlet } from "react-router-dom";

/**
 * Work layout at `/:lang/work`. Child routes (SketchFlow embed, later projects)
 * render through the outlet. Index redirects to `SketchFlowAI`.
 *
 * `Record<string, never>` instead of `interface Foo {}` because
 * `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type WorkProps = Record<string, never>;

export const Work: FC<WorkProps> = () => <Outlet />;
