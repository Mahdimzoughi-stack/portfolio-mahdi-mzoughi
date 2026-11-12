import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowDown, Sparkles, ChevronRight, User, Code2, Orbit } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { personalInfo } from '../data/cvData';
import { GithubIcon, LinkedinIcon } from './Icons';
import profileImg from '../assets/profile.jpg';
import TechOrbit from './TechOrbit';
import NeuralUniverseBackground from './NeuralUniverseBackground';

const EXPERTISE = [
  'Java & Spring Boot',
  'Angular & TypeScript',
  'Microservices',
  'DevOps & CI/CD',
  'AI Integration',
  'Full Stack Dev',
];

const CODE_LINES = [
  { indent: 0, content: 'class SoftwareEngineer {' },
  { indent: 1, content: 'name = "Mahdi Mzoughi";' },
  { indent: 1, content: 'passion = "Full Stack & AI";' },
  { indent: 1, content: 'location = "Ariana, Tunisia";' },
  { indent: 1, content: 'skills = [' },
  { indent: 2, content: '"Java", "Spring Boot",' },
  { indent: 2, content: '"Angular", "TypeScript",' },
  { indent: 2, content: '"Docker", "Kubernetes"' },
  { indent: 1, content: '];' },
  { indent: 1, content: 'build() { return "🚀 greatSoftware"; }' },
  { indent: 0, content: '}' },
];

export default function Hero() {
  const { t } = useLang();
  const [heroTab, setHeroTab] = useState<'orbit' | 'profile' | 'code'>('orbit');

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mesh grid-pattern"
    >
      {/* ════════════════════════════════════════════════════════
          NEURAL UNIVERSE BACKGROUND  — covers the full section
          pointer-events:none is set inside the component
          ════════════════════════════════════════════════════════ */}
      <NeuralUniverseBackground />

      {/* Subtle radial vignette on top of canvas for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'radial-gradient(ellipse 70% 60% at 20% 50%, transparent 40%, rgba(8,13,26,0.45) 100%)',
        }}
      />

      {/* ════════════════════════════════════════════════════
          ALL HERO CONTENT  — z-index above canvas
          ════════════════════════════════════════════════════ */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">

          {/* LEFT — Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Mobile / Tablet Avatar Badge */}
            <motion.div variants={itemVariants} className="lg:hidden flex justify-center mb-6">
              <div className="relative group">
                <div
                  className="absolute -inset-2 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-300"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }}
                />
                <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-brand-blue via-cyan-400 to-indigo-500 shadow-xl overflow-hidden">
                  <img
                    src={profileImg}
                    alt={personalInfo.name}
                    className="w-full h-full rounded-full object-cover object-top"
                  />
                </div>
                <div className="absolute bottom-1 right-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold border-2 border-bg-primary flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Dispo
                </div>
              </div>
            </motion.div>

            {/* Available Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-500 dark:text-emerald-400 border border-emerald-500/30 bg-emerald-500/10">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                {t.hero.available}
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p variants={itemVariants} className="text-text-secondary text-lg mb-2 font-medium">
              {t.hero.greeting}
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-text-primary mb-4 leading-tight"
            >
              Mahdi
              <br />
              <span className="gradient-text">Mzoughi</span>
            </motion.h1>

            {/* Roles */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center lg:items-start gap-2 mb-6">
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold text-brand-blue dark:text-white border border-brand-blue/30 bg-brand-blue/10">
                {t.hero.role1}
              </span>
              <ChevronRight size={16} className="text-text-muted hidden sm:block lg:hidden xl:block" />
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold text-cyan-600 dark:text-cyan-300 border border-brand-cyan/30 bg-brand-cyan/10">
                {t.hero.role2}
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p variants={itemVariants} className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              {t.hero.tagline}
            </motion.p>

            {/* Expertise Tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center lg:justify-start mb-10">
              {EXPERTISE.map((skill) => (
                <span key={skill} className="tech-badge">
                  <Sparkles size={10} className="mr-1 text-brand-cyan" />
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProjects}
                className="btn-primary"
                id="hero-explore-projects"
              >
                {t.hero.cta_projects}
                <ChevronRight size={16} />
              </motion.button>

              <motion.a
                href={personalInfo.cv}
                download="CV_Mahdi_Mzoughi.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
                id="hero-download-cv"
              >
                <Download size={16} />
                {t.hero.cta_cv}
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="btn-secondary"
                id="hero-contact"
              >
                {t.hero.cta_contact}
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 justify-center lg:justify-start">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl text-text-secondary hover:text-text-primary glass-card border transition-all duration-200"
                aria-label="GitHub Profile"
                id="hero-github"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl text-text-secondary hover:text-text-primary glass-card border transition-all duration-200"
                aria-label="LinkedIn Profile"
                id="hero-linkedin"
              >
                <LinkedinIcon size={20} />
              </a>
              <div className="h-6 w-px bg-slate-300 dark:bg-white/10" />
              <span className="text-text-muted text-xs">Ariana, Tunisia 🇹🇳</span>
            </motion.div>
          </motion.div>

          {/* RIGHT — Interactive Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative max-w-md xl:max-w-lg mx-auto"
            >
              {/* Tab Switcher */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="inline-flex p-1 rounded-xl glass-card border border-brand-blue/30 backdrop-blur-xl">
                  <button
                    onClick={() => setHeroTab('orbit')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                      heroTab === 'orbit'
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md shadow-emerald-500/25'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Orbit size={13} />
                    <span>Orbite</span>
                  </button>
                  <button
                    onClick={() => setHeroTab('profile')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                      heroTab === 'profile'
                        ? 'bg-gradient-to-r from-brand-blue to-cyan-500 text-white shadow-md'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <User size={13} />
                    <span>Portrait</span>
                  </button>
                  <button
                    onClick={() => setHeroTab('code')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                      heroTab === 'code'
                        ? 'bg-gradient-to-r from-brand-blue to-cyan-500 text-white shadow-md'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Code2 size={13} />
                    <span>mahdi.ts</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available</span>
                </div>
              </div>

              {/* Showcase Card */}
              <AnimatePresence mode="wait">
                {heroTab === 'orbit' ? (
                  <motion.div
                    key="orbit"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="relative rounded-3xl p-4 bg-[#080d18]/90 dark:bg-black/90 border border-emerald-500/30 shadow-2xl backdrop-blur-xl overflow-hidden min-h-[480px] flex items-center justify-center"
                  >
                    {/* Background Code Snippets watermark */}
                    <div className="absolute top-4 left-4 font-mono text-[10px] text-emerald-400/20 pointer-events-none select-none text-left leading-relaxed hidden sm:block">
                      <div className="text-emerald-500/40 font-bold">// whoami.ts</div>
                      <div>const dev = &#123;</div>
                      <div className="pl-2">role: "Software Engineer",</div>
                      <div className="pl-2">openToWork: true,</div>
                      <div className="pl-2">school: "ESPRIT"</div>
                      <div>&#125;;</div>
                    </div>

                    <div className="absolute top-4 right-4 font-mono text-[10px] text-cyan-400/20 pointer-events-none select-none text-right leading-relaxed hidden sm:block">
                      <div className="text-cyan-500/40 font-bold">// projects.ts</div>
                      <div>const p = [</div>
                      <div className="pr-2">"SIMEG - Plateforme RH",</div>
                      <div className="pr-2">"Vermeg Group PFE",</div>
                      <div className="pr-2">"Microservices & AI"</div>
                      <div>];</div>
                    </div>

                    {/* Orbital System */}
                    <TechOrbit />
                  </motion.div>
                ) : heroTab === 'profile' ? (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="relative group"
                  >
                    {/* Glowing Ambient Halo */}
                    <div
                      className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 50%, #4F46E5 100%)',
                      }}
                    />

                    {/* Gradient Border Frame */}
                    <div className="relative rounded-3xl p-[2px] bg-gradient-to-b from-brand-blue/60 via-cyan-400/40 to-brand-blue/20 shadow-2xl">
                      <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden bg-[#090E1A]">
                        {/* High-res Image */}
                        <img
                          src={profileImg}
                          alt={personalInfo.name}
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Modern Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                        {/* Top-left Chip */}
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-md bg-black/40 border border-white/10 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg">
                          <Sparkles size={12} className="text-cyan-400" />
                          <span>Full Stack & AI</span>
                        </div>

                        {/* Bottom Overlay Card */}
                        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl backdrop-blur-xl bg-slate-900/80 border border-white/15 text-white shadow-2xl">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div>
                              <h3 className="text-base font-bold text-white font-display leading-tight">{personalInfo.name}</h3>
                              <p className="text-xs text-cyan-300 font-medium">Software Engineer · ESPRIT</p>
                            </div>
                            <span className="w-8 h-8 rounded-xl bg-brand-blue/30 border border-brand-cyan/40 flex items-center justify-center text-sm shadow-inner">
                              🚀
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {['Java / Spring', 'Angular', 'Docker', 'AI'].map((tech) => (
                              <span key={tech} className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-slate-200 border border-white/10">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-2xl overflow-hidden border border-brand-blue/30 shadow-2xl bg-[#090E1A]"
                  >
                    {/* Window Bar */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-[#0D1526] border-b border-white/10">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      <span className="ml-auto text-xs text-slate-400 font-mono">mahdi.ts</span>
                    </div>
                    {/* Code Content */}
                    <div className="p-6 font-mono text-sm leading-relaxed">
                      {CODE_LINES.map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                          className="flex"
                        >
                          <span className="text-slate-500 mr-4 text-xs select-none w-5 text-right">{i + 1}</span>
                          <span style={{ paddingLeft: `${line.indent * 20}px` }}>
                            {renderCodeLine(line.content)}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -left-12 top-1/4 glass-card rounded-xl p-3 sm:p-4 border border-brand-cyan/20 shadow-lg pointer-events-none z-20"
              >
                <div className="text-brand-cyan text-xs font-semibold mb-0.5">Stack</div>
                <div className="font-bold text-lg text-text-primary">12+</div>
                <div className="text-text-muted text-[11px]">Technologies</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -right-10 bottom-1/4 glass-card rounded-xl p-3 sm:p-4 border border-brand-blue/20 shadow-lg pointer-events-none z-20"
              >
                <div className="text-brand-blue text-xs font-semibold mb-0.5">Projects</div>
                <div className="font-bold text-lg text-text-primary">4+</div>
                <div className="text-text-muted text-[11px]">Delivered</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted hover:text-text-primary transition-colors group"
        style={{ zIndex: 2 }}
        aria-label="Scroll to About section"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={18} className="group-hover:text-brand-cyan transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
}

function renderCodeLine(content: string) {
  if (content.startsWith('class ') || content === '}') {
    return <span className="text-blue-400">{content}</span>;
  }
  if (content.includes('=') && !content.includes('return')) {
    const [key, ...rest] = content.split('=');
    return (
      <>
        <span className="text-cyan-300">{key?.trim()}</span>
        <span className="text-white"> = </span>
        <span className="text-emerald-400">{rest.join('=').trim()}</span>
      </>
    );
  }
  if (content.includes('build()')) {
    return <span className="text-yellow-400">{content}</span>;
  }
  return <span className="text-slate-300">{content}</span>;
}
