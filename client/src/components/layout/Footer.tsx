import { Link } from "wouter";
import { SECTION_IDS, CURRENT_YEAR, COMPANY_NAME } from "@/lib/constants";
import { Twitter, Facebook, Instagram, MapPin, Mail, Phone } from "lucide-react";
import { MessageSquareShare } from "lucide-react"; // Using this icon as LinkedIn replacement
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_COMPANY_DETAILS } from "@/lib/constants";

export function Footer() {
  const { data: companyDetails } = useQuery({
    queryKey: ['/api/company-details'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const details = companyDetails || DEFAULT_COMPANY_DETAILS;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold flex items-center mb-4">
              <span className="text-accent mr-1">Ex</span>Work<span className="text-accent">.</span>
              <span className="text-sm">eu</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Providing innovative software solutions and reliable technical support to help businesses thrive in the digital age.
            </p>
            <div className="flex space-x-4">
              <a href={details.socialLinks?.[0] || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-150">
                <MessageSquareShare className="h-5 w-5" />
              </a>
              <a href={details.socialLinks?.[1] || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-150">
                <Twitter className="h-5 w-5" />
              </a>
              <a href={details.socialLinks?.[2] || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-150">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={details.socialLinks?.[3] || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-150">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection(SECTION_IDS.services)} className="text-gray-400 hover:text-white transition duration-150">
                  Software Development
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(SECTION_IDS.services)} className="text-gray-400 hover:text-white transition duration-150">
                  IT Support & Consulting
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(SECTION_IDS.services)} className="text-gray-400 hover:text-white transition duration-150">
                  Data Management
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(SECTION_IDS.services)} className="text-gray-400 hover:text-white transition duration-150">
                  Cybersecurity
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection(SECTION_IDS.about)} className="text-gray-400 hover:text-white transition duration-150">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(SECTION_IDS.services)} className="text-gray-400 hover:text-white transition duration-150">
                  Our Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(SECTION_IDS.testimonials)} className="text-gray-400 hover:text-white transition duration-150">
                  Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection(SECTION_IDS.contact)} className="text-gray-400 hover:text-white transition duration-150">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">{details.address}</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">{details.email}</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">{details.phone}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {CURRENT_YEAR} {COMPANY_NAME}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-150">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-150">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-150">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
