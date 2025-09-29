// Auto-generated TypeScript types from JSON Schema
// This file provides type safety for your config.json

export interface ResumeConfig {
  $schema?: string;
  site: SiteConfig;
  personal: PersonalConfig;
  experience?: ExperienceItem[];
  education?: EducationItem[];
  skills?: SkillsConfig;
  projects?: ProjectItem[];
  theme?: ThemeConfig;
  timeline?: TimelineItem[];
  links?: { label: string; url: string; icon:string }[];
}

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface PersonalConfig {
  name: string;
  title: string;
  summary?: string;
  avatar?: string;
  location?: string;
}

export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  startFrom?: string;
  endAt?: string;
  location?: string;
  description?: string[];
  status?: 'completed' | 'current' | 'upcoming';
  skills?: SkillBadge[];
  links?: { label: string; url: string }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  location?: string;
  gpa?: string;
  logo?:string;
  description?: string;
}

export interface SkillsConfig {
  languages?: string[];
  frameworks?: string[];
  tools?: string[];
  databases?: string[];
  [key: string]: string[] | undefined;
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies?: {
    title: string;
    icon?: string;
    iconType?: 'emoji' | 'text' | 'svg' | 'image' | 'heroicon' | 'class';
  }[];
  link?: string | "#"
  demo?: string;
  image?: string | 'projects/default.jpg';
  status?: 'completed' | 'in-progress' | 'planned';
  date?:string | Date;
}

export interface TimelineItem {
  id?: string;
  date: string;
  title: string;
  description?: string;
  status?: 'completed' | 'current' | 'upcoming';
  icon?: string;
  color?: string;
}

export interface SkillBadge {
  title: string;
  icon?: string;
  iconType?: 'emoji' | 'text' | 'svg' | 'image' | 'heroicon' | 'class';
  iconPosition?: 'left' | 'right';
  color?: 'emerald' | 'amber' | 'red' | 'blue' | 'gray' | 'purple' | 'indigo';
  variant?: 'filled' | 'outlined' | 'soft';
  href?: string;
}

export interface ColorScheme {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  text?: string;
}

export interface FontScheme {
  heading?: string;
  body?: string;
  mono?: string;
}

export interface ThemeConfig {
  colors?: ColorScheme;
  fonts?: FontScheme;
}

// Validation function
export function validateConfig(config: any): config is ResumeConfig {
  // Basic validation - you can add more comprehensive validation here
  if (!config || typeof config !== 'object') return false;
  if (!config.site || !config.personal) return false;
  if (!config.site.title || !config.site.description || !config.site.author) return false;
  if (!config.personal.name || !config.personal.title) return false;
  
  return true;
}

// Helper functions for type-safe access
export function getSiteConfig(config: ResumeConfig): SiteConfig {
  return config.site;
}

export function getPersonalConfig(config: ResumeConfig): PersonalConfig {
  return config.personal;
}

export function getExperience(config: ResumeConfig): ExperienceItem[] {
  return config.experience || [];
}

export function getEducation(config: ResumeConfig): EducationItem[] {
  return config.education || [];
}

export function getSkills(config: ResumeConfig): SkillsConfig {
  return config.skills || {};
}

export function getProjects(config: ResumeConfig): ProjectItem[] {
  return config.projects || [];
}

export function getTheme(config: ResumeConfig): ThemeConfig {
  return config.theme || {};
}

export function getTimeline(config: ResumeConfig): TimelineItem[] {
  return config.timeline || [];
}