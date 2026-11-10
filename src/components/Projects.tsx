import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Server,
  Cpu,
} from 'lucide-react';
import { useLang } from '../context/LangContext';
import { projects, type Project } from '../data/cvData';
import ProjectModal from './ProjectModal';
import { GithubIcon } from './Icons';

export default function Projects() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const simeg = projects.find((p) => p.id === 'simeg');
  const otherProjects = projects.filter((p) => p.id !== 'simeg');

  return (
    <section id="projects" className="section relative overflow-hidden transition-colors">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-10 bg-brand-blue" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-brand-cyan text-sm font-semibold tracking-widest uppercase mb-3">
            06 — Engineering Works
          </span>
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-subtitle max-w-xl mx-auto">{t.projects.subtitle}</p>
        </motion.div>

        {/* FLAGSHIP PROJECT: SIMEG */}
        {simeg && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <div className="glass-card rounded-3xl p-6 sm:p-10 border border-brand-blue/30 relative overflow-hidden group">
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 w-44 h-44 overflow-hidden pointer-events-none">
                <div className="absolute top-7 -right-14 transform rotate-45 bg-gradient-to-r from-brand-blue to-brand-cyan text-[11px] font-bold text-white py-1 px-14 shadow-lg uppercase tracking-wider text-center">
                  Flagship PFE
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Left Description */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-blue/15 text-brand-blue dark:text-brand-blue-light border border-brand-blue/30 flex items-center gap-1.5">
                      <Sparkles size={13} />
                      Vermeg Group · PFE
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-bg-secondary text-text-muted border border-slate-200 dark:border-white/5">
                      Microservices & AI
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-display font-bold text-text-primary tracking-tight">
                    SIMEG
                  </h3>
                  <p className="text-base text-brand-cyan font-medium">
                    {simeg.subtitle}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {simeg.description}
                  </p>

                  {/* Key Highlights list */}
                  <div className="grid sm:grid-cols-2 gap-2 pt-2">
                    {simeg.highlights.slice(0, 4).map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {simeg.technologies.slice(0, 8).map((tech) => (
                      <span key={tech} className="tech-badge text-[11px]">
                        {tech}
                      </span>
                    ))}
                    {simeg.technologies.length > 8 && (
                      <span className="text-[11px] text-text-muted self-center ml-1">
                        +{simeg.technologies.length - 8} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      onClick={() => setSelectedProject(simeg)}
                      className="btn-primary text-sm"
                    >
                      <span>Explore Case Study & Architecture</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>

                {/* Right Architecture Preview Card */}
                <div className="lg:col-span-5">
                  <div className="p-6 rounded-2xl bg-slate-100/80 dark:bg-bg-secondary/70 border border-slate-200 dark:border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
                        <Server size={14} className="text-brand-cyan" />
                        Microservices Architecture
                      </div>
                      <span className="text-[10px] text-emerald-500 dark:text-emerald-400 font-mono font-semibold">● LIVE RUNTIME</span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-bg-primary/70 border border-brand-blue/30 flex items-center justify-between text-xs">
                        <span className="text-text-primary font-medium">API Gateway (JWT)</span>
                        <span className="text-brand-blue dark:text-brand-blue-light font-mono text-[10px]">Port: 8080</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-xl bg-white/70 dark:bg-bg-primary/50 border border-slate-200 dark:border-white/5 text-[11px]">
                          <div className="text-text-primary font-medium">RH-Manager</div>
                          <div className="text-text-muted text-[10px]">Employees, Contracts</div>
                        </div>
                        <div className="p-2 rounded-xl bg-white/70 dark:bg-bg-primary/50 border border-slate-200 dark:border-white/5 text-[11px]">
                          <div className="text-text-primary font-medium">Work-Service</div>
                          <div className="text-text-muted text-[10px]">Scrum, Tasks</div>
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-bg-primary/70 border border-brand-cyan/30 flex items-center justify-between text-xs">
                        <span className="text-text-primary font-medium flex items-center gap-1.5">
                          <Cpu size={12} className="text-brand-cyan" />
                          AI-Service (Gemini + n8n)
                        </span>
                        <span className="text-brand-cyan font-mono text-[10px]">Automations</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/70 dark:bg-bg-primary/50 border border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px] text-text-muted">
                        <span>Monitoring Stack</span>
                        <span className="text-text-secondary">Prometheus / Grafana</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* OTHER PROJECTS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                    {p.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-primary transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <GithubIcon size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <h4 className="text-xl font-display font-bold text-text-primary group-hover:text-brand-cyan transition-colors mb-1">
                  {p.name}
                </h4>
                <p className="text-xs text-brand-blue dark:text-brand-blue-light font-medium mb-3">
                  {p.subtitle}
                </p>
                <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-3">
                  {p.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 mb-5">
                  {p.highlights.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-text-muted">
                      <div className="w-1 h-1 rounded-full bg-brand-blue shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1 mb-4 pt-3 border-t border-slate-200 dark:border-white/5">
                  {p.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-bg-primary text-text-secondary dark:text-text-muted border border-slate-200 dark:border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {p.technologies.length > 4 && (
                    <span className="text-[10px] text-text-muted self-center ml-1">
                      +{p.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Open details modal */}
                <button
                  onClick={() => setSelectedProject(p)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-text-secondary hover:text-text-primary glass-card transition-colors"
                >
                  <span>{t.projects.viewDetails}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
