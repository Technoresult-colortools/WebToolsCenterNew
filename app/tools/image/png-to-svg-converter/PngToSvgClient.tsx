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
  Slider,
} from "@nextui-org/react"
import { toast, Toaster } from "react-hot-toast"
import {
  Upload,
  Download,
  Eye,
  AlertTriangle,
  ChevronDown,
  BookOpen,
  Info,
  Sliders,
  Lightbulb,
  RefreshCw,
  Trash,
  Lock,
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import NextImage from "next/image"

const conversionMethodOptions = [
  { key: "default", name: "Default" },
  { key: "traced", name: "Traced Outlines" },
  { key: "pixel", name: "Pixel Perfect" },
]

const colorReductionOptions = [
  { key: "16", name: "Low (16 colors)" },
  { key: "32", name: "Medium (32 colors)" },
  { key: "64", name: "High (64 colors)" },
  { key: "128", name: "Very High (128 colors)" },
  { key: "256", name: "Maximum (256 colors)" },
]

export default function PNGtoSVGConverter() {
  const [file, setFile] = useState<File | null>(null)
  const [svgData, setSvgData] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [colorReduction, setColorReduction] = useState<string>("32")
  const [smoothing, setSmoothing] = useState<number>(0)
  const [conversionMethod, setConversionMethod] = useState<string>("default")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === "image/png") {
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
      setSvgData(null)
      setError(null)
      toast.success("PNG file uploaded successfully!")
    } else {
      toast.error("Please select a valid PNG file.")
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === "image/png") {
      setFile(droppedFile)
      setPreviewUrl(URL.createObjectURL(droppedFile))
      setSvgData(null)
      setError(null)
      toast.success("PNG file uploaded successfully!")
    } else {
      toast.error("Please drop a valid PNG file.")
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const convertToSVG = useCallback(async () => {
    if (!file) {
      toast.error("Please select a PNG file first.")
      return
    }

    setIsLoading(true)
    setError(null)
    const toastId = toast.loading("Converting PNG to SVG...")

    try {
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      const response = await fetch("/api/convertToSvg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: base64Data,
          options: {
            color: "color", // Always use color mode
            turdSize: smoothing,
            threshold: Number.parseInt(colorReduction),
            optCurve: true,
            optTolerance: 0.2,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Conversion failed")
      }

      const svgData = await response.text()
      setSvgData(svgData)
      toast.success("PNG converted to SVG successfully!", { id: toastId })
    } catch (error) {
      console.error("Conversion error:", error)
      setError(error instanceof Error ? error.message : "Error during conversion")
      toast.error(error instanceof Error ? error.message : "Error during conversion", { id: toastId })
    } finally {
      setIsLoading(false)
    }
  }, [file, smoothing, colorReduction])

  const downloadSVG = () => {
    if (!svgData) {
      toast.error("No SVG data available. Please convert a PNG file first.")
      return
    }

    const blob = new Blob([svgData], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "converted.svg"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("SVG file downloaded successfully!")
  }

  const previewSVG = (svgData: string) => {
    const blob = new Blob([svgData], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const win = window.open(url, "_blank")
    if (win) {
      win.document.title = "SVG Preview"
    }
  }

  const resetConverter = () => {
    setFile(null)
    setSvgData(null)
    setPreviewUrl(null)
    setColorReduction("32")
    setSmoothing(0)
    setConversionMethod("default")
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast.success("Converter reset successfully!")
  }

  return (
    <ToolLayout
      title="PNG to SVG Converter"
      description="Convert PNG files to SVG with customizable options"
      toolId="png-to-svg-converter"
    >
      <Toaster position="top-right" />

      <div className="flex flex-col gap-8">
        {/* Upload Section - Only show when no PNG is loaded */}
        {!previewUrl && (
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".png,image/png"
                className="hidden"
                id="png-upload"
              />
              <div className="flex items-center mb-2">
                <Lock className="w-4 h-4 inline-block mr-1" />
                <strong className="text-sm">Secure Conversion:</strong>
                <span className="text-sm ml-1">All processing is done securely</span>
              </div>
              <div
                className="flex flex-col items-center justify-center h-64 px-4 py-6 bg-default-100 text-primary rounded-lg shadow-lg tracking-wide uppercase border-2 border-primary border-dashed cursor-pointer hover:bg-primary-100 hover:text-primary-600 transition duration-300"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <Upload size={32} />
                <span className="mt-2 text-sm sm:text-base md:text-md leading-normal text-center block">
                  Select PNG file or drag and drop
                </span>
                <span className="mt-1 text-xs text-gray-500">Supports PNG files only</span>
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

        {/* PNG Preview and Controls */}
        {previewUrl && !error && (
          <>
            <Card className="bg-default-50 dark:bg-default-100">
              <CardBody className="p-6">
                <h3 className="text-xl font-bold mb-4">PNG Preview</h3>
                <div className="mt-2 mb-2 space-y-4">
                  {file && (
                    <div className="flex items-center space-x-2 p-2 bg-default-200 rounded">
                      <span className="text-small text-default-500">File: {file.name}</span>
                    </div>
                  )}
                </div>
                <div className="relative h-64 bg-default-200 dark:bg-default-50 rounded-lg overflow-hidden">
                  <NextImage src={previewUrl} alt="PNG Preview" fill style={{ objectFit: "contain" }} />
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
                    {/* Conversion Method Selector */}
                    <div>
                      <label className="text-sm mb-1 block">Conversion Method</label>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="bordered" endContent={<ChevronDown />} className="w-full">
                            {conversionMethodOptions.find((option) => option.key === conversionMethod)?.name ||
                              "Select method"}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Conversion method options"
                          onAction={(key) => setConversionMethod(key as string)}
                          selectedKeys={[conversionMethod]}
                        >
                          {conversionMethodOptions.map((option) => (
                            <DropdownItem key={option.key} className="text-default-700">
                              {option.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* Color Reduction Selector */}
                    <div>
                      <label className="text-sm mb-1 block">Color Reduction</label>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="bordered" endContent={<ChevronDown />} className="w-full">
                            {colorReductionOptions.find((option) => option.key === colorReduction)?.name ||
                              "Select color reduction"}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Color reduction options"
                          onAction={(key) => setColorReduction(key as string)}
                          selectedKeys={[colorReduction]}
                        >
                          {colorReductionOptions.map((option) => (
                            <DropdownItem key={option.key} className="text-default-700">
                              {option.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Smoothing Slider */}
                    <div>
                      <label className="text-sm mb-1 block">Smoothing: {smoothing}</label>
                      <Slider
                        aria-label="Smoothing"
                        step={1}
                        maxValue={10}
                        minValue={0}
                        value={smoothing}
                        onChange={(value) => setSmoothing(value as number)}
                        className="max-w-md"
                      />
                    </div>

                    {/* Convert and Reset Buttons */}
                    <div className="flex flex-col gap-2 mt-4">
                      <Button
                        color="primary"
                        onPress={convertToSVG}
                        isLoading={isLoading}
                        startContent={!isLoading && <Upload size={20} />}
                      >
                        {isLoading ? "Converting..." : "Convert to SVG"}
                      </Button>
                      <Button color="danger" variant="flat" onPress={resetConverter} startContent={<Trash size={20} />}>
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </>
        )}

        {/* SVG Preview */}
        {svgData && (
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <h3 className="text-xl font-bold mb-4">Generated SVG</h3>
              <div className="bg-white p-4 rounded-lg relative">
                <div
                  dangerouslySetInnerHTML={{ __html: svgData }}
                  className="text-sm overflow-x-auto"
                  style={{ maxWidth: "100%", maxHeight: "400px", overflow: "auto" }}
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    onPress={() => previewSVG(svgData)}
                    startContent={<Eye size={16} />}
                  >
                    Preview
                  </Button>
                  <Button size="sm" color="success" onPress={downloadSVG} startContent={<Download size={16} />}>
                    Download
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
      </div>

      {/* Info Section */}
      <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
        <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
            <Info className="w-6 h-6 mr-2" />
            What is the PNG to SVG Converter?
          </h2>
          <p className="text-sm md:text-base text-default-600 mb-4">
            The PNG to SVG Converter is a powerful and user-friendly tool designed to transform your PNG (Portable
            Network Graphics) images into scalable vector graphics (SVG) format. This conversion process allows your
            images to be resized without loss of quality, making them ideal for responsive web design, high-resolution
            displays, and various graphic design applications.
          </p>
          <p className="text-sm md:text-base text-default-600 mb-4">
            With customizable settings for color reduction, smoothing, and conversion methods, our tool gives you
            complete control over the output. Whether you're a web developer, graphic designer, or just someone looking
            to optimize their images, our PNG to SVG Converter provides a seamless solution for your vector graphic
            needs.
          </p>

          <div className="my-8">
            <NextImage
              src="/Images/PngToSvgPreview.png?height=400&width=600"
              alt="Screenshot of the PNG to SVG Converter interface showing conversion options and a sample converted image"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>

          <h2
            id="how-to-use"
            className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
          >
            <BookOpen className="w-6 h-6 mr-2" />
            How to Use the PNG to SVG Converter
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
            <li>Upload your PNG image by clicking on the designated area or dragging and dropping a file.</li>
            <li>Choose your preferred conversion method: Default, Traced Outlines, or Pixel Perfect.</li>
            <li>Adjust the color reduction setting to control the number of colors in the output SVG.</li>
            <li>Set the smoothing level to refine the edges of the converted image.</li>
            <li>Click "Convert to SVG" to process your image.</li>
            <li>Once converted, preview the SVG output directly in the browser.</li>
            <li>Download the converted SVG file or copy the SVG code for immediate use.</li>
            <li>Use the "Reset" button to start over with a new image or adjust your settings.</li>
          </ol>

          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2" />
            Key Features
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
            <li>
              <Upload className="w-4 h-4 inline-block mr-1" /> <strong>Easy Upload:</strong> Drag-and-drop or click to
              upload PNG files
            </li>
            <li>
              <Sliders className="w-4 h-4 inline-block mr-1" /> <strong>Multiple Conversion Methods:</strong> Choose
              between Default, Traced Outlines, and Pixel Perfect
            </li>
            <li>
              <Sliders className="w-4 h-4 inline-block mr-1" /> <strong>Customizable Settings:</strong> Adjust color
              reduction and smoothing for optimal results
            </li>
            <li>
              <Eye className="w-4 h-4 inline-block mr-1" /> <strong>Real-time Preview:</strong> View your converted SVG
              instantly in the browser
            </li>
            <li>
              <Download className="w-4 h-4 inline-block mr-1" /> <strong>Easy Download:</strong> Get your SVG file with
              a single click
            </li>
            <li>
              <Lock className="w-4 h-4 inline-block mr-1" /> <strong>Secure Conversion:</strong> All processing is done
              securely for maximum privacy
            </li>
            <li>
              <RefreshCw className="w-4 h-4 inline-block mr-1" /> <strong>Quick Reset:</strong> Start over easily with
              the reset functionality
            </li>
          </ul>

          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2" />
            Tips for Optimal Conversion
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
            <li>Use high-quality PNG images for the best SVG output.</li>
            <li>Experiment with different conversion methods to find the best fit for your image.</li>
            <li>Adjust color reduction for a balance between file size and image quality.</li>
            <li>Use smoothing to reduce jagged edges in your converted SVG.</li>
            <li>For logos and icons, try the 'Traced Outlines' method for clean, scalable results.</li>
            <li>
              Use 'Pixel Perfect' for detailed illustrations or when preserving exact pixel information is crucial.
            </li>
            <li>Preview your SVG in different sizes to ensure it scales well before finalizing.</li>
          </ul>

          <p className="text-sm md:text-base text-default-600 mt-6">
            Ready to transform your PNG images into scalable, high-quality SVG graphics? Our PNG to SVG Converter offers
            the perfect balance of simplicity and powerful features. Whether you're working on web design, print
            materials, or digital art, this tool provides the flexibility you need to create stunning vector graphics.
            Try it now and experience the difference in your projects!
          </p>
        </div>
      </Card>
    </ToolLayout>
  )
}

