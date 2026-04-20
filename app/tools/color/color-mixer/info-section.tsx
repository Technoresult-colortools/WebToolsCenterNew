"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Palette,
    Sliders,
    Zap,
    Maximize2,
    RefreshCw,
    Layers,
    Wand2,
    CheckCircle2,
    Monitor,
    Brush,
    Paintbrush,
    Smartphone,
    Target
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionColorMixer() {
    // Image path
    const imagePath = "/Images/InfosectionImages/ColorMixerPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Color Mixer?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">Color Mixer</Link> as your personal digital laboratory for color exploration. It is a powerful instrument designed for designers, developers, and artists to create custom color blends, generate seamless palettes, and bridge the gap between different color formats with surgical precision.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are building a complex UI design system or searching for the perfect gradient for a brand identity, the Color Mixer provides a high-fidelity interface. With support for linear and radial blending, real-time updates, and a fullscreen preview mode, it transforms simple color selection into a comprehensive creative process.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Color Mixer Interface Preview showing color inputs, gradient preview, and generated palette"
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
                    How to Use the Color Mixer?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Paintbrush className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Select Base Colors:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Choose your <strong>Start and End colors</strong> using the intuitive color pickers or by entering specific Hex codes directly.
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
                                <strong className="text-default-700">Configure Blend Settings:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Adjust the <strong>number of steps</strong> to control the granularity of your blend and choose between <strong>Linear or Radial</strong> blending modes for different visual effects.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Zap className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Generate & Refine:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click <strong>"Mix Colors"</strong> to see your palette. Switch to the Palette tab to view colors in HEX, RGB, HSL, or CMYK formats. Use the <strong>"Random Color"</strong> button for instant inspiration.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                            4
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Maximize2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                <strong className="text-default-700">Preview & Export:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Fullscreen mode</strong> to visualize your gradient at scale. Click any swatch to <strong>copy its value</strong> instantly to your clipboard.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Creators
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Dynamic Gradients:</strong>
                            <span className="block mt-1">Generate perfectly calculated steps between any two colors with real-time visual updates.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <RefreshCw className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Format Versatility:</strong>
                            <span className="block mt-1">Full support for HEX, RGB, HSL, and CMYK, ensuring compatibility with all design and dev tools.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Maximize2 className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Fullscreen Immersion:</strong>
                            <span className="block mt-1">Visualize your color blends in a dedicated distraction-free preview to test background aesthetics.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Wand2 className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Smart Suggestions:</strong>
                            <span className="block mt-1">Access popular color mixes or use the randomizer to discover unique combinations you might not have considered.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Granular Control:</strong>
                            <span className="block mt-1">Set specific step counts to create anything from a simple 3-color palette to a complex 20-step gradient.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Interface:</strong>
                            <span className="block mt-1">Mix colors seamlessly across desktop, tablet, and mobile with a touch-optimized UI.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips & Design Advice
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Target className="w-4 h-4 text-success-500" /> Step Mastery
                        </h3>
                        <p className="text-sm">
                            Use 3-5 steps for a functional UI palette (primary, secondary, accent) or 10+ steps for smooth CSS background transitions.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Palette className="w-4 h-4 text-secondary-500" /> Radial Dynamics
                        </h3>
                        <p className="text-sm">
                            Switch to Radial mode when designing circular UI components like buttons, dials, or profile badges for a more natural light source feel.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> CSS Context
                        </h3>
                        <p className="text-sm">
                            Use the Fullscreen preview to check if text overlays will be legible against your mixed colors before implementing them in your code.
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
                        <p className="text-xs">Generating transitional shades between brand colors to create consistent hover and active states for interactive elements.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Paintbrush className="w-4 h-4 text-secondary-500" /> Brand Consistency</h4>
                        <p className="text-xs">Ensuring color relationships remain identical when converting a print logo (CMYK) to its digital gradient equivalent.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-warning-500" /> Data Visualization</h4>
                        <p className="text-xs">Creating distinct color ramps for charts and graphs that help users distinguish between different data intensities.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    The Color Mixer is more than just a tool—it is a playground for exploration. Whether you are a professional developer building a complex design system or a creative enthusiast discovering color theory, our platform provides the power to bring your visual ideas to life. Start mixing and discover your perfect palette today!
                </p>
            </div>
        </Card>
    )
}