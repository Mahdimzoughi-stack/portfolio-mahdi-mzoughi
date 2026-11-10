import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Globe, Sun, Moon } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/cvData';
import profileImg from '../assets/profile.jpg';

const NAV_ITEMS = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'experience', href: '#experience' },
  { key: 'projects', href: '#projects' },
  { key: 'education', href: '#education' },
  { key: 'contact', href: '#contact' },
] as const;

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => item.key);
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl border-b shadow-sm'
            : 'bg-transparent'
        }`}
        style={{
          backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
          borderColor: scrolled ? 'var(--card-border)' : 'transparent',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <motion.button
              onClick={() => scrollTo('#home')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2.5 group"
              aria-label="Go to home"
            >
              <div className="relative w-9 h-9 rounded-xl p-[1.5px] bg-gradient-to-tr from-brand-blue via-cyan-400 to-indigo-500 shadow-md group-hover:shadow-glow-blue transition-all">
                <div className="w-full h-full rounded-[10px] overflow-hidden bg-bg-secondary">
                  <img
                    src={profileImg}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <span className="hidden sm:block font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                Mahdi<span className="gradient-text">.</span>
              </span>
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map(({ key, href }) => (
                <button
                  key={key}
                  onClick={() => scrollTo(href)}
                  className={`nav-link px-4 py-2 rounded-lg transition-all ${
                    activeSection === key ? 'active' : ''
                  }`}
                  aria-current={activeSection === key ? 'page' : undefined}
                >
                  {t.nav[key as keyof typeof t.nav] || key}
                </button>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2.5">
              {/* Theme Toggle (Dark / Light Switch) */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={toggleTheme}
                className="relative p-2 rounded-xl text-xs font-semibold glass-card border flex items-center justify-center transition-colors"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.2 }}
                      className="text-amber-400"
                    >
                      <Sun size={17} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.2 }}
                      className="text-brand-blue"
                    >
                      <Moon size={17} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold glass-card border transition-all"
                style={{ color: 'var(--text-secondary)' }}
                aria-label={`Switch to ${lang === 'en' ? 'French' : 'English'}`}
              >
                <Globe size={13} className="text-brand-cyan" />
                <span>{lang === 'en' ? 'FR' : 'EN'}</span>
              </motion.button>

              {/* Download CV */}
              <motion.a
                href={personalInfo.cv}
                download="CV_Mahdi_Mzoughi.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex btn-primary py-2 px-4 text-xs font-semibold"
                aria-label="Download CV"
              >
                <Download size={14} />
                <span>{t.nav.downloadCV}</span>
              </motion.a>

              {/* Hamburger */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-xl glass-card transition-colors"
                style={{ color: 'var(--text-primary)' }}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-4 right-4 z-50 rounded-2xl glass-card p-6 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-1 mb-4">
                {NAV_ITEMS.map(({ key, href }) => (
                  <button
                    key={key}
                    onClick={() => scrollTo(href)}
                    className="text-left px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      color: activeSection === key ? 'var(--text-primary)' : 'var(--text-secondary)',
                      backgroundColor: activeSection === key ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
                    }}
                  >
                    {t.nav[key as keyof typeof t.nav] || key}
                  </button>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Thème / Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold glass-card"
                  >
                    {theme === 'dark' ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-brand-blue" />}
                    <span>{theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}</span>
                  </button>
                </div>
                <button
                  onClick={() => { setLang(lang === 'en' ? 'fr' : 'en'); setMenuOpen(false); }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium glass-card"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Globe size={14} className="text-brand-cyan" />
                  <span>{lang === 'en' ? 'Passer en Français' : 'Switch to English'}</span>
                </button>
                <a
                  href={personalInfo.cv}
                  download="CV_Mahdi_Mzoughi.pdf"
                  className="btn-primary text-xs justify-center py-2.5"
                  onClick={() => setMenuOpen(false)}
                >
                  <Download size={14} />
                  <span>{t.nav.downloadCV}</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
