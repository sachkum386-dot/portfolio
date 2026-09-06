import { StaticImageData } from "next/image";

export interface PersonalInfo {
  name: string;
  title: string;
  role: string;
  profileImage: StaticImageData;
  email: string;
  phone: string;
  location: string;
  resumeLink: string;
  githubLink: string;
  linkedinLink: string;
  twitterLink: string;
  facebookLink: string;
  instagramLink: string;
  aboutMe: string;
  yearsOfExperience: number;
}

export type SkillCategory = "Frontend" | "Backend" | "Database" | "DevOps" | "Cloud";

export type SkillLevels = "Expert" | "Proficient" | "Intermediate" | "Beginner" | "Familiar";

export type SkillBadges = "College" | "Familiar";

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: string;
  level: SkillLevels;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  technologies: string[];
  responsibilities: string[];
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  duration: string;
  details: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  featured: boolean;
  shortDescription: string;
  overview: string;
  role: string;
  teamSize: string;
  duration: string;
  businessProblem: string;
  solution: string;
  techStack: string[];
  keyStack?: string[];
  features: string[];
  architecture: string[];
  projectFlow: string[];
  databaseDesign: string[];
  apiFlow: string[];
  challenges: string[];
  learnings: string[];
  thumbnail: StaticImageData;
  images: StaticImageData[];
  liveLink: string;
  githubLink: string;
  tags: string[];
  badges? : SkillBadges;
}
