"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Layers,
    MousePointerClick,
    Eye,
    Sliders,
    Zap,
    Code,
    Smartphone,
    RefreshCcw,
    Image as ImageIcon,
    Shapes,
    CheckCircle2,
    Download,
    Palette,
    Maximize
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionGlassmorphism() {
    // Image path
    const imagePath = "/Images/InfosectionImages/CSSGlassmorphismPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the CSS Glassmorphism Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    Imagine looking through a frosted window on a winter morning—that sleek, semi-transparent, and blurry aesthetic is what we call "Glassmorphism."
                    Our <Link href="#how-to-use" className="text-primary-500 hover:underline">CSS Glassmorphism Generator</Link> is a dedicated design laboratory that allows you to
                    recreate this ultra-modern UI style with surgical precision.
                </p>
                <p className="text-default-600 mb-4">
                    Glassmorphism relies heavily on a "layered" approach, using background blurs and subtle borders to create a sense of depth and hierarchy.
                    This tool bridges the gap between complex CSS properties like <code>backdrop-filter</code> and your creative vision, providing a real-time playground
                    to experiment with transparency, frostiness, and shadows without writing a single line of code manually.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="CSS Glassmorphism Generator Interface Preview"
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
                    How to Use the Glassmorphism Generator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Shapes className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Define Your Shape:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Choose from <strong>Rectangle, Circle, or Custom</strong> shapes. For custom designs, you can even paste your own <code>clip-path</code> coordinates.
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
                                <strong className="text-default-700">Adjust the "Glass" Quality:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Palette className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Blur & Transparency:</strong>
                                        <span className="text-default-600 ml-1">Use sliders to control the <strong>Blur Intensity</strong> (frostiness) and <strong>Transparency</strong> to let the background peak through.</span>
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
                                <ImageIcon className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Test Your Context:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Glassmorphism only works with a background! Use <strong>Shuffle Background</strong> to see the effect against different images, or upload your own specific project background.
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
                                <strong className="text-default-700">Copy & Deploy:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Once you've perfected the look, copy the generated CSS code. It includes the necessary <code>backdrop-filter</code> and <code>rgba</code> colors for instant implementation.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Premium Glass Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Palette className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Advanced Color Control:</strong>
                            <span className="block mt-1">
                                Full HEX and RGBA support for both the glass surface and the elegant "shimmer" borders.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MousePointerClick className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Interactive Adjustments:</strong>
                            <span className="block mt-1">
                                Fine-tune border radius, border width, and box shadows to give your glass element a 3D lift.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <ImageIcon className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Dynamic Backgrounds:</strong>
                            <span className="block mt-1">
                                Upload custom images or use the shuffle tool to ensure your glass effect remains legible in all environments.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Content Preview:</strong>
                            <span className="block mt-1">
                                Toggle sample text inside the glass to check readability and contrast against the blurred background.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Clean CSS Output:</strong>
                            <span className="block mt-1">
                                Get production-ready code with syntax highlighting, including necessary vendor prefixes for maximum compatibility.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Design:</strong>
                            <span className="block mt-1">
                                The tool and the generated code are optimized to work flawlessly across all screen sizes and mobile devices.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Better Glass UI
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Layers className="w-4 h-4 mr-2 text-primary-500" /> Use Borders
                        </h3>
                        <p className="text-sm">
                            Always add a thin, 1px white border with low opacity. This mimics the "edge" of real glass and makes the element pop.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Maximize className="w-4 h-4 mr-2 text-secondary-500" /> Accessibility
                        </h3>
                        <p className="text-sm">
                            Ensure your text color has enough contrast against the background. If it's hard to read, increase the blur or decrease transparency.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-success-500" /> Performance
                        </h3>
                        <p className="text-sm">
                            <code>backdrop-filter</code> can be resource-intensive. Use it for small UI components rather than large, moving full-page elements.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to bring transparency and depth to your web design? Start experimenting with colors and blurs, and transform your
                    flat interface into a stunning, modern masterpiece with our CSS Glassmorphism Generator!
                </p>
            </div>
        </Card>
    )
}