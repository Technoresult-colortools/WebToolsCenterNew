"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Palette,
    Sliders,
    Zap,
    Copy,
    Smartphone,
    Wand2,
    CheckCircle2,
    Monitor,
    Brush,
    Layers,
    RefreshCw,
    Search,
    Hash,
    Eye,
    Tag,
    Languages
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionColorNameGenerator() {
    // Image path
    const imagePath = "/Images/InfosectionImages/ColorNameGeneratorPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Color Name Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">Color Name Generator</Link> is a refined digital dictionary for your visual palette. It is a sophisticated tool designed to help designers, developers, and color enthusiasts identify and articulate the exact names of millions of colors while providing accurate data across various technical formats.
                </p>
                <p className="text-default-600 mb-4">
                    Beyond just naming, this tool acts as a bridge between visual intuition and technical precision. By combining real-time API-driven name retrieval with a versatile color selection interface, it allows you to transform abstract hex codes into recognizable identities like "Pacific Blue" or "Sunset Orange." It is the perfect companion for building brand guidelines, improving design communication, and exploring the vast world of color.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Color Name Generator interface showing color selection and name generation"
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
                    How to Use the Color Name Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Hash className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Choose Your Input Format:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the tabs to select your preferred format: <strong>HEX, RGB, or HSL</strong>. Type your color value directly into the input field for instant identification.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Palette className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Visual Selection:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Alternatively, use the <strong>integrated color picker</strong> for visual exploration or click the <strong>Random</strong> (<RefreshCw className="w-3 h-3 inline" />) button for instant inspiration.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Search className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Automatic Identification:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                The name is typically generated <strong>automatically</strong>. If not, click "Generate Color Name" to fetch the specific identity and technical profile of your chosen shade.
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
                                Use the <strong>Copy icon</strong> to grab the color name or any technical value (HEX/RGB/HSL) to use directly in your design software or source code.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Creatives
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Tag className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Intelligent Naming:</strong>
                            <span className="block mt-1">Real-time retrieval of recognized color names using a high-fidelity external API.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <RefreshCw className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Randomized Exploration:</strong>
                            <span className="block mt-1">Instantly discover new colors and their unique names with a single click of the randomizer.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multi-Format Engine:</strong>
                            <span className="block mt-1">Accurate parsing and conversion for HEX, RGB, and HSL values in one unified interface.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Advanced Visual Picker:</strong>
                            <span className="block mt-1">A highly responsive visual interface for pinpointing the exact color shade you desire.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Contrast Optimized Preview:</strong>
                            <span className="block mt-1">Dynamic text overlay that adjusts based on the background color for perfect readability.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Seamlessly Responsive:</strong>
                            <span className="block mt-1">Fully optimized for desktop and mobile, allowing for color naming sessions anywhere.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips & Best Practices
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Languages className="w-4 h-4 text-success-500" /> Human Naming
                        </h3>
                        <p className="text-sm">
                            Use the generated names in your <strong>Brand Style Guide</strong>. It's much easier to communicate "Deep Ocean" than "#000080" to non-technical stakeholders.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-secondary-500" /> Variation Check
                        </h3>
                        <p className="text-sm">
                            Experiment with slight adjustments to HSL values to see how the name shifts—this is a great way to find the "sweet spot" for a specific brand mood.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Dev Efficiency
                        </h3>
                        <p className="text-sm">
                            Use the copy feature to get all formats (HEX/RGB/HSL) at once to keep your CSS variables and documentation perfectly synchronized.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-success-500" /> Brand Identity</h4>
                        <p className="text-xs">Finding memorable and professional names for brand color palettes to enhance marketing and design documentation.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-secondary-500" /> UI Development</h4>
                        <p className="text-xs">Providing descriptive labels for color variables in design systems to improve collaboration between designers and engineers.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Search className="w-4 h-4 text-warning-500" /> Content Creation</h4>
                        <p className="text-xs">Identifying specific shades for copywriting or product descriptions that require evocative and accurate color adjectives.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    The Color Name Generator is more than just a tool—it's a gateway to color exploration and a valuable asset in any creative workflow. Whether you're a professional designer or a curious artist, identifying colors by name adds a layer of depth and clarity to your projects. Start naming your world today!
                </p>
            </div>
        </Card>
    )
}