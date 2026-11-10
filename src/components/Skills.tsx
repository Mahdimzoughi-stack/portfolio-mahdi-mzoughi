import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2,
  Layers,
  Cloud,
  Database,
  Brain,
  Settings,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useLang } from '../context/LangContext';
import { skillCategories, methodologies } from '../data/cvData';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Layers,
  Cloud,
  Database,
  Brain,
  Settings,
};

export default function Skills() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories =
    activeCategory === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeCategory);

  return (
    <section id="skills" className="section relative overflow-hidden transition-colors">
      {/* Glow elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-10 bg-brand-blue" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-10 bg-brand-cyan" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-brand-cyan text-sm font-semibold tracking-widest uppercase mb-3">
            04 — Skills & Stack
          </span>
          <h2 className="section-title">{t.skills.title}</h2>
          <p className="section-subtitle max-w-xl mx-auto">{t.skills.subtitle}</p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === 'all'
                  ? 'bg-brand-blue text-white shadow-glow-blue'
                  : 'glass-card text-text-secondary hover:text-text-primary'
              }`}
            >
              All Categories
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-brand-blue text-white shadow-glow-blue'
                    : 'glass-card text-text-secondary hover:text-text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Code2;
            const isBlue = cat.color === 'brand-blue';

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-6 relative group"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isBlue ? 'bg-brand-blue/15 text-brand-blue' : 'bg-brand-cyan/15 text-brand-cyan'
                    } border border-brand-blue/20`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-text-primary text-base">
                      {cat.label}
                    </h3>
                    <span className="text-xs text-text-muted">
                      {cat.skills.length} technologies
                    </span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-bg-secondary/70 text-text-secondary border border-slate-200 dark:border-white/5 hover:border-brand-cyan/40 hover:text-text-primary transition-colors"
                    >
                      <Sparkles size={11} className={isBlue ? 'text-brand-blue' : 'text-brand-cyan'} />
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Methodologies & Agile footer bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 size={22} className="text-brand-cyan shrink-0" />
            <div>
              <h4 className="text-text-primary text-sm font-semibold">Agile Engineering & Best Practices</h4>
              <p className="text-xs text-text-muted">Clean Code · Microservices · CI/CD Pipelines · Automated Testing</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {methodologies.map((m) => (
              <span key={m} className="tech-badge">
                {m}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
