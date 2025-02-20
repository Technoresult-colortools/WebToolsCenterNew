"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Slider,
  Switch,
  Tabs,
  Tab,
  Modal,
  ModalContent,
  Select,
  SelectItem,
} from "@nextui-org/react"
import {
  Copy,
  Download,
  Plus,
  Minus,
  RotateCcw,
  Shuffle,
  Info,
  BookOpen,
  Lightbulb,
  Palette,
  Code,
  Maximize2,
  X,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"

type GradientType = "linear" | "radial" | "conic"
type ColorStop = { color: string; position: number }

export default function GradientGeneratorPage() {
  const [stops, setStops] = useState<ColorStop[]>([
    { color: "#833ab4", position: 20 },
    { color: "#fd1d1d", position: 49 },
    { color: "#fcb045", position: 78 },
  ])
  const [gradientType, setGradientType] = useState<GradientType>("linear")
  const [angle, setAngle] = useState(45)
  const [repeating, setRepeating] = useState(false)
  const [cssCode, setCssCode] = useState("")
  const [activeTab, setActiveTab] = useState<"gradient" | "css">("gradient")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [centerX, setCenterX] = useState(50)
  const [centerY, setCenterY] = useState(50)
  const [shape, setShape] = useState<"circle" | "ellipse">("circle")
  const [size, setSize] = useState<"closest-side" | "farthest-side" | "closest-corner" | "farthest-corner">(
    "farthest-corner",
  )

  const generateCssCode = useCallback(() => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position)
    const stopsString = sortedStops.map((stop) => `${stop.color} ${stop.position}%`).join(", ")

    let gradientString = ""
    if (gradientType === "linear") {
      gradientString = `${repeating ? "repeating-" : ""}linear-gradient(${angle}deg, ${stopsString})`
    } else if (gradientType === "radial") {
      gradientString = `${repeating ? "repeating-" : ""}radial-gradient(${shape} ${size} at ${centerX}% ${centerY}%, ${stopsString})`
    } else if (gradientType === "conic") {
      gradientString = `${repeating ? "repeating-" : ""}conic-gradient(from ${angle}deg at ${centerX}% ${centerY}%, ${stopsString})`
    }

    setCssCode(`background: ${gradientString};`)
  }, [stops, gradientType, angle, repeating, shape, size, centerX, centerY])

  useEffect(() => {
    generateCssCode()
  }, [generateCssCode])

  const addStop = () => {
    if (stops.length < 5) {
      const newColor = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`
      setStops([...stops, { color: newColor, position: 50 }])
    } else {
      toast.error("Maximum 5 color stops allowed")
    }
  }

  const removeStop = (index: number) => {
    if (stops.length > 2) {
      setStops(stops.filter((_, i) => i !== index))
    } else {
      toast.error("Minimum 2 color stops required")
    }
  }

  const updateStop = (index: number, color: string, position: number) => {
    const newStops = [...stops]
    newStops[index] = { color, position }
    setStops(newStops)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(cssCode)
    toast.success("CSS code copied to clipboard")
  }

  const handleDownloadImage = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 1000
    canvas.height = 1000
    const ctx = canvas.getContext("2d")
    if (ctx) {
      let gradient: CanvasGradient | null = null
      if (gradientType === "linear") {
        gradient = ctx.createLinearGradient(0, 0, 1000, 1000)
      } else if (gradientType === "radial") {
        gradient = ctx.createRadialGradient(centerX * 10, centerY * 10, 0, centerX * 10, centerY * 10, 500)
      } else {
        gradient = ctx.createConicGradient((angle * Math.PI) / 180, centerX * 10, centerY * 10)
      }
      if (gradient) {
        stops.forEach((stop) => gradient!.addColorStop(stop.position / 100, stop.color))
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 1000, 1000)

        const link = document.createElement("a")
        link.download = "gradient.png"
        link.href = canvas.toDataURL()
        link.click()
      }
    }
  }

  const resetGradient = () => {
    setStops([
      { color: "#833ab4", position: 20 },
      { color: "#fd1d1d", position: 49 },
      { color: "#fcb045", position: 78 },
    ])
    setGradientType("linear")
    setAngle(45)
    setRepeating(false)
    setCenterX(50)
    setCenterY(50)
    setShape("circle")
    setSize("farthest-corner")
  }

  const generateRandomGradient = () => {
    const randomStops = Array.from({ length: Math.floor(Math.random() * 3) + 2 }, () => ({
      color: `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`,
      position: Math.floor(Math.random() * 101),
    }))
    setStops(randomStops)
    setGradientType(["linear", "radial", "conic"][Math.floor(Math.random() * 3)] as GradientType)
    setAngle(Math.floor(Math.random() * 361))
    setRepeating(Math.random() > 0.5)
    setCenterX(Math.floor(Math.random() * 101))
    setCenterY(Math.floor(Math.random() * 101))
    setShape(Math.random() > 0.5 ? "circle" : "ellipse")
    setSize(
      ["closest-side", "farthest-side", "closest-corner", "farthest-corner"][Math.floor(Math.random() * 4)] as
        | "closest-side"
        | "farthest-side"
        | "closest-corner"
        | "farthest-corner",
    )
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

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
              <div
                className="absolute inset-0 transition-all duration-300 ease-in-out"
                style={{ background: cssCode ? cssCode.split(": ")[1]?.slice(0, -1) || "" : "" }}
              />
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );

  return (
    <ToolLayout
      title="Color Gradient Generator"
      description="Create stunning CSS gradients with advanced features and a modern interface"
      toolId="678f382e26f06f912191bcb3"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="relative">
              <div
                className="w-full h-64 rounded-lg transition-all duration-300 ease-in-out"
                style={{ background: cssCode ? cssCode.split(": ")[1]?.slice(0, -1) || "" : "" }}
              />
              <Button size="sm" variant="flat" onPress={toggleFullscreen} className="absolute bottom-2 right-2">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-default-50 dark:bg-default-100">
          <CardHeader>
            <h2 className="text-2xl font-bold text-default-900">Gradient Controls</h2>
          </CardHeader>
          <CardBody>
            <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as "gradient" | "css")}>
              <Tab
                key="gradient"
                title={
                  <div className="flex items-center">
                    <Palette className="h-4 w-4 mr-2" />
                    Gradient
                  </div>
                }
              >
                <div className="flex flex-col md:flex-row gap-8 mt-4">
                  <div className="flex-1 space-y-4">
                    <Select
                      label="Gradient Type"
                      variant="bordered"
                      selectedKeys={[gradientType]}
                      onSelectionChange={(keys) => setGradientType(Array.from(keys)[0] as GradientType)}
                    >
                      <SelectItem key="linear" value="linear">
                        Linear
                      </SelectItem>
                      <SelectItem key="radial" value="radial">
                        Radial
                      </SelectItem>
                      <SelectItem key="conic" value="conic">
                        Conic
                      </SelectItem>
                    </Select>
                    {gradientType !== "radial" && (
                      <div>
                        <p className="text-small text-default-500 mb-2">Angle: {angle}°</p>
                        <Slider
                          aria-label="Angle"
                          step={1}
                          maxValue={360}
                          minValue={0}
                          value={angle}
                          onChange={(value) => setAngle(value as number)}
                        />
                      </div>
                    )}
                    {gradientType !== "linear" && (
                      <>
                        <div>
                          <p className="text-small text-default-500 mb-2">Center X: {centerX}%</p>
                          <Slider
                            aria-label="Center X"
                            step={1}
                            maxValue={100}
                            minValue={0}
                            value={centerX}
                            onChange={(value) => setCenterX(value as number)}
                          />
                        </div>
                        <div>
                          <p className="text-small text-default-500 mb-2">Center Y: {centerY}%</p>
                          <Slider
                            aria-label="Center Y"
                            step={1}
                            maxValue={100}
                            minValue={0}
                            value={centerY}
                            onChange={(value) => setCenterY(value as number)}
                          />
                        </div>
                      </>
                    )}
                    {gradientType === "radial" && (
                      <>
                        <Select
                          label="Shape"
                          variant="bordered"
                          selectedKeys={[shape]}
                          onSelectionChange={(keys) => setShape(Array.from(keys)[0] as "circle" | "ellipse")}
                        >
                          <SelectItem key="circle" value="circle" className="text-default-700">
                            Circle
                          </SelectItem>
                          <SelectItem key="ellipse" value="ellipse" className="text-default-700">
                            Ellipse
                          </SelectItem>
                        </Select>
                        <Select
                          label="Size"
                          selectedKeys={[size]}
                          variant="bordered"
                          onSelectionChange={(keys) =>
                            setSize(
                              Array.from(keys)[0] as
                                | "closest-side"
                                | "farthest-side"
                                | "closest-corner"
                                | "farthest-corner",
                            )
                          }
                        >
                          <SelectItem key="closest-side" value="closest-side" className="text-default-700">
                            Closest Side
                          </SelectItem>
                          <SelectItem key="farthest-side" value="farthest-side" className="text-default-700">
                            Farthest Side
                          </SelectItem>
                          <SelectItem key="closest-corner" value="closest-corner" className="text-default-700">
                            Closest Corner
                          </SelectItem>
                          <SelectItem key="farthest-corner" value="farthest-corner" className="text-default-700">
                            Farthest Corner
                          </SelectItem>
                        </Select>
                      </>
                    )}
                    <div className="flex items-center space-x-2">
                      <Switch checked={repeating} onValueChange={setRepeating} />
                      <span className="text-default-700">Repeating Gradient</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-default-900 mb-4">Color Stops</h3>
                    {stops.map((stop, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-4">
                        <Input
                          type="color"
                          variant="bordered"
                          value={stop.color}
                          onChange={(e) => updateStop(index, e.target.value, stop.position)}
                          className="w-24 h-12 p-1 rounded"
                        />
                        <Input
                          type="text"
                          variant="bordered"
                          value={stop.color}
                          onChange={(e) => updateStop(index, e.target.value, stop.position)}
                          className="w-34"
                        />
                        <Slider
                          aria-label={`Color Stop ${index + 1}`}
                          step={1}
                          maxValue={100}
                          minValue={0}
                          value={stop.position}
                          onChange={(value) => updateStop(index, stop.color, value as number)}
                          className="flex-grow"
                        />
                        <Button onPress={() => removeStop(index)} size="sm" color="danger">
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button onPress={addStop} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Color Stop
                    </Button>
                  </div>
                </div>
              </Tab>
              <Tab
                key="css"
                title={
                  <div className="flex items-center">
                    <Code className="h-4 w-4 mr-2" />
                    CSS
                  </div>
                }
              >
                <div className="space-y-4 mt-4">
                  <p className="text-default-700">CSS Code</p>
                  <div className="flex items-center">
                    <Input value={cssCode} readOnly className="flex-grow" variant="bordered" />
                    <Button onPress={handleCopyCode} className="ml-2">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Tab>
            </Tabs>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
              <Button onPress={handleDownloadImage} className="flex-1" color="primary" >
                <Download className="h-4 w-4 mr-2" />
                Download PNG
              </Button>
              <Button onPress={resetGradient} color="danger" className="flex-1">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onPress={generateRandomGradient} className="flex-1" color="primary">
                <Shuffle className="h-4 w-4 mr-2" />
                Random
              </Button>
            </div>
          </CardBody>
        </Card>

          {/* Fullscreen Modal */}
    {renderFullscreenPreview()}

        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <CardBody>
            <h2 className="text-xl md:text-2xl font-semibold text-default-900 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              About Color Gradient Generator
            </h2>
            <p className="text-default-600 mb-4">
              The Color Gradient Generator is a powerful and intuitive tool designed for web developers, designers, and
              creative professionals. It allows you to create stunning CSS gradients with advanced customization
              options, providing a seamless experience for both beginners and experts.
            </p>
            <div className="my-8">
              <Image
                src="/Images/ColorGradientPreview.png?height=400&width=600"
                alt="Screenshot of the Color Gradient Generator interface showing gradient preview and controls"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            <h2 className="text-xl md:text-2xl font-semibold text-default-900 mb-4 mt-8 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              How to Use Color Gradient Generator?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
              <li>Choose a gradient type: linear, radial, or conic.</li>
              <li>Adjust the angle for linear and conic gradients using the slider.</li>
              <li>For radial and conic gradients, set the center point using the X and Y sliders.</li>
              <li>Customize radial gradients further by selecting the shape and size.</li>
              <li>Toggle the "Repeating Gradient" switch for a repeating pattern.</li>
              <li>Add or remove color stops (minimum 2, maximum 5) using the "+" and "-" buttons.</li>
              <li>Adjust each color stop's color using the color picker or by entering a hex code.</li>
              <li>Fine-tune the position of each color stop using the sliders.</li>
              <li>Preview your gradient in fullscreen mode for a better view.</li>
              <li>Copy the generated CSS code or download the gradient as a PNG image.</li>
              <li>Use the Reset button to start over with default settings.</li>
              <li>Try the Random button to generate unexpected color combinations and gradient types.</li>
            </ol>

            <h2 className="text-xl md:text-2xl font-semibold text-default-900 mb-4 mt-8 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
              <li>Support for linear, radial, and conic gradients with advanced customization.</li>
              <li>Up to 5 color stops for complex gradients.</li>
              <li>Angle adjustment for linear and conic gradients.</li>
              <li>Center point control for radial and conic gradients.</li>
              <li>Shape and size options for radial gradients.</li>
              <li>Repeating gradient option.</li>
              <li>Real-time CSS code generation.</li>
              <li>One-click CSS code copying.</li>
              <li>PNG export functionality with high resolution.</li>
              <li>Random gradient generation for inspiration.</li>
              <li>Fullscreen preview mode.</li>
              <li>Modern, responsive design for use on various devices.</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold text-default-900 mb-4 mt-8 flex items-center">
              <Palette className="w-6 h-6 mr-2" />
              Tips and Tricks
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
              <li>Experiment with different gradient types to achieve unique effects.</li>
              <li>Use the repeating gradient option to create patterns and textures.</li>
              <li>Combine multiple gradients in your CSS for more complex backgrounds.</li>
              <li>
                Try the random button for inspiration when you're stuck or want to explore new color combinations.
              </li>
              <li>Adjust color stop positions to create smooth or abrupt color transitions.</li>
              <li>Use the fullscreen preview to see how your gradient looks on larger screens.</li>
              <li>For web design, copy the CSS code directly into your stylesheet.</li>
              <li>Download PNG images for use in graphic design projects or presentations.</li>
              <li>Use conic gradients for creating pie charts or circular progress indicators.</li>
              <li>Explore color theory to create harmonious color combinations.</li>
              <li>Experiment with radial gradient shapes and sizes for unique focal points in your designs.</li>
              <li>Use the center point controls to create off-center or asymmetrical gradients.</li>
            </ul>

            <p className="text-default-600 mt-6">
              Whether you're creating eye-catching backgrounds for websites, designing user interfaces, or generating
              assets for print materials, the Color Gradient Generator provides the flexibility and power you need to
              bring your creative visions to life. Start exploring the possibilities and elevate your designs with
              stunning gradients today!
            </p>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

