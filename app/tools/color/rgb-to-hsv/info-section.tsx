"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Palette,
    Sliders,
    Eye,
    Copy,
    Zap,
    MoveRight,
    Smartphone,
    Wand2,
    CheckCircle2,
    Monitor,
    Brush,
    Layers,
    RefreshCw,
    Target,
    Sun
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionRgbToHsv() {
    // Image path
    const imagePath = "/Images/InfosectionImages/RGBToHSVConverter.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the RGB to HSV Converter?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">RGB to HSV Converter</Link> is a specialized tool designed to translate the language of hardware into the language of human perception. While screens use RGB (Red, Green, Blue) to display colors, artists and designers often prefer HSV (Hue, Saturation, Value) because it describes colors in a way that aligns with how we actually see them.
                </p>
                <p className="text-default-600 mb-4">
                    This advanced utility allows web developers, digital artists, and UI designers to easily convert standard RGB values into their HSV equivalents. By converting these values, you gain better control over color properties like intensity and brightness, which is essential for sophisticated image processing, complex color management, and creating harmonious design systems.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="RGB to HSV Converter interface showing RGB sliders and color preview"
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
                    How to Use the RGB to HSV Converter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Sliders className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Adjust RGB Channels:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Red, Green, and Blue sliders</strong> (0-255) to mix your base color. You can see the color evolve in the preview box as you shift each channel.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Eye className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Real-Time Observation:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                As you modify the RGB values, the tool performs a <strong>live conversion</strong>. The resulting Hue (0-359°), Saturation (0-100%), and Value (0-100%) update instantly.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Palette className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Review HSV Values:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Check the <strong>Color Preview section</strong> to see how your RGB mix translates into the H, S, and V components—perfect for understanding color depth and brightness.
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
                                <strong className="text-default-700">Copy Results:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Copy buttons</strong> to grab the RGB or HSV strings for your code. Click the Reset button (<RefreshCw className="w-3 h-3 inline" />) to start a new exploration.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Precision Engine:</strong>
                            <span className="block mt-1">High-accuracy conversion logic ensures that your color data remains consistent across different color models.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Interactive Inputs:</strong>
                            <span className="block mt-1">Tactile sliders and numeric input support provide both intuitive mixing and specific value entry.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Dual Format Support:</strong>
                            <span className="block mt-1">Simultaneously view and manage both RGB and HSV values in one streamlined interface.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Workflow Optimized:</strong>
                            <span className="block mt-1">One-click clipboard copying and clear visual labels make it easy to integrate into your design pipeline.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MoveRight className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Visual Learning:</strong>
                            <span className="block mt-1">An excellent tool for searching and understanding the mathematical relationship between RGB and HSV.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Design:</strong>
                            <span className="block mt-1">Fully optimized for mobile, tablet, and desktop for professional color management anywhere.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Color Analysis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Target className="w-4 h-4 text-success-500" /> Hue Mapping
                        </h3>
                        <p className="text-sm">
                            Convert your RGB to HSV to easily identify the dominant <strong>Hue</strong>. This makes it simple to find complementary colors by adding 180° to the Hue value.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Sun className="w-4 h-4 text-secondary-500" /> Brightness Control
                        </h3>
                        <p className="text-sm">
                            If your RGB color looks "muddy," check the <strong>Saturation</strong> in HSV. Lowering the RGB values equally will lower the HSV "Value" (Brightness).
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> UI States
                        </h3>
                        <p className="text-sm">
                            Once you have the HSV values, keep H and S constant and only adjust "Value" to create perfect hover and active states for your buttons.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-success-500" /> Digital Art</h4>
                        <p className="text-xs">Converting color codes from reference photos into HSV to understand lighting and saturation levels for painting.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-secondary-500" /> UI/UX Design</h4>
                        <p className="text-xs">Standardizing brand colors into HSV to build mathematically consistent color ramps and accessible themes.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Zap className="w-4 h-4 text-warning-500" /> App Development</h4>
                        <p className="text-xs">Using HSV values to programmatically adjust the brightness of a UI component based on user interaction or dark mode settings.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Ready to enhance your color workflow? Start using our RGB to HSV Converter now and experience the ease of precise color conversion with intuitive controls. Whether you are a professional developer working on complex color manipulation or a designer exploring new palettes, our tool provides the accuracy and functionality you need to succeed.
                </p>
            </div>
        </Card>
    )
}