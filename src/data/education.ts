import type { CvPillKey } from "@/data/experience";

export type EducationItem = {
  id: string;
  technologies?: CvPillKey[];
};

export const education: EducationItem[] = [
  {
    id: "fhJoanneum",
    technologies: [
      "arduino",
      "nodeJs",
      "d3js",
      "javascript",
      "maxMsp",
      "interactionDesign",
      "userResearch",
      "dataVisualization",
    ],
  },
  {
    id: "feriMaribor",
    technologies: [
      "graphicDesign",
      "printDesign",
      "visualCommunication",
      "photography",
    ],
  },
];