import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { IconDownload } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

/**
 * Outlined button that downloads the static CV PDF.
 *
 * No props — the file lives at `/CV_DavorK.pdf` (served from `public/`) and
 * label / file-size strings come from i18n. `Record<string, never>` instead
 * of `interface Foo {}` because `@typescript-eslint/no-empty-object-type`
 * flags the latter.
 */
export type DownloadResumeButtonProps = Record<string, never>;

export const DownloadResumeButton: FC<DownloadResumeButtonProps> = () => {
  const { t } = useTranslation();

  return (
    <Button
      asChild
      variant="outline"
      className="self-center border-primary text-primary hover:bg-primary/10 hover:text-primary"
    >
      <a href="/CV_DavorK.pdf" download="CV_DavorK.pdf">
        {t("aboutMe.downloadResume")} <span className="text-sm"> {t("aboutMe.fileSize")}</span>
        <IconDownload size={14} />
      </a>
    </Button>
  );
};
