export type Education = {
    id: string
    school: string
    degree: string
    period: {
      start: string
      end: string
    }
    highlight: string
    description: string
    technologies?: string[]
  }
  
  export const education: Education[] = [
    {
      id: "fh-joanneum",
      school: "FH Joanneum Graz",
      degree: "Master of Arts in Interaction Design",
      period: {
        start: "Oct 2014",
        end: "Aug 2016"
      },
      highlight:
        "Focused on practical UX design projects combining programming, visualization, and interaction design.",
      description: `
  Worked on many practical projects using Arduino microcontrollers and graphical programming applications such as Max/MSP and Processing.
  
  Contributed as a UX/UI Designer to Pocket Code, a coding-for-kids application version for Windows Phone.
  
  Created a nutritional visualization mobile prototype application and experimented with Node.js and D3.js to build an industrial weight scale capable of displaying nutritional graphs of fruits and vegetables.
  
  Learned user experience design through various real-world projects and used programming and visual programming tools to create small interactive prototypes.
  `,
      technologies: [
        "Arduino",
        "Node.js",
        "D3.js",
        "Javascript",
        "Max/MSP",
        "Interaction design",
        "UX Research",
        "Data Visualization"
      ]
    },
  
    {
      id: "feri-maribor",
      school: "FERI Maribor",
      degree: "Bachelor of Arts in Visual Communication",
      period: {
        start: "Oct 2008",
        end: "Aug 2013"
      },
      highlight:
        "Studied media sciences with focus on visual communication and graphic design.",
      description: `
  Studied media sciences with a focus on visual communication and design.
  
  Worked as the main graphic designer for a student magazine and as a main graphic designer and photographer for University of Maribor campaigns.
  
  Did student work as a graphic design intern in an advertising agency.
  `,
      technologies: [
        "Graphic Design",
        "Desktop to Print",
        "Print Design",
        "Visual Communication",
        "Photography"
      ]
    }
  ]