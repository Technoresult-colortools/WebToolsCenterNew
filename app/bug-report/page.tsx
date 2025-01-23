// app/bug-report/page.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardBody, Input, Textarea, Button } from "@nextui-org/react"
import { Bug, ArrowRight, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react"
import toast from "react-hot-toast"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

interface FormData {
  toolName: string
  toolId: string
  subject: string
  description: string
}

export default function BugReportPage() {
    const { user, isLoading: userLoading } = useUser()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
  
    const [formData, setFormData] = useState<FormData>({
      toolName: searchParams?.get("toolName") ?? "",
      toolId: searchParams?.get("toolId") ?? "",
      subject: "",
      description: "",
    })
  
    useEffect(() => {
      if (!userLoading && !user) {
        toast.error("Please sign in to report a bug")
        router.push(`/api/auth/login?returnTo=${encodeURIComponent(window.location.pathname + window.location.search)}`)
        return
      }
      setIsVisible(true)
    }, [user, userLoading, router])
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!user) {
        toast.error("Please sign in to report a bug")
        router.push(`/api/auth/login?returnTo=${encodeURIComponent(window.location.pathname + window.location.search)}`)
        return
      }
      
      setIsSubmitting(true)
  
      try {
        const response = await fetch("/api/bug-reports", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
  
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to submit bug report")
        }
  
        toast.success("Bug report submitted successfully")
        router.push("/dashboard")
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to submit bug report")
        console.error(error)
      } finally {
        setIsSubmitting(false)
      }
    }
  
    // Show loading state
    if (userLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )
    }
  
    // Don't render the form at all if not authenticated
    if (!user) {
      return null
    }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section with animated gradient background */}
      <section className="pt-32 pb-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 animate-gradient-xy" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div
          className={`max-w-7xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Bug<span className="text-primary">Report</span>
              <span className="inline-block ml-3">
                <Bug className="w-12 h-12 text-primary animate-bounce opacity-75" />
              </span>
            </h1>
          </div>
          <p className="text-xl text-default-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Help us improve by reporting any issues you encounter. Your feedback is valuable!
          </p>
        </div>
      </section>

      {/* Bug Report Form */}
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardBody className="p-8 max-w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Tool Name"
                value={formData.toolName}
                isReadOnly
                variant="bordered"
                classNames={{
                  label: "text-default-700",
                  input: "text-default-900",
                
                }} 
              />

              <Input
                label="Subject"
                placeholder="Brief description of the issue"
                value={formData.subject}
                onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                variant="bordered"
                isRequired
                classNames={{
                  label: "text-default-700",
                  input: "text-default-900",
                }}
              />

              <Textarea
                label="Description"
                placeholder="Please provide detailed information about the issue"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                variant="bordered"
                minRows={4}
                isRequired
                classNames={{
                  label: "text-default-700",
                  input: "text-default-900",
                }}
              />

              <div className="flex justify-end">
                <Button color="primary" type="submit" isLoading={isSubmitting} className="px-8">
                  Submit Report
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </main>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-content1/50 to-background" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center flex items-center justify-center">
            <HelpCircle className="mr-3 text-warning" />
            Why Report Bugs?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: <AlertTriangle className="w-10 h-10 text-warning" />,
                title: "Identify Issues",
                description: "Help us pinpoint and address problems quickly.",
              },
              {
                icon: <CheckCircle className="w-10 h-10 text-success" />,
                title: "Improve Quality",
                description: "Your reports contribute to better tools for everyone.",
              },
              {
                icon: <Bug className="w-10 h-10 text-primary" />,
                title: "Enhance User Experience",
                description: "Together, we can create a smoother, bug-free platform.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-content2/50 backdrop-blur-sm hover:-translate-y-2 transition-all duration-300 border-none"
              >
                <CardBody className="p-8 text-center">
                  <div className="mb-6 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-default-500">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

