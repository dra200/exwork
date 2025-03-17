import { RevealAnimation } from "@/components/animations/RevealAnimation";
import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "@/lib/constants";

export function CTASection() {
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
    <section className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <RevealAnimation>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your business?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Contact us today to discuss how our software solutions and technical support can help you achieve your business goals.
          </p>
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="inline-block bg-white text-primary hover:bg-[#F5F5F7] transition duration-150 font-medium py-3 px-8"
          >
            Get Started
          </Button>
        </RevealAnimation>
      </div>
    </section>
  );
}
