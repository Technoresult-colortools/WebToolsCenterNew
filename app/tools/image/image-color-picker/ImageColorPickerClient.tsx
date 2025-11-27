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
  Tooltip,
} from "@nextui-org/react"
import { Upload, X, RefreshCw, Pipette, Copy, Palette, Camera } from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionImageColorPicker from "./info-section"

type ColorFormat = "hex" | "rgb" | "hsl"

interface ColorInfo {
  hex: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
  name?: string
}

export default function ImageColorPicker() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [isDragging, setIsDragging] = useState(false)
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex")
  const [showColorDetails, setShowColorDetails] = useState(false)
  const [colorHistory, setColorHistory] = useState<string[]>([])
  const [isImageEyeDropperActive, setIsImageEyeDropperActive] = useState(false)
  const [dominantColors, setDominantColors] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [touchMode, setTouchMode] = useState(false)
  const [crosshairPosition, setCrosshairPosition] = useState<{ x: number; y: number } | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  // Enhanced color utilities
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("")
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

  // Enhanced file processing
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    setIsProcessing(true)
    setFileName(file.name)

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file")
      setIsProcessing(false)
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("File size too large. Please select an image under 10MB")
      setIsProcessing(false)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string)
      setIsProcessing(false)
      toast.success("Image loaded successfully!")
    }
    reader.onerror = () => {
      toast.error("Failed to load image")
      setIsProcessing(false)
    }
    reader.readAsDataURL(file)
  }

  // Enhanced image processing
  useEffect(() => {
    if (imageSrc && imageRef.current && canvasRef.current) {
      const img = new Image()
      img.src = imageSrc
      img.onload = () => {
        const canvas = canvasRef.current!
        const maxSize = 1920 // Limit canvas size for performance
        let { width, height } = img

        if (width > maxSize || height > maxSize) {
          const ratio = Math.min(maxSize / width, maxSize / height)
          width *= ratio
          height *= ratio
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")!
        ctx.drawImage(img, 0, 0, width, height)
        extractDominantColors()
      }
    }
  }, [imageSrc])

  // Mobile-friendly drag and drop
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

  // Enhanced color picking with mobile support
  const getColorFromCoordinates = useCallback((x: number, y: number) => {
    if (!canvasRef.current) return null

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")!
    const imageData = ctx.getImageData(x, y, 1, 1)
    const [r, g, b] = imageData.data

    return rgbToHex(r, g, b)
  }, [])

  const handleImageClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!imageContainerRef.current || !canvasRef.current) return

    const rect = imageContainerRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    const x = Math.round(clientX - rect.left)
    const y = Math.round(clientY - rect.top)

    // Ensure coordinates are within canvas bounds
    if (x >= 0 && y >= 0 && x < canvasRef.current.width && y < canvasRef.current.height) {
      const color = getColorFromCoordinates(x, y)
      if (color) {
        setSelectedColor(color)
        setShowColorDetails(true)
        setColorHistory((prev) => [color, ...prev.filter(c => c !== color).slice(0, 9)])
        toast.success("Color picked successfully!")
      }
    }
  }, [getColorFromCoordinates])

  // Touch support for mobile
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchMode || !imageContainerRef.current) return

    e.preventDefault()
    const rect = imageContainerRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    setCrosshairPosition({ x, y })
  }, [touchMode])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchMode) {
      handleImageClick(e)
      setTouchMode(false)
      setCrosshairPosition(null)
    }
  }, [touchMode, handleImageClick])

  // Enhanced eyedropper with fallback
  const handleImageEyeDropper = async () => {
    try {
      if (!imageSrc) {
        toast.error("Please upload an image first")
        return
      }

      setIsImageEyeDropperActive(true)

      // Check if device supports EyeDropper API
      if ("EyeDropper" in window) {
        try {
          // @ts-expect-error - EyeDropper API might not be in TypeScript definitions
          const eyeDropper = new EyeDropper()
          const result = await eyeDropper.open()

          setSelectedColor(result.sRGBHex)
          setShowColorDetails(true)
          setColorHistory((prev) => [result.sRGBHex, ...prev.filter(c => c !== result.sRGBHex).slice(0, 9)])
          toast.success("Color picked successfully!")
        } catch (error) {
          // User cancelled or other error
          if (typeof error === "object" && error !== null && "name" in error && (error as { name: string }).name !== 'AbortError') {
            throw error
          }
        }
      } else {
        // Fallback for mobile and unsupported browsers
        setTouchMode(true)
        toast.success("Touch mode activated! Tap on the image to pick colors", { duration: 3000 })
      }
    } catch (error) {
      // Fallback to touch mode
      setTouchMode(true)
      toast.success("Touch the image to pick colors", { duration: 3000 })
    } finally {
      setIsImageEyeDropperActive(false)
    }
  }

  // Enhanced dominant color extraction
  const extractDominantColors = useCallback(() => {
    if (!imageSrc || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")!
    const { width, height } = canvas

    // Sample fewer pixels for better performance
    const sampleSize = Math.min(width * height, 10000)
    const stepSize = Math.max(1, Math.floor((width * height) / sampleSize))

    const colorCounts: { [key: string]: number } = {}

    for (let i = 0; i < width * height; i += stepSize * 4) {
      const x = (i / 4) % width
      const y = Math.floor(i / 4 / width)

      if (x < width && y < height) {
        const imageData = ctx.getImageData(x, y, 1, 1)
        const [r, g, b, a] = imageData.data

        // Skip transparent pixels
        if (a < 128) continue

        // Group similar colors
        const groupedR = Math.floor(r / 32) * 32
        const groupedG = Math.floor(g / 32) * 32
        const groupedB = Math.floor(b / 32) * 32

        const hex = rgbToHex(groupedR, groupedG, groupedB)
        colorCounts[hex] = (colorCounts[hex] || 0) + 1
      }
    }

    const sortedColors = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([color]) => color)

    setDominantColors(sortedColors)
  }, [imageSrc])

  // Utility functions
  const resetSelection = () => {
    setSelectedColor(null)
    setShowColorDetails(false)
    setTouchMode(false)
    setCrosshairPosition(null)
  }

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.success("Copied to clipboard!")
        })
        .catch(() => {
          toast.error("Failed to copy")
        })
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        toast.success("Copied to clipboard!")
      } catch (error) {
        toast.error("Failed to copy")
      }
      document.body.removeChild(textArea)
    }
  }

  const getColorString = (color: string | null) => {
    if (!color) return ""
    const rgb = hexToRgb(color)
    if (!rgb) return ""
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    switch (colorFormat) {
      case "hex":
        return color
      case "rgb":
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
      case "hsl":
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    }
  }

  // Camera capture for mobile
  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click()
    }
  }

  return (
    <ToolLayout
      title="Image Color Picker"
      description="Effortlessly extract and capture colors from any image"
      toolId="678f382a26f06f912191bc90"
    >
      <Card className="mb-6 bg-default-50 dark:bg-default-100">
        <CardBody>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handleImageEyeDropper}
                disabled={isImageEyeDropperActive || !imageSrc}
                color="primary"
                className="flex-1 sm:flex-none"
              >
                <Pipette className="h-4 w-4 mr-2" />
                {touchMode ? "Touch Mode Active" : "Pick Color"}
              </Button>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => fileInputRef.current?.click()} size="sm" variant="bordered">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button onClick={handleCameraCapture} size="sm" variant="bordered">
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </Button>
            </div>
          </div>

          {fileName && (
            <div className="flex items-center gap-2 mb-2">
              <Chip size="sm" color="primary" variant="flat">{fileName}</Chip>
              {isProcessing && <Progress size="sm" isIndeterminate className="flex-1" />}
            </div>
          )}

          {touchMode && (
            <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                🎯 Touch mode active! Tap anywhere on the image to pick colors.
              </p>
            </div>
          )}

          {!imageSrc ? (
            <label
              className={`flex flex-col items-center justify-center h-48 sm:h-64 px-4 py-6 bg-default-100 text-primary rounded-lg shadow-lg tracking-wide uppercase border-2 ${isDragging ? "border-primary bg-primary-100" : "border-primary border-dashed"
                } cursor-pointer hover:bg-primary-100 hover:text-primary-600 transition duration-300`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload size={32} />
              <span className="mt-2 text-base leading-normal text-center">
                {isDragging ? "Drop image here" : "Select a file or drag and drop"}
              </span>
              <span className="text-xs text-default-500 mt-1">
                Supports JPG, PNG, GIF, WEBP (Max 10MB)
              </span>
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              <input
                ref={cameraInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
                capture="environment"
              />
            </label>
          ) : (
            <div ref={imageContainerRef} className="relative">
              <div
                className="relative h-48 sm:h-64 md:h-96 bg-default-100 border border-default-400 dark:border-default-700 rounded-lg overflow-hidden cursor-crosshair select-none"
                onClick={handleImageClick}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt="Uploaded"
                  className="w-full h-full object-contain"
                  draggable={false}
                />

                {/* Crosshair for touch mode */}
                {crosshairPosition && (
                  <div
                    className="absolute pointer-events-none z-10"
                    style={{
                      left: crosshairPosition.x - 10,
                      top: crosshairPosition.y - 10,
                      width: 20,
                      height: 20,
                      border: '2px solid #ff0000',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 0, 0, 0.2)'
                    }}
                  />
                )}
              </div>

              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  isIconOnly
                  color="danger"
                  aria-label="Remove image"
                  size="sm"
                  onClick={() => {
                    setImageSrc(null)
                    setFileName("")
                    setDominantColors([])
                    resetSelection()
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ""
                    }
                  }}
                >
                  <X size={16} />
                </Button>
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}
        </CardBody>
      </Card>

      {/* Color Details */}
      {showColorDetails && selectedColor && (
        <Card className="mb-6 bg-default-50 dark:bg-default-100">
          <CardBody>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-xl md:text-2xl font-bold">Selected Color</h2>
              <Button onClick={resetSelection} color="danger" size="sm">
                <RefreshCw size={16} className="mr-2" />
                Reset
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-4 border-default shadow-lg flex-shrink-0"
                style={{ backgroundColor: selectedColor }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <span className="text-lg font-semibold break-all">{getColorString(selectedColor)}</span>
                  <Button
                    onClick={() => copyToClipboard(getColorString(selectedColor))}
                    size="sm"
                    color="primary"
                    className="flex-shrink-0"
                  >
                    <Copy size={14} className="mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" size="sm">{colorFormat.toUpperCase()}</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Color format selection" onAction={(key) => setColorFormat(key as ColorFormat)}>
                  <DropdownItem key="hex" className="text-default-700">HEX</DropdownItem>
                  <DropdownItem key="rgb" className="text-default-700">RGB</DropdownItem>
                  <DropdownItem key="hsl" className="text-default-700">HSL</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-default-200 rounded-lg">
                <p className="font-semibold">HEX</p>
                <p className="font-mono">{selectedColor}</p>
              </div>
              {(() => {
                const rgb = hexToRgb(selectedColor)
                return rgb ? (
                  <div className="p-3 bg-default-200 rounded-lg">
                    <p className="font-semibold">RGB</p>
                    <p className="font-mono">{rgb.r}, {rgb.g}, {rgb.b}</p>
                  </div>
                ) : null
              })()}
              {(() => {
                const rgb = hexToRgb(selectedColor)
                if (!rgb) return null
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
                return (
                  <div className="p-3 bg-default-200 rounded-lg">
                    <p className="font-semibold">HSL</p>
                    <p className="font-mono">{hsl.h}°, {hsl.s}%, {hsl.l}%</p>
                  </div>
                )
              })()}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Dominant Colors */}
      {dominantColors.length > 0 && (
        <Card className="mb-6 bg-default-50 dark:bg-default-100">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Dominant Colors
              </h3>
              <Chip size="sm" variant="flat">{dominantColors.length} colors</Chip>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {dominantColors.map((color, index) => (
                <Tooltip key={index} content={`Click to copy: ${color}`} placement="top" className="text-default-700">
                  <div
                    className="aspect-square rounded-lg border-2 border-default cursor-pointer hover:scale-110 transition-transform flex items-center justify-center relative group"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      copyToClipboard(color)
                      toast.success("Color copied to clipboard!")
                    }}
                  >
                    <span className="text-xs font-bold text-white bg-black/50 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {index + 1}
                    </span>
                  </div>
                </Tooltip>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Color History */}
      {colorHistory.length > 0 && (
        <Card className="mb-6 bg-default-50 dark:bg-default-100">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Color History</h3>
              <div className="flex items-center gap-2">
                <Chip size="sm" variant="flat">{colorHistory.length}/10</Chip>
                <Button
                  size="sm"
                  color="danger"
                  variant="light"
                  onClick={() => setColorHistory([])}
                >
                  Clear
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {colorHistory.map((color, index) => (
                <Tooltip key={index} content={`Click to copy: ${color}`} placement="top">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-default cursor-pointer hover:scale-110 transition-transform shadow-md"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      copyToClipboard(color)
                      toast.success("Color copied to clipboard!")
                    }}
                  />
                </Tooltip>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      <InfoSectionImageColorPicker />
    </ToolLayout>
  )
}