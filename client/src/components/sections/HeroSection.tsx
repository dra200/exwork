import { Button } from "@/components/ui/button";
import { COMPANY_DESCRIPTION } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
  onNext?: () => void;
}

export function HeroSection({ onNext }: HeroSectionProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  return (
    <section className="h-full w-full flex items-center bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-8">
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div>
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-black leading-tight tracking-tight mb-6"
              variants={itemVariants}
            >
              Software solutions that <span className="text-primary">empower</span> <br/>your business
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-700 mb-8 max-w-xl leading-relaxed font-medium"
              variants={itemVariants}
            >
              {COMPANY_DESCRIPTION}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <Button 
                onClick={onNext}
                className="bg-primary hover:bg-primary/90 text-white font-bold text-base"
                size="lg"
              >
                Explore Our Services
              </Button>
              <Button 
                onClick={() => {
                  if (onNext) {
                    onNext();
                  }
                }}
                variant="outline"
                className="hover:bg-gray-100 text-black py-3 px-6 border border-gray-300 text-base font-medium"
                size="lg"
              >
                Contact Us
              </Button>
            </motion.div>
          </div>
          
          <motion.div
            variants={itemVariants}
            className="hidden md:block"
          >
            <motion.div 
              className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-100"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                alt="Modern software solutions for businesses" 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-white/20"></div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-100 text-black hover:bg-gray-200 h-12 w-12 shadow-md"
            onClick={onNext}
          >
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
