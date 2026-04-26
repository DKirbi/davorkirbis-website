import { EducationTimeline } from "@/components/EducationTimeline";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Divider } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const CV = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 w-11/12 mx-auto md:grid-cols-2 gap-40 pt-16">
      <div>
        <h2 className="text-lg font-semibold mb-2">{t("cv.experience")}</h2>
        <Divider color="cyan" my="sm" size={"md"} />
        <ExperienceTimeline />
      </div>
      <div>
        <h2 className="text-lg font-semibold  mb-2">{t("cv.education")}</h2>
        <Divider color="blue" my="sm" size={"md"} />
        <EducationTimeline />
      </div>
    </div>
  );
};
