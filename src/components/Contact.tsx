import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { personalInfo } from '../data/cvData';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Contact() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const subjectEncoded = encodeURIComponent(`[Portfolio Contact] ${form.subject} - from ${form.name}`);
    const bodyEncoded = encodeURIComponent(
      `Hello Mahdi,\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}\n`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
    setStatus('success');
  };

  return (
    <section id="contact" className="section bg-bg-secondary/40 relative overflow-hidden transition-colors">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full blur-[140px] pointer-events-none opacity-10 bg-brand-blue" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full blur-[140px] pointer-events-none opacity-10 bg-brand-cyan" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-brand-cyan text-sm font-semibold tracking-widest uppercase mb-3">
            09 — Get in Touch
          </span>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle max-w-xl mx-auto">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-display font-bold text-text-primary mb-2">
                {t.contact.getInTouch}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {t.contact.formNote}
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 dark:bg-bg-primary/50 border border-slate-200 dark:border-white/5 text-text-secondary hover:text-text-primary transition-all text-xs"
                >
                  <Mail size={16} className="text-brand-blue shrink-0" />
                  <span className="truncate">{personalInfo.email}</span>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 dark:bg-bg-primary/50 border border-slate-200 dark:border-white/5 text-text-secondary text-xs">
                  <MapPin size={16} className="text-brand-cyan shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/5">
                <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block mb-3">
                  Direct Channels
                </span>
                <div className="flex gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-bg-primary/70 border border-slate-200 dark:border-white/5 text-xs text-text-secondary hover:text-text-primary transition-all font-medium"
                  >
                    <GithubIcon size={15} />
                    GitHub
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-bg-primary/70 border border-slate-200 dark:border-white/5 text-xs text-text-secondary hover:text-text-primary transition-all font-medium"
                  >
                    <LinkedinIcon size={15} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-6 sm:p-8 space-y-4"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-text-secondary mb-1.5">
                    {t.contact.name} *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-bg-primary/60 border ${
                      errors.name ? 'border-red-500/50' : 'border-slate-300 dark:border-white/10'
                    } text-text-primary placeholder-text-muted text-xs sm:text-sm focus:border-brand-blue focus:outline-none transition-colors`}
                  />
                  {errors.name && (
                    <span className="flex items-center gap-1 text-[11px] text-red-500 mt-1">
                      <AlertCircle size={11} /> {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-text-secondary mb-1.5">
                    {t.contact.email} *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-bg-primary/60 border ${
                      errors.email ? 'border-red-500/50' : 'border-slate-300 dark:border-white/10'
                    } text-text-primary placeholder-text-muted text-xs sm:text-sm focus:border-brand-blue focus:outline-none transition-colors`}
                  />
                  {errors.email && (
                    <span className="flex items-center gap-1 text-[11px] text-red-500 mt-1">
                      <AlertCircle size={11} /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-text-secondary mb-1.5">
                  {t.contact.subject} *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Software Engineer Role / Project Collaboration"
                  className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-bg-primary/60 border ${
                    errors.subject ? 'border-red-500/50' : 'border-slate-300 dark:border-white/10'
                  } text-text-primary placeholder-text-muted text-xs sm:text-sm focus:border-brand-blue focus:outline-none transition-colors`}
                />
                {errors.subject && (
                  <span className="flex items-center gap-1 text-[11px] text-red-500 mt-1">
                    <AlertCircle size={11} /> {errors.subject}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-text-secondary mb-1.5">
                  {t.contact.message} *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your inquiry or opportunity..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-bg-primary/60 border ${
                    errors.message ? 'border-red-500/50' : 'border-slate-300 dark:border-white/10'
                  } text-text-primary placeholder-text-muted text-xs sm:text-sm focus:border-brand-blue focus:outline-none transition-colors resize-none`}
                />
                {errors.message && (
                  <span className="flex items-center gap-1 text-[11px] text-red-500 mt-1">
                    <AlertCircle size={11} /> {errors.message}
                  </span>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="btn-primary text-xs sm:text-sm py-2.5 px-6"
                >
                  <span>{t.contact.send}</span>
                  <Send size={14} />
                </button>

                {status === 'success' && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle size={14} />
                    Email client opened!
                  </span>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
