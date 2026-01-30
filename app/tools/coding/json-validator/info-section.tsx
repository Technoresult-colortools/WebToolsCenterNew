"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    ShieldCheck,
    Zap,
    Sliders,
    FileUp,
    Download,
    Copy,
    Smartphone,
    BarChart3,
    SortAsc,
    AlertTriangle,
    FileCode,
    Search,
    Monitor,
    Rocket
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionJSONValidator() {
    // Image path
    const imagePath = "/Images/InfosectionImages/JSONValidatorPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the JSON Validator and Formatter?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">JSON Validator and Formatter</Link> as a digital inspector and architect for your data. JSON (JavaScript Object Notation) is the universal language of modern APIs, but a single missing comma or curly brace can cause an entire application to crash.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are a developer debugging API responses, a data analyst cleaning up messy exports, or an engineer preparing configuration files, this tool ensures your data is correct, well-structured, and easy to read. It bridges the gap between raw machine data and human-friendly documentation, catching syntax errors before they become production problems.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="JSON Validator and Formatter Interface Preview"
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
                    How to Use the JSON Validator and Formatter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <FileUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Input Your JSON:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Paste your raw JSON string into the input area or use the <strong>file upload</strong> feature to process local <code>.json</code> documents.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Validate & Inspect:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Error Detection:</strong>
                                        <span className="text-default-600 ml-1">Click <strong>'Validate JSON'</strong>. The tool will provide detailed feedback if any syntax errors are detected.</span>
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
                                <Sliders className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Choose Your Format:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use <strong>'Beautify'</strong> to expand the code with custom indent sizes (2, 4, or 8 spaces), or <strong>'Minify'</strong> to strip all whitespace for production use. Toggle <strong>'Sort Keys'</strong> to organize object properties alphabetically.
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
                                <strong className="text-default-700">Export & Integrate:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Check the <strong>'Formatted JSON'</strong> tab to see the result. <strong>Copy</strong> (<Copy className="w-3 h-3 inline" />) it to your clipboard or <strong>Download</strong> the result as a file.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features for Data Management
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Detailed Validation:</strong>
                            <span className="block mt-1">Identifies the exact location and nature of syntax errors, saving hours of manual debugging.</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Smart Minification:</strong>
                            <span className="block mt-1">Compresses data to its smallest possible size for efficient API requests and storage.</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <SortAsc className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Key Sorting:</strong>
                            <span className="block mt-1">Alphabetically organize object keys for easier data auditing and consistent file diffs.</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <BarChart3 className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Compression Stats:</strong>
                            <span className="block mt-1">Review detailed statistics after minification to track exactly how much bandwidth you've saved.</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <FileCode className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Large File Support:</strong>
                            <span className="block mt-1">Engineered to handle substantial JSON datasets without browser lag or performance drops.</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Architecture:</strong>
                            <span className="block mt-1">A fully mobile-optimized interface that allows you to validate data on any device.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Rocket className="w-4 h-4 text-blue-500" /> Bandwidth
                        </h3>
                        <p className="text-sm">
                            Always <strong>Minify</strong> JSON used in production APIs. Smaller payloads lead to faster mobile load times and lower egress costs.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Monitor className="w-4 h-4 text-orange-500" /> Clean Configs
                        </h3>
                        <p className="text-sm">
                            Use <strong>Sort Keys</strong> when working with configuration files. It makes it significantly easier to find settings in long documents.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Search className="w-4 h-4 text-green-500" /> Early Catch
                        </h3>
                        <p className="text-sm">
                            Run raw text through the <strong>Validator</strong> before writing database seed scripts to prevent failed migrations.
                        </p>
                    </div>
                </div>

                {/* Final Outro */}
                <p className="text-default-600 mt-8 text-center">
                    The JSON Validator and Formatter is an essential tool for anyone working with modern data structures. By catching errors early and ensuring your data is always in its optimal format, you can build more robust and efficient applications. Master your data integrity today!
                </p>
            </div>
        </Card>
    )
}