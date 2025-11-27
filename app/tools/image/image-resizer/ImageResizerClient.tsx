"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import {
  Card,
  CardBody,
  Button,
  Checkbox,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Slider,
  Tabs,
  Tab,
  Tooltip,
} from "@nextui-org/react"
import { toast } from "react-hot-toast"
import {
  Upload,
  Download,
  RefreshCw,
  ArrowLeftRight,
  ImageIcon,
  X,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Settings
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionImageResizer from "./info-section"

const formatOptions = [
  { key: "png", label: "PNG" },
  { key: "jpeg", label: "JPEG" },
  { key: "webp", label: "WebP" },
]

const socialMediaPresets = [
  { key: "custom", label: "Custom", icon: Settings, width: 0, height: 0 },
  { key: "instagram-post", label: "Instagram Post", icon: Instagram, width: 1080, height: 1080 },
  { key: "instagram-story", label: "Instagram Story", icon: Instagram, width: 1080, height: 1920 },
  { key: "facebook-post", label: "Facebook Post", icon: Facebook, width: 1200, height: 630 },
  { key: "facebook-cover", label: "Facebook Cover", icon: Facebook, width: 851, height: 315 },
  { key: "twitter-post", label: "Twitter Post", icon: Twitter, width: 1200, height: 675 },
  { key: "twitter-header", label: "Twitter Header", icon: Twitter, width: 1500, height: 500 },
  { key: "linkedin-post", label: "LinkedIn Post", icon: Linkedin, width: 1200, height: 627 },
  { key: "linkedin-cover", label: "LinkedIn Cover", icon: Linkedin, width: 1584, height: 396 },
  { key: "youtube-thumbnail", label: "YouTube Thumbnail", icon: Youtube, width: 1280, height: 720 },
]

export default function EnhancedImageResizer() {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null)
  const [resizedImage, setResizedImage] = useState<string | null>(null)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [preserveAspectRatio, setPreserveAspectRatio] = useState<boolean>(true)
  const [format, setFormat] = useState<string>("png")
  const [quality, setQuality] = useState<number>(90)
  const [selectedPreset, setSelectedPreset] = useState<string>("custom")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [showOriginal,] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<string>("settings")

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        setOriginalImage(img)
        setWidth(img.width)
        setHeight(img.height)
        setResizedImage(null)
        setImageSrc(img.src)
        setActiveTab("settings")
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
    toast.success("Image uploaded successfully!")
  }

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file)
    } else {
      toast.error("Please drop a valid image file.")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const resetImage = () => {
    setOriginalImage(null)
    setResizedImage(null)
    setImageSrc(null)
    setWidth(0)
    setHeight(0)
    setPreserveAspectRatio(true)
    setFormat("png")
    setQuality(90)
    setSelectedPreset("custom")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast.success("Image reset successfully!")
  }

  const handleWidthChange = useCallback(
    (newWidth: number) => {
      setWidth(newWidth)
      if (preserveAspectRatio && originalImage) {
        setHeight(Math.round(newWidth / (originalImage.width / originalImage.height)))
      }
      setSelectedPreset("custom")
    },
    [preserveAspectRatio, originalImage],
  )

  const handleHeightChange = useCallback(
    (newHeight: number) => {
      setHeight(newHeight)
      if (preserveAspectRatio && originalImage) {
        setWidth(Math.round(newHeight * (originalImage.width / originalImage.height)))
      }
      setSelectedPreset("custom")
    },
    [preserveAspectRatio, originalImage],
  )

  const handlePreserveAspectRatioChange = (checked: boolean) => {
    setPreserveAspectRatio(checked)
    if (checked && originalImage) {
      setHeight(Math.round(width / (originalImage.width / originalImage.height)))
    }
  }

  const handleResize = () => {
    if (!originalImage || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = width
    canvas.height = height

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(originalImage, 0, 0, width, height)

    const resizedDataUrl = canvas.toDataURL(`image/${format}`, quality / 100)
    setResizedImage(resizedDataUrl)
    setActiveTab("result")
    toast.success("Image resized successfully!")
  }

  const handleDownload = () => {
    if (!resizedImage) return

    const link = document.createElement("a")
    link.href = resizedImage
    link.download = `resized-image.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success(`Image downloaded as ${format.toUpperCase()}!`)
  }

  const handleReset = () => {
    if (originalImage) {
      setWidth(originalImage.width)
      setHeight(originalImage.height)
    }
    setResizedImage(null)
    setPreserveAspectRatio(true)
    setFormat("png")
    setQuality(90)
    setSelectedPreset("custom")
    toast.success("Settings reset to original!")
  }

  const handleSwapDimensions = () => {
    setWidth(height)
    setHeight(width)
    setSelectedPreset("custom")
  }

  const handlePresetChange = (preset: string) => {
    setSelectedPreset(preset)

    if (preset === "custom") return

    const selectedPreset = socialMediaPresets.find(p => p.key === preset)
    if (selectedPreset) {
      setWidth(selectedPreset.width)
      setHeight(selectedPreset.height)

      // Optionally adjust format for optimal results based on the platform
      if (preset.includes("instagram") || preset.includes("facebook")) {
        setFormat("jpeg")
        setQuality(80)
      } else if (preset.includes("twitter") || preset.includes("linkedin")) {
        setFormat("png")
        setQuality(90)
      } else if (preset.includes("youtube")) {
        setFormat("webp")
        setQuality(85)
      }
    }
  }

  return (
    <ToolLayout
      title="Image Resizer"
      description="Resize images to specific dimensions effortlessly. Choose from PNG, JPEG, or WebP formats and preserve quality for web use and social media."
      toolId="678f382a26f06f912191bc8d"
    >
      <div className="flex flex-col gap-6">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <h2 className="text-xl sm:text-1xl md:text-2xl font-bold text-primary mb-4">Upload an Image</h2>
            {!imageSrc ? (
              <label
                className="flex flex-col items-center justify-center h-64 px-4 py-6 bg-default-100 text-primary rounded-lg shadow-lg tracking-wide uppercase border-2 border-primary border-dashed cursor-pointer hover:bg-primary-100 hover:text-primary-600 transition duration-300"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Upload size={48} />
                <span className="mt-2 text-sm sm:text-base md:text-md leading-normal text-center block">Select a file or drag and drop</span>
                <span className="mt-1 text-xs text-gray-500">Supports JPG, PNG, WebP, GIF</span>
                <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            ) : (
              <div className="relative">
                <div className="relative h-64 md:h-96 bg-default-100 rounded-lg overflow-hidden">
                  <img
                    src={imageSrc || "/placeholder.svg"}
                    alt="Original"
                    className="w-full h-full object-contain border-2"
                    style={{ display: showOriginal ? "block" : "none" }}
                  />
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain border-2"
                    style={{ display: showOriginal ? "none" : "block" }}
                  />
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

        {originalImage && (
          <>
            <Tabs
              aria-label="Image Resizer Options"
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(key as string)}
              className="w-full"
            >
              <Tab key="preview" title="Preview & Info">
                <Card className="bg-default-50 dark:bg-default-100">
                  <CardBody className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-bold text-default-700 mb-4">Original Image</h3>
                        <div className="relative h-64 bg-default-100 rounded-lg border-2 overflow-hidden">
                          <img
                            src={originalImage.src || "/placeholder.svg"}
                            alt="Original"
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                          />
                        </div>
                        <p className="text-default-700 mt-2">
                          Original size: {originalImage.width} x {originalImage.height}
                        </p>
                      </div>

                      {resizedImage && (
                        <div>
                          <h3 className="text-xl font-bold text-default-700 mb-4">Resized Preview</h3>
                          <div className="relative h-64 bg-default-100 rounded-lg overflow-hidden border-2">
                            <img
                              src={resizedImage || "/placeholder.svg"}
                              alt="Resized"
                              style={{ width: "100%", height: "100%", objectFit: "contain" }}
                            />
                          </div>
                          <p className="text-default-700 mt-2">
                            Resized to: {width} x {height}
                          </p>
                        </div>
                      )}
                    </div>

                    {resizedImage && (
                      <div className="flex justify-center mt-6">
                        <Button onClick={handleDownload} color="primary">
                          <Download className="h-5 w-5 mr-2" />
                          Download Resized Image
                        </Button>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="settings" title="Resize Settings">
                <Card className="bg-default-50 dark:bg-default-100">
                  <CardBody className="p-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-default-700 mb-4">Social Media Presets</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {socialMediaPresets.map((preset) => {
                          const PresetIcon = preset.icon;
                          return (
                            <Tooltip key={preset.key} content={`${preset.label}: ${preset.width}×${preset.height}`} className="text-default-700">
                              <Button
                                onClick={() => handlePresetChange(preset.key)}
                                color={selectedPreset === preset.key ? "primary" : "default"}
                                className="flex-col h-24 "

                                variant={selectedPreset === preset.key ? "solid" : "flat"}
                              >
                                <PresetIcon className="h-6 w-6 mb-1" />
                                <span className="text-xs">{preset.label}</span>
                              </Button>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-default-700 mb-4">Custom Dimensions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="width" className="text-default-700 mb-2 block">
                          Width
                        </label>
                        <div className="flex items-center">
                          <Input
                            id="width"
                            type="number"
                            value={width.toString()}
                            onChange={(e) => handleWidthChange(Number(e.target.value))}
                            className="flex-grow"
                            variant="bordered"
                          />
                          <span className="text-default-700 ml-2">px</span>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="height" className="text-default-700 mb-2 block">
                          Height
                        </label>
                        <div className="flex items-center">
                          <Input
                            id="height"
                            type="number"
                            value={height.toString()}
                            onChange={(e) => handleHeightChange(Number.parseInt(e.target.value))}
                            className="flex-grow"
                            variant="bordered"
                          />
                          <span className="text-default-700 ml-2">px</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <Button onClick={handleSwapDimensions} color="primary" className="mr-4">
                        <ArrowLeftRight className="h-5 w-5 mr-2" />
                        Swap Dimensions
                      </Button>
                      <Checkbox isSelected={preserveAspectRatio} onValueChange={handlePreserveAspectRatioChange}>
                        Preserve aspect ratio
                      </Checkbox>
                    </div>

                    <h3 className="text-xl font-bold text-default-700 mb-4 mt-8">Output Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="format" className="text-default-700 mb-2 block">
                          Output Format
                        </label>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button variant="bordered" className="capitalize">
                              {format}
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Select format"
                            selectionMode="single"
                            selectedKeys={[format]}
                            onSelectionChange={(keys) => setFormat(Array.from(keys)[0] as string)}
                            className="text-default-700"
                          >
                            {formatOptions.map((option) => (
                              <DropdownItem key={option.key}>{option.label} </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                      <div>
                        <label htmlFor="quality" className="text-default-700 mb-2 block">
                          Quality
                        </label>
                        <div className="flex items-center">
                          <Slider
                            aria-label="Quality"
                            size="sm"
                            step={1}
                            maxValue={100}
                            minValue={1}
                            value={quality}
                            onChange={(value) => setQuality(value as number)}
                            className="flex-grow"
                          />
                          <span className="min-w-[2.5rem] text-right text-default-700 whitespace-nowrap">{quality}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                      <Button onClick={handleResize} color="primary" size="md">
                        <ImageIcon className="h-5 w-5 mr-2" />
                        Resize Image
                      </Button>
                      <Button onClick={handleReset} color="danger" size="md">
                        <RefreshCw className="h-5 w-5 mr-2" />
                        Reset Settings
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Tab>

              {resizedImage && (
                <Tab key="result" title="Result">
                  <Card className="bg-default-50 dark:bg-default-100">
                    <CardBody className="p-6">
                      <h3 className="text-xl font-bold text-default-700 mb-4">Final Resized Image</h3>
                      <div className="relative bg-default-100 rounded-lg overflow-hidden border-2 max-h-96">
                        <img
                          src={resizedImage || "/placeholder.svg"}
                          alt="Resized"
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-default-700">
                            <strong>Dimensions:</strong> {width} × {height} pixels
                          </p>
                          <p className="text-default-700">
                            <strong>Format:</strong> {format.toUpperCase()}
                          </p>
                          <p className="text-default-700">
                            <strong>Quality:</strong> {quality}%
                          </p>
                        </div>
                        <div className="flex justify-center md:justify-end items-center">
                          <Button onPress={handleDownload} color="primary" size="lg">
                            <Download className="h-5 w-5 mr-2" />
                            Download Image
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Tab>
              )}
            </Tabs>
          </>
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* Info Section */}
        <InfoSectionImageResizer />
      </div>

    </ToolLayout>
  )
}

