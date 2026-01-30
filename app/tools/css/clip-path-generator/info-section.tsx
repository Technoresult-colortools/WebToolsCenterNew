"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Scissors,
    Shapes,
    MousePointerClick,
    Eye,
    Sliders,
    Image as ImageIcon,
    Code,
    Smartphone,
    Layers,
    Maximize,
    RotateCcw,
    PenTool,
    CheckCircle2
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionClipPath() {
    // Image path
    const imagePath = "/Images/InfosectionImages/CSSClipPathPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Clip Path Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    Imagine that you are a digital artist with a magical pair of scissors who can cut any shape from an image.
                    That is essentially what our <Link href="#how-to-use" className="text-primary-500 hover:underline">Clip Path Generator</Link> does!
                    It is a fun and spontaneous tool that allows you to make a custom shape to reveal parts of an image while hiding others.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are a web designer looking to add some flair to your site or a developer trying to create unique UI elements,
                    this tool is your new best friend. Convert boring rectangles into exciting polygons, turn square profile images into perfect circles,
                    or create complex custom shapes that bring your creative vision to life. It is like being a digital surgeon with a knife that is never sluggish!
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Clip Path Generator Interface Preview"
                                    width={800}
                                    height={400}
                                    className="w-full h-auto object-contain"
                                    unoptimized={true} // Fixes the 'Open in new tab' 404 error
                                />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* How to Use Section */}
                <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
                    How to Use the Clip Path Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Shapes className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Select & Sculpt:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Head over to the <strong>Shape</strong> tab to pick a base shape, or use the custom option. Drag the control points directly on the image to sculpt your perfect form.
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
                                <strong className="text-default-700">Refine Settings:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Maximize className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Dimensions & Opacity:</strong>
                                        <span className="text-default-600 ml-1">Adjust the width and height sliders, and modify opacity for transparency effects.</span>
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
                                <Eye className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Visualize:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Toggle "Show Outside" to see the clipped area, use "Hide Guides" for a clean view, or upload your own background image to see how the shape fits your content.
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
                                Once satisfied, copy the generated CSS code instantly for use in your project. You can also use the "Reset" button to start fresh.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Features That'll Make You Go "Wow!"
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Shapes className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Shape Library:</strong>
                            <span className="block mt-1">
                                Access a wide variety of pre-defined shapes, ranging from basic geometric forms to complex polygons.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <PenTool className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Custom Design:</strong>
                            <span className="block mt-1">
                                Go beyond presets with full custom shape capabilities for unique, one-of-a-kind designs.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MousePointerClick className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Interactive Editing:</strong>
                            <span className="block mt-1">
                                Intuitively drag control points on the canvas to manipulate your shape in real-time.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-time Preview:</strong>
                            <span className="block mt-1">
                                See exactly how your clip path affects the image instantly as you make adjustments.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <ImageIcon className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Custom Backgrounds:</strong>
                            <span className="block mt-1">
                                Upload your own images to test how the clip path interacts with your specific content.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Instant CSS:</strong>
                            <span className="block mt-1">
                                One-click code generation provides ready-to-use CSS for easy integration into your website.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Visual Controls:</strong>
                            <span className="block mt-1">
                                Toggle "Show Outside" to debug your masks and use Guides to ensure perfect alignment.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Ready:</strong>
                            <span className="block mt-1">
                                The generated code and the tool itself are designed to work seamlessly across all device sizes.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Additional "Tips/Outro" Section using the Boxed style for consistency */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Scissors className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <RotateCcw className="w-4 h-4 mr-2 text-primary-500" /> Experiment
                        </h3>
                        <p className="text-sm">
                            Don't be afraid to drag points wildly! You can always hit the "Reset" button to start fresh if things get too abstract.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Layers className="w-4 h-4 mr-2 text-secondary-500" /> Layering
                        </h3>
                        <p className="text-sm">
                            Combine clip-paths with CSS filters or overlapping elements to create depth and modern UI effects.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-success-500" /> Compatibility
                        </h3>
                        <p className="text-sm">
                            Clip-path is widely supported, but always check your target browser requirements for complex polygon shapes.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    So, what are you waiting for? Dive in, start clipping, and let your creativity run wild! Who knows? You might just create the next big thing in web design.
                </p>
            </div>
        </Card>
    )
}