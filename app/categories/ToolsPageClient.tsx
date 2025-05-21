"use client"

import React, { useState, useEffect } from "react"
import { Card, CardBody, Input, Button, Chip } from "@nextui-org/react"
import { Search, Wrench, Filter, ArrowRight } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { categories, allTools, Tool } from "@/data/tools"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredTools = allTools.filter(tool => {
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const renderToolCard = (tool: Tool) => (
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
                          className={`w-12 h-12 bg-gradient-to-br ${categories.find((cat) => cat.name === "Text")?.gradient} rounded-xl flex items-center justify-center transform transition-all duration-500 ease-out
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
              <Chip size="sm" color="primary" variant="flat">
                {tool.category}
              </Chip>
            </div>
            <p className="text-default-600 text-sm leading-relaxed mb-2">{tool.description}</p>
            <div className="flex justify-end pt-1">
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
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight leading-tight">
              Our<span className="text-primary"> Tools</span>
              <span className="inline-block ml-2 sm:ml-3 align-middle">
                <Wrench className="w-8 h-8 sm:w-12 sm:h-12 text-primary animate-spin-slow opacity-75" />
              </span>
            </h1>
          </div>
          <p className="text-xl text-default-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive collection of web development tools designed to streamline your workflow.
          </p>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex gap-4 flex-col sm:flex-row">
              <Input
                placeholder="Search tools..."
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
              <Button
                color="primary"
                variant="flat"
                startContent={<Filter className="w-6 h-6" />}
                size="lg"
                className="px-8 min-w-[120px] h-14"
              >
                Filters
              </Button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <Button
              radius="full"
              variant={activeCategory === "All" ? "solid" : "ghost"}
              color="primary"
              onClick={() => setActiveCategory("All")}
              size="lg"
              className="transition-all duration-300 hover:scale-105"
            >
              All Tools
            </Button>
            {categories.map((category) => (
              <Button
                key={category.name}
                radius="full"
                variant={activeCategory === category.name ? "solid" : "ghost"}
                color="primary"
                onClick={() => setActiveCategory(category.name)}
                startContent={<FontAwesomeIcon icon={category.icon} className="text-sm" />}
                size="lg"
                className="transition-all duration-300 hover:scale-105"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <main className="flex-grow py-12 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTools.length > 0 ? (
            filteredTools.map(tool => renderToolCard(tool))
          ) : (
            <div className="col-span-full text-center py-16">
              <Wrench className="w-16 h-16 text-default-300 mx-auto mb-4 opacity-50" />
              <p className="text-xl text-default-500">
                No tools found matching your criteria. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </main>

      

      <Footer />
    </div>
  )
}