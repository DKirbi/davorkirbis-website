import type { FC } from "react";
import { GetPhotos } from "@/components/getPhotos";

/**
 * Photos route — renders the avatar character grid.
 *
 * No props — route shell exists so the router can mount `<GetPhotos />` at
 * `/photos`. Kept separate from `GetPhotos` so future route-level concerns
 * (loaders, layout) don't bleed into the data shell. `Record<string, never>`
 * instead of `interface Foo {}` because `@typescript-eslint/no-empty-object-type`
 * flags the latter.
 */
export type PhotosProps = Record<string, never>;

export const Photos: FC<PhotosProps> = () => <GetPhotos />;
