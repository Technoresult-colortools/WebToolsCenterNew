"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Settings,
    Sliders,
    Zap,
    Download,
    Eye,
    Smartphone,
    Copy,
    BarChart,
    FileUp,
    RefreshCw,
    Monitor,
    Rocket,
    Shrink
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionHTMLMinifier() {
    // Image path
    const imagePath = "/Images/InfosectionImages/HTMLMinifierPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the HTML Minifier?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">HTML Minifier</Link> is a precision performance tool designed to strip away the "digital weight" from your web pages. In development, we use spaces, comments, and newlines to make code readable for humans; however, browsers don't need these to render a page.
                </p>
                <p className="text-default-600 mb-4">
                    This advanced tool optimizes your HTML by removing unnecessary characters and optional tags, significantly decreasing file size. The result is faster loading times, reduced bandwidth usage, and a better overall experience for your users. It is an essential utility for developers and site owners aiming for a lean, high-performance web presence.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="HTML Minifier Interface Preview"
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
                    How to Use the HTML Minifier?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <FileUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Load Your Code:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Paste your HTML directly into the input area or <strong>upload an HTML file</strong> using the drag-and-drop feature.
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
                                <strong className="text-default-700">Set Aggressiveness:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Settings className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Custom Optimization:</strong>
                                        <span className="text-default-600 ml-1">Adjust the minification aggressiveness slider and toggle specific options like removing comments or collapsing whitespace.</span>
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
                                <strong className="text-default-700">Minify & Preview:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click <strong>Minify HTML</strong>. Use the <strong>Show Preview</strong> (<Eye className="w-3 h-3 inline" />) button to verify that the optimized code renders perfectly in the browser.
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
                                <strong className="text-default-700">Export:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Check your <strong>Minification Stats</strong> to see the space saved, then <strong>Copy</strong> (<Copy className="w-3 h-3 inline" />) the result or download it as a new file.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Optimization
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Shrink className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Intelligent Minification:</strong>
                            <span className="block mt-1">
                                Advanced algorithms that remove unnecessary characters without breaking your code logic.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Aggressiveness Control:</strong>
                            <span className="block mt-1">
                                Choose how deep you want to go—from basic whitespace removal to removing optional closing tags.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Live Preview:</strong>
                            <span className="block mt-1">
                                Render the minified code instantly in an isolated environment to ensure visual integrity.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <BarChart className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Compression Stats:</strong>
                            <span className="block mt-1">
                                Get detailed feedback on how much file size was reduced and what percentage was saved.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <RefreshCw className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Session Persistence:</strong>
                            <span className="block mt-1">
                                Utilizes local storage to keep your input HTML safe even if you refresh the browser.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Fully Responsive:</strong>
                            <span className="block mt-1">
                                Optimize your web assets from any device, whether you're on a desktop or a mobile workstation.
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
                            <RefreshCw className="w-4 h-4 mr-2 text-primary-500" /> Always Backup
                        </h3>
                        <p className="text-sm">
                            Always keep a "Human-Readable" version of your source code. Minification is for the browser, not for editing.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Monitor className="w-4 h-4 mr-2 text-secondary-500" /> Browser Testing
                        </h3>
                        <p className="text-sm">
                            Be cautious with removing optional tags; while modern browsers handle it well, some legacy systems might require them.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Rocket className="w-4 h-4 mr-2 text-success-500" /> Combined Speed
                        </h3>
                        <p className="text-sm">
                            For ultimate performance, combine minification with server-side GZIP or Brotli compression.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to supercharge your site's performance? Start minifying your HTML today and bridge the gap between human-readable code and machine-optimized delivery!
                </p>
            </div>
        </Card>
    )
}