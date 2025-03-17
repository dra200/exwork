import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RocketIcon } from "lucide-react";

export function CTASection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="h-full w-full flex items-center bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-8">
        <div className="rounded-2xl bg-gray-50 shadow-sm border border-gray-100 py-16 px-8">
          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              className="relative mb-8" 
              variants={itemVariants}
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-4 bg-primary/10 rounded-full">
                <RocketIcon size={50} className="text-primary" />
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-black"
              variants={itemVariants}
            >
              Ready to transform your business?
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-700 leading-relaxed font-medium"
              variants={itemVariants}
            >
              Contact us today to discuss how our software solutions and technical support 
              can help you achieve your business goals.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 transition-all duration-300 font-bold text-lg py-8 px-10 rounded-lg shadow-md"
                >
                  Get Started
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
