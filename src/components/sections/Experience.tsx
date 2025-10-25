import { Briefcase, GraduationCap } from 'lucide-react';
import { useLanguageContext } from '../../contexts/LanguageContext';

export const Experience = () => {
  const { lang } = useLanguageContext();
  return (
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
  );
};