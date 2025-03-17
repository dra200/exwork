import { Link } from "wouter";
import { SECTION_IDS, CURRENT_YEAR, COMPANY_NAME } from "@/lib/constants";
import { Twitter, Facebook, Instagram, MapPin, Mail, Phone } from "lucide-react";
import { MessageSquareShare } from "lucide-react"; // Using this icon as LinkedIn replacement
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_COMPANY_DETAILS } from "@/lib/constants";
import { CompanyDetails } from "@shared/schema";

export function Footer() {
  const { data: companyDetails } = useQuery<CompanyDetails>({
    queryKey: ['/api/company-details'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const details = companyDetails || DEFAULT_COMPANY_DETAILS;

  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold flex items-center mb-4 text-black">
              <span className="text-primary mr-1">Ex</span>Work<span className="text-primary">.</span>
              <span className="text-sm">eu</span>
            </Link>
            <p className="text-gray-600 mb-6 font-medium">
              Providing innovative software solutions and reliable technical support to help businesses thrive in the digital age.
            </p>
            <div className="flex space-x-4">
              <a href={details.socialLinks?.[0] || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition duration-150">
                <MessageSquareShare className="h-5 w-5" />
              </a>
              <a href={details.socialLinks?.[1] || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition duration-150">
                <Twitter className="h-5 w-5" />
              </a>
              <a href={details.socialLinks?.[2] || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition duration-150">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={details.socialLinks?.[3] || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition duration-150">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Services</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-600 hover:text-primary transition duration-150 font-medium">
                  Software Development
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-primary transition duration-150 font-medium">
                  IT Support & Consulting
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-primary transition duration-150 font-medium">
                  Data Management
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-primary transition duration-150 font-medium">
                  Cybersecurity
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-600 hover:text-primary transition duration-150 font-medium">
                  About Us
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-primary transition duration-150 font-medium">
                  Our Services
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-primary transition duration-150 font-medium">
                  Testimonials
                </button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-primary transition duration-150 font-medium">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-gray-600 font-medium">{details.address}</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-gray-600 font-medium">{details.email}</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-gray-600 font-medium">{details.phone}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0 font-medium">
            &copy; {CURRENT_YEAR} {COMPANY_NAME}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-primary text-sm transition duration-150 font-medium">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-primary text-sm transition duration-150 font-medium">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-primary text-sm transition duration-150 font-medium">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
