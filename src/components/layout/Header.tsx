import { useState, useEffect } from 'react';
import { Menu, Languages, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../constants';

export const Header = () => {
  const { lang, toggleLang } = useLanguageContext();
  const { themeMode, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const t = translations[lang];

  // Enhances mobile user experience by enabling keyboard navigation and preventing background scrolling
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

  return (
    <header className="sticky top-2 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative flex items-center justify-center gap-4 py-3 md:rounded-xl md:bg-white/80 md:dark:bg-slate-900/70 md:backdrop-blur md:border md:border-slate-200 md:dark:border-slate-800 md:shadow-sm">
          <nav className="hidden md:flex items-center gap-6 text-slate-600 dark:text-slate-300">
            <a href="#experiencia" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:underline underline-offset-4">
              {t.experience}
            </a>
            <a href="#proyectos" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:underline underline-offset-4">
              {t.projects}
            </a>
            <a href="#sobre-mi" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:underline underline-offset-4">
              {t.about}
            </a>
            <a href={`mailto:quirogacamilodev@gmail.com`} className="hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:underline underline-offset-4">
              {t.contact}
            </a>

            {/* Theme menu */}
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
                  <button onClick={() => { setTheme('light'); setThemeMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-slate-200 hover:bg-slate-700 rounded" role="menuitem">
                    <Sun className="w-4 h-4" aria-hidden="true" /> {t.light}
                  </button>
                  <button onClick={() => { setTheme('dark'); setThemeMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-slate-200 hover:bg-slate-700 rounded" role="menuitem">
                    <Moon className="w-4 h-4" aria-hidden="true" /> {t.dark}
                  </button>
                  <button onClick={() => { setTheme('system'); setThemeMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-slate-200 hover:bg-slate-700 rounded" role="menuitem">
                    <Monitor className="w-4 h-4" aria-hidden="true" /> {t.system}
                  </button>
                </div>
              )}
            </div>

            {/* Language toggle */}
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
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(v => !v)}
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile menu */}
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
                  <a href="#experiencia" onClick={() => setMenuOpen(false)} className="block w-full px-3 py-3 rounded-lg text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">
                    {t.experience}
                  </a>
                  <a href="#proyectos" onClick={() => setMenuOpen(false)} className="block w-full px-3 py-3 rounded-lg text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">
                    {t.projects}
                  </a>
                  <a href="#sobre-mi" onClick={() => setMenuOpen(false)} className="block w-full px-3 py-3 rounded-lg text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">
                    {t.about}
                  </a>
                  <a href={`mailto:quirogacamilodev@gmail.com`} onClick={() => setMenuOpen(false)} className="block w-full px-3 py-3 rounded-lg text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">
                    {t.contact}
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};