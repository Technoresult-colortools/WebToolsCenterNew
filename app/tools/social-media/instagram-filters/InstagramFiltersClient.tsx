"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button, Card, CardBody, Input, Tabs, Tab, Slider, Select, SelectItem, ModalContent, Modal } from "@nextui-org/react"
import { toast, Toaster } from "react-hot-toast"
import {
  Upload,
  Download,
  RefreshCw,
  X,
  ImageIcon,
  ZoomIn,
  ZoomOut,
  BookOpen,
  Lightbulb,
  Info,
  Link2,
  Maximize2,
  Sliders,
  Settings,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import NextImage from "next/image"


type ScrollDirection = 'left' | 'right';

const filters = [
  "Normal",
  "Clarendon",
  "Gingham",
  "Moon",
  "Lark",
  "Reyes",
  "Juno",
  "Slumber",
  "Crema",
  "Ludwig",
  "Aden",
  "Perpetua",
  "Valencia",
  "XProII",
  "Hefe",
  "Sierra",
  "Amaro",
  "Mayfair",
  "Willow",
  "Lo-Fi",
  "Inkwell",
  "Nashville",
  "Stinson",
  "Vesper",
  "Rise",
  "Hudson",
  "Earlybird",
  "Brannan",
  "Sutro",
  "Toaster",
  "Walden",
  "Kelvin",
  "F1977",
  "Maven",
]

const filterStyles: { [key: string]: string } = {
  Normal: "",
  Clarendon: "contrast(1.2) saturate(1.35)",
  Gingham: "brightness(1.05) hue-rotate(-10deg)",
  Moon: "grayscale(1) contrast(1.1) brightness(1.1)",
  Lark: "contrast(0.9) brightness(1.1) saturate(1.1)",
  Reyes: "sepia(0.22) brightness(1.1) contrast(0.85) saturate(0.75)",
  Juno: "saturate(1.4) contrast(1.1) brightness(1.2)",
  Slumber: "saturate(0.66) brightness(1.05)",
  Rise: "brightness(1.15) contrast(1.1) saturate(1.2) sepia(0.1)",
  Hudson: "brightness(1.2) contrast(0.9) saturate(1.1) hue-rotate(-10deg)",
  Earlybird: "sepia(0.4) contrast(1.1) brightness(0.9) saturate(1.2)",
  Brannan: "sepia(0.3) contrast(1.2) brightness(1.1) saturate(0.9)",
  Sutro: "sepia(0.4) contrast(1.2) brightness(0.9) saturate(1.1) hue-rotate(-10deg)",
  Toaster: "sepia(0.3) contrast(1.3) brightness(0.8) saturate(1.3)",
  Walden: "brightness(1.1) contrast(0.9) saturate(1.3) sepia(0.2)",
  Kelvin: "brightness(1.2) contrast(1.1) saturate(1.4) hue-rotate(10deg)",
  F1977: "contrast(1.4) saturate(1.2) sepia(0.3) brightness(0.9)",
  Maven: "brightness(1.1) contrast(1.2) saturate(1.1) hue-rotate(5deg)",
  Crema: "contrast(0.9) brightness(1.1) saturate(1.1) sepia(0.2)",
  Ludwig: "contrast(1.1) brightness(1.1) saturate(1.1) sepia(0.1)",
  Aden: "contrast(0.9) brightness(1.2) saturate(0.85) hue-rotate(20deg)",
  Perpetua: "contrast(1.1) brightness(1.25) saturate(1.1)",
  Amaro: "brightness(1.1) contrast(1.1) saturation(1.3) hue-rotate(15deg)",
  Mayfair: "brightness(1.1) contrast(1.2) sepia(0.2)",
  Willow: "saturate(0.8) contrast(1.1) brightness(1.1) sepia(0.3)",
  Hefe: "contrast(1.2) brightness(1.05) saturate(1.3)",
  Valencia: "brightness(1.1) contrast(1.1) sepia(0.3) saturate(1.2)",
  XProII: "contrast(1.2) brightness(1.1) saturate(1.4) sepia(0.2)",
  Sierra: "contrast(0.9) brightness(1.1) saturate(1.1) sepia(0.3)",
  Nashville: "brightness(1.2) contrast(1.1) sepia(0.2) saturate(1.3)",
  "Lo-Fi": "contrast(1.4) saturate(1.1)",
  Inkwell: "grayscale(1) brightness(1.2) contrast(1.05)",
  Stinson: "contrast(0.9) brightness(1.1) saturate(0.9)",
  Vesper: "contrast(1.1) brightness(1.1) saturate(1.2) sepia(0.1)",
}

export default function InstagramFilters() {
  const [image, setImage] = useState<string | null>(null)
  const [filter, setFilter] = useState("Normal")
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [fileName, setFileName] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [zoom, setZoom] = useState(100)
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const filterContainerRef = useRef<HTMLDivElement | null>(null);
  const [urlInput, setUrlInput] = useState("")
  const [downloadFormat, setDownloadFormat] = useState("png")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const fullscreenRef = useRef<HTMLDivElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUrlUpload = async () => {
    if (!urlInput) {
      toast.error("Please enter an image URL")
      return
    }

    try {
      const response = await fetch(urlInput)
      const blob = await response.blob()
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
        setFileName(urlInput.split("/").pop() || "image")
      }
      reader.readAsDataURL(blob)
      toast.success("Image loaded successfully!")
    } catch {
      toast.error("Failed to load image from URL")
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setDimensions({
        width: img.width,
        height: img.height
      });
    };
    if (image) {
      img.src = image;
    }
  }, [image]);// Updated dependency

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (image) {
        if (e.key === "ArrowLeft") {
          const currentIndex = filters.indexOf(filter)
          const newIndex = (currentIndex - 1 + filters.length) % filters.length
          setFilter(filters[newIndex])
        } else if (e.key === "ArrowRight") {
          const currentIndex = filters.indexOf(filter)
          const newIndex = (currentIndex + 1) % filters.length
          setFilter(filters[newIndex])
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [filter, image])

  // Scroll handlers for filter carousel with proper types
  const scrollFilters = (direction: ScrollDirection) => {
    const container = filterContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(
            container.scrollWidth - container.clientWidth, 
            scrollPosition + scrollAmount
          );
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };



  const downloadImage = () => {
    if (imageRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = imageRef.current.naturalWidth
      canvas.height = imageRef.current.naturalHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.filter = `${filterStyles[filter]} brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
        ctx.scale(zoom / 100, zoom / 100)
        ctx.drawImage(imageRef.current, 0, 0)

        const link = document.createElement("a")
        link.download = `instagram_${filter}.${downloadFormat}`

        if (downloadFormat === "webp") {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                link.href = URL.createObjectURL(blob)
                link.click()
                URL.revokeObjectURL(link.href)
              }
            },
            "image/webp",
            0.9,
          )
        } else {
          link.href = canvas.toDataURL(`image/${downloadFormat}`, 0.9)
          link.click()
        }
      }
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

   // Updated fullscreen modal
   const renderFullscreenPreview = () => (
    <Modal
      isOpen={isFullscreen}
      onOpenChange={setIsFullscreen}
      size="full"
      classNames={{
        base: "bg-black/50 backdrop-blur-md",
        wrapper: "max-w-full h-full",
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-[90%] h-[90%] bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl relative">
              <Button
                isIconOnly
                variant="flat"
                color="danger"
                onPress={onClose}
                className="absolute top-4 right-4 z-50"
              >
                <X className="w-6 h-6" />
              </Button>
              <NextImage
                src={image || "/placeholder.svg"}
                alt="Fullscreen preview"
                width={dimensions.width || 500}
                height={dimensions.height || 500}
                className="w-full h-full object-contain"
                style={{
                  filter: `${filterStyles[filter]} brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                  transform: `scale(${zoom / 100})`,
                }}
              />
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );

  const resetAdjustments = () => {
    setBrightness(100)
    setContrast(100)
    setSaturation(100)
    setZoom(100)
    setFilter("Normal")
  }

  const imageStyle = {
    filter: `${filterStyles[filter]} brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
    transform: `scale(${zoom / 100})`,
    maxHeight: "400px",
    maxWidth: "100%",
    objectFit: "contain" as const,
    transition: "transform 0.3s ease",
  }

   // Updated filter preview section with carousel controls
   const renderFilterPreviews = () => (
    <div className="relative">
      <Button
        isIconOnly
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30"
        onClick={() => scrollFilters('left')}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      
      <div 
        ref={filterContainerRef}
        className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        style={{
          scrollbarWidth: 'thin',
          msOverflowStyle: 'none'
        }}
      >
        <div className="flex gap-4 min-w-max p-4">
          {filters.map((filterName) => (
            <div
              key={filterName}
              className={`cursor-pointer transition-all ${
                filter === filterName ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setFilter(filterName)}
            >
              <div className="w-24">
              <NextImage
                  src={image || "/placeholder.svg"}
                  alt={filterName}
                  width={dimensions.width || 100}
                  height={dimensions.height || 100}
                  className="w-24 h-24 object-cover rounded-lg"
                  style={{
                    filter: filterStyles[filterName],
                  }}
                />
                <p className="text-center text-sm mt-1">{filterName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        isIconOnly
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30"
        onClick={() => scrollFilters('right')}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );

  return (
    <ToolLayout
      title="Instagram Filters"
      description="Apply Instagram-style filters and effects to your images with advanced editing options"
      toolId="678f383126f06f912191bcd1"
    >
      <Toaster position="top-right" />
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            {/* Image Preview Section */}
            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer mb-6 relative overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {image ? (
                <div className="relative w-full h-full flex items-center justify-center" ref={fullscreenRef}>
                  <div
                    className="max-w-full max-h-full overflow-hidden"
                    style={{
                      width: `${(100 * zoom) / 100}%`,
                      height: `${(100 * zoom) / 100}%`,
                    }}
                  >
                  <NextImage
                    ref={imageRef}
                    src={image || "/placeholder.svg"}
                    alt="Uploaded"
                    width={dimensions.width || 500} // Add default width
                    height={dimensions.height || 500} // Add default height
                    className="w-full h-full object-contain"
                    style={{
                      ...imageStyle,
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: "center center",
                    }}
                  />
                  </div>
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {dimensions.width} x {dimensions.height}
                  </div>
                  {fileName && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      {fileName}
                    </div>
                  )}
                  <Button size="sm" color="danger" variant="flat" onPress={toggleFullscreen} className="absolute bottom-2 right-2">
                    <Maximize2 className="h-4 w-4" />
                    </Button>

                </div>
              ) : (
                <div className="text-default-400 flex flex-col items-center justify-center h-64">
                  <ImageIcon size={48} />
                  <p className="mt-2">Click or drag and drop to upload an image</p>
                </div>
              )}
            </div>

            {/* Fullscreen Preview */}
            {renderFullscreenPreview()}

            {/* Filter Previews */}
            {image && renderFilterPreviews()}

            {/* Controls Section */}
           {/* Controls Section */}
            <Tabs 
            aria-label="Instagram Filters options"
            className="w-full mt-2"
            classNames={{
                tabList: "gap-4",
                cursor: "w-full",
                tab: "max-w-fit px-0",
                tabContent: "group-data-[selected=true]:text-primary"
            }}
            >
            <Tab
                key="upload"
                title={
                <div className="flex items-center gap-2 px-3">
                    <Upload className="w-4 h-4" />
                    <span className="text-sm">Upload</span>
                </div>
                }
            >
                <div className="flex flex-col gap-3 py-3">
                <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button 
                    size="md"
                    onPress={() => fileInputRef.current?.click()} 
                    color="primary"
                    className="w-full"
                    >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                    </Button>
                    <div className="flex gap-2">
                    <Input
                        size="md"
                        placeholder="Image URL..."
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="flex-1"
                        variant="bordered"
                    />
                    <Button 
                        size="md"
                        onPress={handleUrlUpload} 
                        color="secondary"
                        isIconOnly
                    >
                        <Link2 className="w-4 h-4" />
                    </Button>
                    </div>
                </div>
                </div>
            </Tab>

            <Tab
                key="download"
                title={
                <div className="flex items-center gap-2 px-3">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                </div>
                }
            >
                <div className="flex flex-col sm:flex-row items-center gap-3 py-3">
                <Select
                    size="sm"
                    label="Format"
                    selectedKeys={[downloadFormat]}
                    onChange={(e) => setDownloadFormat(e.target.value)}
                    className="max-w-[200px]"
                    variant="bordered"
                >
                    <SelectItem key="png" value="png" className="text-default-700">PNG</SelectItem>
                    <SelectItem key="jpeg" value="jpeg" className="text-default-700">JPEG</SelectItem>
                    <SelectItem key="webp" value="webp" className="text-default-700">WebP</SelectItem>
                </Select>
                <Button 
                    size="md"
                    onPress={downloadImage} 
                    color="primary" 
                    isDisabled={!image}
                    className="w-full sm:w-auto"
                >
                    <Download className="w-4 h-4 mr-2" />
                    Download Image
                </Button>
                </div>
            </Tab>

            <Tab
                key="adjust"
                title={
                <div className="flex items-center gap-2 px-3">
                    <Sliders className="w-4 h-4" />
                    <span className="text-sm">Adjust</span>
                </div>
                }
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3">
                <div className="space-y-4">
                    <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Brightness</span>
                        <span>{brightness}%</span>
                    </div>
                    <Slider
                        size="sm"
                        step={1}
                        maxValue={200}
                        minValue={0}
                        value={brightness}
                        onChange={(value) => setBrightness(value as number)}
                        className="max-w-full"
                    />
                    </div>
                    <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Contrast</span>
                        <span>{contrast}%</span>
                    </div>
                    <Slider
                        size="sm"
                        step={1}
                        maxValue={200}
                        minValue={0}
                        value={contrast}
                        onChange={(value) => setContrast(value as number)}
                    />
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Saturation</span>
                        <span>{saturation}%</span>
                    </div>
                    <Slider
                        size="sm"
                        step={1}
                        maxValue={200}
                        minValue={0}
                        value={saturation}
                        onChange={(value) => setSaturation(value as number)}
                    />
                    </div>
                    <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Zoom</span>
                        <span>{zoom}%</span>
                    </div>
                    <Slider
                        size="sm"
                        step={1}
                        maxValue={200}
                        minValue={50}
                        value={zoom}
                        onChange={(value) => setZoom(value as number)}
                    />
                    </div>
                </div>
                </div>
            </Tab>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
            <Button 
                size="sm"
                color="primary" 
                variant="flat"
                onPress={resetAdjustments} 
                isDisabled={!image}
            >
                <RefreshCw className="w-4 h-4 mr-1" />
                Reset
            </Button>
            <div className="flex gap-1">
                <Button 
                size="sm"
                color="secondary" 
                variant="flat"
                isIconOnly
                onPress={() => setZoom((prev) => Math.min(prev + 10, 200))} 
                isDisabled={!image}
                >
                <ZoomIn className="w-4 h-4" />
                </Button>
                <Button 
                size="sm"
                color="secondary"
                variant="flat"
                isIconOnly
                onPress={() => setZoom((prev) => Math.max(prev - 10, 50))} 
                isDisabled={!image}
                >
                <ZoomOut className="w-4 h-4" />
                </Button>
            </div>
            </div>
          </CardBody>
        </Card>

        {/* About Section */}
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
                <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
                
                {/* About Instagram Filters */}
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2" />
                    About Instagram Filters
                </h2>
                <p className="text-sm md:text-base text-default-600 mb-4">
                The Instagram filters tool is a powerful image editing application that brings the magic of instagram's iconic filters to your browser. With 34 unique filters including Classic Instagram favorite and modern effects, this tool enables you to immediately replace your photos immediately with a few clicks.
                </p>
                <p className="text-sm md:text-base text-default-600 mb-4">
                Whether you are increasing your selfie, adjusting travel shots, or experimenting with artistic editing, our Instagram filter tool provides a simple and easy experience. Say goodbye to complicated photo editing software and embrace the simplicity of online filter applications.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <NextImage 
                    src="/Images/InfosectionImages/InstagramFiltersPreview.png?height=400&width=600"
                    alt="Screenshot of the Instagram Filters interface showing various filter options and adjustments" 
                    width={600} 
                    height={400} 
                    className="rounded-lg shadow-lg w-full h-auto"
                    />
                </div>

                {/* How to Use Instagram Filters */}
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2" />
                    How to Use Instagram Filters?
                </h2>
                <p className="text-sm md:text-base text-default-600 mb-4">
                    Follow the below mentioned steps to apply Instagram Filters on any image:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                    <li>Upload an image using file upload, drag & drop, or by entering an image URL.</li>
                    <li>Browse through the filter previews and choose your preferred style.</li>
                    <li>Use the arrow keys or click to quickly navigate through different filters.</li>
                    <li>Fine-tune the image with advanced adjustment sliders for brightness, contrast, and saturation.</li>
                    <li>Toggle fullscreen mode for a distraction-free editing experience.</li>
                    <li>Select your desired export format (PNG, JPEG, or WebP) and download your edited image.</li>
                </ol>

                {/* Key Features */}
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Settings className="w-6 h-6 mr-2" />
                    Key Features
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                    <li>34 Instagram-style filters with real-time previews.</li>
                    <li>Advanced image adjustments (brightness, contrast, saturation, zoom).</li>
                    <li>Multiple upload options: file upload, drag & drop, and URL input.</li>
                    <li>Export images in high-quality PNG, JPEG, or WebP formats.</li>
                    <li>Fullscreen mode for immersive editing.</li>
                    <li>Keyboard navigation for quick filter selection.</li>
                    <li>Responsive design for a seamless experience across all devices.</li>
                </ul>
                
                </div>
            </Card>

      </div>
    </ToolLayout>
  )
}

