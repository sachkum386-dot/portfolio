import { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "Frontend", icon: "/language/react.svg", level: "Expert" },
  { name: "Next.js", category: "Frontend", icon: "/language/next-js.svg", level: "Expert" },
  { name: "TypeScript", category: "Frontend", icon: "/language/typescript.svg", level: "Expert" },
  { name: "JavaScript", category: "Frontend", icon: "/language/javascript.svg", level: "Expert" },
  { name: "Tailwind CSS", category: "Frontend", icon: "/language/Tailwind-CSS.svg", level: "Expert" },

  // Backend
  { name: "Node.js", category: "Backend", icon: "/language/node-js.svg", level: "Expert" },
  { name: "Express.js", category: "Backend", icon: "/language/Express.svg", level: "Expert" },
  { name: "Laravel", category: "Backend", icon: "/language/Laravel.svg", level: "Expert" },
  { name: "PHP", category: "Backend", icon: "/language/PHP.svg", level: "Expert" },
  { name: "Spring Boot", category: "Backend", icon: "/language/Spring.svg", level: "Expert" },

  // Database
  { name: "MySQL", category: "Database", icon: "/language/MySQL.svg", level: "Expert" },
  { name: "PostgreSQL", category: "Database", icon: "/language/PostgresSQL.svg", level: "Expert" },
  { name: "MongoDB", category: "Database", icon: "/language/MongoDB.svg", level: "Expert" },

  // DevOps
  { name: "Docker", category: "DevOps", icon: "/language/Docker.svg", level: "Expert" },
  { name: "Kubernetes", category: "DevOps", icon: "/language/Kubernetes.svg", level: "Expert" },
  { name: "Jenkins", category: "DevOps", icon: "/language/Jenkins.svg", level: "Expert" },
  { name: "GitHub Actions", category: "DevOps", icon: "/language/GitHub-Actions.svg", level: "Expert" },

  // Cloud
  { name: "AWS", category: "Cloud", icon: "/language/AWS.svg", level: "Expert" },
  { name: "Hostinger", category: "Cloud", icon: "/language/Hostinger.svg", level: "Expert" },
];

export const filterSkills: string[] = [
  "Next.js", "Typescript", "Laravel", "React.js", "Tailwind CSS"
];
