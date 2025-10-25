import { useState, useEffect } from 'react';
import type { Language } from '../types';

export const useLanguage = () => {
  const [lang, setLang] = useState<Language>('es');

  // Maintains document language attribute synchronization
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === 'es' ? 'en' : 'es'));

  return { lang, setLang, toggleLang };
};