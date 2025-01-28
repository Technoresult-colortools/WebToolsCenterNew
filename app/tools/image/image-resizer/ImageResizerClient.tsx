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
} from "@nextui-org/react"
import NextImage from "next/image"
import { toast } from "react-hot-toast"
import { Upload, Download, RefreshCw, ArrowLeftRight, ImageIcon, Info, Lightbulb, BookOpen, X } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"

const formatOptions = [
  { key: "png", label: "PNG" },
  { key: "jpeg", label: "JPEG" },
  { key: "webp", label: "WebP" },
]

export default function EnhancedImageResizer() {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null)
  const [resizedImage, setResizedImage] = useState<string | null>(null)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [preserveAspectRatio, setPreserveAspectRatio] = useState<boolean>(true)
  const [format, setFormat] = useState<string>("png")
  const [quality, setQuality] = useState<number>(90)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [showOriginal, ] = useState<boolean>(true)

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
    },
    [preserveAspectRatio, originalImage],
  )

  const handleHeightChange = useCallback(
    (newHeight: number) => {
      setHeight(newHeight)
      if (preserveAspectRatio && originalImage) {
        setWidth(Math.round(newHeight * (originalImage.width / originalImage.height)))
      }
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
    toast.success("Settings reset to original!")
  }

  const handleSwapDimensions = () => {
    setWidth(height)
    setHeight(width)
  }

  return (
    <ToolLayout
      title="Image Resizer"
      description="Quickly and easily resize your images with advanced options. Perfect for social media, web use, or any other platform requiring specific dimensions with optimal quality."
      toolId="678f382a26f06f912191bc8d"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold text-default-700 mb-4">Upload an Image</h2>
            {!imageSrc ? (
              <label
                className="flex flex-col items-center justify-center h-64 px-4 py-6 bg-default-100 text-primary rounded-lg shadow-lg tracking-wide uppercase border-2 border-primary border-dashed cursor-pointer hover:bg-primary-100 hover:text-primary-600 transition duration-300"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Upload size={48} />
                <span className="mt-2 text-base leading-normal">Select a file or drag and drop</span>
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
            <Card className="bg-default-50 dark:bg-default-100">
              <CardBody className="p-6">
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
              </CardBody>
            </Card>

            <Card className="bg-default-50 dark:bg-default-100">
              <CardBody className="p-6">
                <h3 className="text-xl font-bold text-default-700 mb-4">Resize Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="width" className="text-default-700 mb-2 block">
                      Width
                    </label>
                    <div className="flex items-center">
                        <Input
                            id="width"
                            type="number"
                            value={width.toString()} // Convert `number` to `string`
                            onChange={(e) => handleWidthChange(Number(e.target.value))} // Parse `string` back to `number`
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
              </CardBody>
            </Card>

            <Card className="bg-default-50 dark:bg-default-100">
              <CardBody className="p-6">
                <h3 className="text-xl font-bold text-default-700 mb-4">Output Settings</h3>
                <div className="mb-4">
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
              </CardBody>
            </Card>

            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={handleResize} color="primary">
                Resize Image
              </Button>
              <Button onClick={handleDownload} isDisabled={!resizedImage} color="primary">
                <Download className="h-5 w-5 mr-2" />
                Download Resized Image
              </Button>
              <Button onClick={handleReset} color="danger">
                <RefreshCw className="h-5 w-5 mr-2" />
                Reset
              </Button>
            </div>

            {resizedImage && (
              <Card className="bg-default-50 dark:bg-default-100">
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold text-default-700 mb-4">Resized Image Preview</h3>
                  <div className="relative h-64 bg-default-100 rounded-lg overflow-hidden">
                    <img
                      src={resizedImage || "/placeholder.svg"}
                      alt="Resized"
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <p className="text-default-700 mt-2">
                    Resized to: {width} x {height}
                  </p>
                </CardBody>
              </Card>
            )}
          </>
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />
        <Card className="bg-default-50 dark:bg-default-100">
      <CardBody className="p-6">
        <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
            <Info className="w-6 h-6 mr-2" />
            About Image Resizer
          </h2>
          <p className="text-sm md:text-base text-default-600 mb-4">
            The Image Resizer is a powerful tool designed to help you quickly and easily resize your images
            with precision and flexibility. Whether you're preparing images for web use, social media, or any other
            purpose requiring specific dimensions, this tool offers a range of features to ensure you get the exact
            results you need.
          </p>
          <p className="text-sm md:text-base text-default-600 mb-4">
            With support for multiple image formats, adjustable quality settings, and the ability to preserve aspect
            ratios, our Image Resizer caters to both casual users and professionals who demand control over their image
            outputs.
          </p>

          <div className="my-8">
            <NextImage
              src="/Images/ImageResizerPreview.png?height=400&width=600"
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
          </ul>

          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <BookOpen className="w-6 h-6 mr-2" />
            How to Use Image Resizer?
          </h2>
          <ol className="list-decimal list-inside text-default-600 space-y-2 text-sm md:text-base">
            <li>Click the "Select an image file" button or drag and drop an image onto the designated area.</li>
            <li>Once uploaded, you'll see a preview of the original image and its dimensions.</li>
            <li>Use the width and height inputs to set your desired dimensions for the resized image.</li>
            <li>Toggle the "Preserve aspect ratio" checkbox to maintain the image's proportions if needed.</li>
            <li>Click "Swap Dimensions" to quickly switch between portrait and landscape orientations.</li>
            <li>Choose your preferred output format (PNG, JPEG, or WebP) from the dropdown menu.</li>
            <li>Adjust the quality slider to balance between image quality and file size.</li>
            <li>Click "Resize Image" to generate a preview of your resized image.</li>
            <li>Review the resized image preview and its new dimensions.</li>
            <li>If satisfied, click "Download Resized Image" to save the result to your device.</li>
            <li>Use the "Reset" button at any time to revert all settings and start over.</li>
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

          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <ImageIcon className="w-6 h-6 mr-2" />
            Applications and Use Cases
          </h2>
          <ul className="list-disc list-inside text-default-600 space-y-2 text-sm md:text-base">
            <li>
              <strong>Social Media:</strong> Resize images to fit various platform requirements (e.g., Instagram posts,
              Twitter headers, Facebook cover photos).
            </li>
            <li>
              <strong>Web Development:</strong> Optimize images for faster loading times and responsive designs.
            </li>
            <li>
              <strong>E-commerce:</strong> Create consistent product image sizes for your online store.
            </li>
            <li>
              <strong>Graphic Design:</strong> Prepare images for use in layouts, presentations, or print materials.
            </li>
            <li>
              <strong>Email Marketing:</strong> Resize images to fit email templates and improve delivery rates.
            </li>
            <li>
              <strong>Blogging:</strong> Create featured images and thumbnails for your blog posts.
            </li>
            <li>
              <strong>Photography:</strong> Quickly create web-friendly versions of high-resolution photos.
            </li>
            <li>
              <strong>Digital Art:</strong> Resize artworks for online portfolios or print-on-demand services.
            </li>
            <li>
              <strong>App Development:</strong> Prepare app icons and screenshots in various required sizes.
            </li>
            <li>
              <strong>Document Creation:</strong> Resize images for inclusion in reports, whitepapers, or presentations.
            </li>
          </ul>

          <p className="text-sm md:text-base text-default-600 mt-6">
            The Image Resizer is a versatile tool that caters to a wide range of image resizing needs. Whether
            you're a professional designer, a social media manager, or simply someone who needs to resize images
            occasionally, this tool provides the flexibility and precision you need to achieve perfect results every
            time. Start resizing your images with confidence and ease!
          </p>
        </div>
      </CardBody>
    </Card>
      </div>
      
    </ToolLayout>
  )
}

