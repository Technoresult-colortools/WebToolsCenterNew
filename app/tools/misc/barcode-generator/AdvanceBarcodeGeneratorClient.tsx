"use client"

import React, { useState, useEffect } from "react"
import {
  Button,
  Input,
  Switch,
  Select,
  SelectItem,
  Slider,
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Accordion,
  AccordionItem,
} from "@nextui-org/react"
import { toast } from "react-hot-toast"
import { Download, Copy, RefreshCw, Info, Lightbulb, BookOpen, Settings } from "lucide-react"
import JsBarcode from "jsbarcode"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"

const barcodeTypes = ["CODE128", "EAN13", "EAN8", "UPC", "CODE39", "ITF14", "MSI", "pharmacode", "codabar"]

export default function BarCodeGenerator() {
  const [barcodeData, setBarcodeData] = useState("1234567890")
  const [barcodeType, setBarcodeType] = useState("CODE128")
  const [width, setWidth] = useState(2)
  const [height, setHeight] = useState(100)
  const [fontSize, setFontSize] = useState(20)
  const [background, setBackground] = useState("#ffffff")
  const [lineColor, setLineColor] = useState("#000000")
  const [showText, setShowText] = useState(true)
  const [svgData, setSvgData] = useState("")

  useEffect(() => {
    generateBarcode()
  }, [barcodeData, barcodeType, width, height, fontSize, background, lineColor, showText])

  const generateBarcode = () => {
    try {
      const canvas = document.createElement("canvas")
      JsBarcode(canvas, barcodeData, {
        format: barcodeType,
        width,
        height,
        fontSize,
        background,
        lineColor,
        displayValue: showText,
      })
      setSvgData(canvas.toDataURL("image/png"))
    } catch {
      toast.error("Error generating barcode. Please check your input.")
    }
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = svgData
    link.download = `barcode-${barcodeData}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("Barcode downloaded successfully!")
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(svgData).then(
      () => {
        toast.success("Barcode SVG copied to clipboard!")
      },
      () => {
        toast.error("Failed to copy barcode SVG.")
      },
    )
  }

  return (
    <ToolLayout
      title="Barcode Generator"
      description="Create Customized Barcodes for various purposes"
      toolId="678f383026f06f912191bcce"
    >
      <div className="flex flex-col gap-4 md:gap-8">
        {/* Settings Card - Moved to Top */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            {/* Controls section - responsive layout */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-4">
              {/* Barcode Data Input */}
              <div className="w-full md:w-2/5">
                <Input 
                  label="Barcode Data" 
                  value={barcodeData} 
                  onChange={(e) => setBarcodeData(e.target.value)} 
                  variant="bordered" 
                  classNames={{
                    inputWrapper: [
                      "border-2", 
                      "border-default-300", 
                      "dark:border-default-600", 
                      "bg-default-100", 
                      "dark:bg-default-200/50", 
                      "hover:border-primary-500", 
                      "dark:hover:border-primary-400",
                      "overflow-y-auto"
                    ],
                    input: "overflow-y-auto"
                  }} 
                />
              </div>
  
              {/* Barcode Type Selector */}
              <div className="w-full md:w-1/4">
                <Select
                  label="Barcode Type"
                  selectedKeys={[barcodeType]}
                  onChange={(e) => setBarcodeType(e.target.value)}
                  variant="bordered"
                  classNames={{
                    trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                  }}
                >
                  {barcodeTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-default-700">
                      {type}
                    </SelectItem>
                  ))}
                </Select>
              </div>
  
              {/* Show Text Toggle */}
              <div className="self-end md:self-center w-full md:w-auto flex justify-between md:justify-start items-center">
                <span className="mr-2">Show Text</span>
                <Switch checked={showText} onChange={(e) => setShowText(e.target.checked)} />
              </div>
  
              {/* Generate Button */}
              <div className="self-end md:self-center w-full md:w-auto">
                <Button color="primary" onClick={generateBarcode} className="w-full md:w-auto">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>

            {/* Preview Card */}
        <Card className="bg-default-50 dark:bg-default-100 overflow-hidden">
          <CardHeader className="px-6 py-4">
            <h2 className="text-xl font-bold">Barcode Preview</h2>
          </CardHeader>
          <CardBody className="flex flex-col justify-center items-center p-4 md:p-8">
            <div className="bg-white p-4 rounded-md mb-4 w-full max-w-md overflow-hidden">
              {svgData ? (
                <img 
                  src={svgData} 
                  alt="Generated Barcode" 
                  className="mx-auto max-w-full h-auto"
                />
              ) : (
                <div className="flex justify-center items-center h-24 text-default-400">
                  Generate a barcode to preview
                </div>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-2 w-full">
              <Button 
                color="primary" 
                size="sm" 
                onClick={handleDownload} 
                className="flex-1 min-w-0 max-w-xs"
                isDisabled={!svgData}
              >
                <Download className="w-4 h-4 mr-1" />
                <span className="truncate">Download</span>
              </Button>
              <Button 
                color="primary" 
                size="sm" 
                onClick={handleCopyToClipboard} 
                className="flex-1 min-w-0 max-w-xs"
                isDisabled={!svgData}
              >
                <Copy className="w-4 h-4 mr-1" />
                <span className="truncate">Copy SVG</span>
              </Button>
            </div>
          </CardBody>
        </Card>
            
            {/* Appearance Controls - Sliders side by side */}
            <div className="mt-6">
              <p className="text-medium font-medium mb-2">Appearance</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Width and Height Sliders */}
                <div className="space-y-4">
                  <div>
                    <p className="text-small text-default-500 mb-2">Width: {width}</p>
                    <Slider
                      aria-label="Width"
                      size="sm"
                      step={0.1}
                      maxValue={5}
                      minValue={1}
                      value={width}
                      onChange={(value) => setWidth(value as number)}
                      className="max-w-full"
                    />
                  </div>
                  <div>
                    <p className="text-small text-default-500 mb-2">Height: {height}</p>
                    <Slider
                      aria-label="Height"
                      size="sm"
                      step={1}
                      maxValue={200}
                      minValue={50}
                      value={height}
                      onChange={(value) => setHeight(value as number)}
                      className="max-w-full"
                    />
                  </div>
                  <div>
                    <p className="text-small text-default-500 mb-2">Font Size: {fontSize}</p>
                    <Slider
                      aria-label="Font Size"
                      size="sm"
                      step={1}
                      maxValue={30}
                      minValue={10}
                      value={fontSize}
                      onChange={(value) => setFontSize(value as number)}
                      className="max-w-full"
                    />
                  </div>
                </div>
                
                {/* Color Pickers */}
                <div className="space-y-4">
                  <div>
                    <p className="text-small text-default-500 mb-2">Background Color</p>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="color"
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                        variant="bordered"
                        className="w-16 h-12 p-1"
                      />
                      <Input
                        type="text"
                        value={background}
                        variant="bordered"
                        onChange={(e) => setBackground(e.target.value)}
                        className="flex-grow"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-small text-default-500 mb-2">Line Color</p>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="color"
                        value={lineColor}
                        variant="bordered"
                        onChange={(e) => setLineColor(e.target.value)}
                        className="w-16 h-12 p-1"
                      />
                      <Input
                        type="text"
                        value={lineColor}
                        variant="bordered"
                        onChange={(e) => setLineColor(e.target.value)}
                        className="flex-grow"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        {/* Info Section */}
        <Card className="bg-default-50 dark:bg-default-100">
        <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About Barcode Generator
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">
            Our Barcode generator is a powerful tool designed to create adaptable barcodes for various purposes. Whether you need a barcode for inventory management, product labeling, or any other application, this generator offers a wide range of options to make barcodes that meet your specific requirements.
            </p>

            <div className="my-8">
                <Image
                src="/Images/InfosectionImages/BarcodeGeneratorPreview.webp?height=400&width=600"
                alt="Screenshot of the Bar Code Generator interface showing barcode options and generated barcode"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
                />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Key Features
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Multiple Barcode Types: THis tool Supports for various barcode formats including CODE128, EAN13, UPC, CODE39, and more.</li>
                <li>Customizable Appearance: Adjust width, height, colors, and font size based on your requirement.</li>
                <li>Flexible Sizing: Create barcodes of different sizes to fit various applications.</li>
                <li>Background Color: Customize the background color to match your design requirements.</li>
                <li>Text Display Options: Option to display the barcode text or hide it.</li>
                <li>Easy Download: Download your generated barcode as a PNG image.</li>
                <li>Copy SVG: Copy the barcode as SVG for easy integration into digital designs.</li>
                <li>Instant Regeneration: Quickly regenerate barcodes with new settings.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                How to Use Barcode Generator?
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Enter the data you want to encode in the "Barcode Data" field.</li>
                <li>Select the appropriate barcode type from the dropdown menu.</li>
                <li>Adjust the width, height, and font size using the sliders.</li>
                <li>Choose background and line colors using the color pickers.</li>
                <li>Toggle the "Show Text" switch to display or hide the barcode text.</li>
                <li>The barcode will automatically generate based on your settings.</li>
                <li>Use the "Download" button to save the barcode as a PNG image.</li>
                <li>Use the "Copy SVG" button to copy the barcode as an SVG for digital use.</li>
                <li>Click "Regenerate" if you want to refresh the barcode with the same settings.</li>
            </ol>

            </div>
        </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

