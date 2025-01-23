// app/tool-request/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"
import { Card, CardBody, Input, Textarea, Button, Select, SelectItem } from "@nextui-org/react"
import { Lightbulb, ArrowRight, Target, Rocket, Users } from "lucide-react"
import toast from "react-hot-toast"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

interface FormData {
  toolName: string
  category: string
  description: string
  useCase: string
  targetAudience: string
}

const categories = [
  "Text",
  "Image",
  "CSS",
  "Coding",
  "Color",
  "Social Media",
  "Other"
]

export default function ToolRequestPage() {
  const { user, isLoading: userLoading } = useUser()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    toolName: "",
    category: "",
    description: "",
    useCase: "",
    targetAudience: ""
  })

  useEffect(() => {
    if (!userLoading && !user) {
      toast.error("Please sign in to request a tool")
      router.push(`/api/auth/login?returnTo=${encodeURIComponent(window.location.pathname)}`)
      return
    }
    setIsVisible(true)
  }, [user, userLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast.error("Please sign in to request a tool")
      router.push(`/api/auth/login?returnTo=${encodeURIComponent(window.location.pathname)}`)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/tool-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: user.sub,
          userEmail: user.email
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit tool request")
      }

      toast.success("Tool request submitted successfully")
      router.push("/dashboard")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit tool request")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (userLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

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
              Request a<span className="text-primary">Tool</span>
              <span className="inline-block ml-3">
                <Lightbulb className="w-12 h-12 text-primary animate-bounce opacity-75" />
              </span>
            </h1>
          </div>
          <p className="text-xl text-default-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Have an idea for a useful tool? Submit your request and help us grow our collection!
          </p>
        </div>
      </section>

      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Tool Name"
                placeholder="What would you like to call this tool?"
                value={formData.toolName}
                onChange={(e) => setFormData((prev) => ({ ...prev, toolName: e.target.value }))}
                variant="bordered"
                isRequired
                classNames={{
                  label: "text-default-700",
                  input: "text-default-900",
                }}
              />

              <Select
                label="Category"
                placeholder="Select a category"
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                variant="bordered"
                isRequired
                classNames={{
                  label: "text-default-700",
                  value: "text-default-900",
                }}
              >
                 {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="text-default-900 hover:text-primary hover:bg-default-100"
                  >
                    {category}
                  </SelectItem>
                ))}
              </Select>

              <Textarea
                label="Description"
                placeholder="Describe the tool and its main features"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                variant="bordered"
                minRows={3}
                isRequired
                classNames={{
                  label: "text-default-700",
                  input: "text-default-900",
                }}
              />

              <Textarea
                label="Use Case"
                placeholder="How would this tool be useful? What problems would it solve?"
                value={formData.useCase}
                onChange={(e) => setFormData((prev) => ({ ...prev, useCase: e.target.value }))}
                variant="bordered"
                minRows={2}
                isRequired
                classNames={{
                  label: "text-default-700",
                  input: "text-default-900",
                }}
              />

              <Input
                label="Target Audience"
                placeholder="Who would benefit from this tool?"
                value={formData.targetAudience}
                onChange={(e) => setFormData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                variant="bordered"
                isRequired
                classNames={{
                  label: "text-default-700",
                  input: "text-default-900",
                }}
              />

              <div className="flex justify-end">
                <Button color="primary" type="submit" isLoading={isSubmitting} className="px-8">
                  Submit Request
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </main>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-content1/50 to-background" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center flex items-center justify-center">
            <Rocket className="mr-3 text-primary" />
            Why Request Tools?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-10 h-10 text-primary" />,
                title: "Solve Problems",
                description: "Help us create tools that address real needs.",
              },
              {
                icon: <Users className="w-10 h-10 text-success" />,
                title: "Support Community",
                description: "Share your ideas to benefit everyone.",
              },
              {
                icon: <Lightbulb className="w-10 h-10 text-warning" />,
                title: "Shape the Future",
                description: "Influence the development of new features.",
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