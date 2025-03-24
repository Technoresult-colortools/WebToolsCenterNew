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
import NextImage from "next/image"
import { toast } from "react-hot-toast"
import { 
  Upload, 
  Download, 
  RefreshCw, 
  ArrowLeftRight, 
  ImageIcon, 
  Info, 
  Lightbulb, 
  BookOpen, 
  X, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  Settings
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"

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
      description="Quickly and easily resize your images with advanced options. Perfect for social media, web use, or any other platform requiring specific dimensions with optimal quality."
      toolId="678f382a26f06f912191bc8d"
    >
      <div className="flex flex-col gap-6">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <h2 className="text-xl sm:text-1xl md:text-2xl font-bold text-default-700 mb-4">Upload an Image</h2>
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
                          <Button onClick={handleDownload} color="primary" size="lg">
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
        
        <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
       
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About Image Resizer
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
              The image resigning is a powerful tool designed to help you shape your images with quick and easily accurate and flexibility. Whether you are preparing images for web usage, social media, or any other purpose requiring specific dimensions, this tool facilitates you many features to get accurate results.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
              With support to the ability to preserve many image formats, adjustable quality settings, social media presets, and aspect ratio, our image resisor meets both casual users and professionals who demand control over their image output.
              </p>

              <div className="my-8">
                <NextImage
                  src="/Images/InfosectionImages/ImageResizerPreview.png?height=400&width=600"
                  alt="Screenshot of the Enhanced Image Resizer interface showing various resizing options and a sample resized image"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features of Image Resizer
              </h2>
              <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li><strong>Social media presets</strong> for platforms like Instagram, Facebook, Twitter, LinkedIn, and YouTube</li>
                <li>Support for various image formats (PNG, JPEG, WebP)</li>
                <li>Precise width and height adjustments</li>
                <li>Option to preserve aspect ratio for proportional resizing</li>
                <li>Quick dimension swapping for easy orientation changes</li>
                <li>Multiple output formats: PNG, JPEG, and WebP</li>
                <li>Adjustable quality settings for optimized file sizes</li>
                <li>Real-time preview of resized images</li>
                <li>High-quality resizing algorithm for crisp results</li>
                <li>Easy one-click download of resized images</li>
                <li>Reset functionality to quickly start over</li>
                <li>Responsive design for use on various devices</li>
                <li>Tabbed interface for simplified workflow</li>
              </ul>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use Enhanced Image Resizer?
              </h2>
              <ol className="list-decimal list-inside text-default-600 space-y-2 text-sm md:text-base">
                <li>Click the "Select an image file" button or drag and drop an image onto the designated area.</li>
                <li>Once uploaded, you'll see a preview of the original image in the "Preview & Info" tab.</li>
                <li>Switch to the "Resize Settings" tab to configure your image.</li>
                <li>Choose a social media preset from the grid of platform options, or customize dimensions manually.</li>
                <li>For custom dimensions, use the width and height inputs to set your desired dimensions.</li>
                <li>Toggle the "Preserve aspect ratio" checkbox to maintain the image's proportions if needed.</li>
                <li>Select your preferred output format (PNG, JPEG, or WebP) and adjust quality as needed.</li>
                <li>Click "Resize Image" to generate your resized image.</li>
                <li>The app will automatically switch to the "Result" tab showing your final image.</li>
                <li>Click "Download Image" to save the result to your device.</li>
                <li>Use the "Reset Settings" button at any time to revert all settings and start over.</li>
              </ol>

          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2" />
            Tips and Best Practices
          </h2>
          <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
            <li>Use the "Preserve aspect ratio" option to avoid image distortion when resizing.</li>
            <li>For images with text or sharp edges, PNG format often provides the best quality.</li>
            <li>JPEG is ideal for photographs and images with many colors, offering good compression.</li>
            <li>WebP often provides the best balance between quality and file size for web use.</li>
            <li>Experiment with the quality slider to find the optimal balance between image quality and file size.</li>
            <li>When enlarging images, be aware that it may result in some loss of quality or pixelation.</li>
            <li>For social media platforms, research the recommended image sizes for optimal display.</li>
            <li>
              Use the "Swap Dimensions" button to quickly create both landscape and portrait versions of your image.
            </li>
            <li>Always preview your resized image before downloading to ensure it meets your requirements.</li>
            <li>Consider the intended use of your image when choosing between quality and file size.</li>
          </ul>
          <p className="text-sm md:text-base text-default-600 mt-6">
          Image redevelopment is a versatile tool that completes a wide range of image shaping. whether
            You need a professional designer, a social media manager, or just someone needs to change the shape of images
            Sometimes, this tool provides flexibility and accuracy that you need to achieve every correct result.
            Time. Start shaping your images with confidence and ease!
          </p>
        </div>

    </Card>
      </div>
      
    </ToolLayout>
  )
}

