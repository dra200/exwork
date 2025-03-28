import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { SECTION_IDS } from '@/lib/constants';
import { Menu, X, User, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

type SectionType = 'hero' | 'about' | 'services' | 'testimonials' | 'cta' | 'contact';

interface HeaderProps {
  activeSection?: SectionType;
  onNavigate?: (section: SectionType) => void;
}

export function Header({ activeSection = 'hero', onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  // Check if we're on the admin page
  const isAdminPage = location === '/admin';

  // Function to navigate to sections in the Apple-style fixed layout
  const navigateToSection = (section: SectionType) => {
    if (onNavigate) {
      onNavigate(section);
      setIsMobileMenuOpen(false);
    }
  };

  if (isAdminPage) {
    return (
      <header className="fixed w-full top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-black flex items-center">
              <span className="text-primary mr-1">Ex</span>Work<span className="text-primary">.</span>
              <span className="text-sm">eu</span>
            </Link>
            <Link href="/admin">
              <Button className="bg-gray-100 text-black hover:bg-gray-200 flex items-center gap-2 font-semibold">
                <User className="h-4 w-4" />
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300">
      <div className="bg-white bg-opacity-95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => navigateToSection('hero')}
                className="text-3xl font-bold text-black flex items-center tracking-tight"
              >
                <span className="text-primary mr-1">Ex</span>Work<span className="text-primary">.</span>
                <span className="text-sm">eu</span>
              </button>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-10">
              <button 
                onClick={() => navigateToSection('about')} 
                className={`${activeSection === 'about' ? 'text-primary font-bold' : 'text-gray-700 font-medium'} hover:text-primary text-sm transition duration-150`}
              >
                About
              </button>
              <button 
                onClick={() => navigateToSection('services')} 
                className={`${activeSection === 'services' ? 'text-primary font-bold' : 'text-gray-700 font-medium'} hover:text-primary text-sm transition duration-150`}
              >
                Services
              </button>
              <button 
                onClick={() => navigateToSection('testimonials')} 
                className={`${activeSection === 'testimonials' ? 'text-primary font-bold' : 'text-gray-700 font-medium'} hover:text-primary text-sm transition duration-150`}
              >
                Testimonials
              </button>
              <Link href="/admin">
                <Button 
                  variant="outline"
                  className="text-black border-gray-300 hover:bg-gray-100 font-medium"
                >
                  <User className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
              <Button 
                onClick={() => navigateToSection('contact')} 
                className="bg-primary hover:bg-primary/90 text-white font-bold"
              >
                Contact Us
              </Button>
            </nav>

            {/* Navigation arrows */}
            <div className="hidden md:flex items-center space-x-2 absolute right-4 bottom-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-gray-100 text-black hover:bg-gray-200"
                onClick={() => {
                  const sectionOrder: SectionType[] = ['hero', 'about', 'services', 'testimonials', 'cta', 'contact'];
                  const currentIndex = sectionOrder.indexOf(activeSection);
                  if (currentIndex > 0 && onNavigate) {
                    onNavigate(sectionOrder[currentIndex - 1]);
                  }
                }}
              >
                <ChevronUp className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-gray-100 text-black hover:bg-gray-200"
                onClick={() => {
                  const sectionOrder: SectionType[] = ['hero', 'about', 'services', 'testimonials', 'cta', 'contact'];
                  const currentIndex = sectionOrder.indexOf(activeSection);
                  if (currentIndex < sectionOrder.length - 1 && onNavigate) {
                    onNavigate(sectionOrder[currentIndex + 1]);
                  }
                }}
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <Link href="/admin">
                <Button 
                  variant="outline"
                  size="sm"
                  className="text-black border-gray-300 hover:bg-gray-100"
                >
                  <User className="h-4 w-4" />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-black"
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
        className={`md:hidden bg-white shadow-lg absolute w-full backdrop-blur-lg`}
        initial={false}
        animate={{ 
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="px-6 py-4 space-y-2">
          <button 
            onClick={() => navigateToSection('hero')} 
            className={`block w-full text-left px-4 py-3 rounded-md text-base font-bold ${activeSection === 'hero' ? 'text-primary' : 'text-gray-800'} hover:text-primary hover:bg-gray-100 transition duration-150`}
          >
            Home
          </button>
          <button 
            onClick={() => navigateToSection('about')} 
            className={`block w-full text-left px-4 py-3 rounded-md text-base font-bold ${activeSection === 'about' ? 'text-primary' : 'text-gray-800'} hover:text-primary hover:bg-gray-100 transition duration-150`}
          >
            About
          </button>
          <button 
            onClick={() => navigateToSection('services')} 
            className={`block w-full text-left px-4 py-3 rounded-md text-base font-bold ${activeSection === 'services' ? 'text-primary' : 'text-gray-800'} hover:text-primary hover:bg-gray-100 transition duration-150`}
          >
            Services
          </button>
          <button 
            onClick={() => navigateToSection('testimonials')} 
            className={`block w-full text-left px-4 py-3 rounded-md text-base font-bold ${activeSection === 'testimonials' ? 'text-primary' : 'text-gray-800'} hover:text-primary hover:bg-gray-100 transition duration-150`}
          >
            Testimonials
          </button>
          <button 
            onClick={() => navigateToSection('contact')} 
            className="block w-full text-left px-4 py-3 rounded-md text-base font-bold bg-primary text-white hover:bg-primary/90 transition duration-150"
          >
            Contact Us
          </button>
        </div>
      </motion.div>
    </header>
  );
}
