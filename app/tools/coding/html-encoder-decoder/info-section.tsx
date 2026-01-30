"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    FileCode,
    ShieldCheck,
    Sliders,
    MousePointerClick,
    Eye,
    Upload,
    Zap,
    Code,
    Smartphone,
    Download,
    RotateCcw,
    CheckCircle2,
    RefreshCw,
    Search,
    ShieldAlert,
    Copy,
    Check
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionHTMLEncoder() {
    // Image path
    const imagePath = "/Images/InfosectionImages/HTMLEncodePreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the HTML Encoder/Decoder?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">HTML Encoder/Decoder</Link> as a protective filter for your web content. In web development, certain characters like <code>&lt;</code>, <code>&gt;</code>, and <code>&amp;</code> have special meanings in HTML. If you want to display these characters literally on a page without the browser interpreting them as code, they must be converted into "HTML Entities."
                </p>
                <p className="text-default-600 mb-4">
                    This tool serves a dual purpose: it ensures your code renders exactly as intended and provides a vital layer of security. By encoding user-generated content, you protect your application from <strong>Cross-Site Scripting (XSS)</strong> attacks, where malicious scripts are injected into web pages. It is a "Swiss Army knife" for developers, technical writers, and security professionals alike.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="HTML Encoder/Decoder Interface Preview"
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
                    How to Use the HTML Encoder/Decoder?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <RefreshCw className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Select Mode & Input:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Choose between the <strong>Encode</strong> or <strong>Decode</strong> tabs. Paste your raw HTML or encoded entities into the input field.
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
                                <strong className="text-default-700">Configure Options:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Refine the Output:</strong>
                                        <span className="text-default-600 ml-1">Toggle options like <strong>Preserve Newlines</strong> or <strong>Encode Quotes</strong> to match your specific coding requirements.</span>
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
                                <strong className="text-default-700">Process & Validate:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                The conversion happens in real-time. Use the <strong>Validate HTML</strong> button to ensure your structure is sound and free of syntax errors.
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
                                <strong className="text-default-700">Quick Export:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use <strong>Copy to Clipboard</strong> to grab your results instantly. For larger projects, you can also <strong>Upload</strong> files (up to 2MB) for bulk processing.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 id="features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <FileCode className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Bi-directional Processing:</strong>
                            <span className="block mt-1">
                                Effortlessly switch between encoding special characters and decoding HTML entities back to plain text.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Security-First:</strong>
                            <span className="block mt-1">
                                Prevent XSS vulnerabilities by sanitizing characters that could be executed as scripts in the browser.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Upload className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">File Processing:</strong>
                            <span className="block mt-1">
                                Upload HTML or TXT files up to 2MB for high-volume encoding and decoding tasks.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Integrated Validation:</strong>
                            <span className="block mt-1">
                                Check your HTML structure for validity and errors directly within the tool’s interface.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-Time Engine:</strong>
                            <span className="block mt-1">
                                Experience instant results as you type, eliminating the need for manual button clicks for quick tasks.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Fully Responsive:</strong>
                            <span className="block mt-1">
                                Optimized for all devices, from desktop workstations to mobile coding environments.
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
                            <ShieldAlert className="w-4 h-4 mr-2 text-primary-500" /> XSS Prevention
                        </h3>
                        <p className="text-sm">
                            Always encode user-submitted text (like comments) before storing or displaying it to prevent malicious script injection.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Search className="w-4 h-4 mr-2 text-secondary-500" /> SEO & Entities
                        </h3>
                        <p className="text-sm">
                            Use entities for copyright symbols (<code>&amp;copy;</code>) or trademarks to ensure they render correctly across all browsers and charsets.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <RotateCcw className="w-4 h-4 mr-2 text-success-500" /> Data Integrity
                        </h3>
                        <p className="text-sm">
                            If your text contains intentional HTML tags that you <i>don't</i> want to encode, use the "Preserve" options carefully.
                        </p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Ready to secure and streamline your web development? Start using our HTML Encoder/Decoder today to experience the perfect balance of simplicity and professional-grade functionality. Clean, valid, and secure code is just a click away!
                </p>
            </div>
        </Card>
    )
}