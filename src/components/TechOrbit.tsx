import { useState } from 'react';
import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  color: string;
  glow: string;
  orbit: 'inner' | 'middle' | 'outer';
  angle: number; // in degrees
  icon: (props: { size?: number }) => React.JSX.Element;
}

// ==========================================
// ACCURATE VECTOR TECH ICONS
// ==========================================
function JavaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M8.5 17c3.5.5 6-.5 8.5-2M7 19.5c5 .8 10 0 13-1.5M10 22c3.5.5 6-.5 8-1"
        stroke="#E76F00"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14 2c-1.5 2-1 3.5 1 5.5s1 3.5-1 5.5M10.5 4c-1 1.8-.7 3.2.7 5s.7 3.2-.7 5"
        stroke="#5382A1"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpringIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#6DB33F" strokeWidth="2" />
      <path
        d="M12 6v6l4-2"
        stroke="#6DB33F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 9.5a5 5 0 0 0 7.5 4.5"
        stroke="#6DB33F"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AngularIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L3 5.5l1.5 12L12 22l7.5-4.5L21 5.5 12 2z"
        stroke="#DD0031"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 6.5l-4 9h2.2l.8-2h4l.8 2H16l-4-9zm-1.1 5.5l1.1-2.8 1.1 2.8h-2.2z"
        fill="#DD0031"
      />
    </svg>
  );
}

function DockerIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="11" width="3" height="2.5" rx="0.5" fill="#2496ED" />
      <rect x="5.5" y="11" width="3" height="2.5" rx="0.5" fill="#2496ED" />
      <rect x="9" y="11" width="3" height="2.5" rx="0.5" fill="#2496ED" />
      <rect x="5.5" y="8" width="3" height="2.5" rx="0.5" fill="#2496ED" />
      <rect x="9" y="8" width="3" height="2.5" rx="0.5" fill="#2496ED" />
      <rect x="12.5" y="8" width="3" height="2.5" rx="0.5" fill="#2496ED" />
      <path
        d="M2 13.5c1.5 5 6.5 6.5 12 6.5s8-2.5 8-5.5c-1 0-2.5-.5-3.5-1.5 1-1.5.5-3.5-.5-4-1 1-2.5 1-3.5.5C14 8 13.5 6 12 5.5c-.5 2-1 4-3 4.5H2v3.5z"
        stroke="#2496ED"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function TypeScriptIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#3178C6" fillOpacity="0.2" stroke="#3178C6" strokeWidth="1.5" />
      <text x="12" y="16" fill="#3178C6" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        TS
      </text>
    </svg>
  );
}

function JavaScriptIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#F7DF1E" fillOpacity="0.2" stroke="#F7DF1E" strokeWidth="1.5" />
      <text x="12" y="16" fill="#F7DF1E" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        JS
      </text>
    </svg>
  );
}

function PythonIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M11.8 3c-4.2 0-3.9 1.8-3.9 1.8l.1 1.9h4v.6H6.3S3 7 3 11.3s2.9 4.1 2.9 4.1h1.7v-2.4s-.1-2.9 2.8-2.9h4.9s2.7.1 2.7-2.6V5.6s.4-2.6-6.2-2.6zm-1.8 1.4a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z"
        fill="#387EB8"
      />
      <path
        d="M12.2 21c4.2 0 3.9-1.8 3.9-1.8l-.1-1.9h-4v-.6h5.7s3.3.3 3.3-4-2.9-4.1-2.9-4.1h-1.7v2.4s.1 2.9-2.8 2.9H8.7s-2.7-.1-2.7 2.6v1.9s-.4 2.6 6.2 2.6zm1.8-1.4a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z"
        fill="#FFE873"
      />
    </svg>
  );
}

function GitIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M21.5 10.7l-8.2-8.2a1.8 1.8 0 0 0-2.6 0L8.4 4.8l3.3 3.3a2.2 2.2 0 0 1 2.7 2.7l3.2 3.2a2.1 2.1 0 1 1-1.3 1.3l-3-3a2.2 2.2 0 0 1-2.5-.5 2.2 2.2 0 0 1-.5-2.5L7 6.2 2.5 10.7a1.8 1.8 0 0 0 0 2.6l8.2 8.2c.7.7 1.9.7 2.6 0l8.2-8.2a1.8 1.8 0 0 0 0-2.6z"
        fill="#F05032"
      />
    </svg>
  );
}

function LaravelIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 8l8-4 8 4v8l-8 4-8-4V8z"
        stroke="#FF2D20"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 4v16M4 8l8 4 8-4" stroke="#FF2D20" strokeWidth="1.6" />
    </svg>
  );
}

function SymfonyIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9.5" stroke="#E0E0E0" strokeWidth="1.5" />
      <text x="12" y="16.5" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontStyle="italic" textAnchor="middle" fontFamily="serif">
        sf
      </text>
    </svg>
  );
}

function GrafanaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#F46800" strokeWidth="1.8" />
      <path
        d="M12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"
        fill="#F46800"
      />
    </svg>
  );
}

function MongoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C12 2 7 8 7 13.5c0 3.2 2.2 5.5 5 6.5 2.8-1 5-3.3 5-6.5C17 8 12 2 12 2z"
        stroke="#47A248"
        strokeWidth="1.6"
        fill="#47A248"
        fillOpacity="0.25"
      />
      <path d="M12 2v18" stroke="#47A248" strokeWidth="1.4" />
    </svg>
  );
}

function MySQLIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#00758F" fillOpacity="0.2" stroke="#00758F" strokeWidth="1.5" />
      <path
        d="M6 16V8l3 4 3-4v8M15 16h3M15 8h3v4h-3"
        stroke="#F29111"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function JenkinsIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#D33833" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="3" fill="#D33833" fillOpacity="0.3" stroke="#D33833" strokeWidth="1.2" />
      <path d="M7 19c1-3 3-4 5-4s4 1 5 4" stroke="#D33833" strokeWidth="1.4" />
    </svg>
  );
}

// ==========================================
// ORBIT ITEMS CONFIGURATION
// ==========================================
const TECH_NODES: TechItem[] = [
  // INNER ORBIT (Core Stack)
  { name: 'Java', color: '#E76F00', glow: 'rgba(231,111,0,0.5)', orbit: 'inner', angle: 0, icon: JavaIcon },
  { name: 'Spring Boot', color: '#6DB33F', glow: 'rgba(109,179,63,0.5)', orbit: 'inner', angle: 90, icon: SpringIcon },
  { name: 'Angular', color: '#DD0031', glow: 'rgba(221,0,49,0.5)', orbit: 'inner', angle: 180, icon: AngularIcon },
  { name: 'Docker', color: '#2496ED', glow: 'rgba(36,150,237,0.5)', orbit: 'inner', angle: 270, icon: DockerIcon },

  // MIDDLE ORBIT (Ecosystem & Frameworks)
  { name: 'TypeScript', color: '#3178C6', glow: 'rgba(49,120,198,0.45)', orbit: 'middle', angle: 30, icon: TypeScriptIcon },
  { name: 'Laravel', color: '#FF2D20', glow: 'rgba(255,45,32,0.45)', orbit: 'middle', angle: 105, icon: LaravelIcon },
  { name: 'Git', color: '#F05032', glow: 'rgba(240,80,50,0.45)', orbit: 'middle', angle: 180, icon: GitIcon },
  { name: 'Symfony', color: '#FFFFFF', glow: 'rgba(255,255,255,0.4)', orbit: 'middle', angle: 240, icon: SymfonyIcon },
  { name: 'Grafana', color: '#F46800', glow: 'rgba(244,104,0,0.45)', orbit: 'middle', angle: 310, icon: GrafanaIcon },

  // OUTER ORBIT (Tools & Databases)
  { name: 'JavaScript', color: '#F7DF1E', glow: 'rgba(247,223,30,0.4)', orbit: 'outer', angle: 20, icon: JavaScriptIcon },
  { name: 'Python', color: '#387EB8', glow: 'rgba(56,126,184,0.45)', orbit: 'outer', angle: 80, icon: PythonIcon },
  { name: 'MongoDB', color: '#47A248', glow: 'rgba(71,162,72,0.45)', orbit: 'outer', angle: 140, icon: MongoIcon },
  { name: 'Jenkins', color: '#D33833', glow: 'rgba(211,56,51,0.45)', orbit: 'outer', angle: 210, icon: JenkinsIcon },
  { name: 'MySQL', color: '#00758F', glow: 'rgba(0,117,143,0.45)', orbit: 'outer', angle: 320, icon: MySQLIcon },
];

export default function TechOrbit() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Orbit radius settings in px (scaled for responsiveness)
  const RADIUS = {
    inner: 95,
    middle: 155,
    outer: 215,
  };

  // Rotation speeds (seconds per full rotation)
  const DURATION = {
    inner: 28,
    middle: 42,
    outer: 60,
  };

  return (
    <div
      className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Matrix Radial Halo (Emerald/Cyan Cyber Glow) */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.18) 0%, rgba(6, 182, 212, 0.08) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Orbit Rings (Subtle Dotted / Dashed Ellipses) */}
      <div
        className="absolute rounded-full border border-emerald-500/25 dark:border-emerald-400/20 pointer-events-none"
        style={{ width: RADIUS.inner * 2, height: RADIUS.inner * 2 }}
      />
      <div
        className="absolute rounded-full border border-dashed border-emerald-500/20 dark:border-cyan-500/20 pointer-events-none"
        style={{ width: RADIUS.middle * 2, height: RADIUS.middle * 2 }}
      />
      <div
        className="absolute rounded-full border border-emerald-500/15 dark:border-slate-700/60 pointer-events-none"
        style={{ width: RADIUS.outer * 2, height: RADIUS.outer * 2 }}
      />

      {/* ======================================================== */}
      {/* INNER ORBIT LAYER */}
      {/* ======================================================== */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: isPaused ? undefined : 360 }}
        transition={{ duration: DURATION.inner, repeat: Infinity, ease: 'linear' }}
      >
        {TECH_NODES.filter((n) => n.orbit === 'inner').map((tech) => {
          const rad = (tech.angle * Math.PI) / 180;
          const x = Math.cos(rad) * RADIUS.inner;
          const y = Math.sin(rad) * RADIUS.inner;

          return (
            <div
              key={tech.name}
              className="absolute pointer-events-auto"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              {/* Counter-rotation keeps icon always upright */}
              <motion.div
                animate={{ rotate: isPaused ? undefined : -360 }}
                transition={{ duration: DURATION.inner, repeat: Infinity, ease: 'linear' }}
                whileHover={{ scale: 1.25 }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div
                  className="w-10 h-10 rounded-xl bg-slate-900/90 dark:bg-black/85 backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-300"
                  style={{
                    border: `1.5px solid ${tech.color}55`,
                    boxShadow: hoveredTech === tech.name ? `0 0 16px ${tech.glow}` : `0 0 6px ${tech.color}22`,
                  }}
                >
                  <tech.icon size={20} />
                </div>

                {/* Hover Tooltip */}
                {hoveredTech === tech.name && (
                  <div
                    className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-mono font-semibold text-white whitespace-nowrap pointer-events-none z-30"
                    style={{ background: tech.color }}
                  >
                    {tech.name}
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* ======================================================== */}
      {/* MIDDLE ORBIT LAYER (Counter-clockwise for dynamic physics) */}
      {/* ======================================================== */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: isPaused ? undefined : -360 }}
        transition={{ duration: DURATION.middle, repeat: Infinity, ease: 'linear' }}
      >
        {TECH_NODES.filter((n) => n.orbit === 'middle').map((tech) => {
          const rad = (tech.angle * Math.PI) / 180;
          const x = Math.cos(rad) * RADIUS.middle;
          const y = Math.sin(rad) * RADIUS.middle;

          return (
            <div
              key={tech.name}
              className="absolute pointer-events-auto"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <motion.div
                animate={{ rotate: isPaused ? undefined : 360 }}
                transition={{ duration: DURATION.middle, repeat: Infinity, ease: 'linear' }}
                whileHover={{ scale: 1.25 }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div
                  className="w-9 h-9 rounded-xl bg-slate-900/90 dark:bg-black/85 backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-300"
                  style={{
                    border: `1.5px solid ${tech.color}44`,
                    boxShadow: hoveredTech === tech.name ? `0 0 14px ${tech.glow}` : `0 0 5px ${tech.color}15`,
                  }}
                >
                  <tech.icon size={18} />
                </div>

                {hoveredTech === tech.name && (
                  <div
                    className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-mono font-semibold text-white whitespace-nowrap pointer-events-none z-30"
                    style={{ background: tech.color }}
                  >
                    {tech.name}
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* ======================================================== */}
      {/* OUTER ORBIT LAYER */}
      {/* ======================================================== */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: isPaused ? undefined : 360 }}
        transition={{ duration: DURATION.outer, repeat: Infinity, ease: 'linear' }}
      >
        {TECH_NODES.filter((n) => n.orbit === 'outer').map((tech) => {
          const rad = (tech.angle * Math.PI) / 180;
          const x = Math.cos(rad) * RADIUS.outer;
          const y = Math.sin(rad) * RADIUS.outer;

          return (
            <div
              key={tech.name}
              className="absolute pointer-events-auto"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <motion.div
                animate={{ rotate: isPaused ? undefined : -360 }}
                transition={{ duration: DURATION.outer, repeat: Infinity, ease: 'linear' }}
                whileHover={{ scale: 1.25 }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div
                  className="w-8 h-8 rounded-lg bg-slate-900/90 dark:bg-black/85 backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-300"
                  style={{
                    border: `1.5px solid ${tech.color}35`,
                    boxShadow: hoveredTech === tech.name ? `0 0 12px ${tech.glow}` : `0 0 4px ${tech.color}10`,
                  }}
                >
                  <tech.icon size={16} />
                </div>

                {hoveredTech === tech.name && (
                  <div
                    className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-mono font-semibold text-white whitespace-nowrap pointer-events-none z-30"
                    style={{ background: tech.color }}
                  >
                    {tech.name}
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* ======================================================== */}
      {/* CENTERPIECE: MM GLOWING AVATAR WITH BLINKING TERMINAL CURSOR */}
      {/* ======================================================== */}
      <div className="relative z-20 flex flex-col items-center">
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(16, 185, 129, 0.35)',
              '0 0 35px rgba(16, 185, 129, 0.65)',
              '0 0 20px rgba(16, 185, 129, 0.35)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-950/95 dark:bg-black border-2 border-emerald-500/80 flex items-center justify-center shadow-2xl backdrop-blur-xl relative"
        >
          {/* Animated concentric pulse ring */}
          <span className="absolute inset-0 rounded-full border border-emerald-400/40 animate-ping opacity-25" />

          {/* Initials with terminal cursor */}
          <div className="flex items-center text-white font-mono font-extrabold text-2xl sm:text-3xl tracking-wider">
            <span>MM</span>
            <span className="w-2.5 h-6 bg-emerald-400 inline-block ml-1 animate-pulse" />
          </div>
        </motion.div>

        {/* Attached "open to work" neon pill */}
        <div className="mt-[-12px] z-30">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/90 border border-emerald-500/60 shadow-lg shadow-emerald-500/20 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            open to work
          </span>
        </div>
      </div>
    </div>
  );
}

