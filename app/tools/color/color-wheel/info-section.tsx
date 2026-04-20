"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Palette,
    Sliders,
    Zap,
    Download,
    Copy,
    Smartphone,
    Wand2,
    CheckCircle2,
    Monitor,
    Brush,
    Layers,
    RefreshCw,
    Sun,
    Target,
    Eye,
    Code,
    MousePointerClick
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionColorWheel() {
    // Image path
    const imagePath = "/Images/InfosectionImages/ColorWheelPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Color Wheel?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">Color Wheel</Link> is a foundational instrument for any creative workflow. It is an advanced mathematical visualization of color theory, designed to help designers, developers, and artists discover perfect color harmonies and understand the complex relationships between different shades with surgical precision.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are building a professional brand identity, a user-friendly web interface, or a digital illustration, this tool offers an intuitive way to explore color spaces. By interacting with the wheel, you can instantly generate sophisticated palettes—from bold triadic schemes to subtle monochromatic themes—bridging the gap between raw inspiration and scientific harmony.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Interactive Color Wheel interface showing harmony selections and lightness controls"
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
                    How to Use the Color Wheel?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <MousePointerClick className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Select Base Color:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click or drag within the <strong>Interactive Wheel</strong> to pick your core color. Alternatively, use the custom input field to enter a specific HEX, RGB, or HSL value.
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
                                <strong className="text-default-700">Choose Harmony Mode:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Select a <strong>Harmony Type</strong> (Complementary, Analogous, Triadic, etc.). The tool will automatically calculate and display the matching colors based on color theory.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Sun className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Refine Lightness:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Lightness slider</strong> to modify the overall brightness of your palette. You can also click any generated color to set it as the new primary base.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                            4
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Download className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                <strong className="text-default-700">Export Palette:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Copy buttons</strong> to grab individual values, or click <strong>Download</strong> to save your entire harmonious palette as a PNG image for your records.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Professionals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Interactive Selection:</strong>
                            <span className="block mt-1">A high-performance visual wheel that responds instantly to click and drag gestures.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-Time Harmonies:</strong>
                            <span className="block mt-1">Instant calculation of Complementary, Analogous, Triadic, and Split-Complementary schemes.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Lightness Control:</strong>
                            <span className="block mt-1">Fine-tune the luminosity of your entire palette to match specific UI moods or print requirements.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multi-Format Copying:</strong>
                            <span className="block mt-1">Quick-copy functionality for HEX, RGB, and HSL to streamline your development workflow.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Download className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Image Export:</strong>
                            <span className="block mt-1">Save your generated color combinations as PNG files for brand guides or style documentation.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Device Optimized:</strong>
                            <span className="block mt-1">A fully responsive interface that works perfectly across mobile, tablet, and desktop screens.</span>
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
                            <Eye className="w-4 h-4 text-success-500" /> Contrast Focus
                        </h3>
                        <p className="text-sm">
                            Always test your wheel-generated colors for text legibility. Ensure the contrast ratio between your primary and secondary colors meets WCAG standards.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-secondary-500" /> Monochromatic
                        </h3>
                        <p className="text-sm">
                            For a professional and "clean" UI, use <strong>Monochromatic</strong> harmony. It creates depth without overwhelming the user with too many colors.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Brand Sync
                        </h3>
                        <p className="text-sm">
                            Input your core brand HEX first, then explore <strong>Analogous</strong> harmonies to find the perfect accent colors for icons and borders.
                        </p>
                    </div>
                </div>

                {/* Integration Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Monitor className="w-6 h-6 mr-2 text-primary-500" />
                    Workflow Integration
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Code className="w-4 h-4 text-success-500" /> CSS Variables</h4>
                        <p className="text-xs">Export your wheel harmonies directly into CSS variables or Tailwind configs for consistent theme management.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-secondary-500" /> Graphic Design</h4>
                        <p className="text-xs">Import your PNG palettes into Adobe Suite or Figma to ensure print and digital assets share the same scientific harmony.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><RefreshCw className="w-4 h-4 text-warning-500" /> Style Guides</h4>
                        <p className="text-xs">Use the wheel to build internal design systems that provide primary, secondary, and tertiary color rules for your organization.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    The Color Wheel is more than just a tool—it's a playground for creative exploration. By combining mathematical precision with visual intuition, you can build cohesive color systems that elevate your digital projects. Start exploring harmonies and bring your vision to life today!
                </p>
            </div>
        </Card>
    )
}