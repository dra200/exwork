import { RevealAnimation } from "@/components/animations/RevealAnimation";
import { Button } from "@/components/ui/button";
import { SECTION_IDS, COMPANY_TAGLINE, COMPANY_DESCRIPTION } from "@/lib/constants";
import { motion } from "framer-motion";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <RevealAnimation>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D1D1F] leading-tight mb-6">
              Software solutions that <span className="text-primary">empower</span> your business
            </h1>
            <p className="text-lg md:text-xl text-secondary mb-8">
              {COMPANY_DESCRIPTION}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                onClick={() => scrollToSection(SECTION_IDS.services)}
                className="bg-primary hover:bg-primary/90 text-white py-3 px-6"
                size="lg"
              >
                Explore Our Services
              </Button>
              <Button 
                onClick={() => scrollToSection(SECTION_IDS.contact)}
                variant="outline"
                className="bg-white hover:bg-[#E5E5E7] text-[#1D1D1F] py-3 px-6 border border-gray-300"
                size="lg"
              >
                Contact Us
              </Button>
            </div>
          </RevealAnimation>
          
          <RevealAnimation delay={0.2}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-lg shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                alt="Modern software solutions for businesses" 
                className="rounded-lg w-full object-cover h-[400px]"
              />
            </motion.div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
