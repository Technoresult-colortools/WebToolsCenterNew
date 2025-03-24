"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import {
  Card,
  CardBody,
  Button,
  Input,
  Slider,
  Modal,
  ModalContent,
  Select,
  SelectItem,
} from "@nextui-org/react"
import {
  Download,
  RefreshCw,
  Copy,
  Maximize2,
  X,
  Sliders,
  Palette,
  ImageIcon,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Grid,
  CircleDot,
  StretchHorizontal,
  ChevronUp,
  CircleDashed,
  BoxSelect,
  LayoutGrid,
  Waves,
  CircleDotDashed,
  Hash,
  Flower2,
  Info,
  Lightbulb,
  Shell,
  Code,
  Eye,
  BookOpen,
  FlowerIcon,
  SquareAsterisk,
  LucideDna,
  TreePine,
  LucideCode2,
  Network,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import { type PatternType, generatePattern } from "./patternGenerators"
import Image from "next/image"

type ExportFormat = "svg" | "png"
type ExportSize =
  | "facebookCover"
  | "youtubeCover"
  | "youtubeThumbnail"
  | "ogImage"
  | "instagramSquare"
  | "instagramLandscape"
  | "instagramPortrait"
  | "instagramStory"
  | "custom"

const exportSizes: Record<ExportSize, { width: number; height: number }> = {
  facebookCover: { width: 820, height: 312 },
  youtubeCover: { width: 2560, height: 1440 },
  youtubeThumbnail: { width: 1280, height: 720 },
  ogImage: { width: 1200, height: 630 },
  instagramSquare: { width: 1080, height: 1080 },
  instagramLandscape: { width: 1080, height: 566 },
  instagramPortrait: { width: 1080, height: 1350 },
  instagramStory: { width: 1080, height: 1920 },
  custom: { width: 800, height: 600 },
}

// Updated with all pattern types from PatternType
const patternTypeOptions = [
  { value: "mandala", label: "Mandala", icon: Flower2 },
  { value: "circles", label: "Circles", icon: Circle },
  { value: "squares", label: "Squares", icon: Square },
  { value: "triangles", label: "Triangles", icon: Triangle },
  { value: "hexagons", label: "Hexagons", icon: Hexagon },
  { value: "zigzag", label: "Zigzag", icon: StretchHorizontal },
  { value: "brikwall1", label: "Brick Wall", icon: Grid },
  { value: "polkaDots", label: "Polka Dots", icon: CircleDot },
  { value: "stripes", label: "Stripes", icon: StretchHorizontal },
  { value: "chevron", label: "Chevron", icon: ChevronUp },
  { value: "modernCircles", label: "Modern Circles", icon: CircleDashed },
  { value: "concentricCircles", label: "Concentric Circles", icon: CircleDotDashed },
  { value: "nestedSquares", label: "Nested Squares", icon: BoxSelect },
  { value: "triangleGrid", label: "Triangle Grid", icon: LayoutGrid },
  { value: "waves", label: "Waves", icon: Waves },
  { value: "dots3D", label: "3D Dots", icon: CircleDot },
  { value: "crosshatch", label: "Crosshatch", icon: Hash },
  { value: "spiral", label: "Spiral", icon: Shell },
  { value: "flowerOfLife", label: "Flower of Life", icon: FlowerIcon },
  { value: "geometricMosaic", label: "Geometric Mosaic", icon: SquareAsterisk },
  { value: "celticKnot", label: "Celtic Knot", icon: LucideDna },
  { value: "fractalTree", label: "Fractal Tree", icon: TreePine },
  { value: "opArt", label: "Op Art", icon: LucideCode2 },
  { value: "voronoiDiagram", label: "Voronoi Diagram", icon: Network },
  { value: "customImage", label: "Custom Image", icon: ImageIcon },
]

const exportSizeOptions = [
  { value: "ogImage", label: "OG Image" },
  { value: "facebookCover", label: "Facebook Cover" },
  { value: "youtubeCover", label: "YouTube Cover" },
  { value: "youtubeThumbnail", label: "YouTube Thumbnail" },
  { value: "instagramSquare", label: "Instagram Square" },
  { value: "instagramLandscape", label: "Instagram Landscape" },
  { value: "instagramPortrait", label: "Instagram Portrait" },
  { value: "instagramStory", label: "Instagram Story" },
  { value: "custom", label: "Custom Size" },
]

const exportFormatOptions = [
  { value: "svg", label: "SVG" },
  { value: "png", label: "PNG" },
]

export default function SvgPatternGenerator() {
  const [patternType, setPatternType] = useState<PatternType>("modernCircles")
  const [patternColor, setPatternColor] = useState("#3498db")
  const [secondaryColor, setSecondaryColor] = useState("#2980b9")
  const [backgroundColor, setBackgroundColor] = useState("#2343e1")
  const [size, setSize] = useState(32)
  const [spacing, setSpacing] = useState(53)
  const [rotation, setRotation] = useState(0)
  const [skew, setSkew] = useState(0)
  const [opacity, setOpacity] = useState(100)
  const [complexity, setComplexity] = useState(50)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [svgCode, setSvgCode] = useState("")
  const [exportSize, setExportSize] = useState<ExportSize>("ogImage")
  const [exportFormat, setExportFormat] = useState<ExportFormat>("svg")
  const [customWidth, setCustomWidth] = useState(1200)
  const [customHeight, setCustomHeight] = useState(630)
  const [customImage, setCustomImage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [, setIsImageUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const svgContainerRef = useRef<HTMLDivElement>(null)

  const generateSVG = useCallback(() => {
    try {
      const pattern = generatePattern(patternType, {
        size,
        spacing,
        patternColor,
        secondaryColor,
        strokeWidth,
        complexity,
        customImage,
        skew,
      })

      const previewWidth = 800
      const previewHeight = 600

      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${previewWidth} ${previewHeight}"
          preserveAspectRatio="xMidYMid slice" style="background-color: ${backgroundColor}">
          <defs>
            <pattern id="pattern" x="0" y="0" width="${size + spacing}" height="${size + spacing}" 
              patternUnits="userSpaceOnUse">
              <g transform="rotate(${rotation}, ${(size + spacing) / 2}, ${(size + spacing) / 2}) skewX(${skew})" 
                opacity="${opacity / 100}">
                ${pattern}
              </g>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      `

      setSvgCode(svg)
    } catch (error) {
      console.error("Error generating SVG:", error)
      toast.error("Error generating pattern. Please try different settings.")
    }
  }, [
    patternType,
    patternColor,
    secondaryColor,
    backgroundColor,
    size,
    spacing,
    rotation,
    skew,
    opacity,
    complexity,
    strokeWidth,
    customImage,
  ])

  useEffect(() => {
    generateSVG()
  }, [generateSVG])

  const handleRandomize = () => {
    const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
    const patternTypes: PatternType[] = [
      "circles",
      "squares",
      "triangles",
      "hexagons",
      "zigzag",
      "mandala",
      "polkaDots",
      "stripes",
      "chevron",
      "modernCircles",
      "concentricCircles",
      "nestedSquares",
      "triangleGrid",
      "waves",
      "dots3D",
      "crosshatch",
      "spiral",
      "flowerOfLife",
      "geometricMosaic",
      "celticKnot",
      "fractalTree",
      "opArt",
      "voronoiDiagram",
    ]

    setPatternType(patternTypes[Math.floor(Math.random() * patternTypes.length)])
    setPatternColor(randomColor())
    setSecondaryColor(randomColor())
    setBackgroundColor(randomColor())
    setSize(Math.floor(Math.random() * 40) + 10)
    setSpacing(Math.floor(Math.random() * 20))
    setRotation(Math.floor(Math.random() * 360))
    setSkew(Math.floor(Math.random() * 60) - 30)
    setOpacity(Math.floor(Math.random() * 100) + 1)
    setComplexity(Math.floor(Math.random() * 100) + 1)
    setStrokeWidth(Math.floor(Math.random() * 5) + 1)
  }

  const handleReset = () => {
    setPatternType("circles")
    setPatternColor("#3498db")
    setBackgroundColor("#2343e1")
    setSize(32)
    setSpacing(53)
    setRotation(0)
    setSkew(0)
    setOpacity(100)
    setComplexity(50)
    setStrokeWidth(2)
  }

  const handleDownload = async () => {
    try {
      const { width, height } =
        exportSize === "custom" ? { width: customWidth, height: customHeight } : exportSizes[exportSize]

      if (exportFormat === "svg") {
        const patternSize = size + spacing
        const numPatternsX = Math.ceil(width / patternSize)
        const numPatternsY = Math.ceil(height / patternSize)
        const totalPatternWidth = numPatternsX * patternSize
        const totalPatternHeight = numPatternsY * patternSize
        const offsetX = (totalPatternWidth - width) / 2
        const offsetY = (totalPatternHeight - height) / 2

        const exportSvg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <rect width="${width}" height="${height}" fill="${backgroundColor}" />
            <svg x="0" y="0" width="${width}" height="${height}" viewBox="-${offsetX} -${offsetY} ${totalPatternWidth} ${totalPatternHeight}">
              <defs>
                <pattern 
                  id="pattern" 
                  x="0" 
                  y="0" 
                  width="${patternSize}" 
                  height="${patternSize}" 
                  patternUnits="userSpaceOnUse"
                >
                  <g transform="rotate(${rotation}, ${patternSize / 2}, ${patternSize / 2}) skewX(${skew})" opacity="${opacity / 100}">
                    ${generatePattern(patternType, {
                      size,
                      spacing,
                      patternColor,
                      secondaryColor,
                      strokeWidth,
                      complexity,
                      customImage,
                      skew,
                    })}
                  </g>
                </pattern>
              </defs>
              <rect x="-${patternSize}" y="-${patternSize}" 
                    width="${totalPatternWidth + 2 * patternSize}" 
                    height="${totalPatternHeight + 2 * patternSize}" 
                    fill="url(#pattern)" />
            </svg>
          </svg>
        `
        const blob = new Blob([exportSvg], { type: "image/svg+xml" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `pattern_${width}x${height}.svg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        toast.success("SVG pattern downloaded successfully!")
      } else {
        const exportSvg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
            <rect width="${width}" height="${height}" fill="${backgroundColor}" />
            <svg width="${width}" height="${height}">
              <defs>
                <pattern 
                  id="pattern" 
                  x="0" 
                  y="0" 
                  width="${size + spacing}" 
                  height="${size + spacing}" 
                  patternUnits="userSpaceOnUse"
                >
                  <g transform="rotate(${rotation}, ${(size + spacing) / 2}, ${(size + spacing) / 2}) skewX(${skew})" opacity="${opacity / 100}">
                    ${generatePattern(patternType, {
                      size,
                      spacing,
                      patternColor,
                      secondaryColor,
                      strokeWidth,
                      complexity,
                      customImage,
                      skew,
                    })}
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </svg>
        `
        const svg = new Blob([exportSvg], { type: "image/svg+xml" })
        const url = URL.createObjectURL(svg)
        const img = new window.Image()

        img.onload = () => {
          const scale = 2
          const canvas = document.createElement("canvas")
          canvas.width = width * scale
          canvas.height = height * scale
          const ctx = canvas.getContext("2d")
          if (!ctx) {
            toast.error("Unable to create canvas context")
            return
          }

          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = "high"

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                toast.error("Unable to create PNG")
                return
              }
              const url = URL.createObjectURL(blob)
              const link = document.createElement("a")
              link.href = url
              link.download = `pattern_${width}x${height}.png`
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
              URL.revokeObjectURL(url)
              toast.success("PNG pattern downloaded successfully!")
            },
            "image/png",
            1.0,
          )
        }

        img.onerror = () => {
          toast.error("Error loading SVG for PNG conversion")
        }

        img.src = url
      }
    } catch (error) {
      console.error("Error during download:", error)
      toast.error("Failed to download pattern. Please try again.")
    }
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(svgCode).then(
      () => {
        toast.success("SVG code copied to clipboard!")
      },
      () => {
        toast.error("Failed to copy SVG code.")
      },
    )
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB")
        return
      }

      setIsImageUploading(true)
      const reader = new FileReader()
      reader.onload = (e) => {
        setCustomImage(e.target?.result as string)
        setPatternType("customImage")
        setIsImageUploading(false)
      }
      reader.onerror = () => {
        toast.error("Failed to read image file")
        setIsImageUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  // Fixed: Added proper accessibility labels and fixed preview issue for mobile
  const renderCodePreview = (fullscreen?: boolean) => (
    <div
      ref={svgContainerRef}
      className={`relative w-full ${fullscreen ? "min-h-[80vh]" : "h-[300px] md:h-full"} overflow-hidden rounded-lg`}
      aria-label="Pattern Preview"
      role="img"
    >
      <div dangerouslySetInnerHTML={{ __html: svgCode }} className="absolute inset-0 w-full h-full" />
    </div>
  )
  
  const renderFullscreenPreview = () => (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={setIsModalOpen}
      hideCloseButton
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
            <div className="w-[90%] h-[90%] md:w-[80%] md:h-[80%] bg-white rounded-lg overflow-hidden shadow-xl relative">
              <Button
                isIconOnly
                variant="flat"
                color="danger"
                onPress={onClose}
                className="absolute top-4 right-4 z-50"
                aria-label="Close preview"
              >
                <X className="w-6 h-6" />
              </Button>
              {renderCodePreview(true)}
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  )

  // Added responsive CustomImage upload with proper loading state

  return (
    <ToolLayout
      title="SVG Pattern Generator"
      description="Create unique, repeatable vector patterns for web backgrounds, print designs, and digital art with customizable options"
      toolId="678f382a26f06f912191bc92"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side: Preview + Quick Settings */}
        <div className="w-full md:w-7/12 flex flex-col gap-4">
          {/* Quick settings panel */}
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-4">
              <div className="flex flex-col gap-4">
                {/* Pattern Type Selection */}
                <div className="w-full">
                  <Select
                    label="Pattern Type"
                    selectedKeys={[patternType]}
                    onSelectionChange={(keys) => setPatternType(Array.from(keys)[0] as PatternType)}
                    variant="bordered"
                    classNames={{
                      trigger: "h-10",
                      value: "text-sm"
                    }}
                  >
                    {patternTypeOptions.map((option) => {
                      const IconComponent = option.icon
                      return (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          startContent={<IconComponent className="h-4 w-4 mr-2" />}
                          className="text-default-700"
                        >
                          {option.label}
                        </SelectItem>
                      )
                    })}
                  </Select>
                </div>

                {/* Color Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <Input
                      type="color"
                      label="Pattern Color"
                      labelPlacement="outside"
                      value={patternColor}
                      onChange={(e) => setPatternColor(e.target.value)}
                      variant="bordered"
                      classNames={{
                        inputWrapper: "h-10",
                        label: "text-xs"
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      type="color"
                      label="Background Color"
                      labelPlacement="outside"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      variant="bordered"
                      classNames={{
                        inputWrapper: "h-10",
                        label: "text-xs"
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      type="color"
                      label="Secondary Color"
                      labelPlacement="outside"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      variant="bordered"
                      classNames={{
                        inputWrapper: "h-10",
                        label: "text-xs"
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Preview Card */}
          <Card className="bg-default-50 dark:bg-default-100 flex-1">
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-default-700">Pattern Preview</h2>
                <div className="flex gap-2">
                  <Button isIconOnly size="sm" variant="light" onPress={() => setIsModalOpen(true)}>
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button isIconOnly size="sm" variant="light" color="success" onPress={handleRandomize}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="h-[calc(100%-40px)] min-h-[300px]">
                {renderCodePreview()}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" color="primary" onPress={handleDownload}>
                  <Download className="h-4 w-4 mr-1" />
                  Download {exportFormat.toUpperCase()}
                </Button>
                <Button size="sm" color="secondary" onPress={handleCopyToClipboard}>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy SVG
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right side: Controls */}
        <div className="w-full md:w-5/12">
          <Card className="bg-default-50 dark:bg-default-100 h-full">
            <CardBody className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-default-700">Pattern Settings</h2>
                <Button size="sm" variant="light" color="danger" onPress={handleReset}>Reset</Button>
              </div>
              
              <div className="space-y-6">
                {/* Size & Spacing */}
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm text-default-700">Size: {size}px</label>
                    </div>
                    <Slider
                      step={1}
                      maxValue={100}
                      minValue={5}
                      value={size}
                      onChange={(value) => setSize(Number(value))}
                      classNames={{
                        track: "h-2",
                      }}
                      size="sm"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm text-default-700">Spacing: {spacing}px</label>
                    </div>
                    <Slider
                      step={1}
                      maxValue={100}
                      minValue={0}
                      value={spacing}
                      onChange={(value) => setSpacing(Number(value))}
                      classNames={{
                        track: "h-2",
                      }}
                      size="sm"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm text-default-700">Rotation: {rotation}deg</label>
                    </div>
                    <Slider
                      step={1}
                      maxValue={360}
                      minValue={0}
                      value={rotation}
                      onChange={(value) => setRotation(Number(value))}
                      classNames={{
                        track: "h-2",
                      }}
                      size="sm"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm text-default-700">Skew: {skew}deg</label>
                    </div>
                    <Slider
                      step={1}
                      maxValue={45}
                      minValue={-45}
                      value={skew}
                      onChange={(value) => setSkew(Number(value))}
                      classNames={{
                        track: "h-2",
                      }}
                      size="sm"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm text-default-700">Pattern Opacity: {opacity}%</label>
                    </div>
                    <Slider
                      step={1}
                      maxValue={100}
                      minValue={1}
                      value={opacity}
                      onChange={(value) => setOpacity(Number(value))}
                      classNames={{
                        track: "h-2",
                      }}
                      size="sm"
                    />
                  </div>
                </div>
                
                {/* Export Settings */}
                <div className="mt-8">
                  <h3 className="text-md font-semibold text-default-700 mb-3">Export Size Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Select
                      label="Background Template"
                      selectedKeys={[exportSize]}
                      onSelectionChange={(keys) => setExportSize(Array.from(keys)[0] as ExportSize)}
                      variant="bordered"
                      size="sm"
                    >
                      {exportSizeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-default-700">
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                    
                    <Select
                      label="Export Format"
                      selectedKeys={[exportFormat]}
                      onSelectionChange={(keys) => setExportFormat(Array.from(keys)[0] as ExportFormat)}
                      variant="bordered"
                      size="sm"
                    >
                      {exportFormatOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-default-700">
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                    
                    {exportSize === "custom" && (
                      <>
                        <Input
                          type="number"
                          label="Width (px)"
                          value={customWidth.toString()}
                          onChange={(e) => setCustomWidth(Number(e.target.value))}
                          variant="bordered"
                          size="sm"
                        />
                        <Input
                          type="number"
                          label="Height (px)"
                          value={customHeight.toString()}
                          onChange={(e) => setCustomHeight(Number(e.target.value))}
                          variant="bordered"
                          size="sm"
                        />
                      </>
                    )}
                  </div>
                </div>
                
                {/* Advanced Settings */}
                <div className="mt-4">
                <h3 className="text-md font-semibold text-default-700 mb-3">Advanced Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  {/* Complexity Slider */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm text-default-700">Complexity: {complexity}</label>
                    </div>
                    <Slider
                      step={1}
                      maxValue={100}
                      minValue={0}
                      value={complexity}
                      onChange={(value) => setComplexity(Number(value))}
                      size="sm"
                    />
                  </div>

                  {/* Stroke Width Slider */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm text-default-700">Stroke Width: {strokeWidth}</label>
                    </div>
                    <Slider
                      step={0.5}
                      maxValue={10}
                      minValue={0.5}
                      value={strokeWidth}
                      onChange={(value) => setStrokeWidth(Number(value))}
                      size="sm"
                    />
                  </div>

                  {/* Image Upload Section */}
                  {patternType === "customImage" && (
                    <div className="col-span-1 md:col-span-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        label="Upload Image (Max 5MB)"
                        variant="bordered"
                        size="sm"
                        className="w-full"
                      />
                    </div>
                  )}

                </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

    {/* Info Section */}
    <Card className="mt-6 bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2" />
          What is the SVG Pattern Generator?
        </h2>
        <p className="text-sm md:text-base text-default-600 mb-4">
        The SVG pattern generator is a powerful and versatile tool designed to create unique, repeated vector patterns for various design purposes. Whether you are a web designer, graphic artist, or someone is looking to add visual interest to your projects, this device easily provides an introspection interface to craft the custom, scalable vector graphics.
        </p>
        <p className="text-sm md:text-base text-default-600 mb-4">
        With a wide range of adjustable parameters and real -time previews, you can fix your patterns to fully fit your design needs. The generator offers options for different patterns, color adaptation and even custom image uploads, which allows for versatile applications in web design, digital art, print material and more.
        </p>

        <div className="my-8">
          <Image
            src="/Images/InfosectionImages/SVGPatternGeneratorPreview.png?height=400&width=600"
            alt="Screenshot of the SVG Pattern Generator interface showing pattern customization options and a preview"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>

        <h2
          id="how-to-use"
          className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
        >
          <BookOpen className="w-6 h-6 mr-2" />
          How to Use the SVG Pattern Generator?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
          <li>Select a pattern type from the dropdown menu or upload a custom image.</li>
          <li>Adjust the "Size" slider to control the overall size of the pattern elements.</li>
          <li>Use the "Spacing" slider to determine the distance between pattern elements.</li>
          <li>Modify "Rotation" to change the angle of the pattern elements.</li>
          <li>Adjust "Opacity" to control the transparency of the pattern.</li>
          <li>Use "Complexity" to add more intricate details to certain pattern types.</li>
          <li>Adjust "Stroke Width" for patterns with line elements.</li>
          <li>Choose colors for the pattern, secondary elements, and background using the color pickers.</li>
          <li>Select an export size preset or enter custom dimensions.</li>
          <li>Choose between SVG and PNG export formats.</li>
          <li>Click "Randomize" to generate new pattern ideas quickly.</li>
          <li>Use the export options to download your pattern or copy the SVG code.</li>
        </ol>

        <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2" />
          Key Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
          <li>
            <Grid className="w-4 h-4 inline-block mr-1" /> <strong>Multiple Pattern Types:</strong> Choose from a
            variety of pattern styles including geometric shapes, lines, and complex designs
          </li>
          <li>
            <Sliders className="w-4 h-4 inline-block mr-1" /> <strong>Customizable Parameters:</strong> Fine-tune
            size, spacing, rotation, opacity, complexity, and stroke width
          </li>
          <li>
            <Palette className="w-4 h-4 inline-block mr-1" /> <strong>Color Options:</strong> Customize pattern
            color, secondary color, and background color
          </li>
          <li>
            <ImageIcon className="w-4 h-4 inline-block mr-1" /> <strong>Custom Image Upload:</strong> Use your own
            images to create unique patterns
          </li>
          <li>
            <RefreshCw className="w-4 h-4 inline-block mr-1" /> <strong>Randomization:</strong> Quickly generate new
            patterns with random settings
          </li>
          <li>
            <Download className="w-4 h-4 inline-block mr-1" /> <strong>Multiple Export Options:</strong> Save as SVG
            or PNG in various preset sizes or custom dimensions
          </li>
          <li>
            <Code className="w-4 h-4 inline-block mr-1" /> <strong>SVG Code Access:</strong> Copy the raw SVG code
            for easy integration into your projects
          </li>
          <li>
            <Eye className="w-4 h-4 inline-block mr-1" /> <strong>Real-time Preview:</strong> See changes instantly
            as you adjust parameters
          </li>
          <li>
            <Maximize2 className="w-4 h-4 inline-block mr-1" /> <strong>Full-screen Preview:</strong> Examine your
            pattern in detail with an expanded view
          </li>
        </ul>

        <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2" />
          Creative Tips and Tricks
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
          <li>Combine different pattern types with similar settings for layered, complex designs.</li>
          <li>Use high opacity for bold, striking patterns, or low opacity for subtle background textures.</li>
          <li>Experiment with extreme size and spacing values to create unique, abstract patterns.</li>
          <li>Try rotating your pattern at different angles to find interesting orientations.</li>
          <li>Use custom image uploads with geometric patterns for creative masking effects.</li>
          <li>Combine patterns with solid color shapes in your designs for contrast and visual interest.</li>
          <li>Use the SVG code to create animated patterns in web projects using CSS or JavaScript.</li>
          <li>Experiment with the complexity and stroke width to achieve different artistic styles.</li>
        </ul>

        <p className="text-sm md:text-base text-default-600 mt-6">
          Ready to transform your designs with captivating patterns? Our SVG Pattern Generator offers endless
          possibilities for your creative projects. Whether you're designing for web, print, or digital media, this
          tool provides the flexibility and power you need to bring your ideas to life. Start experimenting with
          patterns now and take your designs to the next level!
        </p>
      </div>
    </Card>



    {/* Fullscreen Modal */}
    {renderFullscreenPreview()}
 
</ToolLayout>
)
}
