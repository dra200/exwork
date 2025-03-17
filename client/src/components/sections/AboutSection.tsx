import { RevealAnimation } from "@/components/animations/RevealAnimation";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_FEATURES } from "@/lib/constants";
import { Feature } from "@shared/schema";
import { motion } from "framer-motion";
import { Code, Users, BarChart2 } from "lucide-react";

export function AboutSection() {
  const { data: features, isLoading } = useQuery<Feature[]>({
    queryKey: ['/api/features'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const featuresList = features || DEFAULT_FEATURES;

  // Function to render icon based on icon name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="h-8 w-8 text-primary" />;
      case 'users':
        return <Users className="h-8 w-8 text-primary" />;
      case 'bar-chart-2':
        return <BarChart2 className="h-8 w-8 text-primary" />;
      default:
        return <Code className="h-8 w-8 text-primary" />;
    }
  };

  return (
    <section id="about" className="py-20 md:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealAnimation className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">About ExWork</h2>
          <div className="w-24 h-1 bg-[#FF6B00] mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-secondary">
            We specialize in delivering cutting-edge software solutions and reliable technical support 
            to help you navigate the digital landscape with confidence.
          </p>
        </RevealAnimation>

        <div className="grid md:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <RevealAnimation 
              key={feature.id} 
              delay={index * 0.1}
              className="h-full"
            >
              <motion.div 
                className="bg-[#F5F5F7] rounded-lg p-8 text-center h-full transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-secondary">
                  {feature.description}
                </p>
              </motion.div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
