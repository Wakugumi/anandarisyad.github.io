import config from '../config.json';
import type { ResumeConfig } from '../types/config';
import { validateConfig } from '../types/config';

// Validate config at import time
if (!validateConfig(config)) {
  throw new Error('Invalid configuration format. Please check your config.json against the schema.');
}

export default config as ResumeConfig;
    website: string;
    linkedin: string;
    github: string;
  };
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    startFrom: string;
    endAt: string | 'Present';
    location: string;
    description: string[];
    skills: Array<{
      title: string;
      icon?: string;
      iconType?: 'class' | 'text' | 'emoji' | 'image' | 'svg' | 'heroicon';
      iconPosition?: 'left' | 'right';
    }>;
    status?: 'completed' | 'current' | 'upcoming';
    icon?: string;
    color?: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    duration: string;
    location: string;
    gpa?: string;
  }>;
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    databases: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    github: string;
    demo?: string;
  }>;
  theme: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
  };
}

// Helper functions for easy access
export const getSiteConfig = () => config.site;
export const getPersonalInfo = () => config.personal;
export const getExperience = () => config.experience;
export const getEducation = () => config.education;
export const getSkills = () => config.skills;
export const getProjects = () => config.projects;
export const getTheme = () => config.theme;