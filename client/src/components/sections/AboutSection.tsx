import { useQuery } from "@tanstack/react-query";
import { DEFAULT_FEATURES } from "@/lib/constants";
import { Feature } from "@shared/schema";
import { motion } from "framer-motion";
import { Code, Users, BarChart2 } from "lucide-react";

export function AboutSection() {
  const { data: features } = useQuery<Feature[]>({
    queryKey: ['/api/features'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const featuresList = features || DEFAULT_FEATURES;

  // Function to render icon based on icon name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="h-10 w-10 text-primary" />;
      case 'users':
        return <Users className="h-10 w-10 text-primary" />;
      case 'bar-chart-2':
        return <BarChart2 className="h-10 w-10 text-primary" />;
      default:
        return <Code className="h-10 w-10 text-primary" />;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="h-full w-full flex items-center bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div 
          className="flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">About ExWork</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-xl text-gray-300">
              We specialize in delivering cutting-edge software solutions and reliable technical support 
              to help you navigate the digital landscape with confidence.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 w-full"
            variants={containerVariants}
          >
            {featuresList.map((feature) => (
              <motion.div 
                key={feature.id}
                variants={itemVariants}
                className="h-full"
              >
                <motion.div 
                  className="bg-zinc-900 rounded-xl p-8 h-full shadow-lg border border-zinc-800 transition-all duration-300"
                  whileHover={{ y: -8, backgroundColor: "#1c1c1c" }}
                >
                  <div className="bg-zinc-800 w-20 h-20 flex items-center justify-center rounded-full mb-6">
                    {getIcon(feature.icon)}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300 text-lg">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
