import { RevealAnimation } from "@/components/animations/RevealAnimation";
import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";
import { DEFAULT_TESTIMONIALS } from "@/lib/constants";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const testimonialsList = testimonials || DEFAULT_TESTIMONIALS;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealAnimation className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-[#FF6B00] mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-secondary">
            Don't just take our word for it. Here's what our clients have to say about working with ExWork.
          </p>
        </RevealAnimation>

        <RevealAnimation>
          <div className="relative bg-[#F5F5F7] rounded-2xl p-8 md:p-12 overflow-hidden">
            <div className="testimonial-slider">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="testimonial-slide"
                >
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center md:justify-start">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* User avatar placeholder - showing initials */}
                          <span className="text-2xl font-bold text-primary">
                            {testimonialsList[currentIndex].name.charAt(0)}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                    <div className="md:w-3/4 md:pl-8">
                      <div className="mb-4">
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-5 w-5 ${i < testimonialsList[currentIndex].rating ? 'text-[#FF6B00] fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-lg md:text-xl italic text-secondary mb-6">
                          "{testimonialsList[currentIndex].content}"
                        </p>
                        <div>
                          <h4 className="text-lg font-semibold">{testimonialsList[currentIndex].name}</h4>
                          <p className="text-secondary">{testimonialsList[currentIndex].position}, {testimonialsList[currentIndex].company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {testimonialsList.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 mt-6">
                {testimonialsList.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
