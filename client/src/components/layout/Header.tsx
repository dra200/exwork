import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { SECTION_IDS, COLORS } from '@/lib/constants';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy({ offset: 70 });
  const [location] = useLocation();

  // Check if we're on the admin page
  const isAdminPage = location === '/admin';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  if (isAdminPage) {
    return (
      <header className="fixed w-full top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary flex items-center">
              <span className="text-accent mr-1">Ex</span>Work<span className="text-accent">.</span>
              <span className="text-sm">eu</span>
            </Link>
            <Link href="/admin">
              <Button variant="ghost">Admin Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="bg-white bg-opacity-80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary flex items-center">
                <span className="text-accent mr-1">Ex</span>Work<span className="text-accent">.</span>
                <span className="text-sm">eu</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection(SECTION_IDS.about)} 
                className={`${activeSection === SECTION_IDS.about ? 'text-primary' : 'text-text-main'} hover:text-primary font-medium text-sm transition duration-150`}
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection(SECTION_IDS.services)} 
                className={`${activeSection === SECTION_IDS.services ? 'text-primary' : 'text-text-main'} hover:text-primary font-medium text-sm transition duration-150`}
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection(SECTION_IDS.testimonials)} 
                className={`${activeSection === SECTION_IDS.testimonials ? 'text-primary' : 'text-text-main'} hover:text-primary font-medium text-sm transition duration-150`}
              >
                Testimonials
              </button>
              <Button 
                onClick={() => scrollToSection(SECTION_IDS.contact)} 
                variant={activeSection === SECTION_IDS.contact ? 'default' : 'default'}
                className="text-white bg-primary hover:bg-primary/90"
              >
                Contact Us
              </Button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className={`md:hidden bg-white shadow-lg absolute w-full`}
        initial={false}
        animate={{ 
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          <button 
            onClick={() => scrollToSection(SECTION_IDS.about)} 
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-text-main hover:text-primary hover:bg-neutral transition duration-150"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection(SECTION_IDS.services)} 
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-text-main hover:text-primary hover:bg-neutral transition duration-150"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection(SECTION_IDS.testimonials)} 
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-text-main hover:text-primary hover:bg-neutral transition duration-150"
          >
            Testimonials
          </button>
          <button 
            onClick={() => scrollToSection(SECTION_IDS.contact)} 
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-primary/90 transition duration-150"
          >
            Contact Us
          </button>
        </div>
      </motion.div>
    </header>
  );
}
