"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Shield,
    ShieldAlert,
    Fingerprint,
    Upload,
    Zap,
    Smartphone,
    CheckCircle2,
    FileText,
    AlertTriangle,
    Copy,
    Search,
    Lock,
    History,
    Languages,
    Cpu
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionSHA512Hash() {
    // Image path
    const imagePath = "/Images/InfosectionImages/SHA512Preview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the SHA-512 Hash Generator & Verifier?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">SHA-512 Hash Generator & Verifier</Link> as the heavyweight champion of data integrity. As the most robust member of the SHA-2 family, it produces a massive 512-bit (64-byte) cryptographic digest. This extremely long hash value provides an unparalleled level of security, making it virtually immune to collision attacks with current computing power.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are an enterprise developer ensuring the authenticity of mission-critical data, a security engineer creating digital signatures for government-grade systems, or a privacy enthusiast hardening passwords, this tool provides the highest standard of protection. It allows you to generate hashes from text or files, implement custom salting, and perform real-time verification to ensure your data remains untampered and secure.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="SHA-512 Hash Generator Interface Preview"
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
                    How to Use the SHA-512 Hash Generator & Verifier?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Fingerprint className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Input Your Source:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Enter your text directly in the input field or <strong>upload a file</strong> to generate a checksum. Choose your encoding method (UTF-8, ASCII, or Base64) for accurate data interpretation.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Lock className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Enhance the Hash:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Cpu className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Salts & Iterations:</strong>
                                        <span className="text-default-600 ml-1">Add a custom <strong>salt value</strong> to defend against rainbow tables and configure the number of <strong>iterations</strong> to increase the computational difficulty for brute-force attacks.</span>
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
                                <strong className="text-default-700">Generate & Compare:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                The SHA-512 hash is generated in real-time. To verify authenticity, navigate to the <strong>Verification</strong> tab and paste an existing hash to see if it matches your input.
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
                                <strong className="text-default-700">Save & Export:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Save your favorite configurations as <strong>Presets</strong> (<History className="w-3 h-3 inline" />). <strong>Copy</strong> (<Copy className="w-3 h-3 inline" />) the resulting hash or <strong>Download</strong> it as a file.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features of SHA-512
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Maximum Cryptographic Bitrate:</strong>
                            <span className="block mt-1">Generates 512-bit hash values, offering the highest level of security in the SHA-2 family.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Upload className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">File Hashing:</strong>
                            <span className="block mt-1">Directly process local files to generate high-entropy checksums for software and document verification.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Search className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Advanced Verification:</strong>
                            <span className="block mt-1">Efficiently compare multiple hashes to confirm that data hasn't been modified during storage or transit.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Lock className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Enhanced Security Options:</strong>
                            <span className="block mt-1">Optional salting and iteration controls to provide robust defense against pre-computed hash attacks.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Languages className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Universal Encodings:</strong>
                            <span className="block mt-1">Full support for various text and binary encoding formats like UTF-8, ASCII, and Base64.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Architecture:</strong>
                            <span className="block mt-1">Optimized for performance across all devices, ensuring fast and reliable hashing in your browser.</span>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <ShieldAlert className="w-6 h-6 mr-2 text-primary-500" />
                    Security Considerations & Tips
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Lock className="w-4 h-4 text-success-500" /> Passwords
                        </h3>
                        <p className="text-sm">
                            While SHA-512 is extremely secure, for password storage, it is best used with key-stretching algorithms like <strong>Argon2, bcrypt, or PBKDF2</strong>.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-warning-500" /> One-Way Function
                        </h3>
                        <p className="text-sm">
                            Hashing is permanent. Original data cannot be "decrypted" from a hash; it can only be verified by generating a new hash from the same input.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Cpu className="w-4 h-4 text-blue-500" /> CPU Intensive
                        </h3>
                        <p className="text-sm">
                            SHA-512 is more computationally demanding than SHA-256. Use it in environments where security is the absolute priority over raw throughput.
                        </p>
                    </div>
                </div>

                {/* Use Cases Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-primary-500" />
                    Applications and Use Cases
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-default-600">
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><CheckCircle2 className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Government & Enterprise:</strong>
                            <p className="text-sm">Meeting high-compliance standards for sensitive document authentication and high-stakes data integrity.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><CheckCircle2 className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Digital Signatures:</strong>
                            <p className="text-sm">Generating unique signatures for software binaries and certificates to prove origin and prevent unauthorized modifications.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><CheckCircle2 className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Unique Identifiers:</strong>
                            <p className="text-sm">Creating virtually unique keys for large database records and files to manage assets without collisions.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><CheckCircle2 className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Immutable Logs:</strong>
                            <p className="text-sm">Ensuring that audit trails and digital records are tamper-proof for security logging and legal requirements.</p>
                        </div>
                    </div>
                </div>

                {/* Final Thoughts */}
                <p className="text-default-600 mt-8 text-center">
                    The SHA-512 Hash Generator & Verifier is the ultimate tool for anyone requiring top-tier cryptographic security. By combining the industry's most robust algorithm with advanced features like iterative salting and real-time verification, you can safeguard your data with the highest confidence. Secure your digital legacy today!
                </p>
            </div>
        </Card>
    )
}