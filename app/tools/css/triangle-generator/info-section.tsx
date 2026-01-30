"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Triangle,
    Sliders,
    MousePointerClick,
    Palette,
    Zap,
    Code,
    Smartphone,
    Maximize,
    RotateCcw,
    Compass,
    CheckCircle2,
    Move,
    Layers
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionTriangle() {
    // Image path
    const imagePath = "/Images/InfosectionImages/CSSTrainglePreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the CSS Triangle Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    In the world of web design, sometimes the simplest shapes are the hardest to code. The <Link href="#how-to-use" className="text-primary-500 hover:underline">CSS Triangle Generator</Link> is like a piece of digital origami—it allows you to fold pure CSS borders into perfect geometric triangles without ever needing an image file.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you need a small arrow for a tooltip, a play button for a video player, or decorative corner accents, this tool generates the lightweight code required to create them. By using smart CSS border hacks or modern clip-paths, it ensures your shapes are infinitely scalable, retina-ready, and load instantly.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="CSS Triangle Generator Interface Preview"
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
                    How to Use the CSS Triangle Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Compass className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Set the Direction:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Choose from <strong>8 different directions</strong> (Top, Bottom, Left, Right, and all diagonals). This determines which way your triangle points.
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
                                <strong className="text-default-700">Customize the Shape:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Move className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Size & Radius:</strong>
                                        <span className="text-default-600 ml-1">Use the sliders to adjust the width/height and add a <strong>Border Radius</strong> if you want rounded corners.</span>
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
                                <strong className="text-default-700">Style & Rotate:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Pick a color and adjust <strong>Opacity</strong> for transparency. Use the <strong>Rotation</strong> slider to angle your triangle precisely for custom UI layouts.
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
                                Toggle between <strong>Basic and Advanced</strong> settings, then copy the generated CSS code or download it as a `.css` file.
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
                        <Triangle className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">8-Way Directions:</strong>
                            <span className="block mt-1">
                                Easily create triangles pointing in any cardinal or ordinal direction with a single click.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Rounded Corners:</strong>
                            <span className="block mt-1">
                                Go beyond sharp edges by adding border-radius for a modern, friendly UI look.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MousePointerClick className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Interactive Preview:</strong>
                            <span className="block mt-1">
                                Visualize your changes in real-time on a clean canvas with a fullscreen expansion option.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <RotateCcw className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Precision Rotation:</strong>
                            <span className="block mt-1">
                                Rotate your triangle to any degree, perfect for creating complex decorative patterns.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Pure CSS Output:</strong>
                            <span className="block mt-1">
                                Generates clean, efficient code that works in all modern browsers without external assets.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Ready:</strong>
                            <span className="block mt-1">
                                The generated CSS is lightweight and scales perfectly across mobile and desktop devices.
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
                            <Layers className="w-4 h-4 mr-2 text-primary-500" /> Pseudo-elements
                        </h3>
                        <p className="text-sm">
                            Use these triangles with <code>::before</code> or <code>::after</code> to add tooltips or arrows to buttons without extra HTML.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Maximize className="w-4 h-4 mr-2 text-secondary-500" /> Scalability
                        </h3>
                        <p className="text-sm">
                            Since these are CSS-based, you can change their color or size using CSS variables for a dynamic UI.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-success-500" /> Zero Weight
                        </h3>
                        <p className="text-sm">
                            CSS triangles add almost zero bytes to your page compared to SVGs or PNGs, improving your site speed.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to add some sharp design to your project? Experiment with the directions and sizes, and grab your code to start building cleaner, faster interfaces today!
                </p>
            </div>
        </Card>
    )
}