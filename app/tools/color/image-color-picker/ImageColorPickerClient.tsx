"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  Progress,
  Textarea,
  Input,
  Tabs,
  Tab,
} from "@nextui-org/react"
import { Upload, X, RefreshCw, Pipette, Copy, Palette, Download, Maximize2, ZoomIn, ZoomOut, FileText } from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionImageColorPicker from "./info-section"

type ColorFormat = "hex" | "rgb" | "hsl" | "cmyk"

interface ColorData {
  hex: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
  cmyk: { c: number; m: number; y: number; k: number }
}

export default function ImageColorPicker() {
  const [selectedColor, setSelectedColor] = useState<ColorData | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [isDragging, setIsDragging] = useState(false)
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex")
  const [colorHistory, setColorHistory] = useState<ColorData[]>([])
  const [isPickerActive, setIsPickerActive] = useState(false)
  const [dominantColors, setDominantColors] = useState<ColorData[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null)
  const [hoveredColor, setHoveredColor] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)

  // Color conversion utilities
  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("")
  }

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
      : null
  }

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255
    g /= 255
    b /= 255
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
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const rgbToCmyk = (r: number, g: number, b: number): { c: number; m: number; y: number; k: number } => {
    let c = 1 - r / 255
    let m = 1 - g / 255
    let y = 1 - b / 255
    const k = Math.min(c, m, y)

    if (k === 1) {
      c = m = y = 0
    } else {
      c = (c - k) / (1 - k)
      m = (m - k) / (1 - k)
      y = (y - k) / (1 - k)
    }

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    }
  }

  const createColorData = (r: number, g: number, b: number): ColorData => {
    const hex = rgbToHex(r, g, b)
    const hsl = rgbToHsl(r, g, b)
    const cmyk = rgbToCmyk(r, g, b)
    return { hex, rgb: { r, g, b }, hsl, cmyk }
  }

  const getColorString = (color: ColorData | null): string => {
    if (!color) return ""
    switch (colorFormat) {
      case "hex":
        return color.hex
      case "rgb":
        return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
      case "hsl":
        return `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`
      case "cmyk":
        return `cmyk(${color.cmyk.c}%, ${color.cmyk.m}%, ${color.cmyk.y}%, ${color.cmyk.k}%)`
    }
  }

  // File handling
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file")
      return
    }

    setIsProcessing(true)
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string)
      setIsProcessing(false)
    }
    reader.onerror = () => {
      toast.error("Failed to load image")
      setIsProcessing(false)
    }
    reader.readAsDataURL(file)
  }

  // Image processing
  useEffect(() => {
    if (imageSrc && canvasRef.current) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = imageSrc
      img.onload = () => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext("2d", { willReadFrequently: true })!

        // Set canvas size to match image natural dimensions
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight

        // Draw image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        setImageLoaded(true)
        extractDominantColors()
      }
      img.onerror = () => {
        toast.error("Failed to load image")
        setImageLoaded(false)
      }
    }
  }, [imageSrc])

  // Drag and drop handlers
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

  // Enhanced color picking with touch and mouse support
  const getColorAtPoint = useCallback((clientX: number, clientY: number): ColorData | null => {
    if (!canvasRef.current || !imageContainerRef.current || !imageRef.current) return null

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!
    const image = imageRef.current
    const container = imageContainerRef.current

    // Get container and image dimensions
    const rect = container.getBoundingClientRect()
    const imageRect = image.getBoundingClientRect()

    // Calculate click position relative to the displayed image
    const x = clientX - imageRect.left
    const y = clientY - imageRect.top

    // Calculate scale between displayed image and canvas
    const scaleX = canvas.width / imageRect.width
    const scaleY = canvas.height / imageRect.height

    // Convert to canvas coordinates
    const canvasX = Math.floor(x * scaleX)
    const canvasY = Math.floor(y * scaleY)

    // Ensure coordinates are within bounds
    if (canvasX < 0 || canvasX >= canvas.width || canvasY < 0 || canvasY >= canvas.height) {
      return null
    }

    // Get pixel data
    const imageData = ctx.getImageData(canvasX, canvasY, 1, 1)
    const [r, g, b] = imageData.data

    return createColorData(r, g, b)
  }, [])

  // Color picker activation
  const handleImageColorPicker = async () => {
    if (!imageSrc || !imageLoaded) {
      toast.error("Please upload an image first")
      return
    }

    setIsPickerActive(true)

    // Try EyeDropper API first (desktop browsers)
    if ("EyeDropper" in window) {
      try {
        // @ts-expect-error - EyeDropper API might not be in TypeScript definitions
        const eyeDropper = new EyeDropper()
        const result = await eyeDropper.open()

        const rgb = hexToRgb(result.sRGBHex)
        if (rgb) {
          const colorData = createColorData(rgb.r, rgb.g, rgb.b)
          setSelectedColor(colorData)
          addToHistory(colorData)
          toast.success("Color picked successfully!")
        }
        setIsPickerActive(false)
      } catch (error) {
        setIsPickerActive(false)
        console.log("EyeDropper cancelled or failed")
      }
    } else {
      // Fallback for mobile and unsupported browsers
      toast(
        "Tap anywhere on the image to pick a color. Tap outside to cancel.",
        { icon: "👆", duration: 3000 }
      )
    }
  }

  // Handle image click/touch for color picking
  const handleImageInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isPickerActive) return

    e.preventDefault()
    e.stopPropagation()

    let clientX: number, clientY: number

    if ('touches' in e) {
      // Touch event
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        return
      }
    } else {
      // Mouse event
      clientX = e.clientX
      clientY = e.clientY
    }

    const colorData = getColorAtPoint(clientX, clientY)

    if (colorData) {
      setSelectedColor(colorData)
      addToHistory(colorData)
      toast.success("Color picked!")
      setIsPickerActive(false)
      setHoveredColor(null)
    }
  }, [isPickerActive, getColorAtPoint])

  // Handle hover/move for preview
  const handleImageMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isPickerActive) return

    let clientX: number, clientY: number

    if ('touches' in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        return
      }
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const colorData = getColorAtPoint(clientX, clientY)
    if (colorData) {
      setHoveredColor(colorData.hex)
      setCursorPosition({ x: clientX, y: clientY })
    }
  }, [isPickerActive, getColorAtPoint])

  // Cancel picker on click outside
  const handleContainerClick = (e: React.MouseEvent) => {
    if (isPickerActive && e.target === imageContainerRef.current) {
      setIsPickerActive(false)
      setHoveredColor(null)
      toast("Color picking cancelled", { icon: "❌" })
    }
  }

  // Extract dominant colors using color quantization
  const extractDominantColors = useCallback(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!

    // Sample pixels (for performance, sample every 10th pixel)
    const sampleRate = 10
    const colorMap = new Map<string, number>()

    for (let y = 0; y < canvas.height; y += sampleRate) {
      for (let x = 0; x < canvas.width; x += sampleRate) {
        const imageData = ctx.getImageData(x, y, 1, 1)
        const [r, g, b, a] = imageData.data

        // Skip transparent pixels
        if (a < 128) continue

        // Quantize colors (reduce precision for grouping)
        const qr = Math.round(r / 32) * 32
        const qg = Math.round(g / 32) * 32
        const qb = Math.round(b / 32) * 32

        const key = `${qr},${qg},${qb}`
        colorMap.set(key, (colorMap.get(key) || 0) + 1)
      }
    }

    // Get top 6 colors
    const sortedColors = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([color]) => {
        const [r, g, b] = color.split(",").map(Number)
        return createColorData(r, g, b)
      })

    setDominantColors(sortedColors)
  }, [])

  // Color history management
  const addToHistory = (color: ColorData) => {
    setColorHistory((prev) => {
      const filtered = prev.filter((c) => c.hex !== color.hex)
      return [color, ...filtered].slice(0, 12)
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!")
      })
      .catch(() => {
        toast.error("Failed to copy")
      })
  }

  const resetImage = () => {
    setImageSrc(null)
    setFileName("")
    setSelectedColor(null)
    setDominantColors([])
    setImageLoaded(false)
    setIsPickerActive(false)
    setZoom(1)
    setHoveredColor(null)
  }

  const downloadPalette = () => {
    if (dominantColors.length === 0) return

    const paletteData = {
      colors: dominantColors.map((color) => ({
        hex: color.hex,
        rgb: color.rgb,
        hsl: color.hsl,
        cmyk: color.cmyk,
      })),
      selectedColor: selectedColor ? {
        hex: selectedColor.hex,
        rgb: selectedColor.rgb,
        hsl: selectedColor.hsl,
        cmyk: selectedColor.cmyk,
      } : null,
      history: colorHistory.map((color) => color.hex),
    }

    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `color-palette-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Palette downloaded!")
  }

  return (
    <ToolLayout
      title="Image Color Picker"
      description="Extract HEX, RGB, HSL, and CMYK color codes from any image instantly. Upload and pick precise pixel colors online for web design and UI development."
      toolId="678f382c26f06f912191bca2"
    >
      {/* Upload Section */}
      <Card className="mb-6 bg-default-50 dark:bg-default-100">
        <CardBody>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-1 text-primary-600 dark:text-primary-400">Upload Image</h2>
              {fileName && (
                <p className="text-sm text-default-500 truncate max-w-xs md:max-w-md">
                  {fileName}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handleImageColorPicker}
                disabled={!imageLoaded || isPickerActive}
                color="primary"
                size="sm"
                className="font-medium"
              >
                <Pipette className="h-4 w-4 mr-2" />
                {isPickerActive ? "Picking..." : "Pick Color"}
              </Button>

              {imageSrc && (
                <Button
                  onClick={downloadPalette}
                  disabled={dominantColors.length === 0}
                  color="secondary"
                  size="sm"
                  variant="flat"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              )}
            </div>
          </div>

          {isProcessing && (
            <Progress
              size="sm"
              isIndeterminate
              aria-label="Loading..."
              className="mb-4"
            />
          )}

          {!imageSrc ? (
            <label
              className={`flex flex-col items-center justify-center min-h-[16rem] px-4 py-8 bg-default-100/50 text-primary rounded-xl tracking-wide border-2 transition-all duration-300 ${isDragging
                ? "border-primary bg-primary-100 dark:bg-primary-900/30 scale-[1.02]"
                : "border-dashed border-default-200 dark:border-default-700 hover:border-primary hover:bg-default-50"
                } cursor-pointer`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload size={48} className="mb-3 text-primary" />
              <span className="text-base md:text-lg font-medium text-center">
                {isDragging ? "Drop your image here" : "Click or drag image to upload"}
              </span>
              <span className="text-xs md:text-sm text-default-400 mt-2">
                Supports: JPG, PNG, GIF, WebP
              </span>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          ) : (
            <div
              ref={imageContainerRef}
              className="relative bg-default-100 dark:bg-default-50 rounded-xl overflow-hidden border-2 border-default-200 dark:border-default-300"
              onClick={handleContainerClick}
            >
              <div
                className={`relative overflow-hidden ${isPickerActive ? "cursor-crosshair" : ""
                  }`}
                style={{
                  minHeight: "300px",
                  maxHeight: "600px",
                }}
              >
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt="Uploaded"
                  className="w-full h-full object-contain transition-transform duration-200"
                  style={{ transform: `scale(${zoom})` }}
                  onClick={handleImageInteraction}
                  onTouchEnd={handleImageInteraction}
                  onMouseMove={handleImageMove}
                  onTouchMove={handleImageMove}
                />

                {/* Color preview tooltip */}
                {isPickerActive && hoveredColor && cursorPosition && (
                  <div
                    className="absolute pointer-events-none z-50 bg-default-100/50 rounded-lg shadow-lg p-2 border-2 border-default-200 dark:border-default-700"
                    style={{
                      left: cursorPosition.x + 10,
                      top: cursorPosition.y + 10,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded border-2 border-default-300"
                      style={{ backgroundColor: hoveredColor }}
                    />
                    <p className="text-xs font-mono mt-1 text-default-700">{hoveredColor}</p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="bg-default-100/50"
                  onClick={() => setZoom(Math.min(zoom + 0.25, 3))}
                  disabled={zoom >= 3}
                >
                  <ZoomIn size={16} />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="bg-default-100/50"
                  onClick={() => setZoom(Math.max(zoom - 0.25, 0.5))}
                  disabled={zoom <= 0.5}
                >
                  <ZoomOut size={16} />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  color="danger"
                  variant="flat"
                  onClick={resetImage}
                >
                  <X size={16} />
                </Button>
              </div>

              {isPickerActive && (
                <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-white text-center py-2 text-sm font-medium">
                  👆 Tap anywhere on the image to pick a color
                </div>
              )}

              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}
        </CardBody>
      </Card>

      {/* Selected Color Details */}
      {selectedColor && (
        <Card className="mb-6 bg-default-50 dark:bg-default-100 shadow-lg">
          <CardBody>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-success-600 dark:text-success-400">Selected Color</h2>
              <Button
                onClick={() => setSelectedColor(null)}
                color="danger"
                variant="flat"
                size="sm"
              >
                <RefreshCw size={16} className="mr-2" />
                Clear
              </Button>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              {/* Color preview */}
              <div className="relative">
                <div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-default-200 dark:border-default-700 shadow-xl"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div className="absolute -bottom-2 -right-2 bg-default-100/50 rounded-full p-2 shadow-lg border-1 border-default-200 dark:border-default-700">
                  <Pipette size={16} className="text-primary" />
                </div>
              </div>

              {/* Color values */}
              <div className="flex-1 space-y-3 w-full">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered" size="sm" className="font-medium">
                      Format: {colorFormat.toUpperCase()}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Color format selection"
                    onAction={(key) => setColorFormat(key as ColorFormat)}
                  >
                    <DropdownItem key="hex" className="text-default-700">HEX</DropdownItem>
                    <DropdownItem key="rgb" className="text-default-700">RGB</DropdownItem>
                    <DropdownItem key="hsl" className="text-default-700">HSL</DropdownItem>
                    <DropdownItem key="cmyk" className="text-default-700">CMYK</DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <Input
                  label="Color Value"
                  value={getColorString(selectedColor)}
                  variant="bordered"
                  readOnly
                  classNames={{
                    label: "text-default-700 font-medium",
                    input: "font-mono text-default-700 font-semibold",

                  }}
                  endContent={
                    <Button
                      onClick={() => copyToClipboard(getColorString(selectedColor))}
                      size="sm"
                      color="primary"
                      variant="light"
                      isIconOnly
                    >
                      <Copy size={16} />
                    </Button>
                  }
                />

                {/* All formats in Textarea */}
                <Textarea
                  label="All Color Formats"
                  value={`HEX: ${selectedColor.hex}
RGB: ${selectedColor.rgb.r}, ${selectedColor.rgb.g}, ${selectedColor.rgb.b}
HSL: ${selectedColor.hsl.h}°, ${selectedColor.hsl.s}%, ${selectedColor.hsl.l}%
CMYK: ${selectedColor.cmyk.c}%, ${selectedColor.cmyk.m}%, ${selectedColor.cmyk.y}%, ${selectedColor.cmyk.k}%`}
                  variant="bordered"
                  readOnly
                  minRows={4}
                  maxRows={4}
                  classNames={{
                    label: "text-default-700 font-medium",
                    input: "font-mono text-default-700 text-sm",

                  }}
                  endContent={
                    <Button
                      onClick={() => copyToClipboard(`HEX: ${selectedColor.hex}
RGB: ${selectedColor.rgb.r}, ${selectedColor.rgb.g}, ${selectedColor.rgb.b}
HSL: ${selectedColor.hsl.h}°, ${selectedColor.hsl.s}%, ${selectedColor.hsl.l}%
CMYK: ${selectedColor.cmyk.c}%, ${selectedColor.cmyk.m}%, ${selectedColor.cmyk.y}%, ${selectedColor.cmyk.k}%`)}
                      size="sm"
                      color="primary"
                      variant="light"
                      isIconOnly
                    >
                      <Copy size={16} />
                    </Button>
                  }
                />
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Dominant Colors */}
      {dominantColors.length > 0 && (
        <Card className="mb-6 bg-default-50 dark:bg-default-100 shadow-lg">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold flex items-center text-default-700">
                <Palette className="w-5 h-5 mr-2 text-primary" />
                Dominant Colors
              </h3>
              <Chip size="sm" variant="flat" color="primary">
                {dominantColors.length} colors
              </Chip>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {dominantColors.map((color, index) => (
                <div
                  key={index}
                  className="group relative cursor-pointer"
                  onClick={() => {
                    setSelectedColor(color)
                    toast.success("Color selected!")
                  }}
                >
                  <div
                    className="aspect-square rounded-xl border-2 border-default-200 dark:border-default-700 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-200 relative overflow-hidden"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                    <div className="absolute bottom-1 right-1 bg-default-100/50 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-default-700">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-xs font-mono text-center mt-2 text-default-600 dark:text-default-400">
                    {color.hex}
                  </p>
                  <button
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-default-100/50 rounded-full p-1 shadow-md"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(color.hex)
                    }}
                  >
                    <Copy size={12} className="text-default-700" />
                  </button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Color History */}
      {colorHistory.length > 0 && (
        <Card className="mb-6 bg-default-50 dark:bg-default-100 shadow-lg">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-default-700">Recent Colors</h3>
              <Button
                size="sm"
                variant="light"
                onClick={() => setColorHistory([])}
              >
                Clear All
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {colorHistory.map((color, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedColor(color)}
                >
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-lg border-2 border-default-200 dark:border-default-700 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-200"
                    style={{ backgroundColor: color.hex }}
                    title={color.hex}
                  />
                  <button
                    className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white rounded-full p-1 shadow-md"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(color.hex)
                    }}
                  >
                    <Copy size={10} />
                  </button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Color Palette Export */}
      {(dominantColors.length > 0 || colorHistory.length > 0) && (
        <Card className="mb-6 bg-default-50 dark:bg-default-100 shadow-lg">
          <CardBody>
            <Tabs aria-label="Color export options" color="primary" variant="underlined">
              <Tab
                key="css"
                title={
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>CSS Variables</span>
                  </div>
                }
              >
                <div className="space-y-3 mt-4">
                  <Textarea
                    label="CSS Color Variables"
                    description="Copy these CSS variables to use in your project"
                    value={dominantColors.map((color, index) =>
                      `--color-${index + 1}: ${color.hex};`
                    ).join('\n')}
                    variant="bordered"
                    readOnly
                    minRows={6}
                    maxRows={10}
                    classNames={{
                      label: "text-default-700 font-medium",
                      input: "font-mono text-default-700 text-sm",

                      description: "text-default-500 text-xs",
                    }}
                  />
                  <Button
                    onClick={() => copyToClipboard(dominantColors.map((color, index) =>
                      `--color-${index + 1}: ${color.hex};`
                    ).join('\n'))}
                    color="primary"
                    variant="flat"
                    startContent={<Copy size={16} />}
                    size="sm"
                  >
                    Copy CSS Variables
                  </Button>
                </div>
              </Tab>

              <Tab
                key="tailwind"
                title={
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>Tailwind Config</span>
                  </div>
                }
              >
                <div className="space-y-3 mt-4">
                  <Textarea
                    label="Tailwind Configuration"
                    description="Add these to your tailwind.config.js colors section"
                    value={`colors: {
${dominantColors.map((color, index) =>
                      `  'custom-${index + 1}': '${color.hex}',`
                    ).join('\n')}
}`}
                    variant="bordered"
                    readOnly
                    minRows={6}
                    maxRows={10}
                    classNames={{
                      label: "text-default-700 font-medium",
                      input: "font-mono text-default-700 text-sm",

                      description: "text-default-500 text-xs",
                    }}
                  />
                  <Button
                    onClick={() => copyToClipboard(`colors: {
${dominantColors.map((color, index) =>
                      `  'custom-${index + 1}': '${color.hex}',`
                    ).join('\n')}
}`)}
                    color="primary"
                    variant="flat"
                    startContent={<Copy size={16} />}
                    size="sm"
                  >
                    Copy Tailwind Config
                  </Button>
                </div>
              </Tab>

              <Tab
                key="json"
                title={
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>JSON</span>
                  </div>
                }
              >
                <div className="space-y-3 mt-4">
                  <Textarea
                    label="JSON Color Palette"
                    description="Export your color palette as JSON"
                    value={JSON.stringify({
                      palette: dominantColors.map((color, index) => ({
                        name: `color-${index + 1}`,
                        hex: color.hex,
                        rgb: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
                        hsl: `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`,
                      })),
                      history: colorHistory.map(c => c.hex),
                    }, null, 2)}
                    variant="bordered"
                    readOnly
                    minRows={8}
                    maxRows={12}
                    classNames={{
                      label: "text-default-700 font-medium",
                      input: "font-mono text-default-700 text-xs",

                      description: "text-default-500 text-xs",
                    }}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyToClipboard(JSON.stringify({
                        palette: dominantColors.map((color, index) => ({
                          name: `color-${index + 1}`,
                          hex: color.hex,
                          rgb: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
                          hsl: `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`,
                        })),
                        history: colorHistory.map(c => c.hex),
                      }, null, 2))}
                      color="primary"
                      variant="flat"
                      startContent={<Copy size={16} />}
                      size="sm"
                    >
                      Copy JSON
                    </Button>
                    <Button
                      onClick={downloadPalette}
                      color="secondary"
                      variant="flat"
                      startContent={<Download size={16} />}
                      size="sm"
                    >
                      Download JSON
                    </Button>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      )}

      <InfoSectionImageColorPicker />
    </ToolLayout>
  )
}