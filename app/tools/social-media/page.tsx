"use client"

import React, { useState, useEffect } from "react"
import { Card, CardBody, Input, Button } from "@nextui-org/react"
import { Search, Share2, Wand2, Sparkles, ArrowRight } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { categories, allTools } from "@/data/tools"
import { faShare } from "@fortawesome/free-solid-svg-icons"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function SocialMediaToolsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Filter only Social Media category tools
  const socialMediaTools = allTools.filter((tool) => tool.category === "Social Media")

  const filteredTools = socialMediaTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 animate-gradient-xy" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div
          className={`max-w-7xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative mb-6">
            <span className="inline-block animate-bounce mb-4">
              <FontAwesomeIcon icon={faShare} className="w-16 h-16 text-primary opacity-75" />
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
              Social Media <span className="text-primary">Tools</span>
            </h1>
          </div>
          <p className="text-xl text-default-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Enhance your social media presence with our powerful collection of tools and utilities for content creators
            and marketers.
          </p>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex gap-4 flex-col sm:flex-row">
              <Input
                placeholder="Search social media tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search className="text-default-400 w-6 h-6" />}
                className="flex-grow"
                size="lg"
                classNames={{
                  input: "text-foreground text-lg",
                  inputWrapper: "hover:bg-default-100/70 h-14",
                  base: "h-14",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <main className="flex-grow py-12 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <Card
                key={tool.name}
                isPressable
                isHoverable
                className={`w-full bg-content2/50 backdrop-blur-sm group transition-all duration-500 ease-out
                  ${hoveredTool === tool.name ? "scale-105 shadow-xl shadow-primary/20" : "scale-100"}
                `}
                onMouseEnter={() => setHoveredTool(tool.name)}
                onMouseLeave={() => setHoveredTool(null)}
              >
                <CardBody className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${categories.find((cat) => cat.name === "Social Media")?.gradient} rounded-xl flex items-center justify-center transform transition-all duration-500 ease-out
                      ${hoveredTool === tool.name ? "scale-110 rotate-12" : "scale-100 rotate-0"}
                    `}
                    >
                      <FontAwesomeIcon icon={tool.icon} className="text-2xl text-primary" />
                    </div>
                    <div className="flex-grow space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {tool.name}
                        </h3>
                      </div>
                      <p className="text-default-600 text-sm leading-relaxed">{tool.description}</p>
                      <div className="flex justify-end pt-2">
                        <Button
                          color="primary"
                          variant="flat"
                          size="sm"
                          endContent={
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          }
                          href={tool.href}
                          as="a"
                          className="group"
                        >
                          Try now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <FontAwesomeIcon icon={faShare} className="w-16 h-16 text-default-300 mx-auto mb-4" />
              <p className="text-xl text-default-600">
                No social media tools found matching your criteria. Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-content1/50 to-background" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center flex items-center justify-center">
            <Wand2 className="mr-3 text-primary" />
            Why Use Our Social Media Tools?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: <Share2 className="w-10 h-10 text-warning" />,
                title: "Boost Engagement",
                description: "Create compelling content that resonates with your audience",
              },
              {
                icon: <Sparkles className="w-10 h-10 text-success" />,
                title: "Time-Saving",
                description: "Streamline your social media workflow with efficient tools",
              },
              {
                icon: <Wand2 className="w-10 h-10 text-primary" />,
                title: "Cross-Platform",
                description: "Manage multiple social media platforms from one central hub",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-content2/50 backdrop-blur-sm hover:-translate-y-2 transition-all duration-300 border-none"
              >
                <CardBody className="p-8 text-center">
                  <div className="mb-6 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-default-600">{feature.description}</p>
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

