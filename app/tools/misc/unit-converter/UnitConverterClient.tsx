"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import {
  Button,
  Input,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Spinner,
  Badge,
  Chip,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react"
import { toast } from "react-hot-toast"
import { ArrowLeftRight, Copy, Check, RefreshCw, Info, History, Trash2, Calculator, Sparkles, Zap } from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import { categories } from "./unitCategories"
import InfoSection from "./InfoSection"

// Find the index of the Currency category
const currencyIndex = categories.findIndex((cat) => cat.name === "Currency")

export default function UnitConverter() {
  const [category, setCategory] = useState(categories[0])
  const [fromUnit, setFromUnit] = useState(category.units[0])
  const [toUnit, setToUnit] = useState(category.units[1])
  const [fromValue, setFromValue] = useState("1")
  const [toValue, setToValue] = useState("")
  const [conversionHistory, setConversionHistory] = useState<
    { from: string; to: string; fromUnit: string; toUnit: string; category: string; timestamp: number }[]
  >([])
  const [copied, setCopied] = useState(false)
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({})
  const [loadingRates, setLoadingRates] = useState(false)
  const [ratesError, setRatesError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("converter")
  const [favoriteConversions, setFavoriteConversions] = useState<
    { category: string; fromUnit: string; toUnit: string }[]
  >([])

  // Load history and favorites from localStorage on component mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("unitConverterHistory")
      if (savedHistory) {
        setConversionHistory(JSON.parse(savedHistory))
      }

      const savedFavorites = localStorage.getItem("unitConverterFavorites")
      if (savedFavorites) {
        setFavoriteConversions(JSON.parse(savedFavorites))
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error)
    }
  }, [])

  // Save history and favorites to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("unitConverterHistory", JSON.stringify(conversionHistory))
    } catch (error) {
      console.error("Error saving history to localStorage:", error)
    }
  }, [conversionHistory])

  useEffect(() => {
    try {
      localStorage.setItem("unitConverterFavorites", JSON.stringify(favoriteConversions))
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error)
    }
  }, [favoriteConversions])

  // Auto-convert when inputs change
  useEffect(() => {
    convertValue(fromValue)
  }, [fromValue, fromUnit, toUnit, category])

  // Fetch exchange rates when currency category is selected
  useEffect(() => {
    if (category.name === "Currency" && Object.keys(exchangeRates).length === 0) {
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
            },
          }

          // If category is currently Currency, update it
          if (category.name === "Currency") {
            setCategory(updatedCurrencyCategory)
            setFromUnit("USD")
            setToUnit("EUR")
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
      if (category.name === "Currency" && loadingRates) {
        setToValue("Loading...")
        return
      }

      // If there was an error loading currency rates, use the original conversion function
      const result = category.convert(numValue, fromUnit, toUnit)
      setToValue(result.toFixed(6).replace(/\.?0+$/, "")) // Remove trailing zeros
      addToHistory(numValue.toString(), result.toFixed(6), fromUnit, toUnit, category.name)
    } else {
      setToValue("")
    }
  }

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value)
  }

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
  }

  const addToHistory = (from: string, to: string, fromUnit: string, toUnit: string, category: string) => {
    // Check if this exact conversion is already the most recent one
    const mostRecent = conversionHistory[0]
    if (
      mostRecent &&
      mostRecent.from === from &&
      mostRecent.to === to &&
      mostRecent.fromUnit === fromUnit &&
      mostRecent.toUnit === toUnit &&
      mostRecent.category === category
    ) {
      return // Don't add duplicate consecutive entries
    }

    setConversionHistory((prev) => [
      { from, to, fromUnit, toUnit, category, timestamp: Date.now() },
      ...prev.slice(0, 19),
    ])
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
      if (newCategory.name === "Currency" && Object.keys(exchangeRates).length === 0) {
        fetchExchangeRates()
      }
    }
  }

  const handleFromUnitChange = (value: string) => {
    setFromUnit(value)
  }

  const handleToUnitChange = (value: string) => {
    setToUnit(value)
  }

  const addToFavorites = () => {
    const newFavorite = { category: category.name, fromUnit, toUnit }
    const exists = favoriteConversions.some(
      (fav) => fav.category === category.name && fav.fromUnit === fromUnit && fav.toUnit === toUnit,
    )

    if (!exists) {
      setFavoriteConversions((prev) => [...prev, newFavorite])
      toast.success("Added to favorites!")
    } else {
      toast.error("This conversion is already in your favorites")
    }
  }

  const removeFromFavorites = (index: number) => {
    setFavoriteConversions((prev) => prev.filter((_, i) => i !== index))
    toast.success("Removed from favorites")
  }

  const loadFavorite = (favorite: { category: string; fromUnit: string; toUnit: string }) => {
    const selectedCategory = categories.find((c) => c.name === favorite.category)
    if (selectedCategory) {
      setCategory(selectedCategory)
      setFromUnit(favorite.fromUnit)
      setToUnit(favorite.toUnit)
      toast.success("Favorite conversion loaded")
    }
  }

  // Calculate common conversions for the current category
  const commonConversions = useMemo(() => {
    if (!category) return []

    const baseUnit = category.units[0]
    const commonValues = [1, 10, 100]
    const results = []

    for (const value of commonValues) {
      const conversions = category.units.slice(1, 4).map((unit) => {
        const result = category.convert(value, baseUnit, unit)
        return {
          from: `${value} ${baseUnit}`,
          to: `${result.toFixed(4).replace(/\.?0+$/, "")} ${unit}`,
        }
      })
      results.push(...conversions)
    }

    return results
  }, [category])

  // Format the date for history items
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <ToolLayout
      title="Advanced Unit Converter"
      description="Quickly and accurately convert between various units of measurement"
      toolId="678f383126f06f912191bccf"
    >
      <div className="flex flex-col gap-6">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardHeader className="flex items-center justify-between">
            {ratesError && <Badge color="danger">Using fallback rates</Badge>}
          </CardHeader>

          <CardBody>
            <Tabs
              aria-label="Unit Converter Options"
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(key as string)}
              classNames={{
                base: "w-full",
                tabList: "gap-4 w-full relative rounded-lg p-2 bg-default-100 dark:bg-default-200/20",
                cursor: "bg-primary-500/20 dark:bg-primary-500/20",
                tab: "max-w-fit px-4 h-10 data-[selected=true]:text-primary-500 data-[selected=true]:font-medium",
                tabContent: "group-data-[selected=true]:text-primary-500",
              }}
              color="primary"
              variant="solid"
            >
              <Tab
                key="converter"
                title={
                  <div className="flex items-center gap-2">
                    <Calculator size={16} className="text-default-500 group-data-[selected=true]:text-primary-500" />
                    <span>Converter</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-6">
                  <Select
                    label="Category"
                    variant="bordered"
                    placeholder="Select category"
                    selectedKeys={[category.name]}
                    onChange={handleCategoryChange}
                    className="max-w-full"
                  >
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat.name}
                        value={cat.name}
                        startContent={getCategoryIcon(cat.name)}
                        className="text-default-700"
                      >
                        {cat.name}
                      </SelectItem>
                    ))}
                  </Select>

                  {category.name === "Currency" && (
                    <div className="w-full flex justify-center my-2">
                      <Button
                        size="md"
                        color="primary"
                        isLoading={loadingRates}
                        onClick={fetchExchangeRates}
                        disabled={loadingRates}
                        startContent={!loadingRates && <RefreshCw size={16} />}
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl transition-all"
                      >
                        {loadingRates ? "Updating Rates..." : "Refresh Exchange Rates"}
                      </Button>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="w-full md:w-[calc(50%-28px)]">
                      {category.name === "Currency" ? (
                        <Autocomplete
                          label="From Currency"
                          placeholder="Select currency"
                          defaultSelectedKey={fromUnit}
                          onSelectionChange={(key) => handleFromUnitChange(key as string)}
                          isDisabled={loadingRates}
                          className="w-full"
                          variant="bordered"
                        >
                          {category.units.map((unit) => (
                            <AutocompleteItem key={unit} value={unit} textValue={unit} className="text-default-700">
                              <div className="flex items-center gap-2">
                                <div className="font-medium">{unit}</div>
                                <div className="text-default-500 text-xs">{getCurrencyName(unit)}</div>
                              </div>
                            </AutocompleteItem>
                          ))}
                        </Autocomplete>
                      ) : (
                        <Select
                          label="From Unit"
                          placeholder="Select unit"
                          variant="bordered"
                          selectedKeys={[fromUnit]}
                          onChange={(e) => handleFromUnitChange(e.target.value)}
                          isDisabled={category.name === "Currency" && loadingRates}
                          className="w-full"
                        >
                          {category.units.map((unit) => (
                            <SelectItem key={unit} value={unit} className="text-default-700">
                              {unit}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    </div>

                    {/* Swap button positioned between From Unit and To Unit */}
                    <div className="flex items-center justify-center self-center md:self-start mt-2 md:mt-4">
                      <Button
                        isIconOnly
                        color="primary"
                        variant="flat"
                        aria-label="Swap units"
                        onClick={swapUnits}
                        isDisabled={category.name === "Currency" && loadingRates}
                        className="rounded-full shadow-md"
                      >
                        <ArrowLeftRight size={16} />
                      </Button>
                    </div>

                    <div className="w-full md:w-[calc(50%-28px)]">
                      {category.name === "Currency" ? (
                        <Autocomplete
                          label="To Currency"
                          placeholder="Select currency"
                          defaultSelectedKey={toUnit}
                          onSelectionChange={(key) => handleToUnitChange(key as string)}
                          isDisabled={loadingRates}
                          className="w-full"
                          variant="bordered"
                        >
                          {category.units.map((unit) => (
                            <AutocompleteItem key={unit} value={unit} textValue={unit} className="text-default-700">
                              <div className="flex items-center gap-2">
                                <div className="font-medium">{unit}</div>
                                <div className="text-default-500 text-xs">{getCurrencyName(unit)}</div>
                              </div>
                            </AutocompleteItem>
                          ))}
                        </Autocomplete>
                      ) : (
                        <Select
                          label="To Unit"
                          placeholder="Select unit"
                          variant="bordered"
                          selectedKeys={[toUnit]}
                          onChange={(e) => handleToUnitChange(e.target.value)}
                          isDisabled={category.name === "Currency" && loadingRates}
                          className="w-full"
                        >
                          {category.units.map((unit) => (
                            <SelectItem key={unit} value={unit} className="text-default-700">
                              {unit}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      type="number"
                      label="From Value"
                      placeholder="Enter value"
                      variant="bordered"
                      value={fromValue}
                      onChange={handleFromValueChange}
                      isDisabled={category.name === "Currency" && loadingRates}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">{getUnitSymbol(fromUnit)}</span>
                        </div>
                      }
                    />

                    <Input
                      type="text"
                      label="Result"
                      placeholder="Result"
                      variant="bordered"
                      value={toValue}
                      readOnly
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">{getUnitSymbol(toUnit)}</span>
                        </div>
                      }
                      endContent={
                        toValue && (
                          <Button
                            isIconOnly
                            size="sm"
                            color="primary"
                            variant="light"
                            onClick={copyToClipboard}
                            className="text-default-500"
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                          </Button>
                        )
                      }
                    />
                  </div>

                  <div className="flex flex-wrap justify-between items-center gap-2 mt-4">
                    <Button
                      color="primary"
                      onClick={copyToClipboard}
                      isDisabled={!toValue || toValue === "Loading..."}
                      startContent={copied ? <Check size={16} /> : <Copy size={16} />}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <Button
                      color="secondary"
                      variant="flat"
                      onClick={addToFavorites}
                      isDisabled={!toValue || toValue === "Loading..."}
                      startContent={<Sparkles size={16} />}
                    >
                      Add to Favorites
                    </Button>
                  </div>

                  {category.formula && (
                    <div className="mt-2 p-4 bg-primary-100/50 dark:bg-primary-500/10 rounded-lg border border-primary-200 dark:border-primary-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Info size={16} className="text-primary-500" />
                        <span className="font-medium text-primary-700 dark:text-primary-300">Conversion Formula</span>
                      </div>
                      <p className="text-sm font-mono bg-default-100/80 dark:bg-default-200/30 p-2 rounded border border-default-200 dark:border-default-700">
                        {category.formula(fromUnit, toUnit)}
                      </p>
                      {category.name === "Currency" && (
                        <div className="text-xs text-default-500 mt-2">
                          {loadingRates ? (
                            <div className="flex items-center gap-2">
                              <Spinner size="sm" />
                              <span>Fetching latest rates...</span>
                            </div>
                          ) : Object.keys(exchangeRates).length > 0 ? (
                            "Using live exchange rates"
                          ) : (
                            "Using fallback exchange rates"
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Common Conversions */}
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Zap size={16} className="text-primary-500" />
                      Common Conversions
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {commonConversions.map((conversion, index) => (
                        <div
                          key={index}
                          className="bg-default-100 dark:bg-default-200/20 p-2 rounded text-sm flex justify-between"
                        >
                          <span>{conversion.from}</span>
                          <span className="font-medium">{conversion.to}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab
                key="history"
                title={
                  <div className="flex items-center gap-2">
                    <History size={16} className="text-default-500 group-data-[selected=true]:text-primary-500" />
                    <span>History</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-4">
                  {conversionHistory.length > 0 ? (
                    <div className="space-y-2">
                      {conversionHistory.map((item, index) => (
                        <div
                          key={index}
                          className="bg-default-100 dark:bg-default-200/20 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge color="primary" variant="flat" size="sm">
                                {item.category}
                              </Badge>
                              <span className="text-xs text-default-500">{formatDate(item.timestamp)}</span>
                            </div>
                            <p className="font-medium mt-1">
                              {item.from} {item.fromUnit} = {item.to} {item.toUnit}
                            </p>
                          </div>
                          <div className="flex gap-2 self-end sm:self-center">
                            <Button
                              size="sm"
                              variant="flat"
                              color="primary"
                              onClick={() => {
                                const cat = categories.find((c) => c.name === item.category)
                                if (cat) {
                                  setCategory(cat)
                                  setFromUnit(item.fromUnit)
                                  setToUnit(item.toUnit)
                                  setFromValue(item.from)
                                  setActiveTab("converter")
                                }
                              }}
                            >
                              Use Again
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-default-100 dark:bg-default-200/20 rounded-lg">
                      <History size={24} className="mx-auto mb-2 text-default-400" />
                      <p className="text-default-500">No conversion history yet</p>
                      <p className="text-xs text-default-400 mt-1">
                        Your conversion history will appear here after you perform conversions
                      </p>
                    </div>
                  )}

                  {conversionHistory.length > 0 && (
                    <Button
                      color="danger"
                      variant="flat"
                      onClick={clearHistory}
                      startContent={<Trash2 size={16} />}
                      className="w-full sm:w-auto"
                    >
                      Clear History
                    </Button>
                  )}
                </div>
              </Tab>

              <Tab
                key="favorites"
                title={
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-default-500 group-data-[selected=true]:text-primary-500" />
                    <span>Favorites</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-4">
                  {favoriteConversions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {favoriteConversions.map((favorite, index) => (
                        <Card key={index} className="bg-default-100 dark:bg-default-200/20">
                          <CardBody className="p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <Badge color="primary" variant="flat" size="sm">
                                  {favorite.category}
                                </Badge>
                                <p className="font-medium mt-1">
                                  {favorite.fromUnit} → {favorite.toUnit}
                                </p>
                              </div>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                color="danger"
                                onClick={() => removeFromFavorites(index)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </CardBody>
                          <CardFooter className="p-2 pt-0">
                            <Button
                              size="sm"
                              color="primary"
                              variant="flat"
                              onClick={() => loadFavorite(favorite)}
                              className="w-full"
                            >
                              Load Conversion
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-default-100 dark:bg-default-200/20 rounded-lg">
                      <Sparkles size={24} className="mx-auto mb-2 text-default-400" />
                      <p className="text-default-500">No favorite conversions yet</p>
                      <p className="text-xs text-default-400 mt-1">
                        Add your frequently used conversions to favorites for quick access
                      </p>
                    </div>
                  )}
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        <InfoSection />
      </div>
    </ToolLayout>
  )
}

// Helper function to get category icons
function getCategoryIcon(category: string) {
  switch (category) {
    case "Length":
      return (
        <Chip size="sm" variant="flat" color="primary">
          L
        </Chip>
      )
    case "Weight":
      return (
        <Chip size="sm" variant="flat" color="secondary">
          W
        </Chip>
      )
    case "Temperature":
      return (
        <Chip size="sm" variant="flat" color="success">
          T
        </Chip>
      )
    case "Angle":
      return (
        <Chip size="sm" variant="flat" color="warning">
          A
        </Chip>
      )
    case "Digital Storage":
      return (
        <Chip size="sm" variant="flat" color="danger">
          DS
        </Chip>
      )
    case "Currency":
      return (
        <Chip size="sm" variant="flat" color="primary">
          $
        </Chip>
      )
    case "Power":
      return (
        <Chip size="sm" variant="flat" color="secondary">
          P
        </Chip>
      )
    case "Frequency":
      return (
        <Chip size="sm" variant="flat" color="success">
          F
        </Chip>
      )
    default:
      return (
        <Chip size="sm" variant="flat">
          {category.charAt(0)}
        </Chip>
      )
  }
}

// Helper function to get unit symbols
function getUnitSymbol(unit: string) {
  switch (unit) {
    case "Meters":
      return "m"
    case "Kilometers":
      return "km"
    case "Centimeters":
      return "cm"
    case "Millimeters":
      return "mm"
    case "Micrometers":
      return "μm"
    case "Nanometers":
      return "nm"
    case "Miles":
      return "mi"
    case "Yards":
      return "yd"
    case "Feet":
      return "ft"
    case "Inches":
      return "in"
    case "Nautical Miles":
      return "nmi"
    case "Kilograms":
      return "kg"
    case "Grams":
      return "g"
    case "Milligrams":
      return "mg"
    case "Metric Tons":
      return "t"
    case "Pounds":
      return "lb"
    case "Ounces":
      return "oz"
    case "Stone":
      return "st"
    case "US Tons":
      return "ton"
    case "Imperial Tons":
      return "long ton"
    case "Celsius":
      return "°C"
    case "Fahrenheit":
      return "°F"
    case "Kelvin":
      return "K"
    case "Degrees":
      return "°"
    case "Radians":
      return "rad"
    case "Gradians":
      return "grad"
    case "Watts":
      return "W"
    case "Kilowatts":
      return "kW"
    case "Megawatts":
      return "MW"
    case "Horsepower":
      return "hp"
    case "BTU/hour":
      return "BTU/h"
    case "Hertz":
      return "Hz"
    case "Kilohertz":
      return "kHz"
    case "Megahertz":
      return "MHz"
    case "Gigahertz":
      return "GHz"
    case "Terahertz":
      return "THz"
    // For currencies, return the currency code
    case "USD":
    case "EUR":
    case "GBP":
    case "JPY":
    case "CAD":
    case "AUD":
    case "CHF":
    case "CNY":
      return unit
    default:
      return ""
  }
}

// Helper function to get currency names
function getCurrencyName(code: string) {
  const currencyNames: Record<string, string> = {
    USD: "US Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    JPY: "Japanese Yen",
    CAD: "Canadian Dollar",
    AUD: "Australian Dollar",
    CHF: "Swiss Franc",
    CNY: "Chinese Yuan",
    INR: "Indian Rupee",
    BRL: "Brazilian Real",
    RUB: "Russian Ruble",
    KRW: "South Korean Won",
    SGD: "Singapore Dollar",
    NZD: "New Zealand Dollar",
    MXN: "Mexican Peso",
    HKD: "Hong Kong Dollar",
    TRY: "Turkish Lira",
    ZAR: "South African Rand",
    SEK: "Swedish Krona",
    NOK: "Norwegian Krone",
  }

  return currencyNames[code] || code
}
