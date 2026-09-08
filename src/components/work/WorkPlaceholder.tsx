import type { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * Temporary Work route body until the portfolio content ships.
 *
 * No props — copy comes from i18n so the route can stay a thin shell.
 * `Record<string, never>` instead of `interface Foo {}` because
 * `@typescript-eslint/no-empty-object-type` flags the latter.
 */
export type WorkPlaceholderProps = Record<string, never>;

export const WorkPlaceholder: FC<WorkPlaceholderProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 w-11/12 max-w-5xl mx-auto pt-16">
      <h1 className="text-3xl md:text-5xl md:leading-normal leading-relaxed">
        {t("work.title")}
      </h1>
      <p className="text-lg text-muted-foreground">{t("work.placeholder")}</p>
    </div>
  );
};
