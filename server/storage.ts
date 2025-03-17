import { 
  users, type User, type InsertUser,
  services, type Service, type InsertService,
  features, type Feature, type InsertFeature,
  testimonials, type Testimonial, type InsertTestimonial,
  contactRequests, type ContactRequest, type InsertContactRequest,
  companyDetails, type CompanyDetails, type InsertCompanyDetails,
} from "@shared/schema";

// Storage interface for CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Service operations
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
  
  // Feature operations
  getFeatures(): Promise<Feature[]>;
  getFeature(id: number): Promise<Feature | undefined>;
  createFeature(feature: InsertFeature): Promise<Feature>;
  updateFeature(id: number, feature: Partial<InsertFeature>): Promise<Feature | undefined>;
  deleteFeature(id: number): Promise<boolean>;
  
  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
  
  // Contact request operations
  getContactRequests(): Promise<ContactRequest[]>;
  getContactRequest(id: number): Promise<ContactRequest | undefined>;
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  updateContactRequestStatus(id: number, status: string): Promise<ContactRequest | undefined>;
  deleteContactRequest(id: number): Promise<boolean>;
  
  // Company details operations
  getCompanyDetails(): Promise<CompanyDetails | undefined>;
  updateCompanyDetails(details: InsertCompanyDetails): Promise<CompanyDetails>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private features: Map<number, Feature>;
  private testimonials: Map<number, Testimonial>;
  private contactRequests: Map<number, ContactRequest>;
  private companyDetails: Map<number, CompanyDetails>;
  
  private currentUserId: number;
  private currentServiceId: number;
  private currentFeatureId: number;
  private currentTestimonialId: number;
  private currentContactRequestId: number;
  private currentCompanyDetailsId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.features = new Map();
    this.testimonials = new Map();
    this.contactRequests = new Map();
    this.companyDetails = new Map();
    
    this.currentUserId = 1;
    this.currentServiceId = 1;
    this.currentFeatureId = 1;
    this.currentTestimonialId = 1;
    this.currentContactRequestId = 1;
    this.currentCompanyDetailsId = 1;
    
    // Initialize with default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Add default admin user
    this.createUser({
      username: 'ahmedtolbh@icloud.com',
      password: 'Viking@1999',
      isAdmin: true
    });
    
    // Add default services
    this.createService({
      title: 'Software Development',
      description: 'Custom software solutions designed to streamline your business processes, enhance productivity, and drive growth.',
      icon: 'code',
      features: ['Web Applications', 'Mobile Applications', 'Desktop Software']
    });
    
    this.createService({
      title: 'IT Support & Consulting',
      description: 'Comprehensive technical support and expert consulting to keep your systems running smoothly and efficiently.',
      icon: 'server',
      features: ['24/7 Technical Support', 'Infrastructure Management', 'IT Strategy Consulting']
    });
    
    this.createService({
      title: 'Data Management',
      description: 'Effective data solutions that help you organize, secure, and leverage your business information.',
      icon: 'database',
      features: ['Database Design & Optimization', 'Data Migration & Integration', 'Business Intelligence Solutions']
    });
    
    this.createService({
      title: 'Cybersecurity',
      description: 'Protect your business with our comprehensive security solutions designed to safeguard your digital assets.',
      icon: 'shield',
      features: ['Security Assessments', 'Threat Protection & Monitoring', 'Compliance & Governance']
    });
    
    // Add default features/about cards
    this.createFeature({
      title: 'Expertise',
      description: 'Our team of experts brings years of experience in software development and IT solutions across various industries.',
      icon: 'code'
    });
    
    this.createFeature({
      title: 'Client-Focused',
      description: 'We prioritize your needs, working closely with you to deliver solutions that address your specific challenges.',
      icon: 'users'
    });
    
    this.createFeature({
      title: 'Results-Driven',
      description: 'Our solutions are designed to deliver measurable results, helping your business grow and succeed.',
      icon: 'bar-chart-2'
    });
    
    // Add default testimonial
    this.createTestimonial({
      name: 'Sarah Johnson',
      position: 'CEO',
      company: 'TechInnovate',
      content: 'ExWork transformed our business operations with their custom software solution. The team was professional, responsive, and delivered exactly what we needed. I highly recommend their services.',
      rating: 5
    });
    
    // Add default company details
    this.updateCompanyDetails({
      address: '123 Business Avenue, Tech District, 10000, City, Country',
      email: 'contact@exwork.eu',
      phone: '+1 (123) 456-7890',
      socialLinks: ['https://linkedin.com', 'https://twitter.com', 'https://facebook.com', 'https://instagram.com']
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const newUser: User = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(service: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const timestamp = new Date();
    const newService: Service = { ...service, id, createdAt: timestamp };
    this.services.set(id, newService);
    return newService;
  }

  async updateService(id: number, serviceUpdate: Partial<InsertService>): Promise<Service | undefined> {
    const existingService = this.services.get(id);
    if (!existingService) return undefined;
    
    const updatedService: Service = { ...existingService, ...serviceUpdate };
    this.services.set(id, updatedService);
    return updatedService;
  }

  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }

  // Feature methods
  async getFeatures(): Promise<Feature[]> {
    return Array.from(this.features.values());
  }

  async getFeature(id: number): Promise<Feature | undefined> {
    return this.features.get(id);
  }

  async createFeature(feature: InsertFeature): Promise<Feature> {
    const id = this.currentFeatureId++;
    const newFeature: Feature = { ...feature, id };
    this.features.set(id, newFeature);
    return newFeature;
  }

  async updateFeature(id: number, featureUpdate: Partial<InsertFeature>): Promise<Feature | undefined> {
    const existingFeature = this.features.get(id);
    if (!existingFeature) return undefined;
    
    const updatedFeature: Feature = { ...existingFeature, ...featureUpdate };
    this.features.set(id, updatedFeature);
    return updatedFeature;
  }

  async deleteFeature(id: number): Promise<boolean> {
    return this.features.delete(id);
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const newTestimonial: Testimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  async updateTestimonial(id: number, testimonialUpdate: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const existingTestimonial = this.testimonials.get(id);
    if (!existingTestimonial) return undefined;
    
    const updatedTestimonial: Testimonial = { ...existingTestimonial, ...testimonialUpdate };
    this.testimonials.set(id, updatedTestimonial);
    return updatedTestimonial;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    return this.testimonials.delete(id);
  }

  // Contact request methods
  async getContactRequests(): Promise<ContactRequest[]> {
    return Array.from(this.contactRequests.values());
  }

  async getContactRequest(id: number): Promise<ContactRequest | undefined> {
    return this.contactRequests.get(id);
  }

  async createContactRequest(request: InsertContactRequest): Promise<ContactRequest> {
    const id = this.currentContactRequestId++;
    const timestamp = new Date();
    const newRequest: ContactRequest = { 
      ...request, 
      id, 
      status: 'new',
      createdAt: timestamp
    };
    this.contactRequests.set(id, newRequest);
    return newRequest;
  }

  async updateContactRequestStatus(id: number, status: string): Promise<ContactRequest | undefined> {
    const existingRequest = this.contactRequests.get(id);
    if (!existingRequest) return undefined;
    
    const updatedRequest: ContactRequest = { ...existingRequest, status };
    this.contactRequests.set(id, updatedRequest);
    return updatedRequest;
  }

  async deleteContactRequest(id: number): Promise<boolean> {
    return this.contactRequests.delete(id);
  }

  // Company details methods
  async getCompanyDetails(): Promise<CompanyDetails | undefined> {
    return this.companyDetails.size > 0 
      ? Array.from(this.companyDetails.values())[0] 
      : undefined;
  }

  async updateCompanyDetails(details: InsertCompanyDetails): Promise<CompanyDetails> {
    const existingDetails = await this.getCompanyDetails();
    
    if (existingDetails) {
      const updatedDetails: CompanyDetails = { ...existingDetails, ...details };
      this.companyDetails.set(existingDetails.id, updatedDetails);
      return updatedDetails;
    } else {
      const id = this.currentCompanyDetailsId++;
      const newDetails: CompanyDetails = { ...details, id };
      this.companyDetails.set(id, newDetails);
      return newDetails;
    }
  }
}

export const storage = new MemStorage();
