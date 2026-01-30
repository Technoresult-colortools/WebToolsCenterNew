"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Eye,
    Palette,
    Edit3,
    Download,
    AlertTriangle,
    Settings,
    Code,
    Target,
    Smartphone,
    CheckCircle2,
    Zap,
    Network,
    Database,
    FileCode
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionJSONTree() {
    // Image path
    const imagePath = "/Images/InfosectionImages/JSONTreeViewerPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the JSON Tree Viewer and Editor?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">JSON Tree Viewer and Editor</Link> as an interactive X-ray machine for your data. In its raw form, nested JSON can be a daunting "wall of text." This tool transforms complex, minified, or deeply nested JSON strings into a beautiful, navigable, and interactive hierarchy.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are debugging a complex API response, auditing configuration files, or building data structures from scratch, this utility provides the clarity you need. With support for in-place editing, structural modification, and multiple aesthetic themes, it bridges the gap between raw machine data and human-friendly visualization.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="JSON Tree Viewer Interface Preview"
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
                    How to Use the JSON Tree Viewer and Editor?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <FileCode className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Input Data:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Paste your raw JSON into the text area. The tool will automatically <strong>validate and parse</strong> the data, highlighting any syntax errors immediately.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Network className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Navigate the Tree:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use the expand and collapse icons to explore nested objects and arrays. Adjust <strong>Indentation</strong> and <strong>Icon Styles</strong> in the settings to suit your view.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Edit3 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Modify Structure:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Enable editing features to <strong>modify values, add new properties,</strong> or <strong>delete elements</strong> directly within the tree visualization.
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
                                Once your modifications are complete, <strong>Copy</strong> branches to your clipboard or <strong>Download</strong> the entire finalized JSON as a local file.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Interactive Visualization:</strong>
                            <span className="block mt-1">Navigate complex structures with collapsible nodes and type-aware color coding.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Edit3 className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">In-place Editing:</strong>
                            <span className="block mt-1">Modify strings, numbers, and booleans directly inside the tree view without touching raw code.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Palette className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multiple Visual Themes:</strong>
                            <span className="block mt-1">Choose from 11 color schemes like Monokai, Dracula, and Night Owl to reduce eye strain.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-time Validation:</strong>
                            <span className="block mt-1">Get instant feedback on syntax errors as you paste or edit data.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Settings className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Deep Customization:</strong>
                            <span className="block mt-1">Adjust indentation, icon styles, and set thresholds for collapsing long strings and arrays.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Fully Responsive:</strong>
                            <span className="block mt-1">Seamlessly inspect and edit JSON on any device, from desktop to mobile screens.</span>
                        </div>
                    </div>
                </div>

                {/* Practical Applications */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Target className="w-6 h-6 mr-2 text-primary-500" />
                    Practical Applications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-blue-500" /> API Debugging
                        </h3>
                        <p className="text-sm">
                            Paste raw API responses to quickly identify specific data points in massive nested payloads.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Database className="w-4 h-4 text-orange-500" /> Config Management
                        </h3>
                        <p className="text-sm">
                            Visually audit and edit complex <code>.json</code> configuration files for apps and services with confidence.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Code className="w-4 h-4 text-green-500" /> Data Analysis
                        </h3>
                        <p className="text-sm">
                            Explore JSON datasets visually to understand relationships and hierarchy before implementation.
                        </p>
                    </div>
                </div>

                {/* Technical Capabilities */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-primary-500" />
                    Technical Capabilities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-default-600">
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-primary-500"><CheckCircle2 className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Deep Object Traversal:</strong>
                            <p className="text-sm">Engineered to handle even the most deeply nested structures without performance degradation.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-primary-500"><CheckCircle2 className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Large Dataset Support:</strong>
                            <p className="text-sm">Uses smart rendering for large arrays and objects to keep the interface smooth and responsive.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-primary-500"><CheckCircle2 className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Path Tracking:</strong>
                            <p className="text-sm">Maintains accurate breadcrumbs and path info for precise editing of every single property.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-primary-500"><CheckCircle2 className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Structural Preservation:</strong>
                            <p className="text-sm">Ensures your JSON logic remains valid throughout complex addition and deletion operations.</p>
                        </div>
                    </div>
                </div>

                {/* Final Thoughts */}
                <p className="text-default-600 mt-8 text-center">
                    Whether you're a developer crafting APIs, a data scientist exploring datasets, or an engineer managing systems, the JSON Tree Viewer and Editor provides the ultimate balance of simplicity and surgical precision. Transform your JSON interaction today!
                </p>
            </div>
        </Card>
    )
}