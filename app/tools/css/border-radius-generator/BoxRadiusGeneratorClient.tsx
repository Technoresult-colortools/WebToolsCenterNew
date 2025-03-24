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
import { Copy, Download, Info, Lightbulb, BookOpen, RefreshCw, Maximize2, X } from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"

type BorderRadius = {
  topLeft: number
  topRight: number
  bottomRight: number
  bottomLeft: number
}

type BorderRadiusUnit = "px" | "%" | "em" | "rem"

const borderStyles = ["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset"]

export default function EnhancedBorderRadiusGenerator() {
  const [borderRadius, setBorderRadius] = useState<BorderRadius>({
    topLeft: 0,
    topRight: 0,
    bottomRight: 0,
    bottomLeft: 0,
  })
  const [width, setWidth] = useState(200)
  const [height, setHeight] = useState(200)
  const [backgroundColor, setBackgroundColor] = useState("#3498db")
  const [css, setCSS] = useState("")
  const [unit, setUnit] = useState<BorderRadiusUnit>("px")
  const [linked, setLinked] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [borderWidth, setBorderWidth] = useState(0)
  const [borderColor, setBorderColor] = useState("#000000")
  const [borderStyle, setBorderStyle] = useState("solid")

  useEffect(() => {
    generateCSS()
  }, [borderRadius, unit, linked]) //Corrected dependencies

  const generateCSS = () => {
    const { topLeft, topRight, bottomRight, bottomLeft } = borderRadius
    const borderRadiusCSS = `${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit}`
    const generatedCSS = `
.border-radius-example {
  width: ${width}px;
  height: ${height}px;
  background-color: ${backgroundColor};
  border-radius: ${borderRadiusCSS};
  border-width: ${borderWidth}px;
  border-color: ${borderColor};
  border-style: ${borderStyle};
}`
    setCSS(generatedCSS)
  }

  const handleRadiusChange = (corner: keyof BorderRadius, value: number) => {
    if (linked) {
      setBorderRadius({
        topLeft: value,
        topRight: value,
        bottomRight: value,
        bottomLeft: value,
      })
    } else {
      setBorderRadius((prev) => ({ ...prev, [corner]: value }))
    }
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
    link.download = "border-radius.css"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success("CSS file downloaded!")
  }

  const handleReset = () => {
    setBorderRadius({ topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 })
    setWidth(200)
    setHeight(200)
    setBackgroundColor("#3498db")
    setUnit("px")
    setLinked(false)
    setBorderWidth(0)
    setBorderColor("#000000")
    setBorderStyle("solid")
    toast.success("Settings reset to default")
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const renderPreview = () => (
    <div
      className="border-radius-example"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: backgroundColor,
        borderRadius: `${borderRadius.topLeft}${unit} ${borderRadius.topRight}${unit} ${borderRadius.bottomRight}${unit} ${borderRadius.bottomLeft}${unit}`,
        borderWidth: `${borderWidth}px`,
        borderColor: borderColor,
        borderStyle: borderStyle,
      }}
    ></div>
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
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="w-3/4 h-3/4 bg-gray-200 dark:bg-gray-200 rounded-lg overflow-hidden shadow-xl flex items-center justify-center relative">
              <Button
                isIconOnly
                color="danger"
                variant="light"
                onPress={onClose}
                className="absolute top-4 right-4 z-50"
              >
                <X className="w-6 h-6" />
              </Button>
              <div className="w-full h-full flex items-center justify-center">
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
      title="CSS Border Radius Generator"
      description="Create visually appealing and modern UI elements by customizing the corner radii and border properties of boxes"
      toolId="678f382c26f06f912191bc9f"
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
                  <Button size="sm" variant="flat" color="primary" onPress={toggleFullscreen} className="absolute bottom-2 right-2">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
         
                <Tabs aria-label="Border Radius options">
                  <Tab key="corners" title="Corners">
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="unit" className="text-default-700 mr-4">
                          Unit:
                        </label>
                        <Select
                          id="unit"
                          selectedKeys={[unit]}
                          onChange={(e) => setUnit(e.target.value as BorderRadiusUnit)}
                          className="max-w-xs"
                          variant="bordered"
                        >
                          <SelectItem key="px" value="px" className="text-default-700">
                            px
                          </SelectItem>
                          <SelectItem key="%" value="%" className="text-default-700">
                            %
                          </SelectItem>
                          <SelectItem key="em" value="em" className="text-default-700">
                            em
                          </SelectItem>
                          <SelectItem key="rem" value="rem" className="text-default-700">
                            rem
                          </SelectItem>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="linked" className="text-default-700">
                          Link Corners
                        </label>
                        <Switch id="linked" isSelected={linked} onValueChange={setLinked} />
                      </div>
                      {(Object.keys(borderRadius) as Array<keyof BorderRadius>).map((corner) => (
                        <div key={corner}>
                          <label className="text-default-700 capitalize">
                            {corner.replace(/([A-Z])/g, " $1").trim()}: {borderRadius[corner]}
                            {unit}
                          </label>
                          <Slider
                            aria-label={`${corner} border radius`}
                            value={borderRadius[corner]}
                            onChange={(value) => handleRadiusChange(corner, Number(value))}
                            step={1}
                            maxValue={unit === "px" ? 100 : unit === "%" ? 50 : 10}
                            minValue={0}
                            className="max-w-md"
                          />
                        </div>
                      ))}
                    </div>
                  </Tab>
                  <Tab key="box" title="Box">
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-default-700">Width: {width}px</label>
                        <Slider
                          aria-label="Box Width"
                          value={width}
                          onChange={(value) => setWidth(Number(value))}
                          step={1}
                          maxValue={400}
                          minValue={50}
                          className="max-w-md"
                        />
                      </div>
                      <div>
                        <label className="text-default-700">Height: {height}px</label>
                        <Slider
                          aria-label="Box Height"
                          value={height}
                          onChange={(value) => setHeight(Number(value))}
                          step={1}
                          maxValue={400}
                          minValue={50}
                          className="max-w-md"
                        />
                      </div>
                      <div>
                        <label className="text-default-700">Background Color</label>
                        <div className="flex space-x-2">
                          <Input
                            type="color"
                            variant="bordered"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="w-14 h-12 mt-1 bg-transparent"
                          />
                          <Input
                            type="text"
                            value={backgroundColor}
                            variant="bordered"
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="flex-grow mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab key="border" title="Border">
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-default-700">Border Width: {borderWidth}px</label>
                        <Slider
                          aria-label="Border Width"
                          value={borderWidth}
                          onChange={(value) => setBorderWidth(Number(value))}
                          step={1}
                          maxValue={20}
                          minValue={0}
                          className="max-w-md"
                        />
                      </div>
                      <div>
                        <label className="text-default-700">Border Color</label>
                        <div className="flex space-x-2">
                          <Input
                            type="color"
                            variant="bordered"
                            value={borderColor}
                            onChange={(e) => setBorderColor(e.target.value)}
                            className="w-14 h-12 mt-1 bg-transparent"
                          />
                          <Input
                            type="text"
                            variant="bordered"
                            value={borderColor}
                            onChange={(e) => setBorderColor(e.target.value)}
                            className="flex-grow mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-default-700">Border Style</label>
                        <Select
                          selectedKeys={[borderStyle]}
                          variant="bordered"
                          onChange={(e) => setBorderStyle(e.target.value)}
                          className="max-w-xs mt-2"
                        >
                          {borderStyles.map((style) => (
                            <SelectItem key={style} value={style} className="text-default-700">
                              {style.charAt(0).toUpperCase() + style.slice(1)}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>

      
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
              What is the Enhanced Border Radius Generator?
            </h2>
            <p className="text-default-600 mb-4">
            The border radius generator is a powerful and intuitive tool designed for web developers and designers that are visually attractive and modern UI elements. This allows you to easily customize the ready and border properties of the corner of the box, providing a wide range of options to suit your design needs.
            </p>

            <div className="my-8">
              <Image
                src="/Images/InfosectionImages/CSSBorderRadiusPreview.png?height=400&width=600"
                alt="Screenshot of the Enhanced Border Radius Generator interface showing preview and customization options"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            <h2 className="text-xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              How to Use the Enhanced Border Radius Generator?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-default-600">
              <li>Use the "Corners" tab to adjust individual corner radii or link them for simultaneous changes.</li>
              <li>Switch between different units (px, %, em, rem) for precise control.</li>
              <li>Customize the box dimensions and background color in the "Box" tab.</li>
              <li>Adjust border properties like width, color, and style in the "Border" tab.</li>
              <li>Preview your changes in real-time with the interactive preview.</li>
              <li>Use the fullscreen mode for a detailed view of your design.</li>
              <li>Copy the generated CSS or download it as a file for use in your projects.</li>
              <li>Use the Reset button to start over with default settings.</li>
            </ol>

            <h2 className="text-xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-default-600">
              <li>Individual control for each corner's border radius</li>
              <li>Support for multiple units: px, %, em, and rem</li>
              <li>Customizable box dimensions and background color</li>
              <li>Advanced border customization (width, color, style)</li>
              <li>Real-time preview with fullscreen mode</li>
              <li>Generated CSS code with syntax highlighting</li>
              <li>Copy to clipboard and download as file options</li>
              <li>Reset option to quickly return to default settings</li>
              <li>Responsive design for use on various devices</li>
            </ul>

            <p className="text-default-600 mt-6">
              The Enhanced Border Radius Generator empowers you to create unique, efficient, and visually appealing UI
              elements for a wide range of projects. By leveraging the power of CSS, you can generate lightweight,
              scalable designs that enhance your web presence without relying on heavy image files. Whether you're a
              seasoned developer or just starting out in web design, this tool offers both simplicity and depth to meet
              your creative needs. Start experimenting with border radii and styles today and elevate your web designs
              to the next level!
            </p>
          </CardBody>
        </Card>
      </div>

      {renderFullscreenPreview()}
    </ToolLayout>
  )
}

