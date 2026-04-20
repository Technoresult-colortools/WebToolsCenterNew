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
    MoveRight,
    Eye,
    ShieldCheck
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionHslToRgb() {
    // Image path
    const imagePath = "/Images/InfosectionImages/HSLToRGBPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the HSL to RGB Converter?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">HSL to RGB Converter</Link> is a precision bridge between human-centric design and technical implementation. While **HSL** (Hue, Saturation, Lightness) is the most intuitive way for designers to "think" about color—picking a shade and then adjusting its vibrancy and brightness—**RGB** is the fundamental language of digital screens.
                </p>
                <p className="text-default-600 mb-4">
                    This advanced utility allows web developers, digital artists, and UI designers to translate creative HSL combinations into accurate Red, Green, and Blue values. Whether you are building a dynamic CSS theme or matching colors for a digital painting, this tool ensures your visual intent is perfectly preserved in the final technical output.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="HSL to RGB Converter interface showing HSL sliders and color preview"
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
                    How to Use the HSL to RGB Converter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Target className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Select Your Hue (H):</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Adjust the <strong>Hue slider</strong> (0-359°) to pick your base color from the 360-degree color wheel. This defines the core color tint (Red, Green, Blue, etc.).
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
                                <strong className="text-default-700">Set Saturation & Lightness:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Saturation</strong> slider to control intensity (0% is gray, 100% is pure color) and the <strong>Lightness</strong> slider to determine brightness.
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
                                <strong className="text-default-700">Verify Real-Time Result:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Watch the <strong>Live Preview</strong> update instantly. The tool calculates the Red, Green, and Blue channels mathematically as you modify the HSL inputs.
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
                                <strong className="text-default-700">Copy RGB Values:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Copy icon</strong> to grab your results. Click the Reset button (<RefreshCw className="w-3 h-3 inline" />) to quickly clear your work and start a new conversion.
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
                            <span className="block mt-1">High-accuracy mathematical engine that converts HSL to RGB logic with zero latency.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Tactile Sliders:</strong>
                            <span className="block mt-1">Fine-tuned slider controls allow for subtle adjustments that are impossible with text-only inputs.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Format Consistency:</strong>
                            <span className="block mt-1">Simultaneously view and manage both HSL and RGB values to keep your project documentation synced.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Clipboard Synergy:</strong>
                            <span className="block mt-1">One-click copying for both individual values and full CSS-ready color strings.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MoveRight className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Visual Relationship:</strong>
                            <span className="block mt-1">A perfect educational environment to see how lightness and saturation changes affect RGB levels.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Fully Responsive:</strong>
                            <span className="block mt-1">Perform precise color management sessions on mobile, tablet, or desktop with equal ease.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Palette Control
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Sun className="w-4 h-4 text-success-500" /> Web States
                        </h3>
                        <p className="text-sm">
                            To create hover states in CSS, keep Hue and Saturation constant and only adjust the <strong>Lightness</strong> slider up or down.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Palette className="w-4 h-4 text-secondary-500" /> Grayscale
                        </h3>
                        <p className="text-sm">
                            Need a perfect gray? Set Saturation to 0%. Then use Lightness to go from pure Black (0%) to pure White (100%).
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Harmony
                        </h3>
                        <p className="text-sm">
                            To find "matching" colors, keep Saturation and Lightness the same while only moving the Hue slider in 30° increments.
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
                        <p className="text-xs">Quickly converting HSL logic from a style guide into standard RGB for CSS variables or Canvas drawing APIs.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-secondary-500" /> Accessibility</h4>
                        <p className="text-xs">Fine-tuning lightness to ensure text-on-background contrast meets WCAG standards without changing the base hue.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Target className="w-4 h-4 text-warning-500" /> UI/UX Consistency</h4>
                        <p className="text-xs">Ensuring brand consistency by converting between models when assets are shared across different digital design platforms.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Stop fighting with complicated color math. Whether you are a professional developer working on high-traffic apps or a designer building your first brand kit, our HSL to RGB Converter provides the accuracy and speed you need. Try it out today and streamline your color management workflow!
                </p>
            </div>
        </Card>
    )
}