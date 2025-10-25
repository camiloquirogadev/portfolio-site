import { Code2, Mail, ChevronRight } from 'lucide-react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { personalInfo } from '../../constants';
import { translations } from '../../constants';
import { createMailtoLink } from '../../constants';

export const About = () => {
  const { lang } = useLanguageContext();
  const t = translations[lang];
  return (
    <div className="mb-10 animate-slide-up delay-700 scroll-mt-24" id="sobre-mi">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Code2 className="w-6 h-6 text-blue-500" aria-hidden="true" />
        {t.about}
      </h2>
      <div className="rounded-xl border p-6 hover-lift bg-white border-slate-200 dark:bg-slate-800/50 dark:border-slate-700">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{lang === 'es' ? personalInfo.descriptionEs : personalInfo.descriptionEn}</p>
      </div>
      {/* Call-to-action section with enhanced visual design */}
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
              href={createMailtoLink(lang)}
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
  );
};