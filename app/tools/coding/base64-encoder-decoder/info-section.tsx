"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    FileCode,
    Sliders,
    Eye,
    Upload,
    Zap,
    Smartphone,
    Download,
    RotateCcw,
    CheckCircle2,
    RefreshCw,
    FileText,
    Database,
    ShieldAlert,
    Copy
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionBase64() {
    // Image path
    const imagePath = "/Images/InfosectionImages/Base64EncoderPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Base64 Encoder/Decoder?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">Base64 Encoder/Decoder</Link> as a universal translator for data. In the digital world, some systems can only handle text, while others need to move complex binary files like images or PDFs. Base64 bridges this gap by converting binary data into a safe, text-based format that can be easily transmitted over email, stored in databases, or embedded directly into HTML and CSS.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are a developer embedding a small icon into a stylesheet to reduce HTTP requests, or an IT professional decoding a legacy configuration string, our tool provides a high-performance environment for these operations. It is a browser-based "Swiss Army knife" that replaces clunky command-line tools with a modern, real-time interface.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="Base64 Encoder/Decoder Interface Preview"
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
                    How to Use the Base64 Encoder/Decoder?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <FileCode className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Choose Your Mode:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Switch between the <strong>Encode</strong> (Text to Base64) or <strong>Decode</strong> (Base64 to Text) tabs depending on your data task.
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
                                <strong className="text-default-700">Input Data:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Upload className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Manual or File:</strong>
                                        <span className="text-default-600 ml-1">Type directly into the input field for real-time conversion, or use the <strong>File Upload</strong> feature to process PNGs, JPEGs, or PDFs.</span>
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
                                <Eye className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Preview & Verify:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                For decoded content, toggle the <strong>Preview</strong> feature to render HTML or inspect the structure. Check the output field for instant results.
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
                                Click <strong>Copy</strong> (<Copy className="w-3 h-3 inline" />) to grab the result, or <strong>Download</strong> to save the processed data as a local file. Use <strong>Reset</strong> (<RotateCcw className="w-3 h-3 inline" />) to clear the session.
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
                        <Zap className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Real-time Conversion:</strong>
                            <span className="block mt-1">
                                High-speed processing engine that encodes or decodes your data instantly as you type.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Upload className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Robust File Support:</strong>
                            <span className="block mt-1">
                                Easily handle images (PNG, JPEG), documents (PDF), and plain text files for bulk processing.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <RefreshCw className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multiple Encodings:</strong>
                            <span className="block mt-1">
                                Full support for various character sets including <strong>UTF-8, ASCII,</strong> and <strong>ISO-8859-1</strong>.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Live Preview:</strong>
                            <span className="block mt-1">
                                Built-in renderer allows you to visualize decoded HTML content or verify data integrity before export.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Smart Error Handling:</strong>
                            <span className="block mt-1">
                                Automatically detects invalid Base64 strings and provides helpful feedback for data correction.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Architecture:</strong>
                            <span className="block mt-1">
                                Fully optimized for all devices, allowing you to encode and decode data on the go.
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
                            <FileText className="w-4 h-4 mr-2 text-primary-500" /> Data URIs
                        </h3>
                        <p className="text-sm">
                            Use Base64 to create "Data URIs" for small images. This embeds the image directly into your HTML, saving an extra server request.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <Database className="w-4 h-4 mr-2 text-secondary-500" /> Storage
                        </h3>
                        <p className="text-sm">
                            Keep in mind that Base64 increases file size by about <strong>33%</strong>. Use it for small assets or transmission, not for bulk storage.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-success-500" /> Reliability
                        </h3>
                        <p className="text-sm">
                            Always use UTF-8 for text encoding unless your project specifically requires legacy ASCII or ISO support.
                        </p>
                    </div>
                </div>

                <p className="text-default-600 mt-8">
                    Ready to simplify your data workflow? Start using our Base64 Encoder/Decoder now and experience the power of efficient, browser-based data conversion!
                </p>
            </div>
        </Card>
    )
}