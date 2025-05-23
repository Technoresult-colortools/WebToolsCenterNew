"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, Button, Slider, Tooltip, Chip, CardBody } from "@nextui-org/react"
import { Upload, X, Download, Palette, Copy, RefreshCw, Maximize2, Minimize2 } from "lucide-react"
import { toast,  } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSection from "./info-section"

interface Color {
  hex: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
}

export default function ImageAverageColorFinder() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [averageColor, setAverageColor] = useState<Color | null>(null)
  const [dominantColors, setDominantColors] = useState<Color[]>([])
  const [sampleSize, setSampleSize] = useState(5)
  const [isDragging, setIsDragging] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }

    setIsAnalyzing(true)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string)
      toast.success("Image uploaded successfully")
    }
    reader.onerror = () => {
      toast.error("Error reading file")
      setIsAnalyzing(false)
    }
    reader.readAsDataURL(file)
  }

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

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  useEffect(() => {
    if (imageSrc && canvasRef.current) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const canvas = canvasRef.current!
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")!
        ctx.drawImage(img, 0, 0, img.width, img.height)
        calculateColors()
        setIsAnalyzing(false)
      }
      img.onerror = () => {
        toast.error("Error loading image")
        setIsAnalyzing(false)
      }
      img.src = imageSrc
    }
  }, [imageSrc, sampleSize])

  const calculateColors = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")!
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    let r = 0,
      g = 0,
      b = 0
    const colorMap: { [key: string]: number } = {}

    for (let i = 0; i < data.length; i += 4) {
      // Skip transparent pixels
      if (data[i + 3] < 128) continue

      r += data[i]
      g += data[i + 1]
      b += data[i + 2]

      // Quantize colors to reduce the number of unique colors
      const quantizedR = Math.round(data[i] / 32) * 32
      const quantizedG = Math.round(data[i + 1] / 32) * 32
      const quantizedB = Math.round(data[i + 2] / 32) * 32
      const hex = rgbToHex(quantizedR, quantizedG, quantizedB)
      colorMap[hex] = (colorMap[hex] || 0) + 1
    }

    const pixelCount = data.length / 4
    const avgColor = getColorInfo(Math.round(r / pixelCount), Math.round(g / pixelCount), Math.round(b / pixelCount))
    setAverageColor(avgColor)

    const sortedColors = Object.entries(colorMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, sampleSize)
      .map(([hex]) => {
        const rgb = hexToRgb(hex)!
        return getColorInfo(rgb.r, rgb.g, rgb.b)
      })

    setDominantColors(sortedColors)
  }

  const getColorInfo = (r: number, g: number, b: number): Color => {
    const hex = rgbToHex(r, g, b)
    const hsl = rgbToHsl(r, g, b)
    return { hex, rgb: { r, g, b }, hsl }
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b)
    let h, s
    const l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
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
      h! /= 6
    }

    return {
      h: Math.round(h! * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const resetImage = () => {
    setImageSrc(null)
    setAverageColor(null)
    setDominantColors([])
    toast.success("Reset successful")
  }

  const copyColorToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
    toast.success(`Copied ${color} to clipboard`)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const downloadColorPalette = () => {
    const canvas = document.createElement("canvas")
    const scale = 2 // For better resolution
    const padding = 40 * scale // Padding around the entire palette
    const colorHeight = 120 * scale // Height of each color block
    const hexHeight = 40 * scale // Height for hex code section

    // Calculate dimensions with padding
    canvas.width = 800 * scale + padding * 2
    canvas.height = colorHeight + hexHeight + padding * 2

    const ctx = canvas.getContext("2d")!
    ctx.scale(scale, scale)

    // Fill background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const colors = [averageColor!, ...dominantColors]
    const colorWidth = 800 / colors.length

    // Draw a subtle grid pattern in the background
    ctx.strokeStyle = "#f0f0f0"
    ctx.lineWidth = 0.5
    for (let x = padding; x <= canvas.width / scale - padding; x += 20) {
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, colorHeight + padding)
      ctx.stroke()
    }

    // Draw color blocks with rounded corners and shadows
    colors.forEach((color, index) => {
      const x = index * colorWidth + padding
      const y = padding
      const width = colorWidth - 10
      const height = colorHeight / scale
      const radius = 8

      // Draw shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)"
      ctx.shadowBlur = 10
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 4

      // Draw rounded rectangle
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + width - radius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
      ctx.lineTo(x + width, y + height - radius)
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
      ctx.lineTo(x + radius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()

      // Fill color
      ctx.fillStyle = color.hex
      ctx.fill()

      // Reset shadow
      ctx.shadowColor = "transparent"

      // Add hex code label
      const hexY = y + height + 30
      const centerX = x + width / 2

      // Draw hex code background
      const hexText = color.hex.toUpperCase()
      ctx.font = "bold 14px Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      const textWidth = ctx.measureText(hexText).width
      const labelPadding = 12
      const labelWidth = textWidth + labelPadding * 2
      const labelHeight = 28
      const labelRadius = 6

      // Calculate text brightness and choose contrasting colors
      const { r, g, b } = color.rgb
      const brightness = (r * 299 + g * 587 + b * 114) / 1000
      const labelBg = brightness > 128 ? color.hex : "#ffffff"
      const textColor = brightness > 128 ? "#000000" : color.hex

      // Draw label background
      ctx.fillStyle = labelBg
      ctx.beginPath()
      ctx.roundRect(centerX - labelWidth / 2, hexY - labelHeight / 2, labelWidth, labelHeight, labelRadius)
      ctx.fill()

      // Draw hex code
      ctx.fillStyle = textColor
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(hexText, centerX, hexY)
    })

    // Add title
    ctx.fillStyle = "#000000"
    ctx.font = "bold 16px Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("COLOR PALETTE", padding, padding - 15)

    // Add date
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    ctx.font = "12px Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    ctx.textAlign = "right"
    ctx.fillText(date, canvas.width / scale - padding, padding - 15)

    // Download the palette
    const link = document.createElement("a")
    link.download = `color-palette-${date.toLowerCase().replace(/\s/g, "-")}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
    toast.success("Color palette downloaded successfully")
  }

  const ColorBox = ({ color }: { color: Color }) => (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <div
          className="w-16 h-16 rounded-lg shadow-md border border-default-400 dark:border-default-700 transition-transform group-hover:scale-105"
          style={{ backgroundColor: color.hex }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            className="bg-white/80 dark:bg-black/50"
            onClick={() => copyColorToClipboard(color.hex)}
          >
            <Copy size={14} />
          </Button>
        </div>
      </div>
      <div className="mt-2 space-y-1 text-center">
        <p
          className="text-sm font-medium cursor-pointer hover:underline"
          onClick={() => copyColorToClipboard(color.hex)}
        >
          {color.hex}
        </p>
        <p className="text-xs text-default-600">
          rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
        </p>
        <p className="text-xs text-default-600">
          hsl({color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%)
        </p>
      </div>
    </div>
  )

  return (
    <ToolLayout
      title="Image Average Color Finder"
      description="Analyze images to find their average and dominant colors effortlessly. Perfect for designers, artists, and anyone looking to create cohesive color palettes for their projects"
      toolId="678f382a26f06f912191bc8e"
    >
     
      <div className="flex flex-col gap-8">
        <Card>
          <CardBody className="p-6 bg-default-50 dark:bg-default-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-1xl md:text-2xl font-bold text-default-700">Upload an Image</h2>
              {imageSrc && (
                <Button
                  isIconOnly
                  color="primary"
                  variant="light"
                  aria-label="Toggle fullscreen"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </Button>
              )}
            </div>

            {!imageSrc ? (
              <label
                className={`flex flex-col items-center justify-center h-64 px-4 py-6 bg-default-100 text-primary rounded-lg shadow-lg tracking-wide border-2 ${
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
                <p className="mt-2 text-xs text-default-500">Supports JPG, PNG, GIF, WebP, and SVG</p>
                <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            ) : (
              <div className="relative">
                <div
                  className={`relative border border-default-400 dark:border-default-700 bg-default-100 rounded-lg overflow-hidden ${isFullscreen ? "h-[80vh]" : "h-64 md:h-96"}`}
                >
                  {isAnalyzing ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-default-200/50">
                      <div className="flex flex-col items-center gap-2">
                        <RefreshCw size={32} className="animate-spin text-primary" />
                        <p className="text-sm text-default-700">Analyzing image...</p>
                      </div>
                    </div>
                  ) : null}
                  <img src={imageSrc || "/placeholder.svg"} alt="Uploaded" className="w-full h-full object-contain" />
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

        {averageColor && (
          <Card>
            <CardBody className="p-6 bg-default-50 dark:bg-default-100">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-default-700 mb-2 md:mb-0">Color Analysis</h2>
                <Button
                  color="primary"
                  onPress={downloadColorPalette}
                  startContent={<Download size={18} />}
                  
                >
                  Download Palette
                </Button>
              </div>

              <div className="p-4 bg-primary-100 dark:bg-primary-200/40 rounded-lg mb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Tooltip content="Average Color" className="text-default-700">
                      <div
                        className="w-12 h-12 rounded-full border-4 border-white dark:border-default-800 shadow-lg cursor-pointer"
                        style={{ backgroundColor: averageColor.hex }}
                        onClick={() => copyColorToClipboard(averageColor.hex)}
                      ></div>
                    </Tooltip>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-default-700">Average Color</h3>
                        <Chip
                          size="sm"
                          variant="flat"
                          className="cursor-pointer"
                          onClick={() => copyColorToClipboard(averageColor.hex)}
                        >
                          {averageColor.hex}
                        </Chip>
                      </div>
                      <div className="flex flex-wrap gap-x-4 text-xs text-default-500">
                        <span>
                          RGB: {averageColor.rgb.r}, {averageColor.rgb.g}, {averageColor.rgb.b}
                        </span>
                        <span>
                          HSL: {averageColor.hsl.h}°, {averageColor.hsl.s}%, {averageColor.hsl.l}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Palette className="w-5 h-5 inline-block mr-2 text-default-700" />
                  <span className="font-medium text-default-700 text-lg">Dominant Colors</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-2">
                  {dominantColors.map((color, index) => (
                    <ColorBox key={index} color={color} />
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-success-100 dark:bg-success-200/40 rounded-lg">
                <label htmlFor="sample-size" className="block text-sm font-medium text-default-700 mb-2">
                  Number of Dominant Colors: {sampleSize}
                </label>
                <Slider
                  aria-label="Number of Dominant Colors"
                  size="sm"
                  step={1}
                  maxValue={10}
                  minValue={1}
                  value={sampleSize}
                  onChange={(value) => setSampleSize(value as number)}
                  className="max-w-md"
                  showSteps={true}
                  marks={[
                    { value: 1, label: "1" },
                    { value: 5, label: "5" },
                    { value: 10, label: "10" },
                  ]}
                />
              </div>
            </CardBody>
          </Card>
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />

        <InfoSection />
      </div>
    </ToolLayout>
  )
}
