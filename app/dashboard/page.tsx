'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Card, CardBody, CardHeader, Avatar, Button, Spinner, Tabs, Tab } from "@nextui-org/react";
import { Mail, UserIcon, Calendar, Key, Star, MessageSquare, Bug, PlusCircle, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FavoritesList } from '@/components/FavoritesList';
import { DashboardComments } from '@/components/DashboardComments';
import { DashboardBugReports } from '@/components/DashboardBugReports';
import { DashboardToolRequests } from '@/components/DashboardToolRequests';

// Placeholder components for new sections


const ToolRequests = () => (
  <div className="p-4 min-h-[300px] flex items-center justify-center">
    <div className="text-center">
      <PlusCircle className="w-12 h-12 text-default-300 mx-auto mb-4" />
      <p className="text-default-500 text-lg">Tool request feature is coming soon</p>
      <p className="text-default-400 text-sm mt-2">Request new tools and features</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Spinner size="lg" color="primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardBody>
              <div className="text-center">
                <p className="text-danger text-lg">Error loading user data</p>
                <Button 
                  color="primary" 
                  variant="flat"
                  href="/api/auth/login"
                  className="mt-4"
                >
                  Try Again
                </Button>
              </div>
            </CardBody>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardBody>
              <div className="text-center">
                <UserIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-xl mb-4">Please log in to view your dashboard</p>
                <Button 
                  color="primary" 
                  href="/api/auth/login"
                  className="mt-2"
                  endContent={<ChevronRight className="w-4 h-4" />}
                >
                  Login to Continue
                </Button>
              </div>
            </CardBody>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow py-8 max-w-7xl mx-auto px-4 w-full">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/5 animate-gradient-xy rounded-3xl" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 rounded-3xl backdrop-blur-3xl" />
          
          <div className="relative p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
                <span className="bg-primary/10 p-2 rounded-xl">
                  <UserIcon className="w-8 h-8 text-primary" />
                </span>
                Dashboard
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="md:col-span-2 bg-content2/50 backdrop-blur-sm shadow-lg">
                <CardHeader className="flex gap-4">
                  <Avatar
                    isBordered
                    radius="full"
                    size="lg"
                    src={user.picture || undefined}
                    fallback={
                      <UserIcon className="w-8 h-8 text-default-500" />
                    }
                  />
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold text-foreground">
                      {user.name || 'User Profile'}
                    </h2>
                    <p className="text-small text-default-500">
                      Account Details
                    </p>
                  </div>
                </CardHeader>
                <CardBody className="gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 bg-content3/50 p-4 rounded-xl">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-small text-default-500">Email</p>
                        <p className="text-foreground">{user.email || 'No email provided'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 bg-content3/50 p-4 rounded-xl">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Key className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-small text-default-500">Auth Provider</p>
                        <p className="text-foreground capitalize">
                          {user.sub?.split('|')[0] || 'Auth0'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-content3/50 p-4 rounded-xl">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-small text-default-500">Last Updated</p>
                        <p className="text-foreground">
                          {user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <Card className="bg-content2/50 backdrop-blur-sm shadow-lg">
              <CardBody>
                <Tabs 
                  aria-label="Dashboard sections" 
                  color="primary" 
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6",
                    cursor: "w-full bg-primary",
                    tab: "max-w-fit px-2 h-12",
                    tabContent: "group-data-[selected=true]:text-primary"
                  }}
                >
                  <Tab
                    key="favorites"
                    title={
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4" />
                        <span>Favorite Tools</span>
                      </div>
                    }
                  >
                    <FavoritesList userId={user?.sub} />
                  </Tab>
                  <Tab
                    key="comments"
                    title={
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>Comments</span>
                      </div>
                    }
                  >
                    <DashboardComments />
                  </Tab>
                  <Tab
                    key="bug-reports"
                    title={
                      <div className="flex items-center space-x-2">
                        <Bug className="w-4 h-4" />
                        <span>Bug Reports</span>
                      </div>
                    }
                  >
                    <DashboardBugReports />
                  </Tab>
                  <Tab
                    key="tool-requests"
                    title={
                      <div className="flex items-center space-x-2">
                        <PlusCircle className="w-4 h-4" />
                        <span>Tool Requests</span>
                      </div>
                    }
                  >
                    <DashboardToolRequests />
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}