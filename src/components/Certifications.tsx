import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Calendar, CheckCircle2, Cpu } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { certifications } from '../data/cvData';

export default function Certifications() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" className="section relative overflow-hidden transition-colors">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-brand-cyan text-sm font-semibold tracking-widest uppercase mb-3">
            08 — Accreditations
          </span>
          <h2 className="section-title">{t.certifications.title}</h2>
          <p className="section-subtitle max-w-xl mx-auto">{t.certifications.subtitle}</p>
        </motion.div>

        <div className="grid gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-card rounded-2xl p-6 sm:p-8 border border-emerald-500/20 relative overflow-hidden"
            >
              {/* Decorative background badge */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Award size={24} />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-0.5">
                      <Cpu size={12} />
                      {cert.issuer}
                    </span>
                    <h3 className="text-xl font-display font-bold text-text-primary">
                      {cert.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-text-muted px-3 py-1 rounded-full bg-slate-100 dark:bg-bg-secondary border border-slate-200 dark:border-white/5">
                  <Calendar size={13} className="text-brand-cyan" />
                  <span>{cert.date}</span>
                </div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {cert.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 size={15} />
                <span>Verified Credential — NVIDIA Deep Learning Institute</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
