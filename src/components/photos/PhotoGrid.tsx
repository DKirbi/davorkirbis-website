import type { FC } from "react";
import { PhotoCard } from "@/components/photos/PhotoCard";
import type { Character } from "@/components/photos/PhotoCard";

/** Wrapping grid of `PhotoCard`s. */
export interface PhotoGridProps {
  /** List of characters to render; read-only because rendering does not mutate it. */
  items: ReadonlyArray<Character>;
}

export const PhotoGrid: FC<PhotoGridProps> = ({ items }) => (
  <div className="flex flex-wrap relative">
    {items.map((character) => (
      <PhotoCard key={character.id} character={character} />
    ))}
  </div>
);
