import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactFormSchema, 
  insertServiceSchema, 
  insertFeatureSchema, 
  insertTestimonialSchema, 
  insertCompanyDetailsSchema 
} from "@shared/schema";
import { ZodError } from "zod";
import session from "express-session";
import MemoryStore from "memorystore";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session setup
  const MemoryStoreSession = MemoryStore(session);
  app.use(
    session({
      secret: "exwork-secret-key",
      resave: false,
      saveUninitialized: false,
      store: new MemoryStoreSession({
        checkPeriod: 86400000, // 24 hours
      }),
    })
  );

  // Passport setup
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        
        // In production, this should use proper password hashing
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, (user as any).id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Authentication middleware
  function isAuthenticated(req: Request, res: Response, next: any) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  }

  function isAdmin(req: Request, res: Response, next: any) {
    if (req.isAuthenticated() && (req.user as any).isAdmin) {
      return next();
    }
    res.status(403).json({ message: "Forbidden" });
  }

  // Authentication routes
  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.json({ message: "Authentication successful", user: { id: user.id, username: user.username, isAdmin: user.isAdmin } });
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout(() => {
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/status", (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user as any;
      res.json({ authenticated: true, user: { id: user.id, username: user.username, isAdmin: user.isAdmin } });
    } else {
      res.json({ authenticated: false });
    }
  });

  // Public data endpoints
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/features", async (req, res) => {
    try {
      const features = await storage.getFeatures();
      res.json(features);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch features" });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/company-details", async (req, res) => {
    try {
      const details = await storage.getCompanyDetails();
      if (details) {
        res.json(details);
      } else {
        res.status(404).json({ message: "Company details not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch company details" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validData = contactFormSchema.parse(req.body);
      const contactRequest = await storage.createContactRequest(validData);
      res.status(201).json({ message: "Contact request submitted successfully", id: contactRequest.id });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.format() });
      } else {
        res.status(500).json({ message: "Failed to submit contact request" });
      }
    }
  });

  // Admin-only routes (protected)
  // Contact requests management
  app.get("/api/admin/contact-requests", isAdmin, async (req, res) => {
    try {
      const contactRequests = await storage.getContactRequests();
      res.json(contactRequests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact requests" });
    }
  });

  app.patch("/api/admin/contact-requests/:id/status", isAdmin, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !["new", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    
    try {
      const updatedRequest = await storage.updateContactRequestStatus(parseInt(id), status);
      if (updatedRequest) {
        res.json(updatedRequest);
      } else {
        res.status(404).json({ message: "Contact request not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update contact request status" });
    }
  });

  app.delete("/api/admin/contact-requests/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    
    try {
      const success = await storage.deleteContactRequest(parseInt(id));
      if (success) {
        res.json({ message: "Contact request deleted successfully" });
      } else {
        res.status(404).json({ message: "Contact request not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete contact request" });
    }
  });

  // Services management
  app.post("/api/admin/services", isAdmin, async (req, res) => {
    try {
      const validData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validData);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.format() });
      } else {
        res.status(500).json({ message: "Failed to create service" });
      }
    }
  });

  app.put("/api/admin/services/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    
    try {
      const validData = insertServiceSchema.parse(req.body);
      const updatedService = await storage.updateService(parseInt(id), validData);
      if (updatedService) {
        res.json(updatedService);
      } else {
        res.status(404).json({ message: "Service not found" });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.format() });
      } else {
        res.status(500).json({ message: "Failed to update service" });
      }
    }
  });

  app.delete("/api/admin/services/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    
    try {
      const success = await storage.deleteService(parseInt(id));
      if (success) {
        res.json({ message: "Service deleted successfully" });
      } else {
        res.status(404).json({ message: "Service not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  // Features management
  app.post("/api/admin/features", isAdmin, async (req, res) => {
    try {
      const validData = insertFeatureSchema.parse(req.body);
      const feature = await storage.createFeature(validData);
      res.status(201).json(feature);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.format() });
      } else {
        res.status(500).json({ message: "Failed to create feature" });
      }
    }
  });

  app.put("/api/admin/features/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    
    try {
      const validData = insertFeatureSchema.parse(req.body);
      const updatedFeature = await storage.updateFeature(parseInt(id), validData);
      if (updatedFeature) {
        res.json(updatedFeature);
      } else {
        res.status(404).json({ message: "Feature not found" });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.format() });
      } else {
        res.status(500).json({ message: "Failed to update feature" });
      }
    }
  });

  app.delete("/api/admin/features/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    
    try {
      const success = await storage.deleteFeature(parseInt(id));
      if (success) {
        res.json({ message: "Feature deleted successfully" });
      } else {
        res.status(404).json({ message: "Feature not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete feature" });
    }
  });

  // Testimonials management
  app.post("/api/admin/testimonials", isAdmin, async (req, res) => {
    try {
      const validData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.format() });
      } else {
        res.status(500).json({ message: "Failed to create testimonial" });
      }
    }
  });

  app.put("/api/admin/testimonials/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    
    try {
      const validData = insertTestimonialSchema.parse(req.body);
      const updatedTestimonial = await storage.updateTestimonial(parseInt(id), validData);
      if (updatedTestimonial) {
        res.json(updatedTestimonial);
      } else {
        res.status(404).json({ message: "Testimonial not found" });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.format() });
      } else {
        res.status(500).json({ message: "Failed to update testimonial" });
      }
    }
  });

  app.delete("/api/admin/testimonials/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    
    try {
      const success = await storage.deleteTestimonial(parseInt(id));
      if (success) {
        res.json({ message: "Testimonial deleted successfully" });
      } else {
        res.status(404).json({ message: "Testimonial not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  // Company details management
  app.put("/api/admin/company-details", isAdmin, async (req, res) => {
    try {
      const validData = insertCompanyDetailsSchema.parse(req.body);
      const details = await storage.updateCompanyDetails(validData);
      res.json(details);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.format() });
      } else {
        res.status(500).json({ message: "Failed to update company details" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
