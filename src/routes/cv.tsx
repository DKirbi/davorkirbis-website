import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { EducationTimeline } from "@/components/EducationTimeline";
import { Divider } from "@mantine/core";

export const CV = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-40 pt-16">
      <div>
        <h2 className="text-lg font-semibold mb-2">Experience</h2>
        <Divider color="cyan" my="sm" size={"md"}/>
        <ExperienceTimeline />
      </div>
      <div>
        <h2 className="text-lg font-semibold  mb-2">Education</h2>
        <Divider color="blue" my="sm" size={"md"}/>
        <EducationTimeline />
      </div>
    </div>
  );
};
