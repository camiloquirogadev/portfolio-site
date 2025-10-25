/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    const headingElement = screen.getByRole('heading', { name: /Camilo Quiroga/i, level: 1 });
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the developer title', () => {
    render(<App />);
    // Find the role title
    const roleElement = screen.getByText(/Desarrollador Full Stack/i);
    expect(roleElement).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<App />);
    // Check that navigation links exist (there are multiple with same text, so just verify presence)
    const navLinks = screen.getAllByRole('link');
    const navLinkTexts = navLinks.map(link => link.textContent);
    expect(navLinkTexts).toEqual(expect.arrayContaining(['Trayectoria profesional', 'Proyectos', 'Sobre mí', 'Contactame']));
  });

  it('renders contact links', () => {
    render(<App />);
    const contactLinks = screen.getAllByText(/Contactame/i);
    expect(contactLinks.length).toBeGreaterThan(0);
    expect(contactLinks[0].closest('a')).toHaveAttribute('href', 'mailto:quirogacamilodev@gmail.com');
  });

  it('renders project carousel', () => {
    render(<App />);
    const projectsHeading = screen.getByRole('heading', { name: /Proyectos/i });
    expect(projectsHeading).toBeInTheDocument();

    // Check if projects are rendered
    const projectTitles = screen.getAllByRole('heading', { level: 3 });
    expect(projectTitles.length).toBeGreaterThan(0);
  });

  it('renders experience section', () => {
    render(<App />);
    const experienceHeading = screen.getByRole('heading', { name: /Trayectoria profesional/i });
    expect(experienceHeading).toBeInTheDocument();

    // Check for work experience
    const workExperience = screen.getByRole('heading', { name: /Experiencia laboral/i });
    expect(workExperience).toBeInTheDocument();
  });

  it('renders about section', () => {
    render(<App />);
    const aboutHeading = screen.getByRole('heading', { name: /Sobre mí/i });
    expect(aboutHeading).toBeInTheDocument();
  });

  it('toggles language when language button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Initially in Spanish - check for heading text
    const spanishHeading = screen.getByRole('heading', { name: /Trayectoria profesional/i });
    expect(spanishHeading).toBeInTheDocument();

    // Click language toggle
    const langButton = screen.getByRole('button', { name: /Cambiar idioma a inglés/i });
    await user.click(langButton);

    // Should switch to English - check for heading text
    const englishHeading = screen.getByRole('heading', { name: /Professional highlights/i });
    expect(englishHeading).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Switch language to Spanish/i })).toBeInTheDocument();
  });

  it('opens theme menu when theme button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const themeButton = screen.getByRole('button', { name: /Abrir selector de tema/i });
    await user.click(themeButton);

    // Theme options should be visible
    expect(screen.getByText('Claro')).toBeInTheDocument();
    expect(screen.getByText('Oscuro')).toBeInTheDocument();
    expect(screen.getByText('Sistema')).toBeInTheDocument();
  });
});