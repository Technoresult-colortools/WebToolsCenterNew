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
    Target,
    Sun,
    Hash,
    Eye,
    MoveRight
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionHsvToHex() {
    // Image path
    const imagePath = "/Images/InfosectionImages/HsvToHexConverterPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the HSV to Hex Converter?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">HSV to Hex Converter</Link> is a powerful bridge between artistic intuition and digital implementation. While **HSV** (Hue, Saturation, Value) is the most natural way for humans to navigate the color space—defining a color by its shade, vibrancy, and brightness—**Hexadecimal** is the universal language of web development and digital design.
                </p>
                <p className="text-default-600 mb-4">
                    This advanced utility allows you to fine-tune your visual choices using a human-friendly model and instantly receive the precise 6-digit code required for CSS, brand assets, and UI components. Whether you are creating a cohesive color scheme for a web app or exploring shadows and highlights for digital art, this tool transforms visual inspiration into technical data.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="HSV to Hex Converter interface showing interactive sliders and color results"
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
                    How to Use the HSV to Hex Converter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Target className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Define the Hue:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Adjust the <strong>Hue slider</strong> (0-359°) to select your base tint from the color wheel. This determines the primary shade (red, green, blue, etc.).
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
                                <strong className="text-default-700">Set Vibrancy and Brightness:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Saturation</strong> slider to set color intensity and the <strong>Value</strong> slider to control brightness. The Hex code re-calculates instantly with every move.
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
                                <strong className="text-default-700">Monitor Live Preview:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Watch the <strong>Visual Preview</strong> box update in real-time. This provides immediate feedback so you can see exactly how the color looks on screen.
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
                                <strong className="text-default-700">Export Hex Result:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click the <strong>Copy icon</strong> to grab the Hex string for your clipboard. Use the Reset button (<RefreshCw className="w-3 h-3 inline" />) to clear all values and start again.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Designers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Live Mathematical Conversion:</strong>
                            <span className="block mt-1">Instant, zero-latency conversion between HSV and Hexadecimal formats as you interact with the tool.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Interactive Mixing:</strong>
                            <span className="block mt-1">Tactile slider controls allow for subtle adjustments that are far more intuitive than typing raw codes.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Hash className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Universal Format Support:</strong>
                            <span className="block mt-1">Full visibility of both HSV and Hex values, ensuring compatibility with all major design and dev tools.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">One-Click Clipboard:</strong>
                            <span className="block mt-1">Optimized copy functionality for rapid integration into your CSS files, Figma documents, or Brand Kits.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MoveRight className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Visual Insights:</strong>
                            <span className="block mt-1">The perfect educational tool to visualize the relationship between brightness/vibrancy and hex intensities.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Mobile Responsive:</strong>
                            <span className="block mt-1">A touch-optimized UI that allows you to manage color properties accurately on mobile, tablet, or desktop.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Color Precision
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Sun className="w-4 h-4 text-success-500" /> Shadow Mapping
                        </h3>
                        <p className="text-sm">
                            To find the perfect shadow color for a UI element, keep the Hue and Saturation constant and simply lower the <strong>Value</strong> slider by 10-20%.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Palette className="w-4 h-4 text-secondary-500" /> Perfect Neutrals
                        </h3>
                        <p className="text-sm">
                            Need a clean grayscale Hex code? Set Saturation to 0%. Then, use the Value slider to navigate from pure black to pure white.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Brand Sync
                        </h3>
                        <p className="text-sm">
                            Document both HSL/HSV and Hex in your style guides. Use the Hex for code, but use the HSV values to explain the "feel" of the brand.
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
                        <p className="text-xs">Quickly converting HSV-based color logic from design mockups into concise Hex strings for standard CSS styles.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-secondary-500" /> Style Guides</h4>
                        <p className="text-xs">Ensuring brand consistency by translating custom mixed HSV palettes into permanent Hex codes for official documentation.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Target className="w-4 h-4 text-warning-500" /> Accessibility</h4>
                        <p className="text-xs">Adjusting brightness (Value) to find a high-contrast version of your brand color that meets web accessibility standards.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Ready to bridge the gap between creative intuition and technical precision? Start using our HSV to Hex Converter now and take full control of your digital palette. Whether you are building complex web applications or refining your personal brand, our tool provides the accuracy you need to make your designs shine.
                </p>
            </div>
        </Card>
    )
}