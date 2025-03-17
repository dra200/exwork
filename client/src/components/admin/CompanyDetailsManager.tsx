import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CompanyDetails, insertCompanyDetailsSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DEFAULT_COMPANY_DETAILS } from "@/lib/constants";
import { Save, X, CheckCircle } from "lucide-react";

// Company details form schema with validation
const companyDetailsFormSchema = insertCompanyDetailsSchema.extend({
  socialLinks: z.string().min(1, "Social links are required")
    .transform((val) => val.split(',').map(item => item.trim())),
});

type CompanyDetailsFormValues = z.input<typeof companyDetailsFormSchema>;

export function CompanyDetailsManager() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { data: companyDetails, isLoading } = useQuery<CompanyDetails>({
    queryKey: ['/api/company-details'],
  });

  const details = companyDetails || DEFAULT_COMPANY_DETAILS;

  const form = useForm<CompanyDetailsFormValues>({
    resolver: zodResolver(companyDetailsFormSchema),
    defaultValues: {
      address: details.address,
      email: details.email,
      phone: details.phone,
      socialLinks: details.socialLinks?.join(', ') || "",
    },
  });

  const onSubmit = async (data: CompanyDetailsFormValues) => {
    setIsSubmitting(true);
    setIsSaved(false);
    
    try {
      await apiRequest('PUT', '/api/admin/company-details', data);
      queryClient.invalidateQueries({ queryKey: ['/api/company-details'] });
      toast({
        title: "Success",
        description: "Company details updated successfully",
      });
      setIsSaved(true);
      
      // Reset the saved indicator after 3 seconds
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update company details",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Company Details</h2>
        <p className="text-muted-foreground">Update your company contact information and social links</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Full address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@company.com" {...field} />
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
                        <Input placeholder="+1 (123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="socialLinks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media Links</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://linkedin.com, https://twitter.com, https://facebook.com, https://instagram.com" 
                        {...field} 
                      />
                    </FormControl>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enter links separated by commas (LinkedIn, Twitter, Facebook, Instagram)
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => form.reset({
                    address: details.address,
                    email: details.email,
                    phone: details.phone,
                    socialLinks: details.socialLinks?.join(', ') || "",
                  })}
                >
                  <X className="mr-2 h-4 w-4" /> Reset
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Saving...
                    </span>
                  ) : isSaved ? (
                    <span className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" /> Saved
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
