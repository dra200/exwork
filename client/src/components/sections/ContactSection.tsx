import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { DEFAULT_COMPANY_DETAILS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { CompanyDetails } from "@shared/schema";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Linkedin, Twitter, Facebook, Instagram, Send } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { data: companyDetails } = useQuery<CompanyDetails>({
    queryKey: ['/api/company-details'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const details = companyDetails || DEFAULT_COMPANY_DETAILS;

  // Form setup
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/contact', data);
      
      toast({
        title: "Thank you!",
        description: "Your message has been sent successfully. We'll get back to you soon.",
        variant: "default",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
      console.error("Contact form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section className="h-full w-full flex items-center bg-white text-black overflow-y-auto pb-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-6">
        <motion.div
          className="flex flex-col"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">Get in Touch</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-xl text-gray-700 font-medium">
              Have questions or ready to start a project? Fill out the form below and we'll get back to you promptly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div variants={itemVariants}>
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-black">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full mr-4 shadow-sm border border-gray-100">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-black">Address</h4>
                      <p className="text-gray-700 font-medium">{details.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full mr-4 shadow-sm border border-gray-100">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-black">Email</h4>
                      <p className="text-gray-700 font-medium">{details.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full mr-4 shadow-sm border border-gray-100">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-black">Phone</h4>
                      <p className="text-gray-700 font-medium">{details.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h3 className="text-xl font-bold mb-4 text-black">Follow Us</h3>
                  <div className="flex space-x-4">
                    <motion.a 
                      href={details.socialLinks?.[0] || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition duration-300 shadow-sm border border-gray-100"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                    <motion.a 
                      href={details.socialLinks?.[1] || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition duration-300 shadow-sm border border-gray-100"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Twitter className="h-5 w-5" />
                    </motion.a>
                    <motion.a 
                      href={details.socialLinks?.[2] || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition duration-300 shadow-sm border border-gray-100"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Facebook className="h-5 w-5" />
                    </motion.a>
                    <motion.a 
                      href={details.socialLinks?.[3] || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition duration-300 shadow-sm border border-gray-100"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram className="h-5 w-5" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black font-bold">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              className="border-gray-300 text-black font-medium"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black font-bold">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your.email@example.com" 
                              type="email" 
                              {...field} 
                              className="border-gray-300 text-black font-medium"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black font-bold">Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+1 (123) 456-7890" 
                              type="tel" 
                              {...field} 
                              className="border-gray-300 text-black font-medium"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black font-bold">Service Interested In</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-gray-300 text-black font-medium">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="software-development">Software Development</SelectItem>
                              <SelectItem value="it-support">IT Support & Consulting</SelectItem>
                              <SelectItem value="data-management">Data Management</SelectItem>
                              <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black font-bold">Your Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project or inquiry..." 
                              className="resize-none min-h-[120px] border-gray-300 text-black font-medium"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center"
                        disabled={isSubmitting}
                      >
                        <Send className="mr-2 h-5 w-5" />
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
