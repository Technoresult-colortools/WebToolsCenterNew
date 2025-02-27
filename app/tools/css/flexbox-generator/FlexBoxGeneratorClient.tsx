"use client"

import { useState, useEffect } from "react"
import { Button, Input, Slider, Select, SelectItem, Card, CardBody, Tabs, Tab, Tooltip } from "@nextui-org/react"
import { toast, } from "react-hot-toast"
import { Copy, RefreshCw, Plus,  Info, BookOpen, Lightbulb, X, HelpCircle } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse"
type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
type AlignItems = "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse"
type AlignContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch"
type AlignSelf = "auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch"

interface FlexItem {
  flexGrow: number
  flexShrink: number
  flexBasis: string
  alignSelf: AlignSelf
  order: number
  color: string
}


export default function FlexboxGenerator() {
  const [flexDirection, setFlexDirection] = useState<FlexDirection>("row")
  const [justifyContent, setJustifyContent] = useState<JustifyContent>("flex-start")
  const [alignItems, setAlignItems] = useState<AlignItems>("stretch")
  const [flexWrap, setFlexWrap] = useState<FlexWrap>("nowrap")
  const [alignContent, setAlignContent] = useState<AlignContent>("stretch")
  const [containerColor, setContainerColor] = useState("#f0f0f0")
  const [containerWidth, setContainerWidth] = useState(100)
  const [containerHeight, setContainerHeight] = useState(300)
  const [items, setItems] = useState<FlexItem[]>([
    { flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto", order: 0, color: "#3498db" },
    { flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto", order: 0, color: "#e74c3c" },
    { flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto", order: 0, color: "#2ecc71" },
  ])
  const [generatedCSS, setGeneratedCSS] = useState("")

  useEffect(() => {
    generateCSS()
  }, [
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap,
    alignContent,
    containerColor,
    containerWidth,
    containerHeight,
    items,
  ])

  const generateCSS = () => {
    let css = `.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  align-content: ${alignContent};
  background-color: ${containerColor};
  width: ${containerWidth}%;
  height: ${containerHeight}px;
  padding: 20px;
}

.flex-item {
  padding: 20px;
  margin: 10px;
  color: white;
  font-weight: bold;
  font-size: 2em;
  text-align: center;
  border-radius: 5px;
}

`

    items.forEach((item, index) => {
      css += `.flex-item:nth-child(${index + 1}) {
  flex-grow: ${item.flexGrow};
  flex-shrink: ${item.flexShrink};
  flex-basis: ${item.flexBasis};
  align-self: ${item.alignSelf};
  order: ${item.order};
  background-color: ${item.color};
}

`
    })

    setGeneratedCSS(css.trim())
  }

  const addItem = () => {
    setItems([
      ...items,
      { flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto", order: 0, color: "#9b59b6" },
    ])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, key: keyof FlexItem, value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [key]: value }
    setItems(newItems)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCSS)
    toast.success("CSS copied to clipboard!")
  }

  const handleReset = () => {
    setFlexDirection("row")
    setJustifyContent("flex-start")
    setAlignItems("stretch")
    setFlexWrap("nowrap")
    setAlignContent("stretch")
    setContainerColor("#f0f0f0")
    setContainerWidth(100)
    setContainerHeight(300)
    setItems([
      { flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto", order: 0, color: "#3498db" },
      { flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto", order: 0, color: "#e74c3c" },
      { flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto", order: 0, color: "#2ecc71" },
    ])
    toast.success("Settings reset to default!")
  }

  return (
    <ToolLayout
      title="CSS Flexbox Generator"
      description="Create, visualize, and customize flexible layouts using CSS Flexbox with precision and ease"
      toolId="678f382c26f06f912191bca0"
    >

    <div className="flex flex-col gap-8">
      <Card className="bg-default-50 dark:bg-default-100">
        <CardBody className="p-6">
          <Tabs aria-label="Flexbox Generator Tabs">
          <Tab key="preview" title="Preview">
            <div className="flex flex-col space-y-4">
                {/* Axis Visualization Guide */}
                <div className="flex items-center justify-between text-sm p-2 bg-default-100 rounded-lg">
                <div className="flex items-center space-x-2">
                    <span className="font-medium">Main Axis:</span>
                    <div className="h-2 w-16 bg-primary rounded-full" />
                    <span className="text-xs">{flexDirection.includes('row') ? 'Horizontal' : 'Vertical'}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="font-medium">Cross Axis:</span>
                    <div className="h-2 w-16 bg-secondary rounded-full" />
                    <span className="text-xs">{flexDirection.includes('row') ? 'Vertical' : 'Horizontal'}</span>
                </div>
                </div>

                {/* Preview Container */}
                <Card className="bg-card border border-border shadow-sm rounded-lg overflow-hidden p-4 dark:bg-card dark:border-border-dark">
                <div className="relative bg-default-50 rounded-lg">
                    <div className="absolute inset-0 pointer-events-none">
                    <div 
                        className={`absolute ${flexDirection.includes('row') ? 'h-0.5 top-4' : 'w-0.5 left-4'} bg-primary/20`}
                        style={{
                        [flexDirection.includes('row') ? 'width' : 'height']: '100%',
                        transform: flexDirection.includes('reverse') ? 'rotate(180deg)' : 'none'
                        }}
                    />
                    <div 
                        className={`absolute ${flexDirection.includes('row') ? 'w-0.5 left-4' : 'h-0.5 top-4'} bg-secondary/20`}
                        style={{
                        [flexDirection.includes('row') ? 'height' : 'width']: '100%'
                        }}
                    />
                    </div>

                    <div
                    className="relative flex rounded-lg transition-all duration-300"
                    style={{
                        flexDirection,
                        justifyContent,
                        alignItems,
                        flexWrap,
                        alignContent,
                        width: `${containerWidth}%`,
                        height: `${containerHeight}px`,
                        padding: "20px",
                        overflow: "auto",
                    }}
                    >
                    {items.map((item, index) => (
                        <div
                        key={index}
                        className="group relative"
                        style={{
                            flexGrow: item.flexGrow,
                            flexShrink: item.flexShrink,
                            flexBasis: item.flexBasis,
                            alignSelf: item.alignSelf,
                            order: item.order,
                            backgroundColor: item.color,
                            padding: "20px",
                            margin: "10px",
                            borderRadius: "8px",
                            minWidth: "60px",
                            minHeight: "60px",
                            transition: "all 0.2s"
                        }}
                        >
                        <button
                            onClick={() => removeItem(index)}
                            className="absolute -top-2 -right-2 p-1.5 bg-danger-50 hover:bg-danger text-danger hover:text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center justify-center h-full">
                            <span className="text-white font-bold text-2xl">{index + 1}</span>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </Card>
            </div>
            </Tab>
            <Tab key="code" title="Generated CSS">
            <div className="p-4">
                <div className="relative">
                <div className="absolute top-2 right-6 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="bg-gray-900 text-gray-100 p-6 rounded-lg mt-2 max-h-[400px] overflow-auto">
                    <pre className="font-mono text-sm">
                    <code>{generatedCSS}</code>
                    </pre>
                </div>
                </div>
            </div>
            </Tab>
          </Tabs>

          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Container Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              {[
                {
                    label: "Flex Direction",
                    value: flexDirection,
                    setter: setFlexDirection,
                    options: ["row", "row-reverse", "column", "column-reverse"],
                    tooltip: "Defines the direction of the main axis along which flex items are placed."
                },
                {
                    label: "Justify Content",
                    value: justifyContent,
                    setter: setJustifyContent,
                    options: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
                    tooltip: "Aligns flex items along the main axis of the flex container."
                },
                {
                    label: "Align Items",
                    value: alignItems,
                    setter: setAlignItems,
                    options: ["flex-start", "flex-end", "center", "stretch", "baseline"],
                    tooltip: "Aligns flex items along the cross axis of the flex container."
                },
                {
                    label: "Flex Wrap",
                    value: flexWrap,
                    setter: setFlexWrap,
                    options: ["nowrap", "wrap", "wrap-reverse"],
                    tooltip: "Controls whether flex items are forced onto a single line or can wrap onto multiple lines."
                },
                {
                    label: "Align Content",
                    value: alignContent,
                    setter: setAlignContent,
                    options: ["flex-start", "flex-end", "center", "space-between", "space-around", "stretch"],
                    tooltip: "Aligns a flex container's lines within when there is extra space in the cross-axis."
                },
                ].map((setting) => (
                <div key={setting.label} className="relative">
                    <div className="flex items-center space-x-1 mb-2">
                    <label htmlFor={setting.label} className="block text-default-700">
                        {setting.label}
                    </label>
                    <Tooltip
                        content={<span className="text-default-700">{setting.tooltip}</span>}
                        showArrow
                        placement="right"
                        classNames={{
                        content: ["bg-background", "text-default-700"]
                        }}
                    >
                        <button className="focus:outline-none">
                        <HelpCircle className="w-4 h-4 text-default-700 hover:text-primary cursor-help" />
                        </button>
                    </Tooltip>
                    </div>
                    <Select
                    id={setting.label}
                    variant="bordered"
                    selectedKeys={[setting.value]}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e) => setting.setter(e.target.value as any)} 
                    className="w-full"
                    >
                    {setting.options.map((option) => (
                        <SelectItem key={option} value={option} className="text-default-700">
                        {option}
                        </SelectItem>
                    ))}
                    </Select>
                </div>
                ))}
                <div>
                  <label htmlFor="containerColor" className="block mb-2">
                    Container Color
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      type="color"
                      id="containerColor"
                      value={containerColor}
                      onChange={(e) => setContainerColor(e.target.value)}
                      className="w-14 h-10"
                      variant="bordered"
                    />
                    <Input type="text" variant="bordered" value={containerColor} onChange={(e) => setContainerColor(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label htmlFor="containerWidth" className="block mb-2">
                    Container Width: {containerWidth}%
                  </label>
                  <Slider
                    aria-label="Container Width"
                    step={1}
                    minValue={10}
                    maxValue={100}
                    value={containerWidth}
                    onChange={(value) => setContainerWidth(value as number)}
                  />
                </div>
                <div>
                  <label htmlFor="containerHeight" className="block mb-2">
                    Container Height: {containerHeight}px
                  </label>
                  <Slider
                    aria-label="Container Height"
                    step={10}
                    minValue={100}
                    maxValue={1000}
                    value={containerHeight}
                    onChange={(value) => setContainerHeight(value as number)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
                {items.map((item, index) => (
                    <Card key={index} className="group">
                    <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold">Item {index + 1}</h3>
                        <button
                            onClick={() => removeItem(index)}
                            className="p-1.5 bg-danger-50 hover:bg-danger text-danger hover:text-white rounded-full shadow-sm transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor={`flexGrow-${index}`} className="block mb-2">
                            Flex Grow
                          </label>
                          <Input
                            type="number"
                            id={`flexGrow-${index}`}
                            value={item.flexGrow.toString()}
                            onChange={(e) => updateItem(index, "flexGrow", Number.parseInt(e.target.value))}
                            min="0"
                          />
                        </div>
                        <div>
                          <label htmlFor={`flexShrink-${index}`} className="block mb-2">
                            Flex Shrink
                          </label>
                          <Input
                            type="number"
                            id={`flexShrink-${index}`}
                            value={item.flexShrink.toString()}
                            onChange={(e) => updateItem(index, "flexShrink", Number.parseInt(e.target.value))}
                            min="0"
                          />
                        </div>
                        <div>
                          <label htmlFor={`flexBasis-${index}`} className="block mb-2">
                            Flex Basis
                          </label>
                          <Input
                            type="text"
                            id={`flexBasis-${index}`}
                            value={item.flexBasis}
                            onChange={(e) => updateItem(index, "flexBasis", e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor={`alignSelf-${index}`} className="block mb-2">
                            Align Self
                          </label>
                          <Select
                            id={`alignSelf-${index}`}
                            selectedKeys={[item.alignSelf]}
                            onChange={(e) => updateItem(index, "alignSelf", e.target.value as AlignSelf)}
                          >
                            {["auto", "flex-start", "flex-end", "center", "baseline", "stretch"].map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                        <div>
                          <label htmlFor={`order-${index}`} className="block mb-2">
                            Order
                          </label>
                          <Input
                            type="number"
                            id={`order-${index}`}
                            value={item.order.toString()}
                            onChange={(e) => updateItem(index, "order", Number.parseInt(e.target.value))}
                          />
                        </div>
                        <div>
                          <label htmlFor={`itemColor-${index}`} className="block mb-2">
                            Item Color
                          </label>
                          <div className="flex space-x-2">
                            <Input
                              type="color"
                              id={`itemColor-${index}`}
                              value={item.color}
                              onChange={(e) => updateItem(index, "color", e.target.value)}
                              className="w-14 h-10"
                            />
                            <Input
                              type="text"
                              value={item.color}
                              onChange={(e) => updateItem(index, "color", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      
                    </CardBody>
                  </Card>
                ))}
                <Button 
                onClick={addItem} 
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-green-200 transition-all duration-200 py-6"
                startContent={<Plus className="w-5 h-5" />}
                >
                Add New Flex Item
                </Button>
              </div>
            </div>
          

            <div className="mt-8 flex justify-between gap-4">
            <Button
                onClick={handleReset}
                variant="shadow"
                color="danger"
                startContent={<RefreshCw className="h-5 w-5" />}
            >
                Reset Layout
            </Button>
            <Button
                onClick={handleCopy}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-blue-200 transition-all duration-200"
                startContent={<Copy className="h-5 w-5" />}
            >
                Copy CSS
            </Button>
            </div>
        </CardBody>
      </Card>

      <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2" />
          What is CSS Flexbox Generator?
        </h2>
        <p className="text-sm md:text-base text-default-600 mb-4">
          The CSS Flexbox Generator is a powerful tool for web developers and designers to create and customize flexible layouts using CSS Flexbox.
          It provides an interactive interface to adjust various Flexbox properties in real-time and generate the corresponding CSS code.
        </p>

        <div className="my-8">
          <Image 
            src="/Images/FlexBoxGeneratorPreview.png?height=400&width=600" 
            alt="CSS Flexbox Generator interface preview"
            width={600} 
            height={400} 
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>

        <h2 id="how-to-use" className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2" />
          How to Use the CSS Flexbox Generator?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
          <li>Adjust the container settings to modify the Flexbox layout.</li>
          <li>Customize the container's dimensions and background color.</li>
          <li>Add or remove flex items using the provided controls.</li>
          <li>Modify item properties such as flex-grow, flex-shrink, flex-basis, align-self, and order.</li>
          <li>Experiment with item colors to better visualize the layout.</li>
          <li>Use the real-time preview to see changes instantly.</li>
          <li>Switch between the preview and generated CSS tabs to inspect the code.</li>
          <li>Copy the generated CSS code for easy integration into your project.</li>
          <li>Use the Reset button to restore default settings.</li>
          <li>Hover over property labels to see explanations of Flexbox concepts.</li>
        </ol>

        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2" />
          Key Flexbox Properties Explained
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
          <li><strong>Flex Direction:</strong> Defines the direction of flex items (<code>row</code>, <code>row-reverse</code>, <code>column</code>, <code>column-reverse</code>).</li>
          <li><strong>Justify Content:</strong> Aligns items along the main axis (<code>flex-start</code>, <code>center</code>, <code>space-between</code>, etc.).</li>
          <li><strong>Align Items:</strong> Aligns items along the cross axis (<code>flex-start</code>, <code>center</code>, <code>stretch</code>, etc.).</li>
          <li><strong>Flex Wrap:</strong> Determines whether items should wrap onto multiple lines (<code>nowrap</code>, <code>wrap</code>, <code>wrap-reverse</code>).</li>
          <li><strong>Align Content:</strong> Controls spacing between wrapped lines (<code>flex-start</code>, <code>center</code>, <code>space-around</code>, etc.).</li>
        </ul>
      </div>
    </Card>
    </div>  
    </ToolLayout>
  )
}

