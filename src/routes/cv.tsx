import { useState } from "react";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { EducationTimeline } from "@/components/EducationTimeline";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const CV = () => {
  const [view, setView] = useState("experience");

  return (
    <div>
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[1000]">
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(value) => {
            if (value) setView(value);
          }}
          variant="outline"
        >
          <ToggleGroupItem value="experience">Experience</ToggleGroupItem>
          <ToggleGroupItem value="education">Education</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {view === "experience" ? <ExperienceTimeline /> : <EducationTimeline />}
    </div>
  );
};
