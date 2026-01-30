"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Shield,
    ShieldAlert,
    Fingerprint,
    Sliders,
    Upload,
    Zap,
    Code,
    Smartphone,
    Download,
    RotateCcw,
    Database,
    AlertTriangle,
    Copy,
    Search
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionMD5Hash() {
    // Image path
    const imagePath = "/Images/InfosectionImages/MD5HashPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the MD5 Hash Generator & Verifier?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of an MD5 hash as a "digital fingerprint" for your data. The <Link href="#how-to-use" className="text-primary-500 hover:underline">MD5 Hash Generator & Verifier</Link> is a specialized utility that takes any text or file and compresses it into a unique 32-character hexadecimal string. Even the tiniest change in the source data will result in a completely different fingerprint.
                </p>
                <p className="text-default-600 mb-4">
                    While MD5 is no longer recommended for high-security encryption (like passwords), it remains a "Swiss Army knife" for non-security tasks. It is widely used by developers and IT professionals for verifying file integrity, identifying duplicate data, and managing caching mechanisms where speed and consistency are more important than cryptographic invulnerability.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="MD5 Hash Generator Interface Preview"
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
                    How to Use the MD5 Hash Generator & Verifier?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Fingerprint className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Input Your Data:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Enter your text directly into the input area or use the <strong>File Upload</strong> feature to generate a checksum for local files.
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
                                <strong className="text-default-700">Select Encoding:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Code className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Format Handling:</strong>
                                        <span className="text-default-600 ml-1">Choose your input encoding (UTF-8, Base64, or Hexadecimal) to ensure the data is interpreted correctly before hashing.</span>
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
                                <strong className="text-default-700">Generate or Verify:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click <strong>Generate</strong> to create a new hash. To check data integrity, switch to the <strong>Verification</strong> tab and compare your source with an existing hash.
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
                                Use <strong>Copy</strong> (<Copy className="w-3 h-3 inline" />) to grab the hash instantly or <strong>Download</strong> the result for documentation. Hit <strong>Reset</strong> (<RotateCcw className="w-3 h-3 inline" />) to start a new session.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features of MD5
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Fingerprint className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">128-bit Precision:</strong>
                            <span className="block mt-1">
                                Produces a standard 128-bit hash value represented as a 32-character hexadecimal string.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Upload className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">File Hashing:</strong>
                            <span className="block mt-1">
                                Beyond just text, you can upload files to generate checksums for verifying software downloads or backups.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Search className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Dual-Mode Verification:</strong>
                            <span className="block mt-1">
                                Built-in comparison tool to check if two pieces of data match their respective hashes perfectly.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Encoding Support:</strong>
                            <span className="block mt-1">
                                Full support for various input types including UTF-8, Base64, and Hexadecimal formats.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Download className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Quick Export:</strong>
                            <span className="block mt-1">
                                Seamlessly copy results to your clipboard or download them as text files for integrity records.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive & Faster:</strong>
                            <span className="block mt-1">
                                Optimized for all devices, providing instant cryptographic operations right in your browser.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Security & Use Cases Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <ShieldAlert className="w-6 h-6 mr-2 text-primary-500" />
                    Security & Best Practices
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-danger-500" /> Vulnerabilities
                        </h3>
                        <p className="text-sm">
                            MD5 is <strong>not</strong> cryptographically secure. It is vulnerable to "collision attacks" where different inputs produce the same hash.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-success-500" /> Better Alternatives
                        </h3>
                        <p className="text-sm">
                            For passwords or sensitive data, always use <strong>SHA-256</strong> or <strong>SHA-3</strong>. Use MD5 only for non-critical checksums.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <Database className="w-4 h-4 text-secondary-500" /> Use Cases
                        </h3>
                        <p className="text-sm">
                            Perfect for data deduplication, file integrity checks (non-security), caching keys, and maintaining legacy systems.
                        </p>
                    </div>
                </div>

                {/* Final Thoughts */}
                <p className="text-default-600 mt-8">
                    While the MD5 algorithm has been superseded by stronger standards for security-critical tasks, it remains a fast and efficient tool for many development scenarios. Start using our generator today to streamline your data verification and integrity workflows!
                </p>
            </div>
        </Card>
    )
}