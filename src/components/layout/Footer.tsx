import { Mail } from 'lucide-react';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { personalInfo } from '../../constants';
import { translations } from '../../constants';

export const Footer = () => {
  const { lang } = useLanguageContext();
  const t = translations[lang];
  return (
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
  );
};