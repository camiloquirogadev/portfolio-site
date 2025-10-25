import { useState, useCallback, useEffect, useRef } from 'react';
import { GraduationCap, ExternalLink, Github, X, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { portfolio } from '../../data/portfolioData';
import { translations } from '../../constants';

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

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  lang: 'es' | 'en';
  returnFocusTo?: HTMLElement | null;
}

const ProjectModal = ({ project, onClose, lang, returnFocusTo }: ProjectModalProps) => {
  const t = lang === 'es'
    ? { techUsed: 'Tecnologías Utilizadas', viewProject: 'Ver Proyecto', viewCode: 'Ver Código' }
    : { techUsed: 'Technologies Used', viewProject: 'View Project', viewCode: 'View Code' };

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = useCallback(() => {
    onClose();
    // Return focus to the element that opened the modal
    returnFocusTo?.focus?.();
  }, [onClose, returnFocusTo]);

  // Implements accessibility features for modal interaction, including focus management and keyboard navigation
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

interface ProjectCarouselProps {
  lang: 'es' | 'en';
}

const ProjectCarousel = ({ lang }: ProjectCarouselProps) => {
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

export const Projects = () => {
  const { lang } = useLanguageContext();
  const t = translations[lang];
  return (
    <div className="mb-10 animate-slide-up delay-700 scroll-mt-24" id="proyectos">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <GraduationCap className="w-6 h-6 text-blue-500" aria-hidden="true" />
        {t.projects}
      </h2>
      <ProjectCarousel lang={lang} />
    </div>
  );
};