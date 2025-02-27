'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { FaGoogle, FaGithub, FaTwitter } from 'react-icons/fa';
import { Cog, } from 'lucide-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { toast } from 'react-hot-toast';
import { ThemeToggle } from '@/components/ThemeToggle';


export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    setIsVisible(true);
    // Redirect if user is already logged in
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSocialLogin = (connection: string) => {
    setIsLoading(true);
    try {
      // Add prompt=none to skip Auth0's login screen and go directly to IdP
      window.location.href = `/api/auth/login?connection=${connection}&prompt=none&login_hint=webtools.center`;
      toast.success(`Redirecting to ${connection}...`);
    } catch (error) {
      console.error('Social login error:', error);
      setIsLoading(false);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-default-50 dark:bg-default-100">
      <main className="flex-grow flex items-center justify-center relative px-4 pt-20 pb-32">
        {/* Theme toggle button - positioned absolutely to top right */}
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 dark:from-primary/10 dark:via-secondary/10 dark:to-primary/5" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 dark:opacity-10" />

        <div className={`w-full max-w-md z-10 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Brand Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-default-700 mb-4 tracking-tight flex items-center justify-center">
              Web<span className="text-primary">Tools</span>Center
              <span className="inline-block ml-2 relative">
                <Cog className="w-8 h-8 text-primary animate-spin-slow opacity-75" />
              </span>
            </h1>
            <p className="text-default-500 ">Access all your favorite tools in one place</p>
          </div>

          <Card className="bg-default-50 dark:bg-default-100 shadow-md">
            <CardBody className="p-6 space-y-8">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-default-700">Welcome</h2>
                <p className="text-default-500 mt-1">Continue with your preferred account</p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => handleSocialLogin('google-oauth2')}
                  className="w-full bg-default-100 hover:bg-default-200 dark:bg-default-200 dark:hover:bg-default-300 text-default-700 dark:text-default-800 border border-default-200 dark:border-default-300 h-14"
                  startContent={
                    <div className="bg-white text-blue-600 p-2 rounded-full">
                      <FaGoogle className="text-lg" />
                    </div>
                  }
                  isDisabled={isLoading}
                  size="lg"
                  variant="flat"
                >
                  <span className="font-medium">Continue with Google</span>
                </Button>

                <Button
                  onClick={() => handleSocialLogin('github')}
                  className="w-full bg-default-100 hover:bg-default-200 dark:bg-default-200 dark:hover:bg-default-300 text-default-700 dark:text-default-800 border border-default-200 dark:border-default-300 h-14"
                  startContent={
                    <div className="bg-white text-gray-900 p-2 rounded-full">
                      <FaGithub className="text-lg" />
                    </div>
                  }
                  isDisabled={isLoading}
                  size="lg"
                  variant="flat"
                >
                  <span className="font-medium">Continue with GitHub</span>
                </Button>

                <Button
                  onClick={() => handleSocialLogin('twitter')}
                  className="w-full bg-default-100 hover:bg-default-200 dark:bg-default-200 dark:hover:bg-default-300 text-default-700 dark:text-default-800 border border-default-200 dark:border-default-300 h-14"
                  startContent={
                    <div className="bg-white text-blue-400 p-2 rounded-full">
                      <FaTwitter className="text-lg" />
                    </div>
                  }
                  isDisabled={isLoading}
                  size="lg"
                  variant="flat"
                >
                  <span className="font-medium">Continue with Twitter</span>
                </Button>
              </div>

              <p className="text-center text-xs text-default-500 dark:text-default-400 mt-6">
                By continuing, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </p>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
}