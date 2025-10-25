export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  github: string;
  titleEn?: string;
  descriptionEn?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';
export type Language = 'es' | 'en';

export interface PersonalInfo {
  name: string;
  roleEs: string;
  roleEn: string;
  email: string;
  github: string;
  linkedin: string;
  descriptionEs: string;
  descriptionEn: string;
}