"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Layers,
    Move,
    Sliders,
    Palette,
    Zap,
    Code,
    Smartphone,
    Maximize,
    RotateCcw,
    CheckCircle2,
    Box,
    Scissors,
    Link as LinkIcon,
    Link2Off,
    Monitor
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionBorderRadius() {
    // Image path
    const imagePath = "/Images/InfosectionImages/CSSBorderRadiusPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Enhanced Border Radius Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">Enhanced Border Radius Generator</Link> as a digital sculpting tool for your UI components. In modern web design, the difference between a "standard" look and a "premium" feel often lies in the curves. This tool allows you to move beyond simple rounded squares to create organic, fluid shapes that define the character of your interface.
                </p>
                <p className="text-default-600 mb-4">
                    By providing granular control over every single corner, this generator bridges the gap between basic CSS and advanced "blob" or "pill" designs. Whether you are crafting a perfect circle for a profile image or a complex asymmetric card, you can visualize the results in real-time and export production-ready code instantly.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Enhanced Border Radius Generator Interface Preview"
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
                    How to Use the Border Radius Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Scissors className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Sculpt Your Corners:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Corners</strong> tab to adjust each radius individually. Toggle the <strong>Link</strong> (<LinkIcon className="w-3 h-3 inline" />) icon to sync all corners at once, or <strong>Unlink</strong> (<Link2Off className="w-3 h-3 inline" />) for asymmetric designs.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Box className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Customize the Box:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Move className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Dimensions & Background:</strong>
                                        <span className="text-default-600 ml-1">Switch to the <strong>Box</strong> tab to modify the element's width, height, and color to match your design theme.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Palette className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Add Borders:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                In the <strong>Border</strong> tab, adjust the stroke width, choose a style (Solid, Dashed, Dotted), and pick a color to outline your newly curved shape.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                            4
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Code className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                <strong className="text-default-700">Export & Implement:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Watch your changes in <strong>Fullscreen</strong> (<Maximize className="w-3 h-3 inline" />) and then copy the generated CSS or download the file to drop it straight into your code.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Modern UI
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Individual Corner Control:</strong>
                            <span className="block mt-1">
                                Independently adjust the Top-Left, Top-Right, Bottom-Left, and Bottom-Right radii for total creative freedom.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multi-Unit Support:</strong>
                            <span className="block mt-1">
                                Seamlessly switch between <strong>px, %, em, and rem</strong> to ensure your design is responsive and accessible.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Monitor className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-time Preview:</strong>
                            <span className="block mt-1">
                                Every slider movement is reflected instantly on the canvas, allowing for rapid visual iteration.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Palette className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Advanced Border Styling:</strong>
                            <span className="block mt-1">
                                Go beyond basic radii with fully customizable border widths, styles, and color options.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Clean CSS Handoff:</strong>
                            <span className="block mt-1">
                                Get highly optimized CSS with syntax highlighting that is ready for copy-pasting into any stylesheet.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive & Lightweight:</strong>
                            <span className="block mt-1">
                                Pure CSS shapes replace heavy images, improving your site’s performance and SEO rankings.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Box className="w-4 h-4 mr-2 text-primary-500" /> The "Circle" Hack
                        </h3>
                        <p className="text-sm">
                            To create a perfect circle or pill shape, set your border-radius to <strong>50%</strong> or a very large px value (e.g., 999px).
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <RotateCcw className="w-4 h-4 mr-2 text-secondary-500" /> Blob Shapes
                        </h3>
                        <p className="text-sm">
                            Unlink the corners and use different percentages for each to create "organic blobs," a popular trend in modern landing pages.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-success-500" /> Consistency
                        </h3>
                        <p className="text-sm">
                            Use <strong>rem</strong> or <strong>em</strong> units if you want your corners to scale proportionally with the user's font size settings.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to elevate your designs? Start experimenting with the sliders, explore asymmetric curves, and see how much personality a simple border radius can add to your next web project!
                </p>
            </div>
        </Card>
    )
}