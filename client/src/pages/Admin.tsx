import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { PAGE_TRANSITION } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/admin/Dashboard";
import { LoginForm } from "@/components/admin/LoginForm";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type AuthState = {
  authenticated: boolean;
  user?: {
    id: number;
    username: string;
    isAdmin: boolean;
  };
};

export default function Admin() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch authentication status
  const { data: authState, refetch } = useQuery<AuthState>({
    queryKey: ['/api/auth/status'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    // Check if user is authenticated
    if (authState) {
      setIsLoading(false);
    }
  }, [authState]);

  const handleLogin = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      await apiRequest('POST', '/api/auth/login', { username, password });
      await refetch();
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await apiRequest('POST', '/api/auth/logout', {});
      await refetch();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={PAGE_TRANSITION}
      className="min-h-screen flex flex-col"
    >
      <Header />
      
      <main className="flex-grow pt-16">
        {authState?.authenticated ? (
          <Dashboard user={authState.user} onLogout={handleLogout} />
        ) : (
          <div className="container mx-auto px-4 py-12 max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
              <LoginForm onLogin={handleLogin} />
            </div>
          </div>
        )}
      </main>
    </motion.div>
  );
}
