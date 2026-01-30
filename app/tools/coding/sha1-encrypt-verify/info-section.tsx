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
    Zap,
    Smartphone,
    RotateCcw,
    CheckCircle2,
    Database,
    AlertTriangle,
    Copy,
    Search,
    Lock,
    Settings,
    History,
    Languages
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionSHA1Hash() {
    // Image path
    const imagePath = "/Images/InfosectionImages/SHA1Preview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the SHA-1 Hash Generator & Verifier?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">SHA-1 Hash Generator & Verifier</Link> as a sophisticated digital seal for your data. In the landscape of data integrity, SHA-1 (Secure Hash Algorithm 1) takes an input of any size and produces a unique 160-bit (20-byte) "message digest." This fixed-size string acts as a unique identifier for the original content.
                </p>
                <p className="text-default-600 mb-4">
                    While SHA-1 has been deprecated for high-security cryptographic tasks due to theoretical vulnerabilities, it remains an industry standard for non-cryptographic integrity checks. It is widely used in version control systems like Git, data deduplication, and legacy system maintenance where verifying that a file remains unchanged during transmission is the top priority.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="SHA-1 Hash Generator Interface Preview"
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
                    How to Use the SHA-1 Hash Generator & Verifier?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Fingerprint className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Provide Input:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Enter your text in the input area or use the <strong>File Upload</strong> feature to process local documents. Choose your encoding: <strong>UTF-8, Base64, or Hex</strong>.
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
                                <strong className="text-default-700">Configure Security:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Lock className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Salting & Presets:</strong>
                                        <span className="text-default-600 ml-1">Optionally add a <strong>salt value</strong> to strengthen the hash. You can also save your configuration as a <strong>Preset</strong> (<History className="w-3 h-3 inline" />) for recurring tasks.</span>
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
                                The tool generates hashes in real-time. To confirm integrity, switch to the <strong>Verify</strong> tab, paste an existing hash, and toggle between case-sensitive or insensitive comparison.
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
                                <strong>Copy</strong> (<Copy className="w-3 h-3 inline" />) the hash to your clipboard or <strong>Download</strong> the result as a text file. Use <strong>Reset</strong> (<RotateCcw className="w-3 h-3 inline" />) to clear all fields.
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
                        <Fingerprint className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Dual Hashing Engine:</strong>
                            <span className="block mt-1">Generate 160-bit SHA-1 hashes from both raw text input and uploaded binary files.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Search className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Integrity Verifier:</strong>
                            <span className="block mt-1">Built-in comparison tool with case-sensitivity options to verify data matches perfectly.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Languages className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Encoding Flexibility:</strong>
                            <span className="block mt-1">Support for UTF-8, Base64, and Hexadecimal input encodings to handle diverse data types.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Lock className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Salting Support:</strong>
                            <span className="block mt-1">Improve resistance to rainbow table attacks by adding custom salts to your hash generation.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <History className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Preset System:</strong>
                            <span className="block mt-1">Save and load your frequently used configurations for a more efficient workflow.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Performance:</strong>
                            <span className="block mt-1">Optimized for real-time hash updates across all devices, from mobile to desktop.</span>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <ShieldAlert className="w-6 h-6 mr-2 text-primary-500" />
                    Security Considerations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-danger-500" /> Cryptographic Deprecation
                        </h3>
                        <p className="text-sm">
                            SHA-1 is considered <strong>cryptographically broken</strong> for security-critical tasks. It is vulnerable to collision attacks and should not be used for password hashing or SSL certificates.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-success-500" /> Recommended Standards
                        </h3>
                        <p className="text-sm">
                            For security-sensitive applications, always use stronger algorithms like <strong>SHA-256</strong> or <strong>SHA-3</strong>. Use HTTPS to protect hash transmission.
                        </p>
                    </div>
                </div>

                {/* Applications Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-primary-500" />
                    Applications and Use Cases
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success-500" /> Data Integrity</h4>
                        <p className="text-xs">Quickly verify that files or code snippets haven't been tampered with or corrupted during transfer.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Database className="w-4 h-4 text-secondary-500" /> Version Control</h4>
                        <p className="text-xs">Understand the underlying mechanics of Git and other systems that use SHA-1 for file identification.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Settings className="w-4 h-4 text-warning-500" /> Legacy Systems</h4>
                        <p className="text-xs">Generate hashes for older infrastructures that still require SHA-1 while planning for future migration.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    The SHA-1 Hash Generator & Verifier is a valuable tool for understanding the foundations of data hashing. While it's vital to recognize its limitations in modern security, it remains a powerful ally for everyday data verification and educational insights. Master your data integrity today!
                </p>
            </div>
        </Card>
    )
}