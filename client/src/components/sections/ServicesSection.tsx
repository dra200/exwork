import { RevealAnimation } from "@/components/animations/RevealAnimation";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { SECTION_IDS, DEFAULT_SERVICES } from "@/lib/constants";
import { motion } from "framer-motion";
import { Code, Server, Database, Shield, Check, ArrowRight } from "lucide-react";

export function ServicesSection() {
  const { data: services, isLoading } = useQuery<Service[]>({
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

  const scrollToContact = () => {
    const element = document.getElementById(SECTION_IDS.contact);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F5F5F7] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealAnimation className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-[#FF6B00] mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-secondary">
            We provide comprehensive software solutions and technical support to meet your business needs.
          </p>
        </RevealAnimation>

        <div className="grid md:grid-cols-2 gap-10">
          {servicesList.map((service, index) => (
            <RevealAnimation 
              key={service.id} 
              delay={index * 0.1}
            >
              <motion.div 
                className="bg-white rounded-xl shadow-lg overflow-hidden service-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-48 bg-primary/10 flex items-center justify-center p-8">
                  {getServiceIcon(service.icon)}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-secondary mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-[#FF6B00] mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={scrollToContact} 
                    className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition duration-150"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
