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
import Image from "next/image"

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
            <h2 className="text-2xl font-bold mb-4">Upload an Image</h2>
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
                <span className="mt-2 text-base leading-normal">
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
                <h2 className="text-2xl  font-bold mb-4">Extracted Colors</h2>
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

        <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the Image Color Extractor?
                </h2>
                <p className="text-sm md:text-base text-default-600 mb-4">
                The Image Color Extractor is a powerful tool designed to analyze images and extract their color information. It identifies the dominant colors present in the image and provides a comprehensive color palette. This tool is invaluable for designers, artists, and anyone working with color palettes in their projects.
                </p>

                <div className="my-8">
                <Image
                    src="/Images/ImageColorExtractorPreview.png?height=400&width=600"
                    alt="Screenshot of the Image Color Extractor interface showing image upload area and color analysis results"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg w-full h-auto"
                />
                </div>

                <h2 id="how-to-use" className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the Image Color Extractor?
                </h2>
                <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Upload an image by dragging and dropping it into the designated area or by clicking to browse your files.</li>
                <li>Once your image is uploaded, the tool will automatically extract the dominant colors.</li>
                <li>Choose the number of colors you want to extract using the dropdown menu.</li>
                <li>View the extracted colors displayed as color swatches with their corresponding values.</li>
                <li>Switch between HEX, RGB, and HSL color formats using the tabs.</li>
                <li>Click the copy icon next to each color to copy its value to your clipboard.</li>
                <li>To analyze a different image, simply upload a new one or use the reset button.</li>
                </ol>

                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Extract up to 21 dominant colors from any image</li>
                <li>View colors in HEX, RGB, and HSL formats</li>
                <li>One-click color copying to clipboard</li>
                <li>Adjustable number of colors for detailed analysis</li>
                <li>Responsive design for seamless use on desktop and mobile devices</li>
                <li>Real-time color extraction and display</li>
                <li>User-friendly interface with drag-and-drop functionality</li>
                </ul>

                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                Applications and Use Cases
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li><strong>Graphic Design:</strong> Extract color palettes from inspirational images for use in designs.</li>
                <li><strong>Web Design:</strong> Analyze website screenshots to create cohesive color schemes.</li>
                <li><strong>Digital Art:</strong> Find the perfect color balance for digital paintings and illustrations.</li>
                <li><strong>Photography:</strong> Understand the color composition of photographs for editing and retouching.</li>
                <li><strong>Branding:</strong> Ensure consistent color usage across various brand materials.</li>
                <li><strong>Interior Design:</strong> Extract color palettes from room photos for decoration ideas.</li>
                <li><strong>Fashion:</strong> Analyze clothing and accessory colors to create matching outfits.</li>
                <li><strong>Education:</strong> Teach color theory and analysis in art and design courses.</li>
                </ul>

                <p className="text-sm md:text-base text-default-600 mt-4">
                Ready to explore the colors in your images? Start using our Image Color Extractor tool now and unlock the power of color analysis for your projects. Whether you're working on a professional design or just curious about the colors in your favorite photos, our tool provides the insights you need. Try it out and see how it can enhance your color selection process and inspire your creative work!
                </p>
            </div>
            </Card>

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

