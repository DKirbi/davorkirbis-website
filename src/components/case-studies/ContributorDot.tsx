import type { FC } from "react";
import { Tooltip } from "@mantine/core";
import { getCollaboratorColor } from "@/components/case-studies/timeline.utils";

/** Minimal collaborator marker with hover tooltip on the timeline. */
export interface ContributorDotProps {
  /** Display name shown inside the tooltip. */
  author: string;
}

export const ContributorDot: FC<ContributorDotProps> = ({ author }) => (
  <Tooltip label={author} withArrow position="bottom" openDelay={200}>
    <span
      className={`inline-block w-2 h-2 rounded-full shrink-0 ${getCollaboratorColor(author)}`}
      aria-label={author}
    />
  </Tooltip>
);
