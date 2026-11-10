import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { education } from '../data/cvData';

export default function Education() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="section bg-bg-secondary/40 relative overflow-hidden transition-colors">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-brand-cyan text-sm font-semibold tracking-widest uppercase mb-3">
            07 — Academic Path
          </span>
          <h2 className="section-title">{t.education.title}</h2>
          <p className="section-subtitle max-w-xl mx-auto">{t.education.subtitle}</p>
        </motion.div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Year & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue border border-brand-blue/20 flex items-center justify-center">
                    <GraduationCap size={20} />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <Calendar size={12} className="text-brand-cyan" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                {/* Degree & Field */}
                <h3 className="text-base font-display font-bold text-text-primary mb-1">
                  {edu.degree}
                </h3>
                <p className="text-xs text-brand-cyan font-medium mb-3">
                  {edu.field}
                </p>

                {/* School & Location */}
                <p className="text-xs text-text-secondary leading-relaxed mb-4">
                  {edu.school}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                  <MapPin size={12} />
                  <span>{edu.location}</span>
                </div>
                {edu.mention && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    <Award size={11} />
                    {edu.mention}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
