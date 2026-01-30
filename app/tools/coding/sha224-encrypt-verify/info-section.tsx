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
    Smartphone,
    CheckCircle2,
    FileText,
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

export default function InfoSectionSHA224() {
    // Image path
    const imagePath = "/Images/InfosectionImages/SHA224Preview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the SHA-224 Hash Generator & Verifier?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of the <Link href="#how-to-use" className="text-primary-500 hover:underline">SHA-224 Hash Generator & Verifier</Link> as a high-precision digital seal for your information. Part of the robust SHA-2 (Secure Hash Algorithm 2) family, SHA-224 creates a unique 224-bit (28-byte) cryptographic fingerprint from any given input. It is engineered to provide a specialized balance between high-level security and computational efficiency.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are a developer verifying the integrity of sensitive data, a security professional creating digital signatures, or an IT specialist managing database records, this tool provides a reliable environment to generate and compare hashes. It ensures that even the slightest alteration in the source data is immediately detectable, making it a cornerstone for modern data authentication.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="SHA-224 Hash Generator Interface Preview"
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
                    How to Use the SHA-224 Hash Generator & Verifier?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Fingerprint className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Load Your Data:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Enter your text directly into the input area or <strong>upload a file</strong> to hash its contents. Select your preferred encoding method such as <strong>UTF-8, ASCII, or Base64</strong>.
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
                                        <strong className="text-default-700">Salt & Iterations:</strong>
                                        <span className="text-default-600 ml-1">Optionally add a <strong>salt value</strong> for added complexity and configure the number of <strong>hash iterations</strong> to strengthen the cryptographic result.</span>
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
                                Click the generate button to produce the SHA-224 hash. To verify an existing hash, switch to the <strong>Verification</strong> tab to compare your data against an external hash.
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
                                Save your frequently used configurations as <strong>Presets</strong> (<History className="w-3 h-3 inline" />), then copy the result to your clipboard or <strong>Download</strong> it as a text file.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features of SHA-224
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Fingerprint className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Cryptographic Precision:</strong>
                            <span className="block mt-1">Generates standard 224-bit hash values belonging to the highly secure SHA-2 algorithm family.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Upload className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">File Hashing Support:</strong>
                            <span className="block mt-1">Easily process local files to ensure data integrity during uploads or storage transfers.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Search className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Instant Verification:</strong>
                            <span className="block mt-1">Dedicated comparison tool to check if a provided hash matches your local data perfectly.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Lock className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Salting & Stretching:</strong>
                            <span className="block mt-1">Incorporate custom salts and multiple iterations to defend against pre-computed attacks.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Languages className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Flexible Encodings:</strong>
                            <span className="block mt-1">Supports various input formats including UTF-8, ASCII, and Base64 for comprehensive compatibility.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Responsive Architecture:</strong>
                            <span className="block mt-1">A mobile-friendly tool that provides instant cryptographic results on any device or screen size.</span>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <ShieldAlert className="w-6 h-6 mr-2 text-primary-500" />
                    Security Considerations & Limitations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-success-500" /> Robust Defense
                        </h3>
                        <p className="text-sm">
                            SHA-224 offers high collision resistance. However, for password storage, it must be paired with salting and key-stretching (like PBKDF2).
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-warning-500" /> One-Way Function
                        </h3>
                        <p className="text-sm">
                            Hashing is permanent. A hash cannot be "decrypted" back into the original text; it can only be verified by comparing it to a new hash.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Settings className="w-4 h-4 text-blue-500" /> Size Variations
                        </h3>
                        <p className="text-sm">
                            While faster than SHA-512, SHA-224 has a shorter output. For maximum brute-force resistance, consider <strong>SHA-256</strong> or <strong>SHA-512</strong>.
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
                        <h4 className="font-medium mb-1 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success-500" /> Data Integrity</h4>
                        <p className="text-xs">Ensuring that sensitive data remains unchanged during storage or transmission between systems.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Database className="w-4 h-4 text-secondary-500" /> Digital Signatures</h4>
                        <p className="text-xs">Authenticating documents and software by creating unique signatures that prove origin and validity.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Settings className="w-4 h-4 text-warning-500" /> File Identification</h4>
                        <p className="text-xs">Creating unique database keys for files to avoid duplicates and manage large asset libraries efficiently.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    The SHA-224 Hash Generator & Verifier is an essential asset for anyone serious about cryptographic security and data validation. By combining industry-standard algorithms with advanced features like salting and real-time verification, you can manage your digital security with absolute confidence. Start securing your data today!
                </p>
            </div>
        </Card>
    )
}