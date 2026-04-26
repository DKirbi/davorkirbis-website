export type CvPillKey =
  | "react"
  | "typescript"
  | "javascript"
  | "nodeJs"
  | "vueJs"
  | "nuxtJs"
  | "compositionApi"
  | "html"
  | "css"
  | "scss"
  | "bootstrap"
  | "accessibility"
  | "responsiveDesign"
  | "seo"
  | "designSystems"
  | "designTokens"
  | "figma"
  | "storybook"
  | "mantine"
  | "zeplin"
  | "uxDesign"
  | "uiDesign"
  | "interactionDesign"
  | "userResearch"
  | "prototyping"
  | "dataVisualization"
  | "d3js"
  | "graphicDesign"
  | "iconDesign"
  | "visualCommunication"
  | "printDesign"
  | "photography"
  | "illustrator"
  | "wordpress"
  | "php"
  | "hubspotCms"
  | "jquery"
  | "arduino"
  | "maxMsp"
  | "guiManual";

export type ExperienceItem = {
  id: string;
  technologies: CvPillKey[];
};

export const experience: ExperienceItem[] = [
  {
    id: "sportradar",
    technologies: [
      "react",
      "typescript",
      "accessibility",
      "mantine",
      "storybook",
      "scss",
      "designTokens",
      "figma",
      "designSystems",
      "userResearch",
      "uxDesign",
      "prototyping",
    ],
  },
  {
    id: "chiliDigital",
    technologies: ["hubspotCms", "javascript", "html", "scss", "seo"],
  },
  {
    id: "kalmia",
    technologies: ["vueJs", "nuxtJs", "compositionApi", "scss", "responsiveDesign"],
  },
  {
    id: "cosylab",
    technologies: ["react", "bootstrap", "figma", "zeplin", "prototyping"],
  },
  {
    id: "comtradeGaming",
    technologies: ["figma", "uxDesign", "prototyping"],
  },
  {
    id: "hycu",
    technologies: ["figma", "zeplin", "interactionDesign"],
  },
  {
    id: "comtradeSoftware",
    technologies: ["jquery", "bootstrap", "scss", "illustrator", "prototyping"],
  },
  {
    id: "bienengesundheit",
    technologies: ["javascript", "css", "html", "wordpress", "php"],
  },
  {
    id: "knapp",
    technologies: ["uiDesign", "iconDesign", "guiManual"],
  },
];
