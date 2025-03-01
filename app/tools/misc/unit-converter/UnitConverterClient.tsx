"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button, Input, Select, SelectItem, Tabs, Tab, Card, CardBody, CardHeader, Spinner } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import { ArrowLeftRight, Copy, Check, RefreshCw, Info, BookOpen, Lightbulb } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { categories } from "./unitCategories"
import Image from "next/image"

// Find the index of the Currency category
const currencyIndex = categories.findIndex(cat => cat.name === 'Currency')

export default function UnitConverter() {
  const [category, setCategory] = useState(categories[0])
  const [fromUnit, setFromUnit] = useState(category.units[0])
  const [toUnit, setToUnit] = useState(category.units[1])
  const [fromValue, setFromValue] = useState("1")
  const [toValue, setToValue] = useState("")
  const [conversionHistory, setConversionHistory] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({})
  const [loadingRates, setLoadingRates] = useState(false)
  const [ratesError, setRatesError] = useState<string | null>(null)

  useEffect(() => {
    convertValue(fromValue)
  }, [fromValue])

  useEffect(() => {
    // If the selected category is Currency, fetch exchange rates
    if (category.name === 'Currency' && Object.keys(exchangeRates).length === 0) {
      fetchExchangeRates()
    }
  }, [category])

  const fetchExchangeRates = async () => {
    setLoadingRates(true)
    setRatesError(null)
    
    try {
      const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
      const data = await res.json()
      
      if (data && data.rates) {
        setExchangeRates(data.rates)
        
        // Update the Currency category with available currencies
        if (currencyIndex !== -1) {
          // Create a modified categories array with updated currency units
          const updatedCurrencyCategory = {
            ...categories[currencyIndex],
            units: Object.keys(data.rates),
            convert: (value: number, from: string, to: string) => {
              // Convert to USD first
              const usdValue = value / data.rates[from]
              // Convert from USD to target currency
              return usdValue * data.rates[to]
            },
            formula: (from: string, to: string) => {
              const rate = (data.rates[to] / data.rates[from]).toFixed(4)
              return `1 ${from} = ${rate} ${to} (Live)`
            }
          }
          
          // If category is currently Currency, update it
          if (category.name === 'Currency') {
            setCategory(updatedCurrencyCategory)
            setFromUnit('USD')
            setToUnit('EUR')
          }
        }
        
        toast.success("Exchange rates updated successfully!")
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Failed to fetch exchange rates", error)
      setRatesError("Failed to fetch exchange rates. Using fallback rates.")
      toast.error("Failed to fetch exchange rates. Using fallback rates.")
    } finally {
      setLoadingRates(false)
    }
  }

  const convertValue = (value: string) => {
    const numValue = Number.parseFloat(value)
    if (!isNaN(numValue)) {
      // If category is Currency and we're still loading rates, show loading in result
      if (category.name === 'Currency' && loadingRates) {
        setToValue("Loading...")
        return
      }
      
      // If there was an error loading currency rates, use the original conversion function
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = categories.find((c) => c.name === e.target.value)
    if (newCategory) {
      setCategory(newCategory)
      setFromUnit(newCategory.units[0])
      setToUnit(newCategory.units[1])
      
      // If switching to Currency and we haven't loaded rates yet, fetch them
      if (newCategory.name === 'Currency' && Object.keys(exchangeRates).length === 0) {
        fetchExchangeRates()
      }
    }
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
            {category.name === 'Currency' && (
              <div className="flex items-center ml-4">
                <Button
                  size="sm"
                  color="primary"
                  isLoading={loadingRates}
                  onClick={fetchExchangeRates}
                  disabled={loadingRates}
                >
                  {!loadingRates && <RefreshCw className="w-4 h-4 mr-1" />}
                  Refresh Rates
                </Button>
                {ratesError && <span className="text-danger text-sm ml-2">Using fallback rates</span>}
              </div>
            )}
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
                    onChange={handleCategoryChange}
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
                        isDisabled={category.name === 'Currency' && loadingRates}
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
                        isDisabled={category.name === 'Currency' && loadingRates}
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
                        isDisabled={category.name === 'Currency' && loadingRates}
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
                    <Button color="primary" onClick={swapUnits} isDisabled={category.name === 'Currency' && loadingRates}>
                      <ArrowLeftRight className="w-4 h-4 mr-2" />
                      Swap
                    </Button>
                    <Button color="primary" onClick={copyToClipboard} isDisabled={!toValue || toValue === "Loading..."}>
                      {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>

                  {category.name === 'Currency' && category.formula && (
                    <div className="mt-4 p-3 bg-default-100 rounded-md text-sm">
                      <p>Exchange Rate: {category.formula(fromUnit, toUnit)}</p>
                      {loadingRates ? (
                        <div className="flex items-center mt-1">
                          <Spinner size="sm" />
                          <span className="ml-2">Fetching latest rates...</span>
                        </div>
                      ) : (
                        <p className="text-xs text-default-500 mt-1">
                          {Object.keys(exchangeRates).length > 0 ? 
                            "Using live exchange rates" :
                            "Using fallback exchange rates"}
                        </p>
                      )}
                    </div>
                  )}
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
                    {conversionHistory.length > 0 ? (
                      conversionHistory.map((conversion, index) => (
                        <div key={index} className="text-default-700 mb-1">
                          {conversion}
                        </div>
                      ))
                    ) : (
                      <div className="text-default-500 text-center">No conversion history yet</div>
                    )}
                  </div>
                  <Button color="danger" onClick={clearHistory} isDisabled={conversionHistory.length === 0}>
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
              Advanced unit converter is a powerful and versatile tool designed to simplify the process
                Changing between different units of measurement. With your spontaneous interface and broad unit
                Categories, it requires quick and accurate conversion to students, professionals and anyone.
              </p>

              <div className="my-8">
                <Image
                  src="/Images/InfosectionImages/UnitConverterPreview.webp?height=400&width=600"
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
                <li>First Select the main category of units you want to convert (e.g., Length, Weight, Temperature).</li>
                <li>Choose the unit you're converting from in the "From" dropdown menu.</li>
                <li>Enter the value you want to convert in the input field.</li>
                <li>Select the unit you're converting to in the "To" dropdown.</li>
                <li>The converted value will appear automatically in the result field.</li>
                <li>Use the "Swap" button to quickly reverse the conversion.</li>
                <li>Click "Copy" to copy the conversion result to your clipboard.</li>
                <li>Switch to the "History" tab to view your recent conversions.</li>
                <li>For currency conversions, the latest exchange rates are fetched automatically.</li>
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
                <li>This tool maintain Live currency exchange rates for accurate currency conversions.</li>
                <li>Swap function to quickly reverse conversion direction.</li>
                <li>Copy to clipboard functionality for easy sharing.</li>
                <li>Conversion history to keep track of recent conversions.</li>
                <li>Clean and intuitive tabbed interface.</li>
                <li>Responsive design for use on desktop and mobile devices.</li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}