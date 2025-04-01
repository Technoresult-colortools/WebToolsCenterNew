"use client"

import React, { useState, useEffect } from "react"
import { Card, CardBody, Button } from "@nextui-org/react"
import {
  Star,
  Command,
  Wrench,
  Zap,
  Sparkles,
  Users,
  Code,
  Rocket,
  ArrowRight,
  Globe,
  Cpu,
  Clock,
  Image,
  Type,
  Share,
  Plus,
} from "lucide-react"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const features = [
  {
    icon: <Command className="w-8 h-8 text-primary" />,
    title: "All-in-One Solution",
    description: "Access a comprehensive suite of web development tools in one place, organized into intuitive categories.",
  },
  {
    icon: <Wrench className="w-8 h-8 text-secondary" />,
    title: "User-Friendly Interface",
    description: "Our intuitive design makes specialized web tools accessible to everyone, regardless of experience level.",
  },
  {
    icon: <Zap className="w-8 h-8 text-warning" />,
    title: "Lightning Fast Performance",
    description: "All tools are optimized for speed and efficiency, allowing you to complete tasks quickly.",
  },
]

const toolCategories = [
  {
    icon: <Code className="w-12 h-12 text-primary mx-auto mb-4" />,
    title: "Coding Tools",
    description: "HTML, CSS, and JavaScript formatters, minifiers, Base64 encoders, SHA encryption tools, and JSON validators."
  },
  {
    icon: <Cpu className="w-12 h-12 text-secondary mx-auto mb-4" />,
    title: "CSS Tools",
    description: "Create stunning web elements with CSS generators for gradients, shadows, flexbox layouts, and more."
  },
  {
    icon: <Star className="w-12 h-12 text-warning mx-auto mb-4" />,
    title: "Color Tools",
    description: "Manage colors with converters, palette generators, gradient tools, color wheels, and extractors."
  },
  {
    icon: <Image className="w-12 h-12 text-primary mx-auto mb-4" />,
    title: "Image Tools",
    description: "Transform images with resizers, filters, converters, color extractors, and specialized SVG tools."
  },
  {
    icon: <Type className="w-12 h-12 text-secondary mx-auto mb-4" />,
    title: "Text Tools",
    description: "Manipulate text with case converters, counters, encoders, Lorem Ipsum generators, and more."
  },
  {
    icon: <Share className="w-12 h-12 text-warning mx-auto mb-4" />,
    title: "Social Media Tools",
    description: "Enhance your online presence with Open Graph meta generation, YouTube thumbnail tools, and more."
  },
]

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-16 pb-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 animate-gradient-xy" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div
          className={`max-w-6xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Web<span className="text-primary">Tools</span>Center
            <span className="inline-block ml-3">
              <Sparkles className="w-8 h-8 text-warning animate-pulse" />
            </span>
          </h1>
          <p className="text-xl text-default-600 mb-6 max-w-3xl mx-auto">
            Simplifying Web Development, One Tool at a Time
          </p>
          <p className="text-lg text-default-600 mb-6 max-w-3xl mx-auto">
            We're dedicated to providing web professionals with a comprehensive suite of tools designed to streamline workflows and enhance productivity. 
            Our platform brings together over 80 specialized tools across multiple categories.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {/* Mission Section */}
        <section className="mb-16 animate-fade-in-up">
          <Card className="bg-content2/50 backdrop-blur-sm">
            <CardBody className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-default-600 mb-4">
                We believe that powerful web development tools should be accessible to everyone. Our mission is to simplify the web development and design process by creating an intuitive platform that combines functionality with ease of use.
              </p>
              <p className="text-lg text-default-600">
                Whether you're a seasoned professional or just starting your journey in web development, our tools are designed to enhance your productivity, streamline your workflow, and bring your creative visions to life.
              </p>
            </CardBody>
          </Card>
        </section>

        {/* Features Section */}
        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center justify-center">
            <Star className="mr-3 text-warning" />
            Why Choose WebToolsCenter?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-content2/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                isPressable
              >
                <CardBody className="p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-default-600">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Tool Categories Section */}
        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Card className="bg-content2/50 backdrop-blur-sm">
            <CardBody className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Our Tools</h2>
              <p className="text-lg text-default-600 mb-6 text-center">
                WebToolsCenter features a diverse collection of utilities organized into specialized categories:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {toolCategories.map((category, index) => (
                  <div key={index} className="text-center">
                    {category.icon}
                    <h3 className="text-xl font-bold text-foreground mb-2">{category.title}</h3>
                    <p className="text-default-600">{category.description}</p>
                  </div>
                ))}
                <div className="text-center">
                  <Plus className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Miscellaneous Tools</h3>
                  <p className="text-default-600">
                    QR code generators, barcode creators, password generators, unit converters, list randomizers, and more.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Our Story Section */}
        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <Card className="bg-content2/50 backdrop-blur-sm">
            <CardBody className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-lg text-default-600 mb-4">
                WebToolsCenter began with a simple observation: web developers and designers were wasting valuable time searching for different tools across multiple websites. What started as a collection of essential utilities has grown into a comprehensive toolkit serving the diverse needs of the web development community.
              </p>
              <p className="text-lg text-default-600 mb-4">
                Our journey began with basic coding utilities like HTML, CSS, and JavaScript formatters and minifiers. As developers ourselves, we understood the frustration of context-switching between different websites for related tasks. We expanded our offerings to include color tools, image utilities, text formatting options, and specialized CSS generators.
              </p>
              <p className="text-lg text-default-600">
                Today, we're proud to offer over 80 tools across various categories, from text and image manipulation to advanced coding utilities and design helpers. Each tool is crafted with attention to detail and optimized for professional use while remaining accessible to beginners.
              </p>
            </CardBody>
          </Card>
        </section>

        {/* Website Features Section */}
        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <Card className="bg-content2/50 backdrop-blur-sm">
            <CardBody className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Platform Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">80+ Specialized Tools</h3>
                  <p className="text-default-600">
                    Access over 80 specialized web development and design tools, all organized in intuitive categories.
                  </p>
                </div>
                <div className="text-center">
                  <Cpu className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Clean Interfaces</h3>
                  <p className="text-default-600">
                    Every tool features a clean interface with clear instructions, making them accessible to everyone.
                  </p>
                </div>
                <div className="text-center">
                  <Clock className="w-12 h-12 text-warning mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Continuous Updates</h3>
                  <p className="text-default-600">
                    We're continuously improving our platform based on user feedback and emerging web development trends.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center animate-fade-in-up" style={{ animationDelay: "1s" }}>
          <Card className="bg-content2/50 backdrop-blur-sm">
            <CardBody className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">Join Our Community</h2>
              <p className="text-lg text-default-600 mb-8 max-w-2xl mx-auto">
                Start using our tools today and experience the difference of having all your web development utilities in one convenient location.
              </p>
              <Button
                as={Link}
                href="/categories"
                color="primary"
                size="lg"
                endContent={<ArrowRight className="ml-2" />}
              >
                Explore Our Tools
              </Button>
            </CardBody>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}