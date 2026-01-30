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
    Monitor,
    Layout,
    AlignLeft,
    Braces,
    Workflow,
    Search,
    RotateCcw
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionHTMLFormatter() {
    // Image path
    const imagePath = "/Images/InfosectionImages/HTMLFOrmatterPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the HTML Formatter?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">HTML Formatter</Link> as a digital interior designer for your code. When building websites, HTML can quickly become a "spaghetti" of nested tags, inconsistent indentation, and messy attributes. Our tool utilizes the industry-leading <strong>Prettier</strong> engine to automatically reorganize your markup into a clean, professional structure.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are cleaning up a legacy project, normalizing code from different team members, or preparing a snippet for documentation, this formatter ensures your code meets modern standards. It bridges the gap between raw, functional code and beautiful, readable architecture, allowing you to focus on building while we handle the presentation.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="HTML Formatter Interface Preview"
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
                    How to Use the HTML Formatter?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <FileUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Input Your HTML:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Paste your messy code directly into the editor or <strong>upload an HTML file</strong> (up to 5MB) to get started.
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
                                <strong className="text-default-700">Configure Styling:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <AlignLeft className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Indentation & Wrapping:</strong>
                                        <span className="text-default-600 ml-1">Choose between spaces or tabs, set your indent size, and adjust the line-wrap length for optimal readability.</span>
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
                                <strong className="text-default-700">Format & Inspect:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Hit the <strong>Format</strong> button. Use <strong>Live Preview</strong> (<Eye className="w-3 h-3 inline" />) to see how the code renders and check the character counts to monitor file weight.
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
                                Use <strong>Copy</strong> (<Copy className="w-3 h-3 inline" />) for quick use or <strong>Download</strong> the formatted HTML as a file. Use <strong>Reset</strong> (<RotateCcw className="w-3 h-3 inline" />) to start fresh.
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
                            <strong className="text-default-700">Prettier Engine:</strong>
                            <span className="block mt-1">
                                Industry-standard formatting that guarantees consistent, error-free nesting and attribute alignment.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Monitor className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Live Browser Preview:</strong>
                            <span className="block mt-1">
                                Instantly render your HTML in a sandbox environment to verify the visual result of your code.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Layout className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Customizable Quotes:</strong>
                            <span className="block mt-1">
                                Choose between single ('') or double ("") quotes for your HTML attributes to match your project's style guide.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code2 className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Syntax Highlighting:</strong>
                            <span className="block mt-1">
                                Beautifully color-coded output that makes identifying tags, attributes, and content effortless.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Search className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Comment Management:</strong>
                            <span className="block mt-1">
                                Option to preserve your documentation or purge comments to clean up code for production.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Ready:</strong>
                            <span className="block mt-1">
                                Access the formatter from any device, whether you're at a desktop or a mobile workstation.
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
                            <Workflow className="w-4 h-4 mr-2 text-primary-500" /> Workflow
                        </h3>
                        <p className="text-sm">
                            Integrate this formatter into your CI/CD pipeline or dev-cycle to ensure every team member commits standard code.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <RefreshCw className="w-4 h-4 mr-2 text-secondary-500" /> Optimization
                        </h3>
                        <p className="text-sm">
                            Combine this tool with our CSS and JS minifiers to find the perfect balance between readability and file size.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-success-500" /> Validation
                        </h3>
                        <p className="text-sm">
                            Always pair formatting with validation. A well-formatted document is easier to debug when structure errors occur.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to standardize your project? Start formatting your HTML now and experience the power of industry-standard, professional code presentation in seconds!
                </p>
            </div>
        </Card>
    )
}