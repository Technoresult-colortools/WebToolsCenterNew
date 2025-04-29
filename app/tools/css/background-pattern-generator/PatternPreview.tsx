"use client"

import type React from "react"
import { useRef, useEffect } from "react"

interface PatternPreviewProps {
  cssCode: string
}

const PREVIEW_DIV_ID = "pattern-preview"

const PatternPreview: React.FC<PatternPreviewProps> = ({ cssCode }) => {
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const styleTag = document.createElement("style")
    styleTag.id = "pattern-preview-style"

    // Check if the style tag already exists and remove it
    const existingStyleTag = document.getElementById("pattern-preview-style")
    if (existingStyleTag) {
      existingStyleTag.remove()
    }

    document.head.appendChild(styleTag)

    // Ensure background-color is preserved by not stripping it from cssCode
    styleTag.innerHTML = `#${PREVIEW_DIV_ID} {\n${cssCode}\n}`

    return () => {
      if (styleTag.parentNode) {
        styleTag.parentNode.removeChild(styleTag)
      }
    }
  }, [cssCode])

  return (
    <div
      id={PREVIEW_DIV_ID}
      ref={previewRef}
      className="w-full h-80 transition-all duration-200 ease-in-out"
      style={{ backgroundColor: "inherit" }} // Inherit background color from parent
    />
  )
}

export default PatternPreview
