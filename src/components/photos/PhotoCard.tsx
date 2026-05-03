import type { FC } from "react";

/** Single avatar character, shape returned by `api.sampleapis.com/avatar/characters`. */
export interface Character {
  /** Stable id from the API; used as React key. */
  id: number;
  /** Character display name; shown in the hover overlay and used as `alt` text. */
  name: string;
  /** Image URL. May include a cache-busting query suffix that `trimUrl` strips. */
  image: string;
}

/** Strip any cache-busting suffix the API appends after the `.png` extension. */
const trimUrl = (url: string): string => url.replace(/(\.png).*$/, "$1");

/** Hover-revealing card for one avatar character. */
export interface PhotoCardProps {
  /** Single character to render — the card owns its own URL trimming + hover overlay. */
  character: Character;
}

export const PhotoCard: FC<PhotoCardProps> = ({ character }) => (
  <div className="relative border-solid border border-cyan-500">
    <img
      src={trimUrl(character.image)}
      alt={character.name}
      className="w-[500px] h-[auto] "
    />
    <div className="absolute top-0 opacity-0 hover:opacity-100 hover:cursor-pointer w-full h-full">
      {character.name}
    </div>
  </div>
);
