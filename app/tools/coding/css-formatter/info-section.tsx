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
    Eye,
    Smartphone,
    CheckCircle2,
    Copy,
    RefreshCw,
    Layout,
    Braces,
    SortAsc,
    Trash2,
    RotateCcw,
    FileCode,
    Workflow,
    BarChart3
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionCSSFormatter() {
    // Image path
    const imagePath = "/Images/InfosectionImages/CSSFormatterPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the CSS Formatter?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">CSS Formatter</Link> as a professional tailor for your stylesheets. Over time, CSS files can become cluttered with inconsistent spacing, messy indentation, and disorganized properties. Our tool utilizes the world-class <strong>Prettier</strong> engine to automatically refactor your code into a clean, industry-standard structure.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are a developer looking to unify a team's coding style, a designer cleaning up exported code, or a student learning best practices, this formatter handles the aesthetics so you can focus on the design. It transforms fragmented "spaghetti" code into organized, readable, and professional stylesheets in a single click.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="CSS Formatter Interface Preview"
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
                    How to Use the CSS Formatter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <FileUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Input Your Styles:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Paste your raw CSS into the input area or <strong>upload a CSS file</strong> directly to load your existing stylesheet.
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
                                <strong className="text-default-700">Customize Formatting:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Layout className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Options & Resets:</strong>
                                        <span className="text-default-600 ml-1">Adjust indentation, toggle single/double quotes, and choose to <strong>Alphabetize Properties</strong>. You can even click <strong>"Add CSS Reset"</strong> to include a baseline reset.</span>
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
                                <strong className="text-default-700">Format & Review:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click the <strong>Format</strong> button to process your code. Use <strong>"Remove Comments"</strong> if you're preparing for production, and review the syntax-highlighted output.
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
                                Use <strong>Copy</strong> (<Copy className="w-3 h-3 inline" />) to grab the formatted CSS or <strong>Download</strong> it as a file. Use <strong>Reset</strong> (<RotateCcw className="w-3 h-3 inline" />) to start a new session.
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
                            <strong className="text-default-700">Alphabetical Sorting:</strong>
                            <span className="block mt-1">
                                Automatically sorts CSS properties within selectors to help you find rules faster.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Trash2 className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Comment Removal:</strong>
                            <span className="block mt-1">
                                Instantly strip comments for a cleaner look or to prepare code for minification.
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
                        <FileCode className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Built-in CSS Reset:</strong>
                            <span className="block mt-1">
                                Inject a standard CSS reset into your code with one click to normalize browser styling.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive & Lightweight:</strong>
                            <span className="block mt-1">
                                A fully optimized interface that works seamlessly across desktop and mobile devices.
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
                            Use our formatted output as the definitive style guide for your team to maintain consistent version control diffs.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <RefreshCw className="w-4 h-4 mr-2 text-secondary-500" /> Dev vs Prod
                        </h3>
                        <p className="text-sm">
                            Keep comments in your development files but use our <strong>Comment Removal</strong> for production assets to shave off extra bytes.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <BarChart3 className="w-4 h-4 mr-2 text-success-500" /> Optimization
                        </h3>
                        <p className="text-sm">
                            Use the <strong>Character Count</strong> feature to identify overly verbose selectors that might be slowing down CSS parsing.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to standardize your project? Start formatting your CSS now and experience the power of industry-standard, professional stylesheet organization in seconds!
                </p>
            </div>
        </Card>
    )
}