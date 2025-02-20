'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardBody, Button, Link as NextUILink } from "@nextui-org/react"
import Link from 'next/link'
import { ArrowRight, Star, Wrench, Command, Cog } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { categories, allTools, Tool } from '@/data/tools'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { faThLarge } from '@fortawesome/free-solid-svg-icons'

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const renderToolCard = (tool: Tool) => (
    <Card 
      key={tool.name} 
      isPressable
      isHoverable
      className="w-full h-full bg-content2/50 backdrop-blur-sm group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
    >
      <CardBody className="flex flex-col h-64 p-6">
        <div className="flex-grow">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <FontAwesomeIcon icon={tool.icon} className="text-2xl text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {tool.name}
          </h3>
          <p className="text-default-500 text-sm line-clamp-3">
            {tool.description}
          </p>
        </div>
        <NextUILink 
          as={Link}
          href={tool.href}
          className="inline-flex items-center text-primary group-hover:text-primary-500 mt-4"
        >
          Try now
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </NextUILink>
      </CardBody>
    </Card>
  )

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section with animated gradient background */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 animate-gradient-xy" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className={`max-w-7xl mx-auto text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="relative text-center px-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight leading-tight">
              Web<span className="text-primary">Tools</span>Center
              <span className="inline-block ml-2 sm:ml-3 align-middle">
                <Cog className="w-8 h-8 sm:w-12 sm:h-12 text-primary animate-spin-slow opacity-75" />
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-default-500 mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
              Your all-in-one platform for web development tools. Create, convert, and transform with ease.
            </p>
           </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto p-2 rounded-2xl bg-content1/50 backdrop-blur-md">
            <Button
              radius="full"
              variant={activeCategory === 'All' ? 'solid' : 'ghost'}
              color="primary"
              onClick={() => setActiveCategory('All')}
              startContent={<FontAwesomeIcon icon={faThLarge} className="text-sm" />}
              size="lg"
            >
              All
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
        {(activeCategory === 'All' ? categories : categories.filter(cat => cat.name === activeCategory))
          .map((category,) => {
            const categoryTools = allTools.filter(tool => 
              activeCategory === 'All' 
                ? tool.category === category.name
                : tool.category === activeCategory
            )
            if (categoryTools.length === 0) return null

            return (
              <section 
                key={category.name} 
                className="mb-16"
              >
                <div className="flex items-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground flex items-center">
                    <FontAwesomeIcon icon={category.icon} className="mr-3 text-primary" />
                    {category.name}
                    <span className="ml-2 text-2xl font-bold text-foreground">Tools</span>
                  </h2>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTools.map(tool => (
                    <div key={tool.name} className="h-full">
                      {renderToolCard(tool)}
                    </div>
                  ))}
                </div>
              </section>
            )
        })}
      </main>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-content1/50 to-background" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center flex items-center justify-center">
            <Star className="mr-3 text-warning" />
            Why Choose WebToolsCenter?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: <Command className="w-10 h-10 text-primary" />,
                title: "All-in-One Solution",
                description: "Access a comprehensive suite of web development tools in one place."
              },
              {
                icon: <Wrench className="w-10 h-10 text-success" />,
                title: "User-Friendly Interface",
                description: "Intuitive design makes our tools accessible to everyone."
              },
              {
                icon: <Star className="w-10 h-10 text-warning" />,
                title: "Lightning Fast",
                description: "Optimized performance for quick and efficient results."
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="bg-content2/50 backdrop-blur-sm hover:-translate-y-2 transition-all duration-300 border-none"
              >
                <CardBody className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-default-500">
                    {feature.description}
                  </p>
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