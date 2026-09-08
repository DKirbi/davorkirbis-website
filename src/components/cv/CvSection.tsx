import type { FC, PropsWithChildren } from "react";
import { Separator } from "@/components/ui/separator";

/** Heading + colored divider + content slot used to compose CV columns. */
export interface CvSectionProps {
  /** Localized heading rendered above the divider. */
  title: string;
  /** Token class for the section underline (experience vs education). */
  dividerClassName: string;
}

export const CvSection: FC<PropsWithChildren<CvSectionProps>> = ({
  title,
  dividerClassName,
  children,
}) => (
  <div>
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <Separator className={`my-3 ${dividerClassName}`} />
    {children}
  </div>
);
