"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Palette,
    Sliders,
    MousePointerClick,
    Eye,
    Zap,
    Code,
    Smartphone,
    Maximize,
    CheckCircle2,
    Layers,
    Move,
    Shuffle,
    RefreshCw
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionGradient() {
    // Image path
    const imagePath = "/Images/InfosectionImages/CSSGradientPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the CSS Gradient Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">CSS Gradient Generator</Link> as a digital mixing palette for your website's atmosphere. Gradients are no longer just simple color fades; they are a sophisticated way to add depth, light, and energy to buttons, backgrounds, and headers without the overhead of heavy image files.
                </p>
                <p className="text-default-600 mb-4">
                    This tool bridges the gap between complex mathematical CSS declarations and your creative vision. Whether you need a subtle <strong>Linear</strong> transition, a glowing <strong>Radial</strong> sunburst, or a modern <strong>Conic</strong> sweep, our generator provides an interactive playground to experiment with up to five color stops and real-time positioning.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="CSS Gradient Generator Interface Preview"
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
                    How to Use the CSS Gradient Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Layers className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Select Your Gradient Type:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Choose between <strong>Linear</strong> (straight line), <strong>Radial</strong> (circular/elliptical), or <strong>Conic</strong> (pie-chart style) gradients to set your base structure.
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
                                <strong className="text-default-700">Refine the Geometry:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Move className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Angles & Positioning:</strong>
                                        <span className="text-default-600 ml-1">Use the angle slider for linear flows or the X/Y sliders to pin the center point for radial and conic effects.</span>
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
                                <strong className="text-default-700">Blend Your Colors:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Add up to 5 color stops. Adjust their individual <strong>Position</strong> and <strong>Transparency</strong>. Stuck? Hit <strong>Random Gradient</strong> (<Shuffle className="w-3 h-3 inline" />) for instant inspiration!
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
                                <strong className="text-default-700">Export:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Toggle <strong>Repeating Gradient</strong> for patterns, inspect your work in <strong>Fullscreen</strong> (<Maximize className="w-3 h-3 inline" />), and then copy or download the production-ready CSS code.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Triple Gradient Types:</strong>
                            <span className="block mt-1">
                                Full support for modern <code>linear-gradient</code>, <code>radial-gradient</code>, and the trendy <code>conic-gradient</code>.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Palette className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multi-Stop Precision:</strong>
                            <span className="block mt-1">
                                Manage up to 5 distinct color stops with hex input and opacity control for complex, professional blending.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Move className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Advanced Positioning:</strong>
                            <span className="block mt-1">
                                Pinpoint the exact center or angle of your gradient to highlight specific UI elements or text.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MousePointerClick className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Interactive Preview:</strong>
                            <span className="block mt-1">
                                Instantly visualize changes on a live canvas with a transparency toggle to debug alpha channels.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Developer Handoff:</strong>
                            <span className="block mt-1">
                                Generates clean, standard-compliant CSS with syntax highlighting for immediate use in your stylesheets.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive & Fast:</strong>
                            <span className="block mt-1">
                                CSS gradients replace image assets, reducing your page weight and keeping your design crisp at any resolution.
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
                            <RefreshCw className="w-4 h-4 mr-2 text-primary-500" /> Repeating Patterns
                        </h3>
                        <p className="text-sm">
                            Use the <strong>Repeating</strong> toggle with color stops placed close together (e.g., 0% and 10%) to create stripe or ring effects.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Eye className="w-4 h-4 mr-2 text-secondary-500" /> Accessibility
                        </h3>
                        <p className="text-sm">
                            Always test your text color against the darkest and lightest parts of the gradient to ensure WCAG compliance.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-success-500" /> Layering
                        </h3>
                        <p className="text-sm">
                            Gradients work best as backgrounds. Try applying a subtle linear gradient to a button to give it a modern 3D "pop."
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to paint with code? Start experimenting with colors and angles, and see how a custom gradient can transform your flat design into a stunning, multi-dimensional experience!
                </p>
            </div>
        </Card>
    )
}