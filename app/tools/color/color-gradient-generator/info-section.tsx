"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Palette,
    Zap,
    Maximize2,
    Download,
    RefreshCw,
    Layers,
    Wand2,
    CheckCircle2,
    Monitor,
    Brush,
    Smartphone,
    Compass,
    PieChart,
    Move
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionColorGradientGenerator() {
    // Image path
    const imagePath = "/Images/InfosectionImages/ColorGradientGeneratorPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Color Gradient Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">Color Gradient Generator</Link> is a state-of-the-art design laboratory for creating high-performance CSS visuals. It is a powerful and intuitive tool engineered for web developers, UI designers, and creative professionals to build stunning transitions and complex background effects with mathematical precision.
                </p>
                <p className="text-default-600 mb-4">
                    Moving beyond simple color fades, this generator supports <strong>Linear, Radial, and Conic</strong> gradient types, offering a sophisticated experience for both beginners and experts. By providing real-time code generation and high-resolution exports, it bridges the gap between creative visual exploration and production-ready implementation.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Color Gradient Generator Interface Preview showing gradient controls and preview"
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
                    How to Use the Color Gradient Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Compass className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Define Gradient Type & Geometry:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Choose between <strong>Linear, Radial, or Conic</strong>. For linear and conic modes, use the slider to adjust the <strong>Angle</strong>. For radial/conic, set the <strong>Center point (X/Y)</strong> and customize the shape and size.
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
                                <strong className="text-default-700">Manage Color Stops:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Add or remove up to <strong>5 color stops</strong>. Use the color picker for each stop to select a shade, then fine-tune its <strong>percentage position</strong> to create smooth or abrupt transitions.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Maximize2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Preview & Randomize:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Toggle the <strong>Repeating Gradient</strong> switch for patterns. Use the <strong>Fullscreen mode</strong> to see your background at scale, or click <strong>Random</strong> (<RefreshCw className="w-3 h-3 inline" />) for instant design inspiration.
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
                                <strong className="text-default-700">Copy CSS or Export Image:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Once satisfied, click <strong>Copy CSS</strong> to grab the production-ready code, or <strong>Download PNG</strong> to export a high-resolution asset for graphic design tools.
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
                        <PieChart className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Conic Gradient Engine:</strong>
                            <span className="block mt-1">Full support for advanced conic gradients, perfect for creating pie charts, circular progress indicators, and unique textures.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multi-Stop Complexity:</strong>
                            <span className="block mt-1">Support for up to 5 distinct color stops, allowing for rich, layered, and high-fidelity transitions.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Move className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Coordinate Precision:</strong>
                            <span className="block mt-1">Surgical control over center points (X/Y) for radial and conic modes to create asymmetrical focal points.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-Time CSS Gen:</strong>
                            <span className="block mt-1">Production-ready CSS code is generated instantly as you move every slider and picker.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Download className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">High-Res PNG Export:</strong>
                            <span className="block mt-1">Convert your CSS designs into high-quality image assets for use in Figma, Photoshop, or social media.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Device Agnostic:</strong>
                            <span className="block mt-1">Fully responsive touch-friendly interface for building gradients on mobile, tablet, or desktop.</span>
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
                            <Layers className="w-4 h-4 text-success-500" /> Pattern Creation
                        </h3>
                        <p className="text-sm">
                            Use the <strong>Repeating Gradient</strong> option with very close color stop positions (e.g., 0% and 5%) to create striped patterns or textures.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <PieChart className="w-4 h-4 text-secondary-500" /> Hard Stops
                        </h3>
                        <p className="text-sm">
                            To create a "sharp" edge between colors rather than a fade, set two different colors to the exact same percentage position.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Fullscreen Check
                        </h3>
                        <p className="text-sm">
                            Always test your gradient in <strong>Fullscreen Preview</strong> to ensure the banding doesn't become too obvious on larger 4K displays.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Brush className="w-4 h-4 text-success-500" /> Hero Sections</h4>
                        <p className="text-xs">Creating eye-catching, high-performance backgrounds for website landing pages that scale perfectly across all viewports.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><PieChart className="w-4 h-4 text-secondary-500" /> UI Components</h4>
                        <p className="text-xs">Using conic gradients to build modern circular progress bars, analytics pie charts, or complex loading spinners.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-warning-500" /> Image Overlays</h4>
                        <p className="text-xs">Generating semi-transparent gradients to layer over photography to improve text legibility and brand consistency.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Whether you are designing a high-conversion landing page or developing assets for print materials, the Color Gradient Generator provides the technical power you need to bring your visual ideas to life. Start discovering new possibilities and elevate your design workflow with professional gradients today!
                </p>
            </div>
        </Card>
    )
}