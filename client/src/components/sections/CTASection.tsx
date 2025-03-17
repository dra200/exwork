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
    <section className="h-full w-full flex items-center bg-gradient-to-br from-primary to-primary/80 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-8">
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
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
              <RocketIcon size={50} className="text-white" />
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            variants={itemVariants}
          >
            Ready to transform your business?
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/90 leading-relaxed"
            variants={itemVariants}
          >
            Contact us today to discuss how our software solutions and technical support 
            can help you achieve your business goals.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 transition-all duration-300 font-bold text-lg py-6 px-10 rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
