import { Experience, Education, SkillCategory, Achievement } from './types';

export const PERSONAL_INFO = {
  name: "Hariprasad C",
  role: "Software Developer",
  contact: {
    phone: "+91 7907922845",
    email: "haripc525@gmail.com",
    linkedin: "hc-sharp",
    github: "hc-codes",
    leetcode: "LeetCode"
  },
  summary: "Experienced Software Developer specializing in C# .NET with expertise in REST API development and system design in the Mobile Device Management industry. Seeking a challenging role in a dynamic technical organization to tackle complex challenges and deliver impactful, innovative solutions."
};

export const SKILLS: SkillCategory[] = [
  {
    category: "Back End",
    items: [".NET Framework", ".NET Core", "C#", "Linq", "REST APIs", "SQL Server", "Entity Framework", "Unit Testing (BDD)"]
  },
  {
    category: "Front End",
    items: ["WPF", "Angular", "TypeScript", "HTML", "CSS", "Dark Mode Integration"]
  },
  {
    category: "Tools & Misc",
    items: ["Python", "Java", "GIT", "Jenkins", "Jira", "System Design", "Agile", "WiX Toolset"]
  }
];

export const EXPERIENCE: Experience[] = [
  {
    company: "SOTI",
    role: "Software Developer 1",
    period: "2022 - Present",
    description: [
      "Served as Epic Owner for 4 Epics, ensuring adherence to industry standard architecture and security guidelines, which enhanced project efficiency.",
      "Designed and implemented 25+ REST APIs utilizing .NET Framework, .NET Core and C#, showcasing strong expertise in full-stack development.",
      "Built highly scalable MDM solutions capable of handling over 50,000+ devices concurrently, exceeding client expectations and paving the way for market expansion to large enterprises like Walmart.",
      "Implemented asynchronous and parallel programming techniques reducing installation time by 30% and enhancing overall efficiency.",
      "Crafted and deployed an installer using WPF and the WiX Toolset, replacing the legacy installer for SOTI’s flagship product.",
      "Developed a Linux lock action for the admin console, enabling admins to securely lock devices remotely.",
      "Reduced bugs by 30% by creating testable code along with automated unit tests and BDD scenarios.",
      "Conducted over 150+ code reviews, ensuring code quality and facilitating knowledge sharing."
    ]
  },
  {
    company: "Quest Global",
    role: "Graduate Engineer Trainee",
    period: "2021 - 2022",
    description: [
      "Gained hands-on experience working on Philips X-ray machines, understanding medical imaging technology and its software requirements.",
      "Completed specialized training in C# and WPF, enhancing skills in developing both UI and backend functionalities."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    institution: "Jyothi Engineering College",
    degree: "B.Tech in Computer Science & Engineering",
    period: "2017 - 2021",
    grade: "8.43 CGPA"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Top Performer",
    description: "Rank #1 in a team of 21 developers as per the last Performance review and was promoted as SDE 1."
  },
  {
    title: "High Productivity",
    description: "Delivered highest story points with minimal bugs logged in 23-24."
  },
  {
    title: "Codex Winner",
    description: "Won second prize in coding competition hosted by Vidya Academy of Science & Technology."
  },
  {
    title: "Hackathon Participant",
    description: "Reboot Kerala Hackathon: Certificate of participation on the topic Disaster Management."
  }
];
