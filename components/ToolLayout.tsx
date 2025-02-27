'use client'

import React, { useState } from 'react'
import { Button, ButtonGroup, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react"
import { Toaster } from 'react-hot-toast'
import { Bug,  LogIn, AlertTriangle } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/sidebarTools'
import FavoriteButton from '@/components/FavoriteButton'
import { useRouter } from 'next/navigation'
import CommentSection from '@/components/CommentSection'
import { useUser } from '@auth0/nextjs-auth0/client'
import CompactShare from '@/components/CompactShare';
import RelatedTools from '@/components/RelatedTools'

interface ToolLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  toolId: string
}

export default function ToolLayout({ children, title, description, toolId }: ToolLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useUser()
  const router = useRouter()
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleReportClick = () => {
    if (!user) {
      setIsModalOpen(true)
    } else {
      router.push(`/bug-report?toolName=${encodeURIComponent(title)}&toolId=${encodeURIComponent(toolId)}`)
    }
  }

  const handleLogin = () => {
    localStorage.setItem('loginRedirect', window.location.pathname)
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--nextui-colors-content1)',
            color: 'var(--nextui-colors-foreground)',
            border: '1px solid var(--nextui-colors-border)'
          },
          className: '!bg-content1 !dark:bg-content1 !text-foreground !dark:text-foreground'
        }}
      />
      <Header />
      
      <div className="flex-grow flex relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 dark:from-primary/5 dark:via-secondary/5 dark:to-primary/2 animate-gradient-xy" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 dark:opacity-5" />
        
        <aside className="hidden md:block bg-content1/50 dark:bg-content1/20 backdrop-blur-sm border-r border-divider w-74">
          <Sidebar />
        </aside>

        <main className="flex-grow w-full overflow-y-auto px-4 py-12 relative">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 md:mb-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary">
                  {title}
                </h1>

                  <p className="text-default-500 dark:text-default-400 text-sm sm:text-base mt-2 max-w-2xl">
                    {description}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 self-end md:self-center">
                  <ButtonGroup size="sm" variant="flat">
                    <CompactShare
                      toolName={title}
                      isOpen={isShareOpen}
                      onOpenChange={() => setIsShareOpen(!isShareOpen)}
                    />
                    <Tooltip content="Add to Favorites" className="bg-content2 dark:bg-content2 text-foreground dark:text-foreground">
                      <div>
                        <FavoriteButton toolId={toolId} />
                      </div>
                    </Tooltip>
                    
                    <Tooltip 
                      content="Report Issue"
                      className="bg-content2 dark:bg-content2 text-foreground dark:text-foreground"
                    >
                      <Button
                        variant="flat"
                        color="danger"
                        onClick={handleReportClick}
                        className="bg-danger-500/10 hover:bg-danger-500/20 dark:bg-danger-500/20 dark:hover:bg-danger-500/30"
                      >
                        <Bug className="h-4 w-4" />
                        <span className="ml-1">Report</span>
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                </div>
              </div>
            </div>

            <div className="bg-content1/50 dark:bg-default-50 backdrop-blur-sm rounded-xl p-6 mb-8">
              {children}
            </div>
            {/* Add the RelatedTools component here */}
            <RelatedTools 
              toolId={toolId} 
              toolName={title}  // Pass the title as toolName
              maxTools={3} 
            />
            <div className="mt-8">
              <CommentSection toolId={toolId} />
            </div>
          </div>
        </main>
      </div>
      
      <Modal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen}
        backdrop="blur"
        placement="center"
        classNames={{
          base: "bg-content1 dark:bg-content1",
          header: "border-b border-divider",
          body: "py-6",
          footer: "border-t border-divider"
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn"
              }
            }
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-danger" />
                  <h3 className="text-xl font-semibold text-foreground">Authentication Required</h3>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-16 h-16 bg-danger/10 dark:bg-danger/20 rounded-full flex items-center justify-center mb-4">
                    <Bug className="w-8 h-8 text-danger" />
                  </div>
                  <p className="text-default-600 font-medium mb-2">
                    Sign in to Report Issues
                  </p>
                  <p className="text-default-500 text-sm mb-4">
                    To help us maintain quality and prevent spam, please sign in or create an account to report issues.
                  </p>
                  <div className="w-full p-4 bg-default-100 dark:bg-default-50 rounded-lg">
                    <h4 className="text-sm font-medium text-default-700 dark:text-default-400 mb-2">
                      What you can do after signing in:
                    </h4>
                    <ul className="text-sm text-default-500">
                      <li className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <span className="text-success text-xs">✓</span>
                        </div>
                        Submit detailed bug reports
                      </li>
                      <li className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <span className="text-success text-xs">✓</span>
                        </div>
                        Track the status of your reports
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <span className="text-success text-xs">✓</span>
                        </div>
                        Get notified of issue resolutions
                      </li>
                    </ul>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="light" 
                  onPress={onClose}
                  className="font-medium"
                >
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  onPress={() => {
                    onClose()
                    handleLogin()
                  }}
                  className="font-medium"
                  startContent={<LogIn className="w-4 h-4" />}
                >
                  Sign In / Register
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
      <Footer />
    </div>
  )
}