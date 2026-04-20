"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Zap,
    Copy,
    Sparkles,
    ArrowRightLeft,
    Wand2,
    Calculator,
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
    CheckCircle2,
    Monitor,
    Layers,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionUnitConverter() {
    // Image path
    const imagePath = "/Images/InfosectionImages/UnitConverterPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Advanced Unit Converter?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">Advanced Unit Converter</Link> is a comprehensive cross-industry measurement engine. Designed for scientists, engineers, travelers, and students, it serves as a central hub for translating data between disparate systems of measurement with absolute mathematical precision.
                </p>
                <p className="text-default-600 mb-4">
                    Beyond simple arithmetic, this utility handles complex multi-step conversions across categories like <strong>Digital Storage, Power, and Angle</strong>. It also features a real-time <strong>Currency Exchange</strong> engine, ensuring that whether you are calculating the weight of a shipment or the cost of a transaction, you have the most accurate global data at your fingertips.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Advanced Unit Converter interface showing category selection and results"
                                    width={800}
                                    height={400}
                                    className="w-full h-auto object-contain"
                                    unoptimized={true}
                                />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* How to Use Section */}
                <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
                    How to Use the Advanced Unit Converter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Layers className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Select Category & Units:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Choose a category (e.g., Length) from the dropdown. Select your <strong>Source</strong> unit and <strong>Target</strong> unit. Use the <strong>Swap</strong> button (<ArrowRightLeft className="w-3 h-3 inline" />) to quickly reverse the calculation.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Calculator className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Enter Values:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Type the value you want to convert. The results will appear <strong>instantly</strong> in the result field as you type. For currency, hit <strong>Refresh Rates</strong> (<RefreshCw className="w-3 h-3 inline" />) to pull live market data.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <History className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Manage History:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>History</strong> section to recall previous calculations. You can also add frequent conversions to your <strong>Favorites</strong> (<Sparkles className="w-3 h-3 inline" />) for immediate access.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                            4
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Copy className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                <strong className="text-default-700">Copy & Implement:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click the <strong>Copy icon</strong> to grab the result. You can also view the <strong>Mathematical Formula</strong> used to ensure the calculation meets your technical standards.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Unit Categories Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Calculator className="w-6 h-6 mr-2 text-primary-500" />
                    Supported Measurement Categories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-default-600">
                    <div className="border border-default-200 p-3 rounded-lg flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1"><Ruler className="w-4 h-4 text-primary-500" /><strong className="text-default-700">Length</strong></div>
                        <p className="text-xs">Meters, KM, Miles, Feet, Inches, Nautical Miles.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1"><Scale className="w-4 h-4 text-secondary-500" /><strong className="text-default-700">Weight</strong></div>
                        <p className="text-xs">Kilograms, Pounds, Ounces, Grams, Tons.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1"><Thermometer className="w-4 h-4 text-success-500" /><strong className="text-default-700">Temperature</strong></div>
                        <p className="text-xs">Celsius, Fahrenheit, Kelvin, Rankine.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1"><Compass className="w-4 h-4 text-warning-500" /><strong className="text-default-700">Angle</strong></div>
                        <p className="text-xs">Degrees, Radians, Gradians, Arcseconds.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1"><Database className="w-4 h-4 text-danger-500" /><strong className="text-default-700">Digital Data</strong></div>
                        <p className="text-xs">Bytes, MB, GB, TB, Petabytes.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1"><DollarSign className="w-4 h-4 text-primary-500" /><strong className="text-default-700">Currency</strong></div>
                        <p className="text-xs">USD, EUR, GBP, JPY, INR, CAD.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1"><Gauge className="w-4 h-4 text-secondary-500" /><strong className="text-default-700">Power</strong></div>
                        <p className="text-xs">Watts, Kilowatts, Horsepower, BTU.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1"><Radio className="w-4 h-4 text-success-500" /><strong className="text-default-700">Frequency</strong></div>
                        <p className="text-xs">Hertz, KHz, MHz, GHz, THz.</p>
                    </div>
                </div>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Professionals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <RefreshCw className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Live Exchange Engine:</strong>
                            <span className="block mt-1">Real-time currency updates ensuring financial accuracy for international transactions.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Workflow Favorites:</strong>
                            <span className="block mt-1">Bookmark your most complex unit pairs for instant one-click access in future sessions.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <History className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Historical Tracking:</strong>
                            <span className="block mt-1">Access a comprehensive log of your previous conversions to verify multi-step logic.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <BarChart className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Common Multipliers:</strong>
                            <span className="block mt-1">Quick-reference charts for the most standard conversion values in every category.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Formula Transparency:</strong>
                            <span className="block mt-1">View the exact mathematical formula used for every conversion for auditing and education.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Mobile Responsive:</strong>
                            <span className="block mt-1">Perform scientific-grade calculations on any screen, from smartphone to ultra-wide monitor.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Calculation Mastery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-success-500" /> Market Timing
                        </h3>
                        <p className="text-sm">
                            Currency rates fluctuate throughout the day. Refresh the rates <strong>immediately</strong> before making high-value financial calculations.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-secondary-500" /> Chained Logic
                        </h3>
                        <p className="text-sm">
                            For multi-step conversions, use the history log to grab intermediate results and paste them as new source values.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Scientific Sync
                        </h3>
                        <p className="text-sm">
                            The converter maintains <strong>six decimal places</strong> of precision, meeting standards for most engineering and scientific reports.
                        </p>
                    </div>
                </div>

                {/* Use Cases Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Monitor className="w-6 h-6 mr-2 text-primary-500" />
                    Real-World Applications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Globe className="w-4 h-4 text-success-500" /> International Travel</h4>
                        <p className="text-xs">Quickly converting currency, temperatures (C to F), and distances (KM to Miles) while navigating abroad.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Laptop className="w-4 h-4 text-secondary-500" /> IT Management</h4>
                        <p className="text-xs">Calculating server storage requirements by converting between Terabytes, Gigabytes, and Megabits.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Atom className="w-4 h-4 text-warning-500" /> Academic Research</h4>
                        <p className="text-xs">Translating measurement data in scientific papers between Imperial and Metric systems for global collaboration.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    The Advanced Unit Converter is your definitive resource for technical measurement translation. By providing precision data across 8+ categories and live global currency, we help you simplify complex calculations and ensure accuracy in every project. Start converting with confidence today!
                </p>
            </div>
        </Card>
    )
}