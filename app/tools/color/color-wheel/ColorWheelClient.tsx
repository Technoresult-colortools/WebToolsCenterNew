"use client"

import type React from "react"
import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { Copy, Download, Info, Palette, BookOpen, Lightbulb, Eye, Code, Check } from "lucide-react"
import { Button, Card, CardBody, Input, Slider, Select, SelectItem, Tabs, Tab } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"

type ColorFormat = 'HEX' | 'RGB' | 'HSL'

// Color Harmonies Configuration
const colorHarmonies = [
  { name: "Complementary", angles: [180] },
  { name: "Analogous", angles: [30, -30] },
  { name: "Triadic", angles: [120, 240] },
  { name: "Split-Complementary", angles: [150, 210] },
  { name: "Square", angles: [90, 180, 270] },
  { name: "Tetradic", angles: [60, 180, 240] },
  { name: "Monochromatic", angles: [0], saturationSteps: [25, 50, 75] },
]

// Add RGB conversion function
function hexToRGBString(hex: string): string {
    const { r, g, b } = hexToRGB(hex)
    return `rgb(${r}, ${g}, ${b})`
  }
  
  // Add HSL conversion function
  function hexToHSLString(hex: string): string {
    const { h, s, l } = hexToHSL(hex)
    return `hsl(${Math.round(h)}°, ${Math.round(s)}%, ${Math.round(l)}%)`
  }
  
  // Validate hex color
  function isValidHex(hex: string): boolean {
    return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)
  }

// Utility Functions
function hslToHex(h: number, s: number, l: number): string {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function hexToRGB(hex: string): { r: number; g: number; b: number } {
  hex = hex.replace(/^#/, "")

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("")
  }

  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
  }
}

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  hex = hex.replace(/^#/, "")
  const r = Number.parseInt(hex.slice(0, 2), 16) / 255
  const g = Number.parseInt(hex.slice(2, 4), 16) / 255
  const b = Number.parseInt(hex.slice(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

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
    h *= 60
  }

  return {
    h: h < 0 ? h + 360 : h,
    s: s * 100,
    l: l * 100,
  }
}

function getColorFromPosition(
  x: number,
  y: number,
  width: number,
  height: number,
): { hue: number; saturation: number } {
  const centerX = width / 2
  const centerY = height / 2
  const dx = x - centerX
  const dy = y - centerY

  let angle = Math.atan2(dy, dx) * (180 / Math.PI)
  if (angle < 0) angle += 360

  const maxRadius = Math.min(width, height) / 2
  const distance = Math.sqrt(dx * dx + dy * dy)
  const saturation = Math.min((distance / maxRadius) * 100, 100)

  return {
    hue: angle,
    saturation: saturation,
  }
}


export default function ColorWheel() {
    const [colorFormat, setColorFormat] = useState<ColorFormat>('HEX')
    const [selectedHarmony, setSelectedHarmony] = useState(colorHarmonies[0])
    const [baseColor, setBaseColor] = useState("#ff4444")
    const [customColor, setCustomColor] = useState("#ff4444")
    const [customHexInput, setCustomHexInput] = useState("FF4444")
    const [isDragging, setIsDragging] = useState(false)
    const [selectedDot, setSelectedDot] = useState(0)
    const [lightness, setLightness] = useState(50)
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
    const wheelRef = useRef<HTMLDivElement>(null)
  
    const { h: hue, s: saturation } = useMemo(() => hexToHSL(baseColor), [baseColor])


  // Calculate harmony colors
  const harmonyColors = useMemo(() => {
    if (selectedHarmony.name === "Monochromatic") {
      return [
        hslToHex(hue, saturation, lightness),
        ...selectedHarmony.saturationSteps!.map((step) => hslToHex(hue, step, lightness)),
      ]
    } else {
      return [
        hslToHex(hue, saturation, lightness),
        ...selectedHarmony.angles.map((angle) => hslToHex((hue + angle + 360) % 360, saturation, lightness)),
      ]
    }
  }, [selectedHarmony, hue, saturation, lightness])

  // Initialize default dot positions with proper angles
  useEffect(() => {
    if (wheelRef.current) {
      const initialColor = "#ff4444"
      const { h, s } = hexToHSL(initialColor)
      const angles = selectedHarmony.angles
      
      // Set initial positions based on harmony angles
      const initialColors = [
        initialColor,
        ...angles.map(angle => hslToHex((h + angle + 360) % 360, s, lightness))
      ]
      
      setBaseColor(initialColor)
      setCustomColor(initialColor)
      setSelectedDot(0)
    }
  }, [])

   // Handle custom hex input
   const handleHexInput = (value: string) => {
    const hexValue = value.replace('#', '').toUpperCase()
    setCustomHexInput(hexValue)
    
    if (isValidHex(hexValue)) {
      const newColor = `#${hexValue}`
      setCustomColor(newColor)
      setBaseColor(newColor)
    }
  }

  // Get color value based on format
  const getColorValue = (color: string, format: ColorFormat): string => {
    switch (format) {
      case 'RGB':
        return hexToRGBString(color)
      case 'HSL':
        return hexToHSLString(color)
      default:
        return color.toUpperCase()
    }
  }

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!wheelRef.current) return

      const rect = wheelRef.current.getBoundingClientRect()
      const { hue: newHue, saturation: newSaturation } = getColorFromPosition(
        e.clientX - rect.left,
        e.clientY - rect.top,
        rect.width,
        rect.height,
      )

      const newColor = hslToHex(newHue, newSaturation, lightness)
      setBaseColor(newColor)
      setCustomColor(newColor)
      setIsDragging(true)
      setSelectedDot(0)
    },
    [lightness],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && wheelRef.current) {
        const rect = wheelRef.current.getBoundingClientRect()
        const { hue: newHue, saturation: newSaturation } = getColorFromPosition(
          e.clientX - rect.left,
          e.clientY - rect.top,
          rect.width,
          rect.height,
        )

        const newColor = hslToHex(newHue, newSaturation, lightness)
        setBaseColor(newColor)
        setCustomColor(newColor)
      }
    },
    [isDragging, lightness],
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!wheelRef.current) return
      const touch = e.touches[0]
      const rect = wheelRef.current.getBoundingClientRect()
      const { hue: newHue, saturation: newSaturation } = getColorFromPosition(
        touch.clientX - rect.left,
        touch.clientY - rect.top,
        rect.width,
        rect.height,
      )

      const newColor = hslToHex(newHue, newSaturation, lightness)
      setBaseColor(newColor)
      setCustomColor(newColor)
      setIsDragging(true)
      setSelectedDot(0)
    },
    [lightness],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (isDragging && wheelRef.current) {
        const touch = e.touches[0]
        const rect = wheelRef.current.getBoundingClientRect()
        const { hue: newHue, saturation: newSaturation } = getColorFromPosition(
          touch.clientX - rect.left,
          touch.clientY - rect.top,
          rect.width,
          rect.height,
        )

        const newColor = hslToHex(newHue, newSaturation, lightness)
        setBaseColor(newColor)
        setCustomColor(newColor)
      }
    },
    [isDragging, lightness],
  )

  useEffect(() => {
    const handleMouseMoveWrapper = (e: MouseEvent) => handleMouseMove(e)
    const handleMouseUp = () => setIsDragging(false)

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMoveWrapper)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMoveWrapper)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove])

  const handleDotClick = (index: number) => {
    setBaseColor(harmonyColors[index])
    setCustomColor(harmonyColors[index])
    setSelectedDot(index)
  }

  const handleCopyColor = (color: string, index: number) => {
    navigator.clipboard.writeText(color)
    setCopiedIndex(index)
    toast.success(`Copied ${color} to clipboard`)
    setTimeout(() => setCopiedIndex(null), 1500)
  }

  const handleDownloadPalette = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const colorWidth = 200
    const colorHeight = 150
    const textHeight = 30
    canvas.width = harmonyColors.length * colorWidth
    canvas.height = colorHeight + textHeight

    harmonyColors.forEach((color, index) => {
      ctx.fillStyle = color
      ctx.fillRect(index * colorWidth, 0, colorWidth, colorHeight)

      ctx.fillStyle = "#f0f0f0"
      ctx.fillRect(index * colorWidth, colorHeight, colorWidth, textHeight)

      ctx.fillStyle = "#000000"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(color.toUpperCase(), index * colorWidth + colorWidth / 2, colorHeight + textHeight / 2)
    })

    

    const link = document.createElement("a")
    link.download = "color-palette.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  


  return (
    <ToolLayout
    title="Color Wheel"
    description="Explore color theory and generate harmonious palettes with our advanced color wheel tool"
    toolId="678f382e26f06f912191bcb2"
  >
    <div className="flex flex-col gap-8">
      <Card className="bg-default-50 dark:bg-default-100">
        <CardBody className="p-6">
          {/* Top Section - Color Wheel and Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Color Wheel */}
            <div className="lg:col-span-2">
               <div
                  ref={wheelRef}
                  className="relative w-full aspect-square max-w-[600px] mx-auto touch-none select-none"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={() => setIsDragging(false)}
                >
                <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl">
                  <div
                    className="w-full h-full"
                    style={{
                      background: `
                        radial-gradient(
                          circle at center, 
                          transparent 0%, 
                          rgba(0,0,0,0.2) 80%, 
                          rgba(0,0,0,0.4) 100%
                        ),
                        conic-gradient(
                          from 90deg,
                          hsl(0, 100%, ${lightness}%),
                          hsl(60, 100%, ${lightness}%),
                          hsl(120, 100%, ${lightness}%),
                          hsl(180, 100%, ${lightness}%),
                          hsl(240, 100%, ${lightness}%),
                          hsl(300, 100%, ${lightness}%),
                          hsl(360, 100%, ${lightness}%)
                        )`,
                    }}
                  />
                </div>

                {harmonyColors.map((color, index) => {
                  const { h, s } = hexToHSL(color)
                  const dotAngle = h * (Math.PI / 180)
                  const dotRadius =
                    (s / 100) *
                    (Math.min(wheelRef.current?.offsetWidth || 0, wheelRef.current?.offsetHeight || 0) / 2 - 20)
                  const x = Math.cos(dotAngle) * dotRadius + (wheelRef.current?.offsetWidth || 0) / 2
                  const y = Math.sin(dotAngle) * dotRadius + (wheelRef.current?.offsetHeight || 0) / 2

                  return (
                    <div
                      key={index}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 
                        ${index === selectedDot 
                          ? "w-10 h-10 z-20 scale-110 border-white shadow-xl" 
                          : "w-7 h-7 z-10 border-white/50 shadow-lg"
                        } transition-all duration-200 cursor-pointer hover:scale-105`}
                      style={{
                        backgroundColor: color,
                        left: `${x}px`,
                        top: `${y}px`,
                      }}
                      onClick={() => handleDotClick(index)}
                    />
                  )
                })}
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-default-700">Custom Color</label>
                <div className="flex flex-col gap-2">
                    <Input
                      type="color"
                      value={customColor}
                      variant="bordered"
                      onChange={(e) => {
                        const newColor = e.target.value
                        setCustomColor(newColor)
                        setBaseColor(newColor)
                        setCustomHexInput(newColor.replace('#', ''))
                      }}
                      className="w-20 h-12 p-1 rounded-lg"
                    />
                    <Input
                      type="text"
                      label="Hex Color"
                      value={customHexInput}
                      onValueChange={handleHexInput}
                      placeholder="Enter hex color (e.g., FF4444)"
                      startContent={<span className="text-default-400">#</span>}
                      color={isValidHex(customHexInput) ? "success" : "danger"}
                      description={!isValidHex(customHexInput) ? "Invalid hex color" : ""}
                    />
                  </div>
                </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-default-700">Lightness</label>
                <Slider
                  aria-label="Lightness"
                  value={lightness}
                  onChange={(value) => setLightness(value as number)}
                  step={1}
                  maxValue={100}
                  minValue={0}
                  className="max-w-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-default-700">Color Harmony</label>
                <Select
                  label="Select Harmony"
                  selectedKeys={[selectedHarmony.name]}
                  variant="bordered"
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string
                    setSelectedHarmony(colorHarmonies.find((h) => h.name === selected) || colorHarmonies[0])
                  }}
                >
                  {colorHarmonies.map((harmony) => (
                    <SelectItem className="text-default-700" key={harmony.name} value={harmony.name}>
                      {harmony.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>

            {/* Color Palette Section */}
            <div className="mt-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6">
                <h3 className="text-xl font-semibold text-default-900">Color Palette</h3>
                <div className="flex flex-col xs:flex-row w-full sm:w-auto gap-4">
                  <Select
                    label="Color Format"
                    selectedKeys={[colorFormat]}
                    className="w-full xs:w-32"
                    variant="bordered"
                    onChange={(e) => setColorFormat(e.target.value as ColorFormat)}
                  >
                    <SelectItem key="HEX" value="HEX" className="text-default-700">HEX</SelectItem>
                    <SelectItem key="RGB" value="RGB" className="text-default-700">RGB</SelectItem>
                    <SelectItem key="HSL" value="HSL" className="text-default-700">HSL</SelectItem>
                  </Select>
                  <Button
                    color="primary"
                    variant="flat"
                    startContent={<Download className="w-4 h-4" />}
                    onClick={handleDownloadPalette}
                    className="w-full xs:w-auto"
                  >
                    Export Palette
                  </Button>
                </div>
              </div>

              {/* Large Color Preview */}
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-2 h-32">
                {harmonyColors.map((color, index) => (
                  <div
                    key={index}
                    className="relative h-full rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 group"
                    style={{ backgroundColor: color }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-black/20 to-black/60">
                      <div className="flex justify-between items-start">
                        <span className="text-white font-medium">{`Color ${index + 1}`}</span>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          className="bg-white/20 backdrop-blur-sm"
                          onClick={() => handleCopyColor(color, index)}
                        >
                          {copiedIndex === index ? (
                            <Check className="w-4 h-4 text-white" />
                          ) : (
                            <Copy className="w-4 h-4 text-white" />
                          )}
                        </Button>
                      </div>
                      <div className="text-white/90 font-mono text-sm">
                        {getColorValue(color, colorFormat)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Color Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
                {harmonyColors.map((color, index) => (
                  <Card key={index} className="bg-default-50/50 backdrop-blur-sm">
                    <CardBody className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Color Values</span>
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        </div>
                        <Tabs size="sm" aria-label="Color formats">
                          <Tab key="hex" title="HEX">
                            <div className="p-2 font-mono text-sm">
                              {color.toUpperCase()}
                            </div>
                          </Tab>
                          <Tab key="rgb" title="RGB">
                            <div className="p-2 font-mono text-sm">
                              {hexToRGBString(color)}
                            </div>
                          </Tab>
                          <Tab key="hsl" title="HSL">
                            <div className="p-2 font-mono text-sm">
                              {hexToHSLString(color)}
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
        </div>

        <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              About Color Wheel
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
              The Color Wheel is an advanced tool designed for designers, developers, and color enthusiasts. It allows
              you to explore color harmonies, generate color palettes, and visualize color relationships with ease and
              precision. Whether you're working on web design, graphic design, or any project involving color theory,
              this tool provides an intuitive interface to experiment with and perfect your color choices.
            </p>

            <div className="my-8">
              <Image
                src="/Images/ColorWheelPreview.png?height=400&width=600"
                alt="Screenshot of the Color Wheel interface showing the interactive wheel and harmony colors"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              How to Use Color Wheel?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
              <li>Interact with the color wheel by clicking or dragging to select your base color.</li>
              <li>Use the custom color input to manually enter a specific color.</li>
              <li>Adjust the lightness slider to modify the brightness of the colors.</li>
              <li>Select a color harmony from the available options to generate complementary colors.</li>
              <li>Click on the generated harmony colors to set them as the new base color.</li>
              <li>Use the copy button to easily copy color values to your clipboard.</li>
              <li>Download the generated color palette as an image for later use.</li>
            </ol>

            <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
              <li>Interactive color wheel for intuitive color selection</li>
              <li>Support for various color harmonies (Complementary, Analogous, Triadic, etc.)</li>
              <li>Real-time updates of harmony colors as you interact with the wheel</li>
              <li>Custom color input for precise color selection</li>
              <li>Lightness adjustment slider for fine-tuning colors</li>
              <li>Easy-to-use copy functionality for color values</li>
              <li>Option to download the generated color palette as an image</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Palette className="w-6 h-6 mr-2" />
              Applications and Use Cases
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
              <li>
                <strong>Web Design:</strong> Create consistent color schemes for websites and user interfaces.
              </li>
              <li>
                <strong>Graphic Design:</strong> Develop color palettes for logos, branding, and marketing materials.
              </li>
              <li>
                <strong>Digital Art:</strong> Explore color variations for digital illustrations and paintings.
              </li>
              <li>
                <strong>Print Design:</strong> Ensure color consistency across various printed materials.
              </li>
              <li>
                <strong>Product Design:</strong> Create color schemes for physical products and packaging.
              </li>
              <li>
                <strong>Data Visualization:</strong> Generate color scales for charts, graphs, and infographics.
              </li>
              <li>
                <strong>Accessibility Testing:</strong> Test color contrasts and readability with different shades.
              </li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Eye className="w-6 h-6 mr-2" />
              Tips for Effective Use
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
              <li>Experiment with different base colors to discover unique palettes.</li>
              <li>Use the lightness slider to create variations within a chosen color scheme.</li>
              <li>Try different harmony types to find the perfect combination for your project.</li>
              <li>Use the custom color input to match specific brand colors or existing design elements.</li>
              <li>Download your favorite palettes to build a library of harmonious color schemes.</li>
              <li>Pay attention to contrast when selecting colors for text and backgrounds.</li>
              <li>Use the monochromatic harmony to create subtle, sophisticated color schemes.</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Code className="w-6 h-6 mr-2" />
              Integration Tips
            </h2>
            <p className="text-sm md:text-base text-default-600">
              To effectively implement your generated color palettes in your projects:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600 mt-2">
              <li>Use CSS variables to easily apply and update colors throughout your project</li>
              <li>Create a color system with primary, secondary, and accent colors using different shades</li>
              <li>Utilize the downloaded PNG palette to import colors into design tools</li>
              <li>Use the various color formats (HEX, RGB, HSL) as needed for different contexts in your code</li>
              <li>
                Consider creating a style guide that incorporates your generated color palette for consistent usage
                across your project or organization
              </li>
            </ul>
          </div>
        </Card>
     
    </ToolLayout>
  )
}

