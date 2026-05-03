import type { FC } from "react";
import { useEffect, useState } from "react";
import { PhotoGrid } from "@/components/photos/PhotoGrid";
import type { Character } from "@/components/photos/PhotoCard";

/**
 * Data-fetching shell for the avatar characters list.
 *
 * No props yet — the component is consumed in exactly one place (`/photos`).
 * Promote the endpoint and an `onError` callback to props the moment a
 * second caller appears. `Record<string, never>` instead of `interface
 * Foo {}` because `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type GetPhotosProps = Record<string, never>;

const CHARACTERS_ENDPOINT = "https://api.sampleapis.com/avatar/characters";

export const GetPhotos: FC<GetPhotosProps> = () => {
  const [data, setData] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch the character list once on mount. Success and error are kept in
  // separate slots so a string can never end up in the typed `Character[]`.
  // No explicit `loading` state — the empty-array branch + the error branch
  // are sufficient for the current UX (a brief blank flash before the grid).
  // The `cancelled` flag prevents `setData`/`setError` after unmount, which
  // matters under StrictMode's double-invoke in development.
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const response = await fetch(CHARACTERS_ENDPOINT);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const json: Character[] = await response.json();
        if (!cancelled) setData(json);
      } catch (err: unknown) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return <p className="p-4 text-sm text-red-500">Failed to load photos: {error}</p>;
  }

  if (data.length === 0) {
    return null;
  }

  return <PhotoGrid items={data} />;
};
