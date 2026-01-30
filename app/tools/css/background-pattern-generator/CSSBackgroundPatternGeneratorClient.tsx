// src/app/tools/background-pattern-generator/page.tsx
"use client"

import React from "react"
import ToolLayout from "@/components/ToolLayout"
import PatternGenerator from "./PatternGenerator"
import InfoSectionBackgroundPattern from "./info-section"
import { Card, CardBody } from "@nextui-org/react"

export default function BackgroundPatternGeneratorPage() {
  return (
    <ToolLayout
      title="CSS Background Pattern Generator"
      description="Create beautiful CSS background patterns with our interactive generator. Customize colors, sizes, and pattern types to get the perfect background for your web projects."
      toolId="678f382b26f06f912191bc99"
    >
      <div className="flex flex-col gap-8 mb-6">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <PatternGenerator />

          </CardBody>
        </Card>
      </div>
      <InfoSectionBackgroundPattern />
    </ToolLayout>
  )
}