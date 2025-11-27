"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import {
  Card,
  CardBody,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tabs,
  Tab,
} from "@nextui-org/react"
import { Upload, X, Copy, Info, BookOpen, Lightbulb } from "lucide-react"
import { toast, Toaster } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionImageColorExtractor from "./info-section"

interface Color {
  hex: string
  rgb: string
  hsl: string
}

interface ColorThief {
  getPalette: (img: HTMLImageElement, colorCount: number) => number[][]
}

declare global {
  interface Window {
    ColorThief: {
      new (): ColorThief
    }
  }
}

export default function ColorExtractor() {
  const [image, setImage] = useState<string | null>(null)
  const [colors, setColors] = useState<Color[]>([])
  const [colorCount, setColorCount] = useState(6)
  const [activeTab, setActiveTab] = useState<"hex" | "rgb" | "hsl">("hex")
  const [isDragging, setIsDragging] = useState(false)
  const dropZoneRef = useRef<HTMLLabelElement>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.umd.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const extractColors = useCallback(
    (imageSrc: string) => {
      const img = new window.Image()
      img.crossOrigin = "Anonymous"
      img.onload = () => {
        if (window.ColorThief) {
          const colorThief = new window.ColorThief()
          const palette: number[][] = colorThief.getPalette(img, colorCount)
          setColors(
            palette.map(([r, g, b]) => {
              const hex = rgbToHex(r, g, b)
              const rgb = `rgb(${r}, ${g}, ${b})`
              const hsl = rgbToHsl(r, g, b)
              return { hex, rgb, hsl }
            }),
          )
        } else {
          console.error("ColorThief library not loaded")
        }
      }
      img.src = imageSrc
    },
    [colorCount],
  )

  useEffect(() => {
    if (image) {
      extractColors(image)
    }
  }, [extractColors, image])

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleImage(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImage(e.target.files[0])
    }
  }

  const handleImage = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setImage(e.target.result)
        }
      }
      reader.readAsDataURL(file)
    } else {
      toast.error("Please upload a valid image file.")
    }
  }

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")
  }

  const rgbToHsl = (r: number, g: number, b: number): string => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b)
    let h = 0,
      s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copied to clipboard!")
      },
      () => {
        toast.error("Failed to copy")
      },
    )
  }

  const resetImage = () => {
    setImage(null)
    setColors([])
  }

  return (
    <ToolLayout
      title="Image Color Extractor"
      description="Effortlessly extract dominant colors from images and create stunning color palettes for your projects"
      toolId="678f382a26f06f912191bc8f"
    >
      <Toaster position="top-right" />
      <div className="flex flex-col gap-8">
        <Card>
          <CardBody className="p-6 bg-default-50 dark:bg-default-100">
            <h2 className="text-xl sm:text-1xl md:text-2xl font-bold text-primary mb-4">Upload an Image</h2>
            {!image ? (
              <label
                ref={dropZoneRef}
                className={`flex flex-col items-center justify-center h-64 px-4 py-6 bg-default-100 text-primary rounded-lg shadow-lg tracking-wide uppercase border-2 ${
                  isDragging ? "border-primary bg-primary-100" : "border-primary border-dashed"
                } cursor-pointer hover:bg-primary-100 hover:text-primary-600 transition duration-300`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Upload size={48} />
                <span className="mt-2 text-sm sm:text-base md:text-md leading-normal text-center block">
                  {isDragging ? "Drop image here" : "Select a file or drag and drop"}
                </span>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            ) : (
              <div className="relative">
                <div className="relative border border-default-400 dark:border-default-700 h-64 md:h-96 bg-default-100 rounded-lg overflow-hidden">
                  <img src={image || "/placeholder.svg"} alt="Uploaded" className="w-full h-full object-contain" />
                </div>
                <Button
                  isIconOnly
                  color="danger"
                  aria-label="Reset image"
                  className="absolute top-2 right-2"
                  onClick={resetImage}
                >
                  <X size={20} />
                </Button>
              </div>
            )}
          </CardBody>
        </Card>

        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="mb-4">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">Number of Colors: {colorCount}</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Color count selection" onAction={(key) => setColorCount(Number(key))}>
                  <DropdownItem key="6"  className="text-default-700">6</DropdownItem>
                  <DropdownItem key="12"  className="text-default-700">12</DropdownItem>
                  <DropdownItem key="16"  className="text-default-700">16</DropdownItem>
                  <DropdownItem key="21"  className="text-default-700">21</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            {colors.length > 0 && (
              <div>
                <h2 className="text-xl sm:text-1xl md:text-2xl font-bold text-default-700 mb-4">Extracted Colors</h2>
                <Tabs
                  aria-label="Color format options"
                  selectedKey={activeTab}
                  onSelectionChange={(key) => setActiveTab(key as "hex" | "rgb" | "hsl")}
                  
                >
                  <Tab key="hex" title="HEX">
                    <ColorGrid colors={colors} format="hex" onCopy={copyToClipboard}  />
                  </Tab>
                  <Tab key="rgb" title="RGB">
                    <ColorGrid colors={colors} format="rgb" onCopy={copyToClipboard} />
                  </Tab>
                  <Tab key="hsl" title="HSL">
                    <ColorGrid colors={colors} format="hsl" onCopy={copyToClipboard} />
                  </Tab>
                </Tabs>
              </div>
            )}
          </CardBody>
        </Card>

        <InfoSectionImageColorExtractor />

      </div>
    </ToolLayout>
  )
}

interface ColorGridProps {
  colors: Color[]
  format: "hex" | "rgb" | "hsl"
  onCopy: (text: string) => void
}

function ColorGrid({ colors, format, onCopy }: ColorGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {colors.map((color, index) => (
        <Card key={index}>
          <CardBody>
            <div className="w-full h-24 rounded-lg shadow-lg mb-2" style={{ backgroundColor: color.hex }} />
            <div className="flex items-center justify-between">
              <p className="text-sm truncate">{color[format]}</p>
              <Button size="sm" isIconOnly variant="light" onClick={() => onCopy(color[format])}>
                <Copy size={16} />
                <span className="sr-only">Copy color</span>
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

