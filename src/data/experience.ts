export type CvPillKey =
  | "react"
  | "reactJs"
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
  | "ux"
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
  | "guiManual"
  | "kotlin"
  | "quarkus"
  | "vite"
  | "shadcn"
  | "tailwindCss"
  | "rapidAgenticDevelopment";

export type ExperienceItem = {
  id: string;
  technologies: CvPillKey[];
  /** Optional public project shown as a GitHub icon + label under the description. */
  projectLink?: {
    /** Absolute URL opened in a new tab. */
    href: string;
  };
};

export const experience: ExperienceItem[] = [
  {
    id: "sportradar",
    projectLink: { href: "https://github.com/DKirbi/SketchFlow-AI" },
    technologies: [
      "reactJs",
      "kotlin",
      "quarkus",
      "vite",
      "shadcn",
      "tailwindCss",
      "ux",
      "designSystems",
      "rapidAgenticDevelopment",
    ],
  },
  {
    id: "sportradarUx",
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
