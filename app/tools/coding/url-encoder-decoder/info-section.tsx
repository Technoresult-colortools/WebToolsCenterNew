"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Link2,
    Sliders,
    Zap,
    Code,
    RotateCcw,
    CheckCircle2,
    RefreshCw,
    Search,
    ShieldAlert,
    Copy,
    FileUp,
    AlertTriangle,
    Shield,
    Globe,
    ShieldCheck
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionURLEncoder() {
    // Image path
    const imagePath = "/Images/InfosectionImages/URLEncoderPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    About the URL Encoder/Decoder
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">URL Encoder/Decoder</Link> as a specialized translator for web addresses. In the architecture of the internet, certain characters like spaces, brackets, or slashes have specific functional meanings. If you need to include these as actual data within a URL, they must be converted into a "percent-encoded" format to prevent browser errors and ensure safe data transmission.
                </p>
                <p className="text-default-600 mb-4">
                    This advanced tool is designed for developers, SEO specialists, and IT professionals who need to ensure their links are compatible across all browsers and platforms. Whether you are handling complex query parameters, deep-linking, or bulk-processing data strings, this generator bridges the gap between readable text and web-standard URI components.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="URL Encoder/Decoder Interface Preview"
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
                    How to Use the URL Encoder/Decoder?
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
                                Choose the <strong>Encode</strong> or <strong>Decode</strong> tab. Enter your URL(s) manually in the text area, or click <strong>Upload File</strong> to process a text document (up to 5MB).
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
                                <strong className="text-default-700">Configure Processing:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Refine the Output:</strong>
                                        <span className="text-default-600 ml-1">Toggle <strong>Auto Trim Whitespace</strong> or <strong>Preserve Line Breaks</strong>. Select your mode: Standard, Encode/Decode URI Component, or Encode All Characters for maximum safety.</span>
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
                                <strong className="text-default-700">Validate & Preview:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                The conversion happens in real-time. Use the <strong>Validate URL(s)</strong> button to ensure your results follow standard web formatting and remain functional.
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
                                <strong className="text-default-700">Export Result:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Use <strong>Copy</strong> to grab your results instantly or <strong>Download Result</strong> to save the processed content as a `.txt` file. Hit <strong>Reset</strong> (<RotateCcw className="w-3 h-3 inline" />) to clear everything.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Tips Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Tips and Best Practices
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Clean Your Input:</strong>
                            <span className="block mt-1">Use "Auto Trim Whitespace" when pasting URLs from external documents to avoid hidden character errors.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Link2 className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Maintain Structure:</strong>
                            <span className="block mt-1">Enable "Preserve Line Breaks" when bulk processing lists to keep your original organization intact.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Pre-Production Validation:</strong>
                            <span className="block mt-1">Always validate encoded URLs before deploying them into production code to prevent 404 errors.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">High-Security Encoding:</strong>
                            <span className="block mt-1">Use "Encode All Characters" to safely escape symbols that standard encoders might overlook.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Query Parameter Fix:</strong>
                            <span className="block mt-1">Enable "Decode '+' as Space" for legacy URLs where the plus symbol represents whitespace.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Component Specificity:</strong>
                            <span className="block mt-1">Use "URI Component" modes when specifically handling parameters after the '?' mark.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FileUp className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Bulk Efficiency:</strong>
                            <span className="block mt-1">Utilize file uploads for massive URL lists to avoid browser lag and save significant time.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Search className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Check File Charsets:</strong>
                            <span className="block mt-1">Ensure your source files are in proper encoding formats before uploading for decoding accuracy.</span>
                        </div>
                    </div>
                </div>

                {/* Pitfalls Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2 text-warning-500" />
                    Common Pitfalls and How to Avoid Them
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <RefreshCw className="w-4 h-4 text-warning-500" /> Double Encoding
                        </h3>
                        <p className="text-sm">
                            Be cautious not to encode already encoded URLs. This can create confusing strings like <code>%2520</code> and lead to broken redirects.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Sliders className="w-4 h-4 text-warning-500" /> Incomplete Decoding
                        </h3>
                        <p className="text-sm">
                            Standard decoders might miss '+' symbols or specific URI components. Always verify you've selected the correct mode for your input type.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-warning-500" /> Character Sets
                        </h3>
                        <p className="text-sm">
                            Ignoring the character encoding of your input can result in "mojibake" (corrupted text). Pay close attention to file charsets during upload.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Structural Logic
                        </h3>
                        <p className="text-sm">
                            Paths, queries, and fragments require different encoding logic. Don't assume a "one size fits all" approach for complex URL structures.
                        </p>
                    </div>
                </div>

                {/* Security Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-success-500" />
                    Security Considerations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-default-600">
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><ShieldAlert className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Decode Caution:</strong>
                            <p className="text-sm">Be wary of decoding unknown strings, as they may contain malicious script injections or obfuscated redirects.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><ShieldAlert className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Sanitization First:</strong>
                            <p className="text-sm">Always validate and sanitize URLs before using them in applications to prevent Cross-Site Scripting (XSS) attacks.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><ShieldAlert className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Contextual Encoding:</strong>
                            <p className="text-sm">Use appropriate encoding methods based on where the URL will be used (e.g., HTML vs. JavaScript contexts).</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><ShieldAlert className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Rate Limiting:</strong>
                            <p className="text-sm">If implementing URL logic in production, use rate limiting to prevent automated abuse of your endpoints.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><ShieldAlert className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Library Maintenance:</strong>
                            <p className="text-sm">Keep your backend URL processing libraries up to date to defend against known encoding vulnerabilities.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><ShieldAlert className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Error Handling:</strong>
                            <p className="text-sm">Implement proper error handling to ensure sensitive server information isn't exposed through URL processing errors.</p>
                        </div>
                    </div>
                </div>

                {/* Final Outro */}
                <p className="text-default-600 mt-8">
                    Mastering URL encoding is essential for a clean and secure web presence. Start using the URL Encoder/Decoder today to experience the perfect balance of professional-grade precision and user-friendly efficiency. Ensure your links are safe, valid, and functional every time!
                </p>
            </div>
        </Card>
    )
}