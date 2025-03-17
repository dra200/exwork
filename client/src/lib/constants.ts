// App constants
export const COMPANY_NAME = "ExWork.eu";
export const COMPANY_TAGLINE = "Software solutions that empower your business";
export const COMPANY_DESCRIPTION = "ExWork provides custom software solutions and technical support for businesses, individuals, and institutions.";
export const CURRENT_YEAR = new Date().getFullYear();

// Color constants
export const COLORS = {
  primary: "#0066CC",
  secondary: "#333333",
  accent: "#FF6B00",
  neutral: "#F5F5F7",
  neutralDark: "#E5E5E7",
  textMain: "#1D1D1F",
};

// Section IDs
export const SECTION_IDS = {
  about: "about",
  services: "services",
  testimonials: "testimonials",
  contact: "contact",
};

// Animation variants 
export const FADE_IN_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const STAGGER_CHILDREN = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Card hover animation
export const CARD_HOVER = {
  rest: { y: 0 },
  hover: { y: -5, transition: { duration: 0.3 } }
};

// Page transitions
export const PAGE_TRANSITION = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

// Default service list (used as fallback)
export const DEFAULT_SERVICES = [
  {
    id: 1,
    title: "Software Development",
    description: "Custom software solutions designed to streamline your business processes, enhance productivity, and drive growth.",
    icon: "code",
    features: ["Web Applications", "Mobile Applications", "Desktop Software"]
  },
  {
    id: 2,
    title: "IT Support & Consulting",
    description: "Comprehensive technical support and expert consulting to keep your systems running smoothly and efficiently.",
    icon: "server",
    features: ["24/7 Technical Support", "Infrastructure Management", "IT Strategy Consulting"]
  },
  {
    id: 3,
    title: "Data Management",
    description: "Effective data solutions that help you organize, secure, and leverage your business information.",
    icon: "database",
    features: ["Database Design & Optimization", "Data Migration & Integration", "Business Intelligence Solutions"]
  },
  {
    id: 4,
    title: "Cybersecurity",
    description: "Protect your business with our comprehensive security solutions designed to safeguard your digital assets.",
    icon: "shield",
    features: ["Security Assessments", "Threat Protection & Monitoring", "Compliance & Governance"]
  }
];

// Default features (used as fallback)
export const DEFAULT_FEATURES = [
  {
    id: 1,
    title: "Expertise",
    description: "Our team of experts brings years of experience in software development and IT solutions across various industries.",
    icon: "code"
  },
  {
    id: 2,
    title: "Client-Focused",
    description: "We prioritize your needs, working closely with you to deliver solutions that address your specific challenges.",
    icon: "users"
  },
  {
    id: 3,
    title: "Results-Driven",
    description: "Our solutions are designed to deliver measurable results, helping your business grow and succeed.",
    icon: "bar-chart-2"
  }
];

// Default testimonials (used as fallback)
export const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO",
    company: "TechInnovate",
    content: "ExWork transformed our business operations with their custom software solution. The team was professional, responsive, and delivered exactly what we needed. I highly recommend their services.",
    rating: 5
  }
];

// Default company details (used as fallback)
export const DEFAULT_COMPANY_DETAILS = {
  id: 1,
  address: "123 Business Avenue, Tech District, 10000, City, Country",
  email: "contact@exwork.eu",
  phone: "+1 (123) 456-7890",
  socialLinks: ["https://linkedin.com", "https://twitter.com", "https://facebook.com", "https://instagram.com"]
};
