import { useState, useEffect, useRef } from 'react';

interface ScrollSpyOptions {
  offset?: number;
  sectionSelector?: string;
}

export function useScrollSpy(options: ScrollSpyOptions = {}) {
  const { offset = 100, sectionSelector = '[id]' } = options;
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(sectionSelector));
    sectionsRef.current = sections;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Find the section that is currently in view
      const currentSection = sections
        .map(section => {
          const sectionTop = section.offsetTop - offset;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.id;
          
          return {
            id: sectionId,
            top: sectionTop,
            bottom: sectionTop + sectionHeight
          };
        })
        .find(section => scrollY >= section.top && scrollY < section.bottom);
      
      const newActiveSection = currentSection?.id || null;
      
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    handleScroll(); // Call once on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionSelector, offset, activeSection]);

  return activeSection;
}
