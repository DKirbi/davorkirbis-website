import type { FC } from "react";
import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

/**
 * Outlined Mantine button that downloads the static CV PDF.
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
      className="self-center"
      fullWidth={false}
      variant="outline"
      rightSection={<IconDownload size={14} />}
      component="a"
      href="/CV_DavorK.pdf"
      download="CV_DavorK.pdf"
    >
      {t("aboutMe.downloadResume")} <span className="text-sm"> {t("aboutMe.fileSize")}</span>
    </Button>
  );
};
