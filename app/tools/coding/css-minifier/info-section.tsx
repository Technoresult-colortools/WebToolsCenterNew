"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Zap,
    Sliders,
    Code,
    FileCode,
    Smartphone,
    RefreshCw,
    CheckCircle2,
    Copy,
    FileUp,
    BarChart,
    Sparkles,
    Shrink,
    Layout,
    Rocket
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionCSSMinifier() {
    // Image path
    const imagePath = "/Images/InfosectionImages/CSSMinifierPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the CSS Minifier and Beautifier?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">CSS Minifier and Beautifier</Link> as a professional tailor for your stylesheets. In the lifecycle of a web project, CSS often exists in two states: one for humans to read and another for browsers to process. This dual-purpose tool allows you to transition seamlessly between both.
                </p>
                <p className="text-default-600 mb-4">
                    The <strong>Minifier</strong> strips away every unnecessary byte—spaces, comments, and newlines—to shrink your file size and boost your site's speed. Conversely, the <strong>Beautifier</strong> restores order to chaotic or compressed code, making it clean and readable for debugging. Whether you are optimizing for a production launch or untangling a legacy project, this tool is your go-to for CSS management.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="CSS Minifier and Beautifier Interface Preview"
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
                    How to Use CSS Minifier and Beautifier?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <RefreshCw className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Select Your Mode:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Toggle between the <strong>Minify CSS</strong> (optimize for speed) or <strong>Beautify CSS</strong> (format for readability) tabs at the top.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <FileUp className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Load Your CSS:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <FileCode className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Input Methods:</strong>
                                        <span className="text-default-600 ml-1">Paste your code directly into the input area or drag and drop a CSS file (up to 2MB) for automatic loading.</span>
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
                                <Zap className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Process & Inspect:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Hit the <strong>Minify</strong> or <strong>Beautify</strong> button. View the output instantly along with real-time statistics showing the exact percentage of file size reduction.
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
                                <strong className="text-default-700">Copy or Save:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use <strong>Copy</strong> (<Copy className="w-3 h-3 inline" />) to grab the result instantly, or <strong>Download</strong> the processed CSS as a file for your project.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Sliders className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Shrink className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Aggressive Minification:</strong>
                            <span className="block mt-1">
                                Removes whitespace, comments, and redundant semicolons to achieve the smallest possible file footprint.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Elegant Beautification:</strong>
                            <span className="block mt-1">
                                Formats compressed CSS with proper indentation and line breaks for easy human reading.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <BarChart className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Processing Stats:</strong>
                            <span className="block mt-1">
                                Real-time reporting on original vs. new file size, showing you exactly how much bandwidth you've saved.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <FileUp className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Drag & Drop Support:</strong>
                            <span className="block mt-1">
                                Quickly upload CSS files up to 2MB. Optimized for performance even with larger stylesheets.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Syntax Clean-up:</strong>
                            <span className="block mt-1">
                                Standardizes formatting during beautification to help catch missing braces or syntax errors.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Fully Responsive:</strong>
                            <span className="block mt-1">
                                A mobile-friendly interface that allows you to format and optimize code on any device.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tips & Best Practices Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Tips and Best Practices
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <Rocket className="w-4 h-4 text-blue-500" /> Production vs Dev
                        </h3>
                        <p className="text-sm">
                            Always keep your original <strong>beautified</strong> file for development and use the <strong>minified</strong> version for your production server to improve load times.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Layout className="w-4 h-4 text-orange-500" /> Combining Files
                        </h3>
                        <p className="text-sm">
                            For maximum efficiency, combine multiple CSS files into one before minifying. This reduces the number of HTTP requests your site makes.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> Validation
                        </h3>
                        <p className="text-sm">
                            Test your minified CSS thoroughly across browsers. While the logic remains the same, tiny syntax errors in the original can cause issues when minified.
                        </p>
                    </div>
                </div>

                {/* Final Outro */}
                <p className="text-default-600 mt-8">
                    Ready to supercharge your stylesheets? Whether you are aiming for a lightning-fast Google PageSpeed score or a perfectly organized code repository, the CSS Minifier and Beautifier is here to streamline your workflow. Start optimizing your CSS today!
                </p>
            </div>
        </Card>
    )
}