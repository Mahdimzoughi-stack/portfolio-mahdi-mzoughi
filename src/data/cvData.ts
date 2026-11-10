// ============================================================
// CENTRALIZED CV DATA — All personal info goes here
// Easy to update: edit this file only
// ============================================================

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  highlights: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  category: string;
  architecture?: {
    overview: string;
    components: { name: string; desc: string }[];
  };
  features?: string[];
  problem?: string;
  solution?: string;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  school: string;
  location: string;
  period: string;
  mention?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
  badge?: string;
}

// ============================================================
// PERSONAL INFO
// ============================================================
export const personalInfo = {
  name: 'Mahdi Mzoughi',
  title: 'Software Engineer',
  subtitle: 'Full Stack Developer',
  tagline: 'Building scalable applications, intelligent solutions and modern digital experiences.',
  location: 'Ariana, Tunisia',
  email: 'Mahdibenammor@gmail.com',
  phone: '+216 94 149 195',
  github: 'https://github.com/Mahdimzoughi-stack',
  linkedin: 'https://www.linkedin.com/in/mahdi-mzoughi-508314365/',
  cv: '/CV_Mahdi_Mzoughi.pdf',
  avatar: '/profile.jpg',
  availableForWork: true,
};

// ============================================================
// ABOUT / PROFILE
// ============================================================
export const profile = {
  en: `Software Engineer graduated from ESPRIT with hands-on experience through internships and a Final Year Project at Vermeg Group, focused on developing an intelligent HR platform using microservices architecture. Expert in full-stack development, Java/Spring Boot, Angular, DevOps, and Artificial Intelligence. Seeking a software engineering role to contribute to high-impact technical projects.`,
  fr: `Ingénieur diplômé en Génie Logiciel de l'ESPRIT, avec une expérience concrète acquise au travers de stages en entreprise et d'un Projet de Fin d'Études réalisé chez Vermeg Group, portant sur le développement d'une plateforme RH intelligente en architecture microservices. Expert en développement full-stack, Java/Spring Boot, Angular, DevOps et Intelligence Artificielle.`,
  highlights: [
    { label: 'Specialization', value: 'Full Stack & Microservices' },
    { label: 'Education', value: 'Software Engineering, ESPRIT' },
    { label: 'Focus', value: 'Java · Angular · AI · DevOps' },
    { label: 'Status', value: 'Open to opportunities' },
  ],
};

// ============================================================
// SKILLS
// ============================================================
export const skillCategories = [
  {
    id: 'languages',
    label: 'Programming Languages',
    icon: 'Code2',
    color: 'brand-blue',
    skills: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'HTML', 'CSS'],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & Libraries',
    icon: 'Layers',
    color: 'brand-cyan',
    skills: ['Spring Boot', 'Angular', '.NET', 'Symfony', 'Laravel', 'React'],
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    icon: 'Cloud',
    color: 'brand-blue',
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Git', 'GitLab', 'Linux'],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: 'Database',
    color: 'brand-cyan',
    skills: ['MySQL', 'MongoDB', 'Redis', 'Firebase'],
  },
  {
    id: 'ai',
    label: 'AI & Integration',
    icon: 'Brain',
    color: 'brand-blue',
    skills: ['Google Gemini API', 'n8n', 'Machine Learning'],
  },
  {
    id: 'tools',
    label: 'Tools & Monitoring',
    icon: 'Settings',
    color: 'brand-cyan',
    skills: ['Prometheus', 'Grafana', 'Postman', 'Jira', 'Scrum', 'Kanban'],
  },
];

// ============================================================
// EXPERIENCE
// ============================================================
export const experiences: Experience[] = [
  {
    id: 'vermeg',
    role: 'Final Year Project (PFE)',
    company: 'Vermeg Group',
    location: 'Tunis, Tunisia',
    period: '2026 – 2027',
    type: 'Final Year Project',
    description: [
      'Designed and developed SIMEG — an intelligent full-stack HR platform using microservices architecture (Java 17 / Spring Boot 3 / Angular 17).',
      'Distributed architecture: JWT Gateway, HR-Manager (employees, contracts, leaves), Work-Service (Scrum projects/tasks), AI-Service — deployed via Docker & Kubernetes.',
      'Integrated a conversational AI assistant powered by Google Gemini, orchestrated with n8n for Gmail/Slack notifications and HR reporting automation.',
      'Set up CI/CD pipeline with Jenkins, monitoring via Prometheus & Grafana, RBAC permission matrix, and comprehensive unit/integration testing.',
    ],
    technologies: ['Java 17', 'Spring Boot 3', 'Angular 17', 'MySQL', 'Redis', 'Docker', 'Kubernetes', 'Jenkins', 'Google Gemini', 'n8n', 'Prometheus', 'Grafana'],
  },
  {
    id: 'btl',
    role: 'Backend Developer Intern',
    company: 'BTL',
    location: 'Tunis, Tunisia',
    period: '2025',
    type: 'Summer Internship',
    description: [
      'Developed a secure RESTful API for centralization and evaluation of risk events using Laravel and MySQL.',
      'Implemented JWT authentication, data validation, and unit testing.',
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'JWT', 'REST API'],
  },
  {
    id: 'stb',
    role: 'API Developer Intern',
    company: 'STB',
    location: 'Tunis, Tunisia',
    period: '2024',
    type: 'Summer Internship',
    description: [
      'Designed and integrated RESTful APIs compliant with the Open Bank Project standard.',
      'Collaborated in an agile Scrum team with code review and unit testing.',
    ],
    technologies: ['REST API', 'Open Bank Project', 'Scrum', 'Unit Testing'],
  },
  {
    id: 'sagemcom',
    role: 'End-of-License Internship',
    company: 'SAGEMCOM',
    location: 'Tunis, Tunisia',
    period: '2023',
    type: 'License Final Project',
    description: [
      'Developed an intelligent humidity and temperature control system on a CMS production line.',
    ],
    technologies: ['Embedded Systems', 'CMS', 'IoT', 'C'],
  },
];

// ============================================================
// PROJECTS
// ============================================================
export const projects: Project[] = [
  {
    id: 'simeg',
    name: 'SIMEG',
    subtitle: 'Intelligent HR Management Platform',
    description: 'A comprehensive microservices-based HR platform with AI capabilities, real-time collaboration, and advanced DevOps pipeline.',
    longDescription: `SIMEG (Système Intégré de Management et d'Engagement Global) is an enterprise-grade HR management platform developed as a Final Year Project at Vermeg Group. It leverages microservices architecture, AI integration, and modern DevOps practices to deliver a comprehensive solution for HR operations.`,
    technologies: ['Java 17', 'Spring Boot 3', 'Angular 17', 'MySQL', 'Redis', 'Docker', 'Kubernetes', 'Jenkins', 'Google Gemini AI', 'n8n', 'Prometheus', 'Grafana', 'JWT', 'WebSocket'],
    highlights: [
      'Microservices architecture with API Gateway',
      'AI-powered conversational assistant (Google Gemini)',
      'Real-time collaborative chat (WebSocket)',
      'CI/CD pipeline with Jenkins',
      'Monitoring with Prometheus & Grafana',
      'RBAC permission matrix',
      'n8n workflow automation',
    ],
    featured: true,
    category: 'Full Stack / AI',
    problem: 'Traditional HR systems lack integration between workforce management, project tracking, and AI-driven insights, forcing teams to use disconnected tools.',
    solution: 'SIMEG unifies HR management, project/task tracking, leave management, 360° feedback, real-time collaboration, and AI-powered analytics in a single microservices platform.',
    architecture: {
      overview: 'Distributed microservices architecture with JWT-secured API Gateway, containerized with Docker and orchestrated with Kubernetes.',
      components: [
        { name: 'API Gateway', desc: 'JWT authentication, request routing, rate limiting' },
        { name: 'RH-Manager Service', desc: 'Employee profiles, contracts, leaves, payroll' },
        { name: 'Work-Service', desc: 'Scrum projects, tasks, sprints, Kanban boards' },
        { name: 'AI-Service', desc: 'Google Gemini integration, predictive analytics, chatbot' },
        { name: 'Notification Service', desc: 'n8n orchestration, Gmail/Slack automation' },
        { name: 'Monitoring Stack', desc: 'Prometheus metrics collection, Grafana dashboards' },
      ],
    },
    features: [
      'Employee management & contract tracking',
      'Project & task management (Scrum/Kanban)',
      'Leave management & approvals workflow',
      '360° feedback system',
      'Real-time collaborative chat',
      'KPI dashboards & analytics',
      'AI prediction & conversational assistant',
      'Automated HR reporting via n8n',
    ],
  },
  {
    id: 'timeforge',
    name: 'TimeForge',
    subtitle: 'Collaborative Time Management App',
    description: 'A collaborative workspace application for time management with projects, tasks, notifications, goals and gamification rewards.',
    longDescription: 'TimeForge is a collaborative time management platform that enables teams to manage workspaces, projects, tasks, goals and track productivity with a rewards system.',
    technologies: ['Spring Boot', 'Angular', 'MongoDB', 'WebSocket', 'REST API'],
    highlights: [
      'Multi-workspace collaborative environment',
      'Project & task management',
      'Goal tracking with gamification',
      'Real-time notifications',
      'Team collaboration features',
    ],
    featured: true,
    category: 'Full Stack',
    github: 'https://github.com/Mahdimzoughi-stack',
  },
  {
    id: 'jobseeker',
    name: 'JobSeeker',
    subtitle: 'Recruitment Platform',
    description: 'A recruitment platform connecting talents with companies, featuring job listings, applications management and profile matching.',
    longDescription: 'JobSeeker bridges the gap between job seekers and employers with a full-featured recruitment platform built on Symfony/PHP.',
    technologies: ['Symfony', 'PHP', 'MySQL', 'REST API', 'Bootstrap'],
    highlights: [
      'Talent-company matching',
      'Job offer management',
      'Application tracking system',
      'User profile management',
    ],
    featured: false,
    category: 'Full Stack',
    github: 'https://github.com/Mahdimzoughi-stack',
  },
  {
    id: 'blood-establishments',
    name: 'Blood Establishments Management',
    subtitle: 'Desktop Application',
    description: 'Desktop application for managing blood bank establishments, donor records, blood stocks, and transfusion requests.',
    longDescription: 'A desktop application built with C and Glade on Ubuntu for managing blood bank establishments, including donor management, stock tracking, and demand handling.',
    technologies: ['C', 'Glade', 'Ubuntu', 'GTK', 'SQLite'],
    highlights: [
      'Blood stock management',
      'Donor record system',
      'Transfusion request tracking',
      'Desktop GUI with Glade/GTK',
    ],
    featured: false,
    category: 'Desktop',
    github: 'https://github.com/Mahdimzoughi-stack',
  },
];

// ============================================================
// EDUCATION
// ============================================================
export const education: Education[] = [
  {
    id: 'esprit',
    degree: "Engineering Cycle",
    field: 'Software Engineering (Génie Logiciel)',
    school: 'ESPRIT — École Supérieure Privée d\'Ingénierie et de Technologies',
    location: 'Tunis, Tunisia',
    period: '2024 – 2027',
  },
  {
    id: 'iset',
    degree: 'Applied License',
    field: 'Electrical Engineering (Génie Électrique)',
    school: 'Institut Supérieur des Études Technologiques de Béja',
    location: 'Béja, Tunisia',
    period: '2020 – 2023',
  },
  {
    id: 'lycee',
    degree: 'Baccalauréat',
    field: 'Technical Section',
    school: 'Lycée Ibn Zaydoun, Testour',
    location: 'Testour, Tunisia',
    period: '2020',
    mention: 'Mention Bien',
  },
];

// ============================================================
// CERTIFICATIONS
// ============================================================
export const certifications: Certification[] = [
  {
    id: 'nvidia-dl',
    name: 'Fundamentals of Deep Learning',
    issuer: 'NVIDIA',
    date: 'March 2025',
    description: 'Mastery of Deep Learning fundamentals: neural networks, optimization, CNNs, and model deployment.',
  },
];

// ============================================================
// SOFT SKILLS & LANGUAGES
// ============================================================
export const softSkills = ['Teamwork', 'Adaptability', 'Time Management', 'Initiative'];
export const methodologies = ['Scrum', 'Kanban', 'Jira', 'ClickUp'];
export const languages = [
  { lang: 'Arabic', level: 'Native' },
  { lang: 'French', level: 'Advanced' },
  { lang: 'English', level: 'Intermediate' },
];
