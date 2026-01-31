"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Zap,
    Sliders,
    Code2,
    FileUp,
    Download,
    Smartphone,
    CheckCircle2,
    Copy,
    RefreshCw,
    Braces,
    Terminal,
    Workflow,
    Trash2,
    SortAsc,
    RotateCcw
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionJavascriptFormatter() {
    // Image path
    const imagePath = "/Images/InfosectionImages/JavaScriptFormatterPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the JavaScript Formatter?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">JavaScript Formatter</Link> as a digital organizer for your logic. As projects grow, JavaScript files often become a chaotic mix of inconsistent spacing, mismatched quotes, and cluttered console logs. Our tool leverages the power of the <strong>Prettier</strong> engine to automatically reorganize your script into a clean, industry-standard structure.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are a software engineer enforcing team standards, a web developer cleaning up minified snippets, or a student learning to write "clean code," this formatter does the heavy lifting. It ensures that every bracket, semicolon, and indentation level is perfectly placed, allowing you to focus on the functionality while we handle the aesthetics.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="JavaScript Formatter Interface Preview"
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
                    How to Use the JavaScript Formatter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <FileUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Input Your Script:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Paste your code directly into the editor or <strong>upload a JavaScript file</strong> to load your existing project.
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
                                <strong className="text-default-700">Customize Rules:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Braces className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Formatting Logic:</strong>
                                        <span className="text-default-600 ml-1">Adjust indentation (tabs/spaces), choose between single or double quotes, and toggle semicolon insertion or <strong>Import Statement Sorting</strong>.</span>
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
                                <strong className="text-default-700">Format & Refine:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click the <strong>Format</strong> button. You can also toggle <strong>"Remove Console Logs"</strong> or use the <strong>Compression</strong> feature if you're preparing for production.
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
                                Use <strong>Copy</strong> (<Copy className="w-3 h-3 inline" />) to grab the formatted code instantly or <strong>Download</strong> it as a file. Use <strong>Reset</strong> (<RotateCcw className="w-3 h-3 inline" />) to clear and start over.
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
                        <Braces className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Prettier-Powered Engine:</strong>
                            <span className="block mt-1">
                                Leverages industry-standard formatting for consistent, high-quality code normalization.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <SortAsc className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Import Sorting:</strong>
                            <span className="block mt-1">
                                Automatically organizes your ES6 import statements for better file management.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Trash2 className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Log & Comment Removal:</strong>
                            <span className="block mt-1">
                                Instantly strip <code>console.log</code> statements or comments to clean up code for production.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code2 className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Syntax Highlighting:</strong>
                            <span className="block mt-1">
                                Color-coded input and output areas make reading and error-spotting much easier.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Terminal className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Integrated Compression:</strong>
                            <span className="block mt-1">
                                Toggle a minification mode to condense your formatted code into a production-ready string.
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

                {/* Advanced Usage Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-primary-500" />
                    Advanced Usage & Pro Tips
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Workflow className="w-4 h-4 mr-2 text-primary-500" /> Build Pipeline
                        </h3>
                        <p className="text-sm">
                            Use our formatted output as the baseline for your team's code reviews to ensure everyone follows the same standards.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <RefreshCw className="w-4 h-4 mr-2 text-secondary-500" /> Dev vs Prod
                        </h3>
                        <p className="text-sm">
                            Experiment with different formatting options during development and use the <strong>Compression</strong> feature for final deployment.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-success-500" /> Quality Check
                        </h3>
                        <p className="text-sm">
                            Combine formatting with linting tools. A well-formatted script is significantly easier to debug and maintain long-term.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to standardize your project? Start formatting your JavaScript now and experience the power of industry-standard, professional code organization in seconds!
                </p>
            </div>
        </Card>
    )
}