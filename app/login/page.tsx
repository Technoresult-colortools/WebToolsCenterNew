'use client';

import { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Input, Divider } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { FaGoogle, FaGithub, FaTwitter } from 'react-icons/fa';
import { Cog } from 'lucide-react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const searchParams = new URLSearchParams({
        returnTo: '/dashboard',
        prompt: 'login'
      });
      window.location.href = `/api/auth/login?${searchParams.toString()}`;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (connection: string) => {
    setIsLoading(true);
    try {
      window.location.href = `/api/auth/login?connection=${connection}`;
    } catch (error) {
      console.error('Social login error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow flex items-center justify-center relative px-4 pt-20 pb-32">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 animate-gradient-xy" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className={`w-full max-w-md z-10 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Brand Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">
              Web<span className="text-primary">Tools</span>Center
              <span className="inline-block ml-2">
                <Cog className="w-8 h-8 text-primary animate-spin-slow opacity-75" />
              </span>
            </h1>
            <p className="text-default-500">Access all your favorite tools in one place</p>
          </div>

          <Card className="bg-content2/50 backdrop-blur-sm border-1 border-white/20">
            <CardHeader className="flex flex-col gap-2 items-center pt-8">
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="text-default-500">Sign in to your account</p>
            </CardHeader>
            <CardBody className="space-y-6 px-8 pb-8">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="bordered"
                  classNames={{
                    label: "text-default-600",
                    input: "text-default-600",
                  }}
                  required
                  disabled={isLoading}
                />
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="bordered"
                  classNames={{
                    label: "text-default-600",
                    input: "text-default-600",
                  }}
                  required
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  color="primary" 
                  className="w-full font-medium shadow-lg hover:shadow-primary/25 transition-shadow"
                  size="lg"
                  isLoading={isLoading}
                >
                  Sign In
                </Button>
              </form>

              <div className="relative">
                <Divider className="my-4" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-content2/50 backdrop-blur-sm px-4 text-default-500">
                  or continue with
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant="flat"
                  onClick={() => handleSocialLogin('google-oauth2')}
                  className="w-full bg-content1/50 hover:bg-content1 transition-colors"
                  startContent={<FaGoogle className="text-lg" />}
                  isDisabled={isLoading}
                >
                  Google
                </Button>
                <Button
                  variant="flat"
                  onClick={() => handleSocialLogin('github')}
                  className="w-full bg-content1/50 hover:bg-content1 transition-colors"
                  startContent={<FaGithub className="text-lg" />}
                  isDisabled={isLoading}
                >
                  GitHub
                </Button>
                <Button
                  variant="flat"
                  onClick={() => handleSocialLogin('twitter')}
                  className="w-full bg-content1/50 hover:bg-content1 transition-colors"
                  startContent={<FaTwitter className="text-lg" />}
                  isDisabled={isLoading}
                >
                  Twitter
                </Button>
              </div>

              <p className="text-center text-small text-default-500">
                Don't have an account?{' '}
                <button
                  onClick={() => window.location.href = '/api/auth/login?screen_hint=signup'}
                  className="text-primary hover:underline font-medium"
                  disabled={isLoading}
                >
                  Sign up
                </button>
              </p>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
}

