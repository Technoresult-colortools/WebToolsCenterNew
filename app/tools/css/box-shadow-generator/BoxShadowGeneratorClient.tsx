"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardBody,
  Button,
  Input,
  Slider,
  Tabs,
  Tab,
  Select,
  SelectItem,
  Switch,
  Modal,
  ModalContent,
} from "@nextui-org/react"
import Image from "next/image"
import { Copy, Download, Info, Lightbulb, BookOpen, RefreshCw, Plus, Trash2, ArrowUpDown, X, Maximize2 } from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"

type Shadow = {
  inset: boolean
  offsetX: number
  offsetY: number
  blur: number
  spread: number
  color: string
}

type BoxShadowUnit = "px" | "em" | "rem"

const DEFAULT_VALUES = {
    px: {
      offsetX: 5,
      offsetY: 5,
      blur: 10,
      spread: 0,
      boxWidth: 200,
      boxHeight: 200,
      borderRadius: 0,
    },
    em: {
      offsetX: 0.3,
      offsetY: 0.3,
      blur: 0.625,
      spread: 0,
      boxWidth: 12.5,
      boxHeight: 12.5,
      borderRadius: 0,
    },
    rem: {
      offsetX: 0.3,
      offsetY: 0.3,
      blur: 0.625,
      spread: 0,
      boxWidth: 12.5,
      boxHeight: 12.5,
      borderRadius: 0,
    },
  }
  
  const SLIDER_RANGES = {
    px: {
      offset: { min: -50, max: 50, step: 1 },
      blur: { min: 0, max: 100, step: 1 },
      spread: { min: -50, max: 50, step: 1 },
      box: { min: 50, max: 300, step: 1 },
      radius: { min: 0, max: 150, step: 1 },
    },
    em: {
      offset: { min: -3, max: 3, step: 0.1 },
      blur: { min: 0, max: 6, step: 0.1 },
      spread: { min: -3, max: 3, step: 0.1 },
      box: { min: 3, max: 18, step: 0.5 },
      radius: { min: 0, max: 9, step: 0.1 },
    },
    rem: {
      offset: { min: -3, max: 3, step: 0.1 },
      blur: { min: 0, max: 6, step: 0.1 },
      spread: { min: -3, max: 3, step: 0.1 },
      box: { min: 3, max: 18, step: 0.5 },
      radius: { min: 0, max: 9, step: 0.1 },
    },
  }

  export default function BoxShadowGenerator() {
    const [unit, setUnit] = useState<BoxShadowUnit>("px")
    const [shadows, setShadows] = useState<Shadow[]>([
      { 
        inset: false, 
        offsetX: DEFAULT_VALUES[unit].offsetX,
        offsetY: DEFAULT_VALUES[unit].offsetY,
        blur: DEFAULT_VALUES[unit].blur,
        spread: DEFAULT_VALUES[unit].spread,
        color: "#00000040" 
      },
    ])
    const [boxColor, setBoxColor] = useState("#ffffff")
    const [boxWidth, setBoxWidth] = useState(DEFAULT_VALUES[unit].boxWidth)
    const [boxHeight, setBoxHeight] = useState(DEFAULT_VALUES[unit].boxHeight)
    const [borderRadius, setBorderRadius] = useState(DEFAULT_VALUES[unit].borderRadius)
    const [css, setCSS] = useState("")
    const [presetName, setPresetName] = useState("")
    const [presets, setPresets] = useState<{ name: string; shadows: Shadow[] }[]>([])
    const [isFullscreen, setIsFullscreen] = useState(false)
  
    useEffect(() => {
      generateCSS()
    }, [shadows, boxColor, boxWidth, boxHeight, borderRadius, unit])

  const generateCSS = () => {
    const shadowString = shadows
      .map(
        (shadow) =>
          `${shadow.inset ? "inset " : ""}${shadow.offsetX}${unit} ${shadow.offsetY}${unit} ${shadow.blur}${unit} ${shadow.spread}${unit} ${shadow.color}`,
      )
      .join(", ")

    const generatedCSS = `
.box-shadow-example {
  width: ${boxWidth}${unit};
  height: ${boxHeight}${unit};
  background-color: ${boxColor};
  border-radius: ${borderRadius}${unit};
  box-shadow: ${shadowString};
}`
    setCSS(generatedCSS)
  }

  // Handle unit change
  const handleUnitChange = (newUnit: BoxShadowUnit) => {
    const scaleFactors = {
      'px-em': 1/16,
      'px-rem': 1/16,
      'em-px': 16,
      'rem-px': 16,
      'em-rem': 1,
      'rem-em': 1,
    }

    const getScaleFactor = (from: BoxShadowUnit, to: BoxShadowUnit) => {
      const key = `${from}-${to}` as keyof typeof scaleFactors
      return scaleFactors[key] || 1
    }

    const scaleFactor = getScaleFactor(unit, newUnit)

    // Update shadows
    const newShadows = shadows.map(shadow => ({
      ...shadow,
      offsetX: Number((shadow.offsetX * scaleFactor).toFixed(3)),
      offsetY: Number((shadow.offsetY * scaleFactor).toFixed(3)),
      blur: Number((shadow.blur * scaleFactor).toFixed(3)),
      spread: Number((shadow.spread * scaleFactor).toFixed(3)),
    }))

    // Update box dimensions
    setBoxWidth(Number((boxWidth * scaleFactor).toFixed(3)))
    setBoxHeight(Number((boxHeight * scaleFactor).toFixed(3)))
    setBorderRadius(Number((borderRadius * scaleFactor).toFixed(3)))
    setShadows(newShadows)
    setUnit(newUnit)
  }

  const handleAddShadow = () => {
    setShadows([...shadows, { inset: false, offsetX: 0, offsetY: 0, blur: 0, spread: 0, color: "#00000040" }])
  }

  const handleRemoveShadow = (index: number) => {
    setShadows(shadows.filter((_, i) => i !== index))
  }

  const handleShadowChange = (index: number, key: keyof Shadow, value: number | boolean | string) => {
    const newShadows = [...shadows]
    newShadows[index] = { ...newShadows[index], [key]: value }
    setShadows(newShadows)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(css)
    toast.success("CSS copied to clipboard!")
  }

  const handleDownload = () => {
    const blob = new Blob([css], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "box-shadow.css"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success("CSS file downloaded!")
  }

  const handleReset = () => {
    setShadows([{
      inset: false,
      offsetX: DEFAULT_VALUES[unit].offsetX,
      offsetY: DEFAULT_VALUES[unit].offsetY,
      blur: DEFAULT_VALUES[unit].blur,
      spread: DEFAULT_VALUES[unit].spread,
      color: "#00000040"
    }])
    setBoxColor("#ffffff")
    setBoxWidth(DEFAULT_VALUES[unit].boxWidth)
    setBoxHeight(DEFAULT_VALUES[unit].boxHeight)
    setBorderRadius(DEFAULT_VALUES[unit].borderRadius)
    toast.success("Settings reset to default")
  }


  const handleSavePreset = () => {
    if (presetName) {
      setPresets([...presets, { name: presetName, shadows }])
      setPresetName("")
      toast.success("Preset saved!")
    } else {
      toast.error("Please enter a preset name")
    }
  }

  const handleLoadPreset = (preset: { name: string; shadows: Shadow[] }) => {
    setShadows(preset.shadows)
    toast.success(`Preset "${preset.name}" loaded!`)
  }

  const handleMoveShadow = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index > 0) || (direction === "down" && index < shadows.length - 1)) {
      const newShadows = [...shadows]
      const temp = newShadows[index]
      newShadows[index] = newShadows[index + (direction === "up" ? -1 : 1)]
      newShadows[index + (direction === "up" ? -1 : 1)] = temp
      setShadows(newShadows)
    }
  }

  const renderPreview = () => (
    <div
      className="box-shadow-example"
      style={{
        width: `${boxWidth}${unit}`,
        height: `${boxHeight}${unit}`,
        backgroundColor: boxColor,
        borderRadius: `${borderRadius}${unit}`,
        boxShadow: shadows
          .map(
            (shadow) =>
              `${shadow.inset ? "inset " : ""}${shadow.offsetX}${unit} ${shadow.offsetY}${unit} ${shadow.blur}${unit} ${shadow.spread}${unit} ${shadow.color}`,
          )
          .join(", "),
      }}
    ></div>
  )

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
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="w-[90%] h-[90%] bg-gray-200 dark:bg-gray-200 rounded-lg overflow-hidden shadow-xl relative flex items-center justify-center">
              <Button
                isIconOnly
                variant="flat"
                color="danger"
                onPress={onClose}
                className="absolute top-4 right-4 z-50"
              >
                <X className="w-6 h-6" />
              </Button>
              <div className="relative flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
                {renderPreview()}
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );


  return (
    <ToolLayout
      title="CSS Box Shadow Generator"
      description="Create and customize complex CSS box shadows with precision and ease"
      toolId="678f382c26f06f912191bc9e"
    >
      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
            
                <div
                  className="bg-default-200 dark:bg-default-700 p-4 rounded-lg flex items-center justify-center relative"
                  style={{ minHeight: "300px" }}
                >
                  {renderPreview()}
                  <Button size="sm" color="primary" variant="flat" onPress={toggleFullscreen} className="absolute bottom-2 right-2">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
    
                <Tabs aria-label="Box Shadow options">
                  <Tab key="shadows" title="Shadows">
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="unit" className="text-default-700 mr-4">
                          Unit:
                        </label>
                        <Select
                            id="unit"
                            selectedKeys={[unit]}
                            variant="bordered"
                            onChange={(e) => handleUnitChange(e.target.value as BoxShadowUnit)}
                            className="max-w-xs"
                            >
                          <SelectItem key="px" value="px" className="text-default-700">
                            px
                          </SelectItem>
                          <SelectItem key="em" value="em" className="text-default-700">
                            em
                          </SelectItem>
                          <SelectItem key="rem" value="rem" className="text-default-700">
                            rem
                          </SelectItem>
                        </Select>
                      </div>
                      {shadows.map((shadow, index) => (
                        <Card key={index} className="bg-default-100 p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-default-700 font-semibold">Shadow {index + 1}</h3>
                            <div className="flex space-x-2">
                              <Button
                                isIconOnly
                                variant="light"
                                onPress={() => handleMoveShadow(index, "up")}
                                disabled={index === 0}
                              >
                                <ArrowUpDown className="h-4 w-4 rotate-180" />
                              </Button>
                              <Button
                                isIconOnly
                                variant="light"
                                onPress={() => handleMoveShadow(index, "down")}
                                disabled={index === shadows.length - 1}
                              >
                                <ArrowUpDown className="h-4 w-4" />
                              </Button>
                              <Button
                                isIconOnly
                                color="danger"
                                variant="light"
                                onPress={() => handleRemoveShadow(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              isSelected={shadow.inset}
                              onValueChange={(checked) => handleShadowChange(index, "inset", checked)}
                            />
                            <label className="text-default-700">Inset</label>
                          </div>
                          <div>
                            <label className="text-default-700">
                              Offset X: {shadow.offsetX}
                              {unit}
                            </label>
                            <Slider
                            aria-label={`Offset X for shadow ${index + 1}`}
                            value={shadow.offsetX}
                            onChange={(value) => handleShadowChange(index, "offsetX", Number(value))}
                            step={SLIDER_RANGES[unit].offset.step}
                            maxValue={SLIDER_RANGES[unit].offset.max}
                            minValue={SLIDER_RANGES[unit].offset.min}
                            className="max-w-md"
                            />
                          </div>
                          <div>
                            <label className="text-default-700">
                              Offset Y: {shadow.offsetY}
                              {unit}
                            </label>
                            <Slider
                            aria-label={`Offset Y for shadow ${index + 1}`}
                            value={shadow.offsetX}
                            onChange={(value) => handleShadowChange(index, "offsetY", Number(value))}
                            step={SLIDER_RANGES[unit].offset.step}
                            maxValue={SLIDER_RANGES[unit].offset.max}
                            minValue={SLIDER_RANGES[unit].offset.min}
                            className="max-w-md"
                            />
                          </div>
                          <div>
                            <label className="text-default-700">
                              Blur: {shadow.blur}
                              {unit}
                            </label>
                            <Slider
                              aria-label={`Blur for shadow ${index + 1}`}
                              value={shadow.blur}
                              onChange={(value) => handleShadowChange(index, "blur", Number(value))}
                              step={SLIDER_RANGES[unit].offset.step}
                              maxValue={SLIDER_RANGES[unit].offset.max}
                              minValue={SLIDER_RANGES[unit].offset.min}
                              className="max-w-md"
                            />
                          </div>
                          <div>
                            <label className="text-default-700">
                              Spread: {shadow.spread}
                              {unit}
                            </label>
                            <Slider
                              aria-label={`Spread for shadow ${index + 1}`}
                              value={shadow.spread}
                              onChange={(value) => handleShadowChange(index, "spread", Number(value))}
                              step={SLIDER_RANGES[unit].offset.step}
                              maxValue={SLIDER_RANGES[unit].offset.max}
                              minValue={SLIDER_RANGES[unit].offset.min}
                              className="max-w-md"
                            />
                          </div>
                          <div>
                            <label className="text-default-700">Color</label>
                            <div className="flex space-x-2">
                              <Input
                                type="color"
                                variant="bordered"
                                value={shadow.color}
                                onChange={(e) => handleShadowChange(index, "color", e.target.value)}
                                className="w-16 h-12  bg-transparent"
                              />
                              <Input
                                type="text"
                                value={shadow.color}
                                variant="bordered"
                                onChange={(e) => handleShadowChange(index, "color", e.target.value)}
                                className="flex-grow"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                      <Button onPress={handleAddShadow} startContent={<Plus className="h-4 w-4" />}>
                        Add Shadow
                      </Button>
                    </div>
                  </Tab>
                  <Tab key="box" title="Box">
                    <div className="space-y-4 mt-4">
                        <div>
                        <label className="text-default-700">Box Color</label>
                        <div className="flex space-x-2">
                            <Input
                            type="color"
                            variant="bordered"
                            value={boxColor}
                            onChange={(e) => setBoxColor(e.target.value)}
                            className="w-16 h-12 mt-1 bg-transparent"
                            />
                            <Input
                            type="text"
                            value={boxColor}
                            variant="bordered"
                            onChange={(e) => setBoxColor(e.target.value)}
                            className="flex-grow mt-1"
                            />
                        </div>
                        </div>
                        <div>
                        <label className="text-default-700">
                            Width: {boxWidth}
                            {unit}
                        </label>
                        <Slider
                            aria-label="Box Width"
                            value={boxWidth}
                            onChange={(value) => setBoxWidth(Number(value))}
                            step={SLIDER_RANGES[unit].box.step}
                            maxValue={SLIDER_RANGES[unit].box.max}
                            minValue={SLIDER_RANGES[unit].box.min}
                            className="max-w-md"
                        />
                        </div>
                        <div>
                        <label className="text-default-700">
                            Height: {boxHeight}
                            {unit}
                        </label>
                        <Slider
                            aria-label="Box Height"
                            value={boxHeight}
                            onChange={(value) => setBoxHeight(Number(value))}
                            step={SLIDER_RANGES[unit].box.step}
                            maxValue={SLIDER_RANGES[unit].box.max}
                            minValue={SLIDER_RANGES[unit].box.min}
                            className="max-w-md"
                        />
                        </div>
                        <div>
                        <label className="text-default-700">
                            Border Radius: {borderRadius}
                            {unit}
                        </label>
                        <Slider
                            aria-label="Border Radius"
                            value={borderRadius}
                            onChange={(value) => setBorderRadius(Number(value))}
                            step={SLIDER_RANGES[unit].radius.step}
                            maxValue={SLIDER_RANGES[unit].radius.max}
                            minValue={SLIDER_RANGES[unit].radius.min}
                            className="max-w-md"
                        />
                        </div>
                    </div>
                    </Tab>
                  <Tab key="presets" title="Presets">
                    <div className="space-y-4 mt-4">
                      <div>
                        <label htmlFor="presetName" className="text-default-700">
                          Preset Name
                        </label>
                        <div className="flex space-x-2">
                          <Input
                            id="presetName"
                            variant="bordered"
                            type="text"
                            value={presetName}
                            onChange={(e) => setPresetName(e.target.value)}
                            className="flex-grow"
                            placeholder="Enter preset name"
                          />
                          <Button color="primary" onPress={handleSavePreset}>Save Preset</Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-default-700">Saved Presets</label>
                        {presets.map((preset, index) => (
                          <Button
                            key={index}
                            onPress={() => handleLoadPreset(preset)}
                            className="w-full justify-start"
                            color="primary"
                          >
                            {preset.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>

        
              {/* Generated CSS Section */}
                <Card className="bg-default-50 dark:bg-default-100 mt-6">
                <CardBody className="p-6">
                    <h2 className="text-xl md:text-2xl font-bold text-default-700 mb-4">Generated CSS</h2>
                    <div className="bg-default-200 p-4 rounded-lg overflow-x-auto max-h-60 overflow-y-auto">
                    <pre className="text-default-700 whitespace-pre-wrap break-all text-xs md:text-sm">
                        {css}
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

       
          </CardBody>
        </Card>

        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <CardBody>
            <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              What is CSS Box Shadow Generator?
            </h2>
            <p className="text-default-600 mb-4">
            The CSS box shadow generator is a powerful and intuitive tool designed for web developers and designers to appeal to create a complex and visually CSS box shade. This allows you to easily customize multiple shadow layers, adjust box properties and generate an exact CSS code for your projects.
            </p>

            <div className="my-8">
              <Image
                src="/Images/InfosectionImages/CSSBoxShadowPreview.png?height=400&width=600"
                alt="Screenshot of the Enhanced Box Shadow Generator interface showing preview and customization options"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            <h2 className="text-xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              How to Use CSS Box Shadow Generator?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-default-600">
              <li>Use the "Shadows" tab to add, remove, and customize multiple box shadow layers.</li>
              <li>Adjust offset, blur, spread, and color for each shadow layer.</li>
              <li>Toggle the "Inset" switch to create inner shadows.</li>
              <li>Reorder shadow layers using the up and down arrows.</li>
              <li>Switch between different units (px, em, rem) for precise control.</li>
              <li>Use the "Box" tab to customize the preview box's color, size, and border radius.</li>
              <li>
                Create and load presets in the "Presets" tab for quick access to your favorite shadow combinations.
              </li>
              <li>Preview your box shadow in real-time, with options for fullscreen view.</li>
              <li>Copy the generated CSS or download it as a file for use in your projects.</li>
              <li>Use the Reset button to start over with default settings.</li>
            </ol>

            <h2 className="text-xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-default-600">
              <li>Multiple shadow layers with individual controls</li>
              <li>Inset shadow option for inner shadows</li>
              <li>Customizable offset, blur, spread, and color for each shadow</li>
              <li>Support for multiple units: px, em, and rem</li>
              <li>Shadow layer reordering</li>
              <li>Adjustable preview box color, size, and border radius</li>
              <li>Preset saving and loading functionality</li>
              <li>Real-time preview with fullscreen mode</li>
              <li>Generated CSS code with syntax highlighting</li>
              <li>Copy to clipboard and download as file options</li>
              <li>Reset option to quickly return to default settings</li>
              <li>Responsive design for use on various devices</li>
            </ul>

            <p className="text-default-600 mt-6">
              The CSS Box Shadow Generator empowers you to create sophisticated, layered shadow effects that can
              dramatically improve the visual appeal of your web projects. Whether you're aiming for subtle depth or
              bold, eye-catching designs, this tool provides the flexibility and precision you need. Start experimenting
              with box shadows today and elevate your web designs to new heights of professionalism and creativity!
            </p>
            </CardBody>
        </Card>
      </div>
      {renderFullscreenPreview()}
    </ToolLayout>
  )
}

