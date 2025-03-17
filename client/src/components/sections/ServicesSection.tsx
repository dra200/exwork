import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { DEFAULT_SERVICES } from "@/lib/constants";
import { motion } from "framer-motion";
import { Code, Server, Database, Shield, Check, ArrowRight } from "lucide-react";

export function ServicesSection() {
  const { data: services } = useQuery<Service[]>({
    queryKey: ['/api/services'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const servicesList = services || DEFAULT_SERVICES;

  // Function to get the right icon based on service.icon string
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="h-16 w-16 text-primary" />;
      case 'server':
        return <Server className="h-16 w-16 text-primary" />;
      case 'database':
        return <Database className="h-16 w-16 text-primary" />;
      case 'shield':
        return <Shield className="h-16 w-16 text-primary" />;
      default:
        return <Code className="h-16 w-16 text-primary" />;
    }
  };

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
    <section className="h-full w-full flex items-center bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div 
          className="flex flex-col"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Our Services</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-xl text-gray-300">
              We provide comprehensive software solutions and technical support to meet your business needs.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
            variants={containerVariants}
          >
            {servicesList.map((service, index) => (
              <motion.div 
                key={service.id}
                variants={itemVariants}
                className="h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-zinc-900 rounded-xl overflow-hidden h-full flex flex-col shadow-lg border border-zinc-800">
                  <div className="h-36 bg-zinc-800 flex items-center justify-center p-6">
                    {getServiceIcon(service.icon)}
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                    <p className="text-gray-300 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.button 
                      className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition duration-150"
                      whileHover={{ x: 4 }}
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
