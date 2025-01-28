"use client"

import React, { useState, useEffect } from "react"
import { Card, CardBody, Button } from "@nextui-org/react"
import {
  ChevronRight,
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
} from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const features = [
  {
    icon: <Command className="w-8 h-8 text-primary" />,
    title: "All-in-One Solution",
    description: "Access a comprehensive suite of web development tools in one place.",
  },
  {
    icon: <Wrench className="w-8 h-8 text-secondary" />,
    title: "User-Friendly Interface",
    description: "Intuitive design makes our tools accessible to everyone.",
  },
  {
    icon: <Zap className="w-8 h-8 text-warning" />,
    title: "Lightning Fast",
    description: "Optimized performance for quick and efficient results.",
  },
]

const stats = [
  { label: "Active Users", value: 50000, color: "success" },
  { label: "Tools Available", value: 80, color: "primary" },
  { label: "Countries Reached", value: 120, color: "secondary" },
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
          <p className="text-xl text-default-600 mb-6 max-w-2xl mx-auto">
            Empowering developers and designers with powerful, easy-to-use web tools.
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
                At WebToolsCenter, our mission is to simplify web development and design processes by providing a
                comprehensive suite of tools that cater to developers, designers, and content creators of all skill
                levels. We believe that powerful tools should be accessible to everyone, which is why we've created an
                intuitive platform that combines functionality with ease of use.
              </p>
              <p className="text-lg text-default-600">
                Whether you're a seasoned professional or just starting your journey in web development, our tools are
                designed to enhance your productivity, streamline your workflow, and bring your creative visions to
                life.
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

        {/* Website Features Section (replacing Our Impact) */}
        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Card className="bg-content2/50 backdrop-blur-sm">
            <CardBody className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Discover Our Website</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Wide Range of Tools</h3>
                  <p className="text-default-600">
                    Access over 50 specialized web development and design tools, all in one place.
                  </p>
                </div>
                <div className="text-center">
                  <Cpu className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Cloud-Based Processing</h3>
                  <p className="text-default-600">
                    Leverage our powerful servers for resource-intensive tasks, freeing up your local machine.
                  </p>
                </div>
                <div className="text-center">
                  <Clock className="w-12 h-12 text-warning mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Regular Updates</h3>
                  <p className="text-default-600">
                    Enjoy frequent tool updates and new additions to stay ahead in the ever-evolving web landscape.
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
                WebToolsCenter was born out of a simple idea: to create a single platform where web professionals could
                find all the tools they need. Our founders, experienced developers themselves, recognized the need for a
                centralized hub of efficient, user-friendly web tools.
              </p>
              <p className="text-lg text-default-600 mb-4">
                What started as a small collection of utilities has grown into a comprehensive toolkit, constantly
                evolving to meet the changing needs of the web development community. Today, we're proud to offer over
                50 tools across various categories, from text and image manipulation to advanced coding utilities and
                design helpers.
              </p>
              <p className="text-lg text-default-600">
                Our commitment to quality, usability, and innovation drives us to continually improve and expand our
                offerings, ensuring that WebToolsCenter remains at the forefront of web development resources.
              </p>
            </CardBody>
          </Card>
        </section>

        {/* Team Section */}
        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center justify-center">
            <Users className="mr-3 text-secondary" />
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Jane Doe", role: "Founder & CEO", icon: <Rocket className="w-8 h-8 text-primary" /> },
              { name: "John Smith", role: "Lead Developer", icon: <Code className="w-8 h-8 text-secondary" /> },
              { name: "Alice Johnson", role: "UX Designer", icon: <Sparkles className="w-8 h-8 text-warning" /> },
            ].map((member, index) => (
              <Card key={index} className="bg-content2/50 backdrop-blur-sm">
                <CardBody className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{member.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                  <p className="text-default-600">{member.role}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center animate-fade-in-up" style={{ animationDelay: "1s" }}>
          <Card className="bg-content2/50 backdrop-blur-sm">
            <CardBody className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">Join Our Community</h2>
              <p className="text-lg text-default-600 mb-8 max-w-2xl mx-auto">
                Become part of the WebToolsCenter community today. Explore our tools, enhance your projects, and connect
                with fellow web enthusiasts.
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

