import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/context';
const links = ['Home', 'Research', 'Projects', 'Blog', 'Presentations', 'About'];
const sections = { MuonPaper: 'Research', UniformFragmentation: 'Research', PoincareMaps: 'Research', VWPhysics: 'Projects', ErrorTheorem: 'Blog' };
export default function Navbar({ active, setActive, dark, setDark }) {
  const { language, setLanguage, tr } = useI18n();
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape') {setOpen(false);menuButton.current?.focus();}
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const navigate = (page) => {setActive(page);setOpen(false);};
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label={tr("Main navigation")}>
        <button className="wordmark" onClick={() => navigate('Home')}>{tr("Davi Santos-Silva")}</button>
        <span className="affiliation">{tr("IFSC \u2014 USP")}</span>
        <div id="main-navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
          {tr(links.map((link) => <button key={link} onClick={() => navigate(link)} aria-current={(sections[active] || active) === link ? 'page' : undefined}>{tr(link)}</button>))}
        </div>
        <div className="language-switch" role="group" aria-label={tr("Language")}><button lang="pt-BR" aria-label={tr("Português")} aria-pressed={language === 'pt'} onClick={() => setLanguage('pt')}>{tr("PT")}</button><button lang="en" aria-label={tr("English")} aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>{tr("EN")}</button></div>
        <button className="theme-switch" onClick={() => setDark(!dark)} aria-label={tr(dark ? 'Switch to light theme' : 'Switch to dark theme')} title={tr(dark ? 'Light theme' : 'Dark theme')}>
          {tr(dark ? <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4a8.5 8.5 0 1 0 11.5 11.5Z" /></svg>)}
        </button>
        <button ref={menuButton} className="menu-switch" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{tr(open ? 'Close' : 'Menu')}</button>
      </nav>
    </header>);

}
