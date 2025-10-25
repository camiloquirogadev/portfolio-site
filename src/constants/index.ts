import type { PersonalInfo } from '../types';

export const personalInfo: PersonalInfo = {
  name: "Camilo Quiroga",
  roleEs: "Desarrollador Full Stack ",
  roleEn: "Full Stack  Developer",
  email: "quirogacamilodev@gmail.com",
  github: "https://github.com/camiloquirogadev",
  linkedin: "https://www.linkedin.com/in/camilo-quiroga-dev/",
  descriptionEs: "Soy Camilo Quiroga, desarrollador web y estudiante de programacion en la UTN San Nicolas. Me dedico a crear sitios y aplicaciones web para profesionales, emprendimientos y pequeñas empresas, trabajando con React, Node.js, Python, WordPress y Shopify segun lo que necesite cada proyecto. Estoy en formacion constante en desarrollo full stack, bases de datos, .NET y ciencia de datos.Apunto a soluciones rapidas, claras y faciles de mantener, con foco en el negocio y en una buena experiencia para el usuario. Este portafolio muestra mi trabajo real: proyectos funcionales, escalables y pensados para crecer sin complicaciones.",
  descriptionEn: "I'm Camilo Quiroga, a web developer and programming student at UTN San Nicolás (Argentina). I build websites and web applications for professionals, startups, and small businesses, working with React, Node.js, Python, WordPress and Shopify depending on each project's needs. I'm continuously learning full‑stack development, databases, .NET and data science. I aim for fast, clear and maintainable solutions, focused on business goals and great user experience. This portfolio shows my real work: functional, scalable projects designed to grow without friction."
} as const;

export const translations = {
  es: {
    contact: 'Contactame',
    downloadCV: 'Descargar CV',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    experience: 'Trayectoria profesional',
    projects: 'Proyectos',
    about: 'Sobre mí',
    translateAria: 'Cambiar idioma a inglés',
    langBadge: 'ES',
    backToTop: 'Volver arriba',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Oscuro',
    system: 'Sistema',
    themeMenu: 'Abrir selector de tema',
    techUsed: 'Tecnologías Utilizadas',
    viewProject: 'Ver Proyecto',
    viewCode: 'Ver Código',
    prev: 'Ver proyectos anteriores',
    next: 'Ver más proyectos',
    close: 'Cerrar',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    interested: '¿Te interesa colaborar?',
    tellMe: 'Cuéntame sobre tu proyecto y evaluemos cómo puedo contribuir.',
    seeProjects: 'Ver proyectos'
  },
  en: {
    contact: 'Contact',
    downloadCV: 'Download CV',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    experience: 'Professional highlights',
    projects: 'Projects',
    about: 'About me',
    translateAria: 'Switch language to Spanish',
    langBadge: 'EN',
    backToTop: 'Back to top',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    themeMenu: 'Open theme menu',
    techUsed: 'Technologies Used',
    viewProject: 'View Project',
    viewCode: 'View Code',
    prev: 'See previous projects',
    next: 'See more projects',
    close: 'Close',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    interested: 'Interested in collaborating?',
    tellMe: "Tell me about your project and let's assess how I can contribute.",
    seeProjects: 'See projects'
  }
} as const;

// Helper function to generate mailto links with pre-filled subject and body
export const createMailtoLink = (lang: 'es' | 'en' = 'es') => {
  const subject = lang === 'es' ? 'Consulta desde portfolio' : 'Inquiry from portfolio';
  const body = lang === 'es'
    ? 'Hola Camilo,\n\nMe gustaría contactarte para hablar sobre un proyecto.\n\nSaludos,'
    : 'Hi Camilo,\n\nI would like to contact you to discuss a project.\n\nBest regards,';

  return `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};