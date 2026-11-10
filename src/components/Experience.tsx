import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { experiences } from '../data/cvData';

export default function Experience() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section bg-bg-secondary/40 relative overflow-hidden transition-colors">
      {/* Background glow */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-10 bg-brand-blue" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-10 bg-brand-cyan" />

      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-brand-cyan text-sm font-semibold tracking-widest uppercase mb-3">
            05 — Career Timeline
          </span>
          <h2 className="section-title">{t.experience.title}</h2>
          <p className="section-subtitle max-w-xl mx-auto">{t.experience.subtitle}</p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative pl-6 sm:pl-8 md:pl-0">
          {/* Vertical central line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 timeline-line" />
          {/* Vertical left line (mobile) */}
          <div className="md:hidden absolute left-2 sm:left-3 top-0 bottom-0 w-0.5 timeline-line" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline node icon */}
                  <div className="absolute left-[-22px] sm:left-[-18px] md:left-1/2 md:-translate-x-1/2 w-9 h-9 rounded-full bg-white dark:bg-bg-primary border-2 border-brand-cyan flex items-center justify-center z-10 shadow-glow-cyan">
                    <Briefcase size={14} className="text-brand-cyan" />
                  </div>

                  {/* Spacer for alternate layout */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className={`w-full md:w-1/2 ${
                      isEven ? 'md:pr-10' : 'md:pl-10'
                    }`}
                  >
                    <div className="glass-card rounded-2xl p-6 transition-all group">
                      {/* Top Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-blue/15 text-brand-blue dark:text-brand-blue-light border border-brand-blue/30">
                          {exp.type}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <Calendar size={13} className="text-brand-cyan" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* Title & Company */}
                      <h3 className="text-lg font-display font-bold text-text-primary group-hover:text-brand-cyan transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-brand-blue dark:text-brand-blue-light font-medium mt-1 mb-4">
                        <span>{exp.company}</span>
                        <span className="text-text-muted">•</span>
                        <div className="flex items-center gap-1 text-text-muted text-xs">
                          <MapPin size={12} />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Bullet points */}
                      <ul className="space-y-2 mb-5">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary leading-relaxed">
                            <CheckCircle size={14} className="text-brand-cyan shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200 dark:border-white/5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-bg-primary text-text-secondary dark:text-text-muted border border-slate-200 dark:border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
