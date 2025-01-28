"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react"
import { Upload, X, RefreshCw, Info, BookOpen, Lightbulb, Pipette, Copy, Palette } from "lucide-react"
import { Toast, toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import NextImage from "next/image"

type ColorFormat = "hex" | "rgb" | "hsl"

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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => setImageSrc(e.target?.result as string)
    reader.readAsDataURL(file)
  }
  useEffect(() => {
    if (imageSrc && imageRef.current && canvasRef.current) {
      const img = new Image()
      img.src = imageSrc
      img.onload = () => {
        const canvas = canvasRef.current!
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext("2d")!
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        extractDominantColors()
      }
    }
  }, [imageSrc])

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

  const resetSelection = () => {
    setSelectedColor(null)
    setShowColorDetails(false)
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

  const handleImageEyeDropper = async () => {
    try {
      if (!imageSrc) {
        toast.error("Please upload an image first")
        return
      }

      setIsImageEyeDropperActive(true)

      if ("EyeDropper" in window) {
        // @ts-expect-error - EyeDropper API might not be in TypeScript definitions
        const eyeDropper = new EyeDropper()
        const result = await eyeDropper.open()

        setSelectedColor(result.sRGBHex)
        setShowColorDetails(true)
        setColorHistory((prev) => [result.sRGBHex, ...prev.slice(0, 9)])
        toast.success("Color picked successfully!")
      } else {
        toast(
          (t: Toast) => (
            <span>
              Color picker not supported on this device. Tap the image to select a color.
              <Button size="sm" onClick={() => toast.dismiss(t.id)}>
                Dismiss
              </Button>
            </span>
          ),
          { icon: "ℹ️", style: { background: "#3b82f6", color: "#fff" } },
        )

        const handleImageClick = (e: MouseEvent) => {
          const rect = imageContainerRef.current!.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top

          const canvas = canvasRef.current!
          const ctx = canvas.getContext("2d")!
          const imageData = ctx.getImageData(x, y, 1, 1)
          const [r, g, b] = imageData.data

          const hex = rgbToHex(r, g, b)
          setSelectedColor(hex)
          setShowColorDetails(true)
          setColorHistory((prev) => [hex, ...prev.slice(0, 9)])
          toast.success("Color picked successfully!")

          imageContainerRef.current!.removeEventListener("click", handleImageClick)
        }

        imageContainerRef.current!.addEventListener("click", handleImageClick)
      }
    } catch (error) {
      toast("Failed to pick color")
    } finally {
      setIsImageEyeDropperActive(false)
    }
  }

  const extractDominantColors = () => {
    if (!imageSrc || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")!
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    const colorCounts: { [key: string]: number } = {}

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const rgb = `rgb(${r},${g},${b})`
      colorCounts[rgb] = (colorCounts[rgb] || 0) + 1
    }

    const sortedColors = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([color]) => color)

    setDominantColors(sortedColors)
  }

  useEffect(() => {
    return () => {
      if (imageContainerRef.current) {
        imageContainerRef.current.removeEventListener("click", () => {})
      }
    }
  }, [])

  return (
    <ToolLayout title="Image Color Picker" 
    description="Effortlessly extract and capture colors from any image"
    toolId="678f382a26f06f912191bc90"
    >


      <Card className="mb-8 bg-default-50 dark:bg-default-100">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold">Upload an Image</h2>
            <Button onClick={handleImageEyeDropper} disabled={isImageEyeDropperActive || !imageSrc} color="primary">
              <Pipette className="h-5 w-5 mr-2" />
              Pick Image Color
            </Button>
          </div>

          {fileName && <p className="text-default-500 mb-2">Current file: {fileName}</p>}

          {!imageSrc ? (
             <label
             className={`flex flex-col items-center justify-center h-64 px-4 py-6 bg-default-100 text-primary rounded-lg shadow-lg tracking-wide uppercase border-2 ${
               isDragging ? "border-primary bg-primary-100" : "border-primary border-dashed"
             } cursor-pointer hover:bg-primary-100 hover:text-primary-600 transition duration-300`}
             onDragEnter={handleDragEnter}
             onDragLeave={handleDragLeave}
             onDragOver={handleDragOver}
             onDrop={handleDrop}
           >
              <Upload size={32} />
              <span className="mt-2 text-base leading-normal">
                  {isDragging ? "Drop image here" : "Select a file or drag and drop"}
                </span>
                <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
          ) : (
            <div ref={imageContainerRef} className="relative">
              <div className="relative h-48 md:h-96 bg-default-100 border border-default-400 dark:border-default-700 rounded-lg overflow-hidden">
                <img
                  ref={imageRef}
                  src={imageSrc || "/placeholder.svg"}
                  alt="Uploaded"
                  className="w-full h-full object-contain"
                />
              </div>
              <Button
                isIconOnly
                color="danger"
                aria-label="Reset image"
                className="absolute top-2 right-2"
                onClick={() => {
                  setImageSrc(null)
                  setFileName("")
                  setDominantColors([])
                }}
              >
                <X size={20} />
              </Button>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}
        </CardBody>
      </Card>

      {showColorDetails && selectedColor && (
        <Card className="mt-6 bg-default-50 dark:bg-default-100">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold">Selected Color</h2>
              <Button onClick={resetSelection} color="danger">
                <RefreshCw size={16} className="mr-2" />
                Reset
              </Button>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div
                className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-default shadow-lg"
                style={{ backgroundColor: selectedColor }}
              />
              <span className="text-lg md:text-xl font-semibold">{getColorString(selectedColor)}</span>
              <Button onClick={() => copyToClipboard(getColorString(selectedColor))} size="sm" color="primary">
                <Copy size={16} className="mr-2" />
                Copy
              </Button>
            </div>

            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">{colorFormat.toUpperCase()}</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Color format selection" onAction={(key) => setColorFormat(key as ColorFormat)}>
                <DropdownItem key="hex" className="text-default-700">HEX</DropdownItem>
                <DropdownItem key="rgb" className="text-default-700">RGB</DropdownItem>
                <DropdownItem key="hsl" className="text-default-700">HSL</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <div className="mt-4">
              {colorFormat === "hex" && <p>HEX: {selectedColor}</p>}
              {colorFormat === "rgb" &&
                (() => {
                  const rgb = hexToRgb(selectedColor)
                  return rgb ? (
                    <p>
                      RGB: {rgb.r}, {rgb.g}, {rgb.b}
                    </p>
                  ) : (
                    <p>Invalid color</p>
                  )
                })()}
              {colorFormat === "hsl" &&
                (() => {
                  const rgb = hexToRgb(selectedColor)
                  if (!rgb) return <p>Invalid color</p>
                  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
                  return (
                    <p>
                      HSL: {hsl.h}°, {hsl.s}%, {hsl.l}%
                    </p>
                  )
                })()}
            </div>
          </CardBody>
        </Card>
      )}

      {dominantColors.length > 0 && (
        <Card className="mt-6 bg-default-50 dark:bg-default-100">
          <CardBody>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Dominant Colors
            </h3>
            <div className="flex flex-wrap gap-2">
              {dominantColors.map((color, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-lg border-2 border-default cursor-pointer hover:scale-110 transition-transform flex flex-col items-center justify-center"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    copyToClipboard(color)
                    toast.success("Color copied to clipboard!")
                  }}
                  title={`Click to copy: ${color}`}
                >
                  <span className="text-xs font-bold text-white bg-black bg-opacity-50 px-1 rounded">{index + 1}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {colorHistory.length > 0 && (
        <Card className="mt-6 bg-default-50 dark:bg-default-100">
          <CardBody>
            <h3 className="text-lg font-semibold mb-2">Color History</h3>
            <div className="flex flex-wrap gap-2">
              {colorHistory.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-default cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    copyToClipboard(color)
                    toast.success("Color copied to clipboard!")
                  }}
                  title={`Click to copy: ${color}`}
                />
              ))}
            </div>
          </CardBody>
        </Card>
      )}

        <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
        <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
            <Info className="w-6 h-6 mr-2" />
            What is the Image Color Picker?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
            The Image Color Picker is a powerful tool designed for designers, developers, and color enthusiasts. It allows you to upload any image and extract precise color information from it. Whether you're looking to pick individual colors or analyze the dominant color palette of an entire image, our tool provides you with accurate and easy-to-use color data.
            </p>
            <p className="text-sm md:text-base text-default-600 mb-4">
            With features like an eyedropper tool for precise color selection, dominant color extraction, and support for multiple color formats (HEX, RGB, HSL), the Image Color Picker is an invaluable resource for anyone working with color in their projects. It's perfect for creating cohesive color schemes, matching colors from inspirational images, or simply exploring the color composition of your favorite photographs.
            </p>

            <div className="my-8">
            <NextImage
                src="/Images/ImageColorPickerPreview.png?height=400&width=600"
                alt="Screenshot of the Image Color Picker interface showing image upload area, color selection tools, and color analysis results"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
            />
            </div>

            <h2 id="how-to-use" className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <BookOpen className="w-6 h-6 mr-2" />
            How to Use the Image Color Picker?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
            <li>Upload an image by clicking the upload area or dragging and dropping a file.</li>
            <li>
                Once your image is uploaded, you can use the eyedropper tool to pick colors from specific areas of the image.
            </li>
            <li>Click the "Pick Image Color" button to activate the eyedropper tool.</li>
            <li>Select a color from the image by clicking on it.</li>
            <li>View the selected color's details in HEX, RGB, and HSL formats.</li>
            <li>Copy the color value to your clipboard by clicking the "Copy" button.</li>
            <li>Explore the automatically extracted dominant colors from your image.</li>
            <li>Access your recently picked colors from the color history section.</li>
            </ol>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2" />
            Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
            <li>Precise color picking with an eyedropper tool</li>
            <li>Automatic extraction of dominant colors from the uploaded image</li>
            <li>Support for multiple color formats: HEX, RGB, and HSL</li>
            <li>Color history tracking for easy access to previously picked colors</li>
            <li>One-click color copying to clipboard</li>
            <li>Responsive design for seamless use on desktop and mobile devices</li>
            <li>Real-time color format switching</li>
            <li>Visual representation of picked and dominant colors</li>
            <li>User-friendly interface with drag-and-drop image upload</li>
            </ul>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Info className="w-6 h-6 mr-2" />
            Applications and Use Cases
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
            <li>
                <strong>Web Design:</strong> Extract exact colors from design mockups or inspiration images for your websites.
            </li>
            <li>
                <strong>Graphic Design:</strong> Create color palettes based on images for consistent branding materials.
            </li>
            <li>
                <strong>Digital Art:</strong> Analyze color compositions in reference images for digital paintings or illustrations.
            </li>
            <li>
                <strong>Photography:</strong> Examine the color balance and dominant hues in your photographs for editing purposes.
            </li>
            <li>
                <strong>Interior Design:</strong> Pick colors from room photos or inspiration images for paint and decor selection.
            </li>
            <li>
                <strong>Fashion:</strong> Extract color palettes from fashion photographs for outfit coordination or textile design.
            </li>
            <li>
                <strong>Brand Identity:</strong> Ensure color consistency across various brand materials by extracting precise color values.
            </li>
            <li>
                <strong>UI/UX Design:</strong> Choose accessible color combinations by analyzing contrast ratios between picked colors.
            </li>
            </ul>

            <p className="text-sm md:text-base text-default-600 mt-4">
            Ready to explore the world of colors in your images? Start using our Image Color Picker now and unlock the power of precise color selection and analysis. Whether you're a professional designer working on a complex project or an enthusiast exploring color theory, our tool provides the insights and functionality you need. Try it out today and see how it can enhance your color workflow and inspire your creative projects!
            </p>
        </div>
        </Card>

    </ToolLayout>
  )
}

