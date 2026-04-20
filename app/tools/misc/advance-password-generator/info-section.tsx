"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Lock,
    ShieldCheck,
    Key,
    RefreshCw,
    Zap,
    Smartphone,
    CheckCircle2,
    Monitor,
    Copy,
    Sliders,
    UserCheck,
    LayoutList,
    Shield,
    EyeOff,
    Wand2
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionPasswordGenerator() {
    // Image path
    const imagePath = "/Images/InfosectionImages/PasswordGeneratorPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the Advanced Password Generator?
                </h2>
                <p className="text-default-600 mb-4">
                    The <Link href="#how-to-use" className="text-primary-500 hover:underline">Advanced Password Generator</Link> is a highly secure, client-side utility engineered to safeguard your digital identity. In an era of increasing cybersecurity threats, using weak or recycled passwords is a major vulnerability. This tool solves that by creating mathematically strong, unpredictable combinations of letters, numbers, and special characters.
                </p>
                <p className="text-default-600 mb-4">
                    Security and privacy are at the absolute core of this application. This tool operates <strong>entirely on the client side</strong>. This means we do not store, transmit, or process any of your generated passwords on external servers. All cryptographic generation happens securely inside your local browser, keeping your sensitive data private and completely protected.
                </p>

                {/* Image Preview */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=200&width=400"}
                                    alt="Screenshot of the Advanced Password Generator interface showing various generation options"
                                    width={400}
                                    height={200}
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
                    How to Use the Advanced Password Generator
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Sliders className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Set Length and Characters:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Under the <strong>Basic tab</strong>, use the slider to set your password length (from 8 to 64). In the <strong>Original tab</strong>, check the boxes to include lowercase, uppercase, numbers, or symbols.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">Apply Advanced Rules:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Head to the <strong>Advanced tab</strong> to force the inclusion of every checked type, ensure it begins with a letter, or prevent repeating consecutive characters. Use the <strong>Security tab</strong> to remove visually ambiguous characters like `1` and `l`.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <LayoutList className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Select Quantity & Custom Sets:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                If you need full control, use the <strong>Custom tab</strong> to define a specific set of allowed or forbidden characters. Choose how many passwords you want to generate at once (up to 10).
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
                                <strong className="text-default-700">Generate and Copy:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click the <strong>Generate</strong> button. Review the password strength indicator, and click the <strong>Copy icon</strong> to grab your new credential securely.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Features That Make Us Stand Out
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Client-Side Security:</strong>
                            <span className="block mt-1">Zero network transmission. Passwords are generated exclusively within your machine&apos;s local hardware profile.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Sliders className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Vast Length Range:</strong>
                            <span className="block mt-1">Generate anything from standard 8-character pin-passes up to ultra-secure 64-character database keys.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <EyeOff className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Ambiguity Filters:</strong>
                            <span className="block mt-1">Option to strip away similar-looking characters (like `O` and `0` or `I` and `l`) to avoid human misread errors.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <LayoutList className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Bulk Generation:</strong>
                            <span className="block mt-1">Spawn up to 10 separate randomized passwords in a single click for massive corporate setup tasks.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Strength Indicator:</strong>
                            <span className="block mt-1">Real-time entropy and algorithmic score feedback analyzing how brute-force resistant your output actually is.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Fully Responsive UI:</strong>
                            <span className="block mt-1">Touch-friendly design system operating seamlessly across mobile, tablet, and desktop interfaces.</span>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Wand2 className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips for Digital Security
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Lock className="w-4 h-4 text-success-500" /> Length Over Complexity
                        </h3>
                        <p className="text-sm">
                            Mathematically, extending length increases brute-force time exponentially more than simply adding complex symbols. Aim for at least 16 characters.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <RefreshCw className="w-4 h-4 text-secondary-500" /> Zero Reuse
                        </h3>
                        <p className="text-sm">
                            Always generate a unique password for every single account. If one service is breached, your other accounts remain entirely safe.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-warning-500" /> Use Managers
                        </h3>
                        <p className="text-sm">
                            Since secure passwords are impossible to memorize, always route your generated results directly into a local or cloud password manager.
                        </p>
                    </div>
                </div>

                {/* Use Cases Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Monitor className="w-6 h-6 mr-2 text-primary-500" />
                    Real-World Applications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><UserCheck className="w-4 h-4 text-success-500" /> Personal Privacy</h4>
                        <p className="text-xs">Generating highly secure credentials for banking, primary emails, and government portal accounts.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Key className="w-4 h-4 text-secondary-500" /> API Keys</h4>
                        <p className="text-xs">Creating highly secure, long strings of random letters and symbols to act as bearer tokens for developers.</p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg">
                        <h4 className="font-medium mb-1 flex items-center gap-2"><Shield className="w-4 h-4 text-warning-500" /> Corporate Setup</h4>
                        <p className="text-xs">Using bulk generation to set up strong temporary master passwords for new employees in an enterprise system.</p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    Elevate your digital security standards today. With the Advanced Password Generator, professional-grade cryptography and secure asset production are simplified into a seamless client-side interface. Start shielding your presence and generate your secure keys today!
                </p>
            </div>
        </Card>
    )
}