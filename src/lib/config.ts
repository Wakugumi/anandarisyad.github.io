import config from '../config.json';
import type { ResumeConfig } from '../types/config';
import { 
  validateConfig, 
  getSiteConfig, 
  getPersonalConfig, 
  getExperience, 
  getEducation, 
  getSkills, 
  getProjects, 
  getTheme, 
  getTimeline 
} from '../types/config';

// Validate config at import time
if (!validateConfig(config)) {
  throw new Error('Invalid configuration format. Please check your config.json against the schema.');
}

const typedConfig = config as ResumeConfig;

export default typedConfig;

// Re-export helper functions with typed config
export const getSite = () => getSiteConfig(typedConfig);
export const getPersonal = () => getPersonalConfig(typedConfig);
export const getWorkExperience = () => getExperience(typedConfig);
export const getEducationHistory = () => getEducation(typedConfig);
export const getAllSkills = () => getSkills(typedConfig);
export const getPortfolioProjects = () => getProjects(typedConfig);
export const getThemeConfig = () => getTheme(typedConfig);
export const getTimelineData = () => getTimeline(typedConfig);