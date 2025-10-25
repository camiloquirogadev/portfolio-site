import { Code2, Briefcase, ShoppingCart, Lightbulb } from 'lucide-react';

export const skills = [
  // Lenguajes
  'JavaScript',
  'Python',
  'PHP',
  'C#',
  'R',
  // Frontend
  'HTML5',
  'CSS3',
  'React.js',
  'Material UI',
  'Bootstrap',
  // Backend
  'Node.js',
  '.NET',
  // Bases de Datos
  'PostgreSQL',
  'MongoDB',
  // Herramientas y Otros
  'Git',
  'GitHub',
  'JIRA',
  'Figma',
  'Trello',
  'Sistemas de Información Geográfica',
  'Inglés Técnico'
];

export const services = [
  { icon: Code2, title: 'Desarrollo Web', titleEn: 'Web Development', description: 'Aplicaciones web modernas, rápidas y accesibles con React y TypeScript. Responsive, SEO técnico y buenas prácticas (performance, a11y, testing). Entrega con documentación y soporte inicial.', descriptionEn: 'Modern, fast and accessible web apps with React and TypeScript. Responsive, technical SEO and best practices (performance, a11y, testing). Delivered with documentation and initial support.' },
  { icon: Briefcase, title: 'Soluciones Empresariales', titleEn: 'Business Solutions', description: 'Herramientas a medida para tu negocio: turnos, inventario, formularios dinámicos y dashboards. Arquitectura simple, segura y mantenible, integrable con APIs y lista para escalar.', descriptionEn: 'Custom tools for your business: appointments, inventory, dynamic forms and dashboards. Simple, secure and maintainable architecture, API-ready and built to scale.' },
  { icon: ShoppingCart, title: 'Tiendas Online y E-commerce', titleEn: 'Online Stores & E-commerce', description: 'Tiendas en Shopify o WordPress + WooCommerce optimizadas para conversión: diseño adaptable, checkout ágil, pagos locales, catálogo autogestionable y analítica básica.', descriptionEn: 'Shopify or WordPress + WooCommerce stores optimized for conversion: responsive design, fast checkout, local payment gateways, self-managed catalog and basic analytics.' },
  { icon: Lightbulb, title: 'Consultoría Tech', titleEn: 'Tech Consulting', description: 'Asesoría técnica práctica: elección de stack, estructura de proyecto, revisión de código, CI/CD y buenas prácticas. Recomendaciones accionables en sesiones breves.', descriptionEn: 'Practical technical advisory: stack selection, project structure, code reviews, CI/CD and best practices. Actionable recommendations in focused sessions.' },
];

export const portfolio = [
  {
    id: 7,
    title: 'Patagonia Verde – Monitoreo de Incendios Forestales',
    titleEn: 'Patagonia Verde – Wildfire Monitoring',
    description: 'Plataforma de detección temprana de incendios en la Patagonia con mapas interactivos y datos satelitales en tiempo casi real de NASA FIRMS. Visualización clara de focos de calor, análisis temporal y filtros avanzados, optimizada para móviles.',
    descriptionEn: 'Early wildfire detection platform for Patagonia with interactive maps and near real-time satellite data from NASA FIRMS. Clear hotspot visualization, temporal analysis, and advanced filters, all optimized for mobile.',
    image: '/images/patagonia-verde-cover.svg',
    technologies: ['React', 'TypeScript', 'Vite', 'Leaflet', 'Tailwind CSS', 'NASA FIRMS'],
    category: 'web-app',
    status: 'completed',
    link: 'https://patagonia-verde.vercel.app/',
    github: 'https://github.com/camiloquirogadev/patagonia-verde'
  },
  {
    id: 1,
    title: 'Sistema de Gestión de Turnos',
    titleEn: 'Appointments Management System',
    description: 'Aplicación web completa para la gestión de citas y turnos médicos. Incluye panel de administración, calendario interactivo y notificaciones automáticas.',
    descriptionEn: 'Full web app for managing medical appointments and schedules. Admin dashboard, interactive calendar and automated notifications.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    category: 'web-app',
    status: 'completed',
    link: '#',
    github: '#'
  },
  {
    id: 2,
    title: 'Tienda Online - Artesanías Locales',
    titleEn: 'Online Store - Local Crafts',
    description: 'E-commerce completo construido con Shopify, personalizado con diseño único y optimizado para conversión. Incluye integración con pasarelas de pago locales.',
    descriptionEn: 'Full e-commerce built with Shopify, custom design optimized for conversion. Includes local payment gateways.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop&crop=center',
    technologies: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    category: 'ecommerce',
    status: 'completed',
    link: '#',
    github: '#'
  },
  {
    id: 3,
    title: 'Dashboard de Analytics Empresarial',
    titleEn: 'Business Analytics Dashboard',
    description: 'Panel de control interactivo para visualización de datos empresariales. Incluye gráficos en tiempo real, reportes automatizados y exportación de datos.',
    descriptionEn: 'Interactive dashboard for business data visualization. Real-time charts, automated reports and data export.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center',
    technologies: ['React', 'D3.js', 'Python', 'FastAPI'],
    category: 'web-app',
    status: 'in-progress',
    link: '#',
    github: '#'
  },
  {
    id: 4,
    title: 'Aplicación de Seguimiento Fitness',
    titleEn: 'Fitness Tracking App',
    description: 'App web para seguimiento de rutinas de ejercicio, progreso y metas personales. Incluye integración con wearables y análisis de datos.',
    descriptionEn: 'Web app for tracking workouts, progress and personal goals. Wearables integration and data analysis.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&crop=center',
    technologies: ['React', 'TypeScript', 'Firebase', 'Chart.js'],
    category: 'web-app',
    status: 'completed',
    link: '#',
    github: '#'
  },
  {
    id: 5,
    title: 'Sistema de Inventario para Restaurante',
    titleEn: 'Restaurant Inventory System',
    description: 'Sistema completo de control de inventario con alertas automáticas, reportes de costos y predicción de compras basado en histórico.',
    descriptionEn: 'Complete inventory control with automated alerts, cost reports and purchase forecasting from history.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=250&fit=crop&crop=center',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    category: 'web-app',
    status: 'completed',
    link: '#',
    github: '#'
  },
  {
    id: 6,
    title: 'Landing Page Corporativa',
    titleEn: 'Corporate Landing Page',
    description: 'Sitio web corporativo moderno y responsivo con diseño personalizado, optimizado para SEO y conversión de leads.',
    descriptionEn: 'Modern, responsive corporate site with custom design, optimized for SEO and lead conversion.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center',
    technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
    category: 'website',
    status: 'completed',
    link: '#',
    github: '#'
  }
];