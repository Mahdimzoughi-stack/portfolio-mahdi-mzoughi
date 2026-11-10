import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { LangProvider } from './context/LangContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

function PortfolioContent() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-brand-blue/30 selection:text-white transition-colors duration-300">
      {/* Navigation with Theme & Lang controls */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-brand-blue hover:bg-brand-blue-light text-white shadow-glow-blue transition-all duration-300 hover:scale-105"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <PortfolioContent />
      </LangProvider>
    </ThemeProvider>
  );
}
