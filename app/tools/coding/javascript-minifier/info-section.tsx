"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Settings,
    Code2,
    Smartphone,
    Download,
    RefreshCw,
    Copy,
    FileUp,
    BarChart,
    Zap,
    Cpu,
    Trash2,
    ShieldAlert,
    Wand2,
    Rocket
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionJavascriptMinifier() {
    // Image path
    const imagePath = "/Images/InfosectionImages/JavascriptMinifierPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the JavaScript Minifier?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">JavaScript Minifier</Link> is a high-performance optimization tool purpose-built for web developers. In modern web development, source code is written to be human-readable, filled with comments, long variable names, and whitespace. While great for humans, these additions increase file size and slow down browser load times.
                </p>
                <p className="text-default-600 mb-4">
                    This application leverages the powerful <strong>Terser engine</strong> to strip away every unnecessary character. From removing dead code and comments to "mangling" variable names into shorter versions, our tool ensures your scripts are as lean as possible. Whether you're a beginner launching your first site or an enterprise dev optimizing production bundles, this is your key to a faster web experience.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="JavaScript Minifier Interface Preview"
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
                    How to Use the JavaScript Minifier?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <FileUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Load Your Scripts:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Paste your JavaScript directly into the editor or upload a <code>.js</code> file (up to 1MB) for automatic processing.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Settings className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Configure Logic:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Wand2 className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Advanced Options:</strong>
                                        <span className="text-default-600 ml-1">Toggle <strong>Variable Mangling</strong> for maximum compression or <strong>Remove Console Logs</strong> to clean up production code.</span>
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
                                <strong className="text-default-700">Minify & Analyze:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click the <strong>Minify</strong> button. Review the resulting code and check the <strong>Minification Statistics</strong> (<BarChart className="w-3 h-3 inline" />) to see exactly how much space you've saved.
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
                                <strong className="text-default-700">Export Output:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the <strong>Copy</strong> (<Copy className="w-3 h-3 inline" />) button for quick clipboard use or <strong>Download</strong> the minified script as a file for your project.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Optimization Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Cpu className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Terser-Powered Engine:</strong>
                            <span className="block mt-1">
                                Utilizes the industry-standard Terser compression for efficient and safe JavaScript minification.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Wand2 className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Variable Mangling:</strong>
                            <span className="block mt-1">
                                Shortens variable and function names to the smallest possible length to further reduce file size.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Trash2 className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Console Log Removal:</strong>
                            <span className="block mt-1">
                                Automatically purges debugging statements (<code>console.log</code>) from your production-ready code.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Syntax Error Detection:</strong>
                            <span className="block mt-1">
                                Real-time reporting on code errors, ensuring you don't minify broken scripts.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <BarChart className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-time Statistics:</strong>
                            <span className="block mt-1">
                                Detailed insights into the original vs. minified file size and the exact percentage of data saved.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive UI:</strong>
                            <span className="block mt-1">
                                Optimized for all devices, allowing you to optimize code from your desktop or a mobile workstation.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Better Optimization
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-blue-500" /> Keep Source Map
                        </h3>
                        <p className="text-sm">
                            Always keep your original, unminified files. Minified code is impossible for humans to debug efficiently.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <RefreshCw className="w-4 h-4 text-orange-500" /> Mangling Warning
                        </h3>
                        <p className="text-sm">
                            Variable mangling is safe for most code, but be careful if your script relies on string-matching function names (<code>func.name</code>).
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Rocket className="w-4 h-4 text-green-500" /> Production First
                        </h3>
                        <p className="text-sm">
                            Minification is a final step. Combine it with server-side GZIP compression to achieve the fastest possible load times for your users.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to supercharge your web performance? Start minifying your JavaScript today and experience the difference between standard code and professional, machine-optimized delivery!
                </p>
            </div>
        </Card>
    )
}