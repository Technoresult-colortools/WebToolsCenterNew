"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button, Input, Switch, Select, SelectItem, Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import { ArrowLeftRight, Copy, Check, RefreshCw, Info, BookOpen, Lightbulb, Share2 } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { categories } from "./unitCategories"
import Image from "next/image"

export default function UnitConverter() {
  const [category, setCategory] = useState(categories[0])
  const [fromUnit, setFromUnit] = useState(category.units[0])
  const [toUnit, setToUnit] = useState(category.units[1])
  const [fromValue, setFromValue] = useState("1")
  const [toValue, setToValue] = useState("")
  const [conversionHistory, setConversionHistory] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    convertValue(fromValue)
  }, [fromValue])

  const convertValue = (value: string) => {
    const numValue = Number.parseFloat(value)
    if (!isNaN(numValue)) {
      const result = category.convert(numValue, fromUnit, toUnit)
      setToValue(result.toFixed(6))
      addToHistory(`${numValue} ${fromUnit} = ${result.toFixed(6)} ${toUnit}`)
    } else {
      setToValue("")
    }
  }

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value)
    convertValue(e.target.value)
  }

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    convertValue(toValue)
  }

  const addToHistory = (conversion: string) => {
    setConversionHistory((prev) => [conversion, ...prev.slice(0, 19)])
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${fromValue} ${fromUnit} = ${toValue} ${toUnit}`)
    setCopied(true)
    toast.success("Conversion copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const clearHistory = () => {
    setConversionHistory([])
    toast.success("Conversion history cleared!")
  }

  return (
    <ToolLayout
      title="Advanced Unit Converter"
      description="Quickly and accurately convert between various units of measurement"
      toolId="unit-converter"
    >
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Unit Converter</h2>
          </CardHeader>
          <CardBody>
            <Tabs aria-label="Unit Converter Options">
              <Tab
                key="converter"
                title={
                  <div className="flex items-center space-x-2">
                    <ArrowLeftRight className="w-4 h-4" />
                    <span>Converter</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-4">
                  <Select
                    label="Category"
                    placeholder="Select category"
                    selectedKeys={[category.name]}
                    onChange={(e) => {
                      const newCategory = categories.find((c) => c.name === e.target.value)
                      if (newCategory) {
                        setCategory(newCategory)
                        setFromUnit(newCategory.units[0])
                        setToUnit(newCategory.units[1])
                      }
                    }}
                    variant="bordered"
                    classNames={{
                      trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                    }}
                  >
                    {categories.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name} className="text-default-700">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </Select>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Select
                        label="From Unit"
                        placeholder="Select unit"
                        selectedKeys={[fromUnit]}
                        onChange={(e) => setFromUnit(e.target.value)}
                        variant="bordered"
                        classNames={{
                          trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                        }}
                      >
                        {category.units.map((unit) => (
                          <SelectItem key={unit} value={unit} className="text-default-700">
                            {unit}
                          </SelectItem>
                        ))}
                      </Select>
                      <Input
                        type="number"
                        label="From Value"
                        placeholder="Enter value"
                        value={fromValue}
                        onChange={handleFromValueChange}
                        variant="bordered"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Select
                        label="To Unit"
                        placeholder="Select unit"
                        selectedKeys={[toUnit]}
                        onChange={(e) => setToUnit(e.target.value)}
                        variant="bordered"
                        classNames={{
                          trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                        }}
                      >
                        {category.units.map((unit) => (
                          <SelectItem key={unit} value={unit} className="text-default-700">
                            {unit}
                          </SelectItem>
                        ))}
                      </Select>
                      <Input
                        type="text"
                        label="To Value"
                        placeholder="Result"
                        value={toValue}
                        readOnly
                        variant="bordered"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button color="primary" onClick={swapUnits}>
                      <ArrowLeftRight className="w-4 h-4 mr-2" />
                      Swap
                    </Button>
                    <Button color="primary" onClick={copyToClipboard}>
                      {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>
              </Tab>
              <Tab
                key="history"
                title={
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4" />
                    <span>History</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-4">
                  <div className="bg-default-100 rounded-md p-4 max-h-40 overflow-y-auto">
                    {conversionHistory.map((conversion, index) => (
                      <div key={index} className="text-default-700 mb-1">
                        {conversion}
                      </div>
                    ))}
                  </div>
                  <Button color="danger" onClick={clearHistory}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear History
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About Advanced Unit Converter
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">
                The Advanced Unit Converter is a powerful and versatile tool designed to simplify the process of
                converting between various units of measurement. With its intuitive interface and comprehensive unit
                categories, it's perfect for students, professionals, and anyone needing quick and accurate conversions.
              </p>

              <div className="my-8">
                <Image
                  src="/Images/UnitConverterPreview.png"
                  alt="Screenshot of the Advanced Unit Converter interface showing conversion options and results"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                How to Use Advanced Unit Converter?
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Select the category of units you want to convert (e.g., Length, Weight, Temperature).</li>
                <li>Choose the unit you're converting from in the "From" dropdown.</li>
                <li>Enter the value you want to convert in the input field.</li>
                <li>Select the unit you're converting to in the "To" dropdown.</li>
                <li>The converted value will appear automatically in the result field.</li>
                <li>Use the "Swap" button to quickly reverse the conversion.</li>
                <li>Click "Copy" to copy the conversion result to your clipboard.</li>
                <li>Switch to the "History" tab to view your recent conversions.</li>
              </ol>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  Wide range of unit categories: Length, Weight, Temperature, Volume, Area, Time, Speed, Data, Energy,
                  and Pressure.
                </li>
                <li>Extensive list of units within each category for precise conversions.</li>
                <li>Real-time conversion as you type.</li>
                <li>Swap function to quickly reverse conversion direction.</li>
                <li>Copy to clipboard functionality for easy sharing.</li>
                <li>Conversion history to keep track of recent conversions.</li>
                <li>Clean and intuitive tabbed interface.</li>
                <li>Responsive design for use on desktop and mobile devices.</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3 flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Applications and Use Cases
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Education: For math, science, and engineering calculations.</li>
                <li>Engineering: Convert between different units for design and calculations.</li>
                <li>Cooking: Convert between volume and weight measurements for recipes.</li>
                <li>Fitness and Health: Convert between units for weight, length, and energy.</li>
                <li>Travel: Convert units when visiting countries with different measurement systems.</li>
                <li>Construction: Convert units of length, area, and volume for building projects.</li>
                <li>Science: Perform conversions for various scientific calculations and experiments.</li>
                <li>International Trade: Convert units for shipping and logistics.</li>
                <li>IT and Networking: Use data conversions for storage and bandwidth calculations.</li>
                <li>Energy Management: Convert between energy units for power consumption analysis.</li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}

