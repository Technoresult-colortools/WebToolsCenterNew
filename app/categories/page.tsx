'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardBody, Input, Button, Chip } from "@nextui-org/react"
import { Search, Wrench, Filter, ArrowRight } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { categories, allTools, Tool } from '@/data/tools'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredTools = allTools.filter(tool => {
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const renderToolCard = (tool: Tool) => (
    <Card 
      key={tool.name}
      isPressable
      isHoverable
      className="w-full bg-content2/50 backdrop-blur-sm hover:-translate-y-2 transition-all duration-300"
    >
      <CardBody className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <FontAwesomeIcon icon={tool.icon} className="text-2xl text-white" />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-foreground">
                {tool.name}
              </h3>
              <Chip size="sm" color="primary" variant="flat">
                {tool.category}
              </Chip>
            </div>
            <p className="text-default-500 text-sm mb-4">
              {tool.description}
            </p>
            <Button
              color="primary"
              variant="flat"
              size="sm"
              endContent={<ArrowRight className="w-4 h-4" />}
              href={tool.href}
              as="a"
            >
              Try now
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-10 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 animate-gradient-xy" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className={`max-w-7xl mx-auto text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Our<span className="text-primary">Tools</span>
              <span className="inline-block ml-3">
                <Wrench className="w-12 h-12 text-primary animate-spin-slow opacity-75" />
              </span>
            </h1>
          </div>
          <p className="text-xl text-default-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive collection of web development tools designed to streamline your workflow.
          </p>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex gap-4 flex-col sm:flex-row">
            <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search className="text-default-400" />}
                className="flex-grow"
                size="lg"
                classNames={{
                    input: "text-default-900 dark:text-white",  // Add this line
                    inputWrapper: "hover:bg-default-100/70",  // Optional: adds a subtle hover effect
                }}
                />
              <Button
                color="primary"
                variant="flat"
                startContent={<Filter className="w-6 h-6" />}
                size="lg"
                className="px-8 min-w-[120px]"  // Add minimum width and padding
                >
                Filters
                </Button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Button
              radius="full"
              variant={activeCategory === 'All' ? 'solid' : 'ghost'}
              color="primary"
              onClick={() => setActiveCategory('All')}
              size="lg"
            >
              All Tools
            </Button>
            {categories.map((category) => (
              <Button
                key={category.name}
                radius="full"
                variant={activeCategory === category.name ? 'solid' : 'ghost'}
                color="primary"
                onClick={() => setActiveCategory(category.name)}
                startContent={<FontAwesomeIcon icon={category.icon} className="text-sm" />}
                size="lg"
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
            <div className="col-span-full text-center py-12">
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