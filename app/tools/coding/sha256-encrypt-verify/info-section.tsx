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
    CheckCircle2,
    FileText,
    Database,
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

export default function InfoSectionSHA256Hash() {
    // Image path
    const imagePath = "/Images/InfosectionImages/SHA256Preview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the SHA-256 Hash Generator & Verifier?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">SHA-256 Hash Generator & Verifier</Link> as the gold standard of digital integrity. Part of the elite SHA-2 (Secure Hash Algorithm 2) family, it produces a massive 256-bit (32-byte) signature that is virtually impossible to reverse or duplicate. This "one-way" mathematical function ensures that your data—from simple text to complex software files—remains exactly as it was created.
                </p>
                <p className="text-default-600 mb-4">
                    Widely recognized as a cornerstone of modern cybersecurity, SHA-256 is the engine behind <strong>Blockchain technology</strong>, SSL certificates, and secure software distribution. Our tool provides a professional-grade interface to generate these hashes, verify data integrity, and implement advanced security layers like custom salting and iterative stretching, all within your browser.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="SHA-256 Hash Generator Interface Preview"
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
                    How to Use the SHA-256 Hash Generator & Verifier?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Fingerprint className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Input Source:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Enter your text in the input field or <strong>upload a file</strong> to hash its contents. Select your encoding method (UTF-8, Base64, or ASCII) to ensure data accuracy.
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
                                <strong className="text-default-700">Advanced Hardening:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <Cpu className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Salts & Iterations:</strong>
                                        <span className="text-default-600 ml-1">Optionally add a <strong>salt value</strong> and configure the <strong>iteration count</strong> to protect against brute-force and rainbow table attacks.</span>
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
                                <strong className="text-default-700">Generate & Verify:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                The hash updates in real-time. To confirm a match, switch to the <strong>Verification</strong> tab and paste an existing hash to compare it with your current input.
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
                                Use <strong>Copy</strong> (<Copy className="w-3 h-3 inline" />) to grab the hash, <strong>Download</strong> it as a file, or save your settings as a <strong>Preset</strong> (<History className="w-3 h-3 inline" />) for later.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features of SHA-256
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Industry-Standard Security:</strong>
                            <span className="block mt-1">Generates compliant 256-bit hashes used by blockchain protocols and government-grade systems.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Search className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Instant Verification:</strong>
                            <span className="block mt-1">Built-in comparison engine to check if a provided hash matches your source data perfectly.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Languages className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Flexible Encodings:</strong>
                            <span className="block mt-1">Support for UTF-8, Base64, and ASCII input methods to handle diverse data streams.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Stretching & Salting:</strong>
                            <span className="block mt-1">Add entropy with custom salts and multiple iterations for maximum brute-force resistance.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <History className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Preset System:</strong>
                            <span className="block mt-1">Save your frequently used salting and iteration configurations to streamline your workflow.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Engine:</strong>
                            <span className="block mt-1">Fast, real-time generation that works seamlessly on desktop and mobile browsers.</span>
                        </div>
                    </div>
                </div>

                {/* Security & Limitations Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <ShieldAlert className="w-6 h-6 mr-2 text-primary-500" />
                    Security & Best Practices
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Lock className="w-4 h-4 text-success-500" /> Hardening
                        </h3>
                        <p className="text-sm">
                            Always add a <strong>salt</strong> and use multiple iterations when hashing passwords to defend against rainbow table attacks.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <AlertTriangle className="w-4 h-4 text-warning-500" /> One-Way Path
                        </h3>
                        <p className="text-sm">
                            SHA-256 is a <strong>one-way function</strong>. Original input cannot be retrieved from a hash; it can only be verified.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Zap className="w-4 h-4 text-blue-500" /> Password Apps
                        </h3>
                        <p className="text-sm">
                            For production password storage, combine SHA-256 with key-stretching like <strong>Argon2, bcrypt, or PBKDF2</strong>.
                        </p>
                    </div>
                </div>

                {/* Applications Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-primary-500" />
                    Real-World Use Cases
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2 text-default-700"><Database className="w-4 h-4 text-blue-500" /> Blockchain</h4>
                        <p className="text-xs">Providing the cryptographic foundation for Bitcoin and other cryptocurrencies to ensure immutable ledgers.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2 text-default-700"><CheckCircle2 className="w-4 h-4 text-success-500" /> Integrity</h4>
                        <p className="text-xs">Verifying that downloaded software or data files have not been tampered with or corrupted.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2 text-default-700"><Shield className="w-4 h-4 text-orange-500" /> Certificates</h4>
                        <p className="text-xs">Powering digital signatures and SSL certificates to verify the identity of websites and publishers.</p>
                    </div>
                </div>

                {/* Final Thoughts */}
                <p className="text-default-600 mt-8">
                    The SHA-256 Hash Generator & Verifier is a versatile tool that ensures data integrity and security at the highest level. Whether you're verifying file authenticity, hardening sensitive data, or exploring blockchain foundations, SHA-256 remains one of the most trusted and battle-tested hashing algorithms in the digital age.
                </p>
            </div>
        </Card>
    )
}