import { Mail, Github, Linkedin } from 'lucide-react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { personalInfo } from '../../constants';
import { translations } from '../../constants';

export const Hero = () => {
  const { lang } = useLanguageContext();
  const t = translations[lang];
  return (
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
      </div>
    </div>
  );
};