"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Settings,
    Lightbulb,
    AlertTriangle,
    Shield,
    Link2,
    Scissors,
    Sliders,
    Globe,
    FileUp,
    Download,
    Shuffle,
    CheckCircle2,
    Lock,
    Zap,
    Search,
    Languages,
    Copy,
    Eye,
    Monitor
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function InfoSectionURLSlug() {
    // Image path
    const imagePath = "/Images/InfosectionImages/URLSlugPreview.png"

    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is the URL Slug Creator?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of a URL slug as the digital "street address" for your specific web page. The{" "}
                    <Link href="#how-to-use" className="text-primary-500 hover:underline">
                        URL Slug Creator
                    </Link>{" "}
                    is an advanced tool designed to transform messy, human-readable titles into clean, SEO-friendly, and
                    machine-readable URLs.
                </p>
                <p className="text-default-600 mb-4">
                    Whether you are managing a blog, an e-commerce platform, or a custom CMS, this tool acts as a "Swiss army
                    knife" for URL generation. It handles the heavy lifting of stripping special characters, managing
                    separators, and even transliterating foreign alphabets so your links remain accessible and professional
                    across the entire web.
                </p>

                {/* Image Preview - Wrapped in Link for Accessibility/Zoom */}
                <div className="my-8">
                    <Link href={imagePath} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <Image
                                    src={imagePath || "/placeholder.svg?height=400&width=800"}
                                    alt="URL Slug Creator Interface Preview"
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
                    How to Use the URL Slug Creator?
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <FileUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">Input Your Text:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Enter or paste your title into the input field. You can also <strong>upload a file</strong> to
                                process text content directly.
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
                                <strong className="text-default-700">Customize Parameters:</strong>
                            </div>
                            <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Scissors className="w-3 h-3 text-gray-500" /> Separators & Casing
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Zap className="w-3 h-3 text-gray-500" /> Stop Word Removal
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Globe className="w-3 h-3 text-gray-500" /> Transliteration (Cyrillic/Greek)
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Settings className="w-3 h-3 text-gray-500" /> Max Length & Replacements
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
                                <Shuffle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">Test & Preview:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                The slug generates automatically. Use the <strong>Randomize</strong> button to test settings or the{" "}
                                <strong>Password Toggle</strong> (<Eye className="w-3 h-3 inline" />) to protect sensitive inputs.
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
                                <strong className="text-default-700">Export Result:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                Click <strong>Copy</strong> (<Copy className="w-3 h-3 inline" />) for immediate use or <strong>Download</strong> to save the slug as a
                                text file.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Key Features Grid */}
                <h2 id="key-features" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Settings className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Link2 className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Advanced Slug Conversion:</strong>
                            <span className="block mt-1">Transform any string into a clean, URL-friendly format instantly.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Scissors className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Custom Separators:</strong>
                            <span className="block mt-1">Choose from hyphens, underscores, dots, or define your own character.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Stop Word Cleaning:</strong>
                            <span className="block mt-1">Automatically remove "a", "the", "and" to keep URLs concise.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Languages className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Transliteration Support:</strong>
                            <span className="block mt-1">Seamlessly handle Latin, Cyrillic, and Greek character sets.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Download className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Bulk & File Support:</strong>
                            <span className="block mt-1">Upload files and download results for high-volume workflows.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Lock className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Sensitive Data Mode:</strong>
                            <span className="block mt-1">Protect input visibility when generating slugs for private content.</span>
                        </div>
                    </div>
                </div>

                {/* Best Practices Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Best Practices and Tips
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Search className="w-4 h-4 text-blue-500" /> SEO Strategy
                        </h3>
                        <p className="text-sm">
                            Always use <strong>hyphens</strong> as separators. Search engines interpret hyphens as spaces, whereas
                            underscores are seen as single characters.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Zap className="w-4 h-4 text-orange-500" /> Conciseness
                        </h3>
                        <p className="text-sm">
                            Keep slugs under 60 characters. Remove unnecessary stop words to make the URL easier for users to
                            remember and share.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Globe className="w-4 h-4 text-green-500" /> Consistency
                        </h3>
                        <p className="text-sm">
                            Stick to <strong>lowercase</strong> for all URLs. This prevents potential duplicate content issues and
                            404 errors on case-sensitive servers.
                        </p>
                    </div>
                </div>

                {/* Common Pitfalls */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2 text-warning-500" />
                    Common Pitfalls and How to Avoid Them
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-default-600">
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-warning-500">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <strong className="text-default-700">Loss of Meaning:</strong>
                            <p className="text-sm">
                                Be careful when removing stop words. Ensure the slug still reflects the content's core topic to
                                maintain context.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-warning-500">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <strong className="text-default-700">Duplicate URLs:</strong>
                            <p className="text-sm">
                                Slugs must be unique. If generating for a CMS, always implement a check to append a number to
                                duplicates.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-warning-500">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <strong className="text-default-700">Overusing Replacements:</strong>
                            <p className="text-sm">
                                Keep custom replacements minimal. Replacing too many characters can lead to confusing and unreadable
                                URLs.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-warning-500">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <strong className="text-default-700">Ignoring Localization:</strong>
                            <p className="text-sm">
                                For international sites, always utilize transliteration to ensure non-Latin scripts remain URL-safe.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-success-500" />
                    Security Considerations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="border border-default-200 p-3 rounded-lg bg-default-100/50 dark:bg-default-200/20">
                        <h4 className="font-medium mb-1 flex items-center gap-2 text-default-700">
                            <CheckCircle2 className="w-4 h-4 text-success-500" /> Input Sanitization
                        </h4>
                        <p className="text-xs">
                            Always sanitize inputs when displaying generated slugs to prevent Cross-Site Scripting (XSS) attacks.
                        </p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg bg-default-100/50 dark:bg-default-200/20">
                        <h4 className="font-medium mb-1 flex items-center gap-2 text-default-700">
                            <CheckCircle2 className="w-4 h-4 text-success-500" /> File Validation
                        </h4>
                        <p className="text-xs">
                            When using the file upload feature, ensure your application validates file types and sizes to prevent
                            security risks.
                        </p>
                    </div>
                    <div className="border border-default-200 p-3 rounded-lg bg-default-100/50 dark:bg-default-200/20">
                        <h4 className="font-medium mb-1 flex items-center gap-2 text-default-700">
                            <CheckCircle2 className="w-4 h-4 text-success-500" /> Privacy Toggle
                        </h4>
                        <p className="text-xs">
                            Use the password visibility toggle when processing sensitive keywords that shouldn't be seen by
                            onlookers.
                        </p>
                    </div>
                </div>

                {/* Outro */}
                <p className="text-default-600 mt-8">
                    The URL Slug Creator is your go-to partner for creating effective, clean, and search-optimized links. By
                    leveraging these powerful features and following industry best practices, you can ensure your website's
                    navigation remains professional and accessible to all. Start crafting your perfect URLs today!
                </p>
            </div>
        </Card>
    )
}