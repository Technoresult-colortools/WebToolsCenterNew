"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
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
    Target,
    Hash,
    Eye,
    Maximize2,
    Droplets,
    MoveRight
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionColorConverter() {
    // Image path
    const imagePath = "/Images/InfosectionImages/ColorConverterPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Color Converter?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">Color Converter</Link> is a comprehensive command center for digital color management. It is a powerful, multi-format utility designed for developers, designers, and enthusiasts to bridge the gap between different color languages, including **HEX, RGB, HSL, HSV, and RGBA**, with surgical precision.
                </p>
                <p className="text-default-600 mb-4">
                    By providing a unified interface for real-time translation, this tool ensures absolute color consistency across web development, graphic design, and brand assets. Whether you are fine-tuning transparency via the alpha channel or converting a complex HSL value into a developer-ready Hex string, our converter transforms technical data into usable visual inspiration instantly.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Color Converter interface showing multi-format inputs and color preview"
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
                    How to Use the Color Converter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Hash className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Select Input Format:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Navigate through the tabs to choose your starting format: <strong>HEX, RGB, HSL, HSV, or RGBA</strong>. This allows you to enter data in whichever format you already have.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Sliders className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Adjust and Refine:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Modify values using the text input fields or the <strong>interactive sliders</strong>. For transparent colors, use the RGBA tab to adjust the <strong>Alpha channel</strong> specifically.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Eye className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Live Preview:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Observe the <strong>Real-time Preview</strong> as it updates instantly. The tool automatically adjusts text color for readability and applies dynamic shadow effects for visual feedback.
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
                                <strong className="text-default-700">Copy & Compare:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Switch between tabs to see the converted values in all other formats. Click <strong>Copy</strong> to grab any value or use <strong>Fullscreen</strong> (<Maximize2 className="w-3 h-3 inline" />) for a detailed view.
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
                        <Zap className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Universal Conversion:</strong>
                            <span className="block mt-1">Seamlessly translate values between HEX, RGB, HSL, HSV, and RGBA formats in one click.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Precision Sliders:</strong>
                            <span className="block mt-1">Tactile sliders provide granular control over color channels, making it easier to find the perfect shade visually.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Droplets className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Alpha Channel Support:</strong>
                            <span className="block mt-1">Full support for transparency via RGBA, allowing you to build overlays and semi-transparent design elements.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <RefreshCw className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Randomized Inspiration:</strong>
                            <span className="block mt-1">Generate random colors instantly to spark new ideas for your project’s palette.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Maximize2 className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Fullscreen Examination:</strong>
                            <span className="block mt-1">Expand your chosen color to the full screen to analyze its impact and legibility at a larger scale.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Mobile Optimized:</strong>
                            <span className="block mt-1">A fully responsive interface that works perfectly across mobile, tablet, and desktop screens.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Color Consistency
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Target className="w-4 h-4 text-success-500" /> Accessibility
                        </h3>
                        <p className="text-sm">
                            Always test your converted colors in the <strong>Fullscreen Preview</strong> to ensure they meet WCAG contrast standards against your planned background.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Droplets className="w-4 h-4 text-secondary-500" /> Glassmorphism
                        </h3>
                        <p className="text-sm">
                            Use the <strong>RGBA</strong> tab to find the exact transparency level (Alpha) needed to create modern "frosted glass" UI effects.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Model Choice
                        </h3>
                        <p className="text-sm">
                            Use <strong>HSL</strong> for artistic fine-tuning (brightness/saturation) and convert it to <strong>Hex</strong> for final CSS implementation.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-success-500" /> UI Development</h4>
                        <p className="text-xs">Rapidly converting color values from design tools (like Figma) into standard-compliant code for web and mobile apps.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-secondary-500" /> Brand Sync</h4>
                        <p className="text-xs">Ensuring color stability across multiple platforms by maintaining a central database of Hex, RGB, and HSL equivalents.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><MoveRight className="w-4 h-4 text-warning-500" /> Cross-Platform</h4>
                        <p className="text-xs">Translating colors between mobile native code (often RGB/RGBA) and web standards (often HEX/HSL) effortlessly.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Stop manually calculating color codes across different models. Whether you are a professional designer working on complex projects or a hobbyist discovering color theory, our Color Converter provides the accuracy and ease you need. Start streamlining your workflow and bring your creative vision to life today!
                </p>
            </div>
        </Card>
    )
}