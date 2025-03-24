"use client"

import { useState, useEffect } from "react"
import { Card, CardBody, Button, Input, Slider, Tabs, Tab, Select, SelectItem, ModalContent, Modal } from "@nextui-org/react"
import Image from "next/image"
import { Copy, Download, Info, Lightbulb, BookOpen, RefreshCw, Maximize2, X, Sliders, Palette } from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"

type TriangleDirection = "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left" | "top-left"

export default function CSSTriangleGenerator() {
  const [direction, setDirection] = useState<TriangleDirection>("top")
  const [color, setColor] = useState("#3498db")
  const [size, setSize] = useState(100)
  const [rotate, setRotate] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [borderRadius, setBorderRadius] = useState(0)
  const [generatedCSS, setGeneratedCSS] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    generateCSS()
  }, [direction, color, size, rotate, opacity, borderRadius]) // Only size is needed here

  const generateCSS = () => {
    let css = `
.triangle {
  width: 0;
  height: 0;
  border-style: solid;
`

    const halfSize = size / 2
    let borderWidths = ""
    let borderColors = ""

    switch (direction) {
      case "top":
        borderWidths = `0 ${halfSize}px ${size}px ${halfSize}px`
        borderColors = `transparent transparent ${color} transparent`
        break
      case "top-right":
        borderWidths = `0 ${size}px ${size}px 0`
        borderColors = `transparent ${color} transparent transparent`
        break
      case "right":
        borderWidths = `${halfSize}px 0 ${halfSize}px ${size}px`
        borderColors = `transparent transparent transparent ${color}`
        break
      case "bottom-right":
        borderWidths = `0 0 ${size}px ${size}px`
        borderColors = `transparent transparent ${color} transparent`
        break
      case "bottom":
        borderWidths = `${size}px ${halfSize}px 0 ${halfSize}px`
        borderColors = `${color} transparent transparent transparent`
        break
      case "bottom-left":
        borderWidths = `${size}px 0 0 ${size}px`
        borderColors = `transparent transparent transparent ${color}`
        break
      case "left":
        borderWidths = `${halfSize}px ${size}px ${halfSize}px 0`
        borderColors = `transparent ${color} transparent transparent`
        break
      case "top-left":
        borderWidths = `${size}px ${size}px 0 0`
        borderColors = `${color} transparent transparent transparent`
        break
    }

    css += `  border-width: ${borderWidths};
  border-color: ${borderColors};
  opacity: ${opacity};
  transform: rotate(${rotate}deg);
`

    if (borderRadius > 0) {
      css += `  border-radius: ${borderRadius}%;
`
    }

    css += `}`

    setGeneratedCSS(css)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCSS)
    toast.success("CSS copied to clipboard!")
  }

  const handleReset = () => {
    setDirection("top")
    setColor("#3498db")
    setSize(100)
    setRotate(0)
    setOpacity(1)
    setBorderRadius(0)
    toast.success("Settings reset to default")
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedCSS], { type: "text/css" })
    element.href = URL.createObjectURL(file)
    element.download = "triangle.css"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success("CSS file downloaded!")
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Modified handlers for Slider components
  const handleSizeChange = (value: number | number[]) => {
    setSize(Array.isArray(value) ? value[0] : value)
  }

  const handleRotateChange = (value: number | number[]) => {
    setRotate(Array.isArray(value) ? value[0] : value)
  }

  const handleOpacityChange = (value: number | number[]) => {
    setOpacity(Array.isArray(value) ? value[0] : value)
  }

  const handleBorderRadiusChange = (value: number | number[]) => {
    setBorderRadius(Array.isArray(value) ? value[0] : value)
  }

  const renderTrianglePreview = () => (
    <div
      className="triangle"
      style={{
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth:
          direction === "top"
            ? `0 ${size / 2}px ${size}px ${size / 2}px`
            : direction === "top-right"
              ? `0 ${size}px ${size}px 0`
              : direction === "right"
                ? `${size / 2}px 0 ${size / 2}px ${size}px`
                : direction === "bottom-right"
                  ? `0 0 ${size}px ${size}px`
                  : direction === "bottom"
                    ? `${size}px ${size / 2}px 0 ${size / 2}px`
                    : direction === "bottom-left"
                      ? `${size}px 0 0 ${size}px`
                      : direction === "left"
                        ? `${size / 2}px ${size}px ${size / 2}px 0`
                        : `${size}px ${size}px 0 0`,
        borderColor:
          direction === "top"
            ? `transparent transparent ${color} transparent`
            : direction === "top-right"
              ? `transparent ${color} transparent transparent`
              : direction === "right"
                ? `transparent transparent transparent ${color}`
                : direction === "bottom-right"
                  ? `transparent transparent ${color} transparent`
                  : direction === "bottom"
                    ? `${color} transparent transparent transparent`
                    : direction === "bottom-left"
                      ? `transparent transparent transparent ${color}`
                      : direction === "left"
                        ? `transparent ${color} transparent transparent`
                        : `${color} transparent transparent transparent`,
        opacity: opacity,
        transform: `rotate(${rotate}deg)`,
        borderRadius: `${borderRadius}%`,
      }}
    />
  )

  // New fullscreen modal implementation
  const renderFullscreenModal = () => (
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
            <div className="w-[90%] h-[90%] bg-default-200 rounded-lg overflow-hidden shadow-xl relative">
              <Button
                isIconOnly
                variant="flat"
                color="danger"
                onPress={onClose}
                className="absolute top-4 right-4 z-50"
              >
                <X className="w-6 h-6" />
              </Button>
              <div className="w-full h-full flex items-center justify-center">
                {renderTrianglePreview()}
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  )


  return (
    <ToolLayout
      title="CSS Triangle Generator"
      description="Create customizable CSS triangles with advanced options and features"
      toolId="678f382b26f06f912191bc9d"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="space-y-8">
              <div>
             
                <div className="relative">
                  <div
                    className="w-full bg-default-200 rounded-lg flex items-center justify-center overflow-hidden"
                    style={{ height: `${Math.max(256, size)}px` }}
                  >
                    {renderTrianglePreview()}
                  </div>
                  <Button size="sm" color="danger" variant="flat" onPress={toggleFullscreen} className="absolute bottom-2 right-2">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs aria-label="Triangle options">
                <Tab
                  key="basic"
                  title={
                    <div className="flex items-center space-x-2">
                      <Sliders className="h-4 w-4" />
                      <span>Basic Settings</span>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    <Select
                      label="Direction"
                      variant="bordered"
                      selectedKeys={[direction]}
                      onChange={(e) => setDirection(e.target.value as TriangleDirection)}
                    >
                      <SelectItem key="top" value="top" className="text-default-700">
                        Top
                      </SelectItem>
                      <SelectItem key="top-right" value="top-right" className="text-default-700">
                        Top Right
                      </SelectItem>
                      <SelectItem key="right" value="right" className="text-default-700">
                        Right
                      </SelectItem>
                      <SelectItem key="bottom-right" value="bottom-right" className="text-default-700">
                        Bottom Right
                      </SelectItem>
                      <SelectItem key="bottom" value="bottom" className="text-default-700">
                        Bottom
                      </SelectItem>
                      <SelectItem key="bottom-left" value="bottom-left" className="text-default-700">
                        Bottom Left
                      </SelectItem>
                      <SelectItem key="left" value="left" className="text-default-700">
                        Left
                      </SelectItem>
                      <SelectItem key="top-left" value="top-left" className="text-default-700">
                        Top Left
                      </SelectItem>
                    </Select>

                    <div>
                      <label className="block text-default-700 mb-2">Triangle Color</label>
                      <div className="flex space-x-2">
                        <Input
                          type="color"
                          value={color}
                          variant="bordered"
                          onChange={(e) => setColor(e.target.value)}
                          className="w-16 h-10 bg-transparent"
                        />
                        <Input
                          type="text"
                          value={color}
                          variant="bordered"
                          onChange={(e) => setColor(e.target.value)}
                          className="flex-grow"
                        />
                      </div>
                    </div>

                    <div>
                    <label className="block text-default-700 mb-2">Size: {size}px</label>
                    <Slider
                    aria-label="Size"
                    step={1}
                    maxValue={500}
                    minValue={20}
                    value={size}
                    onChange={handleSizeChange}
                    />
                </div>


                <div>
                <label className="block text-default-700 mb-2">Rotate: {rotate}°</label>
                <Slider
                aria-label="Rotate"
                step={1}
                maxValue={360}
                minValue={0}
                value={rotate}
                onChange={handleRotateChange}
                />
            </div>
                  </div>
                </Tab>
                <Tab
                  key="advanced"
                  title={
                    <div className="flex items-center space-x-2">
                      <Palette className="h-4 w-4" />
                      <span>Advanced Settings</span>
                    </div>
                  }
                >
                  <div className="space-y-4">
                  <div>
                    <label className="block text-default-700 mb-2">Opacity: {opacity.toFixed(2)}</label>
                    <Slider
                    aria-label="Opacity"
                    step={0.01}
                    maxValue={1}
                    minValue={0}
                    value={opacity}
                    onChange={handleOpacityChange}
                    />
                </div>

                <div>
                    <label className="block text-default-700 mb-2">Border Radius: {borderRadius}%</label>
                    <Slider
                    aria-label="Border Radius"
                    step={1}
                    maxValue={50}
                    minValue={0}
                    value={borderRadius}
                    onChange={handleBorderRadiusChange}
                    />
                </div>
                  </div>
                </Tab>
              </Tabs>

              {/* Generated CSS Section */}
                <Card className="bg-default-50 dark:bg-default-100 mt-6">
                <CardBody className="p-6">
                    <h2 className="text-xl md:text-2xl font-bold text-default-700 mb-4">Generated CSS</h2>
                    <div className="bg-default-200 p-4 rounded-lg overflow-x-auto max-h-60 overflow-y-auto">
                    <pre className="text-default-700 whitespace-pre-wrap break-all text-xs md:text-sm">
                        {generatedCSS}
                    </pre>
                    </div>
                </CardBody>
                </Card>


              <div className="mt-4 flex flex-col space-y-2 md:flex-row md:justify-end md:space-y-0 md:space-x-2">
                <Button color="primary" onPress={handleCopy} startContent={<Copy className="h-4 w-4" />}>
                  Copy CSS
                </Button>
                <Button color="secondary" onPress={handleDownload} startContent={<Download className="h-4 w-4" />}>
                  Download CSS
                </Button>
                <Button color="danger" onPress={handleReset} startContent={<RefreshCw className="h-4 w-4" />}>
                  Reset
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Info Section */}
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              About CSS Triangle Generator
            </h2>
            <p className="text-default-600 mb-4">
            The CSS triangle generator is a powerful tool designed for web developers and designers to create a customized CSS triangle without using images. This provides several options to adjust the appearance of the triangle, including the direction, size, color, color, opacity, rotation and border radius.
            </p>

            <div className="my-8">
              <Image
                src="/Images/InfosectionImages/CSSTrainglePreview.png?height=400&width=600"
                alt="Screenshot of the CSS Triangle Generator tool"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto" 
              />
            </div>

            <h2 className="text-xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              How to Use CSS Triangle Generator?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-default-600">
              <li>Choose a triangle direction from the dropdown menu (8 options available).</li>
              <li>Set the triangle's color using the color picker or by entering a hex value.</li>
              <li>Adjust the size using the slider.</li>
              <li>Rotate the triangle using the rotation slider.</li>
              <li>Fine-tune the opacity for transparent effects.</li>
              <li>Add border radius for rounded corners.</li>
              <li>Preview your triangle in real-time in the preview area.</li>
              <li>Use the fullscreen button to view your triangle in a larger format.</li>
              <li>Copy the generated CSS code or download it as a CSS file.</li>
              <li>Use the Reset button to return to default settings if needed.</li>
            </ol>

            <h2 className="text-xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-default-600">
              <li>Eight different triangle directions for versatile design options</li>
              <li>Custom color selection with color picker and hex input</li>
              <li>Precise size control with a slider</li>
              <li>Rotation feature for angled triangles</li>
              <li>Opacity control for transparent triangles</li>
              <li>Border radius option for creating rounded triangles</li>
              <li>Real-time preview of the triangle as you adjust settings</li>
              <li>Fullscreen preview mode for detailed inspection</li>
              <li>Tabbed interface separating basic and advanced settings</li>
              <li>Generated CSS code with one-click copy functionality</li>
              <li>Option to download the CSS as a file</li>
              <li>Reset feature to quickly return to default settings</li>
            </ul>

            <p className="text-default-600 mt-6">
            The CSS triangle strengthens generator designers and developers to create adaptable triangular elements for their web projects. By providing an intuitive interface to adjust various properties, with real -time preview and easy CSS generation, this tool bridges the difference between design concept and implementation. Whether you are targeting for simple, clean shapes or more complex decorative elements, the CSS triangle generator gives you control and flexibility that you need to bring your creative vision into life using pure CSS.
            </p>
          </div>
        </Card>
      </div>

      {/* Fullscreen Preview Modal */}
      {renderFullscreenModal()}
    </ToolLayout>
  )
}

