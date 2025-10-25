import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { About } from './components/sections/About';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/ui/BackToTop';
import { LanguageProvider } from './contexts/LanguageContext';
import { useBackToTop } from './hooks/useBackToTop';
import { translations } from './constants';

function AppContent() {
  const showBackToTop = useBackToTop();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" id="top">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12" role="main" id="main">
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Footer />
      </main>

      <BackToTop show={showBackToTop} t={{ backToTop: translations.es.backToTop }} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;