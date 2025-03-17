import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";
import { DEFAULT_TESTIMONIALS } from "@/lib/constants";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialsSection() {
  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const testimonialsList = testimonials || DEFAULT_TESTIMONIALS;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotation for testimonials
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
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
    <section className="h-full w-full flex items-center bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div 
          className="flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-xl text-gray-700 font-medium">
              Don't just take our word for it. Here's what our clients have to say about working with ExWork.
            </p>
          </motion.div>

          <motion.div 
            className="w-full max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-md border border-gray-100">
              {/* Quote decoration */}
              <div className="absolute -top-6 -left-6 text-primary/20">
                <Quote size={80} />
              </div>
              
              <div className="testimonial-slider relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="testimonial-slide"
                  >
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center md:justify-start">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-md bg-gray-50 flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            {/* User avatar placeholder - showing initials */}
                            <span className="text-3xl font-bold text-primary">
                              {testimonialsList[currentIndex].name.charAt(0)}
                              {testimonialsList[currentIndex].name.split(' ')[1]?.charAt(0) || ''}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                      <div className="md:w-3/4 md:pl-8">
                        <div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-5 w-5 ${i < testimonialsList[currentIndex].rating ? 'text-primary fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-xl md:text-2xl italic text-gray-700 mb-6 leading-relaxed font-medium">
                            "{testimonialsList[currentIndex].content}"
                          </p>
                          <div>
                            <h4 className="text-xl font-bold text-black">{testimonialsList[currentIndex].name}</h4>
                            <p className="text-gray-600 font-medium">{testimonialsList[currentIndex].position}, {testimonialsList[currentIndex].company}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {testimonialsList.length > 1 && (
                <>
                  {/* Navigation buttons */}
                  <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 px-4 md:-mx-12 z-20">
                    <motion.button 
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full bg-white backdrop-blur-sm text-gray-700 flex items-center justify-center shadow-md transform transition hover:bg-gray-100 border border-gray-100"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </motion.button>
                    <motion.button 
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full bg-white backdrop-blur-sm text-gray-700 flex items-center justify-center shadow-md transform transition hover:bg-gray-100 border border-gray-100"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </motion.button>
                  </div>
                  
                  {/* Pagination dots */}
                  <div className="absolute -bottom-6 left-0 right-0 flex justify-center space-x-2">
                    {testimonialsList.map((_, index) => (
                      <motion.button 
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentIndex ? 'bg-primary scale-125' : 'bg-gray-300'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
