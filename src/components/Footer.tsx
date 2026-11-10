import { ArrowUp, Mail } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { personalInfo } from '../data/cvData';
import { GithubIcon, LinkedinIcon } from './Icons';
import profileImg from '../assets/profile.jpg';

export default function Footer() {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-bg-secondary/60 border-t border-slate-200 dark:border-white/5 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Top row */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-white/5">
          {/* Brand info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-8 h-8 rounded-lg overflow-hidden p-[1px] bg-gradient-to-tr from-brand-blue to-brand-cyan shadow-sm">
                <img
                  src={profileImg}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top rounded-[7px]"
                />
              </div>
              <span className="font-display font-bold text-text-primary text-base">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs text-text-muted">
              {personalInfo.title} · {personalInfo.subtitle}
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-5 text-xs text-text-secondary">
            {['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="hover:text-text-primary transition-colors capitalize"
              >
                {t.nav[item as keyof typeof t.nav] || item}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg glass-card text-text-secondary hover:text-text-primary transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg glass-card text-text-secondary hover:text-text-primary transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-lg glass-card text-text-secondary hover:text-text-primary transition-all"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-text-muted">
          <p>
            © {currentYear} {personalInfo.name}. {t.footer.rights}
          </p>

          <p className="flex items-center gap-1.5">
            <span>{t.footer.builtWith}</span>
            <span className="text-brand-cyan font-semibold">React</span>
            <span>·</span>
            <span className="text-brand-blue font-semibold">TypeScript</span>
            <span>·</span>
            <span className="text-brand-cyan font-semibold">Tailwind CSS</span>
          </p>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card text-text-secondary hover:text-text-primary transition-all"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
