"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import {
  Button,
  Card,
  CardBody,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react"
import { toast } from "react-hot-toast"
import {
  Upload,
  Download,
  Eye,
  EyeOff,
  AlertTriangle,
  ChevronDown,
  Lock,
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import NextImage from 'next/image'
import InfoSectionSvgToPng from "./info-section"

const exportSizeOptions = [
  { key: "custom", name: "Custom" },
  { key: "1200x630", name: "OG Image (1200x630)" },
  { key: "1080x1080", name: "Instagram Square (1080x1080)" },
  { key: "1080x1920", name: "Instagram Story (1080x1920)" },
  { key: "1280x720", name: "YouTube Thumbnail (1280x720)" },
]

const qualityOptions = [
    { key: "high", name: "High Quality", scale: 2 },
    { key: "medium", name: "Medium Quality", scale: 1.5 },
    { key: "low", name: "Low Quality", scale: 1 },
  ]

  export default function SVGToPNGConverter() {
    const [svgFile, setSvgFile] = useState<File | null>(null)
    const [svgUrl, setSvgUrl] = useState<string>("")
    const [pngUrl, setPngUrl] = useState<string>("")
    const [quality, setQuality] = useState<string>("medium")
    const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff")
    const [showBackground, setShowBackground] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [,setSvgDimensions] = useState({ width: 0, height: 0 })
    const [exportSize, setExportSize] = useState<string>("custom")
    const [customWidth, setCustomWidth] = useState<number>(0)
    const [customHeight, setCustomHeight] = useState<number>(0)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (file: File) => {
    if (file && file.type === "image/svg+xml") {
      setSvgFile(file)
      const url = URL.createObjectURL(file)
      setSvgUrl(url)
      setPngUrl("")
      setError(null)
      loadSvgDimensions(url)
      toast.success("SVG file uploaded successfully!")
    } else {
      toast.error("Please upload a valid SVG file.")
    }
  }

  const handleUrlInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value
    setSvgUrl(url)
    setPngUrl("")
    setError(null)
    if (url) {
      loadSvgDimensions(url)
    }
  }

  const loadSvgDimensions = (url: string) => {
    const img = new Image()
    img.onload = () => {
      setSvgDimensions({ width: img.width, height: img.height })
      setCustomWidth(img.width)
      setCustomHeight(img.height)
    }
    img.onerror = () => {
      setError("Failed to load SVG dimensions.")
      toast.error("Failed to load SVG.")
    }
    img.src = url
  }

  const handleConvert = useCallback(async () => {
    if (!svgUrl) {
      toast.error('Please upload an SVG file or enter a valid SVG URL.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(svgUrl)
      if (!response.ok) throw new Error('Failed to fetch SVG')
      const svgText = await response.text()
      
      const img = new Image()
      img.onload = () => {
        if (canvasRef.current) {
          const canvas = canvasRef.current
          const ctx = canvas.getContext('2d')
          if (ctx) {
            // Calculate dimensions based on export size
            let targetWidth, targetHeight
            if (exportSize === 'custom') {
              targetWidth = Math.round(customWidth)
              targetHeight = Math.round(customHeight)
            } else {
              const [width, height] = exportSize.split('x').map(Number)
              targetWidth = width
              targetHeight = height
            }

            // Get quality scale factor
  

            // Set canvas size based on target dimensions and quality
            canvas.width = targetWidth
            canvas.height = targetHeight

            // Clear canvas and draw background if enabled
            if (showBackground) {
              ctx.fillStyle = backgroundColor
              ctx.fillRect(0, 0, canvas.width, canvas.height)
            }

            // Calculate dimensions while maintaining aspect ratio
            const aspectRatio = img.width / img.height
            let drawWidth = canvas.width
            let drawHeight = canvas.height
            
            if (canvas.width / canvas.height > aspectRatio) {
              drawWidth = canvas.height * aspectRatio
            } else {
              drawHeight = canvas.width / aspectRatio
            }
            
            const x = (canvas.width - drawWidth) / 2
            const y = (canvas.height - drawHeight) / 2

            // Enable image smoothing based on quality
            ctx.imageSmoothingEnabled = true
            ctx.imageSmoothingQuality = quality === 'high' ? 'high' : quality === 'medium' ? 'medium' : 'low'

            // Draw image at calculated dimensions
            ctx.drawImage(img, x, y, drawWidth, drawHeight)

            try {
              // Convert to PNG with appropriate quality
              const compressionQuality = quality === 'high' ? 1 : quality === 'medium' ? 0.8 : 0.6
              const pngDataUrl = canvas.toDataURL('image/png', compressionQuality)
              setPngUrl(pngDataUrl)
              toast.success('SVG converted to PNG successfully!')
            } catch {
              setError('Failed to generate PNG. The image might be tainted by cross-origin data.')
              toast.error('Conversion failed. Please try uploading the SVG file directly.')
            }
          }
        }
        setIsLoading(false)
      }
      img.onerror = () => {
        setError('Failed to load SVG. Please check the URL or file.')
        toast.error('Failed to load SVG.')
        setIsLoading(false)
      }
      img.src = 'data:image/svg+xml;base64,' + btoa(svgText)
    } catch {
      setError('Failed to fetch or process the SVG. It might be due to CORS restrictions.')
      toast.error('Failed to process SVG. Try uploading the file directly.')
      setIsLoading(false)
    }
  }, [svgUrl, backgroundColor, showBackground, exportSize, customWidth, customHeight, quality])

  

  const handleDownload = () => {
    if (pngUrl) {
      const link = document.createElement("a")
      link.href = pngUrl
      link.download = "converted-image.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success("PNG file downloaded successfully!")
    } else {
      toast.error("Please convert the SVG to PNG first.")
    }
  }

  return (
    <ToolLayout
      title="SVG to PNG Converter"
      description="Easily convert your SVG files to high-quality PNG images with our fast and reliable SVG to PNG Converter."
      toolId="678f382b26f06f912191bc94"
    >
      <div className="flex flex-col gap-8">
        {/* Upload Section - Only show when no SVG is loaded */}
        {!svgUrl && (
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <Input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFileUpload(e.target.files?.[0] as File)}
                accept=".svg,image/svg+xml"
                className=" hidden"
                id="svg-upload"
              />
              <div className="flex items-center mb-2">
                <Lock className="w-4 h-4 inline-block mr-1 text-primary" />
                <strong className="text-primary text-sm">Secure Conversion:</strong>
                <span className="text-primary text-sm ml-1">All processing is done locally</span>
              </div>
              <div
                className="flex flex-col items-center justify-center h-64 px-4 py-6 bg-default-100 text-primary rounded-lg shadow-lg tracking-wide uppercase border-2 border-primary border-dashed cursor-pointer hover:bg-primary-100 hover:text-primary-600 transition duration-300"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={32} />
                <span className="mt-2 text-sm sm:text-base md:text-md leading-normal text-center block">
                Select SVG file or drag and drop
                </span>
                <span className="mt-1 text-xs text-gray-500">Supports SVG file Only</span>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Card className="bg-danger-50 dark:bg-danger-100">
            <CardBody className="p-4 flex items-center">
              <AlertTriangle className="mr-2 text-danger" />
              <p className="text-danger">{error}</p>
            </CardBody>
          </Card>
        )}

        {/* SVG Preview and Controls */}
        {svgUrl && !error && (
          <>
            <Card className="bg-default-50 dark:bg-default-100">
              <CardBody className="p-6">
                <h3 className="text-xl font-bold mb-4">SVG Preview</h3>
                  {/* File info and URL input moved below preview */}
                  <div className="mt-2 mb-2 space-y-4">
                  {svgFile && (
                    <div className="flex items-center space-x-2 p-2 bg-default-200 rounded">
                      <span className="text-small text-default-500">File: {svgFile.name}</span>
                    </div>
                  )}
                  
                </div>
                <div className="relative h-64 bg-default-200 dark:bg-default-50 rounded-lg overflow-hidden">
                  <NextImage
                    src={svgUrl}
                    alt="SVG Preview"
                    fill
                    style={{
                      objectFit: "contain",
                      backgroundColor: showBackground ? backgroundColor : "transparent",
                    }}
                  />
                </div>
                
              
              </CardBody>
            </Card>

            {/* Conversion Settings */}
            <Card className="bg-default-50 dark:bg-default-100">
                <CardBody className="p-6">
                <h3 className="text-xl font-bold mb-4">Conversion Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Column */}
                    <div className="space-y-4">
                    {/* Quality Selector */}
                    <div>
                        <label className="text-sm mb-1 block">Quality</label>
                        <Dropdown>
                        <DropdownTrigger>
                            <Button 
                            variant="bordered" 
                            endContent={<ChevronDown />} 
                            className="w-full"
                            >
                            {qualityOptions.find((option) => option.key === quality)?.name || "Select quality"}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Quality options"
                            onAction={(key) => setQuality(key as string)}
                            selectedKeys={[quality]}
                        >
                            {qualityOptions.map((option) => (
                            <DropdownItem key={option.key} className="text-default-700">{option.name}</DropdownItem>
                            ))}
                        </DropdownMenu>
                        </Dropdown>
                    </div>

                    {/* Export Size Selector */}
                    <div>
                        <label className="text-sm mb-1 block">Export Size</label>
                        <Dropdown>
                        <DropdownTrigger>
                            <Button 
                            variant="bordered" 
                            endContent={<ChevronDown />} 
                            className="w-full"
                            >
                            {exportSizeOptions.find((option) => option.key === exportSize)?.name || "Select size"}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Export size options"
                            onAction={(key) => setExportSize(key as string)}
                            selectedKeys={[exportSize]}
                        >
                            {exportSizeOptions.map((option) => (
                            <DropdownItem key={option.key} className="text-default-700">{option.name}</DropdownItem>
                            ))}
                        </DropdownMenu>
                        </Dropdown>

                        {exportSize === "custom" && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <Input
                            type="number"
                            label="Width"
                            size="sm"
                            value={customWidth.toString()}
                            onChange={(e) => setCustomWidth(Number(e.target.value))}
                            variant="bordered"
                            />
                            <Input
                            type="number"
                            label="Height"
                            size="sm"
                            value={customHeight.toString()}
                            onChange={(e) => setCustomHeight(Number(e.target.value))}
                            variant="bordered"
                            />
                        </div>
                        )}
                    </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                    {/* Background Controls */}
                    <div>
                        <label className="text-sm mb-1 block">Background Color</label>
                        <div className="flex items-center gap-2">
                        <Input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="w-16 h-10"
                            variant="bordered"
                        />
                        <Input
                            type="text"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="flex-grow"
                            size="md"
                            variant="bordered"
                        />
                        <Button
                            isIconOnly
                            color="primary"
                            size="md"
                            onPress={() => setShowBackground(!showBackground)}
                            aria-label="Toggle background"
                        >
                            {showBackground ? <EyeOff size={18} /> : <Eye size={18} />}
                        </Button>
                        </div>
                    </div>

                    {/* SVG URL Input and Convert Button */}
                    <div>
                        <label className="text-sm mb-1 block">SVG URL</label>
                        <div className="flex items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Enter SVG URL"
                            value={svgUrl}
                            onChange={handleUrlInput}
                            className="flex-grow"
                            size="md"
                            variant="bordered"
                        />
                        <Button 
                            color="primary"
                            size="md"
                            onPress={handleConvert} 
                            isLoading={isLoading}
                        >
                            {isLoading ? "Converting..." : "Convert"}
                        </Button>
                        </div>
                    </div>
                    </div>
                </div>
                </CardBody>
            </Card>
          </>
        )}

        {/* PNG Preview */}
        {pngUrl && (
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <h3 className="text-xl font-bold mb-4">PNG Preview</h3>
              <div className="relative h-64 bg-default-200 dark:bg-default-50 rounded-lg overflow-hidden">
                <NextImage src={pngUrl} alt="PNG Preview" fill style={{ objectFit: "contain" }} />
              </div>
              <div className="mt-4">
                <Button 
                  color="primary" 
                  onPress={handleDownload} 
                  startContent={<Download size={20} />}
                >
                  Download PNG
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Info Section */}
        <InfoSectionSvgToPng />
      
    </ToolLayout>
  )
}

