import { useState, useCallback, useEffect, useRef } from 'react';
import { Code2, Mail, ExternalLink, Github, Linkedin, Briefcase, GraduationCap, X, ChevronLeft, ChevronRight, ChevronUp, Sun, Moon, Monitor, Languages, Menu } from 'lucide-react';
import { portfolio } from './data/portfolioData';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';

// Define types for our data
interface Project {
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

// Project Modal Component
const ProjectModal = ({ project, onClose, lang, returnFocusTo }: { project: Project | null, onClose: () => void, lang: 'es' | 'en', returnFocusTo?: HTMLElement | null }) => {
  const t = lang === 'es'
    ? { techUsed: 'Tecnologías Utilizadas', viewProject: 'Ver Proyecto', viewCode: 'Ver Código' }
    : { techUsed: 'Technologies Used', viewProject: 'View Project', viewCode: 'View Code' };

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = useCallback(() => {
    onClose();
    // Return focus to the element that opened the modal
    returnFocusTo?.focus?.();
  }, [onClose, returnFocusTo]);

  // Focus management and Escape to close (hook always called; no conditional calls)
  useEffect(() => {
    if (!project) return;
    // Focus close button when modal opens
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [project, handleClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-xl max-w-2xl w-full mx-auto p-8 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          ref={closeBtnRef}
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
        >
          <X className="w-6 h-6" />
        </button>
        
  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{lang === 'en' ? (project.titleEn ?? project.title) : project.title}</h2>
  <p className="text-slate-600 dark:text-slate-400 mb-6">{lang === 'en' ? (project.descriptionEn ?? project.description) : project.description}</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">{t.techUsed}</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            {t.viewProject}
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300 font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            {t.viewCode}
          </a>
        </div>
      </div>
    </div>
  );
};

// Project Carousel Component
const ProjectCarousel = ({ lang }: { lang: 'es' | 'en' }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', containScroll: 'trimSnaps' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [returnFocusTo, setReturnFocusTo] = useState<HTMLElement | null>(null);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const openModal = (project: Project) => {
    setReturnFocusTo(document.activeElement instanceof HTMLElement ? document.activeElement : null);
    setSelectedProject(project);
  };
  const closeModal = () => setSelectedProject(null);

  const labels = lang === 'es'
    ? { prev: 'Ver proyectos anteriores', next: 'Ver más proyectos' }
    : { prev: 'See previous projects', next: 'See more projects' };

  return (
    <>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {portfolio.map((project: Project) => (
              <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] p-3" key={project.id}>
                <div
                  className="bg-white rounded-xl border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700 p-6 flex flex-col h-full hover:border-blue-500/50 transition-all duration-200 cursor-pointer hover-lift animate-scale-in"
                  onClick={() => openModal(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(project); } }}
                >
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={192}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {lang === 'en' ? (project.titleEn ?? project.title) : project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">
                    {lang === 'en' ? (project.descriptionEn ?? project.description) : project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.slice(0, 3).map((tech: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                        ...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="absolute top-1/2 -translate-y-1/2 left-[-1rem] bg-slate-200 hover:bg-slate-300 text-slate-900 dark:bg-slate-700/50 dark:hover:bg-slate-600/80 backdrop-blur-sm rounded-full p-2 disabled:opacity-0 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          type="button"
          aria-label={labels.prev}
        >
          <ChevronLeft className="w-6 h-6 text-slate-900 dark:text-white" aria-hidden="true" />
        </button>
        <button
          className="absolute top-1/2 -translate-y-1/2 right-[-1rem] bg-slate-200 hover:bg-slate-300 text-slate-900 dark:bg-slate-700/50 dark:hover:bg-slate-600/80 backdrop-blur-sm rounded-full p-2 disabled:opacity-0 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          type="button"
          aria-label={labels.next}
        >
          <ChevronRight className="w-6 h-6 text-slate-900 dark:text-white" aria-hidden="true" />
        </button>
      </div>
  <ProjectModal project={selectedProject} onClose={closeModal} lang={lang} returnFocusTo={returnFocusTo} />
    </>
  );
};

// Services section removed/hidden for now per requested structure


function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  type ThemeMode = 'light' | 'dark' | 'system';
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const toggleLang = () => setLang((l) => (l === 'es' ? 'en' : 'es'));

  // Sync <html lang> with current language
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Theme management: 'light' | 'dark' | 'system'
  const applyTheme = useCallback((mode: ThemeMode) => {
    try {
      localStorage.setItem('theme', mode);
  } catch { /* noop */ }
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = mode === 'dark' || (mode === 'system' && mql.matches);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    // Initialize from storage on mount
    try {
      const stored = (localStorage.getItem('theme') as ThemeMode) || 'system';
      setThemeMode(stored);
      applyTheme(stored);
    } catch {
      setThemeMode('system');
      applyTheme('system');
    }
    // React to system changes when in 'system'
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      const stored = (localStorage.getItem('theme') as ThemeMode) || 'system';
      if (stored === 'system') applyTheme('system');
    };
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    } else {
      const legacyMql = mql as MediaQueryList & {
        addListener?: (listener: (ev: MediaQueryListEvent) => void) => void;
        removeListener?: (listener: (ev: MediaQueryListEvent) => void) => void;
      };
      if (typeof legacyMql.addListener === 'function') {
        legacyMql.addListener(onChange as (ev: MediaQueryListEvent) => void);
        return () => legacyMql.removeListener?.(onChange as (ev: MediaQueryListEvent) => void);
      }
    }
    return () => {};
  }, [applyTheme]);

  const setTheme = (mode: ThemeMode) => {
    applyTheme(mode);
    setThemeMode(mode);
    setThemeMenuOpen(false);
  };

  // Show back-to-top after scrolling down a bit
  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu UX: close on Escape and lock body scroll while open
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const personalInfo = {
    name: "Camilo Quiroga",
    roleEs: "Desarrollador Full Stack ",
    roleEn: "Full Stack  Developer",
    email: "quirogacamilodev@gmail.com",
    github: "https://github.com/camiloquirogadev",
    linkedin: "https://www.linkedin.com/in/camilo-quiroga-dev/",
    descriptionEs: "Soy Camilo Quiroga, desarrollador web y estudiante de programacion en la UTN San Nicolas. Me dedico a crear sitios y aplicaciones web para profesionales, emprendimientos y pequeñas empresas, trabajando con React, Node.js, Python, WordPress y Shopify segun lo que necesite cada proyecto. Estoy en formacion constante en desarrollo full stack, bases de datos, .NET y ciencia de datos.Apunto a soluciones rapidas, claras y faciles de mantener, con foco en el negocio y en una buena experiencia para el usuario. Este portafolio muestra mi trabajo real: proyectos funcionales, escalables y pensados para crecer sin complicaciones.",
    descriptionEn: "I'm Camilo Quiroga, a web developer and programming student at UTN San Nicolás (Argentina). I build websites and web applications for professionals, startups, and small businesses, working with React, Node.js, Python, WordPress and Shopify depending on each project's needs. I'm continuously learning full‑stack development, databases, .NET and data science. I aim for fast, clear and maintainable solutions, focused on business goals and great user experience. This portfolio shows my real work: functional, scalable projects designed to grow without friction."
  } as const;

  const t = (lang === 'es') ? {
    contact: 'Contactame', downloadCV: 'Descargar CV', github: 'GitHub', linkedin: 'LinkedIn',
    experience: 'Trayectoria profesional', projects: 'Proyectos', about: 'Sobre mí',
    translateAria: 'Cambiar idioma a inglés', langBadge: 'ES', backToTop: 'Volver arriba',
    theme: 'Tema', light: 'Claro', dark: 'Oscuro', system: 'Sistema', themeMenu: 'Abrir selector de tema'
  } : {
    contact: 'Contact', downloadCV: 'Download CV', github: 'GitHub', linkedin: 'LinkedIn',
    experience: 'Professional highlights', projects: 'Projects', about: 'About me',
    translateAria: 'Switch language to Spanish', langBadge: 'EN', backToTop: 'Back to top',
    theme: 'Theme', light: 'Light', dark: 'Dark', system: 'System', themeMenu: 'Open theme menu'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" id="top">
      {/* Sticky Header / Menu */}
    <header className="sticky top-2 z-50">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="relative flex items-center justify-center gap-4 py-3 md:rounded-xl md:bg-white/80 md:dark:bg-slate-900/70 md:backdrop-blur md:border md:border-slate-200 md:dark:border-slate-800 md:shadow-sm">
            <nav className="hidden md:flex items-center gap-6 text-slate-600 dark:text-slate-300">
              <a href="#experiencia" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:underline underline-offset-4">{t.experience}</a>
              <a href="#proyectos" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:underline underline-offset-4">{t.projects}</a>
              <a href="#sobre-mi" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:underline underline-offset-4">{t.about}</a>
              <a href={`mailto:${personalInfo.email}`} className="hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:underline underline-offset-4">{t.contact}</a>
              {/* Theme menu inside nav */}
              <div className="relative">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={themeMenuOpen}
                  aria-label={t.themeMenu}
                  onClick={() => setThemeMenuOpen(v => !v)}
                  className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {themeMode === 'dark' ? (
                    <Moon className="w-4 h-4" aria-hidden="true" />
                  ) : themeMode === 'light' ? (
                    <Sun className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Monitor className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
                {themeMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-1 min-w-[160px] z-50"
                  >
                    <button onClick={() => setTheme('light')} className="w-full flex items-center gap-2 px-3 py-2 text-slate-200 hover:bg-slate-700 rounded" role="menuitem">
                      <Sun className="w-4 h-4" aria-hidden="true" /> {t.light}
                    </button>
                    <button onClick={() => setTheme('dark')} className="w-full flex items-center gap-2 px-3 py-2 text-slate-200 hover:bg-slate-700 rounded" role="menuitem">
                      <Moon className="w-4 h-4" aria-hidden="true" /> {t.dark}
                    </button>
                    <button onClick={() => setTheme('system')} className="w-full flex items-center gap-2 px-3 py-2 text-slate-200 hover:bg-slate-700 rounded" role="menuitem">
                      <Monitor className="w-4 h-4" aria-hidden="true" /> {t.system}
                    </button>
                  </div>
                )}
              </div>
              {/* Language toggle inside nav */}
              <button
                type="button"
                onClick={toggleLang}
                aria-label={t.translateAria}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors focus-visible:underline underline-offset-4"
              >
                <Languages className="w-4 h-4" aria-hidden="true" /> {t.langBadge}
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm hover:bg-white dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
              aria-label={menuOpen ? (lang === 'es' ? 'Cerrar menú' : 'Close menu') : (lang === 'es' ? 'Abrir menú' : 'Open menu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-40" role="dialog" aria-modal="true" onClick={() => setMenuOpen(false)}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
            <nav
              id="mobile-menu"
              className="absolute left-0 right-0 top-0 pt-20 px-4"
              aria-label={lang === 'es' ? 'Menú móvil' : 'Mobile menu'}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto max-w-6xl rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 shadow-xl p-5">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => { toggleLang(); setMenuOpen(false); }}
                    aria-label={t.translateAria}
                    className="inline-flex items-center gap-2 text-slate-800 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white transition-colors py-2 px-3 rounded-md border border-transparent hover:border-slate-300 dark:hover:border-slate-700"
                  >
                    <Languages className="w-4 h-4" /> {t.langBadge}
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-sm">{t.theme}:</span>
                    <button type="button" className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700 text-white flex items-center justify-center hover:bg-slate-700" aria-label={t.light}
                      onClick={() => { setTheme('light'); setMenuOpen(false); }}>
                      <Sun className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button type="button" className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700 text-white flex items-center justify-center hover:bg-slate-700" aria-label={t.dark}
                      onClick={() => { setTheme('dark'); setMenuOpen(false); }}>
                      <Moon className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button type="button" className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700 text-white flex items-center justify-center hover:bg-slate-700" aria-label={t.system}
                      onClick={() => { setTheme('system'); setMenuOpen(false); }}>
                      <Monitor className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 grid gap-2">
                  <a href="#experiencia" onClick={() => setMenuOpen(false)} className="block w-full px-3 py-3 rounded-lg text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">{t.experience}</a>
                  <a href="#proyectos" onClick={() => setMenuOpen(false)} className="block w-full px-3 py-3 rounded-lg text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">{t.projects}</a>
                  <a href="#sobre-mi" onClick={() => setMenuOpen(false)} className="block w-full px-3 py-3 rounded-lg text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">{t.about}</a>
                  <a href={`mailto:${personalInfo.email}`} onClick={() => setMenuOpen(false)} className="block w-full px-3 py-3 rounded-lg text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">{t.contact}</a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

  <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12" role="main" id="main">
        
        {/* HERO - Professional & Clean */}
  <div className="rounded-xl border p-6 mb-10 hover-lift backdrop-blur-sm will-change-transform motion-safe:animate-slide-up bg-white/80 border-slate-200 dark:bg-slate-800/30 dark:border-slate-700/50">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-600 via-blue-600 to-slate-800 flex items-center justify-center shadow-xl border-4 border-white/10 mx-auto mb-4 animate-scale-in hover-lift rounded-2xl">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">CQ</div>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
                {personalInfo.name}
              </h1>
              <p className="text-xl text-blue-400 font-medium mb-4">
                {lang === 'es' ? personalInfo.roleEs : personalInfo.roleEn}
              </p>
                {lang === 'en' && (
                  <p className="text-slate-600 dark:text-slate-300 text-base mb-4 max-w-2xl mx-auto leading-relaxed">
                    Programming student at UTN and Full Stack web developer from Argentina. Specialized in React, Node.js, and Python, creating clear, fast, and scalable web applications.
                  </p>
                )}
              {lang === 'es' && (
                <p className="text-slate-600 dark:text-slate-300 text-base mb-4 max-w-2xl mx-auto leading-relaxed">
                  Estudiante de Programación en UTN y desarrollador web Full Stack de Argentina. Especializado en React, Node.js y Python, creando aplicaciones web claras, rápidas y escalables.
                </p>
              )}
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto mb-4 rounded-full"></div>
            </div>

            {/* Hero description hidden per request */}

            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={`mailto:${personalInfo.email}`}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 hover-lift shadow-lg hover:shadow-blue-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                {t.contact}
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 hover-lift shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                {t.github}
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 hover-lift shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
                {t.linkedin}
              </a>
            </div>

            {/* Paragraph moved above under the role title */}
          </div>
        </div>

        {/* SKILLS - Hidden for now */}

  {/* EXPERIENCE & EDUCATION */}
    <div className="mb-10 animate-slide-up delay-700 scroll-mt-24" id="experiencia">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-emerald-500" aria-hidden="true" />
            {lang === 'es' ? 'Trayectoria profesional' : 'Professional highlights'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border p-6 hover-lift bg-white border-slate-200 dark:bg-slate-800/50 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-500" />
                {lang === 'es' ? 'Experiencia laboral' : 'Work Experience'}
              </h3>
              <div className="space-y-4">
                {/* CEO & Fundador – Agencia Web Freelance */}
                <div>
                  <h4 className="text-slate-900 dark:text-white font-medium">CEO &amp; Fundador – Agencia Web Freelance</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{lang === 'es' ? 'mayo 2025 – Presente' : 'May 2025 – Present'}</p>
                  <p className="text-slate-700 dark:text-slate-300 text-sm mt-1">
                    {lang === 'es'
                      ? 'Lidero mi propia agencia digital, creando sitios web y e-commerce personalizados, combinando diseño, tecnología y estrategia para impulsar negocios.'
                      : 'I lead my own digital agency, building custom websites and e‑commerce solutions, combining design, technology, and strategy to grow businesses.'}
                  </p>
                </div>

                {/* Desarrollo de software para IoT */}
                <div>
                  <h4 className="text-slate-900 dark:text-white font-medium">{lang === 'es' ? 'Desarrollador de Software IoT – Centro de Energías Renovables' : 'IoT Software Developer – Renewable Energy Center'}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{lang === 'es' ? 'abril 2023 – Presente' : 'Apr 2023 – Present'}</p>
                  <p className="text-slate-700 dark:text-slate-300 text-sm mt-1">{lang === 'es' ? 'Desarrollo de software para IoT en Centro de Energías Renovables' : 'Software development for IoT at the Renewable Energy Center'}</p>
                </div>

                {/* Técnico de Reparación de Equipos Informáticos */}
                <div>
                  <h4 className="text-slate-900 dark:text-white font-medium">{lang === 'es' ? 'Técnico de Reparación de Equipos Informáticos' : 'Computer Repair Technician'}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{lang === 'es' ? 'febrero 2012 – Presente' : 'Feb 2012 – Present'}</p>
                  <p className="text-slate-700 dark:text-slate-300 text-sm mt-1">{lang === 'es' ? 'Soporte técnico, armado y reparación de equipos informáticos' : 'Technical support, assembly and repair of computer equipment'}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border p-6 hover-lift bg-white border-slate-200 dark:bg-slate-800/50 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-500" />
                {lang === 'es' ? 'Educación & Certificaciones' : 'Education & Certifications'}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-slate-900 dark:text-white font-medium">{lang === 'es' ? 'Tecnicatura en Programación - UTN San Nicolás' : 'Programming Technician - UTN San Nicolás'}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{lang === 'es' ? 'febrero 2024 – Presente' : 'Feb 2024 – Present'}</p>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-medium">Database Administration using PostgreSQL</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">India-Argentina CEIT at UNAHUR &amp; C-DAC India</p>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-medium">MERN Full Stack - EducacionIT</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{lang === 'es' ? 'abril 2022 – octubre 2022' : 'Apr 2022 – Oct 2022'}<br />{lang === 'es' ? 'Beca JP Morgan y Fundación Pescar' : 'JP Morgan & Fundación Pescar Scholarship'}</p>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-medium">.NET Full Stack - ComIT</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{lang === 'es' ? 'junio 2021 – diciembre 2021' : 'Jun 2021 – Dec 2021'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

  {/* PROJECTS */}
  <div className="mb-10 animate-slide-up delay-700 scroll-mt-24" id="proyectos">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-500" aria-hidden="true" />
            {t.projects}
          </h2>
          <ProjectCarousel lang={lang} />
        </div>

  {/* ABOUT ME */}
  <div className="mb-10 animate-slide-up delay-700 scroll-mt-24" id="sobre-mi">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-500" aria-hidden="true" />
            {t.about}
          </h2>
          <div className="rounded-xl border p-6 hover-lift bg-white border-slate-200 dark:bg-slate-800/50 dark:border-slate-700">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{lang === 'es' ? personalInfo.descriptionEs : personalInfo.descriptionEn}</p>
          </div>
          {/* CTA card below About Me (spiced up) */}
          <div className="mt-6 relative rounded-2xl p-[1px] bg-gradient-to-r from-blue-400/30 via-indigo-400/30 to-emerald-400/30 dark:from-blue-600/40 dark:via-indigo-600/40 dark:to-emerald-600/40 ring-1 ring-slate-200 dark:ring-slate-700/60 overflow-hidden hover:shadow-[0_0_0_3px_rgba(59,130,246,0.2)] transition-shadow will-change-transform motion-safe:animate-slide-up">
            <div className="relative rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm p-6 text-center will-change-transform">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true"></div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-300 mb-2">
                {lang === 'es' ? '¿Te interesa colaborar?' : 'Interested in collaborating?'}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-5">
                {lang === 'es'
                  ? 'Cuéntame sobre tu proyecto y evaluemos cómo puedo contribuir.'
                  : "Tell me about your project and let's assess how I can contribute."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 inline-flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" /> {t.contact}
                </a>
                <a
                  href="#proyectos"
                  className="group px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white font-semibold rounded-lg transition-all duration-300 inline-flex items-center gap-2 border border-slate-300 dark:border-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
                >
                  {lang === 'es' ? 'Ver proyectos' : 'See projects'}
                  <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true"></div>
            </div>
          </div>
        </div>

        {/* FOOTER CTA - Hidden for now */}

        {/* Footer Info */}
        <div className="mt-8 text-slate-500 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 w-full">
            <p className="m-0">© {new Date().getFullYear()} {personalInfo.name}. </p>
            <div className="flex items-center gap-4 flex-wrap justify-end">
              <a
                href="#sobre-mi"
                className="text-slate-500 hover:text-slate-300 text-sm underline-offset-2 hover:underline transition-colors px-2 py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
              >
                {t.about}
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-slate-500 hover:text-slate-300 text-sm underline-offset-2 hover:underline transition-colors inline-flex items-center gap-1.5 px-2 py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
              >
                <Mail className="w-4 h-4" aria-hidden="true" /> {t.contact}
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          type="button"
          aria-label={t.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 md:bottom-10 md:right-10 z-40 rounded-full bg-slate-800/80 border border-slate-700 text-white p-3 shadow-lg hover:bg-slate-700/80 transition-colors hover-lift will-change-transform motion-safe:animate-fade-in focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ChevronUp className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default App;
