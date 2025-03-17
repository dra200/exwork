import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(), // Feather icon name
  features: text("features").array().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const features = pgTable("features", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(), // Feather icon name
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  company: text("company").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
});

export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"), // new, in-progress, completed
  createdAt: timestamp("created_at").defaultNow(),
});

export const companyDetails = pgTable("company_details", {
  id: serial("id").primaryKey(),
  address: text("address").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  socialLinks: text("social_links").array(),
});

// Insertion schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

export const insertServiceSchema = createInsertSchema(services).pick({
  title: true,
  description: true,
  icon: true,
  features: true,
});

export const insertFeatureSchema = createInsertSchema(features).pick({
  title: true,
  description: true,
  icon: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  position: true,
  company: true,
  content: true,
  rating: true,
});

export const insertContactRequestSchema = createInsertSchema(contactRequests).pick({
  name: true,
  email: true,
  phone: true,
  service: true,
  message: true,
});

export const insertCompanyDetailsSchema = createInsertSchema(companyDetails).pick({
  address: true,
  email: true,
  phone: true,
  socialLinks: true,
});

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type InsertFeature = z.infer<typeof insertFeatureSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;
export type InsertCompanyDetails = z.infer<typeof insertCompanyDetailsSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;

export type User = typeof users.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Feature = typeof features.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type ContactRequest = typeof contactRequests.$inferSelect;
export type CompanyDetails = typeof companyDetails.$inferSelect;
