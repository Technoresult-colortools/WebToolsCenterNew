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
    CheckCircle2,
    Plus,
    Eye,
    ArrowUpDown,
    Bookmark,
    Box
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionBoxShadow() {
    // Image path
    const imagePath = "/Images/InfosectionImages/CSSBoxShadowPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the CSS Box Shadow Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">CSS Box Shadow Generator</Link> as your digital lighting technician. In modern web design, shadows are the secret ingredient that creates depth, elevation, and a sense of hierarchy. This tool allows you to move beyond basic, flat designs by layering multiple shadows to create realistic, high-quality "Soft UI" or "Neumorphic" effects.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are crafting a subtle "lift" for a button or a deep, immersive glow for a modal window, our generator handles the complex syntax of the <code>box-shadow</code> property for you. It provides total control over every axis, blur radius, and spread, ensuring your UI elements look tactile and professional across all modern browsers.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="CSS Box Shadow Generator Interface Preview"
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
                    How to Use the Box Shadow Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Layers className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Manage Your Layers:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Shadows</strong> tab to add (<Plus className="w-3 h-3 inline" />) or remove shadow layers. You can reorder them using the <strong>up and down arrows</strong> (<ArrowUpDown className="w-3 h-3 inline" />) to change which shadow sits on top.
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
                                <strong className="text-default-700">Refine the Light:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Move className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Offset & Spread:</strong>
                                        <span className="text-default-600 ml-1">Adjust Horizontal/Vertical offsets and Blur/Spread values. Toggle the <strong>"Inset"</strong> switch to create an inner-box shadow effect.</span>
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
                                <Box className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Customize the Container:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Switch to the <strong>Box</strong> tab to modify the preview element's color, size, and <strong>Border Radius</strong> to see how shadows interact with rounded corners.
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
                                Save your creations as <strong>Presets</strong> (<Bookmark className="w-3 h-3 inline" />) for future use, then copy the generated CSS or download the code as a file.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Professional Shadow Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multi-Layer Support:</strong>
                            <span className="block mt-1">
                                Stack an unlimited number of shadows to create ultra-realistic depth and complex lighting effects.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Precision Controls:</strong>
                            <span className="block mt-1">
                                Fine-tune your design using Px, Em, or Rem units for perfect scalability across different design systems.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-time Visualization:</strong>
                            <span className="block mt-1">
                                See every change instantly in the preview window with a Fullscreen mode for detailed inspection.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Bookmark className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Preset Library:</strong>
                            <span className="block mt-1">
                                Save your favorite shadow combinations and load them instantly to maintain consistency across projects.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Syntax Highlighting:</strong>
                            <span className="block mt-1">
                                View beautifully formatted CSS code that is ready to be dropped into any stylesheet.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Mobile Optimized:</strong>
                            <span className="block mt-1">
                                A fully responsive interface allows you to design and generate shadows on any device or screen size.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Realistic Shadows
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Layers className="w-4 h-4 mr-2 text-primary-500" /> Layering
                        </h3>
                        <p className="text-sm">
                            Real shadows have layers. Use one sharp, dark shadow for the "base" and one large, blurry, light shadow for the "ambient" glow.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Palette className="w-4 h-4 mr-2 text-secondary-500" /> Softness
                        </h3>
                        <p className="text-sm">
                            Avoid pure black (#000) shadows. Instead, use a very dark version of your background color with low opacity for a more natural look.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-success-500" /> Inset Depth
                        </h3>
                        <p className="text-sm">
                            Combine a standard shadow with an "Inset" shadow to create "pressed" or "hollow" effects, perfect for form inputs and buttons.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to elevate your UI? Start experimenting with layers and light, and create sophisticated box shadows that bring a new level of professionalism to your web designs today!
                </p>
            </div>
        </Card>
    )
}