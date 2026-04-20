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

export default function InfoSectionHslToHex() {
    // Image path
    const imagePath = "/Images/InfosectionImages/HslToHexConverterPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the HSL to Hex Converter?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">HSL to Hex Converter</Link> is a vital utility for the modern web workflow. While **HSL** (Hue, Saturation, Lightness) provides the most intuitive way for designers to manipulate color—organizing it by shade, intensity, and brightness—**Hexadecimal** remains the industry standard for concise, shareable color codes in CSS and digital brand assets.
                </p>
                <p className="text-default-600 mb-4">
                    This tool bridges the gap between artistic exploration and technical implementation. It allows you to fine-tune colors using HSL sliders and instantly receive the corresponding 6-digit Hex string. Whether you are building a complex UI system or defining brand guidelines, this converter ensures your visual choices are translated into developer-ready code with zero friction.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="HSL to Hex Converter interface showing HSL sliders and hexadecimal output"
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
                    How to Use the HSL to Hex Converter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Target className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Set Your Hue:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Adjust the <strong>Hue slider</strong> (0-359°) to pick your base color from the spectrum. This defines the core color tint you are working with.
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
                                <strong className="text-default-700">Refine Saturation & Lightness:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Saturation</strong> slider to set vibrancy and the <strong>Lightness</strong> slider to determine brightness. The hexadecimal value updates in real-time as you slide.
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
                                <strong className="text-default-700">Verify in Preview:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Check the <strong>Live Color Preview</strong> box to ensure the result matches your vision. The tool calculates the Hex string mathematically based on your HSL coordinates.
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
                                <strong className="text-default-700">Copy Hex Code:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Once satisfied, click the <strong>Copy icon</strong> to grab the Hex string. Use the Reset button (<RefreshCw className="w-3 h-3 inline" />) to start a new conversion immediately.
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
                        <Zap className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Instant Computation:</strong>
                            <span className="block mt-1">High-accuracy mathematical engine that converts HSL inputs into Hex strings with zero latency.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Interactive Mixing:</strong>
                            <span className="block mt-1">Tactile sliders provide a much more intuitive way to find the "perfect" color than typing raw Hex codes.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Hash className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Dual Support:</strong>
                            <span className="block mt-1">Full support and visibility for both HSL and Hex formats, allowing for easy multi-format documentation.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Workflow Optimized:</strong>
                            <span className="block mt-1">One-click clipboard copying for all generated values saves time during development and design sessions.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MoveRight className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Format Education:</strong>
                            <span className="block mt-1">Perfect for learning the relationship between lightness/saturation and hexadecimal intensity.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Fully Responsive:</strong>
                            <span className="block mt-1">Pick, mix, and convert colors on the go with a touch-optimized interface for mobile and tablet.</span>
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
                            <Sun className="w-4 h-4 text-success-500" /> UI States
                        </h3>
                        <p className="text-sm">
                            Need a hover color? Keep Hue and Saturation constant and simply lower the <strong>Lightness</strong> slider by 5-10% to get a perfect darken effect.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Palette className="w-4 h-4 text-secondary-500" /> Perfect Grays
                        </h3>
                        <p className="text-sm">
                            To generate clean Hex codes for neutrals, set Saturation to 0%. Then, use Lightness to find anything from white to deep charcoal.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> CSS Efficiency
                        </h3>
                        <p className="text-sm">
                            Use Hex codes for static branding, but keep HSL values in your documentation to make future adjustments much faster for your design team.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-success-500" /> Web Development</h4>
                        <p className="text-xs">Quickly converting HSL colors from design mockups into compact Hex strings for standard CSS declarations.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-secondary-500" /> Brand Consistency</h4>
                        <p className="text-xs">Translating custom mixed HSL palettes into permanent Hex codes for official brand style guides and asset libraries.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Target className="w-4 h-4 text-warning-500" /> UI Prototyping</h4>
                        <p className="text-xs">Adjusting lightness and saturation to find the perfect accessible color and then exporting the result as a Hex code for Figma.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Ready to take full control of your color palette? Start using our HSL to Hex Converter now and bridge the gap between creative intuition and technical precision. Whether you are building complex web apps or simple landing pages, our tool provides the accuracy you need to make your designs shine.
                </p>
            </div>
        </Card>
    )
}