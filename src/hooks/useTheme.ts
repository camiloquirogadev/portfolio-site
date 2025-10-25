import { useState, useEffect, useCallback } from 'react';
import type { ThemeMode } from '../types';

export const useTheme = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');

  const applyTheme = useCallback((mode: ThemeMode) => {
    try {
      localStorage.setItem('theme', mode);
    } catch {
      // Ignore localStorage errors silently
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = mode === 'dark' || (mode === 'system' && mql.matches);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    // Retrieve and apply stored theme preference on component initialization
    try {
      const stored = (localStorage.getItem('theme') as ThemeMode) || 'system';
      setThemeMode(stored);
      applyTheme(stored);
    } catch {
      setThemeMode('system');
      applyTheme('system');
    }

    // Handle dynamic system theme preference changes
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
  };

  return { themeMode, setTheme };
};