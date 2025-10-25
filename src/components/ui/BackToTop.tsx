import { ChevronUp } from 'lucide-react';

interface BackToTopProps {
  show: boolean;
  t: {
    backToTop: string;
  };
}

export const BackToTop = ({ show, t }: BackToTopProps) => {
  if (!show) return null;

  return (
    <button
      type="button"
      aria-label={t.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 md:bottom-10 md:right-10 z-40 rounded-full bg-slate-800/80 border border-slate-700 text-white p-3 shadow-lg hover:bg-slate-700/80 transition-colors hover-lift will-change-transform motion-safe:animate-fade-in focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <ChevronUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
};