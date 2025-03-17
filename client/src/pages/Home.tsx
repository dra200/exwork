import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PAGE_TRANSITION, SECTION_IDS } from "@/lib/constants";

type SectionType = 'hero' | 'about' | 'services' | 'testimonials' | 'cta' | 'contact';

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionType>('hero');
  const [direction, setDirection] = useState(0);

  // Navigation controls
  const goToSection = (section: SectionType) => {
    const sectionOrder: SectionType[] = ['hero', 'about', 'services', 'testimonials', 'cta', 'contact'];
    const currentIndex = sectionOrder.indexOf(activeSection);
    const nextIndex = sectionOrder.indexOf(section);
    
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setActiveSection(section);
  };

  const goToNextSection = () => {
    const sectionOrder: SectionType[] = ['hero', 'about', 'services', 'testimonials', 'cta', 'contact'];
    const currentIndex = sectionOrder.indexOf(activeSection);
    
    if (currentIndex < sectionOrder.length - 1) {
      setDirection(1);
      setActiveSection(sectionOrder[currentIndex + 1]);
    }
  };

  const goToPrevSection = () => {
    const sectionOrder: SectionType[] = ['hero', 'about', 'services', 'testimonials', 'cta', 'contact'];
    const currentIndex = sectionOrder.indexOf(activeSection);
    
    if (currentIndex > 0) {
      setDirection(-1);
      setActiveSection(sectionOrder[currentIndex - 1]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        goToNextSection();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        goToPrevSection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  // Prevent default scroll behavior
  useEffect(() => {
    const preventDefault = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        goToNextSection();
      } else {
        goToPrevSection();
      }
    };

    document.addEventListener('wheel', preventDefault, { passive: false });
    return () => document.removeEventListener('wheel', preventDefault);
  }, [activeSection]);

  // Animation variants based on direction
  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: (direction: number) => ({
      y: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }
    })
  };

  // Render the active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'hero':
        return <HeroSection onNext={() => goToNextSection()} />;
      case 'about':
        return <AboutSection />;
      case 'services':
        return <ServicesSection />;
      case 'testimonials':
        return <TestimonialsSection />;
      case 'cta':
        return <CTASection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HeroSection onNext={() => goToNextSection()} />;
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col h-screen bg-white text-black overflow-hidden">
      <Header activeSection={activeSection} onNavigate={goToSection} />
      
      <main className="flex-grow relative">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={activeSection}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation dots */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-50">
          {['hero', 'about', 'services', 'testimonials', 'cta', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => goToSection(section as SectionType)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section ? 'bg-primary scale-125' : 'bg-gray-300'
              }`}
              aria-label={`Go to ${section} section`}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
