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
    Sun,
    Target
} from "lucide-react"
import Link from "next/link"

export default function InfoSectionHsvToRgb() {
    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the HSV to RGB Converter?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">HSV to RGB Converter</Link> is a professional-grade utility designed for web developers, digital painters, and UI designers. While RGB (Red, Green, Blue) is how screens display color, HSV (Hue, Saturation, Value) is often how humans *think* about color, making it much more intuitive for creative adjustments.
                </p>
                <p className="text-default-600 mb-4">
                    This tool allows you to take the artistic precision of the HSV model—where you pick a color by its shade, intensity, and brightness—and instantly translate it into technical RGB values required for CSS, graphics programming, and digital imaging. Whether you are matching a brand asset or building a dynamic UI theme, this converter ensures perfect color fidelity.
                </p>

                {/* How to Use Section */}
                <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
                    How to Use the HSV to RGB Converter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Target className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Set the Hue (H):</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Adjust the <strong>Hue slider</strong> (0-359°) to pick your base color from the 360-degree color wheel. This defines the core "tint" (red, yellow, blue, etc.).
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
                                <strong className="text-default-700">Adjust Saturation & Value:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Saturation</strong> slider to control color purity (0% is grayscale, 100% is vibrant) and the <strong>Value</strong> slider to set the brightness.
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
                                <strong className="text-default-700">Real-Time Monitoring:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Watch the <strong>Color Preview</strong> update instantly. As you move the sliders, the tool calculates the corresponding Red, Green, and Blue levels in real-time.
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
                                <strong className="text-default-700">Copy and Export:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Copy icon</strong> to grab your results. You can reset all values at any time using the Reset button (<RefreshCw className="w-3 h-3 inline" />) to start fresh.
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
                            <strong className="text-default-700">Instant Computation:</strong>
                            <span className="block mt-1">Advanced mathematical algorithms perform HSV to RGB logic with zero latency for immediate feedback.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Interactive Controls:</strong>
                            <span className="block mt-1">Tactile sliders and numeric inputs allow for both quick exploration and pinpoint accuracy.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Dual Representation:</strong>
                            <span className="block mt-1">View and copy both HSV and RGB values simultaneously to maintain consistency across different tools.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">One-Click Copying:</strong>
                            <span className="block mt-1">Optimized for development workflows—copy individual values or full strings directly to your clipboard.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MoveRight className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Color Relationship:</strong>
                            <span className="block mt-1">A perfect educational tool for understanding how hue, brightness, and intensity translate to screen pixels.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Full Responsiveness:</strong>
                            <span className="block mt-1">The interface scales perfectly across devices, allowing for professional color mixing on the go.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Color Mastery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Sun className="w-4 h-4 text-success-500" /> Brightness vs Value
                        </h3>
                        <p className="text-sm">
                            Keep Saturation high (80%+) while adjusting Value to find vivid highlights. Lower both for realistic shadows.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Palette className="w-4 h-4 text-secondary-500" /> Perfect Neutrals
                        </h3>
                        <p className="text-sm">
                            Set Saturation to 0% to get a perfect grayscale palette. Adjust the Value slider to go from pure black to pure white.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Analogous Colors
                        </h3>
                        <p className="text-sm">
                            To find colors that "match," keep Saturation and Value constant while only moving the Hue slider by 30 degrees.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-success-500" /> Digital Painting</h4>
                        <p className="text-xs">Finding exact RGB codes for brush settings in applications that don't natively use an HSV selector.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-secondary-500" /> UI/UX Design</h4>
                        <p className="text-xs">Building cohesive color systems by adjusting saturation and value across a single hue for various UI states.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Zap className="w-4 h-4 text-warning-500" /> CSS Animations</h4>
                        <p className="text-xs">Converting easy-to-animate HSV logic (rotating through hues) into standard RGB format for web implementation.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Ready to take control of your color palette? Start using our HSV to RGB Converter now and bridge the gap between creative intuition and technical implementation. Whether you're a seasoned developer or an aspiring artist, our tool provides the precision you need to make your designs stand out!
                </p>
            </div>
        </Card>
    )
}