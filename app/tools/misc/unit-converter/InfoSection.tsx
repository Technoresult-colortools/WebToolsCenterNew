"use client"

import { Card } from "@nextui-org/react"
import {
  Info,
  BookOpen,
  Lightbulb,
  Code,
  Zap,
  Copy,
  Sparkles,
  Settings2,
  ArrowRightLeft,
  Wand2,
  Calculator,
  RotateCcw,
  History,
  Ruler,
  Scale,
  Thermometer,
  Compass,
  Database,
  DollarSign,
  Gauge,
  Radio,
  Globe,
  BarChart,
  RefreshCw,
  Clock,
  Smartphone,
  Laptop,
  Atom,
} from "lucide-react"
import Link from "next/link"

export default function InfoSection() {
  // Image path
  const imagePath = "/Images/InfosectionImages/UnitConverterPreview.png"

  return (
    <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2 text-primary-500" />
          What is the Advanced Unit Converter?
        </h2>
        <p className="text-default-600 mb-4">
          The Advanced Unit Converter is a comprehensive measurement conversion tool designed for students,
          professionals, travelers, scientists, and anyone who needs to convert between different units of measurement.
          This versatile utility supports a wide range of measurement categories including length, weight, temperature,
          digital storage, currency, and more. Whether you're working on scientific calculations, international travel
          planning, engineering projects, or everyday conversions, our tool provides accurate and instant conversions
          with a user-friendly interface that makes unit conversion simple and efficient.
        </p>

        <div className="my-8">
          <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img
                  src={imagePath || "/placeholder.svg"}
                  alt="Advanced Unit Converter Preview"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </Link>
        </div>

        <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
          How to Use the Advanced Unit Converter
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-default-600">
          <li>
            <strong>Select a measurement category</strong> from the dropdown menu (Length, Weight, Temperature, etc.).
          </li>
          <li>
            Choose your <strong>source unit</strong> (the unit you're converting from) and <strong>target unit</strong>{" "}
            (the unit you're converting to).
          </li>
          <li>
            Enter the value you want to convert in the <strong>From Value</strong> field.
          </li>
          <li>
            The conversion result will appear automatically in the <strong>Result</strong> field.
          </li>
          <li>
            Use the <strong>swap button</strong> (↔️) to quickly reverse the conversion direction.
          </li>
          <li>
            For currency conversions, click the <strong>Refresh Rates</strong> button to get the latest exchange rates.
          </li>
          <li>
            Click the <strong>Copy</strong> button to copy the conversion result to your clipboard.
          </li>
          <li>
            Add frequently used conversions to <strong>Favorites</strong> for quick access later.
          </li>
          <li>
            View your <strong>Conversion History</strong> to recall previous conversions.
          </li>
        </ol>

        <h2 id="unit-categories" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Calculator className="w-6 h-6 mr-2 text-primary-500" />
          Supported Measurement Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <Ruler className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div>
              <strong>Length:</strong> Convert between meters, kilometers, miles, feet, inches, and other length units
              for distance measurements.
            </div>
          </div>
          <div className="flex items-start">
            <Scale className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div>
              <strong>Weight:</strong> Transform between kilograms, pounds, ounces, tons, and other mass units for
              weight calculations.
            </div>
          </div>
          <div className="flex items-start">
            <Thermometer className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div>
              <strong>Temperature:</strong> Convert between Celsius, Fahrenheit, and Kelvin for accurate temperature
              readings.
            </div>
          </div>
          <div className="flex items-start">
            <Compass className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div>
              <strong>Angle:</strong> Transform between degrees, radians, and gradians for angular measurements in
              mathematics and engineering.
            </div>
          </div>
          <div className="flex items-start">
            <Database className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div>
              <strong>Digital Storage:</strong> Convert between bytes, kilobytes, megabytes, gigabytes, and other data
              storage units.
            </div>
          </div>
          <div className="flex items-start">
            <DollarSign className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div>
              <strong>Currency:</strong> Convert between major world currencies with up-to-date exchange rates for
              financial calculations.
            </div>
          </div>
          <div className="flex items-start">
            <Gauge className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div>
              <strong>Power:</strong> Transform between watts, kilowatts, horsepower, and other power units for energy
              calculations.
            </div>
          </div>
          <div className="flex items-start">
            <Radio className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div>
              <strong>Frequency:</strong> Convert between hertz, kilohertz, megahertz, and other frequency units for
              signal analysis.
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-primary-500" />
          Currency Conversion
        </h2>
        <p className="text-default-600 mb-4">
          Our currency converter provides accurate exchange rates for major world currencies:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">USD</h3>
            <p className="text-xs">US Dollar - The world's primary reserve currency</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">EUR</h3>
            <p className="text-xs">Euro - The official currency of the Eurozone</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">GBP</h3>
            <p className="text-xs">British Pound - The UK's official currency</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">JPY</h3>
            <p className="text-xs">Japanese Yen - Japan's official currency</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">CAD</h3>
            <p className="text-xs">Canadian Dollar - Canada's official currency</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">AUD</h3>
            <p className="text-xs">Australian Dollar - Australia's official currency</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">CNY</h3>
            <p className="text-xs">Chinese Yuan - China's official currency</p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-md mb-1">INR</h3>
            <p className="text-xs">Indian Rupee - India's official currency</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-default-600">
          <div className="flex items-start">
            <Calculator className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div>
              <strong>Multiple Measurement Categories:</strong> Convert units across 8+ different measurement
              categories, from length and weight to digital storage and currency.
            </div>
          </div>
          <div className="flex items-start">
            <Globe className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div>
              <strong>Live Currency Exchange Rates:</strong> Get up-to-date currency conversion with regularly updated
              exchange rates for major world currencies.
            </div>
          </div>
          <div className="flex items-start">
            <Settings2 className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div>
              <strong>Intuitive Interface:</strong> User-friendly design with clear input/output fields and easy unit
              selection for quick conversions.
            </div>
          </div>
          <div className="flex items-start">
            <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div>
              <strong>Favorites System:</strong> Save frequently used conversions to your favorites for quick access and
              improved workflow.
            </div>
          </div>
          <div className="flex items-start">
            <BarChart className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div>
              <strong>Common Conversions:</strong> View common conversion values for quick reference without manual
              calculation.
            </div>
          </div>
          <div className="flex items-start">
            <ArrowRightLeft className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
            <div>
              <strong>Instant Swap:</strong> Quickly reverse conversion direction with a single click to convert back
              and forth between units.
            </div>
          </div>
          <div className="flex items-start">
            <History className="w-4 h-4 mr-2 mt-0.5 text-secondary-500" />
            <div>
              <strong>Conversion History:</strong> Access your previous conversions with the ability to reuse them with
              a single click.
            </div>
          </div>
          <div className="flex items-start">
            <RefreshCw className="w-4 h-4 mr-2 mt-0.5 text-success-500" />
            <div>
              <strong>Auto-Updating Results:</strong> See conversion results update instantly as you type for real-time
              feedback.
            </div>
          </div>
          <div className="flex items-start">
            <Copy className="w-4 h-4 mr-2 mt-0.5 text-warning-500" />
            <div>
              <strong>One-Click Copy:</strong> Easily copy conversion results to clipboard for use in other
              applications.
            </div>
          </div>
          <div className="flex items-start">
            <Zap className="w-4 h-4 mr-2 mt-0.5 text-danger-500" />
            <div>
              <strong>Conversion Formulas:</strong> View the mathematical formula used for each conversion for
              educational purposes and verification.
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-primary-500" />
          Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Laptop className="w-4 h-4 mr-2 text-primary-500" /> Education
            </h3>
            <p className="text-sm">
              Students and teachers can use the converter for math, science, and engineering problems that require unit
              conversions, helping to understand measurement relationships.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Globe className="w-4 h-4 mr-2 text-secondary-500" /> Travel
            </h3>
            <p className="text-sm">
              Travelers can convert currencies, temperatures, distances, and weights when visiting countries that use
              different measurement systems or currencies.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Atom className="w-4 h-4 mr-2 text-success-500" /> Scientific Research
            </h3>
            <p className="text-sm">
              Scientists and researchers can convert between different units of measurement for experiments, data
              analysis, and when collaborating internationally.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-warning-500" /> Finance
            </h3>
            <p className="text-sm">
              Financial analysts and international businesses can convert between currencies for transactions,
              investments, and financial reporting.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Smartphone className="w-4 h-4 mr-2 text-danger-500" /> Everyday Use
            </h3>
            <p className="text-sm">
              Convert measurements for cooking recipes, DIY projects, fitness tracking, and other daily activities that
              involve different units of measurement.
            </p>
          </div>
          <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Database className="w-4 h-4 mr-2 text-primary-500" /> IT & Development
            </h3>
            <p className="text-sm">
              IT professionals can convert between digital storage units when working with file sizes, storage capacity,
              data transfer rates, and system requirements.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
          Advanced Tips
        </h2>
        <div className="bg-default-100/50 dark:bg-default-200/20 p-5 rounded-lg">
          <ul className="space-y-3 text-default-600">
            <li className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Zap className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <strong>Currency Conversion Timing:</strong> For the most accurate currency conversions, refresh the
                rates before making important financial calculations, as exchange rates fluctuate throughout the day.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-secondary-100 dark:bg-secondary-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Clock className="w-4 h-4 text-secondary-500" />
              </div>
              <div>
                <strong>Favorites for Efficiency:</strong> Add your most frequently used conversions to favorites to
                save time, especially for complex unit pairs that you use regularly in your work or studies.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-success-100 dark:bg-success-900/30 p-1 rounded-full mr-3 mt-0.5">
                <Calculator className="w-4 h-4 text-success-500" />
              </div>
              <div>
                <strong>Chained Conversions:</strong> For multi-step conversions, use the history feature to track
                intermediate results, or copy results and use them as new input values for subsequent conversions.
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-warning-100 dark:bg-warning-900/30 p-1 rounded-full mr-3 mt-0.5">
                <RotateCcw className="w-4 h-4 text-warning-500" />
              </div>
              <div>
                <strong>Precision Control:</strong> For scientific or engineering calculations requiring high precision,
                note that the converter maintains six decimal places of precision for accurate results.
              </div>
            </li>
          </ul>
        </div>

        <p className="text-default-600 mt-8">
          Whether you're a student working on assignments, a professional handling international projects, a traveler
          planning a trip abroad, or anyone who needs to convert between different units of measurement, our Advanced
          Unit Converter provides the comprehensive tools you need to perform accurate conversions quickly and
          efficiently. Start using it today to simplify your measurement conversions and ensure precise calculations
          across all your personal and professional needs.
        </p>
      </div>
    </Card>
  )
}
