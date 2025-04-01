'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, Button, Tooltip } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { FaGoogle, FaGithub, FaTwitter, FaFacebook, FaReddit, FaTwitch, FaDiscord } from 'react-icons/fa';
import { Cog } from 'lucide-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { toast, Toaster } from 'react-hot-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

// Define types for our providers
type Provider = {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  bgColor: string;
  hoverColor: string;
  iconColor: string;
};

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState('');
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    setIsVisible(true);
    // Redirect if user is already logged in
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSocialLogin = (connection: string, providerName: string) => {
    setIsLoading(true);
    setActiveProvider(providerName);
    try {
      window.location.href = `https://auth.webtoolscenter.com/authorize?client_id=${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_AUTH0_PRODUCTION_URL}/api/auth/callback&response_type=code&scope=openid profile email&connection=${connection}&prompt=login`;
      toast.success(`Connecting to ${providerName}...`);
    } catch (error) {
      console.error('Social login error:', error);
      setIsLoading(false);
      setActiveProvider('');
      toast.error('Login failed. Please try again.');
    }
  };

  // Social login providers configuration
  const providers: Provider[] = [
    { 
      id: 'google-oauth2', 
      name: 'Google', 
      icon: FaGoogle, 
      bgColor: 'bg-white dark:bg-gray-800', 
      hoverColor: 'hover:bg-gray-50 dark:hover:bg-gray-700', 
      iconColor: 'text-red-500' 
    },
    { 
      id: 'twitter', 
      name: 'X (Twitter)', 
      icon: FaTwitter, 
      bgColor: 'bg-white dark:bg-gray-800', 
      hoverColor: 'hover:bg-gray-50 dark:hover:bg-gray-700', 
      iconColor: 'text-black dark:text-white' 
    },
    { 
      id: 'github', 
      name: 'GitHub', 
      icon: FaGithub, 
      bgColor: 'bg-white dark:bg-gray-800', 
      hoverColor: 'hover:bg-gray-50 dark:hover:bg-gray-700', 
      iconColor: 'text-gray-800 dark:text-white' 
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: FaFacebook, 
      bgColor: 'bg-white dark:bg-gray-800', 
      hoverColor: 'hover:bg-gray-50 dark:hover:bg-gray-700', 
      iconColor: 'text-blue-600' 
    },
    { 
      id: 'reddit', 
      name: 'Reddit', 
      icon: FaReddit, 
      bgColor: 'bg-white dark:bg-gray-800', 
      hoverColor: 'hover:bg-gray-50 dark:hover:bg-gray-700', 
      iconColor: 'text-orange-600' 
    },
    { 
      id: 'twitch', 
      name: 'Twitch', 
      icon: FaTwitch, 
      bgColor: 'bg-white dark:bg-gray-800', 
      hoverColor: 'hover:bg-gray-50 dark:hover:bg-gray-700', 
      iconColor: 'text-purple-600' 
    },
    { 
      id: 'discord', 
      name: 'Discord', 
      icon: FaDiscord, 
      bgColor: 'bg-white dark:bg-gray-800', 
      hoverColor: 'hover:bg-gray-50 dark:hover:bg-gray-700', 
      iconColor: 'text-indigo-600' 
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative px-4">
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 animate-gradient-xy" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className={`w-full max-w-md transform transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}>
        {/* Brand/Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4 p-3 bg-content2/50 backdrop-blur-sm rounded-full shadow-lg">
            <Cog className="w-8 h-8 text-primary animate-spin-slow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome <span className="text-primary">Back</span>
          </h1>
          <p className="text-lg text-default-600 max-w-sm mx-auto">
            Sign in to access your all-in-one toolkit for web professionals
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-content2/50 backdrop-blur-sm shadow-xl">
          <CardBody className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Cog className="mr-3 text-primary" />
              Sign in with a Provider
            </h2>
            
            {/* Main providers */}
            <div className="space-y-3 mb-6">
              {providers.slice(0, 4).map((provider) => (
                <Button
                  key={provider.id}
                  onPress={() => handleSocialLogin(provider.id, provider.name)}
                  className="w-full h-12 rounded-xl transition-all"
                  startContent={
                    <div className={`${provider.iconColor} mr-2`}>
                      <provider.icon size={20} />
                    </div>
                  }
                  endContent={
                    isLoading && activeProvider === provider.name ? 
                    <div className="spinner h-5 w-5 border-2 border-t-transparent border-primary rounded-full animate-spin"></div> : 
                    null
                  }
                  isDisabled={isLoading}
                  variant="bordered"
                  color="primary"
                >
                  <span className="font-medium">Continue with {provider.name}</span>
                </Button>
              ))}
            </div>
            
            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700"></div>
              <span className="px-3 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">More options</span>
              <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>
            
            {/* Secondary providers */}
            <div className="flex justify-center space-x-4">
              {providers.slice(4).map((provider) => (
                <Tooltip key={provider.id} content={`Sign in with ${provider.name}`} className='text-default-700'>
                  <Button
                    onPress={() => handleSocialLogin(provider.id, provider.name)}
                    className="w-12 h-12 min-w-12 p-0 rounded-full transition-transform hover:scale-105"
                    isIconOnly
                    isDisabled={isLoading}
                    variant="bordered"
                    color="primary"
                  >
                    {isLoading && activeProvider === provider.name ? (
                      <div className="spinner h-5 w-5 border-2 border-t-transparent border-primary rounded-full animate-spin"></div>
                    ) : (
                      <provider.icon className={`${provider.iconColor} text-xl`} />
                    )}
                  </Button>
                </Tooltip>
              ))}
            </div>
            
            {/* Terms of Service */}
            <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
              By continuing, you agree to our <a href="https://www.webtoolscenter.com/terms" className="text-primary hover:underline">Terms</a> and <a href="https://www.webtoolscenter.com/privacy" className="text-primary hover:underline">Privacy Policy</a>
            </div>
          </CardBody>
        </Card>
        
        {/* Help Link */}
        <p className="text-center mt-6 text-xs text-gray-500 dark:text-gray-400">
          Need help? <a href="https://www.webtoolscenter.com/contact" className="text-primary hover:underline">Contact support</a>
        </p>
      </div>
    </div>
  );
}