import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Server,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Cpu,
} from 'lucide-react';
import type { Project } from '../data/cvData';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl p-6 sm:p-8 border border-brand-blue/30 shadow-2xl z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-text-muted hover:text-text-primary glass-card transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="mb-6 pr-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-blue/15 text-brand-blue dark:text-brand-blue-light border border-brand-blue/30 flex items-center gap-1">
                  <Sparkles size={11} />
                  PFE Flagship
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary">
              {project.name}
            </h2>
            <p className="text-sm sm:text-base text-text-secondary mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-slate-200 dark:border-white/5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs sm:text-sm py-2 px-4"
              >
                <GithubIcon size={15} />
                Repository
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs sm:text-sm py-2 px-4"
              >
                <ExternalLink size={15} />
                Live Demo
              </a>
            )}
          </div>

          {/* Body Sections */}
          <div className="space-y-8">
            {/* 1. Overview */}
            <div>
              <h3 className="text-base font-semibold text-text-primary mb-2 flex items-center gap-2">
                <Layers size={18} className="text-brand-cyan" />
                1. Project Overview
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* 2 & 3. Problem Statement & Solution */}
            {(project.problem || project.solution) && (
              <div className="grid sm:grid-cols-2 gap-4">
                {project.problem && (
                  <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                    <h4 className="text-sm font-semibold text-red-500 dark:text-red-300 mb-2 flex items-center gap-2">
                      <AlertCircle size={15} />
                      2. Problem Statement
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div className="p-4 rounded-xl bg-brand-cyan/5 border border-brand-cyan/20">
                    <h4 className="text-sm font-semibold text-brand-cyan mb-2 flex items-center gap-2">
                      <Lightbulb size={15} />
                      3. Solution
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 4. Architecture (SIMEG) */}
            {project.architecture && (
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <Server size={18} className="text-brand-blue dark:text-brand-blue-light" />
                  4. Microservices Architecture
                </h3>
                <p className="text-xs text-text-muted mb-4">
                  {project.architecture.overview}
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {project.architecture.components.map((comp, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-100 dark:bg-bg-secondary/60 border border-slate-200 dark:border-white/5"
                    >
                      <div className="flex items-center gap-1.5 font-semibold text-xs text-brand-cyan mb-1">
                        <Cpu size={13} />
                        {comp.name}
                      </div>
                      <p className="text-[11px] text-text-secondary">{comp.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Technologies */}
            <div>
              <h3 className="text-base font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-brand-cyan" />
                5. Technologies & Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="tech-badge text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 6. Key Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-brand-blue dark:text-brand-blue-light" />
                  6. Key Features
                </h3>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. Screenshots preview */}
            <div>
              <h3 className="text-base font-semibold text-text-primary mb-3">
                7. Interface & Visual Preview
              </h3>
              <div className="p-8 rounded-xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-bg-secondary/40 text-center flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-cyan">
                  <Layers size={24} />
                </div>
                <div className="text-xs text-text-muted">
                  Interactive UI & Modules preview configured for {project.name}.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
