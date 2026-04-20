"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Printer,
    Monitor,
    Sliders,
    Eye,
    Copy,
    Zap,
    MoveRight,
    Smartphone,
    Wand2,
    CheckCircle2,
    Brush,
    Layers,
    RefreshCw,
    Hash,
    AlertTriangle
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionCmykToRgb() {
    // Image path
    const imagePath = "/Images/InfosectionImages/CMYKToRGBPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the CMYK to RGB Converter?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">CMYK to RGB Converter</Link> is a precision bridge between the world of physical print and digital displays. CMYK (Cyan, Magenta, Yellow, and Key/Black) is a subtractive color model used for ink and paper, while RGB is an additive model used for screens. Translating between them accurately is critical for maintaining brand consistency across all mediums.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are an illustrator bringing a print sketch into a digital workspace or a designer adapting a brochure for social media, this tool ensures your colors remain vibrant and faithful. It calculates the complex mathematical shift from ink-based percentages to pixel-based light values, providing instant HEX and RGB results for your digital assets.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="CMYK to RGB Converter interface showing CMYK sliders, RGB output, and color preview"
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
                    How to Use the CMYK to RGB Converter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Sliders className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Set CMYK Percentages:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Adjust the sliders for <strong>Cyan, Magenta, Yellow, and Black</strong> (0-100%). These represent the ink density levels used in professional printing.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Zap className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Instant Digital Mapping:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                The tool instantly maps these subtractive colors to the <strong>RGB spectrum</strong>. Watch the live preview update to see how the ink color will appear as digital light.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Hash className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">View HEX & RGB:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                The converted <strong>RGB values and HEX codes</strong> are displayed in the results section. This allows you to immediately use the color in CSS, Photoshop, or Canva.
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
                                <strong className="text-default-700">Copy & Reset:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click the <strong>Copy buttons</strong> to save the values to your clipboard. Use the Reset button (<RefreshCw className="w-3 h-3 inline" />) to clear the palette and start a new conversion.
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
                        <Printer className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Print-to-Web Precision:</strong>
                            <span className="block mt-1">Uses standardized algorithms to ensure CMYK percentages translate as accurately as possible to sRGB.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Monitor className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multi-Format Output:</strong>
                            <span className="block mt-1">Generates RGB values and HEX strings simultaneously for a comprehensive development workflow.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Live Visual Feedback:</strong>
                            <span className="block mt-1">A real-time color swatch allows you to verify the color visually before copying the technical data.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">One-Click Clipboard:</strong>
                            <span className="block mt-1">Optimized buttons for each color format allow you to copy specific values without highlighting text.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MoveRight className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Cross-Platform Sync:</strong>
                            <span className="block mt-1">Perfect for syncing design assets between print-focused tools like InDesign and web tools like Figma.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Mobile Friendly:</strong>
                            <span className="block mt-1">A responsive interface that works perfectly on any device, ideal for on-site client meetings.</span>
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
                            <AlertTriangle className="w-4 h-4 text-warning-500" /> Gamut Warnings
                        </h3>
                        <p className="text-sm">
                            RGB can display more colors than CMYK. When converting, vibrant digital colors may look "muted" in print, but converting CMYK to RGB usually results in a perfect match.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-secondary-500" /> Rich Black
                        </h3>
                        <p className="text-sm">
                            In print, 100% K is "Flat Black." To get a "Rich Black" on screen, use the converter to see how adding C, M, and Y affects the digital HEX code.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-success-500" /> Screen Sync
                        </h3>
                        <p className="text-sm">
                            Always check your converted colors on a calibrated monitor. RGB light can vary based on brightness settings, while CMYK is a fixed ink value.
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
                        <p className="text-xs">Taking a logo designed for business cards (CMYK) and finding the exact HEX code for a company website.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-secondary-500" /> Digital Marketing</h4>
                        <p className="text-xs">Adapting magazine advertisements into digital banners while ensuring the color palette remains identical.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Printer className="w-4 h-4 text-warning-500" /> Asset Archiving</h4>
                        <p className="text-xs">Documenting print-based brand guidelines into a digital CSS framework for internal development teams.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Stop guessing how your print work will translate to the digital screen. Whether you are a professional designer working on cross-media projects or an artist exploring color theory, our CMYK to RGB Converter provides the precision you need. Experience the power of accurate color translation and enhance your design workflow today!
                </p>
            </div>
        </Card>
    )
}