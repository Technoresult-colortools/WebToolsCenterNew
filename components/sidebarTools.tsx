"use client"

import React, { useState, useEffect } from "react"
import { Accordion, AccordionItem, ScrollShadow, Button } from "@nextui-org/react"
import { categories, allTools, type Category, type Tool } from "@/data/tools"
import { ChevronDown, Cog } from "lucide-react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export default function SidebarTools() {
  const [isHidden, setIsHidden] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const checkScreenSize = () => {
      // Hide sidebar on screens smaller than 1600px (covering 14-inch laptops and mobile devices)
      setIsHidden(window.innerWidth < 1600)
    }

    // Run check immediately
    checkScreenSize()

    // Add resize listener
    window.addEventListener("resize", checkScreenSize)
    
    // Cleanup listener
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // If screen is too small, return null
  if (isHidden) {
    return null
  }

  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 5px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: var(--scrollbar-thumb);
      border-radius: 5px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: var(--scrollbar-thumb-hover);
    }
  `

  return (
    <aside className="sticky left-0 top-16 h-[calc(100vh-4rem)] w-80 xl:w-96 bg-background/60 backdrop-blur-xl border-r border-divider flex flex-col">
      <style jsx>{scrollbarStyles}</style>
      <style jsx>{`
        :global(.custom-scrollbar) {
          --scrollbar-thumb: hsl(var(--nextui-default-300));
          --scrollbar-thumb-hover: hsl(var(--nextui-default-400));
        }
        :global(.dark .custom-scrollbar) {
          --scrollbar-thumb: hsl(var(--nextui-default-600));
          --scrollbar-thumb-hover: hsl(var(--nextui-default-700));
        }
        :global(.sidebar-hover):hover {
          background-color: #006fee10;
        }
        :global(.sidebar-active) {
          background-color: #006fee20;
          color: #006fee;
        }
      `}</style>

      {/* Header */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          Explore Tools
          <Cog className="w-5 h-5 text-primary animate-spin-slow" />
        </h2>

        <p className="text-default-500 text-sm mt-1">Find the perfect tool for your needs</p>
      </div>

      {/* Navigation with custom scrollbar */}
      <ScrollShadow className="flex-grow overflow-y-auto custom-scrollbar">
        <Accordion
          showDivider={false}
          className="px-4 pb-6"
          itemClasses={{
            base: "py-0 w-full",
            title: "font-normal text-medium",
            trigger:
              "px-3 py-3 rounded-lg sidebar-hover data-[hover=true]:bg-[#006fee10] transition-colors",
            indicator: "text-medium",
            content: "text-small px-3",
          }}
        >
          {categories.map((category: Category) => {
            const categoryTools = allTools.filter((tool) => tool.category === category.name)

            return (
              <AccordionItem
                key={category.name}
                aria-label={category.name}
                title={
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-md flex items-center justify-center bg-gradient-to-br ${category.gradient}`}
                    >
                      <FontAwesomeIcon
                        icon={category.icon as IconDefinition}
                        className={`w-5 h-5 ${category}`}
                        style={{ color: 'currentColor' }}
                      />
                    </div>
                    <span className="font-medium text-base">{category.name}</span>
                  </div>
                }
                indicator={<ChevronDown className="text-default-500" />}
              >
                <div className="space-y-2 ml-12">
                  {categoryTools.map((tool: Tool) => {
                    const isActive = pathname === tool.href
                    return (
                      <Button
                        key={tool.name}
                        as={NextLink}
                        href={tool.href}
                        variant={isActive ? "flat" : "light"}
                        color={isActive ? "primary" : "default"}
                        startContent={
                          <FontAwesomeIcon
                            icon={tool.icon as IconDefinition}
                            className={`w-4 h-4 flex-shrink-0`}
                            style={{ color: 'currentColor' }}
                          />
                        }
                        className={`w-full justify-start font-normal h-10 px-4 sidebar-hover ${
                          isActive
                            ? "sidebar-active"
                            : "text-default-500 hover:text-[#006fee] dark:hover:text-[#006fee]"
                        }`}
                      >
                        <span className="truncate text-sm">{tool.name}</span>
                      </Button>
                    )
                  })}
                </div>
              </AccordionItem>
            )
          })}
        </Accordion>
      </ScrollShadow>
    </aside>
  )
}