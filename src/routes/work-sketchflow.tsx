import type { FC } from "react";
import { WorkShowcaseFrame } from "@/components/work/WorkShowcaseFrame";

/**
 * Work child route — full-viewport SketchFlow embed at `/work/SketchFlowAI`.
 *
 * No props — route shell exists so the router can mount the iframe without
 * bloating the Work layout. `Record<string, never>` instead of
 * `interface Foo {}` because `@typescript-eslint/no-empty-object-type` flags
 * the latter.
 */
export type WorkSketchFlowProps = Record<string, never>;

export const WorkSketchFlow: FC<WorkSketchFlowProps> = () => <WorkShowcaseFrame />;
