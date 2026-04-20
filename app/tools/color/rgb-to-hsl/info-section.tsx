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
    Eye
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionRgbToHsl() {
    // Image path
    const imagePath = "/Images/InfosectionImages/RGBToHSLPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the RGB to HSL Converter?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">RGB to HSL Converter</Link> is a specialized utility designed to translate technical color data into human-friendly terms. While screens and hardware operate using **RGB** (Red, Green, Blue), designers and web developers often prefer **HSL** (Hue, Saturation, Lightness) because it aligns with how we naturally perceive color changes.
                </p>
                <p className="text-default-600 mb-4">
                    This advanced tool empowers creators to take static RGB values and convert them into the flexible HSL model. This is particularly valuable for CSS styling, where HSL allows you to programmatically adjust brightness and vibrancy without changing the underlying color shade. Whether you are building a design system or fine-tuning a UI component, this converter provides the precision you need.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="RGB to HSL Converter interface showing interactive sliders and color results"
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
                    How to Use the RGB to HSL Converter?
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
                                Use the <strong>Red, Green, and Blue sliders</strong> (0-255) to mix your desired color. You can also input specific numeric values for exact matching of existing assets.
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
                                <strong className="text-default-700">Real-Time Conversion:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                As you modify the RGB mix, the tool instantly calculates the <strong>Hue (0-359°), Saturation (0-100%), and Lightness (0-100%)</strong> equivalents.
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
                                <strong className="text-default-700">Review Results:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                View the <strong>Color Preview</strong> to see the resulting swatch. This visual feedback ensures that your RGB mix translates into a cohesive HSL profile.
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
                                Click the <strong>Copy icon</strong> to grab either the RGB or HSL strings for your code. Use the Reset button (<RefreshCw className="w-3 h-3 inline" />) to start a new exploration.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Developers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Zero-Latency Conversion:</strong>
                            <span className="block mt-1">Advanced mathematical mapping between additive light (RGB) and perceptual color (HSL) happens instantly.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Intuitive Mixing:</strong>
                            <span className="block mt-1">Tactile sliders and direct inputs provide both creative exploration and surgical technical precision.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Dual Support:</strong>
                            <span className="block mt-1">Full visibility and management of both RGB and HSL values to keep all your project technical data in sync.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Copy className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">One-Click Clipboard:</strong>
                            <span className="block mt-1">Optimized copy buttons for each model allow you to quickly transfer data to CSS files or design tools.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3" >
                        <MoveRight className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Visual Relationship:</strong>
                            <span className="block mt-1">An excellent educational utility for learning how numeric RGB levels correlate to HSL's hue and brightness.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Fully Responsive:</strong>
                            <span className="block mt-1">The interface is built to perform seamlessly on mobile, tablet, and desktop for on-the-go color management.</span>
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
                            <Sun className="w-4 h-4 text-success-500" /> Lightness Logic
                        </h3>
                        <p className="text-sm">
                            Use the HSL result to create <strong>Dark Mode</strong> versions of your colors. Keeping H and S constant while reducing L (Lightness) ensures color consistency.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Palette className="w-4 h-4 text-secondary-500" /> Vibrancy Check
                        </h3>
                        <p className="text-sm">
                            If your RGB color looks "flat," check the <strong>Saturation</strong> percentage in HSL. Colors with saturation below 20% often appear as shades of gray.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Harmony
                        </h3>
                        <p className="text-sm">
                            To find complementary colors, note your Hue (H) value and add 180 degrees. This is much easier to do in HSL than calculating in RGB.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-success-500" /> Web Design</h4>
                        <p className="text-xs">Converting hardware-specific RGB values into HSL for more flexible CSS variable manipulation and dynamic themes.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-secondary-500" /> UI/UX Work</h4>
                        <p className="text-xs">Extracting HSL data to verify that color contrast meets accessibility standards without altering the core brand hue.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Target className="w-4 h-4 text-warning-500" /> Style Guides</h4>
                        <p className="text-xs">Ensuring brand consistency by providing developers with HSL equivalents for all primary RGB assets in a style guide.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Stop manually calculating complex color models. Whether you are a professional web developer working on sophisticated apps or a hobbyist exploring color theory, our RGB to HSL Converter provides the precision you need. Experience a more intuitive way to manage your digital palettes today!
                </p>
            </div>
        </Card>
    )
}