import { RevealAnimation } from "@/components/animations/RevealAnimation";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { DEFAULT_COMPANY_DETAILS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { CompanyDetails } from "@shared/schema";
import { useState } from "react";
import { MapPin, Mail, Phone, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
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

  return (
    <section id="contact" className="py-20 md:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealAnimation className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">Get in Touch</h2>
          <div className="w-24 h-1 bg-[#FF6B00] mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-secondary">
            Have questions or ready to start a project? Fill out the form below and we'll get back to you promptly.
          </p>
        </RevealAnimation>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <RevealAnimation>
            <div className="bg-[#F5F5F7] rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Address</h4>
                    <p className="text-secondary">{details.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <p className="text-secondary">{details.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <p className="text-secondary">{details.phone}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href={details.socialLinks?.[0] || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white p-3 rounded-full shadow-sm hover:bg-primary hover:text-white transition duration-150"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href={details.socialLinks?.[1] || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white p-3 rounded-full shadow-sm hover:bg-primary hover:text-white transition duration-150"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a 
                    href={details.socialLinks?.[2] || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white p-3 rounded-full shadow-sm hover:bg-primary hover:text-white transition duration-150"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a 
                    href={details.socialLinks?.[3] || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white p-3 rounded-full shadow-sm hover:bg-primary hover:text-white transition duration-150"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={0.2}>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" type="email" {...field} />
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (123) 456-7890" type="tel" {...field} />
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
                        <FormLabel>Service Interested In</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
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
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project or inquiry..." 
                            className="resize-none min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
