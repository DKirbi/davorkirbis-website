import type { FC, PropsWithChildren } from "react";
import { Divider, MantineColor } from "@mantine/core";

/** Heading + colored divider + content slot used to compose CV columns. */
export interface CvSectionProps {
  /** Localized heading rendered above the divider. */
  title: string;
  /** Mantine color of the section's underline divider; used to color-code Experience (cyan) vs Education (blue). */
  dividerColor: MantineColor;
}

export const CvSection: FC<PropsWithChildren<CvSectionProps>> = ({
  title,
  dividerColor,
  children,
}) => (
  <div>
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <Divider color={dividerColor} my="sm" size="md" />
    {children}
  </div>
);
