import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Mail, GraduationCap, Briefcase, Code2, Sparkles } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { personalInfo, profile } from '../data/cvData';
import { GithubIcon, LinkedinIcon } from './Icons';
import profileImg from '../assets/profile.jpg';

const highlights = [
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'ESPRIT Engineering',
    color: 'brand-blue',
  },
  {
    icon: Briefcase,
    label: 'Focus',
    value: 'Full Stack & Microservices',
    color: 'brand-cyan',
  },
  {
    icon: Code2,
    label: 'Expertise',
    value: 'Java · Angular · AI · DevOps',
    color: 'brand-blue',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Ariana, Tunisia',
    color: 'brand-cyan',
  },
];

export default function About() {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const description = lang === 'fr' ? profile.fr : profile.en;

  return (
    <section id="about" className="section bg-bg-secondary/40 relative overflow-hidden transition-colors">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #06B6D4, transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-brand-cyan text-sm font-semibold tracking-widest uppercase mb-3">02 —</span>
          <h2 className="section-title">{t.about.title}</h2>
          <p className="section-subtitle">{t.about.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Left — Avatar & Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col items-center lg:items-start gap-6"
          >
            {/* Modern Portrait Card */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] group">
              {/* Ambient Glow Backdrop */}
              <div
                className="absolute -inset-3 rounded-3xl blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 50%, #4F46E5 100%)',
                }}
              />

              {/* Gradient Border Frame */}
              <div className="relative rounded-3xl p-[2px] bg-gradient-to-b from-brand-blue/60 via-brand-cyan/40 to-brand-blue/20 shadow-2xl">
                <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden bg-bg-secondary">
                  {/* Portrait Image */}
                  <img
                    src={profileImg}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Scrim for overlay text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Top-Right Badge: Open to Work */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full backdrop-blur-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open to work
                  </div>

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl backdrop-blur-md bg-slate-900/70 border border-white/10 text-white">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-sm font-bold text-white font-display">{personalInfo.name}</span>
                      <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-brand-blue/30 text-cyan-300 border border-brand-cyan/30">
                        ESPRIT
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 flex items-center gap-1">
                      <Sparkles size={11} className="text-cyan-400" />
                      Full Stack & AI Engineer
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Accent Rocket Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-3 -right-3 w-12 h-12 rounded-2xl flex items-center justify-center text-xl text-white shadow-xl border border-white/20"
                style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }}
              >
                🚀
              </motion.div>
            </div>

            {/* Contact Links */}
            <div className="flex flex-col gap-3 w-full">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 p-3 rounded-xl glass-card text-text-secondary hover:text-text-primary transition-all group"
                aria-label="Email"
              >
                <Mail size={16} className="text-brand-blue group-hover:text-brand-cyan transition-colors" />
                <span className="text-sm truncate">{personalInfo.email}</span>
              </a>
              <div className="flex items-center gap-3 p-3 rounded-xl glass-card text-text-secondary">
                <MapPin size={16} className="text-brand-cyan" />
                <span className="text-sm">{personalInfo.location}</span>
              </div>
              <div className="flex gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl glass-card text-text-secondary hover:text-text-primary transition-all text-xs font-medium"
                  aria-label="GitHub"
                >
                  <GithubIcon size={15} />
                  GitHub
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl glass-card text-text-secondary hover:text-text-primary transition-all text-xs font-medium"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={15} />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — Bio & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Description */}
            <div className="space-y-4">
              <p className="text-text-secondary text-base leading-relaxed">
                {description}
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass-card rounded-xl p-4 flex items-start gap-4"
                >
                  <div className={`p-2 rounded-lg bg-${item.color}/10 border border-${item.color}/20 text-brand-blue`}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <div className="text-text-muted text-xs uppercase tracking-wider font-medium mb-0.5">{item.label}</div>
                    <div className="text-text-primary font-semibold text-sm">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Languages & Soft Skills */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-text-primary font-semibold mb-3 text-sm uppercase tracking-wider">Languages</h3>
                <div className="flex flex-col gap-2.5">
                  {[
                    { lang: 'Arabic', level: 'Native', pct: 100 },
                    { lang: 'French', level: 'Advanced', pct: 85 },
                    { lang: 'English', level: 'Intermediate', pct: 65 },
                  ].map((l) => (
                    <div key={l.lang}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-secondary font-medium">{l.lang}</span>
                        <span className="text-text-muted">{l.level}</span>
                      </div>
                      <div className="h-1.5 bg-slate-200 dark:bg-bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #2563EB, #06B6D4)' }}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${l.pct}%` } : {}}
                          transition={{ duration: 1, delay: 0.8 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-text-primary font-semibold mb-3 text-sm uppercase tracking-wider">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['Teamwork', 'Adaptability', 'Time Management', 'Initiative', 'Scrum', 'Kanban'].map((skill) => (
                    <span key={skill} className="tech-badge">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
