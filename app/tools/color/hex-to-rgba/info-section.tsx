"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Hash,
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
    ShieldCheck,
    RefreshCw
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionHexToRgba() {
    // Image path
    const imagePath = "/Images/InfosectionImages/HexToRgbaConverterPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Hex to RGBA Converter?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">Hex to RGBA Converter</Link> is a precision utility tailored for web developers, UI designers, and digital artists. While Hex codes are the standard for solid colors, RGBA (Red, Green, Blue, Alpha) is essential for modern web design, allowing you to control <strong>transparency and opacity</strong> with mathematical accuracy.
                </p>
                <p className="text-default-600 mb-4">
                    This tool bridges the gap between static color codes and dynamic design. By offering real-time conversion and an interactive alpha slider, it allows you to transform standard 3 or 6-digit Hex codes into CSS-ready RGBA values instantly. It is the perfect companion for creating overlays, glassmorphism effects, and sophisticated brand palettes.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Hex to RGBA Converter Interface Preview showing hex input and alpha controls"
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
                    How to Use the Hex to RGBA Converter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Hash className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Input Hex Code:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Enter your color code (e.g., #3498db or fff) into the input field. The tool supports both <strong>shorthand (3-digit)</strong> and <strong>standard (6-digit)</strong> formats.
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
                                <strong className="text-default-700">Adjust Alpha/Opacity:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the interactive <strong>Alpha Slider</strong> to set transparency from 0 (fully transparent) to 1 (fully opaque). The RGBA value updates in real-time as you slide.
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
                                <strong className="text-default-700">Preview Results:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Watch the <strong>Live Preview</strong> box change color instantly. This visual feedback ensures your transparency level looks exactly as intended before you use it.
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
                                <strong className="text-default-700">Copy to Clipboard:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click the <strong>Copy icon</strong> next to the RGBA result to grab the CSS-ready string. Use the Reset button (<RefreshCw className="w-3 h-3 inline" />) to clear and start again.
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
                            <strong className="text-default-700">Real-Time Conversion:</strong>
                            <span className="block mt-1">Instant updates as you type or slide, removing the need for manual calculations or "convert" buttons.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MoveRight className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Shorthand Support:</strong>
                            <span className="block mt-1">Fully compatible with 3-digit CSS shorthand (e.g., #06C) and standard 6-digit codes.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Error Handling:</strong>
                            <span className="block mt-1">Intelligent validation warns you of invalid hex strings to ensure your code never breaks.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Transparency Control:</strong>
                            <span className="block mt-1">Fine-tuned alpha channel adjustment with a range of 0 to 1 for perfect layering.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">One-Click Export:</strong>
                            <span className="block mt-1">Quickly copy the exact RGBA string format needed for your CSS files or design tools.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Mobile Optimized:</strong>
                            <span className="block mt-1">Fully responsive touch-friendly slider allows you to convert colors on any device.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for UI Developers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-success-500" /> Glassmorphism
                        </h3>
                        <p className="text-sm">
                            To achieve the "glass" look, use a high alpha value (0.1 - 0.3) on a white or light hex code over a colorful background.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-secondary-500" /> CSS Variables
                        </h3>
                        <p className="text-sm">
                            Store your RGBA results in CSS variables (e.g., --main-bg) to maintain consistent transparency across your entire application.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Contrast Check
                        </h3>
                        <p className="text-sm">
                            Be careful with low alpha values on text; always verify that your resulting RGBA color meets WCAG accessibility guidelines.
                        </p>
                    </div>
                </div>

                {/* Applications Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Monitor className="w-6 h-6 mr-2 text-primary-500" />
                    Real-World Applications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-success-500" /> UI Overlays</h4>
                        <p className="text-xs">Creating semi-transparent modal backdrops or darkened image overlays to make text more readable.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-secondary-500" /> Design Systems</h4>
                        <p className="text-xs">Building cohesive state-based colors (hover, active, focus) using a single base color with varying alpha levels.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Zap className="w-4 h-4 text-warning-500" /> Gradient Depth</h4>
                        <p className="text-xs">Crafting complex gradients that fade from solid colors to transparent for smooth edge transitions.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Stop struggling with manual math and color syntax. Whether you're building a dark mode interface or a vibrant creative site, our Hex to RGBA Converter provides the precision you need. Experience the most efficient way to manage color and transparency in your design workflow today!
                </p>
            </div>
        </Card>
    )
}