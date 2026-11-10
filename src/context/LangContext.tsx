import { createContext, useContext, useState, type ReactNode } from 'react';

type Lang = 'en' | 'fr';

interface Translations {
  nav: {
    home: string;
    about: string;
    skills: string;
    experience: string;
    projects: string;
    education: string;
    contact: string;
    downloadCV: string;
  };
  hero: {
    greeting: string;
    role1: string;
    role2: string;
    tagline: string;
    cta_projects: string;
    cta_contact: string;
    cta_cv: string;
    available: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
  };
  skills: {
    title: string;
    subtitle: string;
  };
  experience: {
    title: string;
    subtitle: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewDetails: string;
    featured: string;
    viewAll: string;
    techUsed: string;
    keyFeatures: string;
  };
  education: {
    title: string;
    subtitle: string;
  };
  certifications: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    location: string;
    sendEmail: string;
    getInTouch: string;
    formNote: string;
  };
  footer: {
    rights: string;
    builtWith: string;
  };
}

const translations: Record<Lang, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact',
      downloadCV: 'Download CV',
    },
    hero: {
      greeting: "Hi, I'm",
      role1: 'Software Engineer',
      role2: 'Full Stack Developer',
      tagline: 'Building scalable applications, intelligent solutions and modern digital experiences.',
      cta_projects: 'Explore Projects',
      cta_contact: 'Contact Me',
      cta_cv: 'Download CV',
      available: 'Open to opportunities',
    },
    about: {
      title: 'About Me',
      subtitle: 'Get to know me better',
      description: `Software Engineer graduated from ESPRIT with hands-on experience through internships and a Final Year Project at Vermeg Group, focused on developing an intelligent HR platform using microservices architecture. Expert in full-stack development, Java/Spring Boot, Angular, DevOps, and Artificial Intelligence. Seeking a software engineering role to contribute to high-impact technical projects.`,
    },
    skills: {
      title: 'Technical Skills',
      subtitle: 'Technologies and tools I work with',
    },
    experience: {
      title: 'Professional Experience',
      subtitle: 'My career journey',
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Some of my best work',
      viewDetails: 'View Details',
      featured: 'Featured',
      viewAll: 'View All Projects',
      techUsed: 'Technologies Used',
      keyFeatures: 'Key Features',
    },
    education: {
      title: 'Education',
      subtitle: 'My academic background',
    },
    certifications: {
      title: 'Certifications',
      subtitle: 'Professional credentials',
    },
    contact: {
      title: "Let's Work Together",
      subtitle: "Ready to bring your ideas to life? Let's talk.",
      name: 'Your Name',
      email: 'Your Email',
      subject: 'Subject',
      message: 'Your Message',
      send: 'Send Message',
      location: 'Location',
      sendEmail: 'Send Email',
      getInTouch: 'Get in Touch',
      formNote: 'Fill the form below — I\'ll get back to you as soon as possible.',
    },
    footer: {
      rights: 'All rights reserved.',
      builtWith: 'Built with',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      skills: 'Compétences',
      experience: 'Expérience',
      projects: 'Projets',
      education: 'Formation',
      contact: 'Contact',
      downloadCV: 'Télécharger CV',
    },
    hero: {
      greeting: 'Bonjour, je suis',
      role1: 'Ingénieur Logiciel',
      role2: 'Développeur Full Stack',
      tagline: "Construire des applications évolutives, des solutions intelligentes et des expériences numériques modernes.",
      cta_projects: 'Voir les Projets',
      cta_contact: 'Me Contacter',
      cta_cv: 'Télécharger CV',
      available: 'Disponible pour des opportunités',
    },
    about: {
      title: 'À Propos',
      subtitle: 'Mieux me connaître',
      description: `Ingénieur diplômé en Génie Logiciel de l'ESPRIT, avec une expérience concrète acquise au travers de stages en entreprise et d'un Projet de Fin d'Études réalisé chez Vermeg Group, portant sur le développement d'une plateforme RH intelligente en architecture microservices. Expert en développement full-stack, Java/Spring Boot, Angular, DevOps et Intelligence Artificielle. À la recherche d'un poste d'ingénieur logiciel pour contribuer à des projets techniques à fort impact.`,
    },
    skills: {
      title: 'Compétences Techniques',
      subtitle: 'Technologies et outils que j\'utilise',
    },
    experience: {
      title: 'Expériences Professionnelles',
      subtitle: 'Mon parcours professionnel',
    },
    projects: {
      title: 'Projets Phares',
      subtitle: 'Quelques-uns de mes meilleurs travaux',
      viewDetails: 'Voir Détails',
      featured: 'Mis en avant',
      viewAll: 'Voir Tous les Projets',
      techUsed: 'Technologies Utilisées',
      keyFeatures: 'Fonctionnalités Clés',
    },
    education: {
      title: 'Formation',
      subtitle: 'Mon parcours académique',
    },
    certifications: {
      title: 'Certifications',
      subtitle: 'Mes accréditations professionnelles',
    },
    contact: {
      title: 'Travaillons Ensemble',
      subtitle: 'Prêt à donner vie à vos idées ? Parlons-en.',
      name: 'Votre Nom',
      email: 'Votre Email',
      subject: 'Sujet',
      message: 'Votre Message',
      send: 'Envoyer',
      location: 'Localisation',
      sendEmail: 'Envoyer un Email',
      getInTouch: 'Me Contacter',
      formNote: 'Remplissez le formulaire ci-dessous — je vous répondrai dans les plus brefs délais.',
    },
    footer: {
      rights: 'Tous droits réservés.',
      builtWith: 'Réalisé avec',
    },
  },
};

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be inside LangProvider');
  return ctx;
}
