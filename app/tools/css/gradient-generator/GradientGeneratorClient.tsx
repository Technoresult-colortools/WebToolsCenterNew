"use client"

import { useState, useEffect } from "react"
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Slider,
  Switch,
  Tabs,
  Tab,
  Modal,
  ModalContent,
} from "@nextui-org/react"
import { Copy, Shuffle, Plus, Minus, Maximize2, X, Sliders, Code, Download, } from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import InfoSectionGradient from "./info-section"

type ColorStop = {
  color: string
  position: number
}

type GradientType = "linear" | "radial" | "conic"
type GradientShape = "circle" | "ellipse"
type GradientSize = "closest-side" | "closest-corner" | "farthest-side" | "farthest-corner"

export default function ModernGradientGenerator() {
  const [gradientType, setGradientType] = useState<GradientType>("linear")
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: "#4158D0", position: 0 },
    { color: "#C850C0", position: 46 },
    { color: "#FFCC70", position: 100 },
  ])
  const [angle, setAngle] = useState(43)
  const [centerX, setCenterX] = useState(50)
  const [centerY, setCenterY] = useState(50)
  const [repeating, setRepeating] = useState(false)
  const [gradientShape, setGradientShape] = useState<GradientShape>("circle")
  const [gradientSize, setGradientSize] = useState<GradientSize>("farthest-corner")
  const [showTransparency,] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("settings")
  const [cssCode, setCssCode] = useState("")

  const generateGradientCSS = () => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position)
    const stopsCSS = sortedStops.map((stop) => `${stop.color} ${stop.position}%`).join(", ")

    let gradientCSS = ""
    if (gradientType === "linear") {
      gradientCSS = `${repeating ? "repeating-" : ""}linear-gradient(${angle}deg, ${stopsCSS})`
    } else if (gradientType === "radial") {
      gradientCSS = `${repeating ? "repeating-" : ""}radial-gradient(${gradientShape} ${gradientSize} at ${centerX}% ${centerY}%, ${stopsCSS})`
    } else if (gradientType === "conic") {
      gradientCSS = `${repeating ? "repeating-" : ""}conic-gradient(from ${angle}deg at ${centerX}% ${centerY}%, ${stopsCSS})`
    }

    return gradientCSS
  }

  useEffect(() => {
    const css = generateGradientCSS()
    setCssCode(`background: ${css};`)
  }, [gradientType, angle, centerX, centerY, repeating, gradientShape, gradientSize, colorStops])

  const handleColorStopChange = (index: number, field: "color" | "position", value: string | number) => {
    const newColorStops = [...colorStops]
    newColorStops[index] = { ...newColorStops[index], [field]: value }
    setColorStops(newColorStops)
  }

  const addColorStop = () => {
    if (colorStops.length < 5) {
      const newPosition = Math.round((colorStops[colorStops.length - 1].position + colorStops[0].position) / 2)
      setColorStops([...colorStops, { color: "#ffffff", position: newPosition }])
    }
  }

  const removeColorStop = (index: number) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((_, i) => i !== index))
    }
  }

  const generateRandomGradient = () => {
    const randomColor = () =>
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`
    setColorStops([
      { color: randomColor(), position: 0 },
      { color: randomColor(), position: 50 },
      { color: randomColor(), position: 100 },
    ])
    setAngle(Math.floor(Math.random() * 360))
    setCenterX(Math.floor(Math.random() * 100))
    setCenterY(Math.floor(Math.random() * 100))
  }

  const copyCSS = () => {
    navigator.clipboard.writeText(cssCode)
    toast.success("CSS copied to clipboard!")
  }

  const downloadCSS = () => {
    const element = document.createElement("a")
    const file = new Blob([cssCode], { type: "text/css" })
    element.href = URL.createObjectURL(file)
    element.download = "gradient.css"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    URL.revokeObjectURL(element.href)
    toast.success("CSS file downloaded!")
  }

  const renderGradientPreview = () => (
    <div
      className="w-full h-full rounded-2xl shadow-2xl transition-all duration-300 ease-in-out"
      style={{
        background: cssCode.split(": ")[1]?.slice(0, -1) || "",
        ...(showTransparency
          ? {
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==")`,
          }
          : {}),
      }}
    />
  )

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
  )

  return (
    <ToolLayout
      title="CSS Gradient Generator"
      description="Create beautiful, customizable gradients using CSS with advanced options and features"
      toolId="678f382c26f06f912191bca1"
    >
      <div className="flex flex-col gap-8">
        {/* Preview Card */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="space-y-6">
              <div className="relative w-full h-80">
                {renderGradientPreview()}
                <div className="absolute bottom-4 right-4 flex gap-2">

                  <Button isIconOnly variant="flat" onPress={() => setIsFullscreen(true)}>
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Controls */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Tabs
              selectedKey={selectedTab}
              onSelectionChange={(key) => setSelectedTab(key.toString())}
              className="mb-6"
            >
              <Tab
                key="settings"
                title={
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    <span>Settings</span>
                  </div>
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Gradient Type */}
                    <div className="col-span-1 md:col-span-2">
                      <Select
                        label="Gradient Type"
                        selectedKeys={[gradientType]}
                        variant="bordered"
                        onChange={(e) => setGradientType(e.target.value as GradientType)}
                        className="w-full"
                      >
                        <SelectItem key="linear" value="linear" className="text-default-700">Linear</SelectItem>
                        <SelectItem key="radial" value="radial" className="text-default-700">Radial</SelectItem>
                        <SelectItem key="conic" value="conic" className="text-default-700">Conic</SelectItem>
                      </Select>
                    </div>

                    {/* Angle Controls */}
                    {(gradientType === "linear" || gradientType === "conic") && (
                      <div className="w-full">
                        <p className="text-sm mb-2 font-medium">Angle: {angle}°</p>
                        <Slider
                          value={angle}
                          onChange={(value) => setAngle(value as number)}
                          minValue={0}
                          maxValue={360}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    )}

                    {/* Center Controls */}
                    {(gradientType === "radial" || gradientType === "conic") && (
                      <div className="space-y-4 w-full">
                        <div>
                          <p className="text-sm mb-2 font-medium">Center X: {centerX}%</p>
                          <Slider
                            value={centerX}
                            onChange={(value) => setCenterX(value as number)}
                            minValue={0}
                            maxValue={100}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <p className="text-sm mb-2 font-medium">Center Y: {centerY}%</p>
                          <Slider
                            value={centerY}
                            onChange={(value) => setCenterY(value as number)}
                            minValue={0}
                            maxValue={100}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}

                    {/* Radial Specific Controls */}
                    {gradientType === "radial" && (
                      <div className="space-y-4 w-full">
                        <Select
                          label="Shape"
                          selectedKeys={[gradientShape]}
                          variant="bordered"
                          onChange={(e) => setGradientShape(e.target.value as GradientShape)}
                          className="w-full"
                        >
                          <SelectItem key="circle" value="circle" className="text-default-700">Circle</SelectItem>
                          <SelectItem key="ellipse" value="ellipse" className="text-default-700">Ellipse</SelectItem>
                        </Select>
                        <Select
                          label="Size"
                          selectedKeys={[gradientSize]}
                          variant="bordered"
                          onChange={(e) => setGradientSize(e.target.value as GradientSize)}
                          className="w-full"
                        >
                          <SelectItem key="closest-side" value="closest-side" className="text-default-700">Closest Side</SelectItem>
                          <SelectItem key="closest-corner" value="closest-corner" className="text-default-700">Closest Corner</SelectItem>
                          <SelectItem key="farthest-side" value="farthest-side" className="text-default-700">Farthest Side</SelectItem>
                          <SelectItem key="farthest-corner" value="farthest-corner" className="text-default-700">Farthest Corner</SelectItem>
                        </Select>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Color Stops */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Color Stops</h3>
                        {colorStops.length < 5 && (
                          <Button
                            size="sm"
                            variant="flat"
                            color="secondary"
                            onPress={addColorStop}
                            startContent={<Plus className="w-4 h-4" />}
                          >
                            Add Stop
                          </Button>
                        )}
                      </div>

                      <div className="grid gap-4">
                        {colorStops.map((stop, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Input
                              type="color"
                              variant="bordered"
                              value={stop.color}
                              onChange={(e) => handleColorStopChange(index, "color", e.target.value)}
                              className="w-20 flex-shrink-0"
                            />
                            <Input
                              type="number"
                              variant="bordered"
                              value={stop.position.toString()}
                              onChange={(e) => handleColorStopChange(index, "position", Number.parseInt(e.target.value))}
                              min={0}
                              max={100}
                              className="w-24 flex-shrink-0"
                              endContent={<span className="text-small">%</span>}
                            />
                            {colorStops.length > 2 && (
                              <Button
                                isIconOnly
                                size="sm"
                                variant="flat"
                                color="danger"
                                onPress={() => removeColorStop(index)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Controls */}
                    <div className="flex flex-col gap-4">
                      <Switch
                        isSelected={repeating}
                        onValueChange={setRepeating}
                        className="w-full"
                      >
                        <span className="text-sm">Repeating Gradient</span>
                      </Switch>

                      <Button
                        color="secondary"
                        variant="shadow"
                        onPress={generateRandomGradient}
                        startContent={<Shuffle className="w-4 h-4" />}
                        className="w-full"
                      >
                        Random Gradient
                      </Button>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab
                key="code"
                title={
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span>Generated CSS</span>
                  </div>
                }
              >
                <div className="space-y-4 py-4">
                  <Card className="bg-default-50">
                    <CardBody>
                      <pre className="whitespace-pre-wrap text-sm">{cssCode}</pre>
                    </CardBody>
                  </Card>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                    <Button
                      color="primary"
                      variant="shadow"
                      onPress={copyCSS}
                      startContent={<Copy className="w-4 h-4" />}
                    >
                      Copy CSS
                    </Button>
                    <Button
                      color="secondary"
                      variant="shadow"
                      onPress={downloadCSS}
                      startContent={<Download className="w-4 h-4" />}
                    >
                      Download CSS
                    </Button>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>

      {renderFullscreenPreview()}
      <InfoSectionGradient />
    </ToolLayout>
  )
}

