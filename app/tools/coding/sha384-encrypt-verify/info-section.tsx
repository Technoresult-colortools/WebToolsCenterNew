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

export default function InfoSectionSHA384Hash() {
    // Image path
    const imagePath = "/Images/InfosectionImages/SHA384Preview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the SHA-384 Hash Generator & Verifier?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">SHA-384 Hash Generator & Verifier</Link> as a high-security vault for your digital identifiers. As a member of the SHA-2 family, it produces a massive 384-bit (48-byte) hash value, providing a significant increase in cryptographic strength over SHA-256. It is specifically designed for environments that require superior resistance to collision and preimage attacks.
                </p>
                <p className="text-default-600 mb-4">
                    This advanced tool is a favorite among security professionals and developers working on high-stakes applications. From generating secure digital signatures and SSL certificates to verifying the integrity of critical data backups, SHA-384 offers a robust one-way function that ensures data authenticity. Our interface allows you to harness this power with added features like salting and iterative hashing for maximum protection.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="SHA-384 Hash Generator Interface Preview"
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
                    How to Use the SHA-384 Hash Generator & Verifier?
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
                                Enter your text in the input area or <strong>upload a file</strong>. Select your encoding method—UTF-8, Base64, or Hexadecimal—to ensure the engine interprets your data accurately.
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
                                <strong className="text-default-700">Configure Security:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Cpu className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Salt & Iterations:</strong>
                                        <span className="text-default-600 ml-1">Add a <strong>salt value</strong> for enhanced entropy and set the <strong>hash iterations</strong> to harden the result against brute-force attempts.</span>
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
                                <strong className="text-default-700">Process & Verify:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click to generate the SHA-384 hash instantly. To confirm data integrity, use the <strong>Verification</strong> tab to compare your data against an existing hash value.
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
                                Use <strong>Copy</strong> to grab the result or <strong>Download</strong> it as a file. You can also save your settings as <strong>Presets</strong> (<History className="w-3 h-3 inline" />) for future tasks.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Advantages and Features of SHA-384
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Superior Security Length:</strong>
                            <span className="block mt-1">Offers 384-bit hash values, providing a higher security margin than SHA-256 for mission-critical apps.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Upload className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Full File Hashing:</strong>
                            <span className="block mt-1">Upload and hash binary files directly to ensure their integrity during storage or network transfer.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Search className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Hash Verification:</strong>
                            <span className="block mt-1">Compare two hashes side-by-side to verify that your data has not been modified or tampered with.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Lock className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Advanced Salting:</strong>
                            <span className="block mt-1">Add unique salt strings to defend your data fingerprints against rainbow table and collision attacks.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Languages className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Multi-Encoding Support:</strong>
                            <span className="block mt-1">Handle diverse data formats seamlessly with support for UTF-8, Base64, and Hexadecimal inputs.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive UI:</strong>
                            <span className="block mt-1">Perform enterprise-grade cryptographic operations on any device, from desktop to mobile.</span>
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
                            <Lock className="w-4 h-4 text-success-500" /> Hardening
                        </h3>
                        <p className="text-sm">
                            Always combine SHA-384 with salting and iterations for password storage to prevent efficient brute-force attacks.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-warning-500" /> Permanent
                        </h3>
                        <p className="text-sm">
                            SHA-384 is a <strong>one-way function</strong>. A hash cannot be reversed; it can only be checked against a new hash.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Cpu className="w-4 h-4 text-blue-500" /> Overhead
                        </h3>
                        <p className="text-sm">
                            SHA-384 is computationally heavier than MD5 or SHA-1. Use it where security is prioritized over raw speed.
                        </p>
                    </div>
                </div>

                {/* Use Cases Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-primary-500" />
                    Common Use Cases
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-default-600">
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><CheckCircle2 className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Software Verification:</strong>
                            <p className="text-sm">Generating high-entropy checksums for software binaries to ensure they haven't been modified by third parties.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><CheckCircle2 className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Digital Signatures:</strong>
                            <p className="text-sm">Providing the cryptographic foundation for authenticating documents and verifying SSL/TLS certificates.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><CheckCircle2 className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Compliance & Logs:</strong>
                            <p className="text-sm">Ensuring that server logs and digital records remain tamper-proof for auditing and legal compliance.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><CheckCircle2 className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Secure Database Identifiers:</strong>
                            <p className="text-sm">Creating virtually unique identifiers for data assets to prevent duplication and ensure precise retrieval.</p>
                        </div>
                    </div>
                </div>

                {/* Final Thoughts */}
                <p className="text-default-600 mt-8 text-center">
                    The SHA-384 Hash Generator & Verifier is a professional-grade tool for anyone serious about high-level cryptographic security. By combining SHA-384’s robust properties with advanced features like salting and real-time verification, you can manage your data integrity with absolute confidence. Start securing your digital world today!
                </p>
            </div>
        </Card>
    )
}