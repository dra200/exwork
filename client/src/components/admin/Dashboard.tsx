import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceManager } from "./ServiceManager";
import { FeatureManager } from "./FeatureManager";
import { TestimonialManager } from "./TestimonialManager";
import { ContactRequestManager } from "./ContactRequestManager";
import { CompanyDetailsManager } from "./CompanyDetailsManager";
import { LogOut, Settings, Home } from "lucide-react";
import { Link } from "wouter";

interface DashboardProps {
  user?: {
    id: number;
    username: string;
    isAdmin: boolean;
  };
  onLogout: () => Promise<void>;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("services");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await onLogout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-6">You don't have permission to access the admin dashboard.</p>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your website content</p>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/"><Home className="mr-2 h-4 w-4" /> View Website</Link>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="contacts">Contact Requests</TabsTrigger>
          <TabsTrigger value="company">Company Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="services" className="bg-white rounded-lg shadow p-6">
          <ServiceManager />
        </TabsContent>
        
        <TabsContent value="features" className="bg-white rounded-lg shadow p-6">
          <FeatureManager />
        </TabsContent>
        
        <TabsContent value="testimonials" className="bg-white rounded-lg shadow p-6">
          <TestimonialManager />
        </TabsContent>
        
        <TabsContent value="contacts" className="bg-white rounded-lg shadow p-6">
          <ContactRequestManager />
        </TabsContent>
        
        <TabsContent value="company" className="bg-white rounded-lg shadow p-6">
          <CompanyDetailsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
